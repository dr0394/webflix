import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import Stripe from "npm:stripe@14.14.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey, stripe-signature",
};

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  apiVersion: "2024-11-20.acacia",
  httpClient: Stripe.createFetchHttpClient(),
});

const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
const supabaseUrl = Deno.env.get("SUPABASE_URL");
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

interface SubscriptionUpdateResult {
  success: boolean;
  customer_email?: string;
  customer_name?: string;
  subscription_status: string;
  is_active: boolean;
}

async function sendAdminNotification(
  event: string,
  customerEmail: string,
  customerName: string | null,
  subscriptionId: string,
  status: string,
  isActive: boolean
) {
  try {
    const brevoApiKey = Deno.env.get("BREVO_API_KEY");
    if (!brevoApiKey) {
      console.error("BREVO_API_KEY not configured");
      return;
    }

    const emailContent = `
      <h2>Stripe Subscription Event: ${event}</h2>
      <p><strong>Event:</strong> ${event}</p>
      <p><strong>Customer:</strong> ${customerName || "N/A"} (${customerEmail})</p>
      <p><strong>Subscription ID:</strong> ${subscriptionId}</p>
      <p><strong>Status:</strong> ${status}</p>
      <p><strong>Active:</strong> ${isActive ? "Yes" : "No"}</p>
      <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
    `;

    const textContent = `
Stripe Subscription Event: ${event}

Event: ${event}
Customer: ${customerName || "N/A"} (${customerEmail})
Subscription ID: ${subscriptionId}
Status: ${status}
Active: ${isActive ? "Yes" : "No"}
Timestamp: ${new Date().toISOString()}
    `;

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": brevoApiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          email: "info@webflix.de",
          name: "Webflix System",
        },
        to: [{ email: "kontakt@webflix.info" }],
        subject: `[Webflix] Subscription ${event} - ${customerEmail}`,
        htmlContent: emailContent,
        textContent: textContent,
      }),
    });

    if (!response.ok) {
      console.error("Failed to send admin notification:", await response.text());
    } else {
      console.log("Admin notification sent successfully");
    }
  } catch (error) {
    console.error("Error sending admin notification:", error);
  }
}

async function updateSubscriptionStatus(
  subscriptionId: string,
  status: string,
  isActive: boolean,
  currentPeriodEnd?: number,
  canceledAt?: number,
  cancelAtPeriodEnd: boolean = false
): Promise<SubscriptionUpdateResult> {
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/update_subscription_status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseServiceKey!,
        Authorization: `Bearer ${supabaseServiceKey}`,
      },
      body: JSON.stringify({
        p_stripe_subscription_id: subscriptionId,
        p_status: status,
        p_is_active: isActive,
        p_current_period_end: currentPeriodEnd
          ? new Date(currentPeriodEnd * 1000).toISOString()
          : null,
        p_canceled_at: canceledAt ? new Date(canceledAt * 1000).toISOString() : null,
        p_cancel_at_period_end: cancelAtPeriodEnd,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Error updating subscription:", error);
      throw new Error(`Failed to update subscription: ${error}`);
    }

    const result = await response.json();
    console.log("Subscription updated:", result);
    return result;
  } catch (error) {
    console.error("Error in updateSubscriptionStatus:", error);
    throw error;
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    if (!webhookSecret) {
      throw new Error("STRIPE_WEBHOOK_SECRET is not configured");
    }

    const signature = req.headers.get("stripe-signature");
    if (!signature) {
      throw new Error("No stripe-signature header found");
    }

    const body = await req.text();
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    console.log(`Received event: ${event.type}`);

    let updateResult: SubscriptionUpdateResult | null = null;

    switch (event.type) {
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        console.log(`Subscription deleted: ${subscription.id}`);

        updateResult = await updateSubscriptionStatus(
          subscription.id,
          "canceled",
          false,
          subscription.current_period_end,
          subscription.canceled_at || undefined,
          false
        );

        if (updateResult.success && updateResult.customer_email) {
          await sendAdminNotification(
            "customer.subscription.deleted",
            updateResult.customer_email,
            updateResult.customer_name || null,
            subscription.id,
            "canceled",
            false
          );
        }
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        console.log(`Subscription updated: ${subscription.id}, status: ${subscription.status}`);

        const isActive = subscription.status === "active" || subscription.status === "trialing";
        const cancelAtPeriodEnd = subscription.cancel_at_period_end || false;

        updateResult = await updateSubscriptionStatus(
          subscription.id,
          subscription.status,
          isActive,
          subscription.current_period_end,
          subscription.canceled_at || undefined,
          cancelAtPeriodEnd
        );

        if (updateResult.success && updateResult.customer_email) {
          await sendAdminNotification(
            "customer.subscription.updated",
            updateResult.customer_email,
            updateResult.customer_name || null,
            subscription.id,
            subscription.status,
            isActive
          );
        }
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        console.log(`Payment failed for invoice: ${invoice.id}`);

        if (invoice.subscription) {
          const subscriptionId =
            typeof invoice.subscription === "string"
              ? invoice.subscription
              : invoice.subscription.id;

          updateResult = await updateSubscriptionStatus(
            subscriptionId,
            "past_due",
            false,
            undefined,
            undefined,
            false
          );

          if (updateResult.success && updateResult.customer_email) {
            await sendAdminNotification(
              "invoice.payment_failed",
              updateResult.customer_email,
              updateResult.customer_name || null,
              subscriptionId,
              "past_due",
              false
            );
          }
        }
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        console.log(`Payment succeeded for invoice: ${invoice.id}`);

        if (invoice.subscription) {
          const subscriptionId =
            typeof invoice.subscription === "string"
              ? invoice.subscription
              : invoice.subscription.id;

          updateResult = await updateSubscriptionStatus(
            subscriptionId,
            "active",
            true,
            invoice.period_end,
            undefined,
            false
          );

          if (updateResult.success && updateResult.customer_email) {
            await sendAdminNotification(
              "invoice.payment_succeeded",
              updateResult.customer_email,
              updateResult.customer_name || null,
              subscriptionId,
              "active",
              true
            );
          }
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new Response(
      JSON.stringify({
        received: true,
        event: event.type,
        updated: updateResult?.success || false,
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error: any) {
    console.error("Webhook error:", error);

    return new Response(
      JSON.stringify({
        error: error.message,
        details: error.stack,
      }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});