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
import { ArrowRight, Layers, PhoneCall } from "lucide-react";

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
    <>
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

        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-36 sm:pb-40 md:pb-32">
          {/* Columna Narrativa (Centrada en móvil, a la izquierda en escritorio) */}
          <HeroNarrative
            active={rail.active}
            onSelect={rail.setActive}
            onSelectService={onSelectService}
            isHomePage={isHomePage}
            phone={phone}
          />
        </div>

        {/* 🔒 DOCK INFERIOR (ANCLADO EN EL FONDO DE LA PANTALLA: BOTONES A LA IZQUIERDA, RIEL A LA DERECHA) */}
        <div className="absolute inset-x-0 bottom-[104px] sm:bottom-[104px] md:bottom-8 lg:bottom-10 z-30 pointer-events-auto">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center md:items-end justify-between gap-4">
            
            {/* LADO IZQUIERDO: Pastillas Móviles y Botones de Acción */}
            <div className="flex flex-col items-center md:items-start space-y-2.5 w-full md:w-auto">
              {/* Pastillas de Categoría Móvil */}
              <HeroMobilePills active={rail.active} onSelect={rail.setActive} />

              {/* Botones de Acción Principales */}
              <div className="flex flex-row items-center justify-center md:justify-start gap-2.5 w-full max-w-sm sm:max-w-none">
                <a
                  href={isHomePage ? "#nyc-lead-wizard" : HERO_SLIDES[rail.active].ctaPrimary.href}
                  onClick={() => onSelectService && onSelectService(HERO_SLIDES[rail.active].title)}
                  className="gold-gradient-btn inline-flex h-11 flex-1 sm:flex-initial sm:w-48 items-center justify-center gap-2 rounded-xl text-xs font-extrabold uppercase tracking-wider text-[#1a1608] shadow-[0_0_20px_rgba(210,142,27,0.35)] transition hover:brightness-110 active:scale-95 cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>{t.heroActions?.schedule || "Agendar"}</span>
                  <ArrowRight size={15} className="shrink-0" />
                </a>

                <a
                  href={isHomePage ? `/services#${HERO_SLIDES[rail.active].serviceId}` : HERO_SLIDES[rail.active].ctaSecondary.href}
                  className="inline-flex h-11 flex-1 sm:flex-initial sm:w-48 items-center justify-center gap-2 rounded-xl border border-white/25 bg-black/60 text-xs font-extrabold uppercase tracking-wider text-white backdrop-blur-md hover:bg-white/20 active:scale-95 transition-all cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Layers size={15} className="shrink-0" />
                  <span>{t.heroActions?.catalog || "Catálogo"}</span>
                </a>

                {isHomePage && (
                  <a
                    href={`tel:${phone.replace(/\D/g, "")}`}
                    className="hidden xl:inline-flex h-11 w-48 items-center justify-center gap-2 rounded-xl border border-white/15 bg-black/40 px-4 text-xs font-semibold text-slate-200 hover:text-white hover:border-[#e2c97d]/40 transition-colors cursor-pointer active:scale-95 whitespace-nowrap shrink-0"
                  >
                    <PhoneCall size={14} className="text-[#e2c97d] shrink-0" />
                    <span>{t.heroActions?.call || "24/7 Llamada"}</span>
                  </a>
                )}
              </div>
            </div>

            {/* LADO DERECHO (ESCRITORIO): Riel de Tarjetas y Controles ANCLADOS ABAJO */}
            <div className="hidden md:flex flex-col items-end gap-3 shrink-0">
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

      </div>
    </section>

    {/* 2. STATS STRIP (Directamente debajo del Hero) */}
    <HeroStatsStrip />
  </>
  );
}
