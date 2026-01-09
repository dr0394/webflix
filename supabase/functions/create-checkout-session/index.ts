import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface CheckoutItem {
  priceId?: string;
  quantity: number;
  name: string;
  price: number;
  type: 'recurring' | 'one_time';
  metadata?: Record<string, string | number>;
}

interface CheckoutRequest {
  items?: CheckoutItem[];
  customerEmail?: string;
  orderNumber?: string;
  successUrl?: string;
  cancelUrl?: string;
  type?: 'changes' | 'order';
  subscriptionId?: string;
  amount?: number;
  pricePerChange?: number;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');

    if (!stripeSecretKey) {
      throw new Error('STRIPE_SECRET_KEY not configured');
    }

    const body: CheckoutRequest = await req.json();

    if (body.type === 'changes') {
      const { subscriptionId, amount, pricePerChange } = body;

      if (!subscriptionId || !amount || !pricePerChange) {
        throw new Error('Missing required parameters for changes purchase');
      }

      const totalPrice = amount * pricePerChange;
      const currentUrl = new URL(req.url);
      const baseUrl = `${currentUrl.protocol}//${currentUrl.host}`;

      const params = new URLSearchParams({
        'mode': 'payment',
        'success_url': `${baseUrl}/customer/dashboard?purchase=success&type=changes`,
        'cancel_url': `${baseUrl}/customer/dashboard?purchase=cancelled`,
        'metadata[type]': 'changes',
        'metadata[subscription_id]': subscriptionId,
        'metadata[amount]': String(amount),
        'allow_promotion_codes': 'true',
        'invoice_creation[enabled]': 'true',
      });

      params.append('line_items[0][price_data][currency]', 'eur');
      params.append('line_items[0][price_data][unit_amount]', String(Math.round(pricePerChange * 100)));
      params.append('line_items[0][price_data][product_data][name]', `${amount} Website-Änderung${amount > 1 ? 'en' : ''}`);
      params.append('line_items[0][price_data][product_data][description]', 'Zusätzliche Änderungen für Ihre Website');
      params.append('line_items[0][quantity]', String(amount));

      const checkoutSession = await fetch('https://api.stripe.com/v1/checkout/sessions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${stripeSecretKey}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      if (!checkoutSession.ok) {
        const error = await checkoutSession.text();
        console.error('Stripe error:', error);
        throw new Error(`Failed to create checkout session: ${error}`);
      }

      const session = await checkoutSession.json();

      return new Response(
        JSON.stringify({
          sessionId: session.id,
          url: session.url,
        }),
        {
          status: 200,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const { items, customerEmail, orderNumber, successUrl, cancelUrl } = body;

    if (!items || items.length === 0) {
      throw new Error('No items provided');
    }

    const hasRecurring = items.some(i => i.type === 'recurring');
    const mode = hasRecurring ? 'subscription' : 'payment';

    const params = new URLSearchParams({
      'mode': mode,
      'success_url': successUrl,
      'cancel_url': cancelUrl,
      'customer_email': customerEmail,
      'metadata[order_number]': orderNumber,
      'allow_promotion_codes': 'true',
    });

    if (mode === 'payment') {
      params.append('invoice_creation[enabled]', 'true');
    }

    items.forEach((item, index) => {
      params.append(`line_items[${index}][price_data][currency]`, 'eur');
      params.append(`line_items[${index}][price_data][unit_amount]`, String(Math.round(item.price * 100)));
      params.append(`line_items[${index}][price_data][product_data][name]`, item.name);

      if (item.type === 'recurring') {
        params.append(`line_items[${index}][price_data][recurring][interval]`, 'month');

        // Add contract duration metadata to the product
        if (item.metadata) {
          Object.entries(item.metadata).forEach(([key, value]) => {
            params.append(`line_items[${index}][price_data][product_data][metadata][${key}]`, String(value));
          });
        }
      }

      params.append(`line_items[${index}][quantity]`, String(item.quantity));
    });

    // Add subscription metadata for recurring items (accessible in session.subscription)
    const recurringItem = items.find(i => i.type === 'recurring');
    if (hasRecurring && recurringItem && recurringItem.metadata) {
      Object.entries(recurringItem.metadata).forEach(([key, value]) => {
        params.append(`subscription_data[metadata][${key}]`, String(value));
      });
    }

    const checkoutSession = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${stripeSecretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    if (!checkoutSession.ok) {
      const error = await checkoutSession.text();
      console.error('Stripe error:', error);
      throw new Error(`Failed to create checkout session: ${error}`);
    }

    const session = await checkoutSession.json();

    return new Response(
      JSON.stringify({
        sessionId: session.id,
        url: session.url,
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );

  } catch (error) {
    console.error('Checkout session error:', error);
    return new Response(
      JSON.stringify({
        error: error.message,
        details: 'Failed to create checkout session',
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