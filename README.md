# El Garhy Group — Website redesign

A new bilingual (Arabic / English) single-page website for **مجموعة الجارحي للاستثمار والتنمية**, replacing the WordPress template at `wp-garhygroup.opream.net`.

The visual language follows the [apple-design-skill](https://github.com/chaos-xxl/apple-design-skill) rules — generous whitespace, typography-first hierarchy, a restrained palette (`#FFFFFF` / `#F5F5F7` / `#1D1D1F`), pill buttons, 18–28px card radii, multi-layer shadows and Apple's 734 / 1068 / 1440px breakpoints — with the brand's steel orange (`#EF6A29`, sampled from the Elgarhy Steel logo) used in place of Apple's link blue.

## Structure

```
index.html            Page markup (Arabic is the default, RTL)
assets/css/style.css  Design tokens + components
assets/js/i18n.js     English strings (Arabic lives in the HTML)
assets/js/main.js     Language toggle, nav, scroll reveal, filters, lightbox, contact form
assets/img/           Logos, certificates and hero photo (taken from the current site, converted to WebP)
```

## Sections

Hero → About & key numbers → Six sectors → Steel spotlight (Suez & Obour plants, brands, ISO) → 15 group companies with filters → Mission, vision & values → Certificates (click to enlarge) → Board of directors → Contact.

## Run locally

It is a static site — no build step:

```bash
python3 -m http.server 8000
# open http://localhost:8000      (Arabic)
# open http://localhost:8000/?lang=en  (English)
```

Deploy by uploading the folder to any static host (Netlify, Vercel, GitHub Pages, cPanel…).

## Content to confirm with the client

- **Phone number** — the old site shows `38/36/37627935`; the new site uses `+20 2 3762 7935` as a best guess.
- **Hero photo** — currently a 1110px frame from a video; a high-resolution factory photo (≥ 1920px) will look much sharper.
- **Board photos** — the old site used stock avatars, so the new design shows initials until real portraits are provided.
- **Sun Beach ownership %** and the description of the Import & Export company were missing or mismatched on the old site.
- **Social media links** — the old ones pointed to the wrong sites, so they were left out until correct URLs are provided.
- The contact form opens the visitor's email app (`mailto:`); connect it to a form service if server-side submissions are needed.
