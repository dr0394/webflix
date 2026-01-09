# Brevo Email Templates

## Template 1: Payment Email (Zahlungslink)

**Template Name:** Webflix Payment Link
**Template ID:** 1

### Subject:
```
Ihre Webflix Bestellung {{params.ORDER_ID}} - Jetzt bezahlen
```

### HTML Content:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Webflix Zahlungslink</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', Arial, sans-serif; background-color: #111111; color: #ffffff;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #111111;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #CBAA6E, #F3E4A8); padding: 30px; text-align: center;">
            <img src="https://i.imgur.com/DBviUqX.png" alt="Webflix" style="height: 40px; margin-bottom: 20px;">
            <h1 style="margin: 0; color: #000; font-size: 28px; font-weight: bold;">Ihre Bestellung ist fast fertig!</h1>
        </div>
        
        <!-- Content -->
        <div style="padding: 40px 30px; background-color: #333333;">
            <h2 style="color: #CBAA6E; margin-bottom: 20px;">Hallo {{params.CUSTOMER_NAME}},</h2>
            
            <p style="line-height: 1.6; margin-bottom: 25px; color: #ffffff;">
                vielen Dank für Ihre Bestellung bei Webflix! Um Ihre Website-Erstellung zu starten, 
                benötigen wir noch Ihre Zahlung.
            </p>
            
            <!-- Order Details -->
            <div style="background-color: #222222; border-radius: 12px; padding: 25px; margin-bottom: 30px; border-left: 4px solid #CBAA6E;">
                <h3 style="color: #CBAA6E; margin-bottom: 15px; font-size: 18px;">📋 Ihre Bestelldetails:</h3>
                <table style="width: 100%; color: #ffffff;">
                    <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #444;">Bestell-ID:</td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #444; font-weight: bold;">{{params.ORDER_ID}}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #444;">Firma:</td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #444;">{{params.COMPANY_NAME}}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #444;">Template:</td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #444;">{{params.TEMPLATE_NAME}}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #444;">Laufzeit:</td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #444;">{{params.DURATION}} Monate</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; font-size: 18px; font-weight: bold;">Monatlich:</td>
                        <td style="padding: 8px 0; font-size: 18px; font-weight: bold; color: #CBAA6E;">{{params.MONTHLY_PRICE}}€</td>
                    </tr>
                </table>
            </div>
            
            <!-- Payment Button -->
            <div style="text-align: center; margin-bottom: 30px;">
                <a href="{{params.PAYMENT_LINK}}" 
                   style="display: inline-block; background: linear-gradient(135deg, #CBAA6E, #F3E4A8); 
                          color: #000; text-decoration: none; padding: 15px 40px; border-radius: 12px; 
                          font-weight: bold; font-size: 18px; margin: 10px 0;">
                    💳 Jetzt bezahlen ({{params.TOTAL_FIRST_PAYMENT}}€)
                </a>
            </div>
            
            <!-- Important Info -->
            <div style="background-color: #1a4d3a; border-radius: 12px; padding: 20px; margin-bottom: 25px; border-left: 4px solid #22c55e;">
                <h4 style="color: #22c55e; margin-bottom: 10px;">⚡ 48h-Go-Live-Garantie</h4>
                <p style="margin: 0; color: #ffffff; font-size: 14px;">
                    Nach Ihrer Zahlung erhalten Sie automatisch die Checkliste per E-Mail. 
                    Sobald Sie uns alle Inhalte bereitgestellt haben, geht Ihre Website innerhalb von 48 Stunden live!
                </p>
            </div>
            
            <p style="line-height: 1.6; color: #cccccc; font-size: 14px;">
                Bei Fragen stehen wir Ihnen gerne zur Verfügung:<br>
                📧 E-Mail: support@webflix.de<br>
                📞 Telefon: 0800 0004766<br>
                💬 WhatsApp: +49 175 1194624
            </p>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #222222; padding: 20px; text-align: center; color: #888888; font-size: 12px;">
            <p style="margin: 0;">Webflix Deutschland | Premium-Websites für KMU</p>
            <p style="margin: 5px 0 0 0;">Diese E-Mail wurde automatisch generiert.</p>
        </div>
    </div>
</body>
</html>
```

---

## Template 2: Welcome Email mit Login + Checkliste (Nach Zahlung)

**Template Name:** Webflix Welcome & Checklist
**Template ID:** 2

### Subject:
```
🎉 Willkommen bei Webflix! Ihre Login-Daten & Checkliste
```

### HTML Content:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Webflix Welcome</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', Arial, sans-serif; background-color: #111111; color: #ffffff;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #111111;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #CBAA6E, #F3E4A8); padding: 30px; text-align: center;">
            <img src="https://i.imgur.com/DBviUqX.png" alt="Webflix" style="height: 40px; margin-bottom: 20px;">
            <h1 style="margin: 0; color: #000; font-size: 28px; font-weight: bold;">🎉 Willkommen bei Webflix!</h1>
            <p style="margin: 10px 0 0 0; color: #000; font-size: 16px;">Ihre Zahlung ist eingegangen</p>
        </div>

        <!-- Content -->
        <div style="padding: 40px 30px; background-color: #333333;">
            <h2 style="color: #CBAA6E; margin-bottom: 20px;">Hallo {{params.CUSTOMER_NAME}},</h2>

            <p style="line-height: 1.6; margin-bottom: 25px; color: #ffffff;">
                herzlich willkommen bei Webflix! Ihre Zahlung ist bei uns eingegangen und wir haben
                Ihren persönlichen Kunden-Account erstellt. Die Erstellung Ihrer
                <strong>{{params.TEMPLATE_NAME}}</strong> Website kann jetzt beginnen.
            </p>

            <!-- Login Credentials -->
            <div style="background-color: #2d2d2d; border-radius: 12px; padding: 25px; margin-bottom: 30px; border-left: 4px solid #CBAA6E;">
                <h3 style="color: #CBAA6E; margin-bottom: 15px; font-size: 20px;">🔐 Ihre Login-Daten</h3>
                <table style="width: 100%; color: #ffffff;">
                    <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #444;">E-Mail:</td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #444; font-weight: bold;">{{params.LOGIN_EMAIL}}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #444;">Passwort:</td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #444; font-family: monospace; background-color: #222; padding: 5px 10px; border-radius: 4px;">{{params.LOGIN_PASSWORD}}</td>
                    </tr>
                </table>
                <p style="margin: 15px 0 0 0; color: #cccccc; font-size: 14px;">
                    ⚠️ <strong>Wichtig:</strong> Bitte ändern Sie Ihr Passwort nach dem ersten Login in Ihrem Dashboard.
                </p>
            </div>

            <!-- Login Button -->
            <div style="text-align: center; margin-bottom: 30px;">
                <a href="{{params.LOGIN_URL}}"
                   style="display: inline-block; background: linear-gradient(135deg, #CBAA6E, #F3E4A8);
                          color: #000; text-decoration: none; padding: 15px 40px; border-radius: 12px;
                          font-weight: bold; font-size: 18px; margin: 10px 0;">
                    🔑 Zum Kunden-Login
                </a>
            </div>

            <!-- 48h Guarantee -->
            <div style="background-color: #1a4d3a; border-radius: 12px; padding: 25px; margin-bottom: 30px; border-left: 4px solid #22c55e;">
                <h3 style="color: #22c55e; margin-bottom: 15px; font-size: 20px;">⚡ 48h-Go-Live-Garantie</h3>
                <p style="margin: 0; color: #ffffff; font-size: 16px; line-height: 1.6;">
                    Sobald Sie uns alle Inhalte aus der Checkliste bereitgestellt haben,
                    geht Ihre Website <strong>innerhalb von 48 Stunden live</strong>!
                </p>
            </div>

            <!-- Checklist Button -->
            <div style="text-align: center; margin-bottom: 30px;">
                <a href="{{params.CHECKLIST_LINK}}"
                   style="display: inline-block; background-color: #22c55e;
                          color: #000; text-decoration: none; padding: 15px 40px; border-radius: 12px;
                          font-weight: bold; font-size: 18px; margin: 10px 0;">
                    📋 Checkliste jetzt ausfüllen
                </a>
            </div>

            <!-- Next Steps -->
            <div style="background-color: #222222; border-radius: 12px; padding: 25px; margin-bottom: 25px;">
                <h3 style="color: #CBAA6E; margin-bottom: 15px;">📝 Ihre nächsten Schritte:</h3>
                <ol style="color: #ffffff; line-height: 1.8; padding-left: 20px;">
                    <li><strong>Einloggen:</strong> Melden Sie sich mit Ihren Zugangsdaten an</li>
                    <li><strong>Checkliste öffnen:</strong> Klicken Sie auf "Checkliste jetzt ausfüllen"</li>
                    <li><strong>Inhalte bereitstellen:</strong> Logo, Texte, Bilder, Kontaktdaten hochladen</li>
                    <li><strong>Abschicken:</strong> Checkliste absenden und 48h warten</li>
                    <li><strong>Live-Gang:</strong> Ihre Website geht automatisch live!</li>
                </ol>
            </div>

            <!-- Important Note -->
            <div style="background-color: #4d2d1a; border-radius: 12px; padding: 20px; margin-bottom: 25px; border-left: 4px solid #f59e0b;">
                <h4 style="color: #f59e0b; margin-bottom: 10px;">💡 Tipp für schnelleren Go-Live</h4>
                <p style="margin: 0; color: #ffffff; font-size: 14px; line-height: 1.6;">
                    Je vollständiger Ihre Angaben in der Checkliste sind, desto schneller können wir
                    Ihre Website erstellen. Bitte nehmen Sie sich 10-15 Minuten Zeit für die Checkliste!
                </p>
            </div>

            <!-- Contact Info -->
            <div style="background-color: #2d2d2d; border-radius: 12px; padding: 20px; margin-bottom: 25px;">
                <h4 style="color: #CBAA6E; margin-bottom: 15px;">📞 Support & Hilfe:</h4>
                <p style="margin: 0; color: #ffffff; line-height: 1.6;">
                    📧 <strong>E-Mail:</strong> {{params.SUPPORT_EMAIL}}<br>
                    📞 <strong>Telefon:</strong> {{params.SUPPORT_PHONE}}<br>
                    💬 <strong>WhatsApp:</strong> {{params.SUPPORT_WHATSAPP}}
                </p>
                <p style="margin: 15px 0 0 0; color: #cccccc; font-size: 13px;">
                    Bei Fragen zur Checkliste oder Problemen beim Login sind wir gerne für Sie da!
                </p>
            </div>

            <p style="line-height: 1.6; color: #cccccc; font-size: 14px;">
                <strong>Bestellnummer:</strong> {{params.ORDER_ID}}<br>
                <strong>Onboarding-Token:</strong> {{params.ONBOARDING_TOKEN}}
            </p>
        </div>

        <!-- Footer -->
        <div style="background-color: #222222; padding: 20px; text-align: center; color: #888888; font-size: 12px;">
            <p style="margin: 0;">Webflix Deutschland | Premium-Websites für KMU</p>
            <p style="margin: 5px 0 0 0;">Diese E-Mail wurde automatisch generiert. Bitte antworten Sie nicht direkt auf diese E-Mail.</p>
        </div>
    </div>
</body>
</html>
```

---

## Setup-Anleitung für Brevo:

### 1. Brevo Account einrichten:
- Account bei Brevo erstellen
- API-Key generieren
- Templates in Brevo anlegen (HTML-Code oben verwenden)

### 2. Umgebungsvariablen:
```env
BREVO_API_KEY=your_brevo_api_key_here
PAYMENT_PROVIDER_WEBHOOK_SECRET=your_webhook_secret
```

### 3. Zahlungsanbieter Webhook:
- Webhook-URL: `https://your-domain.com/functions/v1/payment-webhook`
- Bei erfolgreicher Zahlung wird automatisch die Checkliste-Email versendet

### 4. Email-Flow:
1. **Bestellung** → Payment-Email mit Zahlungslink
2. **Zahlung erfolgreich** → Webhook → Checkliste-Email
3. **Kunde** → Erhält alle Informationen automatisch