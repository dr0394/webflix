/*
  # Fix RLS policies: wrap auth.jwt() in SELECT + consolidate multiple permissive policies

  1. customer_subscriptions - wrap auth.uid() in SELECT
  2. customer_brandings - drop old duplicate policies, rebuild with SELECT + consolidated
  3. demo_components - consolidate SELECT policies
  4. weekly_sales_config - consolidate + wrap
  5. sales_waitlist - wrap auth.jwt()
  6. webflix_one_industries - wrap auth.jwt()
  7. industries / pages / sections - wrap auth.jwt()
  8. industry_requests - wrap auth.jwt()
  9. demo_code_library - wrap auth.jwt()
  10. email_campaigns / email_leads / email_campaign_sends - wrap auth.jwt()
*/

-- ============================================================
-- customer_subscriptions
-- ============================================================
DROP POLICY IF EXISTS "Customers can view own subscriptions" ON customer_subscriptions;
CREATE POLICY "Customers can view own subscriptions"
  ON customer_subscriptions FOR SELECT TO authenticated
  USING (customer_id = (SELECT auth.uid()));

-- ============================================================
-- customer_brandings: drop ALL existing, rebuild consolidated
-- ============================================================
DROP POLICY IF EXISTS "anon_can_view_with_token" ON customer_brandings;
DROP POLICY IF EXISTS "auth_can_view_own_brandings" ON customer_brandings;
DROP POLICY IF EXISTS "auth_can_insert_own_brandings" ON customer_brandings;
DROP POLICY IF EXISTS "auth_can_update_own_brandings" ON customer_brandings;
DROP POLICY IF EXISTS "admin_can_delete_brandings" ON customer_brandings;
DROP POLICY IF EXISTS "Admins can delete brandings" ON customer_brandings;
DROP POLICY IF EXISTS "Admins can insert brandings" ON customer_brandings;
DROP POLICY IF EXISTS "Admins or owners can view brandings" ON customer_brandings;
DROP POLICY IF EXISTS "Admins or owners can update brandings" ON customer_brandings;
DROP POLICY IF EXISTS "Admins have full access to brandings" ON customer_brandings;
DROP POLICY IF EXISTS "Anonymous can view via valid token" ON customer_brandings;
DROP POLICY IF EXISTS "Authenticated users can insert brandings" ON customer_brandings;
DROP POLICY IF EXISTS "Customers can view own branding via email" ON customer_brandings;
DROP POLICY IF EXISTS "Customers can update own branding" ON customer_brandings;
DROP POLICY IF EXISTS "Service role can insert brandings" ON customer_brandings;

CREATE POLICY "anon_can_view_with_token"
  ON customer_brandings FOR SELECT TO anon
  USING (onboarding_token IS NOT NULL);

CREATE POLICY "auth_can_view_own_brandings"
  ON customer_brandings FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM webflix_orders
      WHERE webflix_orders.id = customer_brandings.order_id
        AND webflix_orders.customer_data->>'email' = (SELECT auth.jwt()->>'email')
    )
    OR (SELECT auth.jwt()->'app_metadata'->>'role') = 'admin'
  );

CREATE POLICY "auth_can_insert_own_brandings"
  ON customer_brandings FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM webflix_orders
      WHERE webflix_orders.id = order_id
        AND webflix_orders.customer_data->>'email' = (SELECT auth.jwt()->>'email')
    )
    OR (SELECT auth.jwt()->'app_metadata'->>'role') = 'admin'
  );

CREATE POLICY "auth_can_update_own_brandings"
  ON customer_brandings FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM webflix_orders
      WHERE webflix_orders.id = customer_brandings.order_id
        AND webflix_orders.customer_data->>'email' = (SELECT auth.jwt()->>'email')
    )
    OR (SELECT auth.jwt()->'app_metadata'->>'role') = 'admin'
  );

CREATE POLICY "admin_can_delete_brandings"
  ON customer_brandings FOR DELETE TO authenticated
  USING ((SELECT auth.jwt()->'app_metadata'->>'role') = 'admin');

-- ============================================================
-- demo_components: consolidate SELECT (public + admin write)
-- ============================================================
DROP POLICY IF EXISTS "Anyone can view demo components" ON demo_components;
DROP POLICY IF EXISTS "Only admins can modify demo components" ON demo_components;

CREATE POLICY "Public can view demo components"
  ON demo_components FOR SELECT TO public USING (true);

CREATE POLICY "Admins can modify demo components"
  ON demo_components FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.jwt()->'app_metadata'->>'role') = 'admin');

CREATE POLICY "Admins can update demo components"
  ON demo_components FOR UPDATE TO authenticated
  USING ((SELECT auth.jwt()->'app_metadata'->>'role') = 'admin');

CREATE POLICY "Admins can delete demo components"
  ON demo_components FOR DELETE TO authenticated
  USING ((SELECT auth.jwt()->'app_metadata'->>'role') = 'admin');

-- ============================================================
-- weekly_sales_config: consolidate SELECT, wrap auth
-- ============================================================
DROP POLICY IF EXISTS "Anyone can view current week sales config" ON weekly_sales_config;
DROP POLICY IF EXISTS "Admins can manage sales config" ON weekly_sales_config;

CREATE POLICY "Public can view sales config"
  ON weekly_sales_config FOR SELECT TO public USING (true);

CREATE POLICY "Admins can insert sales config"
  ON weekly_sales_config FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.jwt()->'app_metadata'->>'role') = 'admin');

CREATE POLICY "Admins can update sales config"
  ON weekly_sales_config FOR UPDATE TO authenticated
  USING ((SELECT auth.jwt()->'app_metadata'->>'role') = 'admin')
  WITH CHECK ((SELECT auth.jwt()->'app_metadata'->>'role') = 'admin');

CREATE POLICY "Admins can delete sales config"
  ON weekly_sales_config FOR DELETE TO authenticated
  USING ((SELECT auth.jwt()->'app_metadata'->>'role') = 'admin');

-- ============================================================
-- sales_waitlist: wrap auth.jwt()
-- ============================================================
DROP POLICY IF EXISTS "Admins can view waitlist" ON sales_waitlist;
DROP POLICY IF EXISTS "Admins can update waitlist" ON sales_waitlist;

CREATE POLICY "Admins can view waitlist"
  ON sales_waitlist FOR SELECT TO authenticated
  USING ((SELECT auth.jwt()->'app_metadata'->>'role') = 'admin');

CREATE POLICY "Admins can update waitlist"
  ON sales_waitlist FOR UPDATE TO authenticated
  USING ((SELECT auth.jwt()->'app_metadata'->>'role') = 'admin')
  WITH CHECK ((SELECT auth.jwt()->'app_metadata'->>'role') = 'admin');

-- ============================================================
-- webflix_one_industries: wrap auth.jwt()
-- ============================================================
DROP POLICY IF EXISTS "Only admins can insert industries" ON webflix_one_industries;
DROP POLICY IF EXISTS "Only admins can update industries" ON webflix_one_industries;
DROP POLICY IF EXISTS "Only admins can delete industries" ON webflix_one_industries;

CREATE POLICY "Only admins can insert industries"
  ON webflix_one_industries FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.jwt()->'app_metadata'->>'role') = 'admin');

CREATE POLICY "Only admins can update industries"
  ON webflix_one_industries FOR UPDATE TO authenticated
  USING ((SELECT auth.jwt()->'app_metadata'->>'role') = 'admin')
  WITH CHECK ((SELECT auth.jwt()->'app_metadata'->>'role') = 'admin');

CREATE POLICY "Only admins can delete industries"
  ON webflix_one_industries FOR DELETE TO authenticated
  USING ((SELECT auth.jwt()->'app_metadata'->>'role') = 'admin');

-- ============================================================
-- industries: consolidate SELECT, wrap auth.jwt()
-- ============================================================
DROP POLICY IF EXISTS "Industries are publicly readable" ON industries;
DROP POLICY IF EXISTS "Admins can manage industries" ON industries;

CREATE POLICY "Industries are publicly readable"
  ON industries FOR SELECT TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Admins can insert industries"
  ON industries FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.jwt()->'app_metadata'->>'role') = 'admin');

CREATE POLICY "Admins can update industries"
  ON industries FOR UPDATE TO authenticated
  USING ((SELECT auth.jwt()->'app_metadata'->>'role') = 'admin')
  WITH CHECK ((SELECT auth.jwt()->'app_metadata'->>'role') = 'admin');

CREATE POLICY "Admins can delete industries"
  ON industries FOR DELETE TO authenticated
  USING ((SELECT auth.jwt()->'app_metadata'->>'role') = 'admin');

-- ============================================================
-- pages: consolidate SELECT, wrap auth.jwt()
-- ============================================================
DROP POLICY IF EXISTS "Pages are publicly readable for active industries" ON pages;
DROP POLICY IF EXISTS "Admins can manage pages" ON pages;

CREATE POLICY "Pages are publicly readable for active industries"
  ON pages FOR SELECT TO anon, authenticated
  USING (EXISTS (
    SELECT 1 FROM industries
    WHERE industries.id = pages.industry_id AND industries.is_active = true
  ));

CREATE POLICY "Admins can insert pages"
  ON pages FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.jwt()->'app_metadata'->>'role') = 'admin');

CREATE POLICY "Admins can update pages"
  ON pages FOR UPDATE TO authenticated
  USING ((SELECT auth.jwt()->'app_metadata'->>'role') = 'admin')
  WITH CHECK ((SELECT auth.jwt()->'app_metadata'->>'role') = 'admin');

CREATE POLICY "Admins can delete pages"
  ON pages FOR DELETE TO authenticated
  USING ((SELECT auth.jwt()->'app_metadata'->>'role') = 'admin');

-- ============================================================
-- sections: consolidate SELECT, wrap auth.jwt()
-- ============================================================
DROP POLICY IF EXISTS "Sections are publicly readable for active industries" ON sections;
DROP POLICY IF EXISTS "Admins can manage sections" ON sections;

CREATE POLICY "Sections are publicly readable for active industries"
  ON sections FOR SELECT TO anon, authenticated
  USING (EXISTS (
    SELECT 1 FROM pages
    JOIN industries ON industries.id = pages.industry_id
    WHERE pages.id = sections.page_id AND industries.is_active = true
  ));

CREATE POLICY "Admins can insert sections"
  ON sections FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.jwt()->'app_metadata'->>'role') = 'admin');

CREATE POLICY "Admins can update sections"
  ON sections FOR UPDATE TO authenticated
  USING ((SELECT auth.jwt()->'app_metadata'->>'role') = 'admin')
  WITH CHECK ((SELECT auth.jwt()->'app_metadata'->>'role') = 'admin');

CREATE POLICY "Admins can delete sections"
  ON sections FOR DELETE TO authenticated
  USING ((SELECT auth.jwt()->'app_metadata'->>'role') = 'admin');

-- ============================================================
-- industry_requests: wrap auth.jwt()
-- ============================================================
DROP POLICY IF EXISTS "Admins can view all industry requests" ON industry_requests;
DROP POLICY IF EXISTS "Admins can update industry requests" ON industry_requests;

CREATE POLICY "Admins can view all industry requests"
  ON industry_requests FOR SELECT TO authenticated
  USING ((SELECT auth.jwt()->'app_metadata'->>'role') = 'admin');

CREATE POLICY "Admins can update industry requests"
  ON industry_requests FOR UPDATE TO authenticated
  USING ((SELECT auth.jwt()->'app_metadata'->>'role') = 'admin')
  WITH CHECK ((SELECT auth.jwt()->'app_metadata'->>'role') = 'admin');

-- ============================================================
-- demo_code_library: wrap auth.jwt()
-- ============================================================
DROP POLICY IF EXISTS "Admins can insert demo code" ON demo_code_library;
DROP POLICY IF EXISTS "Admins can update demo code" ON demo_code_library;
DROP POLICY IF EXISTS "Admins can delete demo code" ON demo_code_library;

CREATE POLICY "Admins can insert demo code"
  ON demo_code_library FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.jwt()->'app_metadata'->>'role') = 'admin');

CREATE POLICY "Admins can update demo code"
  ON demo_code_library FOR UPDATE TO authenticated
  USING ((SELECT auth.jwt()->'app_metadata'->>'role') = 'admin')
  WITH CHECK ((SELECT auth.jwt()->'app_metadata'->>'role') = 'admin');

CREATE POLICY "Admins can delete demo code"
  ON demo_code_library FOR DELETE TO authenticated
  USING ((SELECT auth.jwt()->'app_metadata'->>'role') = 'admin');

-- ============================================================
-- email_campaigns: wrap auth.jwt()
-- ============================================================
DROP POLICY IF EXISTS "Admins can manage campaigns" ON email_campaigns;

CREATE POLICY "Admins can select campaigns"
  ON email_campaigns FOR SELECT TO authenticated
  USING ((SELECT auth.jwt()->'app_metadata'->>'role') = 'admin');

CREATE POLICY "Admins can insert campaigns"
  ON email_campaigns FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.jwt()->'app_metadata'->>'role') = 'admin');

CREATE POLICY "Admins can update campaigns"
  ON email_campaigns FOR UPDATE TO authenticated
  USING ((SELECT auth.jwt()->'app_metadata'->>'role') = 'admin');

CREATE POLICY "Admins can delete campaigns"
  ON email_campaigns FOR DELETE TO authenticated
  USING ((SELECT auth.jwt()->'app_metadata'->>'role') = 'admin');

-- ============================================================
-- email_leads: wrap auth.jwt()
-- ============================================================
DROP POLICY IF EXISTS "Admins can manage leads" ON email_leads;

CREATE POLICY "Admins can select leads"
  ON email_leads FOR SELECT TO authenticated
  USING ((SELECT auth.jwt()->'app_metadata'->>'role') = 'admin');

CREATE POLICY "Admins can insert leads"
  ON email_leads FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.jwt()->'app_metadata'->>'role') = 'admin');

CREATE POLICY "Admins can update leads"
  ON email_leads FOR UPDATE TO authenticated
  USING ((SELECT auth.jwt()->'app_metadata'->>'role') = 'admin');

CREATE POLICY "Admins can delete leads"
  ON email_leads FOR DELETE TO authenticated
  USING ((SELECT auth.jwt()->'app_metadata'->>'role') = 'admin');

-- ============================================================
-- email_campaign_sends: wrap auth.jwt()
-- ============================================================
DROP POLICY IF EXISTS "Admins can view campaign sends" ON email_campaign_sends;

CREATE POLICY "Admins can select campaign sends"
  ON email_campaign_sends FOR SELECT TO authenticated
  USING ((SELECT auth.jwt()->'app_metadata'->>'role') = 'admin');

CREATE POLICY "Admins can insert campaign sends"
  ON email_campaign_sends FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.jwt()->'app_metadata'->>'role') = 'admin');

CREATE POLICY "Admins can update campaign sends"
  ON email_campaign_sends FOR UPDATE TO authenticated
  USING ((SELECT auth.jwt()->'app_metadata'->>'role') = 'admin');

CREATE POLICY "Admins can delete campaign sends"
  ON email_campaign_sends FOR DELETE TO authenticated
  USING ((SELECT auth.jwt()->'app_metadata'->>'role') = 'admin');
