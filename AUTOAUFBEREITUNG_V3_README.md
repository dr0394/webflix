# Autoaufbereitung Landing Page - V3 Architecture

## Overview
This is a production-ready landing page for an auto detailing business, built with React, TypeScript, Framer Motion, and Tailwind CSS.

## File Structure
```
/src/demos/autoaufbereitung/LandingV3.tsx - Main landing page component
/public/hero-detailing.jpg - Hero section background
/public/before-[1-3][a-b].jpg - Before/after comparison images (6 total)
/public/gallery-[1-12].jpg - Gallery images (12 total)
```

## Page Sections (in order)
1. **Header/Navigation** - Fixed header with smooth scroll navigation
2. **Hero (#hero)** - Full-screen hero with background image and CTA
3. **Services (#services)** - 6 service cards with descriptions
4. **Before/After (#before-after)** - 3 before/after comparison pairs
5. **Gallery (#gallery)** - 12-image grid gallery
6. **Contact/Booking (#contact)** - Booking form with contact information
7. **Footer** - Business info and quick links

## Features Implemented

### ✅ Smooth Scroll Navigation
- All navigation links use `scrollToSection()` function
- Smooth scroll behavior enabled via CSS
- Active section tracking with scroll listener
- Mobile-responsive hamburger menu

### ✅ Mock Booking API
- Form submission handler: `handleBookingSubmit()`
- Console logs booking requests with timestamp
- Returns `{ok: true}` response
- Ready to connect to real backend endpoint

### ✅ JSON-LD Structured Data
Two structured data schemas injected into `<head>`:

1. **LocalBusiness Schema**
   - Business name, address, phone, email
   - Opening hours
   - Geographic coordinates
   - Social media links (Instagram)
   - Price range indicator

2. **WebSite Schema with SearchAction**
   - Website name and URL
   - Search functionality schema
   - Query input template

### ✅ Anchor IDs
All sections have proper anchor IDs:
- `#hero`
- `#services`
- `#before-after`
- `#gallery`
- `#contact`

## What to Replace for Production

### 1. Images
Replace placeholder SVGs with real images:
- `/public/hero-detailing.jpg` - High-quality hero image (1920x1080 recommended)
- `/public/before-1a.jpg` & `/public/before-1b.jpg` - Before/After pair 1
- `/public/before-2a.jpg` & `/public/before-2b.jpg` - Before/After pair 2
- `/public/before-3a.jpg` & `/public/before-3b.jpg` - Before/After pair 3
- `/public/gallery-1.jpg` through `/public/gallery-12.jpg` - Gallery images (600x600 square format recommended)

### 2. Contact Information
Search and replace these placeholders:

**Business Name:**
- `AutoPflege Premium` → Your business name

**Phone:**
- `+49 123 456 789` → Your phone number
- `tel:+49123456789` → Your phone link (remove spaces)

**Email:**
- `kontakt@autopflege-premium.de` → Your email

**Address:**
- `Musterstraße 123, 12345 Musterstadt` → Your address

**Social Media:**
- `https://www.instagram.com/autopflegepremium` → Your Instagram URL

### 3. Geographic Coordinates
Update in JSON-LD structured data:
```javascript
"geo": {
  "@type": "GeoCoordinates",
  "latitude": "51.1657",  // Your latitude
  "longitude": "10.4515"   // Your longitude
}
```

### 4. API Integration
Replace mock booking handler in `handleBookingSubmit()`:

**Current (Mock):**
```javascript
console.log('Booking Request:', { timestamp, formData });
const response = { ok: true };
```

**Replace with:**
```javascript
const response = await fetch('/api/booking', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(bookingForm)
});
const result = await response.json();
```

### 5. Google Maps Integration
Replace the map placeholder in the Contact section:
```javascript
// Current:
<div className="bg-gray-200 rounded-2xl h-64 flex items-center justify-center">
  <p className="text-gray-500">Google Maps Integration hier</p>
</div>

// Replace with:
<iframe
  src="https://www.google.com/maps/embed?pb=YOUR_EMBED_URL"
  width="100%"
  height="256"
  style={{ border: 0, borderRadius: '1rem' }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
></iframe>
```

### 6. Opening Hours
Update in JSON-LD and contact section to match your business hours.

## Routing
Access the page at: `/demo/autoaufbereitung-v3`

The route is configured in `App.tsx`:
```typescript
<Route path="/demo/autoaufbereitung-v3" element={<AutoaufbereitungDemoV3 />} />
```

## Technical Details

### Dependencies
- React 18+
- TypeScript
- Framer Motion (animations)
- Lucide React (icons)
- Tailwind CSS (styling)

### State Management
Uses React hooks for local state:
- `isMenuOpen` - Mobile menu toggle
- `activeSection` - Current scroll section tracking
- `bookingForm` - Form data management

### Responsive Design
- Mobile-first approach
- Breakpoints: `sm`, `md`, `lg`
- Hamburger menu for mobile
- Grid layouts adapt to screen size

### Performance Features
- `background-attachment: fixed` for parallax hero
- Framer Motion with `viewport={{ once: true }}` for one-time animations
- Optimized image loading (once real images are added, consider lazy loading)

## SEO Optimization
- Dynamic page title
- Meta description
- Structured data (LocalBusiness + WebSite)
- Semantic HTML
- Proper heading hierarchy
- Alt text for images

## Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Smooth scroll with fallback
- CSS Grid with fallback

## Next Steps
1. Replace all placeholder images with professional photos
2. Update all contact information
3. Integrate real booking API endpoint
4. Add Google Maps embed
5. Test form submissions
6. Add analytics tracking
7. Optimize images for web
8. Add loading states for form submission
9. Consider adding reCAPTCHA to booking form
10. Test on multiple devices and browsers

## Support
For questions about implementation, refer to the inline comments in `LandingV3.tsx`.
The file has a comprehensive comment block at the top with all replacement instructions.
