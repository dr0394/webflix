/*
  # Fix Mutable Search Path on All Functions

  Sets an immutable search_path on all public functions to prevent
  search_path injection attacks.

  1. Functions updated:
    - is_admin
    - generate_onboarding_token
    - create_branding_on_order
    - log_branding_status_change
    - update_updated_at_column
    - increment_token_usage
    - increment_post_views
    - update_webflix_orders_updated_at
    - update_customer_tables_updated_at
    - get_available_changes
    - use_change
    - update_generated_websites_updated_at
    - generate_website_access_token

  2. Security:
    - All functions now have SET search_path = '' to prevent hijacking
    - Fully qualified table/function references used where needed
*/

CREATE OR REPLACE FUNCTION public.is_admin()
  RETURNS boolean
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path = ''
AS $$
BEGIN
  RETURN (
    auth.jwt() ->> 'email' IN ('admin@webflix.de', 'dev@webflix.de')
    OR
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.generate_onboarding_token()
  RETURNS text
  LANGUAGE plpgsql
  SET search_path = ''
AS $$
DECLARE
  token text;
BEGIN
  token := encode(gen_random_bytes(32), 'hex');
  RETURN token;
END;
$$;

CREATE OR REPLACE FUNCTION public.create_branding_on_order()
  RETURNS trigger
  LANGUAGE plpgsql
  SET search_path = ''
AS $$
DECLARE
  token text;
BEGIN
  token := public.generate_onboarding_token();

  INSERT INTO public.customer_brandings (
    order_id,
    onboarding_token,
    status
  ) VALUES (
    NEW.id,
    token,
    'onboarding_pending'
  );

  INSERT INTO public.deployment_logs (
    branding_id,
    action,
    status,
    details
  ) VALUES (
    (SELECT id FROM public.customer_brandings WHERE order_id = NEW.id),
    'branding_initiated',
    'success',
    jsonb_build_object('order_id', NEW.id)
  );

  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.log_branding_status_change()
  RETURNS trigger
  LANGUAGE plpgsql
  SET search_path = ''
AS $$
BEGIN
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    INSERT INTO public.deployment_logs (
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

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
  RETURNS trigger
  LANGUAGE plpgsql
  SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.increment_token_usage(p_token text)
  RETURNS void
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path = ''
AS $$
BEGIN
  UPDATE public.website_access_tokens
  SET used_count = used_count + 1
  WHERE token = p_token;
END;
$$;

CREATE OR REPLACE FUNCTION public.increment_post_views(post_id uuid)
  RETURNS void
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path = ''
AS $$
BEGIN
  UPDATE public.blog_posts
  SET views = views + 1
  WHERE id = post_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_webflix_orders_updated_at()
  RETURNS trigger
  LANGUAGE plpgsql
  SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_customer_tables_updated_at()
  RETURNS trigger
  LANGUAGE plpgsql
  SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.get_available_changes(sub_id uuid)
  RETURNS integer
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path = ''
AS $$
DECLARE
  included integer;
  used integer;
  purchased integer;
BEGIN
  SELECT
    included_changes,
    used_changes,
    purchased_changes
  INTO included, used, purchased
  FROM public.customer_subscriptions
  WHERE id = sub_id;

  RETURN (included + purchased - used);
END;
$$;

CREATE OR REPLACE FUNCTION public.use_change(sub_id uuid, web_id uuid, change_type_param text, description_param text)
  RETURNS boolean
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path = ''
AS $$
DECLARE
  available integer;
BEGIN
  available := public.get_available_changes(sub_id);

  IF available <= 0 THEN
    RAISE EXCEPTION 'Keine Änderungen verfügbar';
  END IF;

  UPDATE public.customer_subscriptions
  SET used_changes = used_changes + 1
  WHERE id = sub_id;

  INSERT INTO public.subscription_change_log (
    subscription_id,
    website_id,
    change_type,
    description
  ) VALUES (
    sub_id,
    web_id,
    change_type_param,
    description_param
  );

  RETURN true;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_generated_websites_updated_at()
  RETURNS trigger
  LANGUAGE plpgsql
  SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.generate_website_access_token(p_website_id uuid, p_customer_email text)
  RETURNS text
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path = ''
AS $$
DECLARE
  v_token text;
BEGIN
  v_token := encode(gen_random_bytes(32), 'base64');
  v_token := replace(v_token, '/', '_');
  v_token := replace(v_token, '+', '-');

  INSERT INTO public.website_access_tokens (website_id, token, customer_email)
  VALUES (p_website_id, v_token, p_customer_email);

  RETURN v_token;
END;
$$;
