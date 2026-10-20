"use client";

import { useRef, useState } from "react";
import type { Dict } from "@/lib/content";
import { gsap, ScrollTrigger, useGSAP, MOTION } from "@/lib/gsap";
import { getLenis, scrollToHash } from "@/lib/scroll";

export default function Nav({ t }: { t: Dict }) {
  const root = useRef<HTMLElement>(null);
  const menuTl = useRef<gsap.core.Timeline | null>(null);
  const [open, setOpen] = useState(false);

  useGSAP(
    () => {
      const header = root.current!;

      // Solid background after the hero, hide on scroll down / show on scroll up.
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const y = self.scroll();
          header.classList.toggle("is-solid", y > window.innerHeight * 0.6);
          header.classList.toggle("is-hidden", self.direction === 1 && y > window.innerHeight);
          gsap.set(".nav__progress i", { scaleX: self.progress });
        },
      });

      // Highlight the link of the section in view.
      const links = gsap.utils.toArray<HTMLAnchorElement>(".nav__links a");
      links.forEach((link) => {
        const section = document.querySelector(link.getAttribute("href")!);
        if (!section) return;
        ScrollTrigger.create({
          trigger: section,
          start: "top 45%",
          end: "bottom 45%",
          onToggle: (self) => link.classList.toggle("is-active", self.isActive),
        });
      });

      const mm = gsap.matchMedia();
      mm.add(MOTION.motion, () => {
        menuTl.current = gsap
          .timeline({ paused: true })
          .fromTo(".menu", { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "expo.inOut" })
          .from(".menu__link span", { yPercent: 110, duration: 0.9, stagger: 0.06, ease: "expo.out" }, "-=0.35")
          .from(".menu__foot", { autoAlpha: 0, y: 20, duration: 0.6 }, "-=0.6");
      });
    },
    { scope: root },
  );

  const toggle = (next: boolean) => {
    setOpen(next);
    document.documentElement.classList.toggle("menu-open", next);
    const lenis = getLenis();
    if (next) lenis?.stop();
    else lenis?.start();
    if (menuTl.current) {
      if (next) menuTl.current.timeScale(1).play();
      else menuTl.current.timeScale(1.6).reverse();
    }
  };

  const go = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    if (open) toggle(false);
    scrollToHash(href);
  };

  return (
    <header ref={root} className={`nav ${open ? "is-open" : ""}`}>
      <div className="nav__bar container">
        <a className="nav__logo" href="#top" onClick={(e) => go(e, "#top")} aria-label="El Garhy Group">
          <img src="/img/logo-group-white.png" alt="El Garhy Group" width={88} height={34} />
        </a>

        <nav className="nav__links" aria-label={t.nav.menu}>
          {t.nav.links.map((l) => (
            <a key={l.href} href={l.href} onClick={(e) => go(e, l.href)}>
              <span className="nav__roll">
                <span>{l.label}</span>
                <span aria-hidden="true">{l.label}</span>
              </span>
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <a className="nav__lang" href={t.nav.switchHref} lang={t.nav.switchLang} hrefLang={t.nav.switchLang}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9s1.3-6.4 3.8-9z" />
            </svg>
            {t.nav.switchLabel}
          </a>
          <a className="nav__cta" href="#contact" onClick={(e) => go(e, "#contact")}>
            {t.nav.contact}
          </a>
          <button
            className="nav__burger"
            type="button"
            aria-expanded={open}
            aria-controls="menu"
            aria-label={open ? t.nav.close : t.nav.menu}
            onClick={() => toggle(!open)}
          >
            <i />
            <i />
          </button>
        </div>
      </div>
      <div className="nav__progress" aria-hidden="true">
        <i />
      </div>

      <div className="menu" id="menu" aria-hidden={!open}>
        <nav className="menu__links container">
          {[...t.nav.links, { href: "#contact", label: t.nav.contact }].map((l, i) => (
            <a key={l.href} className="menu__link" href={l.href} onClick={(e) => go(e, l.href)} tabIndex={open ? 0 : -1}>
              <span>
                <small>{String(i + 1).padStart(2, "0")}</small>
                {l.label}
              </span>
            </a>
          ))}
        </nav>
        <div className="menu__foot container">
          <a href="mailto:info@elgarhysteel.com" tabIndex={open ? 0 : -1}>info@elgarhysteel.com</a>
          <a href={t.nav.switchHref} lang={t.nav.switchLang} tabIndex={open ? 0 : -1}>
            {t.nav.switchLabel}
          </a>
        </div>
      </div>
    </header>
  );
}
