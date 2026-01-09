/*
  # Fix Email Campaigns RLS - Use correct JWT path
  
  1. Changes
    - Fix JWT role check to use raw_app_meta_data path
    - Ensure policies work for admin users
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Admins can manage campaigns" ON email_campaigns;
DROP POLICY IF EXISTS "Admins can manage leads" ON email_leads;
DROP POLICY IF EXISTS "Admins can view campaign sends" ON email_campaign_sends;

-- Email Campaigns policies
CREATE POLICY "Admins can manage campaigns"
  ON email_campaigns
  FOR ALL
  TO authenticated
  USING (
    (auth.jwt()->>'raw_app_meta_data')::jsonb->>'role' = 'admin'
  );

-- Email Leads policies
CREATE POLICY "Admins can manage leads"
  ON email_leads
  FOR ALL
  TO authenticated
  USING (
    (auth.jwt()->>'raw_app_meta_data')::jsonb->>'role' = 'admin'
  );

-- Email Campaign Sends policies
CREATE POLICY "Admins can view campaign sends"
  ON email_campaign_sends
  FOR ALL
  TO authenticated
  USING (
    (auth.jwt()->>'raw_app_meta_data')::jsonb->>'role' = 'admin'
  );