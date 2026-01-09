import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

// Brevo API types and interfaces
interface OrderData {
  id: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    company: string;
  };
  template: {
    name: string;
  };
  pricing: {
    monthlyTotal: number;
  };
  duration: number;
}

interface SendSmtpEmail {
  to: Array<{
    email: string;
    name: string;
  }>;
  templateId: number;
  params: Record<string, any>;
  headers?: Record<string, string>;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

const sendPaymentEmail = async (orderData: OrderData): Promise<boolean> => {
  try {
    const paymentLink = `https://payment.webflix.de/pay/${orderData.id}`;
    
    const emailData: SendSmtpEmail = {
      to: [
        {
          email: orderData.customer.email,
          name: `${orderData.customer.firstName} ${orderData.customer.lastName}`
        }
      ],
      templateId: 1, // Brevo Template ID für Payment Email
      params: {
        CUSTOMER_NAME: orderData.customer.firstName,
        COMPANY_NAME: orderData.customer.company,
        ORDER_ID: orderData.id,
        TEMPLATE_NAME: orderData.template.name,
        MONTHLY_PRICE: orderData.pricing.monthlyTotal.toFixed(2),
        DURATION: orderData.duration,
        PAYMENT_LINK: paymentLink,
        TOTAL_FIRST_PAYMENT: orderData.pricing.monthlyTotal.toFixed(2)
      },
      headers: {
        'X-Mailin-custom': `order_id:${orderData.id}|type:payment`
      }
    };

    // Simulate Brevo API call (replace with actual API call when API key is available)
    console.log('Payment email would be sent:', emailData);
    
    // For now, return true to simulate successful sending
    // In production, replace this with actual Brevo API call:
    // const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'api-key': Deno.env.get('BREVO_API_KEY') || ''
    //   },
    //   body: JSON.stringify(emailData)
    // });
    // return response.ok;
    
    return true;
  } catch (error) {
    console.error('Error sending payment email:', error);
    return false;
  }
};

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    })
  }

  try {
    if (req.method === "POST") {
      const orderData: OrderData = await req.json()
      
      const success = await sendPaymentEmail(orderData)
      
      if (success) {
        return new Response(
          JSON.stringify({ message: "Payment email sent successfully" }),
          {
            status: 200,
            headers: {
              ...corsHeaders,
              "Content-Type": "application/json",
            },
          }
        )
      } else {
        return new Response(
          JSON.stringify({ error: "Failed to send payment email" }),
          {
            status: 500,
            headers: {
              ...corsHeaders,
              "Content-Type": "application/json",
            },
          }
        )
      }
    }

    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      {
        status: 405,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    )
  } catch (error) {
    console.error("Email service error:", error)
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    )
  }
})