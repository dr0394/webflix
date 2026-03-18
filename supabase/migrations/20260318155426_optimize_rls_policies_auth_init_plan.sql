/*
  # Optimize RLS Policies - Auth Function Initialization

  1. Problem
    - Multiple RLS policies re-evaluate auth.uid() and auth.jwt() for every row
    - This causes suboptimal query performance at scale
    - Fix: wrap auth calls in (select ...) so they are evaluated once per query

  2. Tables Affected
    - website_configurations (3 policies)
    - section_contents (3 policies)
    - customers (2 policies)
    - customer_websites (1 policy)
    - customer_subscriptions (2 policies)
    - customer_support_tickets (3 policies)
    - order_checklists (3 policies)
    - support_ticket_messages (2 policies)
    - subscription_change_purchases (2 policies)
    - subscription_change_log (1 policy)
    - order_files (2 policies)
    - demo_templates (4 policies)
    - customer_brandings (3 policies)
    - branding_images (3 policies)
    - content_edits (3 policies)
    - deployment_logs (2 policies)
    - onboarding_templates (1 policy)

  3. Security
    - No changes to policy logic, only optimization of auth function calls
    - All policies maintain the same access patterns
*/

-- =============================================
-- website_configurations
-- =============================================

DROP POLICY IF EXISTS "Users can view own configurations" ON public.website_configurations;
CREATE POLICY "Users can view own configurations"
  ON public.website_configurations FOR SELECT
  TO authenticated
  USING (customer_email = ((select auth.jwt()) ->> 'email'::text));

DROP POLICY IF EXISTS "Users can insert own configurations" ON public.website_configurations;
CREATE POLICY "Users can insert own configurations"
  ON public.website_configurations FOR INSERT
  TO authenticated
  WITH CHECK (customer_email = ((select auth.jwt()) ->> 'email'::text));

DROP POLICY IF EXISTS "Users can update own configurations" ON public.website_configurations;
CREATE POLICY "Users can update own configurations"
  ON public.website_configurations FOR UPDATE
  TO authenticated
  USING (customer_email = ((select auth.jwt()) ->> 'email'::text))
  WITH CHECK (customer_email = ((select auth.jwt()) ->> 'email'::text));

-- =============================================
-- section_contents
-- =============================================

DROP POLICY IF EXISTS "Users can view own section contents" ON public.section_contents;
CREATE POLICY "Users can view own section contents"
  ON public.section_contents FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM website_configurations
    WHERE website_configurations.id = section_contents.config_id
    AND website_configurations.customer_email = ((select auth.jwt()) ->> 'email'::text)
  ));

DROP POLICY IF EXISTS "Users can insert own section contents" ON public.section_contents;
CREATE POLICY "Users can insert own section contents"
  ON public.section_contents FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM website_configurations
    WHERE website_configurations.id = section_contents.config_id
    AND website_configurations.customer_email = ((select auth.jwt()) ->> 'email'::text)
  ));

DROP POLICY IF EXISTS "Users can update own section contents" ON public.section_contents;
CREATE POLICY "Users can update own section contents"
  ON public.section_contents FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM website_configurations
    WHERE website_configurations.id = section_contents.config_id
    AND website_configurations.customer_email = ((select auth.jwt()) ->> 'email'::text)
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM website_configurations
    WHERE website_configurations.id = section_contents.config_id
    AND website_configurations.customer_email = ((select auth.jwt()) ->> 'email'::text)
  ));

-- =============================================
-- customers
-- =============================================

DROP POLICY IF EXISTS "Customers can view own data" ON public.customers;
CREATE POLICY "Customers can view own data"
  ON public.customers FOR SELECT
  TO authenticated
  USING (((select auth.uid()))::text = (id)::text);

DROP POLICY IF EXISTS "Customers can update own data" ON public.customers;
CREATE POLICY "Customers can update own data"
  ON public.customers FOR UPDATE
  TO authenticated
  USING (((select auth.uid()))::text = (id)::text)
  WITH CHECK (((select auth.uid()))::text = (id)::text);

-- =============================================
-- customer_websites
-- =============================================

DROP POLICY IF EXISTS "Customers can view own websites" ON public.customer_websites;
CREATE POLICY "Customers can view own websites"
  ON public.customer_websites FOR SELECT
  TO authenticated
  USING (customer_id = (select auth.uid()));

-- =============================================
-- customer_subscriptions
-- =============================================

DROP POLICY IF EXISTS "Customers can view own subscriptions" ON public.customer_subscriptions;
CREATE POLICY "Customers can view own subscriptions"
  ON public.customer_subscriptions FOR SELECT
  TO authenticated
  USING (customer_id = (select auth.uid()));

DROP POLICY IF EXISTS "Customers can update own subscriptions" ON public.customer_subscriptions;
CREATE POLICY "Customers can update own subscriptions"
  ON public.customer_subscriptions FOR UPDATE
  TO authenticated
  USING (customer_id = (select auth.uid()))
  WITH CHECK (customer_id = (select auth.uid()));

-- =============================================
-- customer_support_tickets
-- =============================================

DROP POLICY IF EXISTS "Customers can view own tickets" ON public.customer_support_tickets;
CREATE POLICY "Customers can view own tickets"
  ON public.customer_support_tickets FOR SELECT
  TO authenticated
  USING (customer_id = (select auth.uid()));

DROP POLICY IF EXISTS "Customers can create tickets" ON public.customer_support_tickets;
CREATE POLICY "Customers can create tickets"
  ON public.customer_support_tickets FOR INSERT
  TO authenticated
  WITH CHECK (customer_id = (select auth.uid()));

DROP POLICY IF EXISTS "Customers can update own tickets" ON public.customer_support_tickets;
CREATE POLICY "Customers can update own tickets"
  ON public.customer_support_tickets FOR UPDATE
  TO authenticated
  USING (customer_id = (select auth.uid()))
  WITH CHECK (customer_id = (select auth.uid()));

-- =============================================
-- order_checklists
-- =============================================

DROP POLICY IF EXISTS "Customers can view own checklists" ON public.order_checklists;
CREATE POLICY "Customers can view own checklists"
  ON public.order_checklists FOR SELECT
  TO authenticated
  USING (customer_id = (select auth.uid()));

DROP POLICY IF EXISTS "Customers can create own checklists" ON public.order_checklists;
CREATE POLICY "Customers can create own checklists"
  ON public.order_checklists FOR INSERT
  TO authenticated
  WITH CHECK (customer_id = (select auth.uid()));

DROP POLICY IF EXISTS "Customers can update own checklists" ON public.order_checklists;
CREATE POLICY "Customers can update own checklists"
  ON public.order_checklists FOR UPDATE
  TO authenticated
  USING (customer_id = (select auth.uid()))
  WITH CHECK (customer_id = (select auth.uid()));

-- =============================================
-- support_ticket_messages
-- =============================================

DROP POLICY IF EXISTS "Users can view messages of their tickets" ON public.support_ticket_messages;
CREATE POLICY "Users can view messages of their tickets"
  ON public.support_ticket_messages FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM customer_support_tickets
    WHERE customer_support_tickets.id = support_ticket_messages.ticket_id
    AND customer_support_tickets.customer_id = (select auth.uid())
  ));

DROP POLICY IF EXISTS "Users can create messages for their tickets" ON public.support_ticket_messages;
CREATE POLICY "Users can create messages for their tickets"
  ON public.support_ticket_messages FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM customer_support_tickets
    WHERE customer_support_tickets.id = support_ticket_messages.ticket_id
    AND customer_support_tickets.customer_id = (select auth.uid())
  ));

-- =============================================
-- subscription_change_purchases
-- =============================================

DROP POLICY IF EXISTS "Customers can view own change purchases" ON public.subscription_change_purchases;
CREATE POLICY "Customers can view own change purchases"
  ON public.subscription_change_purchases FOR SELECT
  TO authenticated
  USING (customer_id = (select auth.uid()));

DROP POLICY IF EXISTS "Customers can create change purchases" ON public.subscription_change_purchases;
CREATE POLICY "Customers can create change purchases"
  ON public.subscription_change_purchases FOR INSERT
  TO authenticated
  WITH CHECK (customer_id = (select auth.uid()));

-- =============================================
-- subscription_change_log
-- =============================================

DROP POLICY IF EXISTS "Customers can view own change logs" ON public.subscription_change_log;
CREATE POLICY "Customers can view own change logs"
  ON public.subscription_change_log FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM customer_subscriptions
    WHERE customer_subscriptions.id = subscription_change_log.subscription_id
    AND customer_subscriptions.customer_id = (select auth.uid())
  ));

-- =============================================
-- order_files
-- =============================================

DROP POLICY IF EXISTS "Customers can view own files" ON public.order_files;
CREATE POLICY "Customers can view own files"
  ON public.order_files FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM order_checklists
    WHERE order_checklists.id = order_files.order_checklist_id
    AND order_checklists.customer_id = (select auth.uid())
  ));

DROP POLICY IF EXISTS "Customers can upload own files" ON public.order_files;
CREATE POLICY "Customers can upload own files"
  ON public.order_files FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM order_checklists
    WHERE order_checklists.id = order_files.order_checklist_id
    AND order_checklists.customer_id = (select auth.uid())
  ));

-- =============================================
-- demo_templates
-- =============================================

DROP POLICY IF EXISTS "Users can create their own demo templates" ON public.demo_templates;
CREATE POLICY "Users can create their own demo templates"
  ON public.demo_templates FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = created_by);

DROP POLICY IF EXISTS "Users can read their own demo templates" ON public.demo_templates;
CREATE POLICY "Users can read their own demo templates"
  ON public.demo_templates FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = created_by);

DROP POLICY IF EXISTS "Users can update their own demo templates" ON public.demo_templates;
CREATE POLICY "Users can update their own demo templates"
  ON public.demo_templates FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = created_by)
  WITH CHECK ((select auth.uid()) = created_by);

DROP POLICY IF EXISTS "Users can delete their own demo templates" ON public.demo_templates;
CREATE POLICY "Users can delete their own demo templates"
  ON public.demo_templates FOR DELETE
  TO authenticated
  USING ((select auth.uid()) = created_by);

-- =============================================
-- customer_brandings
-- =============================================

DROP POLICY IF EXISTS "Customers can view own branding via email" ON public.customer_brandings;
CREATE POLICY "Customers can view own branding via email"
  ON public.customer_brandings FOR SELECT
  TO authenticated
  USING (contact_email = ((SELECT users.email FROM auth.users WHERE users.id = (select auth.uid())))::text);

DROP POLICY IF EXISTS "Customers can update own branding" ON public.customer_brandings;
CREATE POLICY "Customers can update own branding"
  ON public.customer_brandings FOR UPDATE
  TO authenticated
  USING (contact_email = ((SELECT users.email FROM auth.users WHERE users.id = (select auth.uid())))::text);

DROP POLICY IF EXISTS "Admins have full access to brandings" ON public.customer_brandings;
CREATE POLICY "Admins have full access to brandings"
  ON public.customer_brandings FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM auth.users
    WHERE users.id = (select auth.uid())
    AND (users.raw_app_meta_data ->> 'role'::text) = 'admin'::text
  ));

-- =============================================
-- branding_images
-- =============================================

DROP POLICY IF EXISTS "Users can view images for their branding" ON public.branding_images;
CREATE POLICY "Users can view images for their branding"
  ON public.branding_images FOR SELECT
  TO authenticated
  USING (branding_id IN (
    SELECT customer_brandings.id FROM customer_brandings
    WHERE customer_brandings.contact_email = ((SELECT users.email FROM auth.users WHERE users.id = (select auth.uid())))::text
  ));

DROP POLICY IF EXISTS "Users can insert images for their branding" ON public.branding_images;
CREATE POLICY "Users can insert images for their branding"
  ON public.branding_images FOR INSERT
  TO authenticated
  WITH CHECK (branding_id IN (
    SELECT customer_brandings.id FROM customer_brandings
    WHERE customer_brandings.contact_email = ((SELECT users.email FROM auth.users WHERE users.id = (select auth.uid())))::text
  ));

DROP POLICY IF EXISTS "Admins have full access to images" ON public.branding_images;
CREATE POLICY "Admins have full access to images"
  ON public.branding_images FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM auth.users
    WHERE users.id = (select auth.uid())
    AND (users.raw_app_meta_data ->> 'role'::text) = 'admin'::text
  ));

-- =============================================
-- content_edits
-- =============================================

DROP POLICY IF EXISTS "Users can view their own edits" ON public.content_edits;
CREATE POLICY "Users can view their own edits"
  ON public.content_edits FOR SELECT
  TO authenticated
  USING (branding_id IN (
    SELECT customer_brandings.id FROM customer_brandings
    WHERE customer_brandings.contact_email = ((SELECT users.email FROM auth.users WHERE users.id = (select auth.uid())))::text
  ));

DROP POLICY IF EXISTS "Users can insert their own edits" ON public.content_edits;
CREATE POLICY "Users can insert their own edits"
  ON public.content_edits FOR INSERT
  TO authenticated
  WITH CHECK (branding_id IN (
    SELECT customer_brandings.id FROM customer_brandings
    WHERE customer_brandings.contact_email = ((SELECT users.email FROM auth.users WHERE users.id = (select auth.uid())))::text
  ));

DROP POLICY IF EXISTS "Admins can view all edits" ON public.content_edits;
CREATE POLICY "Admins can view all edits"
  ON public.content_edits FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM auth.users
    WHERE users.id = (select auth.uid())
    AND (users.raw_app_meta_data ->> 'role'::text) = 'admin'::text
  ));

-- =============================================
-- deployment_logs
-- =============================================

DROP POLICY IF EXISTS "Users can view logs for their branding" ON public.deployment_logs;
CREATE POLICY "Users can view logs for their branding"
  ON public.deployment_logs FOR SELECT
  TO authenticated
  USING (branding_id IN (
    SELECT customer_brandings.id FROM customer_brandings
    WHERE customer_brandings.contact_email = ((SELECT users.email FROM auth.users WHERE users.id = (select auth.uid())))::text
  ));

DROP POLICY IF EXISTS "Admins have full access to logs" ON public.deployment_logs;
CREATE POLICY "Admins have full access to logs"
  ON public.deployment_logs FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM auth.users
    WHERE users.id = (select auth.uid())
    AND (users.raw_app_meta_data ->> 'role'::text) = 'admin'::text
  ));

-- =============================================
-- onboarding_templates
-- =============================================

DROP POLICY IF EXISTS "Admins can manage templates" ON public.onboarding_templates;
CREATE POLICY "Admins can manage templates"
  ON public.onboarding_templates FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM auth.users
    WHERE users.id = (select auth.uid())
    AND (users.raw_app_meta_data ->> 'role'::text) = 'admin'::text
  ));
