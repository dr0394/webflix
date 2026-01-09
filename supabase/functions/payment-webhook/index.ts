import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import Stripe from "npm:stripe@14";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey, stripe-signature",
};

interface OrderData {
  id: string;
  order_number: string;
  customer_data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company: string;
  };
  template_data: {
    name: string;
    category?: string;
  };
  pricing: {
    monthlyTotal: number;
  };
  duration: number;
}

const generateRandomPassword = (): string => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  let password = '';
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

const sendWelcomeEmail = async (
  email: string,
  firstName: string,
  company: string,
  password: string,
  onboardingToken: string,
  orderNumber: string,
  templateName: string
): Promise<boolean> => {
  try {
    const brevoApiKey = Deno.env.get('BREVO_API_KEY');
    if (!brevoApiKey) {
      console.log('Brevo API key not configured - email would be sent with:', {
        email,
        firstName,
        password,
        onboardingToken
      });
      return true;
    }

    const loginUrl = `${Deno.env.get('SITE_URL') || 'https://webflix.de'}/customer/login`;
    const checklistUrl = `${Deno.env.get('SITE_URL') || 'https://webflix.de'}/checklist/${onboardingToken}`;

    const emailData = {
      to: [{ email, name: `${firstName}` }],
      templateId: 2,
      params: {
        CUSTOMER_NAME: firstName,
        COMPANY_NAME: company,
        ORDER_ID: orderNumber,
        TEMPLATE_NAME: templateName,
        LOGIN_EMAIL: email,
        LOGIN_PASSWORD: password,
        LOGIN_URL: loginUrl,
        CHECKLIST_LINK: checklistUrl,
        ONBOARDING_TOKEN: onboardingToken,
        SUPPORT_EMAIL: 'support@webflix.de',
        SUPPORT_PHONE: '0800 0004766',
        SUPPORT_WHATSAPP: '+49 175 1194624'
      }
    };

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': brevoApiKey
      },
      body: JSON.stringify(emailData)
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Brevo email error:', error);
      return false;
    }

    console.log('Welcome email sent successfully to:', email);
    return true;
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return false;
  }
};

const createCustomerAccount = async (
  supabaseAdmin: any,
  email: string,
  firstName: string,
  lastName: string,
  company: string
): Promise<{ password: string; userId: string } | null> => {
  try {
    const password = generateRandomPassword();

    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        first_name: firstName,
        last_name: lastName,
        company,
        role: 'customer'
      }
    });

    if (authError) {
      console.error('Error creating auth user:', authError);
      return null;
    }

    console.log('Customer account created:', email);
    return {
      password,
      userId: authData.user.id
    };
  } catch (error) {
    console.error('Error in createCustomerAccount:', error);
    return null;
  }
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
    const stripeWebhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    if (!stripeSecretKey || !stripeWebhookSecret) {
      console.error('Missing Stripe configuration');
      return new Response(
        JSON.stringify({ error: 'Stripe not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2023-10-16',
    });

    const signature = req.headers.get('stripe-signature');
    if (!signature) {
      return new Response(
        JSON.stringify({ error: 'No signature' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const body = await req.text();
    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, stripeWebhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return new Response(
        JSON.stringify({ error: 'Invalid signature' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderNumber = session.metadata?.orderNumber;

      if (!orderNumber) {
        console.error('No order number in session metadata');
        return new Response(
          JSON.stringify({ error: 'No order number' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const { data: order, error: orderError } = await supabaseAdmin
        .from('webflix_orders')
        .select('*')
        .eq('order_number', orderNumber)
        .single();

      if (orderError || !order) {
        console.error('Order not found:', orderNumber, orderError);
        return new Response(
          JSON.stringify({ error: 'Order not found' }),
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const { error: updateError } = await supabaseAdmin
        .from('webflix_orders')
        .update({
          status: 'paid',
          stripe_session_id: session.id,
          stripe_customer_id: session.customer,
          updated_at: new Date().toISOString()
        })
        .eq('order_number', orderNumber);

      if (updateError) {
        console.error('Error updating order:', updateError);
      }

      const customerData = order.customer_data;
      const accountResult = await createCustomerAccount(
        supabaseAdmin,
        customerData.email,
        customerData.firstName,
        customerData.lastName,
        customerData.company
      );

      if (!accountResult) {
        console.error('Failed to create customer account');
        return new Response(
          JSON.stringify({ error: 'Account creation failed' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const { data: branding, error: brandingError } = await supabaseAdmin
        .from('customer_brandings')
        .select('onboarding_token')
        .eq('order_id', order.id)
        .single();

      if (brandingError || !branding) {
        console.error('Branding not found for order:', order.id, brandingError);
        return new Response(
          JSON.stringify({ error: 'Branding not found' }),
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      await sendWelcomeEmail(
        customerData.email,
        customerData.firstName,
        customerData.company,
        accountResult.password,
        branding.onboarding_token,
        orderNumber,
        order.template_data.name
      );

      console.log('Payment processed successfully for order:', orderNumber);
      return new Response(
        JSON.stringify({
          message: 'Webhook processed successfully',
          orderNumber,
          accountCreated: true,
          emailSent: true
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ message: 'Event type not handled' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});