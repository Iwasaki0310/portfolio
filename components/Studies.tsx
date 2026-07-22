"use client";

import { useEffect, useRef, useState } from "react";
import { useReveal } from "@/lib/useReveal";
import s from "./Studies.module.css";

/* 4点スパークル（✦）のパス（中心原点） */
const SPARKLE =
  "M0,-10 C1.4,-3.4 3.4,-1.4 10,0 C3.4,1.4 1.4,3.4 0,10 C-1.4,3.4 -3.4,1.4 -10,0 C-3.4,-1.4 -1.4,-3.4 0,-10 Z";

const NODES: [number, number, number][] = [
  [230, 300, 1], [470, 200, 0.8], [720, 360, 1.15], [980, 185, 0.85],
  [1250, 320, 1], [1400, 240, 0.75], [810, 610, 0.9], [1070, 700, 1.05], [1250, 560, 0.8],
];

const DUST: [number, number][] = [
  [340, 120], [600, 480], [900, 420], [1120, 260], [1350, 480],
  [180, 520], [520, 700], [760, 160], [1180, 130], [1450, 640],
  [400, 400], [880, 640], [1300, 180], [660, 300], [1030, 500],
];

export default function Studies() {
  const root = useRef<HTMLElement>(null);
  const figRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);
  useReveal(root);

  // モバイルはホバーが無いので、画面に入ったら星座を出す
  useEffect(() => {
    const fig = figRef.current;
    if (!fig) return;
    if (!window.matchMedia("(max-width: 899px)").matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => setRevealed(e.isIntersecting));
      },
      { threshold: 0.35 }
    );
    io.observe(fig);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={root} id="studies">
      <div className="container">
        {/* 見出し */}
        <header className={s.head}>
          <p className={s.eyebrow} data-reveal>
            <span className={s.eyebrowNo}>02</span>
            How I Work
          </p>
          <h2 className={s.title} data-reveal>
            My Principles
          </h2>
        </header>

        {/* タイトル下：横長ビジュアル（ホバー/インビューで星座＋シャドウ） */}
        <figure
          ref={figRef}
          className={`${s.hero} ${revealed ? s.revealed : ""}`}
          data-reveal
          tabIndex={0}
          role="img"
          aria-label="星座が浮かび上がるビジュアル"
        >
          <img src="/hero/aboutme.webp" alt="" loading="lazy" />

          <svg
            className={s.constellation}
            viewBox="0 0 1600 900"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            {/* 星をつなぐ線 */}
            <g className={s.constLines}>
              <polyline points="230,300 470,200 720,360 980,185 1250,320 1400,240" />
              <polyline points="720,360 810,610 1070,700 1250,560" />
              <polyline points="980,185 1250,560" />
            </g>
            {/* 主要な星（4点スパークル） */}
            <g className={s.constNodes}>
              {NODES.map(([cx, cy, scale], i) => (
                <path
                  key={i}
                  d={SPARKLE}
                  transform={`translate(${cx},${cy}) scale(${scale})`}
                  style={{ ["--d" as string]: `${i * 0.1}s` }}
                />
              ))}
            </g>
            {/* 散らばる小さな星 */}
            <g className={s.constDust}>
              {DUST.map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r={1.6} style={{ ["--d" as string]: `${(i % 6) * 0.4}s` }} />
              ))}
            </g>
          </svg>
        </figure>

        {/* リード＋本文 */}
        <div className={s.body}>
          <p className={s.lead} data-reveal>
            アイデアは、思いつくだけでは価値にならない
          </p>

          <p className={s.para} data-reveal>
            考え、整理し、設計し、形にする。
            <br />
            その一連のプロセスがあって、初めて人に伝わるものになる。
          </p>

          <p className={`${s.para} ${s.paraNowrap}`} data-reveal>
            私は、企画・ディレクション・AI・制作を切り離さず、ひとつの体験として設計します。
          </p>

          <p className={s.para} data-reveal>
            速く作ることより、本質を見失わないこと。
            <br />
            その積み重ねが、良いアウトプットにつながると信じています。
          </p>

          {/* 締めの一文。上の星座ビジュアルと呼応させる */}
          <p className={s.para} data-reveal>
            僕らが歩いた軌跡がいま星座を紡いでいく。
          </p>
        </div>
      </div>
    </section>
  );
}
