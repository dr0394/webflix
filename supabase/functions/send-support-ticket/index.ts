import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const BREVO_API_KEY = Deno.env.get("BREVO_API_KEY");
const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const {
      ticketNumber,
      customerName,
      customerEmail,
      subject,
      category,
      priority,
      description,
      websiteName,
    } = await req.json();

    const categoryLabels: Record<string, string> = {
      support: "Allgemeiner Support",
      change_request: "Änderungswunsch",
      billing: "Abrechnung",
      technical: "Technisches Problem",
      other: "Sonstiges",
    };

    const priorityLabels: Record<string, string> = {
      low: "Niedrig",
      medium: "Normal",
      high: "Hoch",
      urgent: "Dringend",
    };

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .header {
      background-color: #ffffff;
      padding: 40px 20px;
      text-align: center;
      border-bottom: 2px solid #f4f4f4;
    }
    .header img {
      max-width: 200px;
      height: auto;
    }
    .content {
      padding: 40px 30px;
    }
    .ticket-box {
      background-color: #f8f9fa;
      border-left: 4px solid #FF6B35;
      padding: 20px;
      margin: 20px 0;
      border-radius: 4px;
    }
    .ticket-box h3 {
      margin-top: 0;
      color: #FF6B35;
    }
    .ticket-details {
      margin: 15px 0;
    }
    .ticket-details p {
      margin: 8px 0;
      font-size: 14px;
    }
    .ticket-details strong {
      display: inline-block;
      width: 140px;
    }
    .description-box {
      background-color: #fff;
      border: 1px solid #e0e0e0;
      padding: 15px;
      margin: 20px 0;
      border-radius: 4px;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    .priority-badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
    }
    .priority-urgent {
      background-color: #fee;
      color: #c00;
    }
    .priority-high {
      background-color: #fff3cd;
      color: #856404;
    }
    .priority-medium {
      background-color: #d1ecf1;
      color: #0c5460;
    }
    .priority-low {
      background-color: #d4edda;
      color: #155724;
    }
    .footer {
      background-color: #1a1a1a;
      color: #ffffff;
      padding: 30px;
      text-align: center;
      font-size: 13px;
    }
    .footer p {
      margin: 8px 0;
    }
    .footer a {
      color: #FF6B35;
      text-decoration: none;
    }
    .divider {
      height: 1px;
      background-color: #e0e0e0;
      margin: 30px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://i.imgur.com/2SbjgE7.png" alt="Webflix Logo">
    </div>

    <div class="content">
      <h2 style="color: #1a1a1a; margin-top: 0;">Neues Support-Ticket</h2>

      <div class="ticket-box">
        <h3>Ticket-Details</h3>
        <div class="ticket-details">
          <p><strong>Ticket-Nummer:</strong> ${ticketNumber}</p>
          <p><strong>Kunde:</strong> ${customerName}</p>
          <p><strong>E-Mail:</strong> ${customerEmail}</p>
          ${websiteName ? `<p><strong>Website:</strong> ${websiteName}</p>` : ""}
          <p><strong>Kategorie:</strong> ${categoryLabels[category] || category}</p>
          <p>
            <strong>Priorität:</strong>
            <span class="priority-badge priority-${priority}">
              ${priorityLabels[priority] || priority}
            </span>
          </p>
          <p><strong>Betreff:</strong> ${subject}</p>
        </div>
      </div>

      <h3>Beschreibung:</h3>
      <div class="description-box">
${description}
      </div>

      <div class="divider"></div>

      <p style="font-size: 14px; color: #666;">
        Dieses Ticket wurde über das Kunden-Dashboard erstellt. Bitte bearbeiten Sie das Ticket zeitnah und informieren Sie den Kunden über den Fortschritt.
      </p>
    </div>

    <div class="footer">
      <p><strong>Webflix</strong></p>
      <p>Support-System</p>
      <p style="margin-top: 15px; font-size: 12px; color: #999;">
        © ${new Date().getFullYear()} Webflix. Alle Rechte vorbehalten.
      </p>
    </div>
  </div>
</body>
</html>
    `;

    const emailData = {
      sender: {
        email: "info@webflix.de",
        name: "Webflix Support System",
      },
      to: [
        {
          email: "kontakt@webflix.info",
          name: "Webflix Support",
        },
      ],
      subject: `[${ticketNumber}] ${subject}`,
      htmlContent,
    };

    const response = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": BREVO_API_KEY!,
        "content-type": "application/json",
      },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Brevo API Error: ${JSON.stringify(error)}`);
    }

    const result = await response.json();

    return new Response(
      JSON.stringify({
        success: true,
        messageId: result.messageId,
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
    console.error("Error sending support ticket email:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
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
