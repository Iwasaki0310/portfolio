import s from "./Sections.module.css";

// ヘッダーと同じ構成に揃える（番号付きセクションと1対1）
const NAV = [
  ["Profile", "#profile"],
  ["How I Work", "#studies"],
  ["Works", "#works"],
  ["What I Do", "#skills"],
  ["Skills & Tools", "#stack"],
  ["Contact", "#contact"],
] as const;

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className="container">
        <div className={s.footerInner}>
          <nav className={s.footerNav} aria-label="フッターナビゲーション">
            {NAV.map(([label, href]) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
          </nav>
          <div className={s.footerSns}>
            <a
              href="https://www.instagram.com/r_iwa0310lv/"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                focusable="false"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
          <p className={s.copyright}>© 2026 Ren Iwasaki. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
