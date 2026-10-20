"use client";

import { useEffect, useRef, useState } from "react";
import type { Dict } from "@/lib/content";
import { gsap, useGSAP, MOTION } from "@/lib/gsap";

const ICONS = [
  // Safety — shield with a check
  <path key="s" d="M12 3l7 3v5c0 4.6-3 8.4-7 10-4-1.6-7-5.4-7-10V6zM8.5 12l2.5 2.5 4.5-5" />,
  // Cooperation — linked rings
  <g key="c">
    <circle cx="9" cy="12" r="5" />
    <circle cx="15" cy="12" r="5" />
  </g>,
  // Proficiency — target
  <g key="p">
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1.5" />
  </g>,
  // Leadership — summit flag
  <path key="l" d="M3 20l6-9 4 5 3-4 5 8zM13 16V4l5 2-5 2" />,
  // Creativity — spark
  <path key="k" d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8M12 9.5a2.5 2.5 0 110 5 2.5 2.5 0 010-5z" />,
];

/** Mission and vision, then five value panels: the active one opens wide in molten orange. */
export default function Values({ t }: { t: Dict }) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const touched = useRef(false);

  // Cycle through the values while the section is on screen, until the visitor picks one.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer = 0;
    const io = new IntersectionObserver(([entry]) => {
      window.clearInterval(timer);
      if (entry.isIntersecting && !touched.current) {
        timer = window.setInterval(() => setActive((i) => (i + 1) % t.values.items.length), 3800);
      }
    }, { threshold: 0.4 });
    io.observe(root.current!.querySelector(".vpanels")!);
    return () => {
      io.disconnect();
      window.clearInterval(timer);
    };
  }, [t.values.items.length]);

  const pick = (i: number) => {
    touched.current = true;
    setActive(i);
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION.motion, () => {
        gsap.from(".vpanel", {
          y: 80,
          autoAlpha: 0,
          duration: 1.2,
          stagger: 0.08,
          ease: "expo.out",
          scrollTrigger: { trigger: ".vpanels", start: "top 85%", once: true },
        });
      });
    },
    { scope: root },
  );

  // Re-draw the icon of the panel that just opened.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION.motion, () => {
        gsap.fromTo(
          `.vpanel:nth-child(${active + 1}) .vpanel__icon path, .vpanel:nth-child(${active + 1}) .vpanel__icon circle`,
          { drawSVG: "0%" },
          { drawSVG: "100%", duration: 1.2, ease: "power2.inOut" },
        );
      });
    },
    { scope: root, dependencies: [active] },
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

        <div className="vpanels">
          {t.values.items.map((v, i) => (
            <article
              key={v.title}
              className={`vpanel ${i === active ? "is-active" : ""}`}
              tabIndex={0}
              onPointerEnter={() => pick(i)}
              onFocus={() => pick(i)}
              onClick={() => pick(i)}
            >
              <div className="vpanel__top">
                <span className="vpanel__num">{String(i + 1).padStart(2, "0")}</span>
                <svg className="vpanel__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {ICONS[i]}
                </svg>
              </div>
              <span className="vpanel__vtitle" aria-hidden="true">
                {v.title}
              </span>
              <div className="vpanel__body">
                <h3 className="vpanel__title">{v.title}</h3>
                <p className="vpanel__text">{v.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
