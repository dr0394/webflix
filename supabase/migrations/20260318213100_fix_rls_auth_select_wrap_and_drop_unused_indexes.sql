/*
  # Fix RLS auth() re-evaluation and drop unused indexes

  1. Rebuild all policies that call auth.jwt() without SELECT wrapper
  2. Drop indexes flagged as unused (no query traffic yet)
*/

-- ============================================================
-- customer_brandings
-- ============================================================
DROP POLICY IF EXISTS "auth_can_view_own_brandings" ON customer_brandings;
DROP POLICY IF EXISTS "auth_can_insert_own_brandings" ON customer_brandings;
DROP POLICY IF EXISTS "auth_can_update_own_brandings" ON customer_brandings;
DROP POLICY IF EXISTS "admin_can_delete_brandings" ON customer_brandings;

CREATE POLICY "auth_can_view_own_brandings"
  ON customer_brandings FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM webflix_orders
      WHERE webflix_orders.id = customer_brandings.order_id
        AND webflix_orders.customer_data->>'email' = (SELECT auth.jwt() ->> 'email')
    )
    OR (SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

CREATE POLICY "auth_can_insert_own_brandings"
  ON customer_brandings FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM webflix_orders
      WHERE webflix_orders.id = order_id
        AND webflix_orders.customer_data->>'email' = (SELECT auth.jwt() ->> 'email')
    )
    OR (SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

CREATE POLICY "auth_can_update_own_brandings"
  ON customer_brandings FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM webflix_orders
      WHERE webflix_orders.id = customer_brandings.order_id
        AND webflix_orders.customer_data->>'email' = (SELECT auth.jwt() ->> 'email')
    )
    OR (SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

CREATE POLICY "admin_can_delete_brandings"
  ON customer_brandings FOR DELETE TO authenticated
  USING ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- ============================================================
-- demo_components
-- ============================================================
DROP POLICY IF EXISTS "Admins can modify demo components" ON demo_components;
DROP POLICY IF EXISTS "Admins can update demo components" ON demo_components;
DROP POLICY IF EXISTS "Admins can delete demo components" ON demo_components;

CREATE POLICY "Admins can modify demo components"
  ON demo_components FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can update demo components"
  ON demo_components FOR UPDATE TO authenticated
  USING ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can delete demo components"
  ON demo_components FOR DELETE TO authenticated
  USING ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- ============================================================
-- weekly_sales_config
-- ============================================================
DROP POLICY IF EXISTS "Admins can insert sales config" ON weekly_sales_config;
DROP POLICY IF EXISTS "Admins can update sales config" ON weekly_sales_config;
DROP POLICY IF EXISTS "Admins can delete sales config" ON weekly_sales_config;

CREATE POLICY "Admins can insert sales config"
  ON weekly_sales_config FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can update sales config"
  ON weekly_sales_config FOR UPDATE TO authenticated
  USING ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can delete sales config"
  ON weekly_sales_config FOR DELETE TO authenticated
  USING ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- ============================================================
-- sales_waitlist
-- ============================================================
DROP POLICY IF EXISTS "Admins can view waitlist" ON sales_waitlist;
DROP POLICY IF EXISTS "Admins can update waitlist" ON sales_waitlist;

CREATE POLICY "Admins can view waitlist"
  ON sales_waitlist FOR SELECT TO authenticated
  USING ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can update waitlist"
  ON sales_waitlist FOR UPDATE TO authenticated
  USING ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- ============================================================
-- webflix_one_industries
-- ============================================================
DROP POLICY IF EXISTS "Only admins can insert industries" ON webflix_one_industries;
DROP POLICY IF EXISTS "Only admins can update industries" ON webflix_one_industries;
DROP POLICY IF EXISTS "Only admins can delete industries" ON webflix_one_industries;

CREATE POLICY "Only admins can insert industries"
  ON webflix_one_industries FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Only admins can update industries"
  ON webflix_one_industries FOR UPDATE TO authenticated
  USING ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Only admins can delete industries"
  ON webflix_one_industries FOR DELETE TO authenticated
  USING ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- ============================================================
-- industries
-- ============================================================
DROP POLICY IF EXISTS "Admins can insert industries" ON industries;
DROP POLICY IF EXISTS "Admins can update industries" ON industries;
DROP POLICY IF EXISTS "Admins can delete industries" ON industries;

CREATE POLICY "Admins can insert industries"
  ON industries FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can update industries"
  ON industries FOR UPDATE TO authenticated
  USING ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can delete industries"
  ON industries FOR DELETE TO authenticated
  USING ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- ============================================================
-- pages
-- ============================================================
DROP POLICY IF EXISTS "Admins can insert pages" ON pages;
DROP POLICY IF EXISTS "Admins can update pages" ON pages;
DROP POLICY IF EXISTS "Admins can delete pages" ON pages;

CREATE POLICY "Admins can insert pages"
  ON pages FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can update pages"
  ON pages FOR UPDATE TO authenticated
  USING ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can delete pages"
  ON pages FOR DELETE TO authenticated
  USING ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- ============================================================
-- sections
-- ============================================================
DROP POLICY IF EXISTS "Admins can insert sections" ON sections;
DROP POLICY IF EXISTS "Admins can update sections" ON sections;
DROP POLICY IF EXISTS "Admins can delete sections" ON sections;

CREATE POLICY "Admins can insert sections"
  ON sections FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can update sections"
  ON sections FOR UPDATE TO authenticated
  USING ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can delete sections"
  ON sections FOR DELETE TO authenticated
  USING ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- ============================================================
-- industry_requests
-- ============================================================
DROP POLICY IF EXISTS "Admins can view all industry requests" ON industry_requests;
DROP POLICY IF EXISTS "Admins can update industry requests" ON industry_requests;

CREATE POLICY "Admins can view all industry requests"
  ON industry_requests FOR SELECT TO authenticated
  USING ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can update industry requests"
  ON industry_requests FOR UPDATE TO authenticated
  USING ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- ============================================================
-- demo_code_library
-- ============================================================
DROP POLICY IF EXISTS "Admins can insert demo code" ON demo_code_library;
DROP POLICY IF EXISTS "Admins can update demo code" ON demo_code_library;
DROP POLICY IF EXISTS "Admins can delete demo code" ON demo_code_library;

CREATE POLICY "Admins can insert demo code"
  ON demo_code_library FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can update demo code"
  ON demo_code_library FOR UPDATE TO authenticated
  USING ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can delete demo code"
  ON demo_code_library FOR DELETE TO authenticated
  USING ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- ============================================================
-- email_campaigns
-- ============================================================
DROP POLICY IF EXISTS "Admins can select campaigns" ON email_campaigns;
DROP POLICY IF EXISTS "Admins can insert campaigns" ON email_campaigns;
DROP POLICY IF EXISTS "Admins can update campaigns" ON email_campaigns;
DROP POLICY IF EXISTS "Admins can delete campaigns" ON email_campaigns;

CREATE POLICY "Admins can select campaigns"
  ON email_campaigns FOR SELECT TO authenticated
  USING ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can insert campaigns"
  ON email_campaigns FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can update campaigns"
  ON email_campaigns FOR UPDATE TO authenticated
  USING ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can delete campaigns"
  ON email_campaigns FOR DELETE TO authenticated
  USING ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- ============================================================
-- email_leads
-- ============================================================
DROP POLICY IF EXISTS "Admins can select leads" ON email_leads;
DROP POLICY IF EXISTS "Admins can insert leads" ON email_leads;
DROP POLICY IF EXISTS "Admins can update leads" ON email_leads;
DROP POLICY IF EXISTS "Admins can delete leads" ON email_leads;

CREATE POLICY "Admins can select leads"
  ON email_leads FOR SELECT TO authenticated
  USING ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can insert leads"
  ON email_leads FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can update leads"
  ON email_leads FOR UPDATE TO authenticated
  USING ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can delete leads"
  ON email_leads FOR DELETE TO authenticated
  USING ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- ============================================================
-- email_campaign_sends
-- ============================================================
DROP POLICY IF EXISTS "Admins can select campaign sends" ON email_campaign_sends;
DROP POLICY IF EXISTS "Admins can insert campaign sends" ON email_campaign_sends;
DROP POLICY IF EXISTS "Admins can update campaign sends" ON email_campaign_sends;
DROP POLICY IF EXISTS "Admins can delete campaign sends" ON email_campaign_sends;

CREATE POLICY "Admins can select campaign sends"
  ON email_campaign_sends FOR SELECT TO authenticated
  USING ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can insert campaign sends"
  ON email_campaign_sends FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can update campaign sends"
  ON email_campaign_sends FOR UPDATE TO authenticated
  USING ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can delete campaign sends"
  ON email_campaign_sends FOR DELETE TO authenticated
  USING ((SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- ============================================================
-- Drop unused indexes
-- ============================================================
DROP INDEX IF EXISTS idx_customer_brandings_demo_name;
DROP INDEX IF EXISTS idx_email_campaign_sends_lead_id;
DROP INDEX IF EXISTS idx_email_campaigns_created_by;
DROP INDEX IF EXISTS idx_demo_components_template;
DROP INDEX IF EXISTS idx_demo_components_type;
DROP INDEX IF EXISTS idx_weekly_sales_config_week_start;
DROP INDEX IF EXISTS idx_sales_waitlist_notified;
DROP INDEX IF EXISTS idx_sales_waitlist_email;
DROP INDEX IF EXISTS idx_industries_slug;
DROP INDEX IF EXISTS idx_industries_active;
DROP INDEX IF EXISTS idx_pages_industry;
DROP INDEX IF EXISTS idx_sections_page;
DROP INDEX IF EXISTS idx_sections_order;
DROP INDEX IF EXISTS idx_industry_requests_email;
DROP INDEX IF EXISTS idx_industry_requests_status;
DROP INDEX IF EXISTS idx_industry_requests_created_at;
DROP INDEX IF EXISTS idx_demo_code_library_demo_name;
DROP INDEX IF EXISTS idx_demo_code_library_file_type;
DROP INDEX IF EXISTS idx_email_leads_email;
DROP INDEX IF EXISTS idx_email_leads_industry;
DROP INDEX IF EXISTS idx_email_leads_status;
DROP INDEX IF EXISTS idx_email_campaigns_status;
DROP INDEX IF EXISTS idx_email_campaign_sends_campaign_id;
DROP INDEX IF EXISTS idx_email_campaign_sends_status;
