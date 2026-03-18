/*
  # Add missing foreign key covering indexes

  Creates indexes on all FK columns that lacked them, preventing sequential
  scans on JOINs and ON DELETE/UPDATE operations.
*/

CREATE INDEX IF NOT EXISTS idx_branding_images_branding_id ON branding_images(branding_id);
CREATE INDEX IF NOT EXISTS idx_content_edits_branding_id ON content_edits(branding_id);
CREATE INDEX IF NOT EXISTS idx_customer_brandings_order_id ON customer_brandings(order_id);
CREATE INDEX IF NOT EXISTS idx_customer_subscriptions_customer_id ON customer_subscriptions(customer_id);
CREATE INDEX IF NOT EXISTS idx_customer_subscriptions_website_id ON customer_subscriptions(website_id);
CREATE INDEX IF NOT EXISTS idx_customer_support_tickets_customer_id ON customer_support_tickets(customer_id);
CREATE INDEX IF NOT EXISTS idx_customer_support_tickets_website_id ON customer_support_tickets(website_id);
CREATE INDEX IF NOT EXISTS idx_customer_websites_customer_id ON customer_websites(customer_id);
CREATE INDEX IF NOT EXISTS idx_customer_websites_order_id ON customer_websites(order_id);
CREATE INDEX IF NOT EXISTS idx_demo_templates_created_by ON demo_templates(created_by);
CREATE INDEX IF NOT EXISTS idx_deployment_logs_branding_id ON deployment_logs(branding_id);
CREATE INDEX IF NOT EXISTS idx_deployment_logs_performed_by ON deployment_logs(performed_by);
CREATE INDEX IF NOT EXISTS idx_generated_websites_order_id ON generated_websites(order_id);
CREATE INDEX IF NOT EXISTS idx_order_checklists_customer_id ON order_checklists(customer_id);
CREATE INDEX IF NOT EXISTS idx_order_checklists_order_id ON order_checklists(order_id);
CREATE INDEX IF NOT EXISTS idx_order_files_order_checklist_id ON order_files(order_checklist_id);
CREATE INDEX IF NOT EXISTS idx_section_contents_config_id ON section_contents(config_id);
CREATE INDEX IF NOT EXISTS idx_subscription_change_log_subscription_id ON subscription_change_log(subscription_id);
CREATE INDEX IF NOT EXISTS idx_subscription_change_log_website_id ON subscription_change_log(website_id);
CREATE INDEX IF NOT EXISTS idx_subscription_change_purchases_customer_id ON subscription_change_purchases(customer_id);
CREATE INDEX IF NOT EXISTS idx_subscription_change_purchases_subscription_id ON subscription_change_purchases(subscription_id);
CREATE INDEX IF NOT EXISTS idx_support_ticket_messages_ticket_id ON support_ticket_messages(ticket_id);
CREATE INDEX IF NOT EXISTS idx_website_access_tokens_website_id ON website_access_tokens(website_id);
CREATE INDEX IF NOT EXISTS idx_website_configurations_purchase_id ON website_configurations(purchase_id);
CREATE INDEX IF NOT EXISTS idx_zwickels_order_items_order_id ON zwickels_order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_zwickels_order_items_product_id ON zwickels_order_items(product_id);
