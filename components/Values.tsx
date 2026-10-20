"use client";

import { useRef } from "react";
import type { Dict } from "@/lib/content";
import { gsap, useGSAP, MOTION } from "@/lib/gsap";

/** Mission and vision, then five value cards that stack on top of each other (CSS sticky + GSAP depth). */
export default function Values({ t }: { t: Dict }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION.motion, () => {
        const cards = gsap.utils.toArray<HTMLElement>(".value-card");
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;
          gsap.to(card, {
            scale: 0.9,
            filter: "brightness(0.45)",
            ease: "none",
            scrollTrigger: { trigger: next, start: "top bottom", end: "top 20%", scrub: true },
          });
        });
        cards.forEach((card) => {
          gsap.from(card.querySelector(".value-card__num"), {
            yPercent: 60,
            autoAlpha: 0,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: { trigger: card, start: "top 75%", once: true },
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="values">
      <div className="container">
        <p className="eyebrow">
          <i aria-hidden="true" />
          {t.values.eyebrow}
        </p>
        <div className="statements">
          {[t.values.mission, t.values.vision].map((s) => (
            <article key={s.label} className="statement">
              <p className="statement__label" data-reveal="up">
                {s.label}
              </p>
              <p className="statement__text" data-reveal="lines">
                {s.text}
              </p>
            </article>
          ))}
        </div>

        <h2 className="display values__title" data-reveal="lines">
          {t.values.title}
        </h2>

        <div className="value-stack">
          {t.values.items.map((v, i) => (
            <article key={v.title} className="value-card" style={{ "--i": i } as React.CSSProperties}>
              <span className="value-card__num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="value-card__body">
                <h3 className="value-card__title">{v.title}</h3>
                <p className="value-card__text">{v.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
