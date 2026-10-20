"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/Flip";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, Flip, DrawSVGPlugin, useGSAP);
  gsap.defaults({ ease: "power3.out", duration: 1 });
}

/** Shared media-query conditions for gsap.matchMedia(). */
export const MOTION = {
  motion: "(prefers-reduced-motion: no-preference)",
  reduce: "(prefers-reduced-motion: reduce)",
  desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
  finePointer: "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
} as const;

export { gsap, ScrollTrigger, SplitText, Flip, useGSAP };
