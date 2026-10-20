"use client";

import { useRef } from "react";
import type { Dict } from "@/lib/content";
import { gsap, useGSAP, MOTION } from "@/lib/gsap";
import { scrollToHash } from "@/lib/scroll";

const WORDMARK = "ELGARHY".split("");

export default function Footer({ t }: { t: Dict }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION.motion, () => {
        gsap.from(".wordmark span", {
          yPercent: 100,
          ease: "none",
          stagger: 0.06,
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom bottom", scrub: 0.8 },
        });
      });
    },
    { scope: root },
  );

  const go = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    scrollToHash(href);
  };

  return (
    <footer ref={root} className="footer">
      <div className="container">
        <div className="footer__top">
          <img src="/img/logo-group-white.png" alt="El Garhy Group" width={103} height={40} loading="lazy" />
          <nav className="footer__nav" aria-label="Footer">
            {t.nav.links.map((l) => (
              <a key={l.href} href={l.href} onClick={(e) => go(e, l.href)}>
                {l.label}
              </a>
            ))}
            <a href={t.nav.switchHref} lang={t.nav.switchLang}>
              {t.nav.switchLabel}
            </a>
          </nav>
          <a className="footer__top-link" href="#top" onClick={(e) => go(e, "#top")}>
            {t.footer.top} <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>

      <div className="wordmark" aria-hidden="true" dir="ltr">
        {WORDMARK.map((ch, i) => (
          <span key={i}>{ch}</span>
        ))}
      </div>

      <div className="container footer__bottom">
        <p>
          © {new Date().getFullYear()} {t.footer.rights}
        </p>
        <p>{t.footer.place}</p>
      </div>
    </footer>
  );
}
