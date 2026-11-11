/* Clinic Management Tech · product catalog (example) + product photo helper
   PHOTOS: `img` is either a full https:// URL (official brand / retailer
   packshots, used below) or a file name inside assets/products/ if you prefer
   to host the photos yourself (run assets/products/download.sh once).
   If a photo fails to load, a brand monogram is shown instead. */
(() => {
  'use strict';
  const L = window.CMT_LANG === 'es' ? 'es' : 'en';
  const T = (en, es) => (L === 'es' ? es : en);

  // price: example sale price (CMT_CONFIG.CURRENCY). days: approximate supply, used for refill reminders.
  const CATALOG = {
    clean:   { brand: 'Sensilis',       ab: 'SE',  name: 'Purify Essential Cleanser',            type: T('Cleansing gel', 'Gel limpiador'),                    price: 32,  days: 60, img: 'https://sensilis.com/uploaded/products/PURIFY-pdr-0-purify-essential.png' },
    foam:    { brand: 'Sensilis',       ab: 'SE',  name: 'Gentle Cleansing',                     type: T('Cleansing foam, sensitive skin', 'Espuma limpiadora, piel sensible'), price: 29, days: 60, img: 'https://sensilis.com/uploaded/products/MOUSSE_PDR.png' },
    spf:     { brand: 'Colorescience',  ab: 'CS',  name: 'Sunforgettable Total Protection Face Shield Classic SPF 50', type: T('Tinted mineral sunscreen', 'Protector mineral con color'), price: 69, days: 45, img: 'https://static.thcdn.com/productimg/original/11814869-8465238533090118.jpg' },
    vitc:    { brand: 'SkinCeuticals',  ab: 'SC',  name: 'C E Ferulic',                          type: T('Vitamin C antioxidant serum', 'Sérum antioxidante vitamina C'), price: 182, days: 60, img: 'https://static.thcdn.com/productimg/original/11705727-4725323826126148.jpg' },
    disc:    { brand: 'SkinCeuticals',  ab: 'SC',  name: 'Phloretin CF',                         type: T('Antioxidant serum for dark spots', 'Sérum antioxidante para manchas'), price: 182, days: 60, img: 'https://static.thcdn.com/productimg/1600/1600/11920552-1294818355915284.jpg' },
    b5:      { brand: 'La Roche-Posay', ab: 'LRP', name: 'Cicaplast Baume B5+',                   type: T('Repair balm', 'Bálsamo reparador'),                  price: 18,  days: 30, img: 'https://static.thcdn.com/productimg/original/13938507-1255335527984675.jpg' },
    tol:     { brand: 'La Roche-Posay', ab: 'LRP', name: 'Toleriane Sensitive',                  type: T('Soothing moisturizer', 'Crema calmante hidratante'),  price: 24,  days: 45, img: 'https://static.thcdn.com/productimg/original/11855111-1145335528389177.jpg' },
    oral:    { brand: 'Heliocare',      ab: 'HC',  name: 'Advanced Capsules',                             type: T('Oral photoprotection capsules', 'Cápsulas de fotoprotección oral'), price: 38, days: 30, img: 'https://www.cantabrialabs.com/dam/jcr:9bfedc33-4732-4bf0-98a1-513c08c1768b/4.Cantabria-Labs-26-9-24_1084_advance-oral-60.jpg' },
    gelspf:  { brand: 'Heliocare',      ab: 'HC',  name: '360° Water Gel SPF 50+',               type: T('Light gel sunscreen', 'Protector solar en gel ligero'), price: 34, days: 45, img: 'https://static.thcdn.com/productimg/original/15309145-1205318396461458.jpg' },
    retinal: { brand: 'ISDIN',          ab: 'IS',  name: 'Isdinceutics Retinal Intense',         type: T('Night retinal serum', 'Sérum de noche con retinal'), price: 85,  days: 60, img: 'https://www.isdin.com/sites/default/files/productos/imagenes/es_thumbnails_retinal_0.jpg' }
  };
  const PLANS = [
    { id: 'laser',   name: T('Post-laser recovery', 'Recuperación post-láser'),     am: ['clean', 'b5', 'spf'],           pm: ['clean', 'b5'] },
    { id: 'pigment', name: T('Pigmentation', 'Manchas y melasma'),                  am: ['clean', 'vitc', 'spf', 'oral'], pm: ['clean', 'disc'] },
    { id: 'aging',   name: T('Anti-aging', 'Antiedad'),                             am: ['clean', 'vitc', 'gelspf'],      pm: ['clean', 'retinal', 'tol'] },
    { id: 'red',     name: T('Redness & sensitivity', 'Rojeces y sensibilidad'),    am: ['foam', 'tol', 'spf'],           pm: ['foam', 'b5'] }
  ];

  const src = (p) => /^https?:/.test(p.img) ? p.img : 'assets/products/' + p.img;
  // Returns the markup for a product photo; falls back to a monogram if the photo is missing.
  const photo = (id) => {
    const p = CATALOG[id]; if (!p) return '';
    return `<img src="${src(p)}" alt="${p.brand} ${p.name}" loading="lazy" referrerpolicy="no-referrer" onerror="this.outerHTML='<span class=&quot;ab&quot;>${p.ab}</span>'">`;
  };
  const fill = (root = document) => root.querySelectorAll('.pimg[data-p]').forEach(el => { if (!el.dataset.done) { el.innerHTML = photo(el.dataset.p); el.dataset.done = 1; } });
  document.addEventListener('DOMContentLoaded', () => fill());

  window.CMT_CATALOG = { CATALOG, PLANS, photo, fill, T, L };
})();
