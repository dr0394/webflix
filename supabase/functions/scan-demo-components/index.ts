import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { demoName, componentPath } = await req.json();

    if (!demoName || !componentPath) {
      return new Response(
        JSON.stringify({ error: "Missing demoName or componentPath" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const fullPath = `../../src/demos/${demoName}/${componentPath}`;

    let sourceCode = '';
    try {
      sourceCode = await Deno.readTextFile(fullPath);
    } catch (error) {
      console.error(`Error reading file ${fullPath}:`, error);
      return new Response(
        JSON.stringify({
          error: "Could not read file",
          path: fullPath,
          message: error.message
        }),
        {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        sourceCode,
        path: fullPath
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
