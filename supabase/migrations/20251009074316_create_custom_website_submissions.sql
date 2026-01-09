/*
  # Create Custom Website Submissions Table

  1. New Tables
    - `custom_website_submissions`
      - `id` (uuid, primary key)
      - `company_name` (text) - Name of the company
      - `contact_person` (text) - Contact person name
      - `email` (text) - Contact email
      - `phone` (text) - Contact phone number
      - `current_website` (text) - URL of current website if exists
      - `industry` (text) - Business industry
      - `project_type` (text) - new, redesign, or relaunch
      - `estimated_pages` (text) - Number of pages needed
      - `required_features` (jsonb) - Array of required features
      - `budget_range` (text) - Budget range for the project
      - `timeline` (text) - Desired timeline
      - `project_description` (text) - Detailed project description
      - `reference_websites` (text) - Reference website URLs
      - `status` (text) - Submission status (new, contacted, quoted, won, lost)
      - `created_at` (timestamptz) - Submission timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `custom_website_submissions` table
    - Add policy for public insert (anyone can submit)
    - Add policy for authenticated admin read (view submissions)
*/

CREATE TABLE IF NOT EXISTS custom_website_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  contact_person text NOT NULL,
  email text NOT NULL,
  phone text,
  current_website text,
  industry text NOT NULL,
  project_type text NOT NULL,
  estimated_pages text NOT NULL,
  required_features jsonb DEFAULT '[]'::jsonb,
  budget_range text NOT NULL,
  timeline text NOT NULL,
  project_description text NOT NULL,
  reference_websites text,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE custom_website_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit custom website request"
  ON custom_website_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all submissions"
  ON custom_website_submissions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update submissions"
  ON custom_website_submissions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_custom_submissions_status ON custom_website_submissions(status);
CREATE INDEX IF NOT EXISTS idx_custom_submissions_created_at ON custom_website_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_custom_submissions_email ON custom_website_submissions(email);
