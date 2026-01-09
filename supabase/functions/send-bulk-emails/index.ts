import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface Lead {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  company: string | null;
  industry: string | null;
}

function getGalabauEmail(lead: Lead) {
  const firstName = lead.first_name || 'Geschäftsführer/in';
  return {
    subject: "Ihre professionelle Website ab 29,90€/Monat",
    htmlContent: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Webflix One</title>
</head>
<body style="margin:0;padding:0;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background-color:#ffffff;color:#1a1a1a">
    <div style="max-width:600px;margin:0 auto;background-color:#ffffff">
        
        <!-- Header -->
        <div style="padding:40px 40px 30px;border-bottom:1px solid #e5e7eb">
            <img src="https://i.imgur.com/2SbjgE7.png" alt="Webflix" style="height:32px;margin-bottom:0">
        </div>

        <!-- Hero Section -->
        <div style="padding:50px 40px 40px">
            <h1 style="margin:0 0 20px 0;font-size:32px;font-weight:700;line-height:1.2;color:#111827;letter-spacing:-0.5px">
                Ihre professionelle Website.<br>
                Ab 29,90€ pro Monat.
            </h1>
            <p style="margin:0;font-size:18px;line-height:1.6;color:#6b7280">
                Hallo ${firstName},
            </p>
        </div>

        <!-- Problem Statement -->
        <div style="padding:0 40px 40px">
            <div style="border-left:3px solid #111827;padding-left:24px;margin-bottom:40px">
                <h2 style="margin:0 0 12px 0;font-size:20px;font-weight:600;color:#111827">
                    Die Herausforderung
                </h2>
                <p style="margin:0;font-size:16px;line-height:1.6;color:#4b5563">
                    Als Handwerksbetrieb liefern Sie erstklassige Arbeit. Doch ohne moderne Online-Präsenz 
                    erreichen Sie nicht die Kunden, die Sie verdienen. Ihre Konkurrenz ist bereits online sichtbar 
                    und gewinnt täglich neue Aufträge.
                </p>
            </div>

            <!-- Solution -->
            <div style="border-left:3px solid #22c55e;padding-left:24px;margin-bottom:40px">
                <h2 style="margin:0 0 12px 0;font-size:20px;font-weight:600;color:#111827">
                    Die Lösung
                </h2>
                <p style="margin:0 0 16px 0;font-size:16px;line-height:1.6;color:#4b5563">
                    Mit Webflix One erhalten Sie eine professionelle Website, die kontinuierlich 
                    qualifizierte Anfragen generiert. Individuell gestaltet für Ihre Branche, 
                    SEO-optimiert und mobil perfekt.
                </p>
                <p style="margin:0;font-size:16px;line-height:1.6;color:#4b5563;font-weight:500">
                    Stellen Sie sich vor: 3-5 neue Kundenanfragen täglich im Posteingang. 
                    Automatisch. Planbar.
                </p>
            </div>
        </div>

        <!-- Screenshot -->
        <div style="padding:0 40px 40px">
            <img src="https://i.imgur.com/esMTTN3.png" alt="Webflix Demo" style="width:100%;height:auto;border-radius:8px;border:1px solid #e5e7eb">
        </div>

        <!-- Pricing -->
        <div style="padding:0 40px 40px">
            <div style="background-color:#f9fafb;border-radius:12px;padding:32px;border:1px solid #e5e7eb">
                <div style="margin-bottom:24px">
                    <div style="font-size:14px;font-weight:500;color:#6b7280;margin-bottom:8px;text-transform:uppercase;letter-spacing:0.5px">
                        Transparente Preisgestaltung
                    </div>
                    <div style="font-size:48px;font-weight:700;color:#111827;line-height:1;margin-bottom:8px">
                        29,90€
                    </div>
                    <div style="font-size:16px;color:#6b7280">
                        pro Monat, keine Einrichtungsgebühr
                    </div>
                </div>
                
                <div style="padding-top:24px;border-top:1px solid #e5e7eb">
                    <div style="margin-bottom:12px">
                        <span style="color:#22c55e;margin-right:8px;font-weight:600">✓</span>
                        <span style="font-size:15px;color:#4b5563">Domain & Hosting inklusive</span>
                    </div>
                    <div style="margin-bottom:12px">
                        <span style="color:#22c55e;margin-right:8px;font-weight:600">✓</span>
                        <span style="font-size:15px;color:#4b5563">Individuelles Design für Ihre Branche</span>
                    </div>
                    <div style="margin-bottom:12px">
                        <span style="color:#22c55e;margin-right:8px;font-weight:600">✓</span>
                        <span style="font-size:15px;color:#4b5563">SEO-Optimierung & Google-Sichtbarkeit</span>
                    </div>
                    <div style="margin-bottom:12px">
                        <span style="color:#22c55e;margin-right:8px;font-weight:600">✓</span>
                        <span style="font-size:15px;color:#4b5563">48h bis zur Live-Schaltung</span>
                    </div>
                    <div>
                        <span style="color:#22c55e;margin-right:8px;font-weight:600">✓</span>
                        <span style="font-size:15px;color:#4b5563">Monatlich kündbar</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- CTA -->
        <div style="padding:0 40px 50px;text-align:center">
            <a href="https://webflix.de/zum-mitnehmen?industry=handwerk" 
               style="display:inline-block;background-color:#111827;color:#ffffff;text-decoration:none;padding:16px 32px;border-radius:8px;font-weight:600;font-size:16px;transition:background-color 0.2s">
                Showroom ansehen
            </a>
            <p style="margin:16px 0 0 0;font-size:14px;color:#6b7280">
                Interaktiv Ihre Branche auswählen und Website live erleben
            </p>
        </div>

        <!-- Testimonial -->
        <div style="padding:0 40px 50px">
            <div style="background-color:#f9fafb;border-radius:12px;padding:28px;border-left:3px solid #22c55e">
                <p style="margin:0 0 16px 0;font-size:16px;line-height:1.6;color:#374151;font-style:italic">
                    "Die Website hat unser Geschäft komplett verändert. Früher mussten wir aktiv nach 
                    Kunden suchen. Jetzt bekommen wir täglich Anfragen über die Website. 
                    Der ROI ist beeindruckend."
                </p>
                <div style="font-size:14px;font-weight:600;color:#111827">
                    Marcus S.
                </div>
                <div style="font-size:14px;color:#6b7280">
                    Gartengestaltung München
                </div>
            </div>
        </div>

        <!-- Contact -->
        <div style="padding:0 40px 50px">
            <div style="background-color:#f9fafb;border-radius:12px;padding:28px;text-align:center">
                <h3 style="margin:0 0 12px 0;font-size:18px;font-weight:600;color:#111827">
                    Haben Sie Fragen?
                </h3>
                <p style="margin:0;font-size:15px;color:#6b7280">
                    Wir beraten Sie gerne persönlich
                </p>
                <a href="mailto:kontakt@webflix.info" style="display:inline-block;margin-top:16px;color:#111827;text-decoration:none;font-weight:600;font-size:16px">
                    kontakt@webflix.info
                </a>
                <p style="margin:12px 0 0 0;font-size:13px;color:#9ca3af">
                    Antwort innerhalb von 24 Stunden
                </p>
            </div>
        </div>

        <!-- Footer -->
        <div style="padding:40px;border-top:1px solid #e5e7eb;text-align:center">
            <p style="margin:0 0 8px 0;font-size:14px;color:#6b7280">
                Mit freundlichen Grüßen
            </p>
            <p style="margin:0 0 20px 0;font-size:16px;font-weight:600;color:#111827">
                Ihr Webflix Team
            </p>
            <p style="margin:0 0 20px 0;font-size:13px;color:#9ca3af">
                Professionelle Websites für Handwerksbetriebe
            </p>
            <div style="margin-top:20px;padding-top:20px;border-top:1px solid #e5e7eb">
                <a href="https://webflix.de/impressum" style="color:#9ca3af;font-size:12px;text-decoration:none;margin:0 12px">Impressum</a>
                <span style="color:#d1d5db">·</span>
                <a href="https://webflix.de/datenschutz" style="color:#9ca3af;font-size:12px;text-decoration:none;margin:0 12px">Datenschutz</a>
            </div>
            <p style="margin:20px 0 0 0;font-size:12px;color:#9ca3af;line-height:1.5">
                Sie erhalten diese E-Mail, weil Sie in unserem Verteiler eingetragen sind.<br>
                Keine Interesse mehr? Einfach auf diese E-Mail antworten.
            </p>
        </div>

    </div>
</body>
</html>`
  };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { leads, templateName } = await req.json();
    console.log('Received:', leads?.length, 'leads');

    if (!leads || !Array.isArray(leads) || leads.length === 0) {
      return new Response(JSON.stringify({ error: "No leads", sent: 0, total: 0 }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const BREVO_API_KEY = Deno.env.get("BREVO_API_KEY") || Deno.env.get("VITE_BREVO_API_KEY");
    if (!BREVO_API_KEY) throw new Error("BREVO_API_KEY not configured");

    let sentCount = 0;
    const errors: string[] = [];

    for (const lead of leads) {
      try {
        const emailData = getGalabauEmail(lead);
        const response = await fetch("https://api.brevo.com/v3/smtp/email", {
          method: "POST",
          headers: {
            "accept": "application/json",
            "api-key": BREVO_API_KEY,
            "content-type": "application/json",
          },
          body: JSON.stringify({
            sender: { name: "Webflix", email: "noreply@webflix.de" },
            to: [{ email: lead.email, name: lead.first_name || lead.email }],
            subject: emailData.subject,
            htmlContent: emailData.htmlContent
          }),
        });

        if (response.ok) {
          sentCount++;
          console.log(`Sent to ${lead.email}`);
        } else {
          const errorData = await response.text();
          errors.push(`${lead.email}: ${errorData}`);
        }
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        errors.push(`${lead.email}: ${error.message}`);
      }
    }

    return new Response(JSON.stringify({ sent: sentCount, total: leads.length, errors: errors.length > 0 ? errors : undefined }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});