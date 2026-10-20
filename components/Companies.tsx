"use client";

import { useRef, useState } from "react";
import { companies, type CompanyCategory, type Dict, type Locale } from "@/lib/content";
import { gsap, Flip, useGSAP, MOTION } from "@/lib/gsap";

type Filter = CompanyCategory | "all";

export default function Companies({ t, locale }: { t: Dict; locale: Locale }) {
  const root = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [active, setActive] = useState(0);
  const flipState = useRef<Flip.FlipState | null>(null);

  // Floating preview that trails the pointer over the list (desktop only).
  const { contextSafe } = useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION.motion, () => {
        gsap.from(".company-row", {
          y: 50,
          autoAlpha: 0,
          duration: 1,
          stagger: 0.05,
          ease: "expo.out",
          scrollTrigger: { trigger: ".company-list", start: "top 85%", once: true },
        });
      });

      mm.add(MOTION.finePointer, () => {
        const preview = root.current!.querySelector<HTMLElement>(".company-preview")!;
        const xTo = gsap.quickTo(preview, "x", { duration: 0.6, ease: "power3" });
        const yTo = gsap.quickTo(preview, "y", { duration: 0.6, ease: "power3" });
        const list = root.current!.querySelector<HTMLElement>(".company-list")!;

        const move = (e: PointerEvent) => {
          xTo(e.clientX);
          yTo(e.clientY);
        };
        const enter = () => gsap.to(preview, { autoAlpha: 1, scale: 1, duration: 0.5, ease: "expo.out" });
        const leave = () => gsap.to(preview, { autoAlpha: 0, scale: 0.6, duration: 0.4, ease: "power3.in" });

        gsap.set(preview, { autoAlpha: 0, scale: 0.6, xPercent: -50, yPercent: -50 });
        window.addEventListener("pointermove", move);
        list.addEventListener("pointerenter", enter);
        list.addEventListener("pointerleave", leave);
        return () => {
          window.removeEventListener("pointermove", move);
          list.removeEventListener("pointerenter", enter);
          list.removeEventListener("pointerleave", leave);
        };
      });
    },
    { scope: root },
  );

  // Animate the list re-ordering after a filter change.
  useGSAP(
    () => {
      if (!flipState.current) return;
      Flip.from(flipState.current, {
        targets: ".company-row",
        duration: 0.7,
        ease: "expo.inOut",
        absolute: true,
        onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.6, delay: 0.2 }),
        onLeave: (els) => gsap.to(els, { autoAlpha: 0, duration: 0.3 }),
      });
      flipState.current = null;
    },
    { scope: root, dependencies: [filter] },
  );

  const choose = contextSafe((key: Filter) => {
    if (key === filter) return;
    flipState.current = Flip.getState(".company-row");
    setFilter(key);
  });

  const shown = companies.map((c, i) => ({ c, i, visible: filter === "all" || c.category === filter }));
  const current = companies[active];

  return (
    <section ref={root} className="companies" id="companies">
      <div className="container">
        <header className="companies__head">
          <div>
            <p className="eyebrow">
              <i aria-hidden="true" />
              {t.companies.eyebrow}
            </p>
            <h2 className="display" data-reveal="lines">
              {t.companies.title}
            </h2>
          </div>
          <div className="chips" role="group" aria-label={t.companies.eyebrow}>
            {t.companies.filters.map((f) => (
              <button key={f.key} type="button" className="chip" aria-pressed={filter === f.key} onClick={() => choose(f.key as Filter)}>
                {f.label}
              </button>
            ))}
          </div>
        </header>

        <ol className="company-list">
          {shown.map(({ c, i, visible }) => (
            <li
              key={c.id}
              className="company-row"
              data-flip-id={c.id}
              hidden={!visible}
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              tabIndex={0}
            >
              <span className="company-row__index">{String(i + 1).padStart(2, "0")}</span>
              <div className="company-row__main">
                <h3 className="company-row__name">{c.name[locale]}</h3>
                <p className="company-row__text">{c.text[locale]}</p>
              </div>
              <div className="company-row__meta">
                <span>{c.form[locale]}</span>
                {c.place && <span>{c.place[locale]}</span>}
              </div>
              <span className="company-row__stake" aria-label={`${t.companies.stake} ${c.stake}`} dir="ltr">
                {c.stake}
              </span>
              <span className="company-row__fill" aria-hidden="true" />
            </li>
          ))}
        </ol>
      </div>

      <div className="company-preview" aria-hidden="true">
        {current.logo ? (
          <img src={current.logo} alt="" className={current.wideLogo ? "is-wide" : ""} />
        ) : (
          <span className="company-preview__mono">{current.monogram}</span>
        )}
        <span className="company-preview__stake" dir="ltr">
          {current.stake}
        </span>
      </div>
    </section>
  );
}
