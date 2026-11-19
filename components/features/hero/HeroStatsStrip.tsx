"use client";

import React from "react";
import { AnimatedCounter } from "./HeroControls";
import { useSite } from "@/context/SiteContext";

export default function HeroStatsStrip() {
  const { t } = useSite();

  return (
    <div className="border-t border-white/10 bg-[#070a12] text-white">
      <dl className="mx-auto grid max-w-7xl grid-cols-2 divide-white/10 sm:grid-cols-4 sm:divide-x">
        <div className="flex flex-col items-center justify-center px-4 py-4 text-center sm:h-[92px]">
          <dd className="order-1 font-mono text-2xl font-bold leading-none text-[#ece8a6] sm:text-3xl">
            <AnimatedCounter value={t.heroStats?.passRate || "100%"} />
          </dd>
          <dt className="order-2 mt-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-slate-400 sm:text-xs">
            {t.heroStats?.passRateLabel || "DOB NOW™ Inspection Sign-Off"}
          </dt>
        </div>
        <div className="flex flex-col items-center justify-center px-4 py-4 text-center sm:h-[92px]">
          <dd className="order-1 font-mono text-2xl font-bold leading-none text-[#ece8a6] sm:text-3xl">
            <AnimatedCounter value={t.heroStats?.dispatch || "<45m"} />
          </dd>
          <dt className="order-2 mt-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-slate-400 sm:text-xs">
            {t.heroStats?.dispatchLabel || "24/7 Manhattan Rapid Emergency"}
          </dt>
        </div>
        <div className="flex flex-col items-center justify-center px-4 py-4 text-center sm:h-[92px]">
          <dd className="order-1 font-mono text-2xl font-bold leading-none text-[#ece8a6] sm:text-3xl">
            <AnimatedCounter value={t.heroStats?.insurance || "$2M"} />
          </dd>
          <dt className="order-2 mt-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-slate-400 sm:text-xs">
            {t.heroStats?.insuranceLabel || "Commercial General Liability COI"}
          </dt>
        </div>
        <div className="flex flex-col items-center justify-center px-4 py-4 text-center sm:h-[92px]">
          <dd className="order-1 font-mono text-2xl font-bold leading-none text-[#ece8a6] sm:text-3xl">
            <AnimatedCounter value={t.heroStats?.experience || "15+"} />
          </dd>
          <dt className="order-2 mt-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-slate-400 sm:text-xs">
            {t.heroStats?.experienceLabel || "Years Licensed NYC Practice"}
          </dt>
        </div>
      </dl>
    </div>
  );
}
