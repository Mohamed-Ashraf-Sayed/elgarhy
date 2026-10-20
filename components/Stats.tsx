"use client";

import { useRef } from "react";
import type { Dict } from "@/lib/content";
import { gsap, useGSAP, MOTION } from "@/lib/gsap";

export default function Stats({ t }: { t: Dict }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION.motion, () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top 75%", once: true } });
        tl.from(".stat__rule", { scaleX: 0, duration: 1.4, stagger: 0.12, ease: "expo.inOut" }, 0);
        gsap.utils.toArray<HTMLElement>(".stat__num").forEach((el, i) => {
          const end = Number(el.dataset.value);
          const counter = { v: 0 };
          tl.to(counter, {
            v: end,
            duration: 2,
            ease: "expo.out",
            onUpdate: () => {
              el.textContent = String(Math.round(counter.v));
            },
          }, 0.2 + i * 0.12);
        });
        tl.from(".stat__label", { y: 20, autoAlpha: 0, duration: 1, stagger: 0.12 }, 0.4);
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="stats" aria-label="Key figures">
      <div className="container stats__grid">
        {t.stats.map((s) => (
          <div key={s.label} className="stat">
            <span className="stat__rule" aria-hidden="true" />
            <p className="stat__value">
              <span className="stat__num" data-value={s.value}>
                {s.value}
              </span>
              {s.suffix}
            </p>
            <p className="stat__label">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
