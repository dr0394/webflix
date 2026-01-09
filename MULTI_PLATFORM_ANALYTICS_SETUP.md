# Multi-Platform Analytics Setup Guide

This guide explains how to integrate GA4, Meta (Facebook) Pixel, TikTok Pixel, and LinkedIn Insight Tag with your Webflix application.

## Overview

The analytics system is implemented in `/src/lib/analytics.ts` and automatically tracks events across all four platforms:

- **Google Analytics 4 (GA4)** - via dataLayer
- **Meta (Facebook) Pixel** - via fbq()
- **TikTok Pixel** - via ttq
- **LinkedIn Insight Tag** - via lintrk()

## Installation

### 1. Google Analytics 4 (GA4)

Add to `index.html` in the `<head>` section:

```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**Replace `G-XXXXXXXXXX` with your GA4 Measurement ID**

### 2. Meta (Facebook) Pixel

Add to `index.html` in the `<head>` section:

```html
<!-- Meta (Facebook) Pixel -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'YOUR_PIXEL_ID');
  fbq('track', 'PageView');
</script>
<noscript>
  <img height="1" width="1" style="display:none"
    src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID&ev=PageView&noscript=1"/>
</noscript>
```

**Replace `YOUR_PIXEL_ID` with your Meta Pixel ID**

### 3. TikTok Pixel

Add to `index.html` in the `<head>` section:

```html
<!-- TikTok Pixel -->
<script>
  !function (w, d, t) {
    w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
    ttq.load('YOUR_TIKTOK_PIXEL_ID');
    ttq.page();
  }(window, document, 'ttq');
</script>
```

**Replace `YOUR_TIKTOK_PIXEL_ID` with your TikTok Pixel ID**

### 4. LinkedIn Insight Tag

Add to `index.html` in the `<head>` section:

```html
<!-- LinkedIn Insight Tag -->
<script type="text/javascript">
_linkedin_partner_id = "YOUR_PARTNER_ID";
window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
window._linkedin_data_partner_ids.push(_linkedin_partner_id);
</script><script type="text/javascript">
(function(l) {
if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
window.lintrk.q=[]}
var s = document.getElementsByTagName("script")[0];
var b = document.createElement("script");
b.type = "text/javascript";b.async = true;
b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
s.parentNode.insertBefore(b, s);})(window.lintrk);
</script>
<noscript>
<img height="1" width="1" style="display:none;" alt="" src="https://px.ads.linkedin.com/collect/?pid=YOUR_PARTNER_ID&fmt=gif" />
</noscript>
```

**Replace `YOUR_PARTNER_ID` with your LinkedIn Partner ID**

## Tracked Events

The following events are automatically tracked across all platforms:

### E-Commerce Funnel

1. **PageView** - Automatic page tracking
2. **ViewContent** - User views a product/package
3. **AddToCart** - User adds item to cart
4. **InitiateCheckout** - User starts checkout
5. **AddPaymentInfo** - User enters payment details
6. **Purchase** - Completed transaction

### Lead Generation

1. **Lead** - Lead form submission
2. **SubmitApplication** - Custom website form submission
3. **CompleteRegistration** - Registration completed

## Usage Examples

The analytics functions are already integrated throughout the application. Here are some examples:

```typescript
import {
  trackViewContent,
  trackAddToCart,
  trackInitiateCheckout,
  trackPurchase,
  trackLead
} from './lib/analytics';

// Track product view
trackViewContent({
  item_id: 'webflix-one',
  item_name: 'Webflix One Template',
  price: 29.90,
  item_category: 'Templates',
  currency: 'EUR'
});

// Track add to cart
trackAddToCart({
  item_id: 'webflix-one',
  item_name: 'Webflix One Template',
  price: 29.90,
  item_category: 'Templates',
  quantity: 1,
  currency: 'EUR'
});

// Track purchase
trackPurchase({
  transaction_id: 'ORDER-12345',
  value: 29.90,
  currency: 'EUR',
  items: [{
    item_id: 'webflix-one',
    item_name: 'Webflix One Template',
    price: 29.90,
    item_category: 'Templates',
    quantity: 1
  }]
});

// Track lead
trackLead({
  form_name: 'Contact Form',
  form_type: 'contact',
  value: 50,
  currency: 'EUR'
});
```

## Platform-Specific Notes

### Meta (Facebook) Pixel
- Automatically tracks standard e-commerce events
- Uses `content_ids` array for products
- Supports Advanced Matching (email, phone) if provided

### TikTok Pixel
- Uses `CompletePayment` for purchases (TikTok standard)
- Uses `SubmitForm` for lead events
- Tracks `content_id`, `value`, and `currency`

### LinkedIn Insight Tag
- Page views are tracked automatically
- Conversion tracking requires conversion IDs
- Update `trackLinkedInEvent()` calls with your conversion IDs

## Conversion IDs for LinkedIn

To track specific conversions on LinkedIn, you need to add conversion IDs:

```typescript
// In analytics.ts, update the trackPurchase function:
trackLinkedInEvent('12345'); // Replace with your Purchase conversion ID

// For leads:
trackLinkedInEvent('67890'); // Replace with your Lead conversion ID
```

Get your conversion IDs from: LinkedIn Campaign Manager → Conversion Tracking

## Testing

To verify events are firing correctly:

1. **GA4**: Use GA4 DebugView or check browser console for `[GA4 Analytics]` logs
2. **Meta Pixel**: Use Meta Pixel Helper Chrome extension
3. **TikTok Pixel**: Use TikTok Pixel Helper Chrome extension or Events Manager
4. **LinkedIn**: Check browser console for `[LinkedIn Insight]` logs

## Console Logging

All tracking events are logged to the browser console for debugging:

```
[GA4 Analytics] ViewContent { item_id: '...', ... }
[Meta Pixel] ViewContent { content_ids: [...], ... }
[TikTok Pixel] ViewContent { content_id: '...', ... }
[LinkedIn Insight] page view tracked automatically
```

## Data Layer Structure

All platforms use their native methods, but GA4 uses a dataLayer for flexibility:

```javascript
window.dataLayer.push({
  event: 'ViewContent',
  ecommerce: {
    currency: 'EUR',
    value: 29.90,
    items: [{
      item_id: 'webflix-one',
      item_name: 'Webflix One Template',
      price: 29.90,
      item_category: 'Templates',
      item_brand: 'Webflix',
      quantity: 1
    }]
  }
});
```

## Important Notes

1. **Test Mode**: All pixels support test modes. Enable them during development.
2. **GDPR Compliance**: Ensure you have proper cookie consent before loading pixels.
3. **Conversion Values**: Set realistic conversion values for better optimization.
4. **Transaction IDs**: Must be unique for each purchase to avoid duplicate tracking.

## Support

For platform-specific help:
- **GA4**: https://support.google.com/analytics
- **Meta Pixel**: https://www.facebook.com/business/help/742478679120153
- **TikTok Pixel**: https://ads.tiktok.com/help/article?aid=10000357
- **LinkedIn**: https://www.linkedin.com/help/lms/answer/a427660
