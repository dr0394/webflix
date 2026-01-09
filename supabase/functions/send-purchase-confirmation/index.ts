import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface PurchaseData {
  customerEmail: string;
  customerName: string;
  orderNumber: string;
  orderId: string;
  templateName: string;
  duration: number;
  monthlyPrice: number;
  totalPrice: number;
  checklistUrl?: string;
}

function generateRandomPassword(length: number = 12): string {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%';
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

async function sendPurchaseConfirmation(data: PurchaseData, loginCredentials: { email: string; password: string }, isNewUser: boolean) {
  const BREVO_API_KEY = Deno.env.get('BREVO_API_KEY');
  const checklistUrl = data.checklistUrl || `https://webflix.info/checklist?order=${data.orderId}`;

  const credentialsSection = isNewUser ? `
      <h3>🔐 Ihre Zugangsdaten</h3>
      <p>Wir haben ein Kundenkonto für Sie erstellt. Mit diesen Zugangsdaten können Sie die Checkliste ausfüllen und später auf Ihr Dashboard zugreifen:</p>
      <div class="credentials-box">
        <h3>Login-Informationen</h3>
        <div class="credential-item"><strong>E-Mail-Adresse</strong><span>${loginCredentials.email}</span></div>
        <div class="credential-item"><strong>Passwort</strong><span>${loginCredentials.password}</span></div>
      </div>
      <div class="info-box">
        <p><strong>⚠️ Wichtiger Sicherheitshinweis:</strong></p>
        <p>Bitte ändern Sie Ihr Passwort nach dem ersten Login im Dashboard unter "Profil". Bewahren Sie Ihre Zugangsdaten sicher auf.</p>
      </div>
  ` : `
      <h3>🔐 Login für Bestandskunden</h3>
      <p>Sie haben bereits ein Kundenkonto bei uns. Bitte verwenden Sie Ihr bestehendes Passwort zum Login.</p>
      <div class="info-box">
        <p><strong>💡 Passwort vergessen?</strong></p>
        <p>Kein Problem! Sie können Ihr Passwort jederzeit zurücksetzen:</p>
        <p style="margin-top: 10px;"><a href="https://webflix.info/customer/login" style="color: #f59e0b; text-decoration: underline;">Zum Login mit Passwort-Reset-Option</a></p>
      </div>
  `;

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
    .header { background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%); padding: 40px 20px; text-align: center; }
    .header h1 { color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; }
    .content { padding: 40px 30px; }
    .order-box { background-color: #f8f9fa; border-left: 4px solid #FF6B35; padding: 20px; margin: 20px 0; }
    .order-box h3 { margin-top: 0; color: #FF6B35; }
    .order-details { margin: 15px 0; }
    .order-details p { margin: 8px 0; font-size: 14px; }
    .order-details strong { display: inline-block; width: 140px; }
    .credentials-box { background-color: #f0fdf4; border: 2px solid #22c55e; border-radius: 8px; padding: 25px; margin: 25px 0; }
    .credentials-box h3 { margin-top: 0; color: #16a34a; font-size: 18px; }
    .credential-item { background-color: #ffffff; padding: 12px 15px; margin: 10px 0; border-radius: 6px; border: 1px solid #bbf7d0; }
    .credential-item strong { display: block; color: #166534; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px; }
    .credential-item span { font-size: 16px; color: #1a1a1a; font-family: 'Courier New', monospace; word-break: break-all; }
    .cta-button { display: inline-block; background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%); color: #ffffff; padding: 16px 40px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; margin: 20px 0; text-align: center; }
    .info-box { background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 4px; }
    .info-box p { margin: 5px 0; font-size: 14px; }
    .documents { background-color: #e8f4f8; border: 1px solid #b3d9e8; padding: 15px; margin: 20px 0; border-radius: 6px; }
    .documents h4 { margin-top: 0; color: #0066cc; font-size: 16px; }
    .documents ul { margin: 10px 0; padding-left: 20px; }
    .documents li { margin: 5px 0; font-size: 14px; }
    .footer { background-color: #1a1a1a; color: #ffffff; padding: 30px; text-align: center; font-size: 13px; }
    .footer a { color: #FF6B35; text-decoration: none; }
    .divider { height: 1px; background-color: #e0e0e0; margin: 30px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header"><h1>🎉 Vielen Dank für Ihre Bestellung!</h1></div>
    <div class="content">
      <p>Hallo ${data.customerName},</p>
      <p>wir freuen uns sehr, dass Sie sich für Webflix entschieden haben! Ihre Bestellung wurde erfolgreich abgeschlossen.</p>
      <div class="order-box">
        <h3>📋 Ihre Bestelldetails</h3>
        <div class="order-details">
          <p><strong>Bestellnummer:</strong> ${data.orderNumber}</p>
          <p><strong>Website-Vorlage:</strong> ${data.templateName}</p>
          <p><strong>Laufzeit:</strong> ${data.duration} Monate</p>
          <p><strong>Monatlicher Preis:</strong> ${data.monthlyPrice.toFixed(2)} €</p>
          <p><strong>Gesamtpreis:</strong> ${data.totalPrice.toFixed(2)} €</p>
        </div>
      </div>
      <div class="divider"></div>
      ${credentialsSection}
      <div class="divider"></div>
      <h3>📝 Nächster Schritt: Checkliste ausfüllen</h3>
      <p>Um mit der Erstellung Ihrer professionellen Website zu beginnen, füllen Sie bitte unsere Checkliste aus. Loggen Sie sich dazu mit Ihren oben genannten Zugangsdaten ein:</p>
      <p style="text-align: center;"><a href="${checklistUrl}" class="cta-button">Jetzt Checkliste ausfüllen</a></p>
      <div class="divider"></div>
      <h3>📅 Wie geht es weiter?</h3>
      <p>Nach dem Ausfüllen der Checkliste beginnt unser Team mit der Erstellung Ihrer Website. Sie können den Fortschritt jederzeit in Ihrem Dashboard verfolgen.</p>
      <div class="documents">
        <h4>📎 Rechtliche Dokumente</h4>
        <p>Im Anhang dieser E-Mail finden Sie folgende Dokumente:</p>
        <ul><li>Allgemeine Geschäftsbedingungen (AGB)</li><li>Vertragsbestimmungen</li><li>Datenschutzerklärung</li></ul>
      </div>
      <div class="divider"></div>
      <p>Bei Fragen stehen wir Ihnen jederzeit gerne zur Verfügung.</p>
      <p style="margin-top: 30px;">Mit freundlichen Grüßen<br><strong>Ihr Webflix Team</strong></p>
    </div>
    <div class="footer">
      <p><strong>Webflix</strong></p>
      <p>Professionelle Websites für Ihr Unternehmen</p>
      <p style="margin-top: 15px;"><a href="https://webflix.info">webflix.info</a> | <a href="mailto:info@webflix.info">info@webflix.info</a></p>
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
      sender: { email: 'team@coachisi.de', name: 'Webflix' },
      to: [{ email: data.customerEmail, name: data.customerName }],
      subject: `Bestellbestätigung & Zugangsdaten - ${data.orderNumber}`,
      htmlContent,
      attachment: [
        { name: 'AGB.pdf', url: 'https://webflix.info/documents/agb.pdf' },
        { name: 'Vertragsbestimmungen.pdf', url: 'https://webflix.info/documents/vertragsbestimmungen.pdf' },
        { name: 'Datenschutz.pdf', url: 'https://webflix.info/documents/datenschutz.pdf' }
      ]
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
    const data: PurchaseData = await req.json();
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);
    const temporaryPassword = generateRandomPassword(12);

    let loginCredentials = { email: data.customerEmail, password: temporaryPassword };
    let userId: string | null = null;
    let isNewUser = false;

    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: data.customerEmail,
      password: temporaryPassword,
      email_confirm: true,
      user_metadata: { full_name: data.customerName, order_id: data.orderId }
    });

    if (authError) {
      if (authError.message.includes('already registered') || authError.message.includes('already been registered')) {
        console.log('User already exists, will send email without password');
        loginCredentials = { email: data.customerEmail, password: '***BEREITS REGISTRIERT - Bitte verwenden Sie Ihr bestehendes Passwort***' };
        isNewUser = false;
      } else {
        throw authError;
      }
    } else if (authData?.user) {
      userId = authData.user.id;
      isNewUser = true;
      console.log(`New user created: ${userId}`);
    }

    const result = await sendPurchaseConfirmation(data, loginCredentials, isNewUser);

    return new Response(JSON.stringify({
      success: true,
      messageId: result.messageId,
      userId,
      isNewUser
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    console.error('Error sending purchase confirmation:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message || 'Failed to send email'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
