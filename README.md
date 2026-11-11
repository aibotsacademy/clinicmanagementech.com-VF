# Clinic Management Tech · landing

Static site, no build step. Works on GitHub Pages as-is.

```
index.html          page markup + CONFIG (top of <head>)
css/styles.css      all styles
js/app.js           nav, scroll-driven hero video, solutions, voice-note tabs, patient-app tabs, demo form
js/sections.js      story (clinic · doctor · patient), clinic console modules, GEO strategy
js/catalog.js       product catalog, treatment plans and product photos
js/i18n.js          language detection + Spanish texts
js/shop.js          clinic shop simulation
js/savia.js         Savia patient assistant (local rules, or your Apps Script endpoint)
assets/             logo.png, poster.jpg, app-scan.mp4 (hero recording)
```

## Configure
Edit `window.CMT_CONFIG` in `index.html`: `WHATSAPP`, `ENDPOINT` (Apps Script /exec URL; receives `lead`, `chat`, `appointment`, `alert`), `GEO_URL`, `INSTAGRAM`, `CURRENCY`.

## Edit the shop catalog
`js/shop.js` → `CATALOG` (brand, product, price, days of supply) and `PLANS` (morning/night steps per treatment). Prices and products are examples.

Note: the hero video is fetched from `assets/`, so open the site through a web server (GitHub Pages, or `python3 -m http.server`) rather than double-clicking the file.

## Languages (EN / ES)
The page detects the visitor's language: `?lang=es|en` in the URL → the visitor's last choice (ES/EN switch in the nav) → browser language (any `es-*` gets Spanish, everything else English).
`index.html` is written in English; Spanish texts live in `js/i18n.js` (dictionary keyed by the English text). Texts built by JavaScript (hero steps, solutions, shop, Savia) carry both languages inline with `T('English', 'Español')`.
If you change an English text in `index.html`, update its key in `js/i18n.js` too.

## Product photos
`js/catalog.js` points each product to its official photo (brand site or retailer packshot):
Sensilis Purify Essential Cleanser and Gentle Cleansing (sensilis.com), Colorescience Face Shield Classic SPF 50, SkinCeuticals C E Ferulic and Phloretin CF, La Roche-Posay Cicaplast Baume B5+ and Toleriane Sensitive, Heliocare 360° Water Gel (static.thcdn.com, LOOKFANTASTIC/Dermstore), Heliocare Advanced Capsules (cantabrialabs.com), ISDIN Retinal Intense (isdin.com).

Hot-linked images can change or be blocked by the source. To host them yourself: run `assets/products/download.sh`, then replace each `img` URL in `js/catalog.js` with the downloaded file name. If a photo fails to load, the brand monogram is shown. Product photos belong to their brands; confirm usage with your distributor.

## Photos of people
Story and before & after use free photos from Unsplash (images.unsplash.com), linked in `js/sections.js` (`STORY[].img` and the `U()` helper).
Before & after: without cases, the slider shows a capture vs. its analysis (demo). Real results must be your clinic's own consented cases: add them in `CMT_CONFIG.CASES` (index.html).

## Brand palette & type
Defined once at the top of `css/styles.css` (`:root`): Porcelain #F8F3EC (background), White #FFFFFF (surfaces), Ink #211A18 (text), Warm gray #665954 (secondary text), Burgundy #713C47 (blocks, primary button), Wine #3F2127 (footer), Terracotta #934633 (accents, links), Decorative terracotta #C36A55, Bronze #80512E, Champagne #F0D28B (accent on dark), Teal #2E645E (progress), Pale rose #F6E0D3 (light blocks), Light line #DFD2C4, Dark line #8E6068.
Rules: champagne and decorative terracotta are never text on porcelain; body text keeps ≥ 4.5:1 contrast.
Fonts: Belleza (titles), EB Garamond (editorial: leads, quotes, italic accents), Manrope (interface and numbers).

## Diagnóstico (diagnostico.html)
Free clinic diagnosis linked from the "Diagnosticar mi clínica" button in the nav (and the GEO section). It scans the clinic's website (Apps Script backend set in `<meta name="gas-endpoint">`) and runs a questionnaire: clinic, demand, sales, processes, **store & products (e-commerce: Shopify, WooCommerce, JavaScript/custom, Wix, Tiendanube, VTEX, marketplace, other)**, goals and contact.
At the end, `recommend()` scores the answers and shows the Clinic Management Tech modules that fit the clinic best (top 3 + others), with the reasons taken from the answers. They are also added to the PDF, the WhatsApp share text and the payload (`profile.recommendedModules`, `profile.ecommerce`).
Spanish only. Styled with the same palette and fonts as the site.
