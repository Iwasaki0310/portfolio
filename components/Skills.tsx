"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import s from "./Skills.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SKILLS = [
  {
    title: "Web Direction",
    sub: "設計 / 統括",
    body: "要件整理・情報設計・進行管理。ゴールから逆算して「作るべきもの」を定義し、完成まで導きます。",
    tilt: -3,
  },
  {
    title: "UI / Web Planning",
    sub: "体験設計",
    body: "ユーザー体験を軸にした画面設計・構成企画。スクロール体験や世界観の設計を得意とします。",
    tilt: 2.5,
  },
  {
    title: "AI Creative",
    sub: "生成AI活用",
    body: "生成AIを制作フローに組み込み、画像・コピー・コードの制作を高速化。企画とAIの橋渡し役。",
    tilt: -2,
  },
  {
    title: "Content Planning",
    sub: "企画 / 運用",
    body: "SNS・Webメディアのコンテンツ企画と運用設計。「届けて育てる」ところまで一貫して設計します。",
    tilt: 3.5,
  },
] as const;

export default function Skills() {
  const root = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const mm = gsap.matchMedia();

      // デスクトップ：縦→横スクロール＋各カードの3Dフリップ
      mm.add("(min-width: 900px)", () => {
        const track = trackRef.current;
        const ghost = ghostRef.current;
        if (!track) return;

        const cards = gsap.utils.toArray<HTMLElement>(`.${s.card}`);
        /*
         * トラック幅は余白が 8vw なので画面幅に比例して伸びる一方、カード幅は
         * min(80vw, 380px) で頭打ちになる。約2010px を超えると差が負に転じ、
         * 負のままだとカードが右へ吹き飛び、ピン区間も負の長さになって壊れる。
         * 0 で下限を切り、横移動の必要が無い幅ではピン自体を張らない。
         */
        const getDist = () =>
          Math.max(0, track.scrollWidth - window.innerWidth);

        if (getDist() > 0) {
          // 横スクロール本体（ピン留め＋カード群を横移動）
          gsap.to(track, {
            x: () => -getDist(),
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: () => `+=${getDist()}`,
              pin: viewportRef.current,
              anticipatePin: 1,
              scrub: true,
              invalidateOnRefresh: true,
            },
          });

          // 背景タイポ：カードより遅い速度で横移動（パララックス）
          if (ghost) {
            gsap.set(ghost, { yPercent: -50 });
            gsap.to(ghost, {
              x: () => -getDist() * 0.4,
              ease: "none",
              scrollTrigger: {
                trigger: root.current,
                start: "top top",
                end: () => `+=${getDist()}`,
                scrub: true,
                invalidateOnRefresh: true,
              },
            });
          }
        } else if (ghost) {
          gsap.set(ghost, { yPercent: -50 });
        }

        // 各カード：裏返り・縮小・透明で待機 → セクション到達で1枚ずつ「ペロリン」
        cards.forEach((card, i) => {
          gsap.set(card, {
            rotationY: 90,
            rotationZ: SKILLS[i].tilt,
            scale: 0.9,
            opacity: 0,
            transformOrigin: "50% 50%",
          });
        });

        const flipTl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
        });
        cards.forEach((card, i) => {
          flipTl.to(
            card,
            {
              rotationY: 0,
              rotationZ: SKILLS[i].tilt,
              scale: 1,
              opacity: 1,
              duration: 0.9,
              ease: "back.out(1.7)",
            },
            i * 0.14 // 左から順に「ペロン、ペロン」
          );
        });
      });

      // モバイル：縦スクロールでカードが1枚ずつ「ペロリン」と出現
      mm.add("(max-width: 899px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(`.${s.card}`);
        cards.forEach((card) => {
          gsap.set(card, {
            rotationY: 80,
            scale: 0.92,
            opacity: 0,
            transformOrigin: "50% 50%",
          });
          gsap.to(card, {
            rotationY: 0,
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "back.out(1.6)",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="skills" className={s.skills}>
      <div className={`container ${s.head}`}>
        <p className="section-label"><span className="section-no">04</span>Services</p>
        <h2 className="section-title">What I Do</h2>
      </div>

      <div className={s.viewport} ref={viewportRef}>
        {/* 奥：パララックスする巨大タイポ */}
        <span className={s.ghost} ref={ghostRef} aria-hidden="true">
          WHAT I DO
        </span>

        {/* 手前：横並びカード（親に perspective） */}
        <div className={s.track} ref={trackRef}>
          {SKILLS.map((sk, i) => (
            <article className={s.card} key={sk.title}>
              <span className={s.num} aria-hidden="true">
                {i + 1}
              </span>
              <div className={s.cardInner}>
                <p className={s.cardSub}>{sk.sub}</p>
                <h3 className={s.cardTitle}>{sk.title}</h3>
                <p className={s.cardBody}>{sk.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
