import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('x-razorpay-signature');
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    // Verify webhook signature if secret configured
    if (webhookSecret && signature) {
      const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(rawBody)
        .digest('hex');

      if (expectedSignature !== signature) {
        return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 });
      }
    }

    const payload = JSON.parse(rawBody);
    const event = payload.event;
    console.log('[Razorpay Webhook Event Received]:', event);

    if (event === 'payment.captured' || event === 'order.paid') {
      const payment = payload.payload?.payment?.entity;
      const orderId = payment?.order_id;
      const paymentId = payment?.id;
      const notes = payment?.notes || {};
      const planId = notes.planId || 'pro_annual';
      const userId = notes.userId;

      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (supabaseUrl && supabaseKey && userId && userId !== 'anonymous') {
        await fetch(`${supabaseUrl}/rest/v1/rpc/activate_user_subscription`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
          },
          body: JSON.stringify({
            p_user_id: userId,
            p_plan_id: planId,
            p_gateway: 'razorpay',
            p_order_id: orderId || `rzp_${Date.now()}`,
            p_payment_id: paymentId,
            p_amount: payment?.amount || 149900,
            p_currency: payment?.currency || 'INR',
            p_duration_days: planId === 'pro_monthly' ? 30 : 365,
            p_customer_email: payment?.email,
            p_customer_name: payment?.contact,
            p_payment_method: payment?.method || 'upi',
          }),
        }).catch((err) => console.warn('[Webhook RPC exception]:', err));
      }
    }

    return NextResponse.json({ status: 'ok', received: true });
  } catch (err: any) {
    console.error('[Razorpay Webhook Error]:', err);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
