import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    // Create client with service role key to bypass RLS
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // Handle GET request - fetch all leads
    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('email_leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching leads:', error);
        return new Response(
          JSON.stringify({ error: error.message }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      return new Response(
        JSON.stringify({ leads: data || [] }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const { leads } = await req.json();

    if (!leads || !Array.isArray(leads) || leads.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Keine Leads vorhanden' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Validate that all leads have email
    const validLeads = leads.filter(lead => lead.email && lead.email.includes('@'));

    if (validLeads.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Keine gültigen Email-Adressen gefunden' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Remove duplicates within the CSV itself (keep only first occurrence)
    const emailMap = new Map();
    const uniqueLeads = [];

    for (const lead of validLeads) {
      const emailLower = lead.email.toLowerCase();
      if (!emailMap.has(emailLower)) {
        emailMap.set(emailLower, true);
        uniqueLeads.push({
          ...lead,
          email: emailLower // Normalize email to lowercase
        });
      }
    }

    console.log(`Importing ${uniqueLeads.length} unique leads (removed ${validLeads.length - uniqueLeads.length} duplicates)...`);

    // Insert leads using service role (bypasses RLS)
    const { data, error } = await supabase
      .from('email_leads')
      .upsert(uniqueLeads, { onConflict: 'email', ignoreDuplicates: false });

    if (error) {
      console.error('Error inserting leads:', error);
      return new Response(
        JSON.stringify({ error: error.message }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `${uniqueLeads.length} Leads erfolgreich importiert`,
        count: uniqueLeads.length,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Unbekannter Fehler' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});