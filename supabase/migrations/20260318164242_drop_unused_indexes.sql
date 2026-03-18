/*
  # Drop Unused Indexes

  Removes all indexes that have not been used according to database statistics.
  These indexes consume storage and slow down writes without providing query benefits.

  1. Tables affected:
    - purchase_access (2 indexes)
    - website_configurations (3 indexes)
    - section_contents (1 index)
    - blog_posts (4 indexes)
    - custom_website_submissions (3 indexes)
    - webflix_orders (4 indexes)
    - zwickels_products (2 indexes)
    - zwickels_orders (2 indexes)
    - zwickels_order_items (2 indexes)
    - customers (2 indexes)
    - customer_websites (2 indexes)
    - customer_subscriptions (4 indexes)
    - customer_support_tickets (3 indexes)
    - support_ticket_messages (2 indexes)
    - order_checklists (4 indexes)
    - subscription_change_purchases (3 indexes)
    - subscription_change_log (3 indexes)
    - checklist_templates (1 index)
    - order_files (2 indexes)
    - demo_templates (4 indexes)
    - generated_websites (4 indexes)
    - website_access_tokens (2 indexes)
    - branding_images (1 index)
    - content_edits (1 index)
    - customer_brandings (1 index)
    - deployment_logs (2 indexes)

  2. Important notes:
    - All indexes listed were confirmed unused via pg_stat_user_indexes
    - Indexes can be recreated if query patterns change in the future
*/

DROP INDEX IF EXISTS idx_purchase_access_email;
DROP INDEX IF EXISTS idx_purchase_access_active;

DROP INDEX IF EXISTS idx_website_configurations_purchase_id;
DROP INDEX IF EXISTS idx_website_configurations_email;
DROP INDEX IF EXISTS idx_website_configurations_status;

DROP INDEX IF EXISTS idx_section_contents_config_id;

DROP INDEX IF EXISTS idx_blog_posts_slug;
DROP INDEX IF EXISTS idx_blog_posts_published_at;
DROP INDEX IF EXISTS idx_blog_posts_published;
DROP INDEX IF EXISTS idx_blog_posts_tags;

DROP INDEX IF EXISTS idx_custom_submissions_status;
DROP INDEX IF EXISTS idx_custom_submissions_created_at;
DROP INDEX IF EXISTS idx_custom_submissions_email;

DROP INDEX IF EXISTS idx_webflix_orders_order_number;
DROP INDEX IF EXISTS idx_webflix_orders_status;
DROP INDEX IF EXISTS idx_webflix_orders_created_at;
DROP INDEX IF EXISTS idx_webflix_orders_stripe_session;

DROP INDEX IF EXISTS idx_zwickels_products_category;
DROP INDEX IF EXISTS idx_zwickels_products_available;

DROP INDEX IF EXISTS idx_zwickels_orders_status;
DROP INDEX IF EXISTS idx_zwickels_orders_created_at;

DROP INDEX IF EXISTS idx_zwickels_order_items_order_id;
DROP INDEX IF EXISTS idx_zwickels_order_items_product_id;

DROP INDEX IF EXISTS idx_customers_email;
DROP INDEX IF EXISTS idx_customers_customer_number;

DROP INDEX IF EXISTS idx_customer_websites_customer_id;
DROP INDEX IF EXISTS idx_customer_websites_status;
DROP INDEX IF EXISTS idx_customer_websites_order_id;

DROP INDEX IF EXISTS idx_customer_subscriptions_customer_id;
DROP INDEX IF EXISTS idx_customer_subscriptions_status;
DROP INDEX IF EXISTS idx_customer_subscriptions_stripe_id;
DROP INDEX IF EXISTS idx_customer_subscriptions_website_id;

DROP INDEX IF EXISTS idx_support_tickets_customer_id;
DROP INDEX IF EXISTS idx_support_tickets_status;
DROP INDEX IF EXISTS idx_support_tickets_ticket_number;
DROP INDEX IF EXISTS idx_customer_support_tickets_website_id;

DROP INDEX IF EXISTS idx_ticket_messages_ticket_id;
DROP INDEX IF EXISTS idx_ticket_messages_created_at;

DROP INDEX IF EXISTS idx_order_checklists_order_id;
DROP INDEX IF EXISTS idx_order_checklists_customer_id;
DROP INDEX IF EXISTS idx_order_checklists_status;
DROP INDEX IF EXISTS idx_order_checklists_demo_name;

DROP INDEX IF EXISTS idx_change_purchases_customer_id;
DROP INDEX IF EXISTS idx_change_purchases_subscription_id;
DROP INDEX IF EXISTS idx_change_purchases_status;

DROP INDEX IF EXISTS idx_change_log_subscription_id;
DROP INDEX IF EXISTS idx_change_log_website_id;
DROP INDEX IF EXISTS idx_change_log_created_at;

DROP INDEX IF EXISTS idx_checklist_templates_demo_name;

DROP INDEX IF EXISTS idx_order_files_checklist_id;
DROP INDEX IF EXISTS idx_order_files_file_type;

DROP INDEX IF EXISTS idx_demo_templates_industry;
DROP INDEX IF EXISTS idx_demo_templates_created_by;
DROP INDEX IF EXISTS idx_demo_templates_is_public;
DROP INDEX IF EXISTS idx_demo_templates_created_at;

DROP INDEX IF EXISTS idx_generated_websites_order_id;
DROP INDEX IF EXISTS idx_generated_websites_customer_email;
DROP INDEX IF EXISTS idx_generated_websites_slug;
DROP INDEX IF EXISTS idx_generated_websites_status;

DROP INDEX IF EXISTS idx_website_access_tokens_token;
DROP INDEX IF EXISTS idx_website_access_tokens_website_id;

DROP INDEX IF EXISTS idx_branding_images_branding_id;
DROP INDEX IF EXISTS idx_content_edits_branding_id;
DROP INDEX IF EXISTS idx_customer_brandings_order_id;
DROP INDEX IF EXISTS idx_deployment_logs_branding_id;
DROP INDEX IF EXISTS idx_deployment_logs_performed_by;
