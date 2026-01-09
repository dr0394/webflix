import { supabase } from './supabase';

interface DemoTemplate {
  name: string;
  displayName: string;
  industry: string;
  description: string;
  demoUrl: string;
  basePath: string;
}

interface ComponentInfo {
  name: string;
  displayName: string;
  filePath: string;
  componentType: string;
  tags: string[];
  orderIndex: number;
}

const DEMO_TEMPLATES: DemoTemplate[] = [
  {
    name: 'elektriker',
    displayName: 'Elektriker Meisterbetrieb',
    industry: 'Handwerk',
    description: 'Professionelle Website für Elektrikermeisterbetriebe mit Notdienst-Banner',
    demoUrl: '/demo/elektriker',
    basePath: 'src/demos/elektriker'
  },
  {
    name: 'autoaufbereitung',
    displayName: 'Auto Aufbereitung',
    industry: 'Automotive',
    description: 'Moderne Website für Autoaufbereitungs-Services mit Before/After Slider',
    demoUrl: '/demo/autoaufbereitung',
    basePath: 'src/demos/autoaufbereitung'
  },
  {
    name: 'metzgerei',
    displayName: 'Metzgerei & Feinkost',
    industry: 'Gastronomie',
    description: 'E-Commerce Website für Metzgereien mit Bestellfunktion',
    demoUrl: '/demo/metzgerei',
    basePath: 'src/demos/metzgerei'
  },
  {
    name: 'physiotherapie',
    displayName: 'Physiotherapie Praxis',
    industry: 'Gesundheit',
    description: 'Website für Physiotherapie-Praxen mit Buchungssystem',
    demoUrl: '/demo/physiotherapie',
    basePath: 'src/demos/physiotherapie'
  },
  {
    name: 'bauunternehmen',
    displayName: 'Bauunternehmen',
    industry: 'Bau',
    description: 'Professionelle Präsentation für Bauunternehmen',
    demoUrl: '/demo/bauunternehmen',
    basePath: 'src/demos/bauunternehmen'
  },
  {
    name: 'beauty',
    displayName: 'Beauty & Wellness',
    industry: 'Beauty',
    description: 'Elegante Website für Beauty-Salons',
    demoUrl: '/demo/beauty',
    basePath: 'src/demos/beauty'
  },
  {
    name: 'gartenlandschaftsbau',
    displayName: 'Garten & Landschaftsbau',
    industry: 'Handwerk',
    description: 'Website für Garten- und Landschaftsbau mit Projekt-Galerie',
    demoUrl: '/demo/gartenlandschaftsbau',
    basePath: 'src/demos/gartenlandschaftsbau'
  },
  {
    name: 'gastro',
    displayName: 'Restaurant & Gastronomie',
    industry: 'Gastronomie',
    description: 'Moderne Restaurant-Website mit Speisekarte',
    demoUrl: '/demo/gastro',
    basePath: 'src/demos/gastro'
  },
  {
    name: 'gebaeudereinigung',
    displayName: 'Gebäudereinigung',
    industry: 'Dienstleistung',
    description: 'Professionelle Website für Reinigungsdienste',
    demoUrl: '/demo/gebaeudereinigung',
    basePath: 'src/demos/gebaeudereinigung'
  },
  {
    name: 'handwerk',
    displayName: 'Handwerksbetrieb',
    industry: 'Handwerk',
    description: 'Vielseitige Website für Handwerksbetriebe',
    demoUrl: '/demo/handwerk',
    basePath: 'src/demos/handwerk'
  },
  {
    name: 'metallbau',
    displayName: 'Metallbau',
    industry: 'Handwerk',
    description: 'Website für Metallbau-Betriebe mit Service-Auswahl',
    demoUrl: '/demo/metallbau',
    basePath: 'src/demos/metallbau'
  },
  {
    name: 'personalbrand',
    displayName: 'Personal Brand',
    industry: 'Personal Branding',
    description: 'Portfolio-Website für Selbstständige und Freelancer',
    demoUrl: '/demo/personalbrand',
    basePath: 'src/demos/personalbrand'
  },
  {
    name: 'security',
    displayName: 'Security & Sicherheit',
    industry: 'Sicherheit',
    description: 'Website für Sicherheitsdienste',
    demoUrl: '/demo/security',
    basePath: 'src/demos/security'
  }
];

const COMPONENT_MAPPING: Record<string, ComponentInfo[]> = {
  elektriker: [
    { name: 'Header', displayName: 'Navigation Header', filePath: 'components/Header.tsx', componentType: 'navigation', tags: ['header', 'nav', 'menu'], orderIndex: 1 },
    { name: 'EmergencyBanner', displayName: 'Notdienst Banner', filePath: 'components/EmergencyBanner.tsx', componentType: 'banner', tags: ['emergency', 'banner', 'alert'], orderIndex: 2 },
    { name: 'HeroSection', displayName: 'Hero Section', filePath: 'components/HeroSection.tsx', componentType: 'hero', tags: ['hero', 'landing', 'cta'], orderIndex: 3 },
    { name: 'ServicesGrid', displayName: 'Dienstleistungen Grid', filePath: 'components/ServicesGrid.tsx', componentType: 'content', tags: ['services', 'grid', 'cards'], orderIndex: 4 },
    { name: 'WhyChooseUs', displayName: 'Warum Wir', filePath: 'components/WhyChooseUs.tsx', componentType: 'content', tags: ['features', 'benefits', 'trust'], orderIndex: 5 },
    { name: 'ProjectsGallery', displayName: 'Projekt Galerie', filePath: 'components/ProjectsGallery.tsx', componentType: 'gallery', tags: ['gallery', 'projects', 'portfolio'], orderIndex: 6 },
    { name: 'ContactSection', displayName: 'Kontakt Sektion', filePath: 'components/ContactSection.tsx', componentType: 'form', tags: ['contact', 'form', 'map'], orderIndex: 7 },
    { name: 'Footer', displayName: 'Footer', filePath: 'components/Footer.tsx', componentType: 'footer', tags: ['footer', 'links', 'social'], orderIndex: 8 }
  ],
  autoaufbereitung: [
    { name: 'Header', displayName: 'Navigation Header', filePath: 'components/Header.tsx', componentType: 'navigation', tags: ['header', 'nav'], orderIndex: 1 },
    { name: 'VehicleSelection', displayName: 'Fahrzeug Auswahl', filePath: 'components/VehicleSelection.tsx', componentType: 'interactive', tags: ['selection', 'vehicle', 'configurator'], orderIndex: 2 },
    { name: 'CleaningConfigurator', displayName: 'Reinigungs Konfigurator', filePath: 'components/CleaningConfigurator.tsx', componentType: 'interactive', tags: ['configurator', 'pricing', 'booking'], orderIndex: 3 },
    { name: 'BeforeAfterSection', displayName: 'Vorher/Nachher Sektion', filePath: 'components/BeforeAfterSection.tsx', componentType: 'showcase', tags: ['before-after', 'showcase'], orderIndex: 4 },
    { name: 'BeforeAfterSlider', displayName: 'Vorher/Nachher Slider', filePath: 'components/BeforeAfterSlider.tsx', componentType: 'interactive', tags: ['slider', 'comparison'], orderIndex: 5 },
    { name: 'Gallery', displayName: 'Galerie', filePath: 'components/Gallery.tsx', componentType: 'gallery', tags: ['gallery', 'images'], orderIndex: 6 },
    { name: 'TrustSection', displayName: 'Vertrauen', filePath: 'components/TrustSection.tsx', componentType: 'content', tags: ['trust', 'testimonials'], orderIndex: 7 },
    { name: 'MapSection', displayName: 'Karte', filePath: 'components/MapSection.tsx', componentType: 'map', tags: ['map', 'location'], orderIndex: 8 },
    { name: 'Footer', displayName: 'Footer', filePath: 'components/Footer.tsx', componentType: 'footer', tags: ['footer'], orderIndex: 9 }
  ],
  metzgerei: [
    { name: 'Header', displayName: 'Navigation Header', filePath: 'components/Header.tsx', componentType: 'navigation', tags: ['header', 'nav', 'cart'], orderIndex: 1 },
    { name: 'HeroSection', displayName: 'Hero Section', filePath: 'components/HeroSection.tsx', componentType: 'hero', tags: ['hero', 'landing'], orderIndex: 2 },
    { name: 'WeeklySpecials', displayName: 'Wochenangebote', filePath: 'components/WeeklySpecials.tsx', componentType: 'content', tags: ['specials', 'offers', 'products'], orderIndex: 3 },
    { name: 'ProductCategories', displayName: 'Produkt Kategorien', filePath: 'components/ProductCategories.tsx', componentType: 'content', tags: ['categories', 'products'], orderIndex: 4 },
    { name: 'BestellService', displayName: 'Bestellservice', filePath: 'components/BestellService.tsx', componentType: 'content', tags: ['order', 'service'], orderIndex: 5 },
    { name: 'QualitySection', displayName: 'Qualität', filePath: 'components/QualitySection.tsx', componentType: 'content', tags: ['quality', 'trust'], orderIndex: 6 },
    { name: 'KontaktSection', displayName: 'Kontakt', filePath: 'components/KontaktSection.tsx', componentType: 'form', tags: ['contact', 'form'], orderIndex: 7 },
    { name: 'ShopPage', displayName: 'Shop Seite', filePath: 'components/ShopPage.tsx', componentType: 'ecommerce', tags: ['shop', 'ecommerce', 'cart'], orderIndex: 8 },
    { name: 'CheckoutPage', displayName: 'Checkout', filePath: 'components/CheckoutPage.tsx', componentType: 'ecommerce', tags: ['checkout', 'payment'], orderIndex: 9 },
    { name: 'Footer', displayName: 'Footer', filePath: 'components/Footer.tsx', componentType: 'footer', tags: ['footer'], orderIndex: 10 }
  ]
};

export function getDemoTemplates() {
  return DEMO_TEMPLATES;
}

export function getComponentsForDemo(demoName: string): ComponentInfo[] {
  return COMPONENT_MAPPING[demoName] || [];
}

export async function syncTemplatesAndComponents() {
  try {
    for (const template of DEMO_TEMPLATES) {
      const { data: existingTemplate } = await supabase
        .from('demo_templates')
        .select('id')
        .eq('name', template.name)
        .maybeSingle();

      let templateId: string;

      if (existingTemplate) {
        templateId = existingTemplate.id;
        await supabase
          .from('demo_templates')
          .update({
            display_name: template.displayName,
            industry: template.industry,
            description: template.description,
            demo_url: template.demoUrl,
            base_path: template.basePath,
            updated_at: new Date().toISOString()
          })
          .eq('id', templateId);
      } else {
        const { data: newTemplate } = await supabase
          .from('demo_templates')
          .insert({
            name: template.name,
            display_name: template.displayName,
            industry: template.industry,
            description: template.description,
            demo_url: template.demoUrl,
            base_path: template.basePath
          })
          .select('id')
          .single();

        if (!newTemplate) continue;
        templateId = newTemplate.id;
      }

      const components = getComponentsForDemo(template.name);
      for (const comp of components) {
        const fullPath = `${template.basePath}/${comp.filePath}`;

        const { data: existingComp } = await supabase
          .from('demo_components')
          .select('id')
          .eq('template_id', templateId)
          .eq('file_path', fullPath)
          .maybeSingle();

        const componentData = {
          template_id: templateId,
          name: comp.name,
          display_name: comp.displayName,
          file_path: fullPath,
          component_type: comp.componentType,
          tags: comp.tags,
          order_index: comp.orderIndex,
          source_code: '',
          updated_at: new Date().toISOString()
        };

        if (existingComp) {
          await supabase
            .from('demo_components')
            .update(componentData)
            .eq('id', existingComp.id);
        } else {
          await supabase
            .from('demo_components')
            .insert(componentData);
        }
      }
    }

    return { success: true, message: 'Templates and components synced successfully' };
  } catch (error) {
    console.error('Error syncing templates:', error);
    return { success: false, error };
  }
}
