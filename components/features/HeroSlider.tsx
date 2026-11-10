"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  Pause, 
  Play,
  Calendar,
  Layers,
  PhoneCall
} from "lucide-react";
import { useSite } from "@/context/SiteContext";

export interface HeroSlide {
  id: number;
  serviceId: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  tags: string[];
  ctaPrimary: {
    text: string;
    href: string;
  };
  ctaSecondary: {
    text: string;
    href: string;
  };
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    serviceId: "high-voltage-systems",
    badge: "Class-A NYC DOB Master Electrician • License #008472",
    title: "High-Voltage Infrastructure & 200A Smart Panels",
    subtitle: "Eaton & Square-D Smart Enclosures with Load Shedding",
    description: "Turnkey replacements of obsolete Federal Pacific & Zinsco panels for historic Brooklyn brownstones, Manhattan co-ops and luxury condominiums with guaranteed DOB inspection sign-off.",
    imageUrl: "/media/service_panel_verification_desktop.webp",
    tags: ["Under 8-Hour Cutover", "DOB NOW™ Sign-Off Tag", "Smart Load Shedding Integration"],
    ctaPrimary: {
      text: "Schedule Inspection With AI",
      href: "#ai-booking-calendar"
    },
    ctaSecondary: {
      text: "Explore High-Voltage Specs",
      href: "#high-voltage-systems"
    }
  },
  {
    id: 2,
    serviceId: "clean-energy",
    badge: "NYC Local Law 97 Compliant • ConEd Interconnection",
    title: "Urban Rooftop Solar & Universal Level-2 EV Charging",
    subtitle: "Photovoltaic Flat Rooftops & Multi-Family Fleet Stations",
    description: "Commercial and residential flat rooftop photovoltaic canopies with Enphase/Tesla Powerwall battery storage, ConEdison load letters, and NYC solar property tax abatement filings.",
    imageUrl: "/media/service_solar_brooklyn_rooftop_mobile.webp",
    tags: ["ConEd Net Metering Setup", "Tesla Wall Connectors", "Avoid Local Law 97 Carbon Penalties"],
    ctaPrimary: {
      text: "Schedule Solar & EV Audit",
      href: "#ai-booking-calendar"
    },
    ctaSecondary: {
      text: "Explore Clean Energy Scope",
      href: "#clean-energy"
    }
  },
  {
    id: 3,
    serviceId: "architectural-lighting",
    badge: "Tribeca & Soho Standards • High-End Resi Specification",
    title: "Lutron Architectural & Facade Lighting Systems",
    subtitle: "Precision Magnetic Track & Lutron HomeWorks Keypads",
    description: "Precision magnetic track lighting, cove indirect illumination, and Lutron HomeWorks automated wireless keypad integration tailored to alteration agreements of premier NYC residences.",
    imageUrl: "/media/service_lighting_penthouse_mobile.webp",
    tags: ["Lutron HomeWorks QSX", "Zero-Flicker 3000K Dimming", "Venetian Plaster Flush Mounts"],
    ctaPrimary: {
      text: "Schedule Lighting Consult",
      href: "#ai-booking-calendar"
    },
    ctaSecondary: {
      text: "Explore Lighting Systems",
      href: "#high-voltage-systems"
    }
  },
  {
    id: 4,
    serviceId: "fire-alarm",
    badge: "FDNY Title 3 RCNY §907 Code Compliant",
    title: "FDNY Life Safety & Fire Alarm Networks",
    subtitle: "Rigid EMT Conduit, Pull Stations & Annunciator Panels",
    description: "Rigid EMT conduit wiring, pull stations, heat/smoke sensor arrays, and central station annunciator interconnections strictly complying with FDNY fire life safety protocols.",
    imageUrl: "/media/service_safety_briefing_desktop.webp",
    tags: ["FDNY Plan Examination Support", "Rigid EMT Fire Runs", "Annual Central Station Inspection"],
    ctaPrimary: {
      text: "Schedule FDNY Inspection",
      href: "#ai-booking-calendar"
    },
    ctaSecondary: {
      text: "Explore Safety Scope",
      href: "#high-voltage-systems"
    }
  },
  {
    id: 5,
    serviceId: "architectural-construction",
    badge: "EPA Lead-Safe Certified Firm • Luxury Alterations",
    title: "Controlled Demolition, Level-5 Drywall & Fine Finishes",
    subtitle: "Negative Air Dust Containment & Soundproof Steel Studs",
    description: "Controlled non-structural demolition, acoustic steel stud framing, Sound Transmission Class (STC) soundproofing, and museum-grade Benjamin Moore coatings for premier NYC residences.",
    imageUrl: "/media/legacy_construction_workers.webp",
    tags: ["Level-5 Skim Coating", "Acoustic QuietRock Partitions", "Zero-VOC Eco Premium Paints"],
    ctaPrimary: {
      text: "Schedule Contracting Scope",
      href: "#ai-booking-calendar"
    },
    ctaSecondary: {
      text: "Explore Contracting Directory",
      href: "#architectural-construction"
    }
  }
];

export interface StatItem {
  id: string;
  value: string;
  label: string;
}

const DEFAULT_STATS: StatItem[] = [
  { id: "pass-rate", value: "100%", label: "DOB NOW™ Inspection Sign-Off" },
  { id: "dispatch", value: "<45m", label: "24/7 Manhattan Rapid Emergency" },
  { id: "insurance", value: "$2M", label: "Commercial General Liability COI" },
  { id: "experience", value: "15+", label: "Years Licensed NYC Practice" },
];

/** Hook del Slider con 10s para la primera diapositiva (quiénes somos) y 6s para las siguientes */
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
    // 10 segundos para la primera diapositiva (quiénes somos), 6 segundos para las demás
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

/** Contador animado con easing fluido Emil Kowalski */
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

/** Rail de tarjetas de lo que viene: tarjetas uniformes de lujo con NEXT INTAKE */
export function HeroCardRail({
  items,
  active,
  onSelect,
}: {
  items: HeroSlide[];
  active: number;
  onSelect: (index: number) => void;
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
                NEXT INTAKE
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

/** Dock de controles idéntico a Modulares GM: Play/Pause, barra de escala y botones < > */
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

export interface HeroSliderProps {
  onSelectService?: (serviceName: string) => void;
  isHomePage?: boolean;
  phone?: string;
}

/** COMPONENTE PRINCIPAL HERO SLIDER (PATRÓN MODULARES GM) */
export default function HeroSlider({
  onSelectService,
  isHomePage = false,
  phone = "+1 (929) 584-7647",
}: HeroSliderProps) {
  const { t } = useSite();
  const rail = useRail(HERO_SLIDES.length);
  const slide = HERO_SLIDES[rail.active];
  const activeTranslatedSlide = t.slides[rail.active] || slide;

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
          
          {/* Left Narrative Column */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Dynamic Content Display (Vermilion-Style Splash/Welcome on Slide 0, Dynamic on Subsequent Slides) */}
            {rail.active === 0 ? (
              <div key="welcome-slide" className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-700">
                {/* Top Badge */}
                <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-[#e2c97d]/35 bg-black/60 px-3.5 py-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-[#ece8a6] backdrop-blur-md shadow-sm">
                  <Sparkles size={13} className="shrink-0 text-[#e2c97d]" />
                  <span>{t.heroWelcome.badge}</span>
                </div>

                {/* Canonical Master H1 for SEO */}
                <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.12]">
                  {t.heroWelcome.h1}
                </h1>

                {/* Who We Are (Identidad de Empresa y COI) - Exclusivo de la primera diapositiva */}
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl font-normal">
                  {t.heroWelcome.description}
                </p>

                {/* Trust Signals Strip */}
                <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-mono text-[#ece8a6]">
                  <span className="rounded-md bg-white/10 px-2.5 py-1 border border-white/10">⚡ 200A-800A Heavy-Up</span>
                  <span className="rounded-md bg-white/10 px-2.5 py-1 border border-white/10">🛡️ $2,000,000 Active COI</span>
                  <span className="rounded-md bg-white/10 px-2.5 py-1 border border-white/10">🏛️ DOB NOW™ Direct Filing</span>
                </div>
              </div>
            ) : (
              <div key={`slide-${slide.id}`} className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-700">
                {/* Discipline Tag */}
                <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-[#e2c97d]/35 bg-black/60 px-3.5 py-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-[#ece8a6] backdrop-blur-md shadow-sm">
                  <Sparkles size={13} className="shrink-0 text-[#e2c97d]" />
                  <span>{activeTranslatedSlide.badge}</span>
                </div>

                {/* Dynamic H1 tailored for each service scope */}
                <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.12]">
                  {activeTranslatedSlide.h1}
                </h1>

                {/* Subtitle / Focus */}
                <p className="text-base sm:text-lg font-semibold text-[#e2c97d]">
                  {activeTranslatedSlide.subtitle}
                </p>

                {/* Detailed Service Narrative */}
                <p className="max-w-xl text-xs sm:text-sm leading-relaxed text-slate-200">
                  {activeTranslatedSlide.description}
                </p>

                {/* Feature pills with checkmarks */}
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

            {/* Mobile Category Switcher Pills */}
            <div className="flex flex-wrap gap-1.5 pt-2 md:hidden">
              {HERO_SLIDES.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => rail.setActive(idx)}
                  className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-all cursor-pointer ${
                    idx === rail.active
                      ? "bg-[#e2c97d] text-[#1a1608] font-bold shadow-md shadow-[#e2c97d]/20"
                      : "bg-white/10 text-slate-300 border border-white/10 hover:bg-white/20"
                  }`}
                >
                  {s.id === 1 && "⚡ High-Voltage"}
                  {s.id === 2 && "☀️ Solar & EV"}
                  {s.id === 3 && "💡 Lighting"}
                  {s.id === 4 && "🚨 FDNY Safety"}
                  {s.id === 5 && "🏗️ Contracting"}
                </button>
              ))}
            </div>

            {/* Dual CTAs side by side (Fixed uniform height, whitespace-nowrap to prevent multiline wrap) */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <a
                href={isHomePage ? "#nyc-lead-wizard" : slide.ctaPrimary.href}
                onClick={() => onSelectService && onSelectService(slide.title)}
                className="gold-gradient-btn inline-flex h-12 sm:h-13 min-h-[48px] whitespace-nowrap items-center justify-center gap-2 rounded-full px-6 sm:px-7 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#1a1608] shadow-[0_0_25px_rgba(210,142,27,0.3)] transition hover:brightness-110 active:scale-95 cursor-pointer"
              >
                <span>{rail.active === 0 ? t.heroWelcome.ctaPrimary : activeTranslatedSlide.ctaPrimary}</span>
                <ArrowRight size={15} className="shrink-0" />
              </a>

              <a
                href={isHomePage ? `/services#${slide.serviceId}` : slide.ctaSecondary.href}
                className="inline-flex h-12 sm:h-13 min-h-[48px] whitespace-nowrap items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 sm:px-7 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md hover:bg-white/20 active:scale-95 transition-all cursor-pointer"
              >
                <Layers size={15} className="shrink-0" />
                <span>{rail.active === 0 ? t.heroWelcome.ctaSecondary : activeTranslatedSlide.ctaSecondary}</span>
              </a>

              {isHomePage && (
                <a
                  href={`tel:${phone.replace(/\D/g, "")}`}
                  className="hidden xl:inline-flex h-12 sm:h-13 min-h-[48px] whitespace-nowrap items-center justify-center gap-2 rounded-full border border-white/15 bg-black/40 px-5 text-[11px] sm:text-xs font-semibold text-slate-200 hover:text-white hover:border-[#e2c97d]/40 transition-colors cursor-pointer active:scale-95"
                >
                  <PhoneCall size={14} className="text-[#e2c97d] shrink-0" />
                  <span>24/7: {phone}</span>
                </a>
              )}
            </div>
          </div>

          {/* Right Bottom Corner: Rail & Controls (PATRÓN MODULARES GM EXACTO) */}
          <div className="hidden flex-col items-end justify-end gap-3 md:flex lg:col-span-5 lg:self-end">
            <HeroCardRail
              items={HERO_SLIDES}
              active={rail.active}
              onSelect={rail.setActive}
            />
            <RailControls
              active={rail.active}
              total={HERO_SLIDES.length}
              playing={rail.playing}
              onToggle={rail.togglePlay}
              onPrev={rail.prev}
              onNext={rail.next}
            />
          </div>

        </div>
      </div>

      {/* 2. STATS STRIP (Directamente bajo el hero con contadores animados Emil Kowalski) */}
      <div className="border-t border-white/10 bg-[#070a12] text-white">
        <dl className="mx-auto grid max-w-7xl grid-cols-2 divide-white/10 sm:grid-cols-4 sm:divide-x">
          {DEFAULT_STATS.map((stat) => (
            <div key={stat.id} className="flex flex-col items-center justify-center px-4 py-4 text-center sm:h-[92px]">
              <dd className="order-1 font-mono text-2xl font-bold leading-none text-[#ece8a6] sm:text-3xl">
                <AnimatedCounter value={stat.value} />
              </dd>
              <dt className="order-2 mt-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-slate-400 sm:text-xs">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>

    </section>
  );
}
