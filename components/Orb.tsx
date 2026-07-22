import s from "./Orb.module.css";

/**
 * 空に浮かぶ天体。昼は幻想的な太陽（うねる光条・ゆっくり回転）、
 * 夜は銀色の月（data-sky で切替）。どちらも背景透過の生成画像。
 */
export default function Orb() {
  return (
    <div className={s.orb} aria-hidden="true">
      <div className={s.sunSpin}>
        <img className={s.sun} src="/hero/sun.webp" alt="" />
      </div>
      <img className={s.moon} src="/hero/moon.webp" alt="" />
    </div>
  );
}
