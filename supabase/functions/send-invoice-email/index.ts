import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const getSubscriptionInvoiceEmailHTML = (
  customerName: string,
  company: string,
  planName: string,
  monthlyPrice: number,
  contractDuration: number,
  startDate: string,
  endDate: string | null,
  portalUrl: string,
  invoiceUrl: string
): string => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  const formatDate = (date: string | null) => {
    if (!date) return 'Unbegrenzt';
    return new Date(date).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return `
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ihr Webflix Abonnement</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px 0;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <tr>
                        <td style="background: linear-gradient(135deg, #f97316 0%, #ec4899 100%); padding: 32px 24px; text-align: center;">
                            <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff;">Ihr Webflix Abonnement</h1>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 32px 24px;">
                            <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.5; color: #333333;">
                                Hallo <strong>${customerName}</strong>,
                            </p>
                            <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.5; color: #333333;">
                                vielen Dank für Ihr Vertrauen! Hier sind die Details zu Ihrem Abonnement:
                            </p>

                            <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #fff8f0 0%, #fce7f3 100%); border: 2px solid #f97316; border-radius: 12px; margin-bottom: 24px;">
                                <tr>
                                    <td style="padding: 24px;">
                                        <h2 style="margin: 0 0 16px 0; font-size: 22px; font-weight: 700; color: #f97316; text-align: center;">
                                            ${planName}
                                        </h2>
                                        <div style="text-align: center; margin-bottom: 20px;">
                                            <span style="font-size: 36px; font-weight: 700; color: #f97316;">
                                                ${formatPrice(monthlyPrice)}
                                            </span>
                                            <span style="font-size: 18px; color: #666666;">/Monat</span>
                                        </div>

                                        <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 16px;">
                                            <tr>
                                                <td style="padding: 8px 0; font-size: 14px; color: #666666; border-top: 1px solid #f97316;">Vertragslaufzeit:</td>
                                                <td style="padding: 8px 0; font-size: 14px; color: #333333; font-weight: 600; text-align: right; border-top: 1px solid #f97316;">
                                                    ${contractDuration === 0 ? 'Monatlich kündbar' : `${contractDuration} Monate`}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0; font-size: 14px; color: #666666;">Startdatum:</td>
                                                <td style="padding: 8px 0; font-size: 14px; color: #333333; font-weight: 600; text-align: right;">
                                                    ${formatDate(startDate)}
                                                </td>
                                            </tr>
                                            ${endDate ? `
                                            <tr>
                                                <td style="padding: 8px 0; font-size: 14px; color: #666666;">Enddatum:</td>
                                                <td style="padding: 8px 0; font-size: 14px; color: #333333; font-weight: 600; text-align: right;">
                                                    ${formatDate(endDate)}
                                                </td>
                                            </tr>
                                            ` : ''}
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <h3 style="margin: 24px 0 16px 0; font-size: 18px; font-weight: 600; color: #333333;">Ihre Abonnement-Verwaltung</h3>

                            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0f9ff; border: 2px solid #0ea5e9; border-radius: 8px; margin-bottom: 16px;">
                                <tr>
                                    <td style="padding: 20px;">
                                        <p style="margin: 0 0 12px 0; font-size: 14px; color: #0c4a6e; line-height: 1.5;">
                                            <strong>Verwalten Sie Ihr Abonnement jederzeit:</strong>
                                        </p>
                                        <ul style="margin: 0 0 16px 0; padding-left: 20px; font-size: 14px; color: #0c4a6e; line-height: 1.8;">
                                            <li>Zahlungsmethode ändern</li>
                                            <li>Rechnungen herunterladen</li>
                                            <li>Abonnement kündigen</li>
                                            <li>Rechnungsadresse aktualisieren</li>
                                        </ul>
                                        <table width="100%" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td align="center" style="padding: 8px 0;">
                                                    <a href="${portalUrl}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #f97316 0%, #ec4899 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 16px; box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);">
                                                        Abonnement verwalten
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            ${invoiceUrl ? `
                            <h3 style="margin: 24px 0 16px 0; font-size: 18px; font-weight: 600; color: #333333;">Ihre Rechnung</h3>

                            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; margin-bottom: 24px;">
                                <tr>
                                    <td style="padding: 16px;">
                                        <p style="margin: 0 0 12px 0; font-size: 14px; color: #666666;">
                                            Ihre aktuelle Rechnung steht zum Download bereit:
                                        </p>
                                        <table width="100%" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td align="center" style="padding: 8px 0;">
                                                    <a href="${invoiceUrl}" style="display: inline-block; padding: 12px 24px; background-color: #ffffff; color: #f97316; text-decoration: none; border: 2px solid #f97316; border-radius: 6px; font-weight: 600; font-size: 14px;">
                                                        Rechnung herunterladen (PDF)
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            ` : ''}

                            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0fdf4; border: 2px solid #22c55e; border-radius: 8px; margin-bottom: 24px;">
                                <tr>
                                    <td style="padding: 16px; text-align: center;">
                                        <p style="margin: 0 0 4px 0; font-size: 16px; color: #22c55e; font-weight: 600;">
                                            ✓ Abonnement aktiv
                                        </p>
                                        <p style="margin: 0; font-size: 14px; color: #666666;">
                                            Ihre nächste Zahlung erfolgt automatisch
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <h3 style="margin: 24px 0 12px 0; font-size: 16px; font-weight: 600; color: #333333;">Fragen oder Probleme?</h3>
                            <p style="margin: 0 0 12px 0; font-size: 14px; color: #666666;">
                                Unser Support-Team ist für Sie da:
                            </p>
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="padding: 4px 0; font-size: 14px; color: #666666; width: 100px;">E-Mail:</td>
                                    <td style="padding: 4px 0; font-size: 14px;"><a href="mailto:support@webflix.de" style="color: #f97316; text-decoration: none;">support@webflix.de</a></td>
                                </tr>
                                <tr>
                                    <td style="padding: 4px 0; font-size: 14px; color: #666666;">Telefon:</td>
                                    <td style="padding: 4px 0; font-size: 14px;"><a href="tel:08000004766" style="color: #f97316; text-decoration: none;">0800 0004766</a></td>
                                </tr>
                                <tr>
                                    <td style="padding: 4px 0; font-size: 14px; color: #666666;">WhatsApp:</td>
                                    <td style="padding: 4px 0; font-size: 14px;"><a href="https://wa.me/4917511194624" style="color: #f97316; text-decoration: none;">+49 175 1194624</a></td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td style="background-color: #f9fafb; padding: 24px; text-align: center; border-top: 1px solid #e5e7eb;">
                            <p style="margin: 0 0 4px 0; font-size: 14px; font-weight: 600; color: #333333;">Webflix</p>
                            <p style="margin: 0 0 8px 0; font-size: 13px; color: #666666;">
                                Ihre Website in 48 Stunden live
                            </p>
                            <p style="margin: 0; font-size: 12px; color: #999999;">
                                © ${new Date().getFullYear()} Webflix. Alle Rechte vorbehalten.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
  `;
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const brevoApiKey = Deno.env.get("BREVO_API_KEY");
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Missing Supabase configuration");
    }

    if (!brevoApiKey) {
      throw new Error("Missing Brevo API key");
    }

    if (!stripeSecretKey) {
      throw new Error("Missing Stripe API key");
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    const { orderNumber } = await req.json();

    if (!orderNumber) {
      throw new Error("Order number is required");
    }

    console.log("📧 Manual invoice email request for order:", orderNumber);

    const { data: order, error: orderError } = await supabaseAdmin
      .from("webflix_orders")
      .select("*")
      .eq("order_number", orderNumber)
      .single();

    if (orderError || !order) {
      throw new Error(`Order not found: ${orderNumber}`);
    }

    console.log("✅ Order found:", order.id);
    console.log("📧 Customer email:", order.customer_data.email);

    // Create subscription data from order (fallback approach)
    let subscription: any = {
      plan_name: order.template_data?.name || 'Webflix Website',
      monthly_price: order.pricing?.monthly || 99,
      contract_duration: order.duration || 0,
      start_date: order.created_at,
      end_date: order.duration > 0
        ? new Date(new Date(order.created_at).getTime() + (order.duration * 30 * 24 * 60 * 60 * 1000)).toISOString()
        : null,
      stripe_customer_id: null
    };

    let portalUrl = "https://webflix.de/customer/dashboard";
    let invoiceUrl = "";

    // Try to find customer and real subscription for Stripe data
    const { data: customer } = await supabaseAdmin
      .from("customers")
      .select("id, stripe_customer_id")
      .eq("email", order.customer_data.email)
      .maybeSingle();

    if (customer) {
      console.log("✅ Customer found:", customer.id);

      // Try to find subscription in DB
      const { data: dbSubscription } = await supabaseAdmin
        .from("customer_subscriptions")
        .select("*")
        .eq("customer_id", customer.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (dbSubscription) {
        console.log("✅ Subscription found in DB:", dbSubscription.id);
        subscription = dbSubscription;

        // Try to create Stripe portal if we have a customer ID
        if (dbSubscription.stripe_customer_id) {
          try {
            const portalResponse = await fetch(
              "https://api.stripe.com/v1/billing_portal/sessions",
              {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${stripeSecretKey}`,
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                  customer: dbSubscription.stripe_customer_id,
                  return_url: "https://webflix.de/customer/dashboard",
                }).toString(),
              }
            );

            if (portalResponse.ok) {
              const portalSession = await portalResponse.json();
              portalUrl = portalSession.url;
              console.log("✅ Portal session created");

              // Get invoice
              const invoicesResponse = await fetch(
                `https://api.stripe.com/v1/invoices?customer=${dbSubscription.stripe_customer_id}&limit=1`,
                {
                  headers: {
                    Authorization: `Bearer ${stripeSecretKey}`,
                  },
                }
              );

              if (invoicesResponse.ok) {
                const invoices = await invoicesResponse.json();
                if (invoices.data && invoices.data.length > 0) {
                  invoiceUrl = invoices.data[0].invoice_pdf || invoices.data[0].hosted_invoice_url || "";
                  console.log("✅ Invoice found");
                }
              }
            }
          } catch (error) {
            console.log("⚠️ Could not fetch Stripe data:", error.message);
          }
        }
      } else {
        console.log("⚠️ No subscription in DB, using order data");
      }
    } else {
      console.log("⚠️ No customer in DB, using order data only");
    }

    console.log("📊 Final subscription data:", {
      plan: subscription.plan_name,
      price: subscription.monthly_price,
      duration: subscription.contract_duration
    });

    const htmlContent = getSubscriptionInvoiceEmailHTML(
      `${order.customer_data.firstName} ${order.customer_data.lastName}`,
      order.customer_data.company,
      subscription.plan_name,
      subscription.monthly_price,
      subscription.contract_duration,
      subscription.start_date,
      subscription.end_date,
      portalUrl,
      invoiceUrl
    );

    const emailData = {
      sender: {
        name: "Webflix",
        email: "noreply@webflix.de",
      },
      to: [
        {
          email: order.customer_data.email,
          name: `${order.customer_data.firstName} ${order.customer_data.lastName}`,
        },
      ],
      subject: `Ihr Webflix Abonnement: ${subscription.plan_name}`,
      htmlContent,
    };

    console.log("📧 Sending email to:", order.customer_data.email);

    const emailResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": brevoApiKey,
      },
      body: JSON.stringify(emailData),
    });

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      console.error("❌ Brevo error:", errorText);
      throw new Error(`Failed to send email: ${errorText}`);
    }

    const emailResult = await emailResponse.json();
    console.log("✅ Email sent successfully:", emailResult);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Invoice email sent successfully",
        messageId: emailResult.messageId,
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("❌ Error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
