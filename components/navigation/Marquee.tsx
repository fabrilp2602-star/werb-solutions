"use client";

import React from "react";
import { Zap, ShieldCheck } from "lucide-react";
import { useSite } from "@/context/SiteContext";

export default function Marquee() {
  const { texts } = useSite();

  if (!texts.marqueeEnabled) return null;

  return (
    <div className="fixed top-0 inset-x-0 z-50 h-8 overflow-hidden border-b border-white/10 bg-black/90 backdrop-blur-md text-slate-200 text-xs py-1.5 select-none">
      <div className="animate-marquee flex items-center whitespace-nowrap">
        <div className="flex items-center gap-8 px-4">
          <span className="flex items-center gap-2 font-mono font-semibold text-[#e6b93e]">
            <Zap className="h-3.5 w-3.5 text-[#e6b93e] fill-[#e6b93e]/20 animate-pulse" />
            {texts.marqueeText}
          </span>
          <span className="flex items-center gap-1.5 text-slate-400 uppercase tracking-widest text-[11px] font-bold">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            DOB NOW: VERIFIED MASTER ELECTRICIAN
          </span>
        </div>
        <div className="flex items-center gap-8 px-4" aria-hidden="true">
          <span className="flex items-center gap-2 font-mono font-semibold text-[#e6b93e]">
            <Zap className="h-3.5 w-3.5 text-[#e6b93e] fill-[#e6b93e]/20 animate-pulse" />
            {texts.marqueeText}
          </span>
          <span className="flex items-center gap-1.5 text-slate-400 uppercase tracking-widest text-[11px] font-bold">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            DOB NOW: VERIFIED MASTER ELECTRICIAN
          </span>
        </div>
      </div>
    </div>
  );
}
