"use client";

import { useRef } from "react";
import { brandLogos, type Locale } from "@/lib/content";
import { gsap, ScrollTrigger, useGSAP, MOTION } from "@/lib/gsap";

/** Two endless rows of group brands; scrolling speeds them up and flips their direction. */
export default function Marquee({ locale }: { locale: Locale }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION.motion, () => {
        const loops = gsap.utils.toArray<HTMLElement>(".marquee__row").map((row, i) => {
          const loop = gsap.fromTo(row, { xPercent: i % 2 ? -50 : 0 }, { xPercent: i % 2 ? 0 : -50, duration: 40, ease: "none", repeat: -1 });
          // Start deep into the repeats so a negative timeScale can run backwards indefinitely.
          return loop.totalTime(loop.duration() * 1000);
        });

        let direction = 1;
        let boost = 1;
        let speed = 1;
        ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            direction = self.direction;
            boost = gsap.utils.clamp(1, 6, Math.abs(self.getVelocity()) / 250);
          },
        });

        const tick = () => {
          speed += (direction * boost - speed) * 0.08;
          boost += (1 - boost) * 0.04;
          loops.forEach((loop) => loop.timeScale(speed));
        };
        gsap.ticker.add(tick);
        return () => gsap.ticker.remove(tick);
      });
    },
    { scope: root },
  );

  const row = [...brandLogos, ...brandLogos];

  return (
    <section ref={root} className="marquee" aria-label={locale === "ar" ? "علامات المجموعة" : "Group brands"}>
      {[0, 1].map((r) => (
        <div key={r} className="marquee__viewport" dir="ltr">
          <div className="marquee__row">
            {(r ? [...row].reverse() : row).map((logo, i) => (
              <figure key={`${logo.src}-${i}`} className="marquee__item" aria-hidden={i >= brandLogos.length}>
                <img src={logo.src} alt={i < brandLogos.length ? logo.alt[locale] : ""} loading="lazy" />
              </figure>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
