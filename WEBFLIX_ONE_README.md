# Webflix One - Dynamic One-Pager Framework

A production-ready, data-driven framework for building dynamic one-page websites with per-industry branding and content management.

## Architecture Overview

### Stack
- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **SEO**: react-helmet-async

### Core Components

#### 1. Section Registry (`src/components/webflix-one/SectionRegistry.tsx`)
Centralized registry of all available section components:
- **Hero** - Full-screen hero with CTA
- **Features** - Grid of features with icons
- **Services** - Service cards with images
- **CTA** - Call-to-action banner
- **Testimonials** - Customer testimonials with ratings
- **Pricing** - Pricing tiers
- **FAQ** - Collapsible FAQ items
- **Contact** - Contact info with optional map
- **BeforeAfter** - Interactive before/after image sliders
- **PortfolioGrid** - Filterable portfolio items

#### 2. Dynamic Page Renderer (`src/components/webflix-one/DynamicPage.tsx`)
Fetches industry data and renders sections dynamically:
- Loads industry configuration by slug
- Applies theme tokens (colors, fonts)
- Renders visible sections in order
- Handles SEO meta tags
- Gracefully handles missing sections

#### 3. Admin Panel (`src/components/webflix-one/admin/AdminPanel.tsx`)
Password-protected admin interface:
- **Password**: `webflix_admin_2024`
- Toggle section visibility
- Drag & drop reordering
- Edit section props (JSON)
- Multi-industry support
- Real-time updates

### Database Schema

#### Tables

**industries**
```sql
- id (uuid, PK)
- slug (text, unique) - URL identifier
- name (text) - Display name
- theme (jsonb) - { brand, text, accent, background, font }
- seo (jsonb) - { title, description, image }
- is_active (boolean)
```

**pages**
```sql
- id (uuid, PK)
- industry_id (uuid, FK)
- slug (text) - Usually 'home'
- layout (jsonb) - Reserved for future use
```

**sections**
```sql
- id (uuid, PK)
- page_id (uuid, FK)
- key (text) - Section type (Hero, Features, etc.)
- props (jsonb) - Component props
- visible (boolean) - Show/hide toggle
- order (integer) - Display order
```

## Usage

### Viewing Pages

Visit any industry page using:
```
/dynamic/{industrySlug}
```

**Available Demo Industries:**
- `/dynamic/autoaufbereitung` - Auto Detailing
- `/dynamic/galabau` - Garden & Landscaping (includes BeforeAfter)
- `/dynamic/restaurant` - Restaurant

### Admin Access

1. Navigate to `/admin/webflix-one`
2. Login with password: `webflix_admin_2024`
3. Select industry from dropdown
4. Manage sections:
   - Toggle visibility (eye icon)
   - Delete sections (trash icon)
   - Drag & drop to reorder
   - Click "Edit Props" to modify content

### Adding New Industries

```sql
-- 1. Create industry
INSERT INTO industries (slug, name, theme, seo, is_active)
VALUES (
  'my-industry',
  'My Industry',
  '{"brand": "#3B82F6", "text": "#1F2937", "accent": "#10B981", "background": "#FFFFFF", "font": "Inter"}',
  '{"title": "My Industry", "description": "Description", "image": ""}',
  true
);

-- 2. Create page
INSERT INTO pages (industry_id, slug)
VALUES ((SELECT id FROM industries WHERE slug = 'my-industry'), 'home');

-- 3. Add sections
INSERT INTO sections (page_id, key, props, visible, "order")
VALUES (
  (SELECT id FROM pages WHERE industry_id = (SELECT id FROM industries WHERE slug = 'my-industry')),
  'Hero',
  '{"title": "Welcome", "subtitle": "...", "ctaText": "Get Started", "ctaLink": "#contact"}',
  true,
  0
);
```

### Section Props Reference

#### Hero
```json
{
  "title": "Main Heading",
  "subtitle": "Supporting text",
  "ctaText": "Button text",
  "ctaLink": "#anchor or /path",
  "backgroundImage": "https://..."
}
```

#### Features
```json
{
  "title": "Section Title",
  "subtitle": "Optional subtitle",
  "features": [
    {
      "icon": "star|shield|zap|heart|award|trending",
      "title": "Feature Title",
      "description": "Feature description"
    }
  ]
}
```

#### BeforeAfter
```json
{
  "title": "Section Title",
  "subtitle": "Optional subtitle",
  "images": [
    {
      "before": "https://...",
      "after": "https://...",
      "title": "Transformation Title"
    }
  ]
}
```

## Theme System

Theme tokens are applied via CSS custom properties:
- `--color-brand` - Primary brand color
- `--color-text` - Text color
- `--color-accent` - Accent color
- `--color-background` - Background color
- `--font-primary` - Font family

Example theme:
```json
{
  "brand": "#DC2626",
  "text": "#1F2937",
  "accent": "#F59E0B",
  "background": "#FFFFFF",
  "font": "Inter"
}
```

## Security

### Row Level Security (RLS)
- Public: Read access to active industries and their pages
- Admin: Full CRUD access (requires `role: 'admin'` in JWT metadata)
- All tables have RLS enabled

### Admin Authentication
- Simple password authentication in admin panel
- For production: Implement proper auth with Supabase Auth

## Extending the Framework

### Adding New Section Types

1. **Create component** in `src/components/webflix-one/sections/MySection.tsx`
2. **Define props interface** in `src/components/webflix-one/types.ts`
3. **Register component** in `src/components/webflix-one/SectionRegistry.tsx`
4. **Use in database** - Add sections with `key: 'MySection'`

### Missing Sections
If a section key doesn't exist in the registry, it is silently skipped (no errors). This allows for flexible content management.

## Seed Data

Run the seed script to populate with demo data:
```bash
psql -d your_database -f seed-webflix-one.sql
```

Or use Supabase SQL Editor:
```sql
-- Copy contents of seed-webflix-one.sql
```

## Production Checklist

- [ ] Update admin password or implement proper auth
- [ ] Configure Supabase RLS policies for your auth system
- [ ] Add image upload to Supabase Storage
- [ ] Set up analytics tracking
- [ ] Configure custom domain
- [ ] Add form submission handlers
- [ ] Implement caching strategy
- [ ] Add error boundaries
- [ ] Set up monitoring

## API Endpoints (Future)

Currently data is fetched directly from Supabase client. For public API:

```typescript
// GET /api/page?industry=slug
{
  "theme": { ... },
  "seo": { ... },
  "layout": [
    { "key": "Hero", "props": { ... } },
    { "key": "Features", "props": { ... } }
  ]
}
```

## Performance

- Sections load on-demand
- Images use lazy loading
- Database queries are optimized with indexes
- Theme tokens prevent CSS recalculation

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

Proprietary - Part of Webflix platform
