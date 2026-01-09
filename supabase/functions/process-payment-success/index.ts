import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const generateRandomPassword = (): string => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  let password = '';
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
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

                            <h3 style="margin: 24px 0 16px 0; font-size: 18px; font-weight: 600; color: #333333;">Ihre Rechnung</h3>

                            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; margin-bottom: 24px;">
                                <tr>
                                    <td style="padding: 16px;">
                                        <p style="margin: 0 0 12px 0; font-size: 14px; color: #666666;">
                                            Ihre erste Rechnung steht zum Download bereit:
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

const getEmailHTML = (
  email: string,
  firstName: string,
  company: string,
  password: string,
  loginUrl: string,
  checklistUrl: string,
  orderNumber: string,
  templateName: string
): string => {
  return `
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Willkommen bei Webflix</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px 0;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

                    <tr>
                        <td style="background: linear-gradient(135deg, #f97316 0%, #ec4899 100%); padding: 32px 24px; text-align: center;">
                            <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff;">Willkommen bei Webflix!</h1>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 32px 24px;">
                            <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.5; color: #333333;">
                                Hallo <strong>${firstName}</strong>,
                            </p>
                            <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.5; color: #333333;">
                                vielen Dank für Ihre Bestellung! Ihre Website <strong>${templateName}</strong> wird jetzt vorbereitet.
                            </p>
                            <p style="margin: 0 0 24px 0; font-size: 14px; line-height: 1.5; color: #666666;">
                                Bestellnummer: <strong>${orderNumber}</strong>
                            </p>

                            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fff8f0; border: 2px solid #f97316; border-radius: 8px; margin-bottom: 24px;">
                                <tr>
                                    <td style="padding: 20px;">
                                        <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600; color: #f97316;">Ihre Zugangsdaten</h3>
                                        <table width="100%" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td style="padding: 6px 0; font-size: 14px; color: #666666; width: 100px;">E-Mail:</td>
                                                <td style="padding: 6px 0; font-size: 14px; color: #333333; font-weight: 500;">${email}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 6px 0; font-size: 14px; color: #666666;">Passwort:</td>
                                                <td style="padding: 6px 0; font-size: 14px; color: #333333; font-weight: 500; font-family: 'Courier New', monospace;">${password}</td>
                                            </tr>
                                        </table>
                                        <p style="margin: 12px 0 0 0; font-size: 12px; color: #f97316; font-weight: 500;">
                                            Bitte bewahren Sie diese Zugangsdaten sicher auf!
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                                <tr>
                                    <td align="center" style="padding: 16px 0;">
                                        <a href="${loginUrl}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #f97316 0%, #ec4899 100%); color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
                                            Zum Kunden-Dashboard
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <h3 style="margin: 24px 0 16px 0; font-size: 18px; font-weight: 600; color: #333333;">Ihre nächsten Schritte:</h3>

                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 12px;">
                                <tr>
                                    <td style="width: 32px; vertical-align: top; padding-top: 2px;">
                                        <div style="width: 28px; height: 28px; background: linear-gradient(135deg, #f97316 0%, #ec4899 100%); border-radius: 50%; text-align: center; line-height: 28px; font-weight: 700; color: #ffffff; font-size: 14px;">1</div>
                                    </td>
                                    <td style="padding-left: 12px;">
                                        <p style="margin: 0 0 4px 0; font-size: 15px; font-weight: 600; color: #333333;">Checkliste ausfüllen</p>
                                        <p style="margin: 0 0 8px 0; font-size: 14px; line-height: 1.5; color: #666666;">
                                            Bereiten Sie Ihre Inhalte vor: Texte, Bilder, Logo und weitere Informationen
                                        </p>
                                        <a href="${checklistUrl}" style="display: inline-block; color: #f97316; text-decoration: none; font-size: 14px; font-weight: 500;">
                                            Zur Checkliste →
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 12px;">
                                <tr>
                                    <td style="width: 32px; vertical-align: top; padding-top: 2px;">
                                        <div style="width: 28px; height: 28px; background-color: #e5e7eb; border-radius: 50%; text-align: center; line-height: 28px; font-weight: 700; color: #666666; font-size: 14px;">2</div>
                                    </td>
                                    <td style="padding-left: 12px;">
                                        <p style="margin: 0 0 4px 0; font-size: 15px; font-weight: 600; color: #333333;">Inhalte bereitstellen</p>
                                        <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #666666;">
                                            Laden Sie alle Materialien über Ihr Dashboard hoch
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                                <tr>
                                    <td style="width: 32px; vertical-align: top; padding-top: 2px;">
                                        <div style="width: 28px; height: 28px; background-color: #e5e7eb; border-radius: 50%; text-align: center; line-height: 28px; font-weight: 700; color: #666666; font-size: 14px;">3</div>
                                    </td>
                                    <td style="padding-left: 12px;">
                                        <p style="margin: 0 0 4px 0; font-size: 15px; font-weight: 600; color: #333333;">Website geht live</p>
                                        <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #666666;">
                                            Innerhalb von 48h nach Bereitstellung aller Inhalte ist Ihre Website online
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0fdf4; border: 2px solid #22c55e; border-radius: 8px; margin-bottom: 24px;">
                                <tr>
                                    <td style="padding: 16px; text-align: center;">
                                        <p style="margin: 0 0 4px 0; font-size: 16px; color: #22c55e; font-weight: 600;">
                                            48h-Go-Live-Garantie
                                        </p>
                                        <p style="margin: 0; font-size: 14px; color: #666666;">
                                            Nach Bereitstellung aller Inhalte
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <h3 style="margin: 24px 0 12px 0; font-size: 16px; font-weight: 600; color: #333333;">Brauchen Sie Hilfe?</h3>
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

const sendAdminNotification = async (
  customerEmail: string,
  customerName: string,
  company: string,
  orderNumber: string,
  templateName: string,
  orderData: any
): Promise<boolean> => {
  try {
    const brevoApiKey = Deno.env.get('BREVO_API_KEY');
    if (!brevoApiKey) {
      console.log('⚠️ Brevo API key not configured for admin notification');
      return true;
    }

    const htmlContent = `
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Neuer Verkauf</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px 0;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <tr>
                        <td style="background: linear-gradient(135deg, #10b981 0%, #06b6d4 100%); padding: 32px 24px; text-align: center;">
                            <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff;">🎉 Neuer Verkauf!</h1>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 32px 24px;">
                            <h2 style="margin: 0 0 20px 0; font-size: 20px; font-weight: 600; color: #333333;">Bestelldetails</h2>

                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                                <tr>
                                    <td style="padding: 8px 0; font-size: 14px; color: #666666; width: 150px;">Bestellnummer:</td>
                                    <td style="padding: 8px 0; font-size: 14px; color: #333333; font-weight: 600;">${orderNumber}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; font-size: 14px; color: #666666;">Template:</td>
                                    <td style="padding: 8px 0; font-size: 14px; color: #333333; font-weight: 600;">${templateName}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; font-size: 14px; color: #666666;">Preis:</td>
                                    <td style="padding: 8px 0; font-size: 14px; color: #333333; font-weight: 600;">${orderData.template_data?.price || 'N/A'}€</td>
                                </tr>
                            </table>

                            <h2 style="margin: 24px 0 20px 0; font-size: 20px; font-weight: 600; color: #333333;">Kundendaten</h2>

                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                                <tr>
                                    <td style="padding: 8px 0; font-size: 14px; color: #666666; width: 150px;">Name:</td>
                                    <td style="padding: 8px 0; font-size: 14px; color: #333333; font-weight: 600;">${customerName}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; font-size: 14px; color: #666666;">Unternehmen:</td>
                                    <td style="padding: 8px 0; font-size: 14px; color: #333333; font-weight: 600;">${company}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; font-size: 14px; color: #666666;">E-Mail:</td>
                                    <td style="padding: 8px 0; font-size: 14px; color: #333333; font-weight: 600;">${customerEmail}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; font-size: 14px; color: #666666;">Telefon:</td>
                                    <td style="padding: 8px 0; font-size: 14px; color: #333333; font-weight: 600;">${orderData.customer_data?.phone || 'N/A'}</td>
                                </tr>
                            </table>

                            <div style="margin-top: 24px; padding: 16px; background-color: #f0fdf4; border: 2px solid #10b981; border-radius: 8px;">
                                <p style="margin: 0; font-size: 14px; color: #065f46; font-weight: 600;">
                                    ✅ Kundenkonto wurde automatisch erstellt<br>
                                    ✅ Willkommens-E-Mail wurde versendet<br>
                                    ✅ Branding-System wurde initialisiert
                                </p>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 24px; background-color: #f9fafb; text-align: center; border-top: 1px solid #e5e7eb;">
                            <p style="margin: 0; font-size: 12px; color: #6b7280;">
                                Diese E-Mail wurde automatisch vom Webflix-System generiert.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;

    const emailData = {
      sender: {
        name: 'Webflix System',
        email: 'noreply@webflix.de'
      },
      to: [{ email: 'kontakt@webflix.info', name: 'Webflix Team' }],
      subject: `🎉 Neuer Verkauf: ${templateName} - ${orderNumber}`,
      htmlContent
    };

    console.log('📧 Sending admin notification to: kontakt@webflix.info');

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
      console.error('❌ Admin notification error:', error);
      return false;
    }

    console.log('✅ Admin notification sent successfully');
    return true;
  } catch (error) {
    console.error('❌ Error sending admin notification:', error);
    return false;
  }
};

const sendSubscriptionInvoiceEmail = async (
  email: string,
  customerName: string,
  company: string,
  planName: string,
  monthlyPrice: number,
  contractDuration: number,
  startDate: string,
  endDate: string | null,
  stripeCustomerId: string
): Promise<boolean> => {
  console.log('🔔 sendSubscriptionInvoiceEmail called with:', {
    email,
    customerName,
    planName,
    monthlyPrice,
    contractDuration,
    stripeCustomerId
  });

  try {
    const brevoApiKey = Deno.env.get('BREVO_API_KEY');
    if (!brevoApiKey) {
      console.error('❌ CRITICAL: Brevo API key not configured!');
      return false;
    }
    console.log('✅ Brevo API key found');

    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeSecretKey) {
      console.error('❌ CRITICAL: Stripe secret key not configured!');
      return false;
    }
    console.log('✅ Stripe secret key found');

    // Create Stripe portal session
    console.log('🔑 Creating Stripe portal session for customer:', stripeCustomerId);
    const portalResponse = await fetch('https://api.stripe.com/v1/billing_portal/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${stripeSecretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        customer: stripeCustomerId,
        return_url: 'https://webflix.de/customer/dashboard'
      }).toString()
    });

    if (!portalResponse.ok) {
      const errorText = await portalResponse.text();
      console.error('❌ Failed to create portal session. Status:', portalResponse.status);
      console.error('❌ Error details:', errorText);
      return false;
    }

    const portalSession = await portalResponse.json();
    const portalUrl = portalSession.url;
    console.log('✅ Portal session created:', portalUrl);

    // Get latest invoice for this customer
    console.log('📄 Fetching latest invoice for customer:', stripeCustomerId);
    const invoicesResponse = await fetch(
      `https://api.stripe.com/v1/invoices?customer=${stripeCustomerId}&limit=1`,
      {
        headers: {
          'Authorization': `Bearer ${stripeSecretKey}`,
        }
      }
    );

    let invoiceUrl = '';
    if (invoicesResponse.ok) {
      const invoices = await invoicesResponse.json();
      if (invoices.data && invoices.data.length > 0) {
        invoiceUrl = invoices.data[0].invoice_pdf || invoices.data[0].hosted_invoice_url || '';
        console.log('✅ Invoice URL found:', invoiceUrl);
      } else {
        console.log('⚠️ No invoices found for customer');
      }
    } else {
      console.error('❌ Failed to fetch invoices:', await invoicesResponse.text());
    }

    console.log('🎨 Generating HTML email content...');
    const htmlContent = getSubscriptionInvoiceEmailHTML(
      customerName,
      company,
      planName,
      monthlyPrice,
      contractDuration,
      startDate,
      endDate,
      portalUrl,
      invoiceUrl
    );

    const emailData = {
      sender: {
        name: 'Webflix',
        email: 'noreply@webflix.de'
      },
      to: [{ email, name: customerName }],
      subject: `Ihr Webflix Abonnement: ${planName}`,
      htmlContent
    };

    console.log('📧 Sending subscription invoice email via Brevo...');
    console.log('📧 Recipient:', email);
    console.log('📧 Subject:', emailData.subject);

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
      console.error('❌ Brevo API error. Status:', response.status);
      console.error('❌ Error details:', error);
      return false;
    }

    const responseData = await response.json();
    console.log('✅ Brevo response:', responseData);
    console.log('✅ Subscription invoice email sent successfully to:', email);
    return true;
  } catch (error) {
    console.error('❌ EXCEPTION in sendSubscriptionInvoiceEmail:', error);
    console.error('❌ Error stack:', error.stack);
    return false;
  }
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
      console.log('⚠️ Brevo API key not configured');
      console.log('📧 Email would be sent with data:', {
        to: email,
        firstName,
        company,
        password,
        orderNumber,
        templateName,
        onboardingToken
      });
      return true;
    }

    const siteUrl = Deno.env.get('SITE_URL') || 'https://webflix.de';
    const loginUrl = `${siteUrl}/customer/login`;
    const checklistUrl = `${siteUrl}/customer/dashboard`;

    const htmlContent = getEmailHTML(
      email,
      firstName,
      company,
      password,
      loginUrl,
      checklistUrl,
      orderNumber,
      templateName
    );

    const emailData = {
      sender: {
        name: 'Webflix',
        email: 'noreply@webflix.de'
      },
      to: [{ email, name: firstName }],
      subject: `Willkommen bei Webflix - Ihre Website ${templateName} wird vorbereitet!`,
      htmlContent
    };

    console.log('📧 Sending email via Brevo to:', email);

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
      console.error('❌ Brevo email error:', error);
      return false;
    }

    console.log('✅ Welcome email sent successfully to:', email);
    return true;
  } catch (error) {
    console.error('❌ Error sending welcome email:', error);
    return false;
  }
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  console.log('🔄 Process Payment Success called');

  try {
    const body = await req.json();
    console.log('📦 Request body:', JSON.stringify(body, null, 2));

    const { orderNumber, sessionId } = body;

    if (!orderNumber) {
      console.error('❌ No order number provided');
      return new Response(
        JSON.stringify({ error: 'Order number required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('🔍 Looking for order:', orderNumber);

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    const { data: order, error: orderError } = await supabaseAdmin
      .from('webflix_orders')
      .select('*')
      .eq('order_number', orderNumber)
      .single();

    if (orderError || !order) {
      console.error('❌ Order not found:', orderNumber, orderError);
      return new Response(
        JSON.stringify({
          error: 'Order not found',
          orderNumber,
          details: orderError?.message
        }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('✅ Order found:', order.id);
    console.log('👤 Customer email:', order.customer_data.email);

    const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
    const userExists = existingUsers?.users?.some(u => u.email === order.customer_data.email);

    console.log('👤 User exists?', userExists);

    let password = '';
    let userId = '';

    if (!userExists) {
      console.log('🔐 Creating new user account...');
      password = generateRandomPassword();

      const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email: order.customer_data.email,
        password,
        email_confirm: true,
        user_metadata: {
          first_name: order.customer_data.firstName,
          last_name: order.customer_data.lastName,
          company: order.customer_data.company,
          role: 'customer'
        }
      });

      if (authError) {
        console.error('❌ Error creating auth user:', authError);
        return new Response(
          JSON.stringify({
            error: 'Account creation failed',
            details: authError.message
          }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      userId = authData.user.id;
      console.log('✅ Customer account created:', order.customer_data.email);
    } else {
      console.log('ℹ️ User already exists:', order.customer_data.email);
      const user = existingUsers.users.find(u => u.email === order.customer_data.email);
      userId = user?.id || '';
      password = '[EXISTING_ACCOUNT]';
    }

    console.log('🔍 Looking for customer_brandings...');

    const { data: branding, error: brandingError } = await supabaseAdmin
      .from('customer_brandings')
      .select('onboarding_token')
      .eq('order_id', order.id)
      .maybeSingle();

    if (brandingError) {
      console.error('❌ Error fetching branding:', brandingError);
    }

    if (!branding) {
      console.error('❌ No branding found for order:', order.id);
      console.log('🔧 Attempting to create branding manually...');

      const token = crypto.randomUUID();
      const { data: newBranding, error: createError } = await supabaseAdmin
        .from('customer_brandings')
        .insert({
          order_id: order.id,
          onboarding_token: token,
          status: 'onboarding_pending'
        })
        .select('onboarding_token')
        .single();

      if (createError) {
        console.error('❌ Failed to create branding:', createError);
        return new Response(
          JSON.stringify({
            error: 'Branding creation failed',
            details: createError.message
          }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      console.log('✅ Branding created manually with token:', token);

      if (!userExists && newBranding) {
        await sendWelcomeEmail(
          order.customer_data.email,
          order.customer_data.firstName,
          order.customer_data.company,
          password,
          newBranding.onboarding_token,
          orderNumber,
          order.template_data.name
        );
      }

      console.log('📧 Sending admin notification...');
      await sendAdminNotification(
        order.customer_data.email,
        `${order.customer_data.firstName} ${order.customer_data.lastName}`,
        order.customer_data.company,
        orderNumber,
        order.template_data.name,
        order
      );

      const siteUrl = Deno.env.get('SITE_URL') || 'https://webflix.de';
      return new Response(
        JSON.stringify({
          success: true,
          accountCreated: !userExists,
          emailSent: !userExists,
          loginEmail: order.customer_data.email,
          loginPassword: !userExists ? password : null,
          checklistUrl: `${siteUrl}/customer/dashboard`,
          onboardingToken: newBranding.onboarding_token,
          brandingCreatedManually: true
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('✅ Branding found with token:', branding.onboarding_token);

    if (!userExists) {
      console.log('📧 Sending welcome email...');
      const emailSent = await sendWelcomeEmail(
        order.customer_data.email,
        order.customer_data.firstName,
        order.customer_data.company,
        password,
        branding.onboarding_token,
        orderNumber,
        order.template_data.name
      );

      if (!emailSent) {
        console.warn('⚠️ Email sending failed, but account was created');
      }
    }

    console.log('📧 Sending admin notification...');
    await sendAdminNotification(
      order.customer_data.email,
      `${order.customer_data.firstName} ${order.customer_data.lastName}`,
      order.customer_data.company,
      orderNumber,
      order.template_data.name,
      order
    );

    // Create subscription if session has subscription data
    if (sessionId) {
      console.log('🔍 Checking Stripe session for subscription data...');
      try {
        const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
        if (stripeSecretKey) {
          const sessionResponse = await fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}`, {
            headers: {
              'Authorization': `Bearer ${stripeSecretKey}`,
            },
          });

          if (sessionResponse.ok) {
            const session = await sessionResponse.json();
            console.log('📦 Stripe session data:', JSON.stringify(session, null, 2));

            if (session.subscription && session.customer) {
              console.log('💳 Creating subscription record...');

              // Get subscription details from Stripe
              const subResponse = await fetch(`https://api.stripe.com/v1/subscriptions/${session.subscription}`, {
                headers: {
                  'Authorization': `Bearer ${stripeSecretKey}`,
                },
              });

              if (subResponse.ok) {
                const subscription = await subResponse.json();
                console.log('📋 Subscription details:', JSON.stringify(subscription, null, 2));

                // Extract contract duration from subscription metadata or product metadata
                const contractDuration = parseInt(
                  subscription.metadata?.contract_duration ||
                  subscription.items?.data?.[0]?.price?.product?.metadata?.contract_duration ||
                  '0'
                );
                const planName = subscription.items?.data?.[0]?.price?.product?.name || order.template_data.name;
                const monthlyPrice = (subscription.items?.data?.[0]?.price?.unit_amount || 0) / 100;

                console.log('📊 Extracted subscription data:', {
                  contractDuration,
                  planName,
                  monthlyPrice,
                  subscriptionMetadata: subscription.metadata,
                  productMetadata: subscription.items?.data?.[0]?.price?.product?.metadata
                });

                // Create customer record if not exists
                let customerId = '';
                const { data: existingCustomer } = await supabaseAdmin
                  .from('customers')
                  .select('id')
                  .eq('email', order.customer_data.email)
                  .maybeSingle();

                if (existingCustomer) {
                  customerId = existingCustomer.id;
                } else {
                  const { data: newCustomer, error: customerError } = await supabaseAdmin
                    .from('customers')
                    .insert({
                      email: order.customer_data.email,
                      first_name: order.customer_data.firstName,
                      last_name: order.customer_data.lastName,
                      company: order.customer_data.company,
                      phone: order.customer_data.phone,
                    })
                    .select('id')
                    .single();

                  if (customerError) {
                    console.error('❌ Error creating customer:', customerError);
                  } else {
                    customerId = newCustomer.id;
                    console.log('✅ Customer created:', customerId);
                  }
                }

                if (customerId) {
                  const subscriptionStartDate = new Date(subscription.current_period_start * 1000).toISOString();
                  const subscriptionEndDate = contractDuration > 0
                    ? new Date(subscription.current_period_start * 1000 + (contractDuration * 30 * 24 * 60 * 60 * 1000)).toISOString()
                    : null;

                  // Check if subscription already exists
                  const { data: existingSub } = await supabaseAdmin
                    .from('customer_subscriptions')
                    .select('id')
                    .eq('stripe_subscription_id', subscription.id)
                    .maybeSingle();

                  let subscriptionCreated = false;

                  if (existingSub) {
                    console.log('ℹ️ Subscription already exists:', existingSub.id);
                    subscriptionCreated = true;
                  } else {
                    // Create subscription record
                    const { data: newSubscription, error: subError } = await supabaseAdmin
                      .from('customer_subscriptions')
                      .insert({
                        customer_id: customerId,
                        plan_name: planName,
                        monthly_price: monthlyPrice,
                        status: subscription.status,
                        contract_duration: contractDuration,
                        contract_type: contractDuration > 0 ? 'fixed' : 'flex',
                        start_date: subscriptionStartDate,
                        end_date: subscriptionEndDate,
                        stripe_subscription_id: subscription.id,
                        stripe_customer_id: session.customer,
                      })
                      .select()
                      .single();

                    if (subError) {
                      console.error('❌ Error creating subscription:', subError);
                      subscriptionCreated = false;
                    } else {
                      console.log('✅ Subscription created:', newSubscription.id);
                      subscriptionCreated = true;
                    }
                  }

                  // ALWAYS send subscription invoice email (whether it was just created or already existed)
                  if (subscriptionCreated) {
                    console.log('📧 Preparing to send subscription invoice email...');
                    console.log('📧 Email will be sent to:', order.customer_data.email);
                    console.log('📧 Stripe Customer ID:', session.customer);

                    const emailSent = await sendSubscriptionInvoiceEmail(
                      order.customer_data.email,
                      `${order.customer_data.firstName} ${order.customer_data.lastName}`,
                      order.customer_data.company,
                      planName,
                      monthlyPrice,
                      contractDuration,
                      subscriptionStartDate,
                      subscriptionEndDate,
                      session.customer
                    );

                    if (emailSent) {
                      console.log('✅ Subscription invoice email sent successfully!');
                    } else {
                      console.error('❌ Failed to send subscription invoice email');
                    }
                  }
                }
              }
            } else {
              console.log('ℹ️ No subscription in session (one-time payment)');
            }
          }
        }
      } catch (error) {
        console.error('❌ Error processing subscription:', error);
        // Don't fail the whole request if subscription creation fails
      }
    }

    console.log('✅ Process completed successfully');

    const siteUrl = Deno.env.get('SITE_URL') || 'https://webflix.de';
    return new Response(
      JSON.stringify({
        success: true,
        accountCreated: !userExists,
        emailSent: !userExists,
        loginEmail: order.customer_data.email,
        loginPassword: !userExists ? password : null,
        checklistUrl: `${siteUrl}/customer/dashboard`,
        onboardingToken: branding.onboarding_token
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('❌ Error processing payment success:', error);
    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        details: error.message,
        stack: error.stack
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});