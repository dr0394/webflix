/*
  # Add missing columns to customer_brandings

  1. Columns added
    - reference_images, vehicle_types, service_types, google_place_id
    - google_reviews_enabled, google_maps_enabled, maps_address, demo_name
    - hero_badge, hero_background_image, services_section_title, services_section_subtitle, services_list
    - address_street, address_city, address_zip, hero_image_url
    - services, before_after_images, gallery_images, opening_hours
    - social_media, google_maps_url, coordinates, tagline, short_description, usp_items
    - generation_status, generation_started_at, generation_completed_at, generated_website_id

  2. Indexes for performance
*/

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'customer_brandings' AND column_name = 'reference_images') THEN
    ALTER TABLE customer_brandings ADD COLUMN reference_images jsonb DEFAULT '{}'::jsonb;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'customer_brandings' AND column_name = 'vehicle_types') THEN
    ALTER TABLE customer_brandings ADD COLUMN vehicle_types jsonb DEFAULT '[]';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'customer_brandings' AND column_name = 'service_types') THEN
    ALTER TABLE customer_brandings ADD COLUMN service_types jsonb DEFAULT '[]';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'customer_brandings' AND column_name = 'google_place_id') THEN
    ALTER TABLE customer_brandings ADD COLUMN google_place_id text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'customer_brandings' AND column_name = 'google_reviews_enabled') THEN
    ALTER TABLE customer_brandings ADD COLUMN google_reviews_enabled boolean DEFAULT true;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'customer_brandings' AND column_name = 'google_maps_enabled') THEN
    ALTER TABLE customer_brandings ADD COLUMN google_maps_enabled boolean DEFAULT true;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'customer_brandings' AND column_name = 'maps_address') THEN
    ALTER TABLE customer_brandings ADD COLUMN maps_address text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'customer_brandings' AND column_name = 'demo_name') THEN
    ALTER TABLE customer_brandings ADD COLUMN demo_name text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'customer_brandings' AND column_name = 'hero_badge') THEN
    ALTER TABLE customer_brandings ADD COLUMN hero_badge text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'customer_brandings' AND column_name = 'hero_background_image') THEN
    ALTER TABLE customer_brandings ADD COLUMN hero_background_image text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'customer_brandings' AND column_name = 'services_section_title') THEN
    ALTER TABLE customer_brandings ADD COLUMN services_section_title text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'customer_brandings' AND column_name = 'services_section_subtitle') THEN
    ALTER TABLE customer_brandings ADD COLUMN services_section_subtitle text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'customer_brandings' AND column_name = 'services_list') THEN
    ALTER TABLE customer_brandings ADD COLUMN services_list jsonb DEFAULT '[]'::jsonb;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'customer_brandings' AND column_name = 'address_street') THEN
    ALTER TABLE customer_brandings ADD COLUMN address_street text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'customer_brandings' AND column_name = 'address_city') THEN
    ALTER TABLE customer_brandings ADD COLUMN address_city text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'customer_brandings' AND column_name = 'address_zip') THEN
    ALTER TABLE customer_brandings ADD COLUMN address_zip text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'customer_brandings' AND column_name = 'hero_image_url') THEN
    ALTER TABLE customer_brandings ADD COLUMN hero_image_url text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'customer_brandings' AND column_name = 'services') THEN
    ALTER TABLE customer_brandings ADD COLUMN services jsonb DEFAULT '[]'::jsonb;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'customer_brandings' AND column_name = 'before_after_images') THEN
    ALTER TABLE customer_brandings ADD COLUMN before_after_images jsonb DEFAULT '[]'::jsonb;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'customer_brandings' AND column_name = 'gallery_images') THEN
    ALTER TABLE customer_brandings ADD COLUMN gallery_images jsonb DEFAULT '[]'::jsonb;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'customer_brandings' AND column_name = 'opening_hours') THEN
    ALTER TABLE customer_brandings ADD COLUMN opening_hours jsonb DEFAULT '{}'::jsonb;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'customer_brandings' AND column_name = 'social_media') THEN
    ALTER TABLE customer_brandings ADD COLUMN social_media jsonb DEFAULT '{}'::jsonb;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'customer_brandings' AND column_name = 'google_maps_url') THEN
    ALTER TABLE customer_brandings ADD COLUMN google_maps_url text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'customer_brandings' AND column_name = 'coordinates') THEN
    ALTER TABLE customer_brandings ADD COLUMN coordinates jsonb DEFAULT '{"lat": 0, "lng": 0}'::jsonb;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'customer_brandings' AND column_name = 'tagline') THEN
    ALTER TABLE customer_brandings ADD COLUMN tagline text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'customer_brandings' AND column_name = 'short_description') THEN
    ALTER TABLE customer_brandings ADD COLUMN short_description text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'customer_brandings' AND column_name = 'usp_items') THEN
    ALTER TABLE customer_brandings ADD COLUMN usp_items jsonb DEFAULT '[]'::jsonb;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'customer_brandings' AND column_name = 'generation_status') THEN
    ALTER TABLE customer_brandings ADD COLUMN generation_status text DEFAULT 'pending';
    ALTER TABLE customer_brandings ADD COLUMN generation_started_at timestamptz;
    ALTER TABLE customer_brandings ADD COLUMN generation_completed_at timestamptz;
    ALTER TABLE customer_brandings ADD COLUMN generated_website_id uuid;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_customer_brandings_demo_name ON customer_brandings(demo_name);
CREATE INDEX IF NOT EXISTS idx_customer_brandings_order_id ON customer_brandings(order_id);
CREATE INDEX IF NOT EXISTS idx_customer_brandings_reference_images ON customer_brandings USING gin (reference_images);
CREATE INDEX IF NOT EXISTS idx_customer_brandings_services ON customer_brandings USING gin (services);
CREATE INDEX IF NOT EXISTS idx_customer_brandings_social_media ON customer_brandings USING gin (social_media);
CREATE INDEX IF NOT EXISTS idx_customer_brandings_opening_hours ON customer_brandings USING gin (opening_hours);
