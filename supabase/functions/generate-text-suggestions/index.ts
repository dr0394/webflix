import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const OPENROUTER_API_KEY = "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";

interface SuggestionRequest {
  fieldId: string;
  fieldLabel: string;
  fieldType: string;
  demoName: string;
  contextData: Record<string, any>;
  maxLength?: number;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const {
      fieldId,
      fieldLabel,
      fieldType,
      demoName,
      contextData,
      maxLength,
    }: SuggestionRequest = await req.json();

    const businessName = contextData.business_name || "das Unternehmen";
    const businessType = getDemoDisplayName(demoName);
    const location = contextData.location || "";

    const prompt = buildPrompt(
      fieldId,
      fieldLabel,
      businessName,
      businessType,
      location,
      contextData,
      maxLength
    );

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://webflix.de",
        "X-Title": "Webflix AI Suggestions",
      },
      body: JSON.stringify({
        model: "anthropic/claude-3.5-sonnet",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.9,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenRouter API error: ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content || "";

    const suggestions = parseAISuggestions(aiResponse);

    return new Response(
      JSON.stringify({ suggestions }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error generating suggestions:", error);

    return new Response(
      JSON.stringify({
        error: error.message,
        suggestions: [],
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

function getDemoDisplayName(demoName: string): string {
  const names: Record<string, string> = {
    autoaufbereitung: "Autoaufbereitung",
    bauunternehmen: "Bauunternehmen",
    elektriker: "Elektriker",
    gartenlandschaftsbau: "Garten- und Landschaftsbau",
    gebaeudereinigung: "Gebäudereinigung",
    handwerk: "Handwerksbetrieb",
    metallbau: "Metallbau",
    physiotherapie: "Physiotherapie",
    security: "Sicherheitsdienst",
    beauty: "Beauty & Wellness",
    gastro: "Gastronomie",
    personalbrand: "Personal Brand",
    metzgerei: "Metzgerei",
  };
  return names[demoName] || "Unternehmen";
}

function buildPrompt(
  fieldId: string,
  fieldLabel: string,
  businessName: string,
  businessType: string,
  location: string,
  contextData: Record<string, any>,
  maxLength?: number
): string {
  const locationText = location ? ` in ${location}` : "";
  const charLimit = maxLength ? ` (max. ${maxLength} Zeichen)` : "";

  const contextInfo = Object.entries(contextData)
    .filter(([key, value]) => value && key !== "id")
    .map(([key, value]) => `${key}: ${value}`)
    .join(", ");

  let specificGuidance = "";

  if (fieldId === "hero_headline" || fieldLabel.toLowerCase().includes("headline")) {
    specificGuidance = `
Erstelle 3 verschiedene, überzeugende Headlines für ${businessName} (${businessType}${locationText}).
Jede Headline soll:
- Emotional und aufmerksamkeitsstark sein
- Den Hauptnutzen klar kommunizieren
- Zur Branche ${businessType} passen
- Modern und professionell klingen
${charLimit}

Gib NUR die 3 Headlines aus, jeweils auf einer neuen Zeile, ohne Nummerierung oder weitere Erklärungen.`;
  } else if (fieldId === "hero_subheadline" || fieldLabel.toLowerCase().includes("subheadline")) {
    specificGuidance = `
Erstelle 3 verschiedene Subheadlines für ${businessName} (${businessType}${locationText}).
Die Subheadline soll die Hauptheadline ergänzen und:
- Konkrete Details oder Benefits nennen
- Vertrauen aufbauen
- Zur Handlung animieren
${charLimit}

Gib NUR die 3 Subheadlines aus, jeweils auf einer neuen Zeile, ohne Nummerierung.`;
  } else if (fieldId === "about_text" || fieldLabel.toLowerCase().includes("über uns")) {
    specificGuidance = `
Erstelle 3 verschiedene "Über uns"-Texte für ${businessName} (${businessType}${locationText}).
Jeder Text soll:
- Die Expertise und Erfahrung betonen
- Vertrauen aufbauen
- Die Werte des Unternehmens kommunizieren
- Persönlich und authentisch wirken
${charLimit}

Gib NUR die 3 Texte aus, getrennt durch "---" auf einer eigenen Zeile.`;
  } else if (fieldLabel.toLowerCase().includes("call-to-action") || fieldLabel.toLowerCase().includes("cta")) {
    specificGuidance = `
Erstelle 3 verschiedene Call-to-Action Texte für ${businessName} (${businessType}${locationText}).
Jeder CTA soll:
- Kurz und prägnant sein
- Zur direkten Handlung auffordern
- Benefit-orientiert sein
${charLimit}

Gib NUR die 3 CTAs aus, jeweils auf einer neuen Zeile, ohne Nummerierung.`;
  } else {
    specificGuidance = `
Erstelle 3 verschiedene Textvorschläge für das Feld "${fieldLabel}" für ${businessName} (${businessType}${locationText}).
Die Texte sollen:
- Professionell und überzeugend sein
- Zur Branche passen
- Klar und verständlich formuliert sein
${charLimit}

Kontext: ${contextInfo || "Keine weiteren Informationen"}

Gib NUR die 3 Textvorschläge aus, getrennt durch "---" auf einer eigenen Zeile.`;
  }

  return specificGuidance;
}

function parseAISuggestions(aiResponse: string): string[] {
  const suggestions = aiResponse
    .split(/\n---|---\n/)
    .map(s => s.trim())
    .filter(s => s.length > 0)
    .flatMap(s => s.split('\n').filter(line => line.trim().length > 0))
    .map(s => s.replace(/^[\d\.\-\*]+\s*/, ''))
    .filter(s => s.length > 10);

  return suggestions.slice(0, 3);
}
