"use client";

import { Fragment, useRef } from "react";
import { useReveal } from "@/lib/useReveal";
import s from "./Sections.module.css";

const STACK = [
  {
    title: "Development",
    note: "Build Digital Experiences",
    items: [
      "Next.js",
      "React",
      "TypeScript",
      "HTML / CSS",
      "GSAP",
      "ScrollTrigger",
      "Responsive Design",
      "Git / GitHub",
    ],
  },
  {
    title: "AI Workflow",
    note: "AI-powered Workflow",
    items: [
      "ChatGPT",
      "Claude Code",
      "Midjourney",
      "Higgsfield AI",
      "Runway",
      "Prompt Engineering",
      "Image Generation",
      "AI Automation",
    ],
  },
  {
    title: "Design & Strategy",
    note: "Think Before Create",
    items: [
      "Figma",
      "UI Design",
      "Wireframe",
      "Information Architecture",
      "Content Planning",
      "Copywriting",
      "SNS Strategy",
      "Brand Direction",
    ],
  },
] as const;

/** タイトル中の「&」だけ .amp で包む（Design & Strategy 用） */
function withAmp(title: string) {
  return title.split("&").map((part, i) => (
    <Fragment key={i}>
      {i > 0 && <span className={s.amp}>&amp;</span>}
      {part}
    </Fragment>
  ));
}

export default function Stack() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section ref={root} id="stack" className={s.stackSection}>
      <div className="container">
        <p className="section-label" data-reveal>
          <span className="section-no">05</span>Skills
        </p>
        <h2 className="section-title" data-reveal>
          Skills <span className={s.amp}>&amp;</span> Tools
        </h2>
        <p className={s.stackLeadJa} data-reveal>
          設計し、つくり、届ける。
          <br className={s.brMobile} />
          そのために使っている技術とクリエイティブツール。
        </p>
        <div className={s.stackGrid}>
          {/*
            reveal はカード本体ではなくラッパーに掛ける。
            カードは glass（backdrop-filter）を持つため、ぼかしの乗った要素の
            opacity を動かすと中間状態が描画されず、演出が出ないことがある。
          */}
          {STACK.map((g) => (
            <div className={s.stackCardWrap} key={g.title} data-reveal>
              <div className={`${s.stackCard} glass`}>
                <div className={s.stackHead}>
                  <h3 className={s.stackTitle}>{withAmp(g.title)}</h3>
                  <p className={s.stackNote}>{g.note}</p>
                </div>
                <ul className={s.stackList}>
                  {g.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
