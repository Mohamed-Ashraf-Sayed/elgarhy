"use client";

import { useRef, useState } from "react";
import { certificates, type Dict, type Locale } from "@/lib/content";
import { gsap, useGSAP, MOTION } from "@/lib/gsap";
import { getLenis } from "@/lib/scroll";

export default function Certificates({ t, locale }: { t: Dict; locale: Locale }) {
  const root = useRef<HTMLElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<number | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION.motion, () => {
        gsap.from(".cert", {
          y: 120,
          rotate: (i) => (i % 2 ? 4 : -4),
          autoAlpha: 0,
          duration: 1.4,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: { trigger: ".certs__grid", start: "top 85%", once: true },
        });
      });

      // 3D tilt toward the pointer.
      mm.add(MOTION.finePointer, () => {
        const handlers = gsap.utils.toArray<HTMLElement>(".cert").map((card) => {
          const img = card.querySelector(".cert__frame");
          const rx = gsap.quickTo(img, "rotationX", { duration: 0.6, ease: "power3" });
          const ry = gsap.quickTo(img, "rotationY", { duration: 0.6, ease: "power3" });
          const move = (e: PointerEvent) => {
            const r = card.getBoundingClientRect();
            ry(((e.clientX - r.left) / r.width - 0.5) * 18);
            rx(-((e.clientY - r.top) / r.height - 0.5) * 18);
          };
          const leave = () => {
            rx(0);
            ry(0);
          };
          card.addEventListener("pointermove", move);
          card.addEventListener("pointerleave", leave);
          return () => {
            card.removeEventListener("pointermove", move);
            card.removeEventListener("pointerleave", leave);
          };
        });
        return () => handlers.forEach((off) => off());
      });
    },
    { scope: root },
  );

  const show = (i: number) => {
    setOpen(i);
    dialog.current?.showModal();
    getLenis()?.stop();
  };
  const hide = () => {
    dialog.current?.close();
  };

  return (
    <section ref={root} className="certs" id="certifications">
      <div className="container">
        <header className="certs__head">
          <p className="eyebrow">
            <i aria-hidden="true" />
            {t.certs.eyebrow}
          </p>
          <h2 className="display" data-reveal="lines">
            {t.certs.title}
          </h2>
          <p className="lead" data-reveal="up">
            {t.certs.sub}
          </p>
        </header>

        <div className="certs__grid">
          {certificates.map((c, i) => (
            <button key={c.src} type="button" className="cert" onClick={() => show(i)} data-cursor={t.certs.view}>
              <span className="cert__frame">
                <img src={c.src} alt="" loading="lazy" width={723} height={1024} />
              </span>
              <span className="cert__code" dir="ltr">
                {c.code}
              </span>
              <span className="cert__text">
                {c.text[locale]} · {c.body}
              </span>
            </button>
          ))}
        </div>
      </div>

      <dialog
        ref={dialog}
        className="lightbox"
        onClose={() => {
          setOpen(null);
          getLenis()?.start();
        }}
        onClick={(e) => {
          if (e.target === dialog.current) hide();
        }}
      >
        {open !== null && (
          <img src={certificates[open].src} alt={`${certificates[open].code} — ${certificates[open].text[locale]}`} />
        )}
        <button type="button" className="lightbox__close" onClick={hide} aria-label={locale === "ar" ? "إغلاق" : "Close"}>
          ×
        </button>
      </dialog>
    </section>
  );
}
