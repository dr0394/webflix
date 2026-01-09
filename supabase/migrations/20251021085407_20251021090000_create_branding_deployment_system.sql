-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Customer Brandings Table
CREATE TABLE IF NOT EXISTS customer_brandings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES webflix_orders(id) ON DELETE CASCADE,
  company_name text,
  logo_url text,
  primary_color text DEFAULT '#1E40AF',
  secondary_color text DEFAULT '#64748B',
  accent_color text DEFAULT '#F59E0B',
  hero_title text,
  hero_subtitle text,
  cta_text text DEFAULT 'Jetzt Anfragen',
  about_text text,
  contact_email text,
  contact_phone text,
  contact_address text,
  domain_preference text,
  industry_specific_data jsonb DEFAULT '{}',
  status text DEFAULT 'onboarding_pending' CHECK (status IN (
    'onboarding_pending',
    'content_submitted',
    'auto_generated',
    'customer_editing',
    'ready_for_review',
    'approved',
    'deployed'
  )),
  onboarding_token text UNIQUE,
  preview_url text,
  live_url text,
  completed_at timestamptz,
  approved_at timestamptz,
  deployed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Branding Images Table
CREATE TABLE IF NOT EXISTS branding_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  branding_id uuid REFERENCES customer_brandings(id) ON DELETE CASCADE,
  image_type text NOT NULL CHECK (image_type IN (
    'logo',
    'hero',
    'gallery',
    'team',
    'service',
    'testimonial',
    'other'
  )),
  image_url text NOT NULL,
  alt_text text,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Content Edits Table (Audit Trail)
CREATE TABLE IF NOT EXISTS content_edits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  branding_id uuid REFERENCES customer_brandings(id) ON DELETE CASCADE,
  element_id text NOT NULL,
  old_value text,
  new_value text NOT NULL,
  edit_type text NOT NULL CHECK (edit_type IN ('text', 'color', 'image')),
  created_at timestamptz DEFAULT now()
);

-- Deployment Logs Table
CREATE TABLE IF NOT EXISTS deployment_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  branding_id uuid REFERENCES customer_brandings(id) ON DELETE CASCADE,
  action text NOT NULL CHECK (action IN (
    'branding_initiated',
    'onboarding_completed',
    'auto_generated',
    'preview_created',
    'customer_edited',
    'submitted_for_review',
    'approved',
    'deployed',
    'domain_connected',
    'failed'
  )),
  status text NOT NULL DEFAULT 'success' CHECK (status IN ('success', 'failed', 'pending')),
  details jsonb DEFAULT '{}',
  error_message text,
  performed_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

-- Onboarding Templates Table
CREATE TABLE IF NOT EXISTS onboarding_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  industry text UNIQUE NOT NULL,
  required_fields jsonb DEFAULT '[]',
  optional_fields jsonb DEFAULT '[]',
  custom_questions jsonb DEFAULT '[]',
  image_requirements jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE customer_brandings ENABLE ROW LEVEL SECURITY;
ALTER TABLE branding_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_edits ENABLE ROW LEVEL SECURITY;
ALTER TABLE deployment_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE onboarding_templates ENABLE ROW LEVEL SECURITY;

-- RLS Policies for customer_brandings
CREATE POLICY "Customers can view own branding via email"
  ON customer_brandings
  FOR SELECT
  TO authenticated
  USING (
    contact_email = (SELECT email FROM auth.users WHERE id = auth.uid())
  );

CREATE POLICY "Anonymous can view via valid token"
  ON customer_brandings
  FOR SELECT
  TO anon
  USING (onboarding_token IS NOT NULL);

CREATE POLICY "Customers can update own branding"
  ON customer_brandings
  FOR UPDATE
  TO authenticated
  USING (
    contact_email = (SELECT email FROM auth.users WHERE id = auth.uid())
  );

CREATE POLICY "Admins have full access to brandings"
  ON customer_brandings
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_app_meta_data->>'role' = 'admin'
    )
  );

-- RLS Policies for branding_images
CREATE POLICY "Users can view images for their branding"
  ON branding_images
  FOR SELECT
  TO authenticated
  USING (
    branding_id IN (
      SELECT id FROM customer_brandings
      WHERE contact_email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

CREATE POLICY "Users can insert images for their branding"
  ON branding_images
  FOR INSERT
  TO authenticated
  WITH CHECK (
    branding_id IN (
      SELECT id FROM customer_brandings
      WHERE contact_email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

CREATE POLICY "Admins have full access to images"
  ON branding_images
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_app_meta_data->>'role' = 'admin'
    )
  );

-- RLS Policies for content_edits
CREATE POLICY "Users can view their own edits"
  ON content_edits
  FOR SELECT
  TO authenticated
  USING (
    branding_id IN (
      SELECT id FROM customer_brandings
      WHERE contact_email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

CREATE POLICY "Users can insert their own edits"
  ON content_edits
  FOR INSERT
  TO authenticated
  WITH CHECK (
    branding_id IN (
      SELECT id FROM customer_brandings
      WHERE contact_email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

CREATE POLICY "Admins can view all edits"
  ON content_edits
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_app_meta_data->>'role' = 'admin'
    )
  );

-- RLS Policies for deployment_logs
CREATE POLICY "Users can view logs for their branding"
  ON deployment_logs
  FOR SELECT
  TO authenticated
  USING (
    branding_id IN (
      SELECT id FROM customer_brandings
      WHERE contact_email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

CREATE POLICY "System can insert logs"
  ON deployment_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admins have full access to logs"
  ON deployment_logs
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_app_meta_data->>'role' = 'admin'
    )
  );

-- RLS Policies for onboarding_templates
CREATE POLICY "Anyone can view onboarding templates"
  ON onboarding_templates
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage templates"
  ON onboarding_templates
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_app_meta_data->>'role' = 'admin'
    )
  );

-- Function: Generate secure onboarding token
CREATE OR REPLACE FUNCTION generate_onboarding_token()
RETURNS text
LANGUAGE plpgsql
AS $$
DECLARE
  token text;
BEGIN
  token := encode(gen_random_bytes(32), 'hex');
  RETURN token;
END;
$$;

-- Function: Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Trigger: Update updated_at on customer_brandings
CREATE TRIGGER update_customer_brandings_updated_at
  BEFORE UPDATE ON customer_brandings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger: Create branding record when order is created
CREATE OR REPLACE FUNCTION create_branding_on_order()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  token text;
BEGIN
  token := generate_onboarding_token();

  INSERT INTO customer_brandings (
    order_id,
    onboarding_token,
    status
  ) VALUES (
    NEW.id,
    token,
    'onboarding_pending'
  );

  INSERT INTO deployment_logs (
    branding_id,
    action,
    status,
    details
  ) VALUES (
    (SELECT id FROM customer_brandings WHERE order_id = NEW.id),
    'branding_initiated',
    'success',
    jsonb_build_object('order_id', NEW.id)
  );

  RETURN NEW;
END;
$$;

CREATE TRIGGER create_branding_on_order_trigger
  AFTER INSERT ON webflix_orders
  FOR EACH ROW
  EXECUTE FUNCTION create_branding_on_order();

-- Trigger: Log status changes
CREATE OR REPLACE FUNCTION log_branding_status_change()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    INSERT INTO deployment_logs (
      branding_id,
      action,
      status,
      details
    ) VALUES (
      NEW.id,
      CASE NEW.status
        WHEN 'content_submitted' THEN 'onboarding_completed'
        WHEN 'auto_generated' THEN 'auto_generated'
        WHEN 'customer_editing' THEN 'preview_created'
        WHEN 'ready_for_review' THEN 'submitted_for_review'
        WHEN 'approved' THEN 'approved'
        WHEN 'deployed' THEN 'deployed'
        ELSE 'status_changed'
      END,
      'success',
      jsonb_build_object(
        'old_status', OLD.status,
        'new_status', NEW.status
      )
    );
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER log_branding_status_change_trigger
  AFTER UPDATE ON customer_brandings
  FOR EACH ROW
  EXECUTE FUNCTION log_branding_status_change();

-- Insert default onboarding templates
INSERT INTO onboarding_templates (industry, required_fields, optional_fields, custom_questions, image_requirements) VALUES
('autoaufbereitung',
  '["company_name", "contact_email", "contact_phone", "hero_title"]',
  '["hero_subtitle", "about_text", "domain_preference"]',
  '[{"id": "service_area", "question": "In welchem Umkreis bieten Sie Ihre Dienstleistungen an?", "type": "text"}, {"id": "mobile_service", "question": "Bieten Sie mobilen Service an?", "type": "boolean"}]',
  '{"logo": {"required": true, "count": 1}, "hero": {"required": true, "count": 1}, "gallery": {"required": false, "count": 6}}'
),
('gastronomie',
  '["company_name", "contact_email", "contact_phone", "hero_title"]',
  '["hero_subtitle", "about_text", "domain_preference"]',
  '[{"id": "cuisine_type", "question": "Welche Art von Küche bieten Sie an?", "type": "text"}, {"id": "opening_hours", "question": "Ihre Öffnungszeiten", "type": "text"}]',
  '{"logo": {"required": true, "count": 1}, "hero": {"required": true, "count": 1}, "gallery": {"required": true, "count": 8}}'
),
('handwerk',
  '["company_name", "contact_email", "contact_phone", "hero_title"]',
  '["hero_subtitle", "about_text", "domain_preference"]',
  '[{"id": "trade_type", "question": "Welches Handwerk üben Sie aus?", "type": "text"}, {"id": "certifications", "question": "Besondere Zertifizierungen oder Qualifikationen?", "type": "text"}]',
  '{"logo": {"required": true, "count": 1}, "hero": {"required": true, "count": 1}, "gallery": {"required": false, "count": 6}}'
);

-- Create Storage Buckets (if not exists)
INSERT INTO storage.buckets (id, name, public)
VALUES
  ('customer-logos', 'customer-logos', true),
  ('customer-images', 'customer-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies
CREATE POLICY "Authenticated users can upload logos"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'customer-logos');

CREATE POLICY "Public can view logos"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'customer-logos');

CREATE POLICY "Authenticated users can upload images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'customer-images');

CREATE POLICY "Public can view images"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'customer-images');

CREATE POLICY "Users can update their own uploads"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id IN ('customer-logos', 'customer-images'));

CREATE POLICY "Users can delete their own uploads"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id IN ('customer-logos', 'customer-images'));