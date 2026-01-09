# GA4 E-Commerce Analytics - Implementierungs-Dokumentation

## Übersicht

Die GA4 E-Commerce Tracking-Implementierung erfasst alle wichtigen Conversion-Schritte im Webflix-System gemäß den [offiziellen GA4 E-Commerce Guidelines](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?hl=de&client_type=gtag).

## Implementierte Events

### 1. **view_item_list** - Shop-Seite wird geladen
**Wann:** User besucht die Shop-Seite (`/shop`)
**Datei:** `src/components/shop/NewShopPage.tsx`
**Daten:**
- Liste aller verfügbaren Website-Templates
- Item-IDs, Namen, Preise, Kategorien
- Liste-ID: `shop_page`

```typescript
trackViewItemList({
  item_list_id: 'shop_page',
  item_list_name: 'Website Templates Shop',
  items: [...]
});
```

### 2. **select_item** - Template wird ausgewählt
**Wann:** User klickt auf "Jetzt konfigurieren" bei einem Template
**Datei:** `src/components/shop/NewShopPage.tsx`
**Daten:**
- Template-ID, Name, Preis
- Kategorie (Branche)
- Liste-Kontext (woher kam der Klick)

```typescript
trackSelectItem({
  item_id: product.id,
  item_name: product.name,
  price: product.basePrice,
  item_category: product.industry,
  item_list_id: 'shop_page'
});
```

### 3. **begin_checkout** - Checkout-Prozess startet
**Wann:** User landet auf der Checkout-Seite (`/checkout`)
**Datei:** `src/components/checkout/CheckoutPage.tsx`
**Daten:**
- Ausgewähltes Template mit Preis
- Alle aktivierten Add-ons als separate Items
- Gesamt-Warenwert

```typescript
trackBeginCheckout({
  items: [{
    item_id: 'webflix-template',
    item_name: 'Webflix Website',
    price: 29.90,
    item_category: 'website',
    quantity: 1
  }, ...addons],
  value: totalValue,
  currency: 'EUR'
});
```

### 4. **add_shipping_info** - Persönliche Daten ausgefüllt
**Wann:** User geht von Schritt 1 zu Schritt 2 im Checkout
**Datei:** `src/components/checkout/CheckoutPage.tsx`
**Daten:**
- Alle Cart-Items
- Gesamt-Warenwert
- Event-Type: `shipping_info`

```typescript
trackCheckoutStep({
  step: 'shipping_info',
  items: [...],
  value: totalValue,
  currency: 'EUR'
});
```

### 5. **add_payment_info** - Firmendaten ausgefüllt
**Wann:** User geht von Schritt 2 zu Schritt 3 im Checkout
**Datei:** `src/components/checkout/CheckoutPage.tsx`
**Daten:**
- Alle Cart-Items
- Gesamt-Warenwert
- Payment-Type: `stripe`

```typescript
trackCheckoutStep({
  step: 'payment_info',
  items: [...],
  value: totalValue,
  currency: 'EUR',
  payment_type: 'stripe'
});
```

### 6. **purchase** - Zahlung erfolgreich abgeschlossen
**Wann:** User landet auf der Success-Seite nach erfolgreicher Stripe-Zahlung
**Datei:** `src/components/checkout/CheckoutSuccess.tsx`
**Daten:**
- **Eindeutige Transaction-ID** (Order Number)
- Template + Add-ons als Items
- Gesamt-Betrag, Tax, Shipping
- Währung: EUR

```typescript
trackPurchase({
  transaction_id: 'WF-1234567890',
  value: 29.90,
  tax: 0,
  shipping: 0,
  currency: 'EUR',
  items: [...]
});
```

## Analytics-Library

**Datei:** `src/lib/analytics.ts`

Die zentrale Analytics-Library stellt folgende Funktionen bereit:

### Hauptfunktionen

| Funktion | Beschreibung | GA4 Event |
|----------|-------------|-----------|
| `trackViewItem()` | Einzelnes Produkt anzeigen | `view_item` |
| `trackViewItemList()` | Produktliste anzeigen | `view_item_list` |
| `trackSelectItem()` | Produkt aus Liste auswählen | `select_item` |
| `trackAddToCart()` | Zum Warenkorb hinzufügen | `add_to_cart` |
| `trackRemoveFromCart()` | Aus Warenkorb entfernen | `remove_from_cart` |
| `trackViewCart()` | Warenkorb anzeigen | `view_cart` |
| `trackBeginCheckout()` | Checkout starten | `begin_checkout` |
| `trackCheckoutStep()` | Checkout-Schritt | `add_shipping_info` / `add_payment_info` |
| `trackPurchase()` | Kauf abschließen | `purchase` |
| `trackRefund()` | Erstattung | `refund` |
| `trackCustomEvent()` | Custom Event | beliebig |

### GA4 Items-Struktur

Alle Events verwenden die standardisierte GA4 Items-Struktur:

```typescript
interface GA4Item {
  item_id: string;           // Erforderlich: Template-ID oder Add-on-ID
  item_name: string;         // Erforderlich: Template-Name
  price: number;             // Preis pro Item
  quantity: number;          // Anzahl (meist 1)
  item_category: string;     // Branche (z.B. "autoaufbereitung")
  item_brand: string;        // Immer "Webflix"

  // Optional:
  coupon?: string;
  discount?: number;
  item_variant?: string;
  item_list_id?: string;
  item_list_name?: string;
  index?: number;
}
```

## DataLayer & GTM

### DataLayer-Struktur

Alle Events werden in den `window.dataLayer` gepusht:

```javascript
window.dataLayer.push({
  event: 'purchase',
  ecommerce: {
    transaction_id: 'WF-1234567890',
    value: 29.90,
    currency: 'EUR',
    tax: 0,
    shipping: 0,
    items: [{
      item_id: 'auto-premium-1',
      item_name: 'AutoPflege Premium',
      price: 29.90,
      item_category: 'autoaufbereitung',
      item_brand: 'Webflix',
      quantity: 1
    }]
  }
});
```

### Google Tag Manager Setup

**Container-ID:** `GTM-MRC63FD6`
**Datei:** `index.html` (bereits konfiguriert)

Der GTM ist nur auf `webflix.info` und `www.webflix.info` aktiv.

## Wichtige Hinweise

### ✅ Best Practices

1. **Ecommerce-Objekt clearen:** Vor jedem Event wird `ecommerce: null` gepusht
2. **Eindeutige Transaction-IDs:** Order Numbers sind immer unique (`WF-{timestamp}`)
3. **Währung konsistent:** Immer `EUR` für alle Preise
4. **Items-Array:** Max. 200 Items pro Event (laut GA4)
5. **Quantity:** Immer mindestens 1

### 🔍 Testing

**Browser Console:**
```javascript
// DataLayer inspizieren
console.log(window.dataLayer);

// Letztes Event anzeigen
console.log(window.dataLayer[window.dataLayer.length - 1]);
```

**Google Tag Manager Preview Mode:**
1. In GTM: Workspace → Preview
2. URL eingeben: `https://webflix.info`
3. Events in Echtzeit überwachen

**GA4 DebugView:**
1. In GA4: Configure → DebugView
2. Browser mit Debug-Extension verwenden
3. Events erscheinen in Echtzeit

### 🚨 Debugging

**Console Logging:**
Alle Events werden automatisch in der Console geloggt:
```
[GA4 Analytics] purchase { event: 'purchase', ecommerce: {...} }
```

**Häufige Fehler:**
- ❌ Fehlende `transaction_id` beim Purchase
- ❌ Negative Preise oder `value: 0`
- ❌ Leeres `items`-Array
- ❌ Fehlende Währung bei Value-Daten

## Conversion-Funnel

```
1. view_item_list     → Shop-Seite besucht
          ↓
2. select_item        → Template ausgewählt
          ↓
3. begin_checkout     → Checkout gestartet
          ↓
4. add_shipping_info  → Schritt 1 abgeschlossen
          ↓
5. add_payment_info   → Schritt 2 abgeschlossen
          ↓
6. purchase           → Zahlung erfolgreich
```

## Erweiterungen

### Weitere Events hinzufügen

Beispiel: `add_to_cart` beim Aktivieren von Add-ons

```typescript
import { trackAddToCart } from '../../lib/analytics';

const handleAddOnToggle = (addon: AddOn) => {
  if (!addon.enabled) {
    trackAddToCart({
      item_id: addon.id,
      item_name: addon.name,
      price: addon.price,
      item_category: 'addon',
      quantity: 1
    });
  }
};
```

### Custom Events

```typescript
import { trackCustomEvent } from '../../lib/analytics';

// Beispiel: Newsletter-Anmeldung
trackCustomEvent('newsletter_signup', {
  method: 'footer_form',
  email_domain: 'gmail.com'
});
```

## Support & Referenzen

- **GA4 E-Commerce Docs:** https://developers.google.com/analytics/devguides/collection/ga4/ecommerce
- **GTM DataLayer:** https://developers.google.com/tag-platform/tag-manager/datalayer
- **GA4 Events Reference:** https://support.google.com/analytics/answer/9267735

---

**Implementiert:** 2025-10-29
**Status:** ✅ Produktiv
**Version:** 1.0
