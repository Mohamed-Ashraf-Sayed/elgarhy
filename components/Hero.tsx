"use client";

import { useRef } from "react";
import type { Dict, Locale } from "@/lib/content";
import { gsap, SplitText, useGSAP, MOTION } from "@/lib/gsap";
import MoltenCanvas from "./MoltenCanvas";
import MagneticButton from "./MagneticButton";

export default function Hero({ t, locale, ready }: { t: Dict; locale: Locale; ready: boolean }) {
  const root = useRef<HTMLElement>(null);

  // Hidden until the preloader lifts.
  useGSAP(
    () => {
      gsap.set(".hero__title, .hero__eyebrow, .hero__sub, .hero__ctas, .hero__meta > *", { autoAlpha: 0 });
    },
    { scope: root },
  );

  useGSAP(
    () => {
      if (!ready) return;
      const mm = gsap.matchMedia();

      mm.add(MOTION.motion, () => {
        // Arabic letters join, so Arabic is split by word; English gets per-character motion.
        const split = SplitText.create(".hero__line", {
          type: locale === "ar" ? "words,lines" : "chars,words,lines",
          mask: "lines",
        });
        const pieces = locale === "ar" ? split.words : split.chars;

        gsap
          .timeline({ delay: 0.15 })
          .fromTo(".molten", { scale: 1.25, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 2.4, ease: "expo.out" }, 0)
          .set(".hero__title", { autoAlpha: 1 }, 0)
          .from(pieces, { yPercent: 120, rotate: locale === "ar" ? 0 : 8, duration: 1.4, stagger: locale === "ar" ? 0.08 : 0.025, ease: "expo.out" }, 0.1)
          .fromTo(".hero__eyebrow", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 1 }, 0.35)
          .fromTo(".hero__sub", { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 1.2 }, 0.6)
          .fromTo(".hero__ctas", { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 1.2 }, 0.7)
          .fromTo(".hero__meta > *", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.1 }, 0.9);

        // Scroll-out: content drifts up and the furnace dims.
        gsap
          .timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } })
          .to(".hero__inner", { yPercent: -18, autoAlpha: 0.15, ease: "none" }, 0)
          .to(".molten", { scale: 1.12, autoAlpha: 0.35, ease: "none" }, 0)
          .to(".hero__meta", { autoAlpha: 0, ease: "none" }, 0);
      });

      mm.add(MOTION.reduce, () => {
        gsap.set(".molten, .hero__title, .hero__eyebrow, .hero__sub, .hero__ctas, .hero__meta > *", { autoAlpha: 1 });
      });
    },
    { scope: root, dependencies: [ready] },
  );

  return (
    <section ref={root} className="hero" id="top">
      <MoltenCanvas />
      <div className="hero__veil" aria-hidden="true" />

      <div className="hero__inner container">
        <p className="hero__eyebrow">
          <i aria-hidden="true" /> {t.hero.eyebrow}
        </p>
        <h1 className="hero__title">
          <span className="hero__line">{t.hero.line1}</span>
          <span className="hero__line hero__line--hot">{t.hero.line2}</span>
        </h1>
        <div className="hero__bottom">
          <p className="hero__sub">{t.hero.sub}</p>
          <div className="hero__ctas">
            <MagneticButton href="#companies">{t.hero.cta}</MagneticButton>
            <MagneticButton href="#contact" variant="ghost">
              {t.hero.cta2}
            </MagneticButton>
          </div>
        </div>
      </div>

      <div className="hero__meta container" aria-hidden="true">
        <span>{locale === "ar" ? "السويس · العبور · الجيزة" : "Suez · Obour · Giza"}</span>
        <span className="hero__scroll">
          <i />
          {t.hero.scroll}
        </span>
        <span dir="ltr">ISO 9001 · 14001 · 45001</span>
      </div>
    </section>
  );
}
