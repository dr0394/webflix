# Quick Reference - Autoaufbereitung V3

## Access the Demo
```
URL: /demo/autoaufbereitung-v3
File: /src/demos/autoaufbereitung/LandingV3.tsx
```

## Section Anchor IDs
- `#hero` - Hero section
- `#services` - Services section
- `#before-after` - Before/After comparisons
- `#gallery` - Image gallery
- `#contact` - Booking form & contact

## Placeholder Images to Replace
```
/public/hero-detailing.jpg          Hero background
/public/before-1a.jpg               Before/After 1 (before)
/public/before-1b.jpg               Before/After 1 (after)
/public/before-2a.jpg               Before/After 2 (before)
/public/before-2b.jpg               Before/After 2 (after)
/public/before-3a.jpg               Before/After 3 (before)
/public/before-3b.jpg               Before/After 3 (after)
/public/gallery-1.jpg through       Gallery images
/public/gallery-12.jpg              (12 total)
```

## Search & Replace for Production

| Placeholder | Replace With |
|-------------|--------------|
| `AutoPflege Premium` | Your business name |
| `+49 123 456 789` | Your phone |
| `kontakt@autopflege-premium.de` | Your email |
| `Musterstraße 123, 12345 Musterstadt` | Your address |
| `https://www.instagram.com/autopflegepremium` | Your Instagram |

## Mock API Endpoint
**Current:** Console log only
**Location:** `handleBookingSubmit()` function (line ~95)
**Replace with:** Your real booking API endpoint

## JSON-LD Data to Update
**Location:** `useEffect` hook (line ~120-180)
**Update:**
- Business details
- Coordinates (lat/long)
- Opening hours
- Social media links

## Key Features
✅ Smooth scroll navigation
✅ Mobile responsive
✅ Booking form with validation
✅ SEO optimized (JSON-LD)
✅ Professional animations
✅ Console logging for debug

## Documentation
- `AUTOAUFBEREITUNG_V3_README.md` - Full guide
- `IMPLEMENTATION_SUMMARY.md` - What was built
- Top of `LandingV3.tsx` - Inline instructions

## Test Checklist
- [ ] View at `/demo/autoaufbereitung-v3`
- [ ] Test navigation scroll
- [ ] Submit booking form (check console)
- [ ] Test on mobile device
- [ ] Replace all images
- [ ] Update contact info
- [ ] Connect real API
- [ ] Add Google Maps
- [ ] Build production version
- [ ] Deploy

## Build Command
```bash
npm run build
```

## Status
✅ All requirements met
✅ Build successful
✅ Ready for customization
