"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  Gauge, 
  Car, 
  Sparkles, 
  Sun, 
  CheckCircle2, 
  ShieldCheck, 
  FileCheck, 
  ArrowRight,
  Zap,
  Clock,
  Layers
} from "lucide-react";

interface ServiceComparator {
  id: string;
  name: string;
  category: string;
  badge: string;
  icon: React.ElementType;
  image: string;
  overview: string;
  typicalTimeline: string;
  permitsRequired: string[];
  keyBenefits: string[];
  specs: { label: string; value: string }[];
  idealFor: string;
}

const COMPARATOR_SERVICES: ServiceComparator[] = [
  {
    id: "panel-upgrade",
    name: "Panel Upgrade 200A - 800A",
    category: "Heavy-Up Infrastructure",
    badge: "Most Requested in NYC",
    icon: Gauge,
    image: "/media/service_panel_verification_desktop.webp",
    overview:
      "Full Con Edison service cutover, hazardous Federal Pacific / Zinsco panel decommissioning, and main disconnect installations with official DOB NOW certification.",
    typicalTimeline: "3 to 5 business days (ConEd coordination)",
    permitsRequired: ["NYC DOB Electrical Permit", "Con Edison Work Order (ESHA)", "DOB NOW Sign-off Certificate"],
    keyBenefits: [
      "Eliminates fire hazards from vintage breaker tripping failures",
      "Expands ampacity for multi-zone HVAC, heat pumps & induction ranges",
      "Satisfies strict insurance underwriter requirements for co-ops & brownstones",
      "Individual submetering options for multi-family rentals",
    ],
    specs: [
      { label: "Amperage Range", value: "200A, 400A, 800A 3-Phase" },
      { label: "Enclosure Rating", value: "NEMA 1 / 3R Heavy Gauge" },
      { label: "Short Circuit Rating", value: "Up to 22,000 AIC" },
    ],
    idealFor: "Brownstones upgrading from 60A/100A, luxury pre-war co-ops, and residential electrification.",
  },
  {
    id: "ev-chargers",
    name: "EV Chargers & Fleet Wallboxes",
    category: "Clean Transportation",
    badge: "Local Law 97 Aligned",
    icon: Car,
    image: "/media/service_ev_wallbox_detail_mobile.webp",
    overview:
      "Turnkey installation of Level 2 and Level 3 DC Fast Chargers for co-op garages, townhouse street-adjacent private parking, and commercial commercial fleet depots.",
    typicalTimeline: "1 to 2 days after load calculation",
    permitsRequired: ["DOB Work Approval", "ConEd Service Evaluation", "NYSERDA Rebate Documentation"],
    keyBenefits: [
      "Smart load management prevents building main switchgear trip",
      "RFID & Credit Card billing integrations for tenant parking spaces",
      "Up to 50% utility incentives via ConEd EV Make-Ready Program",
      "Tesla Universal Wall Connector & CCS / NACS multi-vehicle compatibility",
    ],
    specs: [
      { label: "Output Power", value: "9.6 kW - 19.2 kW (Level 2) / 50kW+ (DC Fast)" },
      { label: "Input Voltage", value: "208V / 240V / 480V 3-Phase" },
      { label: "Connectivity", value: "OCPP 2.0.1, Wi-Fi, 4G LTE Cellular" },
    ],
    idealFor: "Townhouse private drives, luxury condo valet garages, and commercial fleet operators.",
  },
  {
    id: "architectural-lighting",
    name: "Architectural Lighting & Lutron",
    category: "Luxury Living Systems",
    badge: "Penthouse & High-End Specification",
    icon: Sparkles,
    image: "/media/service_lighting_penthouse_mobile.webp",
    overview:
      "Lutron HomeWorks QSX and RadioRA 3 centralized low-voltage controls, museum-grade recessed flangeless fixtures, and hidden circadian cove illumination.",
    typicalTimeline: "Phased with interior architectural design",
    permitsRequired: ["DOB Low & High Voltage Permits", "Energy Conservation Code Compliance"],
    keyBenefits: [
      "Precision 0.1% dimming curves with zero LED flickering or buzzing",
      "Keypad consolidation replaces unsightly multi-gang switch clutter",
      "Automated motorized drapery & Ketra natural light circadian sync",
      "Complete smartphone, tablet, and smart home automation integration",
    ],
    specs: [
      { label: "System Core", value: "Lutron HomeWorks QSX Processor" },
      { label: "Dimming Protocol", value: "DALI-2, 0-10V, Phase, Lutron Clear Connect" },
      { label: "Aesthetic", value: "Palladiom & Alisse Architectural Finishes" },
    ],
    idealFor: "Tribeca & SoHo luxury lofts, Fifth Avenue penthouses, and high-design residences.",
  },
  {
    id: "solar-rooftop",
    name: "Solar Rooftops & BESS Storage",
    category: "Decarbonization & Resiliency",
    badge: "LL97 Penalty Exemption",
    icon: Sun,
    image: "/media/service_solar_brooklyn_rooftop_mobile.webp",
    overview:
      "Flat-roof ballast mounted solar PV arrays engineered for NYC FDNY fire pathway codes, combined with lithium battery storage for peak-shaving and emergency backup.",
    typicalTimeline: "4 to 8 weeks (structural engineering & permits)",
    permitsRequired: ["FDNY Rooftop Access Review", "DOB Structural & Electrical", "ConEd Interconnection"],
    keyBenefits: [
      "Shields property from escalating Local Law 97 carbon emissions fines",
      "Instant battery switchover during grid blackouts or ConEd voltage dips",
      "Federal 30% Investment Tax Credit + NYC Property Tax Abatement (PTA)",
      "Reduces common-area electric bills in co-ops and commercial buildings",
    ],
    specs: [
      { label: "PV Efficiency", value: "High-density monocrystalline >22%" },
      { label: "Storage Capacity", value: "10 kWh to 250 kWh modular BESS" },
      { label: "Wind Rating", value: "NYC Zone 150 MPH ballast engineering" },
    ],
    idealFor: "Brooklyn townhouse flat roofs, Queens industrial spaces, and mid-rise co-op roofs.",
  },
];

export default function NycServicesComparator() {
  const [activeServiceId, setActiveServiceId] = useState<string>("panel-upgrade");

  const currentService = COMPARATOR_SERVICES.find((s) => s.id === activeServiceId) || COMPARATOR_SERVICES[0];

  const handleSelect = (id: string) => {
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(15);
      } catch {
        // ignore
      }
    }
    setActiveServiceId(id);
  };

  return (
    <section id="services-comparator" className="relative z-10 py-20 border-t border-white/10 bg-[#070a0f]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3">
            <Zap className="h-3.5 w-3.5" /> High-Voltage Comparison Matrix
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            NYC Precision Services & Engineering
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            Compare specialized electrical capabilities designed specifically for New York City building stock,
            strict DOB electrical codes, and utility standards.
          </p>
        </div>

        {/* 4 Interactive Selector Cards (Apple-style interactive tiles) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {COMPARATOR_SERVICES.map((srv) => {
            const Icon = srv.icon;
            const isSelected = srv.id === activeServiceId;
            return (
              <button
                key={srv.id}
                onClick={() => handleSelect(srv.id)}
                className={`relative flex flex-col p-5 rounded-2xl border text-left transition-all duration-300 active:scale-[0.98] ${
                  isSelected
                    ? "border-amber-400 bg-[#0b0f17] shadow-amber-glow ring-1 ring-amber-400/50"
                    : "border-white/10 bg-[#0b0f17]/60 hover:border-white/25 hover:bg-[#0b0f17]"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <div className={`p-2.5 rounded-xl ${isSelected ? "bg-amber-500 text-black font-bold" : "bg-white/5 text-amber-400"}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded ${
                    isSelected ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" : "bg-white/5 text-slate-400"
                  }`}>
                    {srv.category}
                  </span>
                </div>
                <h3 className="font-extrabold text-sm sm:text-base text-white">{srv.name}</h3>
                <span className="text-[11px] text-slate-400 mt-1 line-clamp-2">{srv.overview}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Detail Card */}
        <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-[#0b0f17] to-[#05070a] p-6 sm:p-10 shadow-2xl backdrop-blur-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual Media with Badges */}
            <div className="lg:col-span-5 relative">
              <div className="relative h-[300px] sm:h-[380px] w-full overflow-hidden rounded-2xl border border-white/10 shadow-xl">
                <Image
                  src={currentService.image}
                  alt={currentService.name}
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070a0f] via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-black/80 text-amber-400 border border-amber-500/30 backdrop-blur-md">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                    {currentService.badge}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl border border-white/10 bg-black/85 backdrop-blur-md text-xs text-slate-300">
                  <strong className="text-white block mb-0.5">Application Scope:</strong>
                  {currentService.idealFor}
                </div>
              </div>
            </div>

            {/* In-depth Specs & NYC Code Filings */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
                  {currentService.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black uppercase text-white mt-1">
                  {currentService.name}
                </h3>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                  {currentService.overview}
                </p>
              </div>

              {/* Hardware Specs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {currentService.specs.map((spec, i) => (
                  <div key={i} className="p-3 rounded-xl border border-white/10 bg-black/40">
                    <div className="text-[10px] uppercase font-bold text-slate-400">{spec.label}</div>
                    <div className="text-xs font-bold text-white mt-1">{spec.value}</div>
                  </div>
                ))}
              </div>

              {/* Benefits */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                  Core Engineering Advantages
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  {currentService.keyBenefits.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Timeline & Permits */}
              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                <div>
                  <div className="text-slate-400 flex items-center gap-1 font-semibold">
                    <Clock className="h-3.5 w-3.5 text-cyan-400" /> Typical Timeline:
                  </div>
                  <div className="text-white font-bold mt-0.5">{currentService.typicalTimeline}</div>
                </div>
                <div className="border-t sm:border-t-0 sm:border-l border-white/10 pt-2 sm:pt-0 sm:pl-4">
                  <div className="text-slate-400 flex items-center gap-1 font-semibold">
                    <FileCheck className="h-3.5 w-3.5 text-amber-400" /> Mandatory NYC Permits:
                  </div>
                  <div className="text-slate-300 font-medium mt-0.5">
                    {currentService.permitsRequired.join(" • ")}
                  </div>
                </div>
              </div>

              {/* CTA Action */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="#nyc-lead-wizard"
                  className="rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3 text-xs font-black uppercase tracking-wider text-black shadow-amber-glow hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
                >
                  Configure Intake for this Service <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="tel:+19295847647"
                  className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-xs font-bold text-white hover:bg-white/10 active:scale-95 transition-all"
                >
                  Direct Inquiry Hotline
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
