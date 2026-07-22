"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Orb from "./Orb";
import s from "./Hero.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* 星座（線で結ばれた星）＋散らばる星。空の上部に配置 */
function Constellations() {
  return (
    <svg
      className={s.constellation}
      viewBox="0 0 1000 600"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <g className={s.constGroup}>
        <polyline points="120,90 175,64 236,86 268,140" />
        <circle cx="120" cy="90" r="2.4" className={s.tw} style={{ animationDelay: "0s" }} />
        <circle cx="175" cy="64" r="1.8" />
        <circle cx="236" cy="86" r="2.2" className={s.tw} style={{ animationDelay: "-1.2s" }} />
        <circle cx="268" cy="140" r="1.7" />
      </g>
      <g className={s.constGroup}>
        <polyline points="470,60 522,84 588,70 632,110" />
        <circle cx="470" cy="60" r="1.9" className={s.tw} style={{ animationDelay: "-2.1s" }} />
        <circle cx="522" cy="84" r="1.6" />
        <circle cx="588" cy="70" r="2.3" className={s.tw} style={{ animationDelay: "-0.6s" }} />
        <circle cx="632" cy="110" r="1.8" />
      </g>
      {/* 追加の星座（右上） */}
      <g className={s.constGroup}>
        <polyline points="760,150 812,120 872,146 905,196" />
        <circle cx="760" cy="150" r="1.9" className={s.tw} style={{ animationDelay: "-1.5s" }} />
        <circle cx="812" cy="120" r="1.5" />
        <circle cx="872" cy="146" r="2.1" className={s.tw} style={{ animationDelay: "-0.3s" }} />
        <circle cx="905" cy="196" r="1.6" />
      </g>
      <circle cx="340" cy="120" r="1.6" className={s.tw} style={{ animationDelay: "-0.9s" }} />
      <circle cx="395" cy="52" r="1.4" />
      <circle cx="210" cy="200" r="1.4" className={s.tw} style={{ animationDelay: "-3.4s" }} />
      <circle cx="60" cy="170" r="1.5" />
      <circle cx="705" cy="60" r="1.7" className={s.tw} style={{ animationDelay: "-2.6s" }} />
      <circle cx="540" cy="150" r="1.3" />
      <circle cx="965" cy="90" r="1.6" className={s.tw} style={{ animationDelay: "-0.4s" }} />
      {/* 追加：散らばる星をさらに増量（幻想的に） */}
      <circle cx="120" cy="240" r="1.3" className={s.tw} style={{ animationDelay: "-1.1s" }} />
      <circle cx="285" cy="70" r="1.2" />
      <circle cx="440" cy="180" r="1.4" className={s.tw} style={{ animationDelay: "-2.9s" }} />
      <circle cx="150" cy="110" r="1.2" className={s.tw} style={{ animationDelay: "-0.7s" }} />
      <circle cx="620" cy="200" r="1.3" />
      <circle cx="660" cy="120" r="1.2" className={s.tw} style={{ animationDelay: "-3.1s" }} />
      <circle cx="880" cy="60" r="1.4" className={s.tw} style={{ animationDelay: "-1.8s" }} />
      <circle cx="500" cy="90" r="1.2" />
      <circle cx="30" cy="90" r="1.3" className={s.tw} style={{ animationDelay: "-2.2s" }} />
      <circle cx="770" cy="230" r="1.2" className={s.tw} style={{ animationDelay: "-0.5s" }} />
      <circle cx="930" cy="150" r="1.3" />
      <circle cx="250" cy="150" r="1.1" className={s.tw} style={{ animationDelay: "-4s" }} />
      <circle cx="580" cy="40" r="1.2" className={s.tw} style={{ animationDelay: "-1.4s" }} />
      <circle cx="420" cy="110" r="1.1" />
    </svg>
  );
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
        return;

      const mm = gsap.matchMedia();
      mm.add(
        { isMobile: "(max-width: 899px)", isDesktop: "(min-width: 900px)" },
        (ctx) => {
          const { isMobile } = ctx.conditions as { isMobile: boolean };

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "+=120%",
              pin: `.${s.pin}`,
              scrub: 1,
            },
          });

          tl
            // 太陽方向へ控えめにズーム
            .to(`.${s.scene}`, { scale: isMobile ? 1.16 : 1.12, ease: "none" }, 0)
            .to(`.${s.orbZoom}`, { scale: 1.14, ease: "none" }, 0)
            // 背景の雲（一番奥の巻雲）：スクロールで上へ流れながら消える
            .to(
              `.${s.cloudWispA}`,
              { opacity: 0, yPercent: -16, ease: "none", duration: 0.7 },
              0
            )
            // 雲パララックス：奥はゆっくり上へ／手前は速く下へ
            .to(`.${s.cloudLeft}`, { yPercent: 9, ease: "none" }, 0)
            .to(`.${s.cloudRight}`, { yPercent: 6, ease: "none" }, 0)
            .to(`.${s.cloudFront}`, { yPercent: 20, ease: "none" }, 0)
            .to(`.${s.sky}`, { yPercent: -5, ease: "none" }, 0)
            .to(`.${s.skyNight}`, { yPercent: -5, ease: "none" }, 0)
            // タイポ・人物も別速度で
            .to(`.${s.name}`, { yPercent: -20, ease: "none" }, 0)
            .to(`.${s.person}`, { yPercent: -4, ease: "none" }, 0);
        }
      );
    },
    { scope: root }
  );

  return (
    <section ref={root} className={s.hero} aria-label="Hero">
      <div className={s.pin}>
        <div className={s.scene}>
          {/* ベース：雲のないクリーンなグラデ空（cover で全面カバー） */}
          <img className={s.sky} src="/hero/sky-day.jpg" alt="" aria-hidden="true" />
          <img
            className={s.skyNight}
            src="/hero/sky-night.webp"
            alt=""
            aria-hidden="true"
          />

          {/* 奥：薄い巻雲（純黒背景で生成し直したクリーン素材） */}
          <img className={s.cloudWispA} src="/hero/cloud-wisp.webp" alt="" aria-hidden="true" />

          {/* 星の装飾 */}
          <div className={s.stars} aria-hidden="true" />
          <Constellations />

          {/* 左右の雲（KVの左と右にフレーミング／人物の背後） */}
          <img className={s.cloudLeft} src="/hero/kv-left2.webp" alt="" aria-hidden="true" />
          <img className={s.cloudRight} src="/hero/kv-right.webp" alt="" aria-hidden="true" />

          {/* 太陽 */}
          <div className={s.heroOrb}>
            <div className={s.orbZoom}>
              <Orb />
            </div>
          </div>

          <img className={s.person} src="/hero/person.webp" alt="岩崎怜" />

          {/* 前景の雲海（PCのみ・人物の足元を包む） */}
          <img className={s.cloudFront} src="/hero/cloud-front.webp" alt="" aria-hidden="true" />
        </div>

        {/* 巨大タイトル＋肩書き */}
        <div className={s.titleBlock}>
          <h1 className={s.name}>
            REN
            <br />
            IWASAKI
          </h1>
          <p className={s.subtitle}>Web AI Director</p>
        </div>

        <div className={s.scrollHint} aria-hidden="true">
          SCROLL
        </div>
      </div>
    </section>
  );
}
