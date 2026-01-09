interface Lead {
  email: string;
  first_name: string | null;
  last_name: string | null;
  company: string | null;
  industry: string | null;
}

interface EmailTemplate {
  subject: string;
  htmlContent: string;
}

export function getGalabauIntroEmail(lead: Lead): EmailTemplate {
  const firstName = lead.first_name || 'Geschäftsführer/in';
  const company = lead.company || 'Ihr Unternehmen';

  return {
    subject: "29,90€/Monat - Ihre Website, die täglich Anfragen bringt",
    htmlContent: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Webflix One</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb; color: #1a1a1a;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 50px 30px; text-align: center; position: relative; overflow: hidden;">
            <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: radial-gradient(circle at 30% 50%, rgba(34, 197, 94, 0.1) 0%, transparent 50%);"></div>
            <img src="https://i.imgur.com/2SbjgE7.png" alt="Webflix" style="height: 45px; margin-bottom: 30px; position: relative; z-index: 1;">
            <div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); display: inline-block; padding: 8px 24px; border-radius: 50px; margin-bottom: 20px; position: relative; z-index: 1;">
                <span style="color: #ffffff; font-size: 16px; font-weight: 700; letter-spacing: 0.5px;">29,90€/Monat · 0€ Erstellung</span>
            </div>
            <h1 style="margin: 0; color: #ffffff; font-size: 36px; font-weight: 800; line-height: 1.2; position: relative; z-index: 1;">
                Ihre Website, die täglich<br>neue Anfragen generiert
            </h1>
        </div>

        <!-- Content -->
        <div style="padding: 50px 35px;">
            <p style="font-size: 18px; line-height: 1.6; margin-bottom: 30px; color: #1a1a1a;">
                Hallo ${firstName},
            </p>

            <!-- GRUND -->
            <div style="background: linear-gradient(135deg, #fef2f2 0%, #fff5f5 100%); border-left: 4px solid #ef4444; border-radius: 12px; padding: 25px; margin: 35px 0;">
                <h2 style="color: #dc2626; margin: 0 0 15px 0; font-size: 20px; font-weight: 700;">
                    🚫 Das Problem
                </h2>
                <p style="margin: 0; color: #333333; font-size: 16px; line-height: 1.7;">
                    Ihre handwerkliche Arbeit im Garten- & Landschaftsbau ist erstklassig. Aber Hand aufs Herz:
                    <strong>Warum kommen nicht genug Kundenanfragen über Ihre Website?</strong> Entweder haben Sie
                    gar keine Website, oder sie ist veraltet und wird bei Google nicht gefunden.
                </p>
            </div>

            <!-- AUFWAND -->
            <div style="background: linear-gradient(135deg, #fef9c3 0%, #fef3c7 100%); border-left: 4px solid #eab308; border-radius: 12px; padding: 25px; margin: 35px 0;">
                <h2 style="color: #ca8a04; margin: 0 0 15px 0; font-size: 20px; font-weight: 700;">
                    💪 Was Sie bereits versucht haben
                </h2>
                <p style="margin: 0; color: #333333; font-size: 16px; line-height: 1.7;">
                    Sie haben vielleicht schon verschiedene Wege probiert: Google Ads geschaltet,
                    Flyer verteilt, auf Empfehlungen gehofft. Das kostet Zeit und Geld -
                    <strong>aber die nachhaltigen Ergebnisse bleiben aus.</strong>
                </p>
            </div>

            <!-- SELBSTREFLEXION -->
            <div style="background: linear-gradient(135deg, #ede9fe 0%, #f5f3ff 100%); border-left: 4px solid #8b5cf6; border-radius: 12px; padding: 25px; margin: 35px 0;">
                <h2 style="color: #7c3aed; margin: 0 0 15px 0; font-size: 20px; font-weight: 700;">
                    🤔 Ehrliche Bilanz
                </h2>
                <p style="margin: 0; color: #333333; font-size: 16px; line-height: 1.7;">
                    Wenn Sie ehrlich sind: <strong>Die bisherigen Methoden funktionieren nicht wirklich.</strong>
                    Während Ihre Konkurrenz mit modernen Websites bei Google auf Seite 1 steht und automatisch
                    Anfragen bekommt, warten Sie auf Mundpropaganda.
                </p>
            </div>

            <!-- TRAUM -->
            <div style="background: linear-gradient(135deg, #dcfce7 0%, #d1fae5 100%); border-left: 4px solid #22c55e; border-radius: 12px; padding: 30px; margin: 35px 0; box-shadow: 0 4px 20px rgba(34, 197, 94, 0.15);">
                <h2 style="color: #16a34a; margin: 0 0 15px 0; font-size: 22px; font-weight: 800;">
                    ✨ Stellen Sie sich vor...
                </h2>
                <p style="margin: 0 0 15px 0; color: #1a1a1a; font-size: 17px; line-height: 1.8; font-weight: 500;">
                    ...Sie wachen morgens auf und haben <strong>3-5 neue Kundenanfragen</strong> in Ihrem Posteingang.
                    Kunden, die gezielt nach Ihren Leistungen gesucht haben. Die schon überzeugt sind, bevor Sie überhaupt
                    mit ihnen sprechen.
                </p>
                <p style="margin: 0; color: #1a1a1a; font-size: 17px; line-height: 1.8; font-weight: 500;">
                    <strong>Das ist keine Fantasie - das ist Realität mit Webflix One.</strong>
                </p>
            </div>

            <!-- Benefits -->
            <div style="background: #ffffff; border-radius: 20px; padding: 35px; margin: 45px 0; box-shadow: 0 10px 40px rgba(0,0,0,0.08); border: 1px solid #e5e7eb;">
                <h2 style="color: #1a1a1a; margin: 0 0 30px 0; font-size: 26px; font-weight: 800; text-align: center;">
                    🎯 Sie kümmern sich um nichts!
                </h2>

                <div style="margin-bottom: 25px; padding: 20px; background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 12px;">
                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                        <tr>
                            <td width="50" valign="top" style="padding-right: 18px;">
                                <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); border-radius: 12px; text-align: center; line-height: 50px; box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);">
                                    <span style="font-size: 24px;">⚡</span>
                                </div>
                            </td>
                            <td valign="top">
                                <h3 style="margin: 0 0 8px 0; color: #166534; font-size: 19px; font-weight: 700;">48h Online - Wir machen alles</h3>
                                <p style="margin: 0; color: #333333; font-size: 15px; line-height: 1.6;">
                                    Domain, Hosting, Design, Texte, SEO - <strong>Sie geben nur Ihre Infos an, den Rest erledigen wir.</strong>
                                </p>
                            </td>
                        </tr>
                    </table>
                </div>

                <div style="margin-bottom: 25px; padding: 20px; background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 12px;">
                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                        <tr>
                            <td width="50" valign="top" style="padding-right: 18px;">
                                <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); border-radius: 12px; text-align: center; line-height: 50px; box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);">
                                    <span style="font-size: 24px;">🔍</span>
                                </div>
                            </td>
                            <td valign="top">
                                <h3 style="margin: 0 0 8px 0; color: #166534; font-size: 19px; font-weight: 700;">Google Seite 1 Garantie</h3>
                                <p style="margin: 0; color: #333333; font-size: 15px; line-height: 1.6;">
                                    <strong>Lokales SEO optimiert.</strong> Ihre Kunden finden Sie bei "Gartenbau + [Ihre Stadt]" ganz oben.
                                </p>
                            </td>
                        </tr>
                    </table>
                </div>

                <div style="margin-bottom: 25px; padding: 20px; background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 12px;">
                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                        <tr>
                            <td width="50" valign="top" style="padding-right: 18px;">
                                <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); border-radius: 12px; text-align: center; line-height: 50px; box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);">
                                    <span style="font-size: 24px;">📱</span>
                                </div>
                            </td>
                            <td valign="top">
                                <h3 style="margin: 0 0 8px 0; color: #166534; font-size: 19px; font-weight: 700;">Perfekt auf allen Geräten</h3>
                                <p style="margin: 0; color: #333333; font-size: 15px; line-height: 1.6;">
                                    <strong>Mobile-First Design.</strong> 75% Ihrer Kunden suchen mobil - Ihre Website sieht überall perfekt aus.
                                </p>
                            </td>
                        </tr>
                    </table>
                </div>

                <div style="margin-bottom: 0; padding: 20px; background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 12px;">
                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                        <tr>
                            <td width="50" valign="top" style="padding-right: 18px;">
                                <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); border-radius: 12px; text-align: center; line-height: 50px; box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);">
                                    <span style="font-size: 24px;">🎨</span>
                                </div>
                            </td>
                            <td valign="top">
                                <h3 style="margin: 0 0 8px 0; color: #166534; font-size: 19px; font-weight: 700;">Einzigartig für Ihre Branche</h3>
                                <p style="margin: 0; color: #333333; font-size: 15px; line-height: 1.6;">
                                    <strong>Kein 08/15 Template.</strong> Individuelles Design, das Ihre Projekte in Szene setzt.
                                </p>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>

            <!-- Pricing -->
            <div style="background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%); border-radius: 20px; padding: 45px 35px; margin: 50px 0; text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,0.3); position: relative; overflow: hidden;">
                <div style="position: absolute; top: -50px; right: -50px; width: 200px; height: 200px; background: radial-gradient(circle, rgba(34, 197, 94, 0.15) 0%, transparent 70%);"></div>
                <div style="position: absolute; bottom: -50px; left: -50px; width: 200px; height: 200px; background: radial-gradient(circle, rgba(34, 197, 94, 0.15) 0%, transparent 70%);"></div>

                <div style="position: relative; z-index: 1;">
                    <div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); display: inline-block; padding: 6px 20px; border-radius: 50px; margin-bottom: 25px;">
                        <span style="color: #ffffff; font-size: 14px; font-weight: 700; letter-spacing: 0.5px;">UNSCHLAGBARER PREIS</span>
                    </div>

                    <h2 style="color: #ffffff; margin: 0 0 30px 0; font-size: 28px; font-weight: 800;">
                        All-Inclusive zum Kampfpreis
                    </h2>

                    <div style="background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(10px); border-radius: 16px; padding: 30px; margin: 25px 0; border: 1px solid rgba(255, 255, 255, 0.1);">
                        <div style="margin-bottom: 10px;">
                            <span style="color: #9ca3af; font-size: 18px; text-decoration: line-through;">149€/Monat</span>
                        </div>
                        <div style="font-size: 56px; font-weight: 800; color: #22c55e; margin-bottom: 8px; line-height: 1;">
                            29,90€
                        </div>
                        <div style="font-size: 20px; color: #e5e7eb; font-weight: 600;">
                            pro Monat
                        </div>
                        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                            <div style="font-size: 28px; font-weight: 700; color: #22c55e; margin-bottom: 5px;">
                                0€
                            </div>
                            <div style="font-size: 16px; color: #d1d5db;">
                                Einmalige Erstellungsgebühr
                            </div>
                        </div>
                    </div>

                    <div style="text-align: left; max-width: 400px; margin: 30px auto 0;">
                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tr>
                                <td style="padding-bottom: 12px;">
                                    <span style="color: #22c55e; font-size: 20px; margin-right: 12px; font-weight: bold;">✓</span>
                                    <span style="color: #e5e7eb; font-size: 15px; font-weight: 500;">Domain & Hosting inklusive</span>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding-bottom: 12px;">
                                    <span style="color: #22c55e; font-size: 20px; margin-right: 12px; font-weight: bold;">✓</span>
                                    <span style="color: #e5e7eb; font-size: 15px; font-weight: 500;">Wartung & Updates kostenlos</span>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding-bottom: 12px;">
                                    <span style="color: #22c55e; font-size: 20px; margin-right: 12px; font-weight: bold;">✓</span>
                                    <span style="color: #e5e7eb; font-size: 15px; font-weight: 500;">Monatlich kündbar</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span style="color: #22c55e; font-size: 20px; margin-right: 12px; font-weight: bold;">✓</span>
                                    <span style="color: #e5e7eb; font-size: 15px; font-weight: 500;">Keine versteckten Kosten</span>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>

            <!-- CTA -->
            <div style="text-align: center; margin: 50px 0;">
                <a href="https://handwerker-demo-webflix.bolt.host/gartenbau"
                   style="display: inline-block; background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: #ffffff;
                          text-decoration: none; padding: 22px 50px; border-radius: 14px;
                          font-weight: 800; font-size: 20px; box-shadow: 0 10px 30px rgba(34, 197, 94, 0.4);
                          border: 2px solid #22c55e;">
                    🚀 Live-Demo jetzt ansehen
                </a>
                <p style="margin-top: 15px; color: #6b7280; font-size: 14px;">
                    Klicken Sie hier und sehen Sie, wie Ihre Website aussehen könnte
                </p>
            </div>

            <!-- Social Proof -->
            <div style="background: linear-gradient(135deg, #fefce8 0%, #fef9c3 100%); border-radius: 16px; padding: 30px; margin: 45px 0; border: 2px solid #fde047; box-shadow: 0 4px 20px rgba(250, 204, 21, 0.15);">
                <div style="text-align: center; margin-bottom: 20px;">
                    <span style="font-size: 32px;">⭐⭐⭐⭐⭐</span>
                </div>
                <p style="margin: 0 0 18px 0; color: #854d0e; font-size: 15px; text-align: center; font-weight: 600;">
                    Über 100+ zufriedene Handwerksbetriebe vertrauen uns
                </p>
                <div style="background: #ffffff; border-radius: 12px; padding: 20px; margin-bottom: 15px;">
                    <p style="margin: 0 0 12px 0; color: #1a1a1a; font-size: 15px; font-style: italic; line-height: 1.6;">
                        "Die Website hat unser Geschäft komplett verändert. Früher mussten wir aktiv nach Kunden suchen.
                        Jetzt bekommen wir täglich 3-5 Anfragen über die Website. <strong>Der ROI ist unglaublich!</strong>"
                    </p>
                    <p style="margin: 0; color: #6b7280; font-size: 14px; font-weight: 600;">
                        - Marcus S., Gartengestaltung München
                    </p>
                </div>
                <div style="background: #ffffff; border-radius: 12px; padding: 20px;">
                    <p style="margin: 0 0 12px 0; color: #1a1a1a; font-size: 15px; font-style: italic; line-height: 1.6;">
                        "Für 29,90€/Monat war ich skeptisch. Aber die Website sieht aus wie für 5.000€.
                        <strong>Beste Investition ever!</strong>"
                    </p>
                    <p style="margin: 0; color: #6b7280; font-size: 14px; font-weight: 600;">
                        - Tobias K., Landschaftsbau Köln
                    </p>
                </div>
            </div>

            <div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 30px; margin: 40px 0; text-align: center; border: 1px solid #93c5fd;">
                <h3 style="margin: 0 0 20px 0; color: #1e40af; font-size: 20px; font-weight: 700;">
                    Fragen? Wir sind für Sie da!
                </h3>
                <p style="margin: 0; font-size: 16px; line-height: 1.8; color: #1e3a8a;">
                    <strong style="font-size: 18px;">📧 kontakt@webflix.info</strong><br>
                    <span style="font-size: 14px; color: #64748b; margin-top: 8px; display: inline-block;">
                        Antwort innerhalb von 24 Stunden garantiert
                    </span>
                </p>
            </div>

            <div style="margin-top: 50px; padding-top: 30px; border-top: 2px solid #e5e7eb;">
                <p style="font-size: 16px; line-height: 1.8; color: #1a1a1a; margin-bottom: 8px;">
                    Mit freundlichen Grüßen
                </p>
                <p style="font-size: 18px; font-weight: 700; color: #1a1a1a; margin: 0;">
                    Ihr Webflix Team
                </p>
                <p style="font-size: 14px; color: #6b7280; margin-top: 8px;">
                    Wir machen Handwerksbetriebe digital sichtbar
                </p>
            </div>
        </div>

        <!-- Footer -->
        <div style="background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%); padding: 40px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
            <img src="https://i.imgur.com/2SbjgE7.png" alt="Webflix" style="height: 35px; margin-bottom: 20px; opacity: 0.8;">
            <p style="margin: 0 0 15px 0; color: #374151; font-size: 14px; font-weight: 600;">
                Webflix Deutschland | Premium-Websites für Handwerksbetriebe
            </p>
            <p style="margin: 0 0 20px 0; color: #6b7280; font-size: 13px; line-height: 1.6;">
                Sie erhalten diese E-Mail, weil Sie in unserem Verteiler eingetragen sind.<br>
                Kein Interesse mehr? Kein Problem - einfach auf diese Email antworten.
            </p>
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #d1d5db;">
                <a href="https://webflix.de/impressum" style="color: #6b7280; font-size: 12px; text-decoration: none; margin: 0 12px; font-weight: 500;">Impressum</a>
                <span style="color: #d1d5db;">|</span>
                <a href="https://webflix.de/datenschutz" style="color: #6b7280; font-size: 12px; text-decoration: none; margin: 0 12px; font-weight: 500;">Datenschutz</a>
            </div>
        </div>
    </div>
</body>
</html>`
  };
}

export function getEmailTemplate(templateName: string, lead: Lead): EmailTemplate {
  switch (templateName) {
    case 'galabau-intro':
      return getGalabauIntroEmail(lead);
    case 'maler-intro':
      return getGalabauIntroEmail(lead);
    case 'handwerk-allgemein':
      return getGalabauIntroEmail(lead);
    default:
      return getGalabauIntroEmail(lead);
  }
}
