# El Garhy Group — Website

Bilingual (Arabic / English) cinematic website for **مجموعة الجارحي للاستثمار والتنمية**, built with **Next.js 16**, **GSAP 3.15** (ScrollTrigger, SplitText, Flip, DrawSVG) and **Lenis** smooth scrolling.

- Arabic (RTL) is served at `/`, English at `/en/`.
- Fully static: `npm run build` exports plain HTML/CSS/JS to `out/`, deployable to any host (Netlify, Vercel, GitHub Pages, cPanel…).

## Experience

| Section | Motion |
| --- | --- |
| Preloader | 000→100 counter, molten progress bar, curtain wipe |
| Hero | Film footage montage from the Elgarhy Steel film; headline revealed per word (Arabic) / per letter (English); parallax fade on scroll |
| Story | Pinned manifesto that lights up word by word |
| Numbers | Bento of figures: rising year ticks, company grid, Obour–Suez route, ISO seals |
| Sectors | Pinned horizontal gallery (reverses for RTL) with self-drawing line art |
| Steel | Rebar footage opens from a window to full bleed while “خلّي قلبك حديد.” rises; “Watch the film” plays the brand film |
| Brands | Two endless logo rows that speed up / reverse with scroll velocity |
| Companies | Index list with filter (GSAP Flip) and a floating logo preview that trails the cursor |
| Values | Five expanding panels with drawn icons; the active value opens in molten orange and they cycle while in view |
| Certificates | 3D tilt cards + lightbox |
| Leadership, Contact, Footer | Staggered reveals, magnetic buttons, giant wordmark rising on scroll |

Also: custom cursor, film grain, hide-on-scroll navigation with progress line, full-screen mobile menu. Everything respects `prefers-reduced-motion` (no smooth scroll, no pinning, static shader frame).

## Develop

```bash
npm install
npm run dev        # http://localhost:3000  (Arabic)  ·  /en (English)
npm run build      # static export to ./out
npm start          # serve ./out locally
```

## Deploy to Hostinger (or any Apache/LiteSpeed host)

```bash
npm run package    # builds and writes elgarhy-hostinger.zip (the contents of out/)
```

1. hPanel → **Websites → Manage → File Manager** → open `public_html` and delete the old site's files (back them up first if needed).
2. **Upload** `elgarhy-hostinger.zip` into `public_html`, right-click → **Extract** into `public_html` itself, then delete the zip.
3. `public_html` must now contain `index.html`, `.htaccess`, `_next/`, `en/`, `img/`, `video/` directly (not inside a sub-folder).
4. hPanel → **Security → SSL**: make sure SSL is active (the `.htaccess` forces HTTPS).

`public/.htaccess` ships with every build: HTTPS redirect, `/en` → `/en/`, the 404 page, MIME types for WebM/MP4/WebP/WOFF2, gzip, and long caching for hashed assets. The site must live at the domain root, since asset paths are absolute.

## Where things live

```
app/(ar)/          Arabic root layout + page  (/)
app/(en)/en/       English root layout + page (/en)
app/globals.css    Design system and all section styles
components/        One component per section; GSAP lives inside each via useGSAP()
lib/content.ts     All copy (ar + en), companies, board, certificates, contact
lib/gsap.ts        Plugin registration + shared media queries
public/img/        Logos, certificates, photo
```

To edit text, companies or board members, change `lib/content.ts` only.

Fonts ship with the project (Fontsource: Alexandria, IBM Plex Sans Arabic, Inter, Inter Tight), so builds work offline and need no Google Fonts download.

## Content to confirm with the client

- **Phone number** — the old site shows `38/36/37627935`; the site uses `+20 2 3762 7935` as a best guess.
- **Brand film** — the 45s Elgarhy Steel film and the rebar footage come from the current site; the film opens with the producer's “OUTLOOK” mark.
- **Board portraits** — initials are shown until real photos are provided.
- **Sun Beach ownership %** and the Import & Export company description were missing or mismatched on the old site.
- **Social media links** — omitted until correct URLs are provided.
- The contact form opens the visitor's email app (`mailto:`); connect a form service if server-side submissions are needed.
