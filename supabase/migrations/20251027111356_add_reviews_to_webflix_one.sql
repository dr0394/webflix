/*
  # Add Reviews & Enhanced Data to Webflix One

  1. Changes
    - Add `google_reviews` jsonb field for customer reviews
    - Add `header_logo_text` for custom header branding
    - Add `meta_description` for SEO
    - Add sample reviews structure

  2. Notes
    - Reviews structure: [{ name, text, rating, date, image }]
    - Allows each industry to have custom testimonials
*/

-- Add new columns to webflix_one_industries
ALTER TABLE webflix_one_industries
ADD COLUMN IF NOT EXISTS google_reviews jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS header_logo_text text DEFAULT 'Ihr Unternehmen',
ADD COLUMN IF NOT EXISTS meta_description text,
ADD COLUMN IF NOT EXISTS google_rating numeric(2,1) DEFAULT 5.0,
ADD COLUMN IF NOT EXISTS google_review_count integer DEFAULT 0;