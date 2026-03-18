/*
  # Add Indexes for Unindexed Foreign Keys

  Foreign keys without covering indexes cause slow cascading deletes and
  inefficient joins. This migration adds indexes on all foreign key columns
  that are currently missing them.

  1. Tables and columns indexed:
    - branding_images.branding_id
    - content_edits.branding_id
    - customer_brandings.order_id
    - customer_subscriptions.customer_id
    - customer_subscriptions.website_id
    - customer_support_tickets.customer_id
    - customer_support_tickets.website_id
    - customer_websites.customer_id
    - customer_websites.order_id
    - demo_templates.created_by
    - deployment_logs.branding_id
    - deployment_logs.performed_by
    - generated_websites.order_id
    - order_checklists.customer_id
    - order_checklists.order_id
    - order_files.order_checklist_id
    - section_contents.config_id
    - subscription_change_log.subscription_id
    - subscription_change_log.website_id
    - subscription_change_purchases.customer_id
    - subscription_change_purchases.subscription_id
    - support_ticket_messages.ticket_id
    - website_access_tokens.website_id
    - website_configurations (fk_purchase_access column)
    - zwickels_order_items.order_id
    - zwickels_order_items.product_id

  2. Important notes:
    - All indexes use IF NOT EXISTS to be safe for re-runs
    - These indexes improve JOIN performance and cascading FK operations
*/

CREATE INDEX IF NOT EXISTS idx_fk_branding_images_branding_id
  ON public.branding_images (branding_id);

CREATE INDEX IF NOT EXISTS idx_fk_content_edits_branding_id
  ON public.content_edits (branding_id);

CREATE INDEX IF NOT EXISTS idx_fk_customer_brandings_order_id
  ON public.customer_brandings (order_id);

CREATE INDEX IF NOT EXISTS idx_fk_customer_subscriptions_customer_id
  ON public.customer_subscriptions (customer_id);

CREATE INDEX IF NOT EXISTS idx_fk_customer_subscriptions_website_id
  ON public.customer_subscriptions (website_id);

CREATE INDEX IF NOT EXISTS idx_fk_customer_support_tickets_customer_id
  ON public.customer_support_tickets (customer_id);

CREATE INDEX IF NOT EXISTS idx_fk_customer_support_tickets_website_id
  ON public.customer_support_tickets (website_id);

CREATE INDEX IF NOT EXISTS idx_fk_customer_websites_customer_id
  ON public.customer_websites (customer_id);

CREATE INDEX IF NOT EXISTS idx_fk_customer_websites_order_id
  ON public.customer_websites (order_id);

CREATE INDEX IF NOT EXISTS idx_fk_demo_templates_created_by
  ON public.demo_templates (created_by);

CREATE INDEX IF NOT EXISTS idx_fk_deployment_logs_branding_id
  ON public.deployment_logs (branding_id);

CREATE INDEX IF NOT EXISTS idx_fk_deployment_logs_performed_by
  ON public.deployment_logs (performed_by);

CREATE INDEX IF NOT EXISTS idx_fk_generated_websites_order_id
  ON public.generated_websites (order_id);

CREATE INDEX IF NOT EXISTS idx_fk_order_checklists_customer_id
  ON public.order_checklists (customer_id);

CREATE INDEX IF NOT EXISTS idx_fk_order_checklists_order_id
  ON public.order_checklists (order_id);

CREATE INDEX IF NOT EXISTS idx_fk_order_files_order_checklist_id
  ON public.order_files (order_checklist_id);

CREATE INDEX IF NOT EXISTS idx_fk_section_contents_config_id
  ON public.section_contents (config_id);

CREATE INDEX IF NOT EXISTS idx_fk_subscription_change_log_subscription_id
  ON public.subscription_change_log (subscription_id);

CREATE INDEX IF NOT EXISTS idx_fk_subscription_change_log_website_id
  ON public.subscription_change_log (website_id);

CREATE INDEX IF NOT EXISTS idx_fk_subscription_change_purchases_customer_id
  ON public.subscription_change_purchases (customer_id);

CREATE INDEX IF NOT EXISTS idx_fk_subscription_change_purchases_subscription_id
  ON public.subscription_change_purchases (subscription_id);

CREATE INDEX IF NOT EXISTS idx_fk_support_ticket_messages_ticket_id
  ON public.support_ticket_messages (ticket_id);

CREATE INDEX IF NOT EXISTS idx_fk_website_access_tokens_website_id
  ON public.website_access_tokens (website_id);

CREATE INDEX IF NOT EXISTS idx_fk_website_configurations_purchase_id
  ON public.website_configurations (purchase_id);

CREATE INDEX IF NOT EXISTS idx_fk_zwickels_order_items_order_id
  ON public.zwickels_order_items (order_id);

CREATE INDEX IF NOT EXISTS idx_fk_zwickels_order_items_product_id
  ON public.zwickels_order_items (product_id);
