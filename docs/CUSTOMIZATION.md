# Customization Guide

Most store settings can be updated without touching HTML structure.

## 1. Store Prices, Contact & Backend URL

Edit `js/config.js`:

```javascript
const CONFIG = {
    siteName: "Le Gentleman",
    tagline: "Les Chemises",
    whatsappNumber: "213561069167",
    currency: "DA",
    shirtPrice: 4000,
    scriptURL: "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec",
    // ...
};
```

- **`shirtPrice`**: Base unit price for shirts used on the checkout page (`order.js`). Remember to also update the displayed price text in `index.html` (`<p class="card-price">`) and `order.html` (`<p class="preview-price">`).
- **`whatsappNumber`**: International format without `+` (used for reference). Update `href="https://wa.me/..."` links in HTML footers and WhatsApp FABs if the store phone changes.
- **`scriptURL`**: Your published Google Apps Script Web App URL.

## 2. Products & Sizes

In `js/config.js`:

- **`products`**: Array of `{ id, image, i18nKey }` objects.
  - Adding a new shirt requires:
    1. Placing its image inside `assets/`
    2. Adding an entry to `CONFIG.products`
    3. Adding matching `fr` and `ar` translation keys to `js/lang.js`
    4. Adding a product card in `index.html` linking to `order.html?product=<id>`
- **`sizes`**: Array of size options (`["S", "M", "L", "XL", "XXL"]`).

## 3. Wilayas & Delivery Tariffs

All 58 Algerian wilayas and their delivery fees (in DA) are stored in `CONFIG.wilayas` inside `js/config.js`.
Modify any wilaya's numeric value to immediately update checkout delivery fees and totals.

## 4. Translations (French & Arabic)

All UI copy lives in `js/lang.js` inside `translations.fr` and `translations.ar`.

- Elements with `data-i18n="key"` update their `textContent`.
- Inputs with `data-i18n-placeholder="key"` update their `placeholder`.
- Elements with `data-i18n-aria="key"` update their `aria-label`.
- Selecting `AR` automatically sets `document.documentElement.lang = "ar"` and `document.body.dir = "rtl"` (persisted in `localStorage`).

## 5. Theme & Colors

Design tokens are defined at the top of `css/style.css` under `:root`:

- `--gold`: `#B68D2A`
- `--gold-light`: `#d4a94e`
- `--gold-dark`: `#8a6a1e`
- `--black`: `#0a0a0a`
- `--text-light`: `#e8e8e8`
- `--text-dark`: `#2B241D`
