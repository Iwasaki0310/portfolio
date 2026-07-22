"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReveal } from "@/lib/useReveal";
import s from "./Works.module.css";

const WORKS = [
  {
    title: "世界のカメ図鑑",
    tags: ["Web Media", "Next.js", "GSAP"],
    body: "世界のカメを紹介するWebメディア。「海に潜る」ダークトーンの世界観で、図鑑をスクロール体験として再設計。",
    img: "/works/turtle-zukan.webp",
    href: "#contact",
    icons: ["🐢", "🌊", "📖", "🐚"],
    accent: 1,
  },
  {
    title: "岩崎怜のおすすめ映画・アニメサイト",
    tags: ["Web Media", "Review", "Curation"],
    body: "岩崎怜が厳選した映画・アニメを紹介するレビューサイト。作品の魅力を伝える構成とビジュアルで、観たくなる体験を設計。",
    img: "/works/movie-anime.webp",
    href: "#contact",
    icons: ["🎬", "🍿", "⭐", "🎞️"],
    accent: 2,
  },
  {
    title: "ポートフォリオ",
    tags: ["AI Creative", "LP", "Experiment"],
    body: "生成AI×Web表現の実験プロジェクト。本サイトを含め、AIを組み込んだ制作ワークフローを検証・公開。",
    img: "/works/ai-portfolio.webp",
    href: "#contact",
    icons: ["✨", "🤖", "💻", "⚡"],
    accent: 0,
  },
  {
    title: "岩崎不動産",
    tags: ["Web Site", "Direction", "Planning"],
    body: "不動産事業のWebサイト。物件情報の見やすさと信頼感を軸に、問い合わせにつながる導線を設計。",
    img: "/works/estate.webp",
    href: "#contact",
    icons: ["🏠", "🔑", "📍", "🏢"],
    accent: 2,
  },
] as const;

const LAST = WORKS.length - 1;

export default function Works() {
  const root = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // 他セクションと同じフェードイン。ここだけ演出が無く、体験が途切れていた
  useReveal(root);

  // 中央からの連続位置（0 = 先頭カードが中央）
  const [progress, setProgress] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [step, setStep] = useState(300);

  // ドラッグ状態
  const drag = useRef({ active: false, startX: 0, startProgress: 0, moved: false });

  // ドラッグ幅の基準（画面幅に応じてカード送り量を調整）
  useEffect(() => {
    const onResize = () =>
      setStep(Math.min(340, Math.max(180, window.innerWidth * 0.34)));
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const clamp = (v: number) => Math.min(LAST, Math.max(0, v));

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      drag.current = {
        active: true,
        startX: e.clientX,
        startProgress: progress,
        moved: false,
      };
      setDragging(true);
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    },
    [progress]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!drag.current.active) return;
      const dx = e.clientX - drag.current.startX;
      if (Math.abs(dx) > 4) drag.current.moved = true;
      const next = drag.current.startProgress - dx / step;
      // 端では引っ張り抵抗（軽いラバーバンド）
      const soft =
        next < 0 ? next * 0.35 : next > LAST ? LAST + (next - LAST) * 0.35 : next;
      setProgress(soft);
    },
    [step]
  );

  const endDrag = useCallback(() => {
    if (!drag.current.active) return;
    drag.current.active = false;
    setDragging(false);
    setProgress((p) => clamp(Math.round(p)));
  }, []);

  const go = (i: number) => setProgress(clamp(i));

  return (
    <section ref={root} id="works" className={s.works}>
      <div className={`container ${s.head}`}>
        <p className="section-label" data-reveal><span className="section-no">03</span>Works</p>
        <h2 className="section-title" data-reveal>Projects</h2>
      </div>

      <span className={s.ghost} aria-hidden="true">
        PROJECTS
      </span>

      <div
        ref={stageRef}
        className={s.stage}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
        role="group"
        aria-label="プロジェクト一覧（ドラッグまたはクリックで切り替え）"
      >
        {WORKS.map((w, i) => {
          const delta = i - progress;
          const abs = Math.abs(delta);
          const sign = Math.sign(delta);
          const visible = abs < 3;

          const x = delta * step;
          const z = -abs * 140;
          const rotY = sign * Math.min(abs, 2) * -26;
          const scale = Math.max(0.62, 1 - abs * 0.14);
          const shade = Math.min(0.66, abs * 0.34);
          const active = Math.round(progress) === i;

          return (
            <article
              key={w.title}
              className={`${s.card} ${active ? s.active : ""} ${
                dragging ? "" : s.snap
              }`}
              style={{
                transform: `translate(-50%, -50%) translateX(${x}px) translateZ(${z}px) rotateY(${rotY}deg) scale(${scale})`,
                zIndex: 100 - Math.round(abs * 10),
                opacity: visible ? 1 : 0,
                pointerEvents: visible ? "auto" : "none",
              }}
              /* 画面外のカードは支援技術からも隠す。中のリンクは tabIndex={-1} で
                 タブ順から外してあるので、aria-hidden との併用も問題ない。
                 （inert は React 19 で空文字の警告が出るため使わない） */
              aria-hidden={!visible || undefined}
              onClick={() => {
                if (!drag.current.moved && !active) go(i);
              }}
            >
              <img
                className={s.cardImg}
                src={w.img}
                alt={`${w.title}のイメージ`}
                loading="lazy"
                draggable={false}
              />
              <span
                className={s.shade}
                style={{ opacity: shade }}
                aria-hidden="true"
              />
              {/* 画像内テキスト（下部グラデにオーバーレイ） */}
              <div className={s.overlay}>
                <h3 className={s.cardTitle}>{w.title}</h3>
                <p className={s.cardText}>{w.body}</p>
                <a
                  className={s.cardLink}
                  href={w.href}
                  tabIndex={visible ? undefined : -1}
                  onClick={(e) => {
                    if (drag.current.moved) e.preventDefault();
                  }}
                >
                  VIEW PROJECT <span aria-hidden="true">→</span>
                </a>
              </div>

              {/* 浮遊アイコン */}
              <div className={s.decor} aria-hidden="true">
                {w.icons.map((ic, k) => (
                  <span
                    key={k}
                    className={`${s.decorItem} ${k === w.accent ? s.decorAccent : ""}`}
                  >
                    {ic}
                  </span>
                ))}
              </div>
            </article>
          );
        })}
      </div>

      {/* ドット・ナビ */}
      {/*
        タブUIではないので role="tablist" は使わない。
        tablist は子に role="tab" と tabpanel を要求し、揃っていないと
        aria-selected ごと無視されて現在位置が支援技術に伝わらない。
      */}
      <div className={s.dots} role="group" aria-label="プロジェクト切り替え">
        {WORKS.map((w, i) => (
          <button
            key={w.title}
            className={`${s.dot} ${Math.round(progress) === i ? s.dotOn : ""}`}
            aria-label={w.title}
            aria-current={Math.round(progress) === i ? "true" : undefined}
            onClick={() => go(i)}
          />
        ))}
      </div>

      <p className={s.hint} aria-hidden="true">
        ← DRAG / CLICK →
      </p>
    </section>
  );
}
