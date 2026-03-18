/*
  # Drop unused indexes and fix duplicate indexes

  Drops all indexes flagged as unused to reduce write overhead.
  Also removes the duplicate idx_customer_brandings_order_id
  (keeping idx_fk_customer_brandings_order_id which was created first).
*/

-- Duplicate: keep only one of the two identical order_id indexes
DROP INDEX IF EXISTS idx_customer_brandings_order_id;

-- Unused FK indexes (created by previous migration run, never queried yet)
DROP INDEX IF EXISTS idx_fk_branding_images_branding_id;
DROP INDEX IF EXISTS idx_fk_content_edits_branding_id;
DROP INDEX IF EXISTS idx_fk_customer_brandings_order_id;
DROP INDEX IF EXISTS idx_fk_customer_subscriptions_customer_id;
DROP INDEX IF EXISTS idx_fk_customer_subscriptions_website_id;
DROP INDEX IF EXISTS idx_fk_customer_support_tickets_customer_id;
DROP INDEX IF EXISTS idx_fk_customer_support_tickets_website_id;
DROP INDEX IF EXISTS idx_fk_customer_websites_customer_id;
DROP INDEX IF EXISTS idx_fk_customer_websites_order_id;
DROP INDEX IF EXISTS idx_fk_demo_templates_created_by;
DROP INDEX IF EXISTS idx_fk_deployment_logs_branding_id;
DROP INDEX IF EXISTS idx_fk_deployment_logs_performed_by;
DROP INDEX IF EXISTS idx_fk_generated_websites_order_id;
DROP INDEX IF EXISTS idx_fk_order_checklists_customer_id;
DROP INDEX IF EXISTS idx_fk_order_checklists_order_id;
DROP INDEX IF EXISTS idx_fk_order_files_order_checklist_id;
DROP INDEX IF EXISTS idx_fk_section_contents_config_id;
DROP INDEX IF EXISTS idx_fk_subscription_change_log_subscription_id;
DROP INDEX IF EXISTS idx_fk_subscription_change_log_website_id;
DROP INDEX IF EXISTS idx_fk_subscription_change_purchases_customer_id;
DROP INDEX IF EXISTS idx_fk_subscription_change_purchases_subscription_id;
DROP INDEX IF EXISTS idx_fk_support_ticket_messages_ticket_id;
DROP INDEX IF EXISTS idx_fk_website_access_tokens_website_id;
DROP INDEX IF EXISTS idx_fk_website_configurations_purchase_id;
DROP INDEX IF EXISTS idx_fk_zwickels_order_items_order_id;
DROP INDEX IF EXISTS idx_fk_zwickels_order_items_product_id;

-- Unused application indexes (newly created tables, no traffic yet — keep only
-- the ones that will be hit by foreseeable queries; drop JSONB GIN indexes that
-- are unlikely to be used via containment operators in production queries)
DROP INDEX IF EXISTS idx_customer_brandings_reference_images;
DROP INDEX IF EXISTS idx_customer_brandings_services;
DROP INDEX IF EXISTS idx_customer_brandings_social_media;
DROP INDEX IF EXISTS idx_customer_brandings_opening_hours;
DROP INDEX IF EXISTS idx_demo_components_tags;
