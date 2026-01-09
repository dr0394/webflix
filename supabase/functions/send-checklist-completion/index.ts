import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ChecklistCompletionData {
  customerEmail: string;
  customerName: string;
  orderId: string;
}

function generateRandomPassword(length: number = 12): string {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

async function sendChecklistCompletionEmail(data: ChecklistCompletionData, loginCredentials: { email: string; password: string }) {
  const BREVO_API_KEY = Deno.env.get('BREVO_API_KEY');
  const dashboardUrl = 'https://webflix.de/customer/dashboard';

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
    .header { background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); padding: 40px 20px; text-align: center; }
    .header h1 { color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; }
    .content { padding: 40px 30px; }
    .success-icon { text-align: center; font-size: 60px; margin: 20px 0; }
    .credentials-box { background-color: #f0fdf4; border: 2px solid #22c55e; border-radius: 8px; padding: 25px; margin: 25px 0; }
    .credentials-box h3 { margin-top: 0; color: #16a34a; font-size: 18px; }
    .credential-item { background-color: #ffffff; padding: 12px 15px; margin: 10px 0; border-radius: 6px; border: 1px solid #bbf7d0; }
    .credential-item strong { display: block; color: #166534; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px; }
    .credential-item span { font-size: 16px; color: #1a1a1a; font-family: 'Courier New', monospace; }
    .cta-button { display: inline-block; background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: #ffffff; padding: 16px 40px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; margin: 20px 0; text-align: center; }
    .info-box { background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 4px; }
    .info-box p { margin: 5px 0; font-size: 14px; }
    .features { margin: 25px 0; }
    .features h4 { color: #1a1a1a; margin-bottom: 15px; }
    .features ul { list-style: none; padding: 0; }
    .features li { padding: 8px 0; padding-left: 30px; position: relative; font-size: 14px; }
    .features li:before { content: "✓"; position: absolute; left: 0; color: #22c55e; font-weight: bold; font-size: 18px; }
    .footer { background-color: #1a1a1a; color: #ffffff; padding: 30px; text-align: center; font-size: 13px; }
    .footer a { color: #22c55e; text-decoration: none; }
    .divider { height: 1px; background-color: #e0e0e0; margin: 30px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header"><h1>✅ Checkliste vollständig!</h1></div>
    <div class="content">
      <div class="success-icon">🎊</div>
      <p>Hallo ${data.customerName},</p>
      <p>vielen Dank, dass Sie die Checkliste vollständig ausgefüllt haben! Wir haben alle Informationen erhalten und beginnen nun mit der Erstellung Ihrer professionellen Website.</p>
      <div class="divider"></div>
      <h3>🔐 Ihre Zugangsdaten zum Kunden-Dashboard</h3>
      <div class="credentials-box">
        <h3>Login-Informationen</h3>
        <div class="credential-item"><strong>E-Mail-Adresse</strong><span>${loginCredentials.email}</span></div>
        <div class="credential-item"><strong>Passwort</strong><span>${loginCredentials.password}</span></div>
      </div>
      <div class="info-box">
        <p><strong>⚠️ Wichtiger Sicherheitshinweis:</strong></p>
        <p>Bitte ändern Sie Ihr Passwort nach dem ersten Login im Dashboard unter "Profil". Bewahren Sie Ihre Zugangsdaten sicher auf.</p>
      </div>
      <p style="text-align: center;"><a href="${dashboardUrl}" class="cta-button">Zum Kunden-Dashboard</a></p>
      <div class="features">
        <h4>Was Sie im Dashboard tun können:</h4>
        <ul>
          <li>Fortschritt Ihrer Website verfolgen</li>
          <li>Änderungswünsche einreichen</li>
          <li>Ihre fertige Website herunterladen</li>
          <li>Support-Tickets erstellen</li>
          <li>Ihre Abonnements verwalten</li>
          <li>Rechnungen einsehen und herunterladen</li>
        </ul>
      </div>
      <div class="divider"></div>
      <h3>📅 Wie geht es weiter?</h3>
      <p>Unser Team arbeitet nun an Ihrer Website. Sie erhalten regelmäßige Updates zum Fortschritt. Die durchschnittliche Bearbeitungszeit beträgt 5-7 Werktage.</p>
      <p style="margin-top: 30px;">Bei Fragen stehen wir Ihnen jederzeit zur Verfügung.</p>
      <p style="margin-top: 30px;">Mit freundlichen Grüßen<br><strong>Ihr Webflix Team</strong></p>
    </div>
    <div class="footer">
      <p><strong>Webflix</strong></p>
      <p>Professionelle Websites für Ihr Unternehmen</p>
      <p style="margin-top: 15px;"><a href="https://webflix.de">webflix.de</a> | <a href="mailto:info@webflix.de">info@webflix.de</a></p>
      <p style="margin-top: 15px; font-size: 12px; color: #999;">© ${new Date().getFullYear()} Webflix. Alle Rechte vorbehalten.</p>
    </div>
  </div>
</body>
</html>
  `;

  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: { 'accept': 'application/json', 'api-key': BREVO_API_KEY || '', 'content-type': 'application/json' },
    body: JSON.stringify({
      sender: { email: 'support@webflix.info', name: 'Webflix' },
      to: [{ email: data.customerEmail, name: data.customerName }],
      subject: 'Ihre Zugangsdaten zum Webflix Kunden-Dashboard',
      htmlContent
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Brevo API Error: ${JSON.stringify(error)}`);
  }

  return response.json();
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const data: ChecklistCompletionData = await req.json();
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);
    const temporaryPassword = generateRandomPassword(12);

    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: data.customerEmail,
      password: temporaryPassword,
      email_confirm: true,
      user_metadata: { full_name: data.customerName, order_id: data.orderId }
    });

    if (authError && !authError.message.includes('already registered')) {
      throw authError;
    }

    const loginCredentials = { email: data.customerEmail, password: temporaryPassword };
    const result = await sendChecklistCompletionEmail(data, loginCredentials);

    return new Response(JSON.stringify({ success: true, messageId: result.messageId, userId: authData?.user?.id }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    console.error('Error sending checklist completion email:', error);
    return new Response(JSON.stringify({ success: false, error: error.message || 'Failed to send email' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});