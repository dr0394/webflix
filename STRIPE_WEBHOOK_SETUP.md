# Stripe Webhook Setup Guide

This guide explains how to configure Stripe webhooks for subscription management in the Webflix project.

## Overview

The system automatically handles subscription lifecycle events from Stripe:
- **Subscription cancellations** → Deactivates user access
- **Payment failures** → Marks subscription as past_due and deactivates user
- **Subscription updates** → Updates subscription status in database
- **Payment success** → Reactivates subscription

All events trigger an email notification to `kontakt@webflix.info` with event details.

## Database Schema

### Added Fields to `webflix_orders`:
- `stripe_customer_id` (text) - Stripe customer ID
- `subscription_status` (text) - Current status (active, canceled, past_due, etc.)
- `is_active` (boolean) - Whether subscription is active (default: true)
- `subscription_current_period_end` (timestamptz) - End of current billing period

### Extended `customer_subscriptions` table:
- `customer_email` (text) - Customer email address
- `customer_name` (text) - Customer name
- `stripe_customer_id` (text) - Stripe customer ID
- `is_active` (boolean) - Active status
- `current_period_start` (timestamptz)
- `current_period_end` (timestamptz)
- `cancel_at_period_end` (boolean)
- `canceled_at` (timestamptz)
- `trial_start` (timestamptz)
- `trial_end` (timestamptz)

## Webhook Configuration

### 1. Get the Webhook URL

Your webhook endpoint is deployed at:
```
https://[YOUR_SUPABASE_PROJECT_REF].supabase.co/functions/v1/stripe-webhook
```

### 2. Configure in Stripe Dashboard

1. Go to [Stripe Dashboard → Developers → Webhooks](https://dashboard.stripe.com/webhooks)
2. Click "Add endpoint"
3. Enter the webhook URL above
4. Select these events:
   - `customer.subscription.deleted`
   - `customer.subscription.updated`
   - `invoice.payment_failed`
   - `invoice.payment_succeeded`
5. Click "Add endpoint"
6. Copy the **Signing secret** (starts with `whsec_`)

### 3. Add Secret to Supabase

Add the webhook signing secret to your Supabase project:

```bash
# Via Supabase CLI (recommended)
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_your_secret_here

# Or via Supabase Dashboard:
# Project Settings → Edge Functions → Secrets
```

### 4. Verify Required Environment Variables

Ensure these are configured in your Supabase Edge Functions:

```
STRIPE_SECRET_KEY=sk_...          # Your Stripe secret key
STRIPE_WEBHOOK_SECRET=whsec_...   # Webhook signing secret
BREVO_API_KEY=xkeysib-...         # For admin notifications
SUPABASE_URL=https://...          # Auto-configured
SUPABASE_SERVICE_ROLE_KEY=...    # Auto-configured
```

## Webhook Events Handled

### 1. `customer.subscription.deleted`
**Action**: Subscription cancelled
- Sets `subscription_status = 'canceled'`
- Sets `is_active = false`
- Records `canceled_at` timestamp
- Sends notification to admin

### 2. `invoice.payment_failed`
**Action**: Payment failed
- Sets `subscription_status = 'past_due'`
- Sets `is_active = false`
- Sends notification to admin

### 3. `customer.subscription.updated`
**Action**: Subscription modified
- Updates `subscription_status` to current Stripe status
- Sets `is_active = true` if status is 'active' or 'trialing'
- Updates `cancel_at_period_end` flag
- Sends notification to admin

### 4. `invoice.payment_succeeded`
**Action**: Payment successful
- Sets `subscription_status = 'active'`
- Sets `is_active = true`
- Updates billing period end date
- Sends notification to admin

## Admin Notifications

Every subscription event sends an email to `kontakt@webflix.info` with:
- Event type
- Customer name and email
- Subscription ID
- New status
- Active status (Yes/No)
- Timestamp

## Testing Webhooks

### Local Testing with Stripe CLI

1. Install Stripe CLI: https://stripe.com/docs/stripe-cli
2. Forward webhooks to your local endpoint:
   ```bash
   stripe listen --forward-to http://localhost:54321/functions/v1/stripe-webhook
   ```
3. Trigger test events:
   ```bash
   stripe trigger customer.subscription.deleted
   stripe trigger invoice.payment_failed
   ```

### Production Testing

1. Use Stripe Dashboard → Webhooks → [Your endpoint] → "Send test webhook"
2. Check Supabase Edge Function logs for responses
3. Verify database updates in Supabase Dashboard

## Security

- Webhook endpoint validates Stripe signature using `STRIPE_WEBHOOK_SECRET`
- Only requests with valid signatures are processed
- Invalid signatures return 400 Bad Request
- Database functions use `SECURITY DEFINER` for controlled access
- RLS policies ensure proper data isolation

## Database Functions

### `update_subscription_status()`
Updates subscription status across `customer_subscriptions` and `webflix_orders` tables.

**Parameters:**
- `p_stripe_subscription_id` - Stripe subscription ID
- `p_status` - New status
- `p_is_active` - Active flag
- `p_current_period_end` - End of billing period (optional)
- `p_canceled_at` - Cancellation timestamp (optional)
- `p_cancel_at_period_end` - Cancel at period end flag (optional)

**Returns:** JSON with customer info and update status

## Troubleshooting

### Webhook not receiving events
1. Check webhook URL is correct in Stripe Dashboard
2. Verify `STRIPE_WEBHOOK_SECRET` is set correctly
3. Check Edge Function logs in Supabase Dashboard

### Database not updating
1. Verify subscription exists in `customer_subscriptions` table
2. Check Edge Function logs for errors
3. Ensure `SUPABASE_SERVICE_ROLE_KEY` is configured

### Admin emails not sending
1. Verify `BREVO_API_KEY` is configured
2. Check `kontakt@webflix.info` is correct recipient
3. Review Edge Function logs for Brevo API errors

## Monitoring

Monitor webhook health:
1. Supabase Dashboard → Edge Functions → stripe-webhook → Logs
2. Stripe Dashboard → Webhooks → [Your endpoint] → Recent deliveries
3. Check email inbox at `kontakt@webflix.info`

## Support

For issues or questions, contact the development team or check:
- [Stripe Webhooks Documentation](https://stripe.com/docs/webhooks)
- [Supabase Edge Functions Documentation](https://supabase.com/docs/guides/functions)
