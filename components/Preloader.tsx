"use client";

import { useEffect, useRef, useState } from "react";
import s from "./Preloader.module.css";

// Studies の星座と同じスパークル形状を使い、家族としての見た目を揃える
const SPARKLE =
  "M0,-10 C1.4,-3.4 3.4,-1.4 10,0 C3.4,1.4 1.4,3.4 0,10 C-1.4,3.4 -3.4,1.4 -10,0 C-3.4,-1.4 -1.4,-3.4 0,-10 Z";

// 左下から右上へ昇る配置。夜明けに向かう動きを形そのものに持たせる
const NODES: [number, number, number][] = [
  [40, 196, 0.72],
  [152, 148, 0.9],
  [258, 178, 0.66],
  [366, 100, 1],
  [472, 134, 0.78],
  [566, 62, 0.86],
];

// ヒーローで最初に必要になる画像。これらの読み込みを進捗として数える
const HERO_ASSETS = [
  "/hero/logo.webp",
  "/hero/sky-day.jpg",
  "/hero/kv-left2.webp",
  "/hero/kv-right.webp",
  "/hero/cloud-wisp.webp",
  "/hero/cloud-front.webp",
  "/hero/person.webp",
  "/hero/sun.webp",
  "/hero/moon.webp",
];

const MIN_DURATION = 900; // 一瞬で消えて何が起きたか分からなくなるのを防ぐ

export default function Preloader() {
  const [active, setActive] = useState(true);
  const [shown, setShown] = useState(0); // 表示用（実測値へ滑らかに追従させる）
  const [dawn, setDawn] = useState(false);
  const [lift, setLift] = useState(false);

  const lineRef = useRef<SVGPolylineElement>(null);
  const targetRef = useRef(0); // 実測の進捗
  const startedAtRef = useRef(0);

  // 同一セッションの2回目以降は出さない
  useEffect(() => {
    if (sessionStorage.getItem("rei-preloaded") === "1") setActive(false);
  }, []);

  useEffect(() => {
    if (!active) return;

    startedAtRef.current = Date.now();
    document.body.style.overflow = "hidden";

    // 実際の画像読み込みを数える
    let loaded = 0;
    const total = HERO_ASSETS.length;
    const bump = () => {
      loaded += 1;
      targetRef.current = (loaded / total) * 100;
    };
    HERO_ASSETS.forEach((src) => {
      const img = new Image();
      img.onload = bump;
      img.onerror = bump; // 失敗しても進捗は進める。ここで止まる方が害が大きい
      img.src = src;
    });

    /*
     * 実測値へ滑らかに寄せる。数字が飛ぶと安っぽく見える。
     * requestAnimationFrame は背面タブで完全に止まり、進捗が0%のまま固まって
     * スクロールロックも解けなくなるため、setInterval を使う。
     * 背面では間引かれるが発火はするので、いずれ必ず完了まで到達する。
     */
    const id = setInterval(() => {
      setShown((prev) => {
        const next = prev + (targetRef.current - prev) * 0.12;
        return next > 99.6 ? 100 : next;
      });
    }, 16);

    // 最後の安全弁。何かの理由で画像の onload が返らなくても必ず開ける
    const failsafe = setTimeout(() => {
      targetRef.current = 100;
      setShown(100);
    }, 8000);

    return () => {
      clearInterval(id);
      clearTimeout(failsafe);
      document.body.style.overflow = "";
    };
  }, [active]);

  // 線の描画量を進捗に合わせる
  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;
    const len = line.getTotalLength();
    line.style.strokeDasharray = `${len}`;
    line.style.strokeDashoffset = `${len * (1 - shown / 100)}`;
  }, [shown]);

  // 完了 → 夜明け → 幕が上がる
  useEffect(() => {
    if (!active || shown < 100) return;
    const wait = Math.max(0, MIN_DURATION - (Date.now() - startedAtRef.current));

    const t1 = setTimeout(() => setDawn(true), wait);
    const t2 = setTimeout(() => setLift(true), wait + 620);
    const t3 = setTimeout(() => {
      sessionStorage.setItem("rei-preloaded", "1");
      setActive(false);
    }, wait + 1700);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [shown, active]);

  if (!active) return null;

  const pct = Math.round(shown);

  return (
    <div
      className={`${s.overlay} ${dawn ? s.dawn : ""} ${lift ? s.lift : ""}`}
      role="status"
      aria-live="polite"
      aria-label={`読み込み中 ${pct}パーセント`}
    >
      <svg
        className={`${s.sky} ${dawn ? s.flare : ""}`}
        viewBox="0 0 606 240"
        fill="none"
        aria-hidden="true"
      >
        <polyline
          ref={lineRef}
          className={s.line}
          points={NODES.map(([x, y]) => `${x},${y}`).join(" ")}
        />
        {NODES.map(([cx, cy, scale], i) => {
          // 線がその星に届いたら灯る
          const threshold = (i / (NODES.length - 1)) * 100;
          return (
            <path
              key={i}
              className={`${s.star} ${shown >= threshold ? s.starOn : ""}`}
              d={SPARKLE}
              transform={`translate(${cx},${cy}) scale(${scale})`}
            />
          );
        })}
      </svg>

      <div className={s.rule}>
        <div
          className={s.ruleFill}
          style={{ transform: `scaleX(${shown / 100})` }}
        />
      </div>

      <p className={s.counter}>
        {String(pct).padStart(3, "0")}
        <span className={s.pct}>%</span>
      </p>
    </div>
  );
}
