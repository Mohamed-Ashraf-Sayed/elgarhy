"use client";

import { useRef, useState } from "react";
import { dictionaries, type Locale } from "@/lib/content";
import { gsap, ScrollTrigger, SplitText, useGSAP, MOTION } from "@/lib/gsap";
import SmoothScroll from "./SmoothScroll";
import Preloader from "./Preloader";
import Cursor from "./Cursor";
import Nav from "./Nav";
import Hero from "./Hero";
import Manifesto from "./Manifesto";
import Stats from "./Stats";
import Sectors from "./Sectors";
import Steel from "./Steel";
import Marquee from "./Marquee";
import Companies from "./Companies";
import Values from "./Values";
import Certificates from "./Certificates";
import Board from "./Board";
import Contact from "./Contact";
import Footer from "./Footer";

export default function Site({ locale }: { locale: Locale }) {
  const t = dictionaries[locale];
  const [ready, setReady] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  // Shared scroll reveals: [data-reveal="lines"] splits into masked lines, [data-reveal="up"] fades up.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION.motion, () => {
        gsap.utils.toArray<HTMLElement>("[data-reveal='lines']").forEach((el) => {
          SplitText.create(el, {
            type: "lines",
            mask: "lines",
            linesClass: "split-line",
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 110,
                duration: 1.2,
                stagger: 0.09,
                ease: "expo.out",
                scrollTrigger: { trigger: el, start: "top 88%", once: true },
              }),
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-reveal='up']").forEach((el) => {
          gsap.from(el, {
            y: 60,
            autoAlpha: 0,
            duration: 1.2,
            ease: "expo.out",
            delay: Number(el.dataset.delay ?? 0),
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
        });
      });

      // Fonts change line breaks and section heights, so re-measure once they settle.
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
    },
    { scope: root },
  );

  return (
    <div ref={root} className="site">
      <SmoothScroll paused={!ready} />
      <Preloader label={t.preloader} onReveal={() => setReady(true)} />
      <Cursor />
      <div className="grain" aria-hidden="true" />
      <Nav t={t} />
      <main id="main">
        <Hero t={t} locale={locale} ready={ready} />
        <Manifesto t={t} />
        <Stats t={t} />
        <Sectors t={t} locale={locale} />
        <Steel t={t} />
        <Marquee locale={locale} />
        <Companies t={t} locale={locale} />
        <Values t={t} />
        <Certificates t={t} locale={locale} />
        <Board t={t} locale={locale} />
        <Contact t={t} />
      </main>
      <Footer t={t} />
    </div>
  );
}
