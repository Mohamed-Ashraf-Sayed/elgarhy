"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION } from "@/lib/gsap";

/** Dot + trailing ring cursor for fine pointers. Grows over interactive elements and shows [data-cursor] labels. */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION.finePointer, () => {
      document.documentElement.classList.add("has-cursor");
      const dx = gsap.quickTo(dot.current, "x", { duration: 0.12, ease: "power3" });
      const dy = gsap.quickTo(dot.current, "y", { duration: 0.12, ease: "power3" });
      const rx = gsap.quickTo(ring.current, "x", { duration: 0.55, ease: "power3" });
      const ry = gsap.quickTo(ring.current, "y", { duration: 0.55, ease: "power3" });
      const label = ring.current!.querySelector("span")!;

      const move = (e: PointerEvent) => {
        dx(e.clientX);
        dy(e.clientY);
        rx(e.clientX);
        ry(e.clientY);
      };
      const over = (e: PointerEvent) => {
        const target = (e.target as HTMLElement).closest<HTMLElement>("a, button, [data-cursor], input, textarea, select");
        const text = target?.dataset.cursor ?? "";
        ring.current!.classList.toggle("is-hover", Boolean(target));
        ring.current!.classList.toggle("has-label", Boolean(text));
        label.textContent = text;
      };

      gsap.set([dot.current, ring.current], { autoAlpha: 1 });
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerover", over);
      return () => {
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerover", over);
        document.documentElement.classList.remove("has-cursor");
      };
    });
  });

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true">
        <span />
      </div>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
