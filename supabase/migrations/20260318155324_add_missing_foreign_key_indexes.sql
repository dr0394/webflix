/*
  # Add Missing Foreign Key Indexes

  1. Problem
    - Several tables have foreign keys without covering indexes
    - This causes suboptimal query performance on joins and cascading operations

  2. Indexes Added
    - `branding_images.branding_id` - speeds up lookups by branding
    - `content_edits.branding_id` - speeds up lookups by branding
    - `customer_brandings.order_id` - speeds up lookups by order
    - `customer_subscriptions.website_id` - speeds up lookups by website
    - `customer_support_tickets.website_id` - speeds up lookups by website
    - `customer_websites.order_id` - speeds up lookups by order
    - `deployment_logs.branding_id` - speeds up lookups by branding
    - `deployment_logs.performed_by` - speeds up lookups by user
    - `zwickels_order_items.product_id` - speeds up lookups by product

  3. Important Notes
    - All indexes use IF NOT EXISTS to prevent errors if they already exist
    - No data is modified, only indexes are added
*/

CREATE INDEX IF NOT EXISTS idx_branding_images_branding_id
  ON public.branding_images (branding_id);

CREATE INDEX IF NOT EXISTS idx_content_edits_branding_id
  ON public.content_edits (branding_id);

CREATE INDEX IF NOT EXISTS idx_customer_brandings_order_id
  ON public.customer_brandings (order_id);

CREATE INDEX IF NOT EXISTS idx_customer_subscriptions_website_id
  ON public.customer_subscriptions (website_id);

CREATE INDEX IF NOT EXISTS idx_customer_support_tickets_website_id
  ON public.customer_support_tickets (website_id);

CREATE INDEX IF NOT EXISTS idx_customer_websites_order_id
  ON public.customer_websites (order_id);

CREATE INDEX IF NOT EXISTS idx_deployment_logs_branding_id
  ON public.deployment_logs (branding_id);

CREATE INDEX IF NOT EXISTS idx_deployment_logs_performed_by
  ON public.deployment_logs (performed_by);

CREATE INDEX IF NOT EXISTS idx_zwickels_order_items_product_id
  ON public.zwickels_order_items (product_id);
