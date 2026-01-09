import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface StripeProduct {
  id: string;
  name: string;
  description: string;
  type: 'recurring' | 'one_time';
  price: number;
  interval?: 'month';
  metadata?: Record<string, string>;
}

const products: StripeProduct[] = [
  // BASIS-ABONNEMENTS - Alle 29.90€/Monat
  {
    id: 'webflix_flex',
    name: 'WebFlix One - FLEX (Monatlich kündbar)',
    description: 'Maximale Flexibilität - Jederzeit monatlich kündbar',
    type: 'recurring',
    price: 29.90,
    interval: 'month',
    metadata: { category: 'base', duration: '0', contract_type: 'flex' }
  },
  {
    id: 'webflix_12m',
    name: 'WebFlix One - 12 Monate',
    description: '12-monatige Mindestvertragslaufzeit - 29.90€/Monat',
    type: 'recurring',
    price: 29.90,
    interval: 'month',
    metadata: { category: 'base', duration: '12', contract_type: 'fixed' }
  },
  {
    id: 'webflix_24m',
    name: 'WebFlix One - 24 Monate',
    description: '24-monatige Mindestvertragslaufzeit - 29.90€/Monat',
    type: 'recurring',
    price: 29.90,
    interval: 'month',
    metadata: { category: 'base', duration: '24', contract_type: 'fixed' }
  },

  // MONATLICHE ADD-ONS
  {
    id: 'addon_whatsapp',
    name: 'WhatsApp Anbindung',
    description: '1-Klick-Kontakt über WhatsApp',
    type: 'recurring',
    price: 4.99,
    interval: 'month',
    metadata: { category: 'addon_monthly', addon_id: 'whatsapp' }
  },
  {
    id: 'addon_booking_monthly',
    name: 'Buchungssystem (monatlich)',
    description: 'Termin-Buchungen inkl. Kalender & Kunden-Dashboard',
    type: 'recurring',
    price: 19.99,
    interval: 'month',
    metadata: { category: 'addon_monthly', addon_id: 'booking' }
  },
  {
    id: 'addon_analytics',
    name: 'Besucher-Auswertung',
    description: 'Monatliche Besucher-Statistiken',
    type: 'recurring',
    price: 4.99,
    interval: 'month',
    metadata: { category: 'addon_monthly', addon_id: 'analytics' }
  },
  {
    id: 'addon_chatbot',
    name: 'KI Chatbot',
    description: 'Automatische Kundenbetreuung 24/7',
    type: 'recurring',
    price: 9.99,
    interval: 'month',
    metadata: { category: 'addon_monthly', addon_id: 'chatbot' }
  },
  {
    id: 'addon_instagram',
    name: 'Instagram Feed',
    description: 'Live Instagram-Integration',
    type: 'recurring',
    price: 4.99,
    interval: 'month',
    metadata: { category: 'addon_monthly', addon_id: 'instagram' }
  },
  {
    id: 'addon_seo',
    name: 'Google Indexierung SEO',
    description: 'Top Google Rankings & Sichtbarkeit',
    type: 'recurring',
    price: 14.99,
    interval: 'month',
    metadata: { category: 'addon_monthly', addon_id: 'seo' }
  },
  {
    id: 'addon_multilang',
    name: 'Mehrsprachigkeit',
    description: 'Pro zusätzlicher Sprache',
    type: 'recurring',
    price: 4.99,
    interval: 'month',
    metadata: { category: 'addon_monthly', addon_id: 'multilang' }
  },
  {
    id: 'addon_google_maps',
    name: 'Google Maps mit Route',
    description: 'Interaktive Karte mit Routenplanung',
    type: 'recurring',
    price: 4.99,
    interval: 'month',
    metadata: { category: 'addon_monthly', addon_id: 'google-maps' }
  },
  {
    id: 'addon_popup',
    name: 'Pop-up für Aktionen',
    description: 'Newsletter, Aktionen & Angebote',
    type: 'recurring',
    price: 3.99,
    interval: 'month',
    metadata: { category: 'addon_monthly', addon_id: 'popup' }
  },

  // EINMALIGE ADD-ONS
  {
    id: 'addon_booking_setup',
    name: 'Buchungssystem Setup',
    description: 'Einmalige Einrichtung des Buchungssystems',
    type: 'one_time',
    price: 49.00,
    metadata: { category: 'addon_onetime', addon_id: 'booking' }
  },
  {
    id: 'addon_blog_setup',
    name: 'Blog-System',
    description: 'Professionelles Blog-System (zzgl. 9,90€ pro Artikel)',
    type: 'one_time',
    price: 49.00,
    metadata: { category: 'addon_onetime', addon_id: 'blog' }
  },
  {
    id: 'addon_custom_section',
    name: 'Individuelle Section',
    description: 'z.B. Preisrechner, Team-Slider, Portfolio',
    type: 'one_time',
    price: 29.00,
    metadata: { category: 'addon_onetime', addon_id: 'custom-section' }
  },
  {
    id: 'addon_meta_tracking',
    name: 'Meta Tracking',
    description: 'Facebook/Instagram Pixel Integration',
    type: 'one_time',
    price: 99.00,
    metadata: { category: 'addon_onetime', addon_id: 'meta-tracking' }
  },
  {
    id: 'addon_google_tracking',
    name: 'Google Tracking',
    description: 'Google Analytics & Tag Manager',
    type: 'one_time',
    price: 99.00,
    metadata: { category: 'addon_onetime', addon_id: 'google-tracking' }
  },
  {
    id: 'addon_stripe_integration',
    name: 'Stripe Zahlungseinbindung',
    description: 'Sichere Online-Zahlungen',
    type: 'one_time',
    price: 49.00,
    metadata: { category: 'addon_onetime', addon_id: 'stripe' }
  }
];

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

    const results = [];

    for (const product of products) {
      try {
        // Create product in Stripe
        const productResponse = await fetch('https://api.stripe.com/v1/products', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${stripeSecretKey}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            name: product.name,
            description: product.description,
            ...Object.entries(product.metadata || {}).reduce((acc, [key, value]) => {
              acc[`metadata[${key}]`] = value;
              return acc;
            }, {} as Record<string, string>)
          }).toString()
        });

        if (!productResponse.ok) {
          const error = await productResponse.text();
          console.error(`Failed to create product ${product.id}:`, error);
          results.push({
            id: product.id,
            status: 'error',
            error: error
          });
          continue;
        }

        const stripeProduct = await productResponse.json();

        // Create price for the product
        const priceParams: Record<string, string> = {
          product: stripeProduct.id,
          currency: 'eur',
          unit_amount: Math.round(product.price * 100).toString(),
        };

        if (product.type === 'recurring' && product.interval) {
          priceParams['recurring[interval]'] = product.interval;
        }

        const priceResponse = await fetch('https://api.stripe.com/v1/prices', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${stripeSecretKey}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams(priceParams).toString()
        });

        if (!priceResponse.ok) {
          const error = await priceResponse.text();
          console.error(`Failed to create price for ${product.id}:`, error);
          results.push({
            id: product.id,
            status: 'error',
            error: error
          });
          continue;
        }

        const stripePrice = await priceResponse.json();

        results.push({
          id: product.id,
          name: product.name,
          status: 'success',
          stripe_product_id: stripeProduct.id,
          stripe_price_id: stripePrice.id,
          amount: product.price,
          type: product.type
        });

      } catch (error) {
        console.error(`Error creating ${product.id}:`, error);
        results.push({
          id: product.id,
          status: 'error',
          error: error.message
        });
      }
    }

    const successCount = results.filter(r => r.status === 'success').length;
    const errorCount = results.filter(r => r.status === 'error').length;

    return new Response(
      JSON.stringify({
        message: `Created ${successCount} products successfully, ${errorCount} errors`,
        results: results,
        summary: {
          total: products.length,
          success: successCount,
          errors: errorCount
        }
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
    console.error('Setup error:', error);
    return new Response(
      JSON.stringify({
        error: error.message,
        details: 'Failed to setup Stripe products'
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