import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('stripe-signature');
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    // Webhook verification notice
    if (webhookSecret && !signature) {
      return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
    }

    const event = JSON.parse(rawBody);
    console.log('[Stripe Webhook Event Received]:', event.type);

    if (event.type === 'checkout.session.completed') {
      const session = event.data?.object;
      const metadata = session?.metadata || {};
      const planId = metadata.planId || 'pro_annual';
      const userId = metadata.userId;

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
            p_gateway: 'stripe',
            p_order_id: session.id,
            p_payment_id: session.payment_intent || session.id,
            p_amount: session.amount_total || 1999,
            p_currency: session.currency || 'USD',
            p_duration_days: planId === 'pro_monthly' ? 30 : 365,
            p_customer_email: session.customer_details?.email,
            p_customer_name: session.customer_details?.name,
            p_payment_method: 'card',
          }),
        }).catch((err) => console.warn('[Stripe Webhook RPC exception]:', err));
      }
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('[Stripe Webhook Error]:', err);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
