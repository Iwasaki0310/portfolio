"use client";

import { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MOTION } from "./motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * root配下の [data-reveal] 要素を opacity+translateY でフェードイン。
 * 同一trigger内の兄弟は stagger で順番に出現する。
 */
export function useReveal(root: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
        return;

      const els = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      els.forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: MOTION.reveal.y,
          duration: MOTION.dur.base,
          ease: MOTION.ease.outStrong,
          delay: (i % 4) * 0.06,
          scrollTrigger: {
            trigger: el,
            start: MOTION.reveal.start,
          },
        });
      });
    },
    { scope: root }
  );
}
