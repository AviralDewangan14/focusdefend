import { NextRequest, NextResponse } from 'next/server';
import { getPlanById } from '@/lib/pricing-plans';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const planId = typeof body.planId === 'string' ? body.planId.trim() : 'pro_annual';
    const gateway = typeof body.gateway === 'string' ? body.gateway.trim().toLowerCase() : 'razorpay';
    const userId = typeof body.userId === 'string' ? body.userId.trim() : null;
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const name = typeof body.name === 'string' ? body.name.trim() : '';

    const plan = getPlanById(planId);
    if (!plan || plan.id === 'basic') {
      return NextResponse.json(
        { success: false, error: 'Invalid subscription plan specified.' },
        { status: 400 }
      );
    }

    const receipt = `rcpt_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    // ─────────────────────────────────────────────────────────────────────────
    // 1. RAZORPAY GATEWAY DISPATCH (Standard for India UPI / Cards / NetBanking)
    // ─────────────────────────────────────────────────────────────────────────
    if (gateway === 'razorpay') {
      const razorpayKeyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

      if (razorpayKeyId && razorpayKeySecret) {
        try {
          const authString = Buffer.from(`${razorpayKeyId}:${razorpayKeySecret}`).toString('base64');
          const rzpResponse = await fetch('https://api.razorpay.com/v1/orders', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Basic ${authString}`,
            },
            body: JSON.stringify({
              amount: plan.amountPaise,
              currency: 'INR',
              receipt,
              notes: {
                planId: plan.id,
                userId: userId || 'anonymous',
                email,
                product: 'FocusDefend Pro',
              },
            }),
          });

          if (rzpResponse.ok) {
            const orderData = await rzpResponse.json();
            return NextResponse.json({
              success: true,
              gateway: 'razorpay',
              mockMode: false,
              orderId: orderData.id,
              amount: orderData.amount,
              currency: orderData.currency,
              keyId: razorpayKeyId,
              plan,
              customer: { name, email },
            });
          } else {
            const errorBody = await rzpResponse.text();
            console.warn('[Razorpay API Error] Falling back to test sandbox:', errorBody);
          }
        } catch (err) {
          console.warn('[Razorpay Network Exception]:', err);
        }
      }

      // ───────────────────────────────────────────────────────────────────────
      // Seamless Sandbox Fallback (Instant testing without live credentials)
      // ───────────────────────────────────────────────────────────────────────
      const mockOrderId = `order_test_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
      return NextResponse.json({
        success: true,
        gateway: 'razorpay',
        mockMode: true,
        orderId: mockOrderId,
        amount: plan.amountPaise,
        currency: 'INR',
        keyId: razorpayKeyId || 'rzp_test_focusdefend_sandbox',
        plan,
        customer: { name, email },
        sandboxNotice: 'Running in sandbox simulation mode. You can test payment completion immediately.',
      });
    }

    // ─────────────────────────────────────────────────────────────────────────
    // 2. STRIPE GATEWAY DISPATCH (International Cards, Apple Pay, Google Pay)
    // ─────────────────────────────────────────────────────────────────────────
    if (gateway === 'stripe') {
      const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
      if (stripeSecretKey) {
        try {
          const origin = request.headers.get('origin') || 'https://focusdefend.vercel.app';
          const sessionParams = new URLSearchParams({
            'payment_method_types[0]': 'card',
            mode: 'payment',
            'line_items[0][price_data][currency]': 'usd',
            'line_items[0][price_data][product_data][name]': `FocusDefend ${plan.name}`,
            'line_items[0][price_data][product_data][description]': plan.description,
            'line_items[0][price_data][unit_amount]': String(plan.amountCents),
            'line_items[0][quantity]': '1',
            success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}&plan=${plan.id}`,
            cancel_url: `${origin}/checkout?canceled=true`,
            'metadata[planId]': plan.id,
            'metadata[userId]': userId || 'anonymous',
          });

          if (email) {
            sessionParams.append('customer_email', email);
          }

          const stripeRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${stripeSecretKey}`,
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: sessionParams.toString(),
          });

          if (stripeRes.ok) {
            const sessionData = await stripeRes.json();
            return NextResponse.json({
              success: true,
              gateway: 'stripe',
              mockMode: false,
              checkoutUrl: sessionData.url,
              sessionId: sessionData.id,
              plan,
            });
          }
        } catch (stripeErr) {
          console.warn('[Stripe API Error]:', stripeErr);
        }
      }

      // Stripe sandbox fallback
      return NextResponse.json({
        success: true,
        gateway: 'stripe',
        mockMode: true,
        checkoutUrl: `/checkout/success?session_id=cs_test_mock_${Date.now()}&plan=${plan.id}&mock=true`,
        plan,
        sandboxNotice: 'Stripe running in sandbox simulation mode.',
      });
    }

    return NextResponse.json(
      { success: false, error: `Unsupported payment gateway: ${gateway}` },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('[Create Order Error]:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to create checkout order.' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
