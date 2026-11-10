"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Marquee from "@/components/navigation/Marquee";
import Header from "@/components/navigation/Header";
import Footer from "@/components/Footer";
import MobileActionBar from "@/components/navigation/MobileActionBar";
import HeroSlider from "@/components/features/HeroSlider";
import { 
  Zap, 
  Flame, 
  Radio, 
  Sun, 
  BatteryCharging, 
  Hammer, 
  Layers, 
  Paintbrush, 
  ShieldCheck, 
  ArrowRight, 
  PhoneCall, 
  Sparkles,
  CheckCircle2,
  Search,
  Calendar,
  Clock,
  Send,
  Building,
  Check,
  ChevronRight,
  Bot,
  Shield,
  Award
} from "lucide-react";
import { useSite } from "@/context/SiteContext";

export interface ServiceTypeGroup {
  id: string;
  name: string;
  badge: string;
  title: string;
  desc: string;
  image: string;
  disciplinesCount: string;
  leadTime: string;
  complianceTag: string;
  services: {
    title: string;
    tag: string;
    desc: string;
    snippet?: string;
    specs: string[];
    image: string;
  }[];
}

const SERVICE_GROUPS: ServiceTypeGroup[] = [
  {
    id: "high-voltage-systems",
    name: "01. Electrical & Power Systems",
    badge: "NYC DOB Licensed Master Electrician",
    title: "High-Voltage Infrastructure & Smart Distribution",
    desc: "From 200A-800A smart panel replacements to FDNY fire alarm interconnections and structured Cat6A riser cabling across Manhattan and Brooklyn historic buildings.",
    image: "/media/hero_loft_blueprints_desktop.webp",
    disciplinesCount: "4 Core Technical Disciplines",
    leadTime: "< 45 Mins Emergency / Same-Day DOB Filing",
    complianceTag: "DOB NOW™ Certified • NYC Electrical Code 2026",
    services: [
      {
        title: "Circuit Breakers & 200A Smart Panel Upgrades",
        tag: "NYC DOB Permit Required",
        snippet: "Vladimir did a great job fixing my circuit breakers for a reasonable price.",
        desc: "Complete conversion of obsolete Federal Pacific & Zinsco panels to smart Square-D and Eaton breaker enclosures with automated load shedding and DOB inspection certificates.",
        specs: ["Under 8-Hour Seamless Cutover", "DOB Inspection Tag Guaranteed", "Smart Load Shedding & Monitoring"],
        image: "/media/service_panel_verification_desktop.webp"
      },
      {
        title: "Fire Alarm Systems & Life Safety",
        tag: "FDNY Title 3 RCNY §907",
        snippet: "Fire alarm system installation services for residential and commercial properties.",
        desc: "Rigid EMT conduit fire alarm wiring, pull stations, heat and smoke sensor arrays, and central station annunciator interconnections adhering to strict FDNY protocols.",
        specs: ["FDNY Plan Examination Support", "Rigid EMT Conduit Fire Runs", "Annual Central Station Inspection Certificate"],
        image: "/media/service_safety_briefing_desktop.webp"
      },
      {
        title: "Telecommunications & Structured Cabling",
        tag: "Commercial & High-End Resi",
        snippet: "Stay connected — professional telecommunication services offered here.",
        desc: "Commercial fiber-optic backbones, Cat6A low-voltage riser cabling, server rack patch panels, and enterprise Wi-Fi 7 access point distribution for Midtown lofts.",
        specs: ["Fluke Certified Cable Testing", "Overhead Wire Basket Cable Trays", "MDF/IDF Server Rack Patching & Labeling"],
        image: "/media/service_lighting_penthouse_mobile.webp"
      },
      {
        title: "Lutron Architectural & Facade Lighting",
        tag: "Tribeca & Soho Standards",
        snippet: "Installed 3 ceiling fan last minute call and a hallway light. Impressed with his workmanship.",
        desc: "Precision magnetic track lighting, cove indirect LED illumination, and Lutron HomeWorks automated keypad integration for historic townhouse facades.",
        specs: ["Lutron Caséta & RadioRA 3 Certified", "Magnetic Track Flush Micro-Mounts", "Facade & Landscape Low-Voltage"],
        image: "/media/service_lighting_exterior_mobile.webp"
      }
    ]
  },
  {
    id: "clean-energy",
    name: "02. Solar & Clean Energy",
    badge: "NYC Local Law 97 Compliant",
    title: "Rooftop Solar & Universal EV Infrastructure",
    desc: "Turnkey photovoltaic rooftop canopies and high-amperage Level-2 / DC Fast Charging stations with ConEdison load letter interconnection and carbon penalty mitigation.",
    image: "/media/service_solar_brooklyn_rooftop_mobile.webp",
    disciplinesCount: "2 Clean Energy Solutions",
    leadTime: "ConEd Expedited Filings",
    complianceTag: "NYC Solar Tax Abatement Eligible",
    services: [
      {
        title: "Commercial & Brownstone Rooftop Solar",
        tag: "Local Law 97 Compliant",
        snippet: "Power your property with clean energy — solar panel installation services available.",
        desc: "Turnkey photovoltaic systems for Brooklyn & Queens flat rooftops. We manage structural PE stamping, DOB filings, ConEd net metering, and NYC property tax abatements.",
        specs: ["ConEd Net Metering Setup", "Enphase Microinverter Tech", "Avoid Local Law 97 Carbon Penalties"],
        image: "/media/service_solar_brooklyn_rooftop_mobile.webp"
      },
      {
        title: "Tesla & Universal Level-2 EV Charging",
        tag: "Fleet & Multi-Family",
        snippet: "We help install EV charging stations quickly and efficiently.",
        desc: "Dedicated 240V/480V charging feeds for Tesla Wall Connectors, ChargePoint, and universal J1772 chargers in private residential garages and condo parking decks.",
        specs: ["Load Calculation & Panel Interlock", "Weatherproof NEMA 4X Hardware", "Smart Billing Integration for Condos"],
        image: "/media/service_ev_charger_install_mobile.webp"
      }
    ]
  },
  {
    id: "architectural-construction",
    name: "03. Architectural Construction",
    badge: "EPA Lead-Safe Certified Firm",
    title: "Selective Demolition, Level-5 Drywall & Fine Finishes",
    desc: "Controlled non-structural demolition, acoustic steel stud framing, and museum-grade architectural painting tailored to alteration agreements of luxury NYC buildings.",
    image: "/media/legacy_construction_workers.webp",
    disciplinesCount: "3 General Contracting Trades",
    leadTime: "Scheduled Co-op Shift Windows",
    complianceTag: "OSHA & Dust Containment Compliant",
    services: [
      {
        title: "Controlled Non-Structural Demolition",
        tag: "Gut Renovation Scope",
        snippet: "Clearing the way for your next project — professional demolition services offered here.",
        desc: "Safe interior partition gutting, floor removal, and debris bagging with negative air pressure dust containment and compliance with building management alteration guidelines.",
        specs: ["EPA Lead-Safe Certified Crews", "Debris Bagged & Chute Haul-Away", "Pre-Demolition MEP Utility Safe-Off"],
        image: "/media/legacy_construction_workers.webp"
      },
      {
        title: "Drywall & Architectural Steel Framing",
        tag: "Level-5 Museum Finish",
        snippet: "Expert drywall installation services for both residential and commercial spaces.",
        desc: "Light gauge steel stud partitioning, Sound Transmission Class (STC) acoustic insulation, and Level-5 skim-coated drywall ready for luxury lighting reflection.",
        specs: ["Level 5 Skim Coating Standards", "Acoustic QuietRock Partitioning", "Drop-Ceiling & Soffit Concealment"],
        image: "/media/legacy_construction_workers.webp"
      },
      {
        title: "Fine Interior & Exterior Painting",
        tag: "Benjamin Moore Premium",
        snippet: "Expert interior and exterior painting services provided on-site.",
        desc: "High-durability Benjamin Moore coatings, Venetian plaster accents, historic trim restoration, and exterior masonry waterproofing for New York brownstones.",
        specs: ["Zero-VOC Eco Premium Paints", "Spray, Roll & Hand-Brushed Trim", "Surface Patching & Primer Base"],
        image: "/media/hero_penthouse_skyline_desktop.webp"
      }
    ]
  }
];

export default function ServicesPage() {
  const { t } = useSite();
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  // AI Booking Assistant State
  const [bookingBorough, setBookingBorough] = useState("Manhattan");
  const [bookingService, setBookingService] = useState("Electrical & Panel Upgrade");
  const [bookingDate, setBookingDate] = useState("2026-11-06");
  const [bookingTime, setBookingTime] = useState("09:00 AM - 12:00 PM");
  const [bookingName, setBookingName] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  const activeGroup = SERVICE_GROUPS[activeGroupIndex];

  // Search Filter over all services
  const filteredGroups = useMemo(() => {
    if (!searchQuery.trim()) return SERVICE_GROUPS;
    const q = searchQuery.toLowerCase();
    return SERVICE_GROUPS.map(group => ({
      ...group,
      services: group.services.filter(s => 
        s.title.toLowerCase().includes(q) ||
        s.desc.toLowerCase().includes(q) ||
        s.tag.toLowerCase().includes(q) ||
        s.specs.some(sp => sp.toLowerCase().includes(q))
      )
    })).filter(group => group.services.length > 0);
  }, [searchQuery]);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSubmitted(true);
  };

  const scrollToGroup = (id: string, index: number) => {
    setActiveGroupIndex(index);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="relative min-h-screen bg-[#f8fafc] dark:bg-[#050810] text-slate-900 dark:text-slate-100 transition-colors">
      <Marquee />
      <Header />
      <MobileActionBar />

      {/* 1. DEDICATED LUXURY SERVICES HEADER (No HeroSlider carousel on Services page) */}
      <section className="relative isolate overflow-hidden bg-black text-white pt-32 pb-16 sm:pt-36 lg:pt-40 border-b border-white/10">
        
        {/* Background Image with Cinematic Dark Gradient */}
        <div className="absolute inset-0 -z-20">
          <Image
            src="/media/service_panel_verification_desktop.webp"
            alt="NYC Electrical Engineering"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-35 scale-105"
          />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#050810] via-black/85 to-black/60" />
        <div className="absolute inset-0 -z-10 bg-radial-vignette opacity-80" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e2c97d]/40 bg-black/70 px-4 py-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-[#ece8a6] backdrop-blur-md shadow-lg mb-4">
            <Sparkles size={13} className="text-[#e2c97d]" />
            <span>{t.servicesPage.badge}</span>
          </div>

          {/* Master H1 for Services Page */}
          <h1 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] max-w-4xl drop-shadow-md">
            {t.servicesPage.h1}
          </h1>

          {/* Narrative Subtitle */}
          <p className="mt-4 text-sm sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            {t.servicesPage.subtitle}
          </p>

          {/* Highlights Metrics Strip */}
          <div className="mt-8 flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 text-xs font-mono">
            <div className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-3.5 py-2 backdrop-blur-md text-slate-200">
              <ShieldCheck className="h-4 w-4 text-[#e2c97d]" />
              <span>DOB NOW™ Direct Sign-Offs</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-3.5 py-2 backdrop-blur-md text-slate-200">
              <Award className="h-4 w-4 text-[#e2c97d]" />
              <span>$2M Commercial General Liability COI</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-3.5 py-2 backdrop-blur-md text-slate-200">
              <Clock className="h-4 w-4 text-[#e2c97d]" />
              <span>&lt;45m Rapid Manhattan Dispatch</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. REAL-TIME SEARCH & CATEGORY JUMP FILTER BAR (Luxury Apple Glassmorphic Bar) */}
      <div className="border-b border-slate-200/80 dark:border-white/10 bg-white/85 dark:bg-[#070b12]/90 backdrop-blur-2xl py-3.5 sticky top-16 z-20 shadow-lg shadow-black/5 dark:shadow-black/40 transition-all">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Search Box with dynamic count */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-[#e2c97d]" />
            <input
              type="text"
              placeholder={t.servicesPage.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-slate-300/80 dark:border-white/15 bg-white/90 dark:bg-black/60 pl-10 pr-24 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:border-[#e2c97d] focus:ring-2 focus:ring-[#e2c97d]/20 focus:outline-none transition-all shadow-inner"
            />
            {searchQuery && (
              <span className="absolute right-3.5 top-2.5 rounded-full bg-[#e2c97d]/20 px-2 py-0.5 text-[10px] font-mono font-bold text-[#b79f53] dark:text-[#ece8a6]">
                {filteredGroups.reduce((acc, g) => acc + g.services.length, 0)} {t.servicesPage.results}
              </span>
            )}
          </div>

          {/* Quick Jump Category Pills with Luxury Apple Glow */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 text-xs no-scrollbar">
            <a
              href="#high-voltage-systems"
              className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-white/15 bg-slate-100/80 dark:bg-white/[0.07] px-3.5 py-1.5 text-[11px] font-semibold text-slate-800 dark:text-slate-200 hover:border-[#e2c97d] hover:bg-[#e2c97d]/10 hover:text-[#b79f53] dark:hover:text-[#ece8a6] transition-all active:scale-95 shadow-sm"
            >
              <Zap size={13} className="text-[#e2c97d]" />
              <span>{t.servicesPage.highVoltage}</span>
            </a>
            <a
              href="#clean-energy"
              className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-white/15 bg-slate-100/80 dark:bg-white/[0.07] px-3.5 py-1.5 text-[11px] font-semibold text-slate-800 dark:text-slate-200 hover:border-[#e2c97d] hover:bg-[#e2c97d]/10 hover:text-[#b79f53] dark:hover:text-[#ece8a6] transition-all active:scale-95 shadow-sm"
            >
              <Sun size={13} className="text-[#e2c97d]" />
              <span>{t.servicesPage.solarEv}</span>
            </a>
            <a
              href="#architectural-construction"
              className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-white/15 bg-slate-100/80 dark:bg-white/[0.07] px-3.5 py-1.5 text-[11px] font-semibold text-slate-800 dark:text-slate-200 hover:border-[#e2c97d] hover:bg-[#e2c97d]/10 hover:text-[#b79f53] dark:hover:text-[#ece8a6] transition-all active:scale-95 shadow-sm"
            >
              <Hammer size={13} className="text-[#e2c97d]" />
              <span>{t.servicesPage.construction}</span>
            </a>
            <a
              href="#ai-booking-calendar"
              className="gold-gradient-btn shrink-0 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[11px] font-bold text-[#1a1608] shadow-[0_0_20px_rgba(210,142,27,0.35)] transition-all hover:brightness-110 active:scale-95"
            >
              <Calendar size={13} />
              <span>{t.servicesPage.aiCalendar}</span>
            </a>
          </div>
        </div>
      </div>

      {/* DETAILED SERVICES SECTIONS (Grouped by Category) */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        {filteredGroups.map((cat, cIdx) => (
          <section key={cat.id} id={cat.id} className="scroll-mt-28 relative">
            {/* Alias IDs for backward compatible navigation */}
            {cat.id === "high-voltage-systems" && <div id="electrical" className="absolute -top-28 pointer-events-none" />}
            {cat.id === "clean-energy" && <div id="solar-eco" className="absolute -top-28 pointer-events-none" />}
            {cat.id === "architectural-construction" && <div id="construction" className="absolute -top-28 pointer-events-none" />}
            <div className="border-b border-slate-200 dark:border-white/10 pb-4 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#b79f53] dark:text-[#ece8a6]">
                  Discipline Group 0{cIdx + 1}
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white uppercase mt-1">
                  {cat.name}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {cat.desc}
                </p>
              </div>
              <div className="shrink-0">
                <span className="rounded-full border border-slate-300 dark:border-white/10 bg-slate-200/50 dark:bg-white/5 px-3 py-1 text-[11px] font-mono text-slate-600 dark:text-slate-300">
                  {cat.complianceTag}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {cat.services.map((item, iIdx) => (
                <div 
                  key={iIdx}
                  className="group rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#090e17] overflow-hidden shadow-sm hover:shadow-xl hover:border-[#e2c97d]/50 transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Image with dark film overlay */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent" />
                    
                    <div className="absolute top-3 left-3">
                      <span className="rounded-full bg-black/80 px-3 py-1 text-[10px] font-mono font-bold uppercase text-[#ece8a6] border border-white/10 backdrop-blur-md">
                        {item.tag}
                      </span>
                    </div>

                    <div className="absolute bottom-3 inset-x-4 text-white">
                      <h3 className="text-lg sm:text-xl font-bold leading-tight">
                        {item.title}
                      </h3>
                      {item.snippet && (
                        <p className="text-[11px] text-[#ece8a6] italic mt-1 line-clamp-1">
                          &ldquo;{item.snippet}&rdquo;
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {item.desc}
                    </p>

                    <div>
                      <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Technical Execution Standards:
                      </div>
                      <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                        {item.specs.map((sp, sIdx) => (
                          <li key={sIdx} className="flex items-center gap-2">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
                            <span>{sp}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/[0.08] flex items-center justify-between">
                        <a
                          href="#ai-booking-calendar"
                          onClick={() => setBookingService(item.title)}
                          className="gold-gradient-btn inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider text-[#1a1608] shadow-md cursor-pointer"
                        >
                          <span>Schedule with AI</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </a>
                        <a
                          href="tel:+19295847647"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-[#b79f53] dark:hover:text-[#ece8a6]"
                        >
                          <PhoneCall className="h-3.5 w-3.5" />
                          <span>Direct Call</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* AI SCHEDULING CALENDAR & INSPECTION DISPATCH ASSISTANT */}
      <section id="ai-booking-calendar" className="border-t border-slate-200 dark:border-white/10 bg-slate-100/70 dark:bg-[#070b12] py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-mono font-bold uppercase text-emerald-600 dark:text-emerald-400 mb-3">
              <Bot className="h-4 w-4" />
              <span>AI Smart Scheduling Agent • NYC Dispatch</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold uppercase text-slate-900 dark:text-white">
              SCHEDULE INSPECTION VIA AI CALENDAR
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              Our autonomous scheduling system coordinates certified Master Electrician dispatch slots, verifies DOB permit requirements, and calculates arrival windows.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#090e17] p-6 sm:p-10 shadow-xl backdrop-blur-xl">
            {bookingSubmitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/30">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold uppercase text-slate-900 dark:text-white">
                  Inspection Window Reserved!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                  Our dispatch coordinator and Licensed Master Electrician have received your inquiry for <strong>{bookingService}</strong> in <strong>{bookingBorough}</strong> on <strong>{bookingDate} ({bookingTime})</strong>.
                </p>
                <div className="pt-2">
                  <span className="text-xs font-mono text-[#b79f53] dark:text-[#ece8a6] block">
                    Confirmation SMS dispatched to {bookingPhone || "+1 (929) 584-7647"}
                  </span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-6">
                
                {/* Step 1: Borough & Discipline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 font-mono">
                      1. Select NYC Borough
                    </label>
                    <select
                      value={bookingBorough}
                      onChange={(e) => setBookingBorough(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-black/50 px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:border-[#e2c97d] focus:outline-none"
                    >
                      <option value="Manhattan">Manhattan (Tribeca, Soho, UES, UWS, Midtown)</option>
                      <option value="Brooklyn">Brooklyn (DUMBO, Heights, Park Slope, Williamsburg)</option>
                      <option value="Queens">Queens & LIC (Long Island City, Astoria, Sunnyside)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 font-mono">
                      2. Service Type
                    </label>
                    <input
                      type="text"
                      value={bookingService}
                      onChange={(e) => setBookingService(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-black/50 px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:border-[#e2c97d] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Step 2: Date & Slot (Interactive Calendar selector) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 font-mono">
                      3. Preferred Inspection Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
                      <input
                        type="date"
                        required
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-black/50 pl-10 pr-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:border-[#e2c97d] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 font-mono">
                      4. Dispatch Arrival Window
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
                      <select
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-black/50 pl-10 pr-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:border-[#e2c97d] focus:outline-none"
                      >
                        <option value="08:00 AM - 11:00 AM">Morning Early: 08:00 AM - 11:00 AM</option>
                        <option value="11:00 AM - 02:00 PM">Midday: 11:00 AM - 02:00 PM</option>
                        <option value="02:00 PM - 05:00 PM">Afternoon: 02:00 PM - 05:00 PM</option>
                        <option value="Emergency (Under 45 min)">⚡ 24/7 Immediate Emergency Dispatch</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Step 3: Contact & Address */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 font-mono">
                      Full Name / Building Manager
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe (Condo Board / Owner)"
                      value={bookingName}
                      onChange={(e) => setBookingName(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-black/50 px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:border-[#e2c97d] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 font-mono">
                      Direct Mobile Phone for SMS Dispatch
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={bookingPhone}
                      onChange={(e) => setBookingPhone(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-black/50 px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:border-[#e2c97d] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="gold-gradient-btn w-full rounded-2xl py-3.5 text-xs font-bold uppercase tracking-wider text-[#1a1608] shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-transform"
                  >
                    <Send className="h-4 w-4" />
                    <span>Confirm Inspection Window With AI Agent</span>
                  </button>
                  <p className="text-[10px] text-center text-slate-400 mt-2">
                    Guaranteed zero spam. Meets New York SHIELD Act and DOB NOW™ alteration protocols.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
