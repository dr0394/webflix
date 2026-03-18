/*
  # Add missing foreign key indexes

  email_campaign_sends.lead_id and email_campaigns.created_by lack indexes,
  causing suboptimal JOIN performance.
*/

CREATE INDEX IF NOT EXISTS idx_email_campaign_sends_lead_id
  ON email_campaign_sends(lead_id);

CREATE INDEX IF NOT EXISTS idx_email_campaigns_created_by
  ON email_campaigns(created_by);
