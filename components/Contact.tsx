"use client";

import { useRef } from "react";
import { useReveal } from "@/lib/useReveal";
import s from "./Sections.module.css";

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section ref={root} id="contact" className={s.contact}>
      <div className="container">
        <p className="section-label" data-reveal style={{ justifyContent: "center" }}>
          Contact
        </p>
        <p className={s.contactLead} data-reveal>
          まずはお気軽にご相談ください。
        </p>
        <a
          className={s.contactBtn}
          href="mailto:r.iwasaki0310en@gmail.com"
          data-reveal
        >
          GET IN TOUCH <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}
