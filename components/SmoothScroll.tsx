"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { getLenis, setLenis } from "@/lib/scroll";

/** Lenis smooth scrolling driven by GSAP's ticker so ScrollTrigger stays in sync. */
export default function SmoothScroll({ paused }: { paused: boolean }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1, touchMultiplier: 1.4 });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    document.documentElement.classList.toggle("is-locked", paused);
    if (!lenis) return;
    if (paused) lenis.stop();
    else lenis.start();
  }, [paused]);

  return null;
}
