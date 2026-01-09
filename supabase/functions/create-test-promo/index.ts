import "jsr:@supabase/functions-js/edge-runtime.d.ts";

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
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');

    if (!stripeSecretKey) {
      throw new Error('STRIPE_SECRET_KEY not configured');
    }

    const couponParams = new URLSearchParams({
      'percent_off': '100',
      'duration': 'forever',
      'name': 'TEST - 100% Rabatt',
    });

    const couponResponse = await fetch('https://api.stripe.com/v1/coupons', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${stripeSecretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: couponParams.toString(),
    });

    if (!couponResponse.ok) {
      const errorText = await couponResponse.text();
      throw new Error(`Failed to create coupon: ${errorText}`);
    }

    const coupon = await couponResponse.json();

    const promoParams = new URLSearchParams();
    promoParams.append('promotion[type]', 'coupon');
    promoParams.append('promotion[coupon]', coupon.id);
    promoParams.append('code', 'TEST100');
    promoParams.append('active', 'true');

    const promoResponse = await fetch('https://api.stripe.com/v1/promotion_codes', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${stripeSecretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: promoParams.toString(),
    });

    let promotionCode;
    if (!promoResponse.ok) {
      const errorText = await promoResponse.text();

      if (errorText.includes('already exists')) {
        console.log('Promotion code TEST100 already exists');

        const listPromosResponse = await fetch('https://api.stripe.com/v1/promotion_codes?code=TEST100&limit=1', {
          headers: {
            'Authorization': `Bearer ${stripeSecretKey}`,
          },
        });

        if (!listPromosResponse.ok) {
          throw new Error('Failed to fetch existing promotion code');
        }

        const promosList = await listPromosResponse.json();
        promotionCode = promosList.data[0];
      } else {
        throw new Error(`Failed to create promotion code: ${errorText}`);
      }
    } else {
      promotionCode = await promoResponse.json();
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Test promotion code created successfully',
        coupon: {
          id: coupon.id,
          percent_off: coupon.percent_off,
          name: coupon.name,
        },
        promotion_code: {
          id: promotionCode.id,
          code: promotionCode.code,
          active: promotionCode.active,
        },
        instructions: 'Use code "TEST100" at checkout for 100% discount'
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
    console.error('Promo creation error:', error);
    return new Response(
      JSON.stringify({
        error: error.message,
        details: 'Failed to create test promotion code'
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
