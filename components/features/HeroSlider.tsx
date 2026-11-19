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

/** COMPONENTE PRINCIPAL HERO SLIDER (ESTILO VERMILION FULL-BLEED 100svh) */
export default function HeroSlider({
  onSelectService,
  isHomePage = false,
  phone = "+1 (929) 584-7647",
  showStats = false,
}: HeroSliderProps) {
  const { t, texts } = useSite();
  const rail = useRail(HERO_SLIDES.length);

  // Altura exacta: 100svh menos los 32px (h-8) de la marquesina superior
  const heroHeightClass = texts.marqueeEnabled
    ? "h-[calc(100svh-32px)] min-h-[calc(100svh-32px)] max-h-[calc(100svh-32px)] mt-8"
    : "h-[100svh] min-h-[100svh] max-h-[100svh] mt-0";

  return (
    <section className={`relative z-10 select-none overflow-hidden bg-black text-white ${heroHeightClass}`} aria-label="NYC Engineered Electrical Services">
      
      {/* 1. HERO MAIN VIEWPORT (Ocupa exactamente el 100% de la pantalla menos la marquesina, sin desbordarse ni 1px) */}
      <div className="relative isolate flex h-full w-full items-center justify-center overflow-hidden bg-black pt-14 pb-8 sm:pt-20 sm:pb-12 lg:pt-24 lg:pb-14">
        
        {/* Background crossfade images (FULL BLEED COVER with responsive mobile 9:16 and desktop 16:9) */}
        <div className="absolute inset-0 -z-20">
          {HERO_SLIDES.map((s, i) => (
            <React.Fragment key={s.id}>
              {/* Mobile Image (9:16) */}
              <div
                className={`sm:hidden absolute inset-0 transition-opacity duration-1000 ease-out ${
                  i === rail.active ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
                }`}
              >
                <Image
                  src={s.mobileImageUrl || s.imageUrl}
                  alt={s.title}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className="object-cover object-center"
                />
              </div>

              {/* Desktop Image (16:9) */}
              <div
                className={`hidden sm:block absolute inset-0 transition-opacity duration-1000 ease-out ${
                  i === rail.active ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
                }`}
              >
                <Image
                  src={s.imageUrl}
                  alt={s.title}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className="object-cover object-center"
                />
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Liquid dark vignette gradients: Left gradient ONLY on md+ desktop, NEVER on mobile */}
        <div className="absolute inset-0 -z-10 hidden md:block bg-gradient-to-r from-black/95 via-black/80 to-black/30 lg:from-black/95 lg:via-black/70 lg:to-black/20" />
        {/* Soft top/bottom cinematic gradient for header and bottom bar readability */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/25 to-black/80 md:from-black/85 md:via-transparent md:to-black/90" />

        <div className="mx-auto grid w-full max-w-7xl items-center gap-6 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
          
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

      {/* 2. STATS STRIP (Condicional estricto) */}
      {showStats && <HeroStatsStrip />}

    </section>
  );
}
