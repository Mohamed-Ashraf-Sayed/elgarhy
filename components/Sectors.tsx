"use client";

import { useRef } from "react";
import type { Dict, Locale } from "@/lib/content";
import { gsap, useGSAP, MOTION } from "@/lib/gsap";
import SectorArt from "./SectorArt";

/** Pinned horizontal gallery on desktop (direction follows the reading direction); stacked cards on mobile. */
export default function Sectors({ t, locale }: { t: Dict; locale: Locale }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const rtl = locale === "ar";

      mm.add(MOTION.desktop, () => {
        const track = root.current!.querySelector<HTMLElement>(".sectors__track")!;
        const distance = () => track.scrollWidth - window.innerWidth;

        const cards = gsap.utils.toArray<HTMLElement>(".sector");
        const nums = cards.map((card) => gsap.quickSetter(card.querySelector(".sector__num"), "x", "px"));

        // Numerals drift against the track for depth; measured from real positions so it works in both directions.
        const parallax = () => {
          cards.forEach((card, i) => {
            const r = card.getBoundingClientRect();
            nums[i](((r.left + r.width / 2) / window.innerWidth - 0.5) * -160);
          });
        };

        gsap.to(track, {
          x: () => (rtl ? distance() : -distance()),
          ease: "none",
          scrollTrigger: {
            trigger: ".sectors__pin",
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (self) => gsap.set(".sectors__progress i", { scaleX: self.progress }),
          },
          onUpdate: parallax,
        });
        parallax();

        // Line art draws itself when a card slides into view.
        const draws = new Map(
          cards.map((card) => [
            card,
            gsap.from(card.querySelectorAll(".draw"), { drawSVG: 0, duration: 1.8, stagger: 0.015, ease: "power2.inOut", paused: true }),
          ]),
        );
        const io = new IntersectionObserver(
          (entries) =>
            entries.forEach((entry) => {
              if (entry.isIntersecting) draws.get(entry.target as HTMLElement)?.play();
            }),
          { threshold: 0.35 },
        );
        cards.forEach((card) => io.observe(card));
        return () => io.disconnect();
      });

      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".sector").forEach((card) => {
          gsap
            .timeline({ scrollTrigger: { trigger: card, start: "top 85%", once: true } })
            .from(card, { y: 80, autoAlpha: 0, duration: 1.2, ease: "expo.out" })
            .from(card.querySelectorAll(".draw"), { drawSVG: 0, duration: 1.6, stagger: 0.015, ease: "power2.inOut" }, 0.2);
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="sectors" id="sectors">
      <div className="sectors__pin">
        <div className="sectors__track">
          <header className="sectors__intro">
            <p className="eyebrow">
              <i aria-hidden="true" />
              {t.sectors.eyebrow}
            </p>
            <h2 className="display" data-reveal="lines">
              {t.sectors.title}
            </h2>
            <p className="sectors__hint">
              <span aria-hidden="true">{locale === "ar" ? "←" : "→"}</span> {t.sectors.hint}
            </p>
          </header>

          {t.sectors.items.map((s, i) => (
            <article key={s.key} className={`sector sector--${s.key}`}>
              <span className="sector__num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <SectorArt kind={s.key} />
              <div className="sector__body">
                <p className="sector__tag">{s.tag}</p>
                <h3 className="sector__title">{s.title}</h3>
                <p className="sector__text">{s.text}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="sectors__progress container" aria-hidden="true">
          <i />
        </div>
      </div>
    </section>
  );
}
