"use client";

import { useRef } from "react";
import { contact, type Dict } from "@/lib/content";
import { gsap, useGSAP, MOTION } from "@/lib/gsap";
import MagneticButton from "./MagneticButton";

export default function Contact({ t }: { t: Dict }) {
  const root = useRef<HTMLElement>(null);
  const f = t.contact.form;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION.motion, () => {
        gsap.fromTo(".contact__glow", { scale: 0.4, autoAlpha: 0 }, {
          scale: 1,
          autoAlpha: 1,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "top 20%", scrub: true },
        });
        gsap.from(".contact__item, .contact-form", {
          y: 60,
          autoAlpha: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: { trigger: ".contact__grid", start: "top 85%", once: true },
        });
      });
    },
    { scope: root },
  );

  // Static site: compose the message in the visitor's email app.
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const subject = `${data.get("topic")} — ${data.get("name")}`;
    const body = [data.get("message"), "", "—", data.get("name"), data.get("company"), data.get("phone")].filter(Boolean).join("\n");
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section ref={root} className="contact" id="contact">
      <div className="contact__glow" aria-hidden="true" />
      <div className="container">
        <header className="contact__head">
          <p className="eyebrow">
            <i aria-hidden="true" />
            {t.contact.eyebrow}
          </p>
          <h2 className="contact__title" data-reveal="lines">
            {t.contact.title}
          </h2>
          <p className="lead" data-reveal="up">
            {t.contact.sub}
          </p>
        </header>

        <div className="contact__grid">
          <ul className="contact__list">
            <li className="contact__item">
              <span className="contact__label">{t.contact.addressLabel}</span>
              <a href={contact.mapHref} target="_blank" rel="noopener noreferrer">
                {t.contact.address}
              </a>
            </li>
            <li className="contact__item">
              <span className="contact__label">{t.contact.emailLabel}</span>
              <a href={`mailto:${contact.email}`} dir="ltr">
                {contact.email}
              </a>
            </li>
            <li className="contact__item">
              <span className="contact__label">{t.contact.phoneLabel}</span>
              <a href={contact.phoneHref} dir="ltr">
                {contact.phone}
              </a>
            </li>
          </ul>

          <form className="contact-form" onSubmit={submit} noValidate>
            <label className="field">
              <span>{f.name}</span>
              <input name="name" type="text" autoComplete="name" required />
            </label>
            <label className="field">
              <span>{f.company}</span>
              <input name="company" type="text" autoComplete="organization" />
            </label>
            <label className="field">
              <span>{f.phone}</span>
              <input name="phone" type="tel" autoComplete="tel" dir="ltr" />
            </label>
            <label className="field">
              <span>{f.topic}</span>
              <select name="topic" defaultValue={f.topics[0]}>
                {f.topics.map((topic) => (
                  <option key={topic}>{topic}</option>
                ))}
              </select>
            </label>
            <label className="field field--full">
              <span>{f.message}</span>
              <textarea name="message" rows={5} required />
            </label>
            <div className="contact-form__foot">
              <p>{f.note}</p>
              <MagneticButton type="submit" variant="round">
                {f.submit}
              </MagneticButton>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
