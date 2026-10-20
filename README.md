# El Garhy Group — Website

Bilingual (Arabic / English) cinematic website for **مجموعة الجارحي للاستثمار والتنمية**, built with **Next.js 16**, **GSAP 3.15** (ScrollTrigger, SplitText, Flip, DrawSVG) and **Lenis** smooth scrolling.

- Arabic (RTL) is served at `/`, English at `/en/`.
- Fully static: `npm run build` exports plain HTML/CSS/JS to `out/`, deployable to any host (Netlify, Vercel, GitHub Pages, cPanel…).

## Experience

| Section | Motion |
| --- | --- |
| Preloader | 000→100 counter, molten progress bar, curtain wipe |
| Hero | Real-time WebGL molten-steel shader that follows the pointer; headline revealed per word (Arabic) / per letter (English); parallax fade on scroll |
| Story | Pinned manifesto that lights up word by word |
| Numbers | Count-up figures with drawn rules |
| Sectors | Pinned horizontal gallery (reverses for RTL) with self-drawing line art |
| Steel | Photo opens from a window to full bleed while “خلّي قلبك حديد.” rises |
| Brands | Two endless logo rows that speed up / reverse with scroll velocity |
| Companies | Index list with filter (GSAP Flip) and a floating logo preview that trails the cursor |
| Values | Sticky stacking cards that recede as the next one arrives |
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

## Content to confirm with the client

- **Phone number** — the old site shows `38/36/37627935`; the site uses `+20 2 3762 7935` as a best guess.
- **Photography** — the steel section uses a 1110px video frame; high-resolution factory photos (≥ 2400px) would lift it further.
- **Board portraits** — initials are shown until real photos are provided.
- **Sun Beach ownership %** and the Import & Export company description were missing or mismatched on the old site.
- **Social media links** — omitted until correct URLs are provided.
- The contact form opens the visitor's email app (`mailto:`); connect a form service if server-side submissions are needed.
