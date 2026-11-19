"use client";

import React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

export function HeroCardRail({
  items,
  active,
  onSelect,
  nextIntakeLabel = "NEXT INTAKE",
}: {
  items: {
    id: number;
    title: string;
    subtitle: string;
    imageUrl: string;
  }[];
  active: number;
  onSelect: (index: number) => void;
  nextIntakeLabel?: string;
}) {
  const upcoming = Array.from(
    { length: Math.min(items.length - 1, 4) },
    (_, k) => (active + 1 + k) % items.length
  );

  return (
    <ul className="hidden items-end justify-end gap-2.5 md:flex" aria-label="Upcoming Disciplines">
      {upcoming.map((index, pos) => {
        const item = items[index];
        const isNext = pos === 0;
        return (
          <li
            key={item.id}
            className={`relative shrink-0 overflow-hidden rounded-2xl border transition-all duration-700 ease-out animate-in fade-in slide-in-from-right-4 ${
              isNext
                ? "h-[110px] w-[180px] lg:h-[125px] lg:w-[210px] border-[#e2c97d] shadow-xl shadow-[#b79f53]/25 ring-1 ring-[#e2c97d]/50"
                : "h-[110px] w-[95px] lg:h-[125px] lg:w-[110px] border-white/20 opacity-80 hover:opacity-100 hover:scale-[1.03]"
            }`}
          >
            <button
              type="button"
              onClick={() => onSelect(index)}
              aria-label={`View ${item.title}`}
              className="absolute inset-0 z-10 h-full w-full cursor-pointer"
            />
            <Image
              src={item.imageUrl}
              alt=""
              fill
              sizes={isNext ? "210px" : "110px"}
              className="object-cover transition-transform duration-700 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
            
            {isNext && (
              <span className="absolute left-2.5 top-2.5 rounded-full border border-[#e2c97d]/50 bg-black/75 px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-widest text-[#ece8a6] backdrop-blur-md">
                {nextIntakeLabel}
              </span>
            )}
            
            <div className="absolute inset-x-0 bottom-0 p-2.5 text-white">
              <p className={`font-bold leading-tight ${isNext ? "text-xs line-clamp-1" : "hidden text-[10px]"}`}>
                {item.title}
              </p>
              {isNext && (
                <p className="mt-0.5 line-clamp-1 text-[10px] text-slate-300">
                  {item.subtitle}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export function RailControls({
  active,
  total,
  playing,
  onToggle,
  onPrev,
  onNext,
  label = "DISCIPLINA",
}: {
  active: number;
  total: number;
  playing: boolean;
  onToggle: () => void;
  onPrev: () => void;
  onNext: () => void;
  label?: string;
}) {
  return (
    <div className="hidden w-full max-w-[440px] items-center justify-between gap-4 rounded-2xl border border-white/15 bg-black/55 p-2.5 backdrop-blur-xl md:flex shadow-2xl">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggle}
          aria-label={playing ? "Pause" : "Play"}
          className="rounded-xl bg-white/10 p-2.5 text-white hover:bg-white/20 transition-colors cursor-pointer active:scale-95"
        >
          {playing ? <Pause size={15} /> : <Play size={15} />}
        </button>
        <div>
          <p className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-300">
            {label} {active + 1} / {total}
          </p>
          <div className="mt-1 h-1 w-28 overflow-hidden rounded-full bg-white/20">
            <div
              className={`h-full origin-left bg-gradient-to-r from-[#ece8a6] to-[#b79f53] transition-all duration-500 ${
                active === 0 ? "w-1/5" : active === 1 ? "w-2/5" : active === 2 ? "w-3/5" : active === 3 ? "w-4/5" : "w-full"
              }`}
            />
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous Discipline"
          className="rounded-xl bg-white/10 p-2.5 text-white hover:bg-[#b79f53]/20 hover:text-[#ece8a6] transition-colors cursor-pointer active:scale-95"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          type="button"
          onClick={onNext}
          aria-label="Next Discipline"
          className="rounded-xl bg-white/10 p-2.5 text-white hover:bg-[#b79f53]/20 hover:text-[#ece8a6] transition-colors cursor-pointer active:scale-95"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
