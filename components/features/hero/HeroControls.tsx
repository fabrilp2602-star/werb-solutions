"use client";

import { useEffect, useRef, useState } from "react";

export function useRail(length: number, { startAfter = 3000, holdMs = 12000 } = {}) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [armed, setArmed] = useState(false);
  const holdUntil = useRef(0);

  useEffect(() => {
    const t = setTimeout(() => setArmed(true), startAfter);
    return () => clearTimeout(t);
  }, [startAfter]);

  useEffect(() => {
    if (!armed || !playing) return;
    const currentDuration = active === 0 ? 10000 : 6000;
    const t = setTimeout(() => {
      if (Date.now() < holdUntil.current) return;
      setActive((i) => (i + 1) % length);
    }, currentDuration);
    return () => clearTimeout(t);
  }, [armed, playing, length, active]);

  const manual = (fn: (i: number) => number) => {
    holdUntil.current = Date.now() + holdMs;
    setActive(fn);
  };

  return {
    active,
    setActive: (i: number) => manual(() => i),
    playing,
    togglePlay: () => setPlaying((p) => !p),
    next: () => manual((i) => (i + 1) % length),
    prev: () => manual((i) => (i - 1 + length) % length),
  };
}

export function AnimatedCounter({ value }: { value: string }) {
  const [displayValue, setDisplayValue] = useState("0");
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const match = value.match(/^([^\d]*)(\d+)(.*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const prefix = match[1] || "";
    const targetNumber = parseInt(match[2], 10);
    const suffix = match[3] || "";

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1800;
          const startTime = performance.now();

          const update = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeProgress * targetNumber);
            setDisplayValue(`${prefix}${current}${suffix}`);

            if (progress < 1) {
              requestAnimationFrame(update);
            } else {
              setDisplayValue(value);
            }
          };

          requestAnimationFrame(update);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [value]);

  return <span ref={elementRef}>{displayValue}</span>;
}
