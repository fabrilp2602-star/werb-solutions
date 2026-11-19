"use client";

import React from "react";
import { ArrowRight, CheckCircle2, Sparkles, Layers, PhoneCall } from "lucide-react";
import { useSite } from "@/context/SiteContext";
import { HERO_SLIDES, HeroSlide } from "./heroData";
import HeroMobilePills from "./HeroMobilePills";

interface HeroNarrativeProps {
  active: number;
  onSelect: (index: number) => void;
  onSelectService?: (serviceName: string) => void;
  isHomePage?: boolean;
  phone?: string;
}

export default function HeroNarrative({
  active,
  onSelect,
  onSelectService,
  isHomePage = false,
  phone = "+1 (929) 584-7647",
}: HeroNarrativeProps) {
  const { t } = useSite();
  const slide = HERO_SLIDES[active];
  const activeTranslatedSlide = t.slides[active] || slide;

  return (
    <div className="lg:col-span-7 flex flex-col items-center md:items-start text-center md:text-left max-w-xl w-full">
      {/* Dynamic Content Display */}
      <div className="w-full flex flex-col justify-center items-center md:items-start">
        {active === 0 ? (
          <div key="welcome-slide" className="space-y-3.5 animate-in fade-in duration-300 flex flex-col items-center md:items-start max-w-xl">
            {/* Top Badge */}
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-[#e2c97d]/40 bg-black/60 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#ece8a6] backdrop-blur-md shadow-md">
              <Sparkles size={14} className="shrink-0 text-[#e2c97d]" />
              <span>{t.heroWelcome.badge}</span>
            </div>

            {/* Canonical Master H1 for SEO */}
            <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.12] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              {t.heroWelcome.h1}
            </h1>

            {/* Who We Are Description */}
            <p className="text-sm sm:text-base text-slate-100 leading-relaxed max-w-lg font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] line-clamp-3 sm:line-clamp-none">
              {t.heroWelcome.description}
            </p>

            {/* Trust Signals Strip (Visible en desktop) */}
            <div className="hidden sm:flex flex-wrap items-center justify-start gap-2 pt-1 text-xs font-mono text-[#ece8a6] max-w-xl">
              <span className="rounded-lg bg-black/60 px-3 py-1.5 border border-[#e2c97d]/25 backdrop-blur-md font-semibold">{t.heroWelcome.trustSignals.heavyUp}</span>
              <span className="rounded-lg bg-black/60 px-3 py-1.5 border border-[#e2c97d]/25 backdrop-blur-md font-semibold">{t.heroWelcome.trustSignals.coi}</span>
              <span className="rounded-lg bg-black/60 px-3 py-1.5 border border-[#e2c97d]/25 backdrop-blur-md font-semibold">{t.heroWelcome.trustSignals.dob}</span>
            </div>
          </div>
        ) : (
          <div key={`slide-${slide.id}`} className="space-y-3.5 animate-in fade-in duration-300 flex flex-col items-center md:items-start max-w-xl">
            {/* Discipline Tag */}
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-[#e2c97d]/40 bg-black/60 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#ece8a6] backdrop-blur-md shadow-md">
              <Sparkles size={14} className="shrink-0 text-[#e2c97d]" />
              <span>{activeTranslatedSlide.badge}</span>
            </div>

            {/* Dynamic H1 tailored for each service scope */}
            <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.12] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              {activeTranslatedSlide.h1}
            </h1>

            {/* Subtitle / Focus */}
            <p className="text-sm sm:text-lg font-bold text-[#e2c97d] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              {activeTranslatedSlide.subtitle}
            </p>

            {/* Detailed Service Narrative */}
            <p className="max-w-lg text-sm sm:text-base leading-relaxed text-slate-100 font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] line-clamp-3 sm:line-clamp-none">
              {activeTranslatedSlide.description}
            </p>

            {/* Feature pills with checkmarks (Visible en desktop) */}
            <ul className="hidden sm:flex flex-wrap justify-start gap-2 pt-1">
              {activeTranslatedSlide.tags.map((tag) => (
                <li
                  key={tag}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-black/70 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md"
                >
                  <CheckCircle2 size={13} className="text-[#e2c97d]" />
                  <span>{tag}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Bottom Interactive Dock: Posicionado a distancia justa de los textos */}
      <div className="w-full flex flex-col items-center md:items-start pt-5 space-y-3">
        {/* Mobile Category Switcher Pills */}
        <HeroMobilePills active={active} onSelect={onSelect} />

        {/* Dual CTAs (Botones estilizados con microinteracción) */}
        <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-2.5 w-full pt-1">
          <a
            href={isHomePage ? "#nyc-lead-wizard" : slide.ctaPrimary.href}
            onClick={() => onSelectService && onSelectService(slide.title)}
            className="gold-gradient-btn inline-flex h-11 w-64 sm:w-48 items-center justify-center gap-2 rounded-xl text-xs font-extrabold uppercase tracking-wider text-[#1a1608] shadow-[0_0_20px_rgba(210,142,27,0.35)] transition hover:brightness-110 active:scale-95 cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>{t.heroActions?.schedule || "Agendar"}</span>
            <ArrowRight size={15} className="shrink-0" />
          </a>

          <a
            href={isHomePage ? `/services#${slide.serviceId}` : slide.ctaSecondary.href}
            className="inline-flex h-11 w-64 sm:w-48 items-center justify-center gap-2 rounded-xl border border-white/25 bg-black/60 text-xs font-extrabold uppercase tracking-wider text-white backdrop-blur-md hover:bg-white/20 active:scale-95 transition-all cursor-pointer whitespace-nowrap shrink-0"
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
    </div>
  );
}
