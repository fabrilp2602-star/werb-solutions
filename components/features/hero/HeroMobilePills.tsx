"use client";

import React from "react";
import { useSite } from "@/context/SiteContext";
import { HERO_SLIDES } from "./heroData";

interface HeroMobilePillsProps {
  active: number;
  onSelect: (index: number) => void;
}

export default function HeroMobilePills({ active, onSelect }: HeroMobilePillsProps) {
  const { t } = useSite();

  // Mapeo traducido según locale activo
  const pillLabels: Record<number, string> = {
    0: t.heroPills?.highVoltage || "⚡ Infraestructura",
    1: t.heroPills?.solar || "☀️ Energía",
    2: t.heroPills?.lighting || "💡 Luces",
    3: t.heroPills?.fireAlarm || "🚨 FDNY",
    4: t.heroPills?.demolition || "🏗️ Obras",
  };

  // 3 botones con menos caracteres arriba:
  // [1] Energía/Solar, [2] Luces/Lighting, [3] FDNY
  const topPillIndices = [1, 2, 3];

  // 2 botones con más caracteres abajo:
  // [0] Infraestructura/High-Voltage, [4] Obras/Demolición/Controlled
  const bottomPillIndices = [0, 4];

  return (
    <div className="flex flex-col items-center gap-1.5 w-full max-w-xs mx-auto pt-2 md:hidden">
      {/* Fila 1 (Arriba): 3 botones con menos caracteres */}
      <div className="flex items-center justify-center gap-1.5 w-full">
        {topPillIndices.map((idx) => {
          const s = HERO_SLIDES[idx];
          const isCurrent = idx === active;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => onSelect(idx)}
              className={`flex-1 py-1 px-1.5 rounded-lg text-[10.5px] font-semibold transition-all cursor-pointer whitespace-nowrap text-center ${
                isCurrent
                  ? "bg-[#e2c97d] text-[#1a1608] font-bold shadow-md shadow-[#e2c97d]/20 ring-1 ring-[#e2c97d]"
                  : "bg-white/10 text-slate-300 border border-white/10 hover:bg-white/20 backdrop-blur-sm"
              }`}
            >
              {pillLabels[idx]}
            </button>
          );
        })}
      </div>

      {/* Fila 2 (Abajo): 2 botones con más caracteres */}
      <div className="flex items-center justify-center gap-1.5 w-full">
        {bottomPillIndices.map((idx) => {
          const s = HERO_SLIDES[idx];
          const isCurrent = idx === active;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => onSelect(idx)}
              className={`flex-1 py-1 px-2 rounded-lg text-[10.5px] font-semibold transition-all cursor-pointer whitespace-nowrap text-center ${
                isCurrent
                  ? "bg-[#e2c97d] text-[#1a1608] font-bold shadow-md shadow-[#e2c97d]/20 ring-1 ring-[#e2c97d]"
                  : "bg-white/10 text-slate-300 border border-white/10 hover:bg-white/20 backdrop-blur-sm"
              }`}
            >
              {pillLabels[idx]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
