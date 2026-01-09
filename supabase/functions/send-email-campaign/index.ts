import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const BREVO_API_KEY = Deno.env.get('BREVO_API_KEY') || '';

// Email Templates
const templates = {
  'maler-lackierer-intro': {
    subject: 'Webflix - Professionelle Websites für Maler & Lackierer',
    getHtml: (lead: any) => `
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Webflix</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #FF8200 0%, #F472B6 100%); padding: 40px 40px 60px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">
                                Webflix
                            </h1>
                            <p style="margin: 10px 0 0; color: #ffffff; font-size: 16px; opacity: 0.95;">
                                Professionelle Websites für Handwerksbetriebe
                            </p>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px;">
                            ${lead.first_name ? `<p style="margin: 0 0 20px; color: #111111; font-size: 16px; line-height: 1.6;">Hallo ${lead.first_name},</p>` : '<p style="margin: 0 0 20px; color: #111111; font-size: 16px; line-height: 1.6;">Guten Tag,</p>'}

                            <p style="margin: 0 0 20px; color: #111111; font-size: 16px; line-height: 1.6;">
                                als <strong>Maler & Lackierer</strong> wissen Sie: Der erste Eindruck zählt. Das gilt auch für Ihre Online-Präsenz.
                            </p>

                            <p style="margin: 0 0 20px; color: #111111; font-size: 16px; line-height: 1.6;">
                                Mit <strong>Webflix</strong> erhalten Sie eine professionelle, moderne Website – perfekt abgestimmt auf Ihr Handwerk:
                            </p>

                            <!-- Benefits -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                                <tr>
                                    <td style="padding: 20px; background-color: #f9fafb; border-radius: 12px; border-left: 4px solid #FF8200;">
                                        <p style="margin: 0 0 10px; color: #FF8200; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                                            ✓ Branchenspezifisches Design
                                        </p>
                                        <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.5;">
                                            Perfekt für Maler & Lackierer optimiert
                                        </p>
                                    </td>
                                </tr>
                                <tr><td style="height: 12px;"></td></tr>
                                <tr>
                                    <td style="padding: 20px; background-color: #f9fafb; border-radius: 12px; border-left: 4px solid #F472B6;">
                                        <p style="margin: 0 0 10px; color: #F472B6; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                                            ✓ In 48h online
                                        </p>
                                        <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.5;">
                                            Nach Erhalt aller Informationen
                                        </p>
                                    </td>
                                </tr>
                                <tr><td style="height: 12px;"></td></tr>
                                <tr>
                                    <td style="padding: 20px; background-color: #f9fafb; border-radius: 12px; border-left: 4px solid #10b981;">
                                        <p style="margin: 0 0 10px; color: #10b981; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                                            ✓ Ab 29,90€/Monat
                                        </p>
                                        <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.5;">
                                            Flexible Laufzeiten, faire Preise
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <p style="margin: 30px 0 20px; color: #111111; font-size: 16px; line-height: 1.6;">
                                <strong>Jetzt Demo ansehen</strong> und überzeugen Sie sich selbst:
                            </p>

                            <!-- CTA Button -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                                <tr>
                                    <td align="center">
                                        <a href="https://webflix.de/demo/maler" style="display: inline-block; background: linear-gradient(135deg, #FF8200 0%, #F472B6 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 12px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 12px rgba(255, 130, 0, 0.3);">
                                            Live-Demo ansehen
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <p style="margin: 30px 0 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
                                Haben Sie Fragen? Antworten Sie einfach auf diese Email – wir beraten Sie gerne persönlich.
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f9fafb; padding: 30px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
                            <p style="margin: 0 0 10px; color: #6b7280; font-size: 14px;">
                                <strong>Webflix</strong><br>
                                Professionelle Websites für Handwerksbetriebe
                            </p>
                            <p style="margin: 10px 0 0; color: #9ca3af; font-size: 12px; line-height: 1.6;">
                                Sie erhalten diese Email, weil Sie sich für digitale Lösungen für Handwerksbetriebe interessieren könnten.<br>
                                <a href="{{unsubscribe}}" style="color: #6b7280; text-decoration: underline;">Abmelden</a> |
                                <a href="https://webflix.de/datenschutz" style="color: #6b7280; text-decoration: underline;">Datenschutz</a> |
                                <a href="https://webflix.de/impressum" style="color: #6b7280; text-decoration: underline;">Impressum</a>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `
  }
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { campaignId } = await req.json();

    if (!campaignId) {
      throw new Error('Campaign ID is required');
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get campaign details
    const { data: campaign, error: campaignError } = await supabase
      .from('email_campaigns')
      .select('*')
      .eq('id', campaignId)
      .single();

    if (campaignError || !campaign) {
      throw new Error('Campaign not found');
    }

    // Get target leads
    let query = supabase
      .from('email_leads')
      .select('*')
      .eq('status', 'active');

    if (campaign.target_industry) {
      query = query.eq('industry', campaign.target_industry);
    }

    const { data: leads, error: leadsError } = await query;

    if (leadsError) {
      throw new Error('Failed to fetch leads');
    }

    if (!leads || leads.length === 0) {
      throw new Error('No active leads found');
    }

    // Update campaign status
    await supabase
      .from('email_campaigns')
      .update({
        status: 'sending',
        total_recipients: leads.length
      })
      .eq('id', campaignId);

    // Get email template
    const template = templates[campaign.template_name as keyof typeof templates];
    if (!template) {
      throw new Error('Template not found');
    }

    let successCount = 0;
    let failCount = 0;

    // Send emails via Brevo
    for (const lead of leads) {
      try {
        const emailHtml = template.getHtml(lead);

        const brevoResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'api-key': BREVO_API_KEY,
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            sender: {
              name: 'Webflix',
              email: 'info@webflix.de'
            },
            to: [{
              email: lead.email,
              name: lead.first_name && lead.last_name
                ? `${lead.first_name} ${lead.last_name}`
                : lead.first_name || lead.email
            }],
            subject: campaign.subject,
            htmlContent: emailHtml,
            tags: ['campaign', campaign.template_name]
          })
        });

        if (brevoResponse.ok) {
          const brevoData = await brevoResponse.json();

          // Track successful send
          await supabase.from('email_campaign_sends').insert({
            campaign_id: campaignId,
            lead_id: lead.id,
            email: lead.email,
            status: 'sent',
            brevo_message_id: brevoData.messageId,
            sent_at: new Date().toISOString()
          });

          successCount++;
        } else {
          throw new Error('Brevo API error');
        }
      } catch (error) {
        // Track failed send
        await supabase.from('email_campaign_sends').insert({
          campaign_id: campaignId,
          lead_id: lead.id,
          email: lead.email,
          status: 'failed',
          error_message: error.message
        });

        failCount++;
      }

      // Rate limiting - 100ms delay between emails
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // Update campaign final status
    await supabase
      .from('email_campaigns')
      .update({
        status: 'sent',
        sent_at: new Date().toISOString(),
        total_sent: successCount
      })
      .eq('id', campaignId);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Campaign sent successfully to ${successCount} recipients`,
        total: leads.length,
        success: successCount,
        failed: failCount
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );

  } catch (error) {
    console.error('Error sending campaign:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400
      }
    );
  }
});