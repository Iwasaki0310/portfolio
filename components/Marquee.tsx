import s from "./Marquee.module.css";

const ITEMS = [
  "WEB DIRECTION",
  "NEXT.JS · GSAP",
  "AI CREATIVE",
  "UI / WEB PLANNING",
  "CONTENT PLANNING",
  "SNS MARKETING",
  "LP / WEB SITE",
  "世界のカメ図鑑 / TURTLE TIMES",
] as const;

export default function Marquee() {
  // シームレスループのため2セット並べる
  const sets = [0, 1];

  return (
    <div className={s.wrap} aria-label="分野・スキル一覧">
      <div className={s.track}>
        {sets.map((set) => (
          <ul className={s.list} key={set} aria-hidden={set === 1}>
            <li className={s.label}>
              <span className={s.labelArrow} aria-hidden="true">
                ¬
              </span>
              分野
            </li>
            {ITEMS.map((item) => (
              <li className={s.item} key={item}>
                {item}
                <span className={s.dot} aria-hidden="true">
                  ·
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
