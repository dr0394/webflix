import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeSecretKey) {
      throw new Error('STRIPE_SECRET_KEY not configured');
    }

    const signature = req.headers.get('stripe-signature');
    if (!signature) {
      throw new Error('No stripe signature found');
    }

    const body = await req.text();

    // Verify webhook signature
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
    if (webhookSecret) {
      // TODO: Implement signature verification
    }

    const event = JSON.parse(body);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const metadata = session.metadata;

      if (metadata.type === 'changes') {
        const subscriptionId = metadata.subscription_id;
        const amount = parseInt(metadata.amount);
        const customerId = session.customer_details?.email;

        // Get customer ID from email
        const { data: customer } = await supabase
          .from('customers')
          .select('id')
          .eq('email', customerId)
          .single();

        if (!customer) {
          throw new Error('Customer not found');
        }

        // Create purchase record
        const { error: purchaseError } = await supabase
          .from('subscription_change_purchases')
          .insert([{
            customer_id: customer.id,
            subscription_id: subscriptionId,
            amount: amount,
            price_per_change: 14.99,
            total_price: amount * 14.99,
            stripe_payment_intent_id: session.payment_intent,
            status: 'completed'
          }]);

        if (purchaseError) throw purchaseError;

        // Update subscription purchased_changes
        const { error: updateError } = await supabase
          .from('customer_subscriptions')
          .update({
            purchased_changes: supabase.rpc('increment', { x: amount })
          })
          .eq('id', subscriptionId);

        if (updateError) {
          // Fallback: get current value and add
          const { data: sub } = await supabase
            .from('customer_subscriptions')
            .select('purchased_changes')
            .eq('id', subscriptionId)
            .single();

          if (sub) {
            await supabase
              .from('customer_subscriptions')
              .update({
                purchased_changes: (sub.purchased_changes || 0) + amount
              })
              .eq('id', subscriptionId);
          }
        }
      }
    }

    return new Response(
      JSON.stringify({ received: true }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );

  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(
      JSON.stringify({
        error: error.message,
        details: 'Failed to process webhook',
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});
