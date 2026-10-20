"use client";

import { useRef } from "react";
import { board, type Dict, type Locale } from "@/lib/content";
import { gsap, useGSAP, MOTION } from "@/lib/gsap";

export default function Board({ t, locale }: { t: Dict; locale: Locale }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION.motion, () => {
        gsap.from(".member", {
          y: 70,
          autoAlpha: 0,
          duration: 1.2,
          stagger: 0.08,
          ease: "expo.out",
          scrollTrigger: { trigger: ".board__grid", start: "top 85%", once: true },
        });
        gsap.from(".member__avatar", {
          scale: 0,
          duration: 1,
          stagger: 0.08,
          ease: "back.out(1.8)",
          scrollTrigger: { trigger: ".board__grid", start: "top 80%", once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="board" id="leadership">
      <div className="container">
        <header className="board__head">
          <p className="eyebrow">
            <i aria-hidden="true" />
            {t.board.eyebrow}
          </p>
          <h2 className="display" data-reveal="lines">
            {t.board.title}
          </h2>
        </header>

        <div className="board__grid">
          {board.map((m) => (
            <article key={m.name.en} className={`member ${m.lead ? "member--lead" : ""}`}>
              <span className="member__avatar" aria-hidden="true">
                {m.initials}
              </span>
              <div>
                <h3 className="member__name">{m.name[locale]}</h3>
                <p className="member__role">{m.role[locale]}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
