"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Layers,
  PhoneCall
} from "lucide-react";
import { useSite } from "@/context/SiteContext";
import { HERO_SLIDES, StatItem, DEFAULT_STATS } from "./hero/heroData";
import { useRail, AnimatedCounter } from "./hero/HeroControls";
import { HeroCardRail, RailControls } from "./hero/HeroDesktopRail";

export { HERO_SLIDES, DEFAULT_STATS, useRail, AnimatedCounter, HeroCardRail, RailControls };
export type { HeroSlide, StatItem } from "./hero/heroData";

export interface HeroSliderProps {
  onSelectService?: (serviceName: string) => void;
  isHomePage?: boolean;
  phone?: string;
  showStats?: boolean;
}

/** COMPONENTE PRINCIPAL HERO SLIDER (< 350 LÍNEAS - MODULAR Y OPTIMIZADO) */
export default function HeroSlider({
  onSelectService,
  isHomePage = false,
  phone = "+1 (929) 584-7647",
  showStats = false,
}: HeroSliderProps) {
  const { t } = useSite();
  const rail = useRail(HERO_SLIDES.length);
  const slide = HERO_SLIDES[rail.active];
  const activeTranslatedSlide = t.slides[rail.active] || slide;

  // Secuencia de pastillas móviles en 2 filas organizadas lógicamente
  // Fila 1: [0, 1] -> Infraestructura y Energía Solar
  // Fila 2: [2, 3, 4] -> Iluminación, FDNY y Demolición
  const mobilePillsLabels = [
    "⚡ Infraestructura", 
    "☀️ Energía", 
    "💡 Iluminación", 
    "🚨 FDNY", 
    "🏗️ Demolición"
  ];

  return (
    <section className="relative z-10 select-none overflow-hidden bg-black text-white" aria-label="NYC Engineered Electrical Services">
      
      {/* 1. HERO MAIN VIEWPORT (Ocupa la pantalla completa min-h-screen / min-h-[100svh] estilo Vermilion) */}
      <div className="relative isolate flex min-h-screen min-h-[100svh] flex-col justify-between overflow-hidden bg-black pt-24 pb-20 sm:pt-28 sm:pb-24 lg:flex-row lg:items-end lg:pt-36 lg:pb-16">
        
        {/* Background crossfade images (FULL BLEED COVER con imagen diferenciada móvil y desktop) */}
        <div className="absolute inset-0 -z-20">
          {HERO_SLIDES.map((s, i) => (
            <React.Fragment key={s.id}>
              {/* Mobile Image */}
              <div className={`md:hidden absolute inset-0 transition-opacity duration-1000 ease-out ${
                i === rail.active ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
              }`}>
                <Image
                  src={s.mobileImageUrl || s.imageUrl}
                  alt={s.title}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className="object-cover object-center"
                />
              </div>

              {/* Desktop Image */}
              <div className={`hidden md:block absolute inset-0 transition-opacity duration-1000 ease-out ${
                i === rail.active ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
              }`}>
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

        {/* Liquid dark vignette gradients: en móvil deja el CENTRO TOTALMENTE DESPEJADO y oscurece solo arriba y abajo */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/80 via-transparent to-black/90 md:hidden" />
        <div className="hidden md:block absolute inset-0 -z-10 bg-gradient-to-r from-black/95 via-black/80 to-black/30 lg:from-black/95 lg:via-black/70 lg:to-black/20" />
        <div className="hidden md:block absolute inset-0 -z-10 bg-gradient-to-b from-black/85 via-transparent to-black/90" />

        {/* Contenedor Principal: en móvil usa flex justify-between de arriba a abajo */}
        <div className="mx-auto flex h-full min-h-[calc(100svh-11rem)] md:min-h-0 w-full max-w-7xl flex-col justify-between px-4 sm:px-6 lg:grid lg:grid-cols-12 lg:items-end lg:gap-12 lg:px-8">
          
          {/* ======================= MÓVIL: BLOQUE SUPERIOR (Badge + H1 + Subtítulo + Descripción) ======================= */}
          <div className="flex flex-col items-center text-center md:hidden pt-1 space-y-1.5 px-2">
            {rail.active === 0 ? (
              <div key="welcome-mobile-top" className="flex flex-col items-center space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-500">
                <div className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-[#e2c97d]/35 bg-black/65 px-3 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider text-[#ece8a6] backdrop-blur-md shadow-sm">
                  <Sparkles size={11} className="shrink-0 text-[#e2c97d]" />
                  <span className="line-clamp-1">{t.heroWelcome.badge}</span>
                </div>
                <h1 className="font-sans text-lg sm:text-xl font-extrabold tracking-tight text-white leading-tight drop-shadow-md">
                  {t.heroWelcome.h1}
                </h1>
                <p className="text-[11px] font-semibold text-[#e2c97d] drop-shadow line-clamp-1">
                  Ingeniería Eléctrica y Contratación NYC
                </p>
                <p className="text-[10.5px] leading-relaxed text-slate-200 drop-shadow max-w-xs mx-auto line-clamp-2">
                  {t.heroWelcome.description}
                </p>
              </div>
            ) : (
              <div key={`slide-mobile-top-${slide.id}`} className="flex flex-col items-center space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-500">
                <div className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-[#e2c97d]/35 bg-black/65 px-3 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider text-[#ece8a6] backdrop-blur-md shadow-sm">
                  <Sparkles size={11} className="shrink-0 text-[#e2c97d]" />
                  <span className="line-clamp-1">{activeTranslatedSlide.badge}</span>
                </div>
                <h1 className="font-sans text-lg sm:text-xl font-extrabold tracking-tight text-white leading-tight drop-shadow-md">
                  {activeTranslatedSlide.h1}
                </h1>
                <p className="text-[11px] font-semibold text-[#e2c97d] drop-shadow line-clamp-1 max-w-xs">
                  {activeTranslatedSlide.subtitle}
                </p>
                <p className="text-[10.5px] leading-relaxed text-slate-200 drop-shadow max-w-xs mx-auto line-clamp-2">
                  {activeTranslatedSlide.description}
                </p>
              </div>
            )}
          </div>

          {/* ======================= ESCRITORIO: COLUMNA IZQUIERDA COMPLETA ======================= */}
          <div className="hidden md:flex flex-col items-start text-left lg:col-span-7 space-y-4">
            {rail.active === 0 ? (
              <div key="welcome-slide-desk" className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-700">
                <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-[#e2c97d]/35 bg-black/60 px-3.5 py-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-[#ece8a6] backdrop-blur-md shadow-sm">
                  <Sparkles size={13} className="shrink-0 text-[#e2c97d]" />
                  <span>{t.heroWelcome.badge}</span>
                </div>
                <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.12]">
                  {t.heroWelcome.h1}
                </h1>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl font-normal">
                  {t.heroWelcome.description}
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-mono text-[#ece8a6]">
                  <span className="rounded-md bg-white/10 px-2.5 py-1 border border-white/10">{t.heroWelcome.trustSignals.heavyUp}</span>
                  <span className="rounded-md bg-white/10 px-2.5 py-1 border border-white/10">{t.heroWelcome.trustSignals.coi}</span>
                  <span className="rounded-md bg-white/10 px-2.5 py-1 border border-white/10">{t.heroWelcome.trustSignals.dob}</span>
                </div>
              </div>
            ) : (
              <div key={`slide-desk-${slide.id}`} className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-700">
                <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-[#e2c97d]/35 bg-black/60 px-3.5 py-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-[#ece8a6] backdrop-blur-md shadow-sm">
                  <Sparkles size={13} className="shrink-0 text-[#e2c97d]" />
                  <span>{activeTranslatedSlide.badge}</span>
                </div>
                <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.12]">
                  {activeTranslatedSlide.h1}
                </h1>
                <p className="text-base sm:text-lg font-semibold text-[#e2c97d]">
                  {activeTranslatedSlide.subtitle}
                </p>
                <p className="max-w-xl text-xs sm:text-sm leading-relaxed text-slate-200">
                  {activeTranslatedSlide.description}
                </p>
                <ul className="flex flex-wrap gap-2 pt-1">
                  {activeTranslatedSlide.tags.map((tag) => (
                    <li
                      key={tag}
                      className="animate-in fade-in slide-in-from-bottom-1 duration-500 inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-black/50 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md"
                    >
                      <CheckCircle2 size={12} className="text-[#e2c97d]" />
                      <span>{tag}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Desktop CTAs */}
            <div className="flex pt-4 flex-wrap items-center gap-3">
              <a
                href={isHomePage ? "#nyc-lead-wizard" : slide.ctaPrimary.href}
                onClick={() => onSelectService && onSelectService(slide.title)}
                className="gold-gradient-btn inline-flex h-11 w-44 items-center justify-center gap-2 rounded-full text-xs font-bold uppercase tracking-wider text-[#1a1608] shadow-[0_0_25px_rgba(210,142,27,0.35)] transition hover:brightness-110 active:scale-95 cursor-pointer"
              >
                <span>{t.heroActions?.schedule || "Agendar"}</span>
                <ArrowRight size={14} className="shrink-0" />
              </a>

              <a
                href={isHomePage ? `/services#${slide.serviceId}` : slide.ctaSecondary.href}
                className="inline-flex h-11 w-44 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md hover:bg-white/20 active:scale-95 transition-all cursor-pointer"
              >
                <Layers size={14} className="shrink-0" />
                <span>{t.heroActions?.catalog || "Catálogo"}</span>
              </a>

              {isHomePage && (
                <a
                  href={`tel:${phone.replace(/\D/g, "")}`}
                  className="inline-flex h-11 w-48 items-center justify-center gap-2 rounded-full border border-white/15 bg-black/50 px-4 text-xs font-semibold text-slate-200 hover:text-white hover:border-[#e2c97d]/40 transition-colors cursor-pointer active:scale-95"
                >
                  <PhoneCall size={14} className="text-[#e2c97d] shrink-0" />
                  <span>{t.heroActions?.call || "24/7 Llamada"}</span>
                </a>
              )}
            </div>
          </div>

          {/* ======================= MÓVIL: BLOQUE INFERIOR (Pills 2+3 + Botones Fijos) ======================= */}
          <div className="flex flex-col items-center w-full md:hidden pt-4 pb-2 space-y-3">
            {/* Pastillas de categorías: Fila 1 (2 ítems), Fila 2 (3 ítems) secuenciales */}
            <div className="flex flex-col items-center gap-1.5 w-full max-w-xs mx-auto">
              {/* Fila 1: [0] Infraestructura, [1] Energía */}
              <div className="flex items-center justify-center gap-1.5 w-full">
                {[0, 1].map((idx) => {
                  const s = HERO_SLIDES[idx];
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => rail.setActive(idx)}
                      className={`flex-1 py-1 px-2 rounded-lg text-[10px] font-semibold transition-all cursor-pointer whitespace-nowrap text-center ${
                        idx === rail.active
                          ? "bg-[#e2c97d] text-[#1a1608] font-bold shadow-md shadow-[#e2c97d]/20 ring-1 ring-[#e2c97d]"
                          : "bg-black/60 text-slate-300 border border-white/10 backdrop-blur-sm hover:bg-white/20"
                      }`}
                    >
                      {mobilePillsLabels[idx]}
                    </button>
                  );
                })}
              </div>

              {/* Fila 2: [2] Iluminación, [3] FDNY, [4] Demolición */}
              <div className="flex items-center justify-center gap-1.5 w-full">
                {[2, 3, 4].map((idx) => {
                  const s = HERO_SLIDES[idx];
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => rail.setActive(idx)}
                      className={`flex-1 py-1 px-1.5 rounded-lg text-[10px] font-semibold transition-all cursor-pointer whitespace-nowrap text-center ${
                        idx === rail.active
                          ? "bg-[#e2c97d] text-[#1a1608] font-bold shadow-md shadow-[#e2c97d]/20 ring-1 ring-[#e2c97d]"
                          : "bg-black/60 text-slate-300 border border-white/10 backdrop-blur-sm hover:bg-white/20"
                      }`}
                    >
                      {mobilePillsLabels[idx]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Botones Fijos Móviles */}
            <div className="w-full flex flex-col items-center gap-2 max-w-xs mx-auto">
              <a
                href={isHomePage ? "#nyc-lead-wizard" : slide.ctaPrimary.href}
                onClick={() => onSelectService && onSelectService(slide.title)}
                className="gold-gradient-btn flex h-11 w-full items-center justify-center gap-2 rounded-xl text-xs font-bold uppercase tracking-wider text-[#1a1608] shadow-[0_0_20px_rgba(210,142,27,0.4)] active:scale-95 transition-transform"
              >
                <span>{t.heroActions?.schedule || "Agendar"}</span>
                <ArrowRight size={14} className="shrink-0" />
              </a>

              <a
                href={isHomePage ? `/services#${slide.serviceId}` : slide.ctaSecondary.href}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/25 bg-black/60 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-xl hover:bg-black/80 active:scale-95 transition-all"
              >
                <Layers size={14} className="shrink-0" />
                <span>{t.heroActions?.catalog || "Catálogo"}</span>
              </a>
            </div>
          </div>

          {/* ======================= ESCRITORIO: TARJETAS Y CONTROLES DERECHA ABAJO ======================= */}
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

      {/* 2. STATS STRIP (Opcional, desactivado por defecto en la vista del Hero) */}
      {showStats && (
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
                {t.heroStats?.dispatchLabel || "Emergency Manhattan Dispatch"}
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
                {t.heroStats?.experienceLabel || "Years Master NYC Practice"}
              </dt>
            </div>
          </dl>
        </div>
      )}
    </section>
  );
}
