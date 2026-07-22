"use client";

import { useRef } from "react";
import { useReveal } from "@/lib/useReveal";
import s from "./Sections.module.css";

const HISTORY = [
  {
    year: "2020",
    title: "テレビ業界でキャリアをスタート",
    desc: "テレビのアシスタントディレクターとして映像制作に携わり、数々の地上波バラエティ番組の制作を担当。",
  },
  {
    year: "2022",
    title: "Webディレクターへ転身",
    desc: "Web制作会社へ転職し、Webディレクターとしてキャリアをスタート。エンターテインメント企業のWebサイト制作をはじめ、大手広告代理店案件など、多様なプロジェクトの企画・情報設計・制作ディレクションを担当。",
  },
  {
    year: "2026",
    title: "Web / AI Directorとして活動",
    desc: "生成AIを制作フローへ取り入れ、企画・設計・デザイン・コンテンツ制作まで一貫して対応。WebディレクションとAIクリエイティブを掛け合わせ、より速く、より本質的なアウトプットを追求しています。",
  },
] as const;

export default function Profile() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section ref={root} id="profile">
      <div className="container">
        <p className="section-label" data-reveal>
          <span className="section-no">01</span>Profile
        </p>
        <h2 className="section-title" data-reveal>
          About Me
        </h2>

        <div className={s.aboutGrid}>
          {/* 右：ポートレート（デスクトップでは追従） */}
          <figure className={s.aboutMedia} data-reveal>
            <img src="/hero/aboutme-crop.webp" alt="岩崎怜のポートレート" loading="lazy" />
          </figure>

          {/* 左：紹介文 → ヒストリー → バイタルサイン */}
          <div className={s.aboutMain}>
            <div className={s.intro} data-reveal>
              <p className={s.introTitleEn}>
                Ideas become experiences through direction.
              </p>
              <h3 className={s.introTitle}>
                アイデアは、形になって
                <br className={s.brMobile} />
                初めて価値になる。
              </h3>

              <p className={s.lead}>
                <span className={s.drop}>私</span>
                はWebディレクターとして、企画・情報設計・デザイン・AIを
                横断しながら、「伝わる体験」を設計することを大切にしています。
              </p>
              <p>
                Webサイト、LP、SNSコンテンツ、AIクリエイティブまで。
                目的から逆算し、企画から制作・改善まで一貫して伴走します。
              </p>
              <p>
                AIは制作を置き換えるためではなく、思考を加速させるためのツール。
                より速く、より深く考え、本質的な価値を生み出すことを
                目指しています。
              </p>
            </div>

            <div className={s.nameRow} data-reveal>
              <p className={s.profileName}>岩崎 怜</p>
              <p className={s.profileNameEn}>
                <span>Ren Iwasaki</span>
                {/* PCは肩書きをそのまま続け、SPは2行目に短縮版を出す */}
                <span className={s.enRoleFull}> — Web Director / AI Creative Creator</span>
                <span className={s.enRoleShort}>Web / AI Director</span>
              </p>
            </div>

            {/* History */}
            {/* 各項目を個別に data-reveal し、1件ずつ順にフェードインさせる */}
            <div className={s.aboutBlock} id="history">
              <p className={s.blockLabel} data-reveal>
                History
              </p>
              <ol className={s.miniTimeline}>
                {HISTORY.map((h) => (
                  <li key={h.year} data-reveal>
                    <span className={s.miniYear}>{h.year}</span>
                    <div className={s.miniBody}>
                      <h4 className={s.miniTitle}>{h.title}</h4>
                      <p className={s.miniDesc}>{h.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
