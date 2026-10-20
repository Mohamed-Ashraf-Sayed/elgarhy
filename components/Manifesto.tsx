"use client";

import { useRef } from "react";
import type { Dict } from "@/lib/content";
import { gsap, SplitText, useGSAP, MOTION } from "@/lib/gsap";

/** A statement that lights up word by word as you scroll through it. */
export default function Manifesto({ t }: { t: Dict }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        { desktop: MOTION.desktop, mobile: "(max-width: 1023px) and (prefers-reduced-motion: no-preference)" },
        (ctx) => {
          const desktop = ctx.conditions?.desktop;
          SplitText.create(".manifesto__text", {
            type: "words",
            wordsClass: "manifesto__word",
            autoSplit: true,
            onSplit: (self) =>
              gsap.fromTo(
                self.words,
                { opacity: 0.12 },
                {
                  opacity: 1,
                  stagger: 0.1,
                  ease: "none",
                  scrollTrigger: desktop
                    ? { trigger: root.current, start: "top top", end: "+=140%", pin: true, scrub: 0.6 }
                    : { trigger: ".manifesto__text", start: "top 80%", end: "bottom 45%", scrub: 0.6 },
                },
              ),
          });
          gsap.fromTo(".manifesto__glow", { scale: 0.6, opacity: 0 }, {
            scale: 1.2,
            opacity: 1,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
          });
        },
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} className="manifesto" id="story">
      <div className="manifesto__glow" aria-hidden="true" />
      <div className="container manifesto__inner">
        <p className="eyebrow">
          <i aria-hidden="true" />
          {t.manifesto.eyebrow}
        </p>
        <p className="manifesto__text">{t.manifesto.text}</p>
      </div>
    </section>
  );
}
