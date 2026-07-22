// モーショントークン — サイト全体で統一
export const MOTION = {
  dur: {
    fast: 0.6,
    base: 0.9,
    slow: 1.2,
  },
  ease: {
    out: "power2.out",
    outStrong: "power3.out",
    inOut: "power3.inOut",
  },
  reveal: {
    y: 32,
    stagger: 0.12,
    start: "top 80%",
  },
} as const;
