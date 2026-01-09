/*
  # Fix Email Campaigns RLS Policies
  
  1. Changes
    - Remove dependency on auth.users table
    - Use JWT metadata for admin role check
    - Simplify policies for better performance
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
    (auth.jwt()->>'role')::text = 'admin'
  );

-- Email Leads policies
CREATE POLICY "Admins can manage leads"
  ON email_leads
  FOR ALL
  TO authenticated
  USING (
    (auth.jwt()->>'role')::text = 'admin'
  );

-- Email Campaign Sends policies
CREATE POLICY "Admins can view campaign sends"
  ON email_campaign_sends
  FOR ALL
  TO authenticated
  USING (
    (auth.jwt()->>'role')::text = 'admin'
  );
