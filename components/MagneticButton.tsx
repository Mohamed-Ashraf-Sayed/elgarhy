"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MOTION } from "@/lib/gsap";
import { scrollToHash } from "@/lib/scroll";

interface Props {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "light" | "round";
  type?: "button" | "submit";
  className?: string;
  cursor?: string;
}

/** Pill button that leans toward the pointer. In-page hash links scroll smoothly. */
export default function MagneticButton({ href, children, variant = "primary", type = "button", className = "", cursor }: Props) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION.finePointer, () => {
      const el = ref.current!;
      const inner = el.querySelector(".btn__inner");
      const strength = variant === "round" ? 0.45 : 0.3;
      const xTo = gsap.quickTo(el, "x", { duration: 0.8, ease: "elastic.out(1, 0.4)" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.8, ease: "elastic.out(1, 0.4)" });
      const ixTo = gsap.quickTo(inner, "x", { duration: 0.8, ease: "elastic.out(1, 0.4)" });
      const iyTo = gsap.quickTo(inner, "y", { duration: 0.8, ease: "elastic.out(1, 0.4)" });

      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        xTo(x * strength);
        yTo(y * strength);
        ixTo(x * strength * 0.4);
        iyTo(y * strength * 0.4);
      };
      const leave = () => {
        xTo(0);
        yTo(0);
        ixTo(0);
        iyTo(0);
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      };
    });
  });

  const classes = `btn btn--${variant} ${className}`;
  const inner = <span className="btn__inner">{children}</span>;

  if (href) {
    const onClick = href.startsWith("#")
      ? (e: React.MouseEvent) => {
          e.preventDefault();
          scrollToHash(href);
        }
      : undefined;
    return (
      <a ref={ref} href={href} className={classes} onClick={onClick} data-cursor={cursor}>
        {inner}
      </a>
    );
  }
  return (
    <button ref={ref} type={type} className={classes} data-cursor={cursor}>
      {inner}
    </button>
  );
}
