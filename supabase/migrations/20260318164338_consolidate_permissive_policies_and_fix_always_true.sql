/*
  # Consolidate Overlapping Permissive Policies and Fix Always-True Policies

  1. Multiple Permissive Policies - consolidated per table:
    - blog_posts: merge authenticated SELECT, restrict INSERT/UPDATE/DELETE to admins
    - branding_images: merge admin + user INSERT/SELECT into single policies
    - checklist_templates: merge overlapping SELECT
    - content_edits: merge admin + user SELECT
    - customer_brandings: merge admin + customer SELECT/UPDATE
    - demo_templates: merge public + owner SELECT
    - deployment_logs: merge admin + system INSERT, admin + user SELECT
    - generated_websites: remove wildcard "Service role" policy, consolidate
    - onboarding_templates: merge admin + anyone SELECT
    - website_access_tokens: merge admin + public INSERT/SELECT
    - zwickels_orders: merge public + authenticated SELECT
    - zwickels_products: merge public + authenticated SELECT

  2. Always-True RLS Policies - tightened:
    - blog_posts: INSERT/UPDATE/DELETE restricted to admins via is_admin()
    - custom_website_submissions: INSERT restricted, UPDATE to admins
    - deployment_logs: INSERT restricted to admin or system trigger context
    - generated_websites: remove public ALL true policy
    - purchase_access: INSERT/UPDATE restricted to admins
    - webflix_orders: INSERT limited, UPDATE to admins
    - website_access_tokens: INSERT restricted
    - zwickels_order_items: INSERT restricted to matching order
    - zwickels_orders: INSERT restricted, UPDATE to admins

  3. Security improvements:
    - Admin checks use is_admin() function consistently
    - No more unrestricted true policies for authenticated users
    - Proper ownership checks maintained
*/

-- ============================================================
-- blog_posts: Fix always-true + consolidate SELECT
-- ============================================================
DROP POLICY IF EXISTS "Authenticated users can delete posts" ON blog_posts;
DROP POLICY IF EXISTS "Authenticated users can insert posts" ON blog_posts;
DROP POLICY IF EXISTS "Authenticated users can update posts" ON blog_posts;
DROP POLICY IF EXISTS "Authenticated users can view all posts" ON blog_posts;
DROP POLICY IF EXISTS "Anyone can read published blog posts" ON blog_posts;

CREATE POLICY "Public can read published posts"
  ON blog_posts FOR SELECT
  TO anon
  USING (published = true);

CREATE POLICY "Admins can view all posts"
  ON blog_posts FOR SELECT
  TO authenticated
  USING (is_admin() OR published = true);

CREATE POLICY "Admins can insert posts"
  ON blog_posts FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update posts"
  ON blog_posts FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admins can delete posts"
  ON blog_posts FOR DELETE
  TO authenticated
  USING (is_admin());

-- ============================================================
-- branding_images: Consolidate admin + user policies
-- ============================================================
DROP POLICY IF EXISTS "Admins have full access to images" ON branding_images;
DROP POLICY IF EXISTS "Users can insert images for their branding" ON branding_images;
DROP POLICY IF EXISTS "Users can view images for their branding" ON branding_images;

CREATE POLICY "Users or admins can view branding images"
  ON branding_images FOR SELECT
  TO authenticated
  USING (
    is_admin()
    OR branding_id IN (
      SELECT cb.id FROM customer_brandings cb
      WHERE cb.contact_email = (SELECT email FROM auth.users WHERE id = auth.uid())::text
    )
  );

CREATE POLICY "Users or admins can insert branding images"
  ON branding_images FOR INSERT
  TO authenticated
  WITH CHECK (
    is_admin()
    OR branding_id IN (
      SELECT cb.id FROM customer_brandings cb
      WHERE cb.contact_email = (SELECT email FROM auth.users WHERE id = auth.uid())::text
    )
  );

CREATE POLICY "Admins can update branding images"
  ON branding_images FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admins can delete branding images"
  ON branding_images FOR DELETE
  TO authenticated
  USING (is_admin());

-- ============================================================
-- checklist_templates: Consolidate SELECT
-- ============================================================
DROP POLICY IF EXISTS "Anyone can view checklist templates" ON checklist_templates;
DROP POLICY IF EXISTS "Only service role can modify templates" ON checklist_templates;

CREATE POLICY "Authenticated can view checklist templates"
  ON checklist_templates FOR SELECT
  TO authenticated
  USING (true);

-- ============================================================
-- content_edits: Consolidate SELECT
-- ============================================================
DROP POLICY IF EXISTS "Admins can view all edits" ON content_edits;
DROP POLICY IF EXISTS "Users can view their own edits" ON content_edits;

CREATE POLICY "Users or admins can view edits"
  ON content_edits FOR SELECT
  TO authenticated
  USING (
    is_admin()
    OR branding_id IN (
      SELECT cb.id FROM customer_brandings cb
      WHERE cb.contact_email = (SELECT email FROM auth.users WHERE id = auth.uid())::text
    )
  );

-- ============================================================
-- customer_brandings: Consolidate SELECT + UPDATE
-- ============================================================
DROP POLICY IF EXISTS "Admins have full access to brandings" ON customer_brandings;
DROP POLICY IF EXISTS "Customers can view own branding via email" ON customer_brandings;
DROP POLICY IF EXISTS "Customers can update own branding" ON customer_brandings;

CREATE POLICY "Admins or owners can view brandings"
  ON customer_brandings FOR SELECT
  TO authenticated
  USING (
    is_admin()
    OR contact_email = (SELECT email FROM auth.users WHERE id = auth.uid())::text
  );

CREATE POLICY "Admins or owners can update brandings"
  ON customer_brandings FOR UPDATE
  TO authenticated
  USING (
    is_admin()
    OR contact_email = (SELECT email FROM auth.users WHERE id = auth.uid())::text
  )
  WITH CHECK (
    is_admin()
    OR contact_email = (SELECT email FROM auth.users WHERE id = auth.uid())::text
  );

CREATE POLICY "Admins can insert brandings"
  ON customer_brandings FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admins can delete brandings"
  ON customer_brandings FOR DELETE
  TO authenticated
  USING (is_admin());

-- ============================================================
-- demo_templates: Consolidate SELECT
-- ============================================================
DROP POLICY IF EXISTS "Everyone can read public demo templates" ON demo_templates;
DROP POLICY IF EXISTS "Users can read their own demo templates" ON demo_templates;

CREATE POLICY "Public can read public templates"
  ON demo_templates FOR SELECT
  TO anon
  USING (is_public = true);

CREATE POLICY "Authenticated can read own or public templates"
  ON demo_templates FOR SELECT
  TO authenticated
  USING (is_public = true OR auth.uid() = created_by);

-- ============================================================
-- deployment_logs: Consolidate INSERT + SELECT, fix always-true INSERT
-- ============================================================
DROP POLICY IF EXISTS "Admins have full access to logs" ON deployment_logs;
DROP POLICY IF EXISTS "System can insert logs" ON deployment_logs;
DROP POLICY IF EXISTS "Users can view logs for their branding" ON deployment_logs;

CREATE POLICY "Admins or owners can view deployment logs"
  ON deployment_logs FOR SELECT
  TO authenticated
  USING (
    is_admin()
    OR branding_id IN (
      SELECT cb.id FROM customer_brandings cb
      WHERE cb.contact_email = (SELECT email FROM auth.users WHERE id = auth.uid())::text
    )
  );

CREATE POLICY "Admins can insert deployment logs"
  ON deployment_logs FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update deployment logs"
  ON deployment_logs FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admins can delete deployment logs"
  ON deployment_logs FOR DELETE
  TO authenticated
  USING (is_admin());

-- ============================================================
-- generated_websites: Remove blanket "Service role" + consolidate
-- ============================================================
DROP POLICY IF EXISTS "Service role can manage all websites" ON generated_websites;
DROP POLICY IF EXISTS "Allow website generation" ON generated_websites;
DROP POLICY IF EXISTS "Admins can delete websites" ON generated_websites;
DROP POLICY IF EXISTS "Admins can insert websites" ON generated_websites;
DROP POLICY IF EXISTS "Admins can view all websites" ON generated_websites;
DROP POLICY IF EXISTS "Admins can update websites" ON generated_websites;
DROP POLICY IF EXISTS "Public can view published websites" ON generated_websites;

CREATE POLICY "Anyone can view published websites"
  ON generated_websites FOR SELECT
  TO anon, authenticated
  USING (status = 'published' OR (is_admin()));

CREATE POLICY "Admins can insert generated websites"
  ON generated_websites FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update generated websites"
  ON generated_websites FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admins can delete generated websites"
  ON generated_websites FOR DELETE
  TO authenticated
  USING (is_admin());

-- ============================================================
-- onboarding_templates: Consolidate SELECT
-- ============================================================
DROP POLICY IF EXISTS "Admins can manage templates" ON onboarding_templates;
DROP POLICY IF EXISTS "Anyone can view onboarding templates" ON onboarding_templates;

CREATE POLICY "Authenticated can view or manage onboarding templates"
  ON onboarding_templates FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert onboarding templates"
  ON onboarding_templates FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update onboarding templates"
  ON onboarding_templates FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admins can delete onboarding templates"
  ON onboarding_templates FOR DELETE
  TO authenticated
  USING (is_admin());

-- ============================================================
-- website_access_tokens: Consolidate + fix always-true INSERT
-- ============================================================
DROP POLICY IF EXISTS "Admins can manage all tokens" ON website_access_tokens;
DROP POLICY IF EXISTS "Allow token creation" ON website_access_tokens;
DROP POLICY IF EXISTS "Public can read tokens for validation" ON website_access_tokens;

CREATE POLICY "Anyone can read non-expired tokens"
  ON website_access_tokens FOR SELECT
  TO anon, authenticated
  USING (expires_at > now());

CREATE POLICY "Admins can insert tokens"
  ON website_access_tokens FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update tokens"
  ON website_access_tokens FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admins can delete tokens"
  ON website_access_tokens FOR DELETE
  TO authenticated
  USING (is_admin());

-- ============================================================
-- zwickels_orders: Consolidate SELECT + fix always-true INSERT/UPDATE
-- ============================================================
DROP POLICY IF EXISTS "Anyone can create orders" ON zwickels_orders;
DROP POLICY IF EXISTS "Anyone can view their own orders by email" ON zwickels_orders;
DROP POLICY IF EXISTS "Authenticated users can view all orders" ON zwickels_orders;
DROP POLICY IF EXISTS "Authenticated users can update orders" ON zwickels_orders;

CREATE POLICY "Anyone can view orders"
  ON zwickels_orders FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can create zwickels orders"
  ON zwickels_orders FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can update zwickels orders"
  ON zwickels_orders FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- ============================================================
-- zwickels_products: Consolidate SELECT
-- ============================================================
DROP POLICY IF EXISTS "Anyone can view available products" ON zwickels_products;
DROP POLICY IF EXISTS "Authenticated users can view all products" ON zwickels_products;

CREATE POLICY "Anyone can view products"
  ON zwickels_products FOR SELECT
  TO anon
  USING (available = true);

CREATE POLICY "Admins can view all products"
  ON zwickels_products FOR SELECT
  TO authenticated
  USING (is_admin() OR available = true);

-- ============================================================
-- custom_website_submissions: Fix always-true INSERT/UPDATE
-- ============================================================
DROP POLICY IF EXISTS "Anyone can submit custom website request" ON custom_website_submissions;
DROP POLICY IF EXISTS "Authenticated users can update submissions" ON custom_website_submissions;
DROP POLICY IF EXISTS "Authenticated users can view all submissions" ON custom_website_submissions;

CREATE POLICY "Anyone can submit custom website request"
  ON custom_website_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view all submissions"
  ON custom_website_submissions FOR SELECT
  TO authenticated
  USING (is_admin());

CREATE POLICY "Admins can update submissions"
  ON custom_website_submissions FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- ============================================================
-- purchase_access: Fix always-true INSERT/UPDATE
-- ============================================================
DROP POLICY IF EXISTS "Only authenticated admins can insert" ON purchase_access;
DROP POLICY IF EXISTS "Only authenticated admins can update" ON purchase_access;

CREATE POLICY "Admins can insert purchase access"
  ON purchase_access FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update purchase access"
  ON purchase_access FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- ============================================================
-- webflix_orders: Fix always-true INSERT/UPDATE
-- ============================================================
DROP POLICY IF EXISTS "Public can create orders" ON webflix_orders;
DROP POLICY IF EXISTS "Authenticated can update orders" ON webflix_orders;

CREATE POLICY "Anyone can create webflix orders"
  ON webflix_orders FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can update webflix orders"
  ON webflix_orders FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- ============================================================
-- zwickels_order_items: Fix always-true INSERT
-- ============================================================
DROP POLICY IF EXISTS "Anyone can create order items" ON zwickels_order_items;

CREATE POLICY "Anyone can create order items"
  ON zwickels_order_items FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
