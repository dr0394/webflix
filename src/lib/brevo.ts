interface EmailRecipient {
  email: string;
  name?: string;
}

interface EmailAttachment {
  name: string;
  content: string;
  url?: string;
}

interface SendEmailParams {
  to: EmailRecipient[];
  subject: string;
  htmlContent: string;
  textContent?: string;
  attachments?: EmailAttachment[];
}

const BREVO_API_KEY = import.meta.env.VITE_BREVO_API_KEY || import.meta.env.BREVO_API_KEY;
const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

const SENDER = {
  email: 'info@webflix.de',
  name: 'Webflix Team'
};

export async function sendEmail({ to, subject, htmlContent, textContent, attachments }: SendEmailParams) {
  try {
    const emailData: any = {
      sender: SENDER,
      to,
      subject,
      htmlContent,
      headers: {
        'X-Mailer': 'Webflix v1.0',
        'List-Unsubscribe': '<mailto:unsubscribe@webflix.de>',
        'Precedence': 'bulk'
      }
    };

    if (textContent) {
      emailData.textContent = textContent;
    }

    if (attachments && attachments.length > 0) {
      emailData.attachment = attachments;
    }

    const response = await fetch(BREVO_API_URL, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': BREVO_API_KEY,
        'content-type': 'application/json'
      },
      body: JSON.stringify(emailData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Brevo API Error: ${JSON.stringify(error)}`);
    }

    const result = await response.json();
    console.log('Email sent successfully:', result);
    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

export async function sendPurchaseConfirmationEmail(
  customerEmail: string,
  customerName: string,
  orderNumber: string,
  checklistUrl: string,
  orderDetails: {
    templateName: string;
    duration: number;
    monthlyPrice: number;
    totalPrice: number;
  }
) {
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
    .order-box {
      background-color: #f8f9fa;
      border-left: 4px solid #FF6B35;
      padding: 20px;
      margin: 20px 0;
    }
    .order-box h3 {
      margin-top: 0;
      color: #FF6B35;
    }
    .order-details {
      margin: 15px 0;
    }
    .order-details p {
      margin: 8px 0;
      font-size: 14px;
    }
    .order-details strong {
      display: inline-block;
      width: 140px;
    }
    .cta-button {
      display: inline-block;
      background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%);
      color: #ffffff;
      padding: 16px 40px;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 16px;
      margin: 20px 0;
      text-align: center;
    }
    .cta-button:hover {
      opacity: 0.9;
    }
    .documents {
      background-color: #fff8f5;
      border: 1px solid #ffe4d9;
      padding: 15px;
      margin: 20px 0;
      border-radius: 6px;
    }
    .documents h4 {
      margin-top: 0;
      color: #FF6B35;
      font-size: 16px;
    }
    .documents ul {
      margin: 10px 0;
      padding-left: 20px;
    }
    .documents li {
      margin: 5px 0;
      font-size: 14px;
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
    .footer a:hover {
      text-decoration: underline;
    }
    .social-links {
      margin-top: 15px;
    }
    .social-links a {
      color: #FF6B35;
      text-decoration: none;
      margin: 0 5px;
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
      <h2 style="color: #1a1a1a; margin-top: 0;">Vielen Dank für Ihre Bestellung!</h2>

      <p>Hallo ${customerName},</p>

      <p>wir freuen uns sehr, dass Sie sich für Webflix entschieden haben! Ihre Bestellung wurde erfolgreich abgeschlossen.</p>

      <div class="order-box">
        <h3>Ihre Bestelldetails</h3>
        <div class="order-details">
          <p><strong>Bestellnummer:</strong> ${orderNumber}</p>
          <p><strong>Website-Vorlage:</strong> ${orderDetails.templateName}</p>
          <p><strong>Laufzeit:</strong> ${orderDetails.duration} Monate</p>
          <p><strong>Monatlicher Preis:</strong> ${orderDetails.monthlyPrice.toFixed(2)} €</p>
          <p><strong>Gesamtpreis:</strong> ${orderDetails.totalPrice.toFixed(2)} €</p>
        </div>
      </div>

      <div class="divider"></div>

      <h3>Nächster Schritt: Checkliste ausfüllen</h3>
      <p>Um mit der Erstellung Ihrer professionellen Website zu beginnen, füllen Sie bitte unsere Checkliste aus. Dort geben Sie uns alle wichtigen Informationen zu Ihrem Unternehmen, Ihren Wünschen und Ihren Inhalten.</p>

      <p style="text-align: center;">
        <a href="${checklistUrl}" class="cta-button">Jetzt Checkliste ausfüllen</a>
      </p>

      <p style="font-size: 14px; color: #666;">
        <strong>Wichtig:</strong> Sobald Sie die Checkliste vollständig ausgefüllt haben, erhalten Sie eine weitere E-Mail mit Ihren Zugangsdaten zum Kunden-Dashboard. Dort können Sie den Fortschritt Ihrer Website verfolgen.
      </p>

      <div class="documents">
        <h4>Rechtliche Dokumente</h4>
        <p>Im Anhang dieser E-Mail finden Sie folgende Dokumente:</p>
        <ul>
          <li>Allgemeine Geschäftsbedingungen (AGB)</li>
          <li>Vertragsbestimmungen</li>
          <li>Datenschutzerklärung</li>
        </ul>
        <p style="font-size: 13px; color: #666; margin-top: 10px;">
          Bitte bewahren Sie diese Dokumente sorgfältig auf.
        </p>
      </div>

      <div class="divider"></div>

      <p>Bei Fragen stehen wir Ihnen jederzeit gerne zur Verfügung. Besuchen Sie unsere <a href="https://webflix.de/support" style="color: #FF6B35;">Support-Seite</a> oder schreiben Sie uns an <a href="mailto:support@webflix.de" style="color: #FF6B35;">support@webflix.de</a>.</p>

      <p style="margin-top: 30px;">Mit freundlichen Grüßen<br><strong>Ihr Webflix Team</strong></p>
    </div>

    <div class="footer">
      <p><strong>Webflix</strong></p>
      <p>Professionelle Websites für Ihr Unternehmen</p>
      <p style="margin-top: 15px;">
        <a href="https://webflix.de">webflix.de</a> |
        <a href="mailto:info@webflix.de">info@webflix.de</a>
      </p>
      <div class="social-links">
        <a href="https://www.instagram.com/webflix.info/">Instagram</a> |
        <a href="https://webflix.de/support">Support</a>
      </div>
      <p style="margin-top: 15px; font-size: 12px; color: #999;">
        © ${new Date().getFullYear()} Webflix. Alle Rechte vorbehalten.
      </p>
    </div>
  </div>
</body>
</html>
  `;

  const attachments: EmailAttachment[] = [
    {
      name: 'AGB.pdf',
      url: 'https://webflix.de/documents/agb.pdf'
    },
    {
      name: 'Vertragsbestimmungen.pdf',
      url: 'https://webflix.de/documents/vertragsbestimmungen.pdf'
    },
    {
      name: 'Datenschutz.pdf',
      url: 'https://webflix.de/documents/datenschutz.pdf'
    }
  ];

  const textContent = `
Hallo ${customerName},

vielen Dank für Ihre Bestellung bei Webflix!

IHRE BESTELLDETAILS
Bestellnummer: ${orderNumber}
Website-Vorlage: ${orderDetails.templateName}
Laufzeit: ${orderDetails.duration} Monate
Monatlicher Preis: ${orderDetails.monthlyPrice.toFixed(2)} €
Gesamtpreis: ${orderDetails.totalPrice.toFixed(2)} €

NÄCHSTER SCHRITT
Füllen Sie bitte unsere Checkliste aus, um mit der Erstellung Ihrer Website zu beginnen:
${checklistUrl}

Sobald Sie die Checkliste ausgefüllt haben, erhalten Sie Ihre Zugangsdaten zum Kunden-Dashboard.

Bei Fragen besuchen Sie unsere Support-Seite oder erreichen Sie uns unter support@webflix.de

Mit freundlichen Grüßen
Ihr Webflix Team

---
Webflix - Professionelle Websites für Ihr Unternehmen
webflix.de | info@webflix.de | Instagram: instagram.com/webflix.info
`;

  return sendEmail({
    to: [{ email: customerEmail, name: customerName }],
    subject: `Bestellbestätigung - ${orderNumber}`,
    htmlContent,
    textContent,
    attachments
  });
}

export async function sendChecklistCompletionEmail(
  customerEmail: string,
  customerName: string,
  dashboardUrl: string,
  loginCredentials: {
    email: string;
    password: string;
  }
) {
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
    .success-icon {
      text-align: center;
      font-size: 60px;
      margin: 20px 0;
    }
    .credentials-box {
      background-color: #fff8f5;
      border: 2px solid #FF6B35;
      border-radius: 8px;
      padding: 25px;
      margin: 25px 0;
    }
    .credentials-box h3 {
      margin-top: 0;
      color: #FF6B35;
      font-size: 18px;
    }
    .credential-item {
      background-color: #ffffff;
      padding: 12px 15px;
      margin: 10px 0;
      border-radius: 6px;
      border: 1px solid #ffe4d9;
    }
    .credential-item strong {
      display: block;
      color: #cc5529;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 5px;
    }
    .credential-item span {
      font-size: 16px;
      color: #1a1a1a;
      font-family: 'Courier New', monospace;
    }
    .cta-button {
      display: inline-block;
      background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%);
      color: #ffffff;
      padding: 16px 40px;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 16px;
      margin: 20px 0;
      text-align: center;
    }
    .cta-button:hover {
      opacity: 0.9;
    }
    .info-box {
      background-color: #fef3c7;
      border-left: 4px solid #f59e0b;
      padding: 15px;
      margin: 20px 0;
      border-radius: 4px;
    }
    .info-box p {
      margin: 5px 0;
      font-size: 14px;
    }
    .features {
      margin: 25px 0;
    }
    .features h4 {
      color: #1a1a1a;
      margin-bottom: 15px;
    }
    .features ul {
      list-style: none;
      padding: 0;
    }
    .features li {
      padding: 8px 0;
      padding-left: 30px;
      position: relative;
      font-size: 14px;
    }
    .features li:before {
      content: "✓";
      position: absolute;
      left: 0;
      color: #FF6B35;
      font-weight: bold;
      font-size: 18px;
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
    .footer a:hover {
      text-decoration: underline;
    }
    .social-links {
      margin-top: 15px;
    }
    .social-links a {
      color: #FF6B35;
      text-decoration: none;
      margin: 0 5px;
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
      <h2 style="color: #1a1a1a; margin-top: 0;">Checkliste vollständig!</h2>

      <p>Hallo ${customerName},</p>

      <p>vielen Dank, dass Sie die Checkliste vollständig ausgefüllt haben! Wir haben alle Informationen erhalten und beginnen nun mit der Erstellung Ihrer professionellen Website.</p>

      <div class="divider"></div>

      <h3>Ihre Zugangsdaten zum Kunden-Dashboard</h3>

      <div class="credentials-box">
        <h3>Login-Informationen</h3>
        <div class="credential-item">
          <strong>E-Mail-Adresse</strong>
          <span>${loginCredentials.email}</span>
        </div>
        <div class="credential-item">
          <strong>Passwort</strong>
          <span>${loginCredentials.password}</span>
        </div>
      </div>

      <div class="info-box">
        <p><strong>Wichtiger Sicherheitshinweis:</strong></p>
        <p>Bitte ändern Sie Ihr Passwort nach dem ersten Login im Dashboard unter "Profil". Bewahren Sie Ihre Zugangsdaten sicher auf.</p>
      </div>

      <p style="text-align: center;">
        <a href="${dashboardUrl}" class="cta-button">Zum Kunden-Dashboard</a>
      </p>

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

      <h3>Wie geht es weiter?</h3>
      <p>Unser Team arbeitet nun an Ihrer Website. Sie erhalten regelmäßige Updates zum Fortschritt. Die durchschnittliche Bearbeitungszeit beträgt 5-7 Werktage.</p>

      <p style="margin-top: 30px;">Bei Fragen stehen wir Ihnen jederzeit zur Verfügung. Besuchen Sie unsere <a href="https://webflix.de/support" style="color: #FF6B35;">Support-Seite</a> oder schreiben Sie uns an <a href="mailto:support@webflix.de" style="color: #FF6B35;">support@webflix.de</a>.</p>

      <p style="margin-top: 30px;">Mit freundlichen Grüßen<br><strong>Ihr Webflix Team</strong></p>
    </div>

    <div class="footer">
      <p><strong>Webflix</strong></p>
      <p>Professionelle Websites für Ihr Unternehmen</p>
      <p style="margin-top: 15px;">
        <a href="https://webflix.de">webflix.de</a> |
        <a href="mailto:info@webflix.de">info@webflix.de</a>
      </p>
      <div class="social-links">
        <a href="https://www.instagram.com/webflix.info/">Instagram</a> |
        <a href="https://webflix.de/support">Support</a>
      </div>
      <p style="margin-top: 15px; font-size: 12px; color: #999;">
        © ${new Date().getFullYear()} Webflix. Alle Rechte vorbehalten.
      </p>
    </div>
  </div>
</body>
</html>
  `;

  const textContent = `
Hallo ${customerName},

vielen Dank, dass Sie die Checkliste vollständig ausgefüllt haben!

IHRE ZUGANGSDATEN ZUM KUNDEN-DASHBOARD

E-Mail-Adresse: ${loginCredentials.email}
Passwort: ${loginCredentials.password}

Login hier: ${dashboardUrl}

WICHTIGER SICHERHEITSHINWEIS
Bitte ändern Sie Ihr Passwort nach dem ersten Login im Dashboard unter "Profil".

WAS SIE IM DASHBOARD TUN KÖNNEN:
- Fortschritt Ihrer Website verfolgen
- Änderungswünsche einreichen
- Ihre fertige Website herunterladen
- Support-Tickets erstellen
- Ihre Abonnements verwalten
- Rechnungen einsehen und herunterladen

WIE GEHT ES WEITER?
Unser Team arbeitet nun an Ihrer Website. Die durchschnittliche Bearbeitungszeit beträgt 5-7 Werktage.

Bei Fragen besuchen Sie unsere Support-Seite oder erreichen Sie uns unter support@webflix.de

Mit freundlichen Grüßen
Ihr Webflix Team

---
Webflix - Professionelle Websites für Ihr Unternehmen
webflix.de | info@webflix.de | Instagram: instagram.com/webflix.info
`;

  return sendEmail({
    to: [{ email: customerEmail, name: customerName }],
    subject: 'Ihre Zugangsdaten zum Webflix Kunden-Dashboard',
    htmlContent,
    textContent
  });
}

export async function sendWaitlistConfirmationEmail(
  customerEmail: string,
  customerName: string
) {
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
    .info-box {
      background-color: #fff3cd;
      border-left: 4px solid #ffc107;
      padding: 15px;
      margin: 20px 0;
      border-radius: 4px;
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
    .footer a:hover {
      text-decoration: underline;
    }
    .social-links {
      margin-top: 15px;
    }
    .social-links a {
      color: #FF6B35;
      text-decoration: none;
      margin: 0 5px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://i.imgur.com/2SbjgE7.png" alt="Webflix Logo">
    </div>

    <div class="content">
      <h2 style="color: #1a1a1a; margin-top: 0;">Auf der Warteliste!</h2>

      <p>Hallo ${customerName},</p>

      <p>vielen Dank für dein Interesse an Webflix! Du stehst jetzt auf unserer Warteliste.</p>

      <div class="info-box">
        <p><strong>Das bedeutet für dich:</strong></p>
        <p>Sobald wieder Website-Plätze verfügbar sind, informieren wir dich sofort per E-Mail. Das geht in der Regel ziemlich schnell!</p>
      </div>

      <p>Wir limitieren unsere wöchentlichen Verkäufe bewusst, um jedem Kunden die beste Qualität und den besten Service zu bieten.</p>

      <p style="margin-top: 30px;">Mit freundlichen Grüßen<br><strong>Dein Webflix Team</strong></p>
    </div>

    <div class="footer">
      <p><strong>Webflix</strong></p>
      <p>Professionelle Websites für dein Unternehmen</p>
      <p style="margin-top: 15px;">
        <a href="https://webflix.de">webflix.de</a> |
        <a href="mailto:info@webflix.de">info@webflix.de</a>
      </p>
      <div class="social-links">
        <a href="https://www.instagram.com/webflix.info/">Instagram</a> |
        <a href="https://webflix.de/support">Support</a>
      </div>
      <p style="margin-top: 15px; font-size: 12px; color: #999;">
        © ${new Date().getFullYear()} Webflix. Alle Rechte vorbehalten.
      </p>
    </div>
  </div>
</body>
</html>
  `;

  const textContent = `
Hallo ${customerName},

vielen Dank für dein Interesse an Webflix! Du stehst jetzt auf unserer Warteliste.

Das bedeutet für dich:
Sobald wieder Website-Plätze verfügbar sind, informieren wir dich sofort per E-Mail. Das geht in der Regel ziemlich schnell!

Wir limitieren unsere wöchentlichen Verkäufe bewusst, um jedem Kunden die beste Qualität und den besten Service zu bieten.

Mit freundlichen Grüßen
Dein Webflix Team

---
Webflix - Professionelle Websites für dein Unternehmen
webflix.de | info@webflix.de | Instagram: instagram.com/webflix.info
`;

  return sendEmail({
    to: [{ email: customerEmail, name: customerName }],
    subject: 'Du stehst auf der Webflix Warteliste!',
    htmlContent,
    textContent
  });
}

export async function sendWaitlistAvailableEmail(
  customerEmail: string,
  customerName: string
) {
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
    .cta-button {
      display: inline-block;
      background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%);
      color: #ffffff;
      padding: 16px 40px;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 16px;
      margin: 20px 0;
      text-align: center;
    }
    .cta-button:hover {
      opacity: 0.9;
    }
    .urgency-box {
      background-color: #fef3c7;
      border-left: 4px solid #f59e0b;
      padding: 15px;
      margin: 20px 0;
      border-radius: 4px;
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
    .footer a:hover {
      text-decoration: underline;
    }
    .social-links {
      margin-top: 15px;
    }
    .social-links a {
      color: #FF6B35;
      text-decoration: none;
      margin: 0 5px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://i.imgur.com/2SbjgE7.png" alt="Webflix Logo">
    </div>

    <div class="content">
      <h2 style="color: #1a1a1a; margin-top: 0;">Plätze wieder verfügbar!</h2>

      <p>Hallo ${customerName},</p>

      <p><strong>Großartige Neuigkeiten!</strong> Wir haben wieder freie Plätze für diese Woche verfügbar.</p>

      <div class="urgency-box">
        <p><strong>Schnell sein lohnt sich!</strong></p>
        <p>Die Plätze sind erfahrungsgemäß sehr schnell vergeben. Sichere dir jetzt deine professionelle Website!</p>
      </div>

      <p style="text-align: center;">
        <a href="https://webflix.de/shop" class="cta-button">Jetzt Website sichern</a>
      </p>

      <p>Wir freuen uns darauf, deine Website zu erstellen!</p>

      <p style="margin-top: 30px;">Mit freundlichen Grüßen<br><strong>Dein Webflix Team</strong></p>
    </div>

    <div class="footer">
      <p><strong>Webflix</strong></p>
      <p>Professionelle Websites für dein Unternehmen</p>
      <p style="margin-top: 15px;">
        <a href="https://webflix.de">webflix.de</a> |
        <a href="mailto:info@webflix.de">info@webflix.de</a>
      </p>
      <div class="social-links">
        <a href="https://www.instagram.com/webflix.info/">Instagram</a> |
        <a href="https://webflix.de/support">Support</a>
      </div>
      <p style="margin-top: 15px; font-size: 12px; color: #999;">
        © ${new Date().getFullYear()} Webflix. Alle Rechte vorbehalten.
      </p>
    </div>
  </div>
</body>
</html>
  `;

  const textContent = `
Hallo ${customerName},

Großartige Neuigkeiten! Wir haben wieder freie Plätze für diese Woche verfügbar.

SCHNELL SEIN LOHNT SICH!
Die Plätze sind erfahrungsgemäß sehr schnell vergeben. Sichere dir jetzt deine professionelle Website!

Jetzt Website sichern: https://webflix.de/shop

Wir freuen uns darauf, deine Website zu erstellen!

Mit freundlichen Grüßen
Dein Webflix Team

---
Webflix - Professionelle Websites für dein Unternehmen
webflix.de | info@webflix.de | Instagram: instagram.com/webflix.info
`;

  return sendEmail({
    to: [{ email: customerEmail, name: customerName }],
    subject: '🎉 Webflix Plätze wieder verfügbar!',
    htmlContent,
    textContent
  });
}
