/*
  # Advanced Design System for Dynamic Industries
  
  ## Overview
  Erweitert das Theme-System um vollständiges Design-Control:
  - Typography (Schriftarten, Größen, Gewichte)
  - Spacing (Abstände, Paddings, Margins)
  - Border Radius (Abrundungen)
  - Shadows (Schatten)
  - Animations (Animationen)
  - Layout-Modi (minimalistisch, modern, elegant, bold)
  
  ## Changes
  1. Erweitert `industries.theme` um umfassendes Design-System
  2. Fügt `design_style` Enum hinzu (minimal, modern, elegant, bold, playful)
  3. Erweitert Sections um individuelle Style-Overrides
*/

-- Design Style Enum
DO $$ BEGIN
  CREATE TYPE design_style AS ENUM ('minimal', 'modern', 'elegant', 'bold', 'playful', 'professional', 'luxury');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Füge design_style zur industries Tabelle hinzu
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'industries' AND column_name = 'design_style'
  ) THEN
    ALTER TABLE industries ADD COLUMN design_style design_style DEFAULT 'modern';
  END IF;
END $$;

-- Füge style_overrides zu sections hinzu
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'sections' AND column_name = 'style_overrides'
  ) THEN
    ALTER TABLE sections ADD COLUMN style_overrides jsonb DEFAULT '{}'::jsonb;
  END IF;
END $$;

-- Kommentar für erwartete Theme-Struktur
COMMENT ON COLUMN industries.theme IS 'Complete design system: {
  "colors": {
    "primary": "#hex",
    "secondary": "#hex", 
    "accent": "#hex",
    "text": "#hex",
    "textLight": "#hex",
    "background": "#hex",
    "surface": "#hex",
    "border": "#hex"
  },
  "typography": {
    "fontFamily": "Font Name",
    "headingFont": "Font Name",
    "bodyFont": "Font Name",
    "sizes": {
      "xs": "0.75rem",
      "sm": "0.875rem",
      "base": "1rem",
      "lg": "1.125rem",
      "xl": "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "3.75rem"
    },
    "weights": {
      "light": 300,
      "normal": 400,
      "medium": 500,
      "semibold": 600,
      "bold": 700,
      "extrabold": 800
    }
  },
  "spacing": {
    "section": "6rem",
    "container": "1280px",
    "gap": "2rem"
  },
  "borderRadius": {
    "sm": "0.25rem",
    "md": "0.5rem",
    "lg": "1rem",
    "xl": "1.5rem",
    "2xl": "2rem",
    "full": "9999px"
  },
  "shadows": {
    "sm": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    "md": "0 4px 6px -1px rgb(0 0 0 / 0.1)",
    "lg": "0 10px 15px -3px rgb(0 0 0 / 0.1)",
    "xl": "0 20px 25px -5px rgb(0 0 0 / 0.1)",
    "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)"
  },
  "animations": {
    "duration": "300ms",
    "easing": "ease-in-out"
  }
}';