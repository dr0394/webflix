import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ChecklistData {
  companyInfo?: {
    name?: string;
    tagline?: string;
    description?: string;
    phone?: string;
    email?: string;
    address?: string;
    city?: string;
    zip?: string;
    openingHours?: string;
  };
  services?: Array<{
    id: string;
    name: string;
    description?: string;
    price?: string;
  }>;
  images?: {
    logo?: string;
    hero?: string;
    gallery?: string[];
  };
  colors?: {
    primary?: string;
    secondary?: string;
  };
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
}

function injectChecklistData(code: string, data: ChecklistData): string {
  let result = code;

  if (data.companyInfo?.name) {
    result = result.replace(/Premium Autoaufbereitung/g, data.companyInfo.name);
    result = result.replace(/Elektrik Meister/g, data.companyInfo.name);
    result = result.replace(/Metzgerei/g, data.companyInfo.name);
  }

  if (data.companyInfo?.tagline) {
    result = result.replace(/Perfektion bis ins kleinste Detail/g, data.companyInfo.tagline);
    result = result.replace(/Ihr Auto verdient das Beste/g, data.companyInfo.tagline);
  }

  if (data.companyInfo?.phone) {
    result = result.replace(/\+49 123 456789/g, data.companyInfo.phone);
    result = result.replace(/tel:\+49\s?\d+\s?\d+/g, `tel:${data.companyInfo.phone}`);
  }

  if (data.companyInfo?.email) {
    result = result.replace(/info@[a-z\-]+\.de/g, data.companyInfo.email);
    result = result.replace(/kontakt@[a-z\-]+\.de/g, data.companyInfo.email);
  }

  if (data.companyInfo?.address) {
    result = result.replace(/Musterstra(ß|ss)e \d+/g, data.companyInfo.address);
  }

  if (data.companyInfo?.city && data.companyInfo?.zip) {
    result = result.replace(/\d{5} Musterstadt/g, `${data.companyInfo.zip} ${data.companyInfo.city}`);
  }

  if (data.socialMedia?.facebook) {
    result = result.replace(/https:\/\/facebook\.com\/[^"']*/g, data.socialMedia.facebook);
  }

  if (data.socialMedia?.instagram) {
    result = result.replace(/https:\/\/instagram\.com\/[^"']*/g, data.socialMedia.instagram);
  }

  return result;
}

function generatePackageJson(projectName: string): string {
  return JSON.stringify({
    "name": projectName.toLowerCase().replace(/\s+/g, '-'),
    "private": true,
    "version": "1.0.0",
    "type": "module",
    "scripts": {
      "dev": "vite",
      "build": "vite build",
      "preview": "vite preview"
    },
    "dependencies": {
      "react": "^18.3.1",
      "react-dom": "^18.3.1",
      "react-router-dom": "^7.9.1",
      "framer-motion": "^12.23.16",
      "lucide-react": "^0.344.0"
    },
    "devDependencies": {
      "@types/react": "^18.3.5",
      "@types/react-dom": "^18.3.0",
      "@vitejs/plugin-react": "^4.3.1",
      "autoprefixer": "^10.4.18",
      "postcss": "^8.4.35",
      "tailwindcss": "^3.4.1",
      "typescript": "^5.5.3",
      "vite": "^5.4.2"
    }
  }, null, 2);
}

function generateViteConfig(): string {
  return `import { defineConfig } from 'vite'\nimport react from '@vitejs/plugin-react'\n\nexport default defineConfig({\n  plugins: [react()],\n})`;
}

function generateTailwindConfig(): string {
  return `/** @type {import('tailwindcss').Config} */\nexport default {\n  content: [\n    "./index.html",\n    "./src/**/*.{js,ts,jsx,tsx}",\n  ],\n  theme: {\n    extend: {},\n  },\n  plugins: [],\n}`;
}

function generateIndexHTML(projectName: string): string {
  return `<!DOCTYPE html>\n<html lang="de">\n  <head>\n    <meta charset="UTF-8" />\n    <link rel="icon" type="image/svg+xml" href="/vite.svg" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>${projectName}</title>\n  </head>\n  <body>\n    <div id="root"></div>\n    <script type="module" src="/src/main.tsx"></script>\n  </body>\n</html>`;
}

function generateMainTsx(): string {
  return `import React from 'react'\nimport ReactDOM from 'react-dom/client'\nimport App from './App.tsx'\nimport './index.css'\n\nReactDOM.createRoot(document.getElementById('root')!).render(\n  <React.StrictMode>\n    <App />\n  </React.StrictMode>,\n)`;
}

function generateAppTsx(demoName: string): string {
  return `import React from 'react';\nimport Landing from './demos/${demoName}/Landing';\n\nfunction App() {\n  return <Landing />;\n}\n\nexport default App;`;
}

function generateIndexCSS(): string {
  return `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}`;
}

function generateReadme(projectName: string, demoName: string): string {
  return `# ${projectName}\n\nAutomatisch generierte Website von Webflix.\n\n## Demo Template\nBasiert auf: **${demoName}**\n\n## Installation & Start\n\n\`\`\`bash\n# Dependencies installieren\nnpm install\n\n# Development Server starten\nnpm run dev\n\n# Production Build erstellen\nnpm run build\n\`\`\`\n\n## Deployment\n\n### Option 1: Netlify (Empfohlen)\n1. Erstelle einen Account auf netlify.com\n2. Verbinde dein GitHub Repository\n3. Deploy-Einstellungen:\n   - Build command: \`npm run build\`\n   - Publish directory: \`dist\`\n\n### Option 2: Vercel\n1. Erstelle einen Account auf vercel.com\n2. Importiere dein Projekt\n3. Automatisches Deployment wird konfiguriert\n\n## Support\n\nBei Fragen: support@webflix.de\n\n---\n\nGeneriert am: ${new Date().toISOString()}\nTemplate: ${demoName}\n`;
}

function generateNetlifyToml(): string {
  return `[build]\n  command = "npm run build"\n  publish = "dist"\n\n[[redirects]]\n  from = "/*"\n  to = "/index.html"\n  status = 200`;
}

async function fetchDemoFiles(demoName: string): Promise<Map<string, string>> {
  const files = new Map<string, string>();

  files.set(`src/demos/${demoName}/Landing.tsx`, `import React from 'react';\n\nexport default function Landing() {\n  return (\n    <div className="min-h-screen bg-black text-white">\n      <h1 className="text-4xl font-bold text-center pt-20">Landing Page</h1>\n      <p className="text-center mt-4">Template: ${demoName}</p>\n    </div>\n  );\n}\n`);

  return files;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { checklist_id } = await req.json();

    const { data: checklist, error: checklistError } = await supabase
      .from("order_checklists")
      .select("*, webflix_orders(*)")
      .eq("id", checklist_id)
      .single();

    if (checklistError || !checklist) {
      throw new Error("Checkliste nicht gefunden");
    }

    const checklistData: ChecklistData = checklist.checklist_data;
    const demoName = checklist.demo_name;
    const projectName = checklistData.companyInfo?.name || "Webflix Website";

    const demoFiles = await fetchDemoFiles(demoName);

    const generatedFiles = new Map<string, string>();

    generatedFiles.set("package.json", generatePackageJson(projectName));
    generatedFiles.set("vite.config.ts", generateViteConfig());
    generatedFiles.set("tailwind.config.js", generateTailwindConfig());
    generatedFiles.set("postcss.config.js", "export default { plugins: { tailwindcss: {}, autoprefixer: {} } }");
    generatedFiles.set("index.html", generateIndexHTML(projectName));
    generatedFiles.set("src/main.tsx", generateMainTsx());
    generatedFiles.set("src/App.tsx", generateAppTsx(demoName));
    generatedFiles.set("src/index.css", generateIndexCSS());
    generatedFiles.set("README.md", generateReadme(projectName, demoName));
    generatedFiles.set("netlify.toml", generateNetlifyToml());

    for (const [path, content] of demoFiles) {
      const injectedContent = injectChecklistData(content, checklistData);
      generatedFiles.set(path, injectedContent);
    }

    const filesList = Array.from(generatedFiles.entries()).map(([path, content]) => ({
      path,
      content,
      size: new TextEncoder().encode(content).length
    }));

    const { data: website, error: websiteError } = await supabase
      .from("generated_websites")
      .upsert({
        order_id: checklist.order_id,
        customer_id: checklist.customer_id,
        template_name: demoName,
        slug: `${checklist.webflix_orders.order_number}-${demoName}`,
        injected_content: checklistData,
        zip_generated: false,
      }, {
        onConflict: 'order_id'
      })
      .select()
      .single();

    if (websiteError) {
      throw websiteError;
    }

    return new Response(
      JSON.stringify({
        success: true,
        website_id: website.id,
        files_count: filesList.length,
        project_name: projectName,
        files: filesList,
        message: "Website erfolgreich generiert! Du kannst jetzt die Dateien in Bolt importieren."
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error: any) {
    console.error("Error generating website:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
