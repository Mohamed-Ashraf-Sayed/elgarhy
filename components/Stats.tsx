"use client";

import { useRef } from "react";
import type { Dict } from "@/lib/content";
import { gsap, useGSAP, MOTION } from "@/lib/gsap";

/** Bento of key figures, each with its own small visual: rising years, company grid, plant route, ISO seals. */
export default function Stats({ t }: { t: Dict }) {
  const root = useRef<HTMLElement>(null);
  const [years, companies, plants, iso] = t.stats;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION.motion, () => {
        gsap.utils.toArray<HTMLElement>(".bento__card").forEach((card) => {
          const tl = gsap.timeline({ scrollTrigger: { trigger: card, start: "top 82%", once: true } });
          tl.from(card, { y: 60, autoAlpha: 0, duration: 1.1, ease: "expo.out" });

          const num = card.querySelector<HTMLElement>(".bento__num");
          if (num) {
            const counter = { v: 0 };
            const end = Number(num.dataset.value);
            tl.to(counter, {
              v: end,
              duration: 1.8,
              ease: "expo.out",
              onUpdate: () => {
                num.textContent = String(Math.round(counter.v));
              },
            }, 0.2);
          }

          const ticks = card.querySelectorAll(".years__tick");
          if (ticks.length) tl.from(ticks, { scaleY: 0, duration: 0.8, stagger: 0.03, ease: "expo.out" }, 0.25);

          const dots = card.querySelectorAll(".grid15__cell");
          if (dots.length) tl.from(dots, { scale: 0, autoAlpha: 0, duration: 0.6, stagger: { each: 0.05, from: "start" }, ease: "back.out(2.2)" }, 0.25);

          const route = card.querySelectorAll(".route .draw");
          if (route.length) tl.from(route, { drawSVG: 0, duration: 1.4, ease: "power2.inOut" }, 0.3).from(card.querySelectorAll(".route__pin"), { scale: 0, transformOrigin: "50% 50%", duration: 0.7, stagger: 0.25, ease: "back.out(2.5)" }, 0.4);

          const seals = card.querySelectorAll(".seal");
          if (seals.length) tl.from(seals, { scale: 0.4, rotate: -40, autoAlpha: 0, duration: 0.9, stagger: 0.12, ease: "back.out(1.8)" }, 0.3);
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="stats" aria-labelledby="stats-title">
      <div className="container">
        <header className="stats__head">
          <p className="eyebrow">
            <i aria-hidden="true" />
            {t.statsHead.eyebrow}
          </p>
          <h2 id="stats-title" className="stats__title" data-reveal="lines">
            {t.statsHead.title}
          </h2>
        </header>

        <div className="bento">
          <article className="bento__card bento__card--years">
            <div className="bento__figure">
              <p className="bento__value">
                <span className="bento__num" data-value={years.value}>
                  {years.value}
                </span>
                <span className="bento__plus">+</span>
              </p>
              <p className="bento__label">{years.label}</p>
            </div>
            <div className="years" aria-hidden="true">
              {Array.from({ length: 30 }).map((_, i) => (
                <span key={i} className="years__tick" style={{ "--h": `${18 + (i / 29) * 82}%` } as React.CSSProperties} />
              ))}
            </div>
          </article>

          <article className="bento__card bento__card--companies">
            <div className="bento__figure">
              <p className="bento__value">
                <span className="bento__num" data-value={companies.value}>
                  {companies.value}
                </span>
              </p>
              <p className="bento__label">{companies.label}</p>
            </div>
            <div className="grid15" aria-hidden="true">
              {Array.from({ length: 15 }).map((_, i) => (
                <span key={i} className={`grid15__cell ${i < 5 ? "is-hot" : ""}`} />
              ))}
            </div>
          </article>

          <article className="bento__card bento__card--plants">
            <div className="bento__figure">
              <p className="bento__value">
                <span className="bento__num" data-value={plants.value}>
                  {plants.value}
                </span>
              </p>
              <p className="bento__label">{plants.label}</p>
            </div>
            <svg className="route" viewBox="0 0 240 110" aria-hidden="true">
              <path className="draw route__line" d="M30 78 C 80 10, 160 10, 210 60" />
              <g className="route__pin" transform="translate(30 78)">
                <circle r="12" className="route__halo" />
                <circle r="5" />
              </g>
              <g className="route__pin" transform="translate(210 60)">
                <circle r="12" className="route__halo" />
                <circle r="5" />
              </g>
            </svg>
            <div className="route__labels" aria-hidden="true" dir="ltr">
              <span>{t.steel.plants[1].city}</span>
              <span>{t.steel.plants[0].city}</span>
            </div>
          </article>

          <article className="bento__card bento__card--iso">
            <div className="bento__figure">
              <p className="bento__value">
                <span className="bento__num" data-value={iso.value}>
                  {iso.value}
                </span>
              </p>
              <p className="bento__label">{iso.label}</p>
            </div>
            <div className="seals" aria-hidden="true" dir="ltr">
              {t.steel.iso.map((s) => (
                <span key={s.code} className="seal">
                  <small>ISO</small>
                  {s.code.replace("ISO ", "")}
                </span>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
