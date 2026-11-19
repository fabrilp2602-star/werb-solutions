"use client";

import React from "react";
import Image from "next/image";
import { useSite } from "@/context/SiteContext";
import { HERO_SLIDES, HeroSlide, StatItem, DEFAULT_STATS } from "./hero/heroData";
import { useRail, AnimatedCounter } from "./hero/HeroControls";
import { HeroCardRail, RailControls } from "./hero/HeroDesktopRail";
import HeroNarrative from "./hero/HeroNarrative";
import HeroStatsStrip from "./hero/HeroStatsStrip";
import HeroMobilePills from "./hero/HeroMobilePills";

export { 
  HERO_SLIDES, 
  DEFAULT_STATS, 
  useRail, 
  AnimatedCounter, 
  HeroCardRail, 
  RailControls,
  HeroNarrative,
  HeroStatsStrip,
  HeroMobilePills
};
export type { HeroSlide, StatItem } from "./hero/heroData";

export interface HeroSliderProps {
  onSelectService?: (serviceName: string) => void;
  isHomePage?: boolean;
  phone?: string;
  showStats?: boolean;
}

/** COMPONENTE PRINCIPAL HERO SLIDER (< 120 LÍNEAS - MODULAR Y CENTRADO EN MÓVIL) */
export default function HeroSlider({
  onSelectService,
  isHomePage = false,
  phone = "+1 (929) 584-7647",
  showStats = true,
}: HeroSliderProps) {
  const { t } = useSite();
  const rail = useRail(HERO_SLIDES.length);

  return (
    <section className="relative z-10 select-none overflow-hidden bg-black text-white" aria-label="NYC Engineered Electrical Services">
      
      {/* 1. HERO MAIN VIEWPORT (Ocupa la pantalla con imagen de fondo completa detrás del navbar) */}
      <div className="relative isolate flex min-h-[680px] lg:min-h-[740px] items-center overflow-hidden bg-black pt-28 pb-14 sm:pt-32 lg:pt-36">
        
        {/* Background crossfade images (FULL BLEED COVER) */}
        <div className="absolute inset-0 -z-20">
          {HERO_SLIDES.map((s, i) => (
            <Image
              key={s.id}
              src={s.imageUrl}
              alt={s.title}
              fill
              priority={i === 0}
              sizes="100vw"
              className={`object-cover transition-opacity duration-1000 ease-out ${
                i === rail.active ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
              }`}
            />
          ))}
        </div>

        {/* Liquid dark vignette gradients for optimal text contrast and high-end cinematic feel */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/95 via-black/80 to-black/30 lg:from-black/95 lg:via-black/70 lg:to-black/20" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/85 via-transparent to-black/90" />

        <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
          
          {/* Columna Narrativa (Centrada en móvil, a la izquierda en escritorio) */}
          <HeroNarrative
            active={rail.active}
            onSelect={rail.setActive}
            onSelectService={onSelectService}
            isHomePage={isHomePage}
            phone={phone}
          />

          {/* Right Bottom Corner: Rail & Controls (PATRÓN MODULARES GM EXACTO) */}
          <div className="hidden flex-col items-end justify-end gap-3 md:flex lg:col-span-5 lg:self-end">
            <HeroCardRail
              items={HERO_SLIDES.map((s, idx) => ({
                id: s.id,
                title: t.slides[idx]?.title || s.title,
                subtitle: t.slides[idx]?.subtitle || s.subtitle,
                imageUrl: s.imageUrl,
              }))}
              active={rail.active}
              onSelect={rail.setActive}
              nextIntakeLabel={t.sliderMeta?.nextIntake || "NEXT INTAKE"}
            />
            <RailControls
              active={rail.active}
              total={HERO_SLIDES.length}
              playing={rail.playing}
              onToggle={rail.togglePlay}
              onPrev={rail.prev}
              onNext={rail.next}
              label={t.sliderMeta?.disciplineLabel || "DISCIPLINE"}
            />
          </div>

        </div>
      </div>

      {/* 2. STATS STRIP (Directamente bajo el hero con contadores animados y traducciones dinámicas) */}
      {showStats && <HeroStatsStrip />}

    </section>
  );
}
