"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION } from "@/lib/gsap";

export default function Preloader({ label, onReveal }: { label: string; onReveal: () => void }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current!;
      const count = el.querySelector<HTMLElement>(".preloader__count")!;
      const done = () => {
        el.style.display = "none";
      };
      const mm = gsap.matchMedia();

      mm.add(MOTION.motion, () => {
        const progress = { v: 0 };
        gsap
          .timeline({ onComplete: done })
          .from(".preloader__logo", { autoAlpha: 0, scale: 0.92, duration: 1.2, ease: "expo.out" }, 0.1)
          .to(progress, {
            v: 100,
            duration: 2,
            ease: "power2.inOut",
            onUpdate: () => {
              count.textContent = String(Math.round(progress.v)).padStart(3, "0");
            },
          }, 0)
          .to(".preloader__bar i", { scaleX: 1, duration: 2, ease: "power2.inOut" }, 0)
          .to(".preloader__logo, .preloader__meta", { autoAlpha: 0, y: -24, duration: 0.5, ease: "power2.in" })
          .add(onReveal)
          .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 1.2, ease: "expo.inOut" }, "<");
      });

      mm.add(MOTION.reduce, () => {
        count.textContent = "100";
        gsap.to(el, { autoAlpha: 0, duration: 0.3, delay: 0.2, onStart: onReveal, onComplete: done });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="preloader" aria-hidden="true">
      <img className="preloader__logo" src="/img/logo-group-white.png" alt="" width={254} height={98} />
      <div className="preloader__meta">
        <span>{label}</span>
        <span className="preloader__count">000</span>
      </div>
      <div className="preloader__bar">
        <i />
      </div>
    </div>
  );
}
