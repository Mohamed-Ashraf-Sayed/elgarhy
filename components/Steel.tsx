"use client";

import { useEffect, useRef } from "react";
import type { Dict } from "@/lib/content";
import { gsap, SplitText, useGSAP, MOTION } from "@/lib/gsap";
import { getLenis } from "@/lib/scroll";

/** The footage opens from a small window to full bleed while the slogan rises through it; the brand film plays on demand. */
export default function Steel({ t }: { t: Dict }) {
  const root = useRef<HTMLElement>(null);
  const loop = useRef<HTMLVideoElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const film = useRef<HTMLVideoElement>(null);

  // Background loop only plays while on screen, and never for reduced motion.
  useEffect(() => {
    const video = loop.current!;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
    io.observe(video);
    return () => io.disconnect();
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        { desktop: MOTION.desktop, mobile: "(max-width: 1023px) and (prefers-reduced-motion: no-preference)" },
        (ctx) => {
          const desktop = ctx.conditions?.desktop;
          const split = SplitText.create(".steel__title", { type: "words", mask: "words", wordsClass: "steel__word" });

          const tl = gsap.timeline({
            scrollTrigger: desktop
              ? { trigger: ".steel__stage", start: "top top", end: "+=160%", pin: true, scrub: 1 }
              : { trigger: ".steel__stage", start: "top 80%", end: "bottom 60%", scrub: 1 },
          });
          tl.fromTo(".steel__media", { clipPath: "inset(26% 30% 26% 30% round 40px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "power2.inOut", duration: 1 }, 0)
            .fromTo(".steel__media video", { scale: 1.45 }, { scale: 1.05, ease: "power2.inOut", duration: 1 }, 0)
            .from(split.words, { yPercent: 120, stagger: 0.08, duration: 0.5, ease: "power3.out" }, 0.45)
            .from(".steel__eyebrow, .steel__sub, .film-btn", { autoAlpha: 0, y: 30, duration: 0.4, stagger: 0.1 }, 0.65);
          if (desktop) tl.to({}, { duration: 0.35 });
        },
      );

      mm.add(MOTION.motion, () => {
        gsap.from(".plant", {
          y: 80,
          autoAlpha: 0,
          duration: 1.2,
          stagger: 0.12,
          ease: "expo.out",
          scrollTrigger: { trigger: ".steel__details", start: "top 80%", once: true },
        });
        gsap.from(".iso", {
          scale: 0.6,
          autoAlpha: 0,
          duration: 1,
          stagger: 0.08,
          ease: "back.out(2)",
          scrollTrigger: { trigger: ".iso-row", start: "top 90%", once: true },
        });
      });
    },
    { scope: root },
  );

  const openFilm = () => {
    dialog.current?.showModal();
    getLenis()?.stop();
    film.current?.play().catch(() => {});
  };
  const closeFilm = () => dialog.current?.close();

  return (
    <section ref={root} className="steel" id="steel">
      <div className="steel__stage">
        <div className="steel__media">
          <video
            ref={loop}
            poster="/video/steel-loop-poster.webp"
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={t.steel.imageAlt}
          >
            <source src="/video/steel-loop.webm" type="video/webm" />
            <source src="/video/steel-loop.mp4" type="video/mp4" />
          </video>
          <div className="steel__veil" aria-hidden="true" />
        </div>
        <div className="steel__copy container">
          <p className="eyebrow steel__eyebrow">
            <i aria-hidden="true" />
            {t.steel.eyebrow}
          </p>
          <h2 className="steel__title">{t.steel.title}</h2>
          <p className="steel__sub">{t.steel.sub}</p>
          <button type="button" className="film-btn" onClick={openFilm} data-cursor={t.steel.film}>
            <span className="film-btn__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5.5v13l11-6.5z" />
              </svg>
            </span>
            {t.steel.film}
          </button>
        </div>
      </div>

      <div className="steel__details container">
        <div className="plants">
          {t.steel.plants.map((p, i) => (
            <article key={p.city} className="plant">
              <span className="plant__index">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="plant__city">{p.city}</h3>
              <p className="plant__name">{p.name}</p>
              <p className="plant__text">{p.text}</p>
            </article>
          ))}
        </div>
        <div className="iso-row">
          {t.steel.iso.map((iso) => (
            <span key={iso.code} className="iso">
              <strong dir="ltr">{iso.code}</strong>
              {iso.label}
            </span>
          ))}
        </div>
      </div>

      <dialog
        ref={dialog}
        className="film"
        aria-label={t.steel.filmTitle}
        onClose={() => {
          film.current?.pause();
          getLenis()?.start();
        }}
        onClick={(e) => {
          if (e.target === dialog.current) closeFilm();
        }}
      >
        <video ref={film} poster="/video/elgarhy-film-poster.webp" controls playsInline preload="none">
          <source src="/video/elgarhy-film.webm" type="video/webm" />
          <source src="/video/elgarhy-film.mp4" type="video/mp4" />
        </video>
        <button type="button" className="lightbox__close" onClick={closeFilm} aria-label={t.steel.close}>
          ×
        </button>
      </dialog>
    </section>
  );
}
