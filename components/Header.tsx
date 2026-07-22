"use client";

import { Fragment, useEffect, useState } from "react";
import s from "./Header.module.css";

/** ラベル中の「&」だけ明朝に落とす（Playfair の & は装飾が強く浮くため） */
function withAmp(label: string) {
  return label.split("&").map((part, i) => (
    <Fragment key={i}>
      {i > 0 && <span className={s.drawerAmp}>&amp;</span>}
      {part}
    </Fragment>
  ));
}

// 番号付きセクション（01〜05）と1対1に対応させる。
// History は Profile 内のブロックなのでナビからは外し、
// 代わりに到達手段の無かった How I Work（#studies）を入れる。
const NAV = [
  ["Profile", "#profile"],
  ["How I Work", "#studies"],
  ["Works", "#works"],
  ["What I Do", "#skills"],
  ["Skills & Tools", "#stack"],
  ["Contact", "#contact"],
] as const;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [sky, setSky] = useState<"day" | "night">("day");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.sky = sky;
  }, [sky]);

  return (
    <header className={`${s.header} ${scrolled ? s.solid : ""}`}>
      <a href="#top" className={s.logo}>
        <img src="/hero/logo.webp" alt="IRC" className={s.logoImg} />
      </a>

      <nav className={s.nav} aria-label="メインナビゲーション">
        {NAV.map(([label, href]) => (
          <a key={href} href={href} className={s.link}>
            {label}
          </a>
        ))}
      </nav>

      <div className={s.actions}>
        <button
          className={s.skyToggle}
          aria-label={sky === "day" ? "夜モードに切り替え" : "昼モードに切り替え"}
          onClick={() => setSky((v) => (v === "day" ? "night" : "day"))}
        >
          {sky === "day" ? "☾" : "☀"}
        </button>

        <a href="#contact" className={s.navCta}>
          Contact
        </a>

        <button
          className={s.burger}
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`${s.burgerLine} ${open ? s.burgerOpen : ""}`} />
        </button>
      </div>

      <div
        className={`${s.drawer} ${open ? s.drawerOpen : ""}`}
        onClick={() => setOpen(false)}
      >
        <nav className={s.drawerNav} aria-label="モバイルナビゲーション">
          {NAV.map(([label, href]) => (
            <a key={href} href={href} className={s.drawerLink}>
              {withAmp(label)}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
