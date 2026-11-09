"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MapPin, Building, ShieldCheck, Clock, ArrowRight, Zap, CheckCircle2 } from "lucide-react";

interface Neighborhood {
  name: string;
  dispatchTime: string;
  focus: string;
  codeRequirement: string;
}

interface BoroughData {
  id: string;
  name: string;
  badge: string;
  headline: string;
  description: string;
  image: string;
  neighborhoods: Neighborhood[];
  stats: { label: string; value: string }[];
}

const BOROUGHS: BoroughData[] = [
  {
    id: "manhattan",
    name: "Manhattan",
    badge: "High-Rise & Historic Core",
    headline: "Class-A Penthouses, Co-ops & Financial District Switchgear",
    description:
      "Rapid coordination for board alteration agreements, high-amperage 480V 3-phase risers, and architectural Lutron lighting across luxury residential towers and landmark addresses.",
    image: "/media/hero_loft_blueprints_desktop.webp",
    stats: [
      { label: "Dispatch Response", value: "< 45 Mins" },
      { label: "Alteration Clearances", value: "100% Board Approved" },
      { label: "COI Coverage", value: "$2M+ Umbrella" },
    ],
    neighborhoods: [
      {
        name: "Tribeca",
        dispatchTime: "30-40 min",
        focus: "Cast-iron loft heavy-up panels & Lutron HomeWorks QSX",
        codeRequirement: "Con Edison Vault & Riser Sign-offs",
      },
      {
        name: "SoHo",
        dispatchTime: "35 min",
        focus: "Retail flagship 3-phase power & historic cast-iron conduits",
        codeRequirement: "LPC & NYC DOB Commercial Code",
      },
      {
        name: "Upper East Side (UES)",
        dispatchTime: "30 min",
        focus: "Pre-war Co-op alteration agreements & 200A submetering",
        codeRequirement: "Full Co-op Board Architectural Packages",
      },
      {
        name: "Upper West Side (UWS)",
        dispatchTime: "35 min",
        focus: "Classic 7 apartment rewiring & hazardous BX cable retirement",
        codeRequirement: "Non-destructive architectural snake routing",
      },
    ],
  },
  {
    id: "brooklyn",
    name: "Brooklyn",
    badge: "Landmark Brownstone Preservation",
    headline: "Architectural Knob & Tube Elimination & Waterfront Lofts",
    description:
      "Master electrical restoration for historic brownstones and conversion lofts. Complete elimination of dangerous 1920s knob-and-tube and ungrounded wiring without compromising plaster cornices or woodwork.",
    image: "/media/service_solar_brooklyn_rooftop_mobile.webp",
    stats: [
      { label: "Dispatch Response", value: "< 50 Mins" },
      { label: "LPC Compliance", value: "100% Non-Destructive" },
      { label: "Heavy-Ups Done", value: "350+ Panels" },
    ],
    neighborhoods: [
      {
        name: "DUMBO",
        dispatchTime: "35 min",
        focus: "Converted factory lofts, exposed conduit aesthetic & EV charging",
        codeRequirement: "Industrial 208V 3-phase distribution",
      },
      {
        name: "Brooklyn Heights",
        dispatchTime: "30 min",
        focus: "Federalist & Greek Revival townhouses knob-and-tube replacement",
        codeRequirement: "LPC historic preservation approval",
      },
      {
        name: "Williamsburg",
        dispatchTime: "40 min",
        focus: "Boutique mixed-use, rooftop solar PV & Local Law 97 upgrades",
        codeRequirement: "ConEd Net Metering & DOB NOW Inspections",
      },
      {
        name: "Park Slope",
        dispatchTime: "35 min",
        focus: "Victorian brownstone 200A/400A service heavy-ups",
        codeRequirement: "Underground service entrance cutovers",
      },
    ],
  },
  {
    id: "queens",
    name: "Queens",
    badge: "Commercial & Waterfront Modernization",
    headline: "Long Island City Towers, Industrial Hubs & Astoria Residences",
    description:
      "Large-capacity infrastructure for Queens waterfront developments, rapid submetering installations, and industrial switchgear diagnostics.",
    image: "/media/service_panel_verification_desktop.webp",
    stats: [
      { label: "Dispatch Response", value: "< 50 Mins" },
      { label: "Permits Filed", value: "DOB NOW Express" },
      { label: "LL97 Consults", value: "Active Queens Portfolio" },
    ],
    neighborhoods: [
      {
        name: "Long Island City (LIC)",
        dispatchTime: "35 min",
        focus: "Waterfront high-rise residential & commercial media studios",
        codeRequirement: "DOB Category 1 & 2 inspection certs",
      },
      {
        name: "Astoria",
        dispatchTime: "40 min",
        focus: "Multi-family 3-unit meter segregation & 200A heavy-ups",
        codeRequirement: "ConEd Work Order cutover certification",
      },
      {
        name: "Sunnyside & Woodside",
        dispatchTime: "45 min",
        focus: "Pre-war courtyard co-ops & emergency breaker panel replacement",
        codeRequirement: "NYC Electrical Code Article 230",
      },
    ],
  },
];

export default function NycBoroughsSection() {
  const [selectedBoroughId, setSelectedBoroughId] = useState<string>("manhattan");

  const activeBorough = BOROUGHS.find((b) => b.id === selectedBoroughId) || BOROUGHS[0];

  const handleSelectBorough = (id: string) => {
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(12);
      } catch {
        // ignore
      }
    }
    setSelectedBoroughId(id);
  };

  return (
    <section id="nyc-boroughs-interactive" className="relative z-10 py-20 border-t border-white/10 bg-[#070a0f]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-400 mb-3">
            <MapPin className="h-3.5 w-3.5" /> Territorial Master Electrician Grid
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            NYC Boroughs & Neighborhood Coverage
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            Dedicated master electrician response teams stationed across key hubs for instant DOB NOW compliance,
            co-op alteration filings, and high-voltage emergencies.
          </p>

          {/* Apple-style Segmented Control */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-[#0b0f17] border border-white/15 shadow-xl">
            {BOROUGHS.map((b) => {
              const isSelected = b.id === selectedBoroughId;
              return (
                <button
                  key={b.id}
                  onClick={() => handleSelectBorough(b.id)}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 active:scale-95 ${
                    isSelected
                      ? "bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-amber-glow"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {b.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Borough Detail Canvas */}
        <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-[#0b0f17] to-[#05070a] p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Borough Overview & Stats */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold font-mono uppercase tracking-widest text-cyan-400">
                  {activeBorough.badge}
                </span>
                <h3 className="mt-1 text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                  {activeBorough.headline}
                </h3>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                  {activeBorough.description}
                </p>
              </div>

              {/* Metrics Bar */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                {activeBorough.stats.map((stat, i) => (
                  <div key={i} className="p-3 rounded-xl border border-white/10 bg-black/40">
                    <div className="text-[10px] uppercase font-bold text-slate-400">{stat.label}</div>
                    <div className="text-base sm:text-lg font-black text-amber-400 mt-0.5">{stat.value}</div>
                  </div>
                ))}
              </div>

              {/* Neighborhoods Grid */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
                  <Building className="h-4 w-4 text-amber-400" /> Key Neighborhood Hubs & Code Specialization
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeBorough.neighborhoods.map((nh, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5 hover:border-amber-500/30 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-white">{nh.name}</span>
                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          {nh.dispatchTime}
                        </span>
                      </div>
                      <p className="mt-1.5 text-xs text-slate-300 font-medium">
                        {nh.focus}
                      </p>
                      <div className="mt-2 text-[10px] text-slate-400 flex items-center gap-1.5">
                        <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0" />
                        <span>{nh.codeRequirement}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href="#nyc-lead-wizard"
                  className="rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-2.5 text-xs font-black uppercase tracking-wider text-black shadow-amber-glow hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
                >
                  Request Dispatch in {activeBorough.name} <ArrowRight className="h-3.5 w-3.5" />
                </a>
                <a
                  href="tel:+19295847647"
                  className="rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-xs font-bold text-white hover:bg-white/10 active:scale-95 transition-all"
                >
                  Direct Dispatch Hotline
                </a>
              </div>
            </div>

            {/* Right Column: High-Res WebP Architectural Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative h-[320px] sm:h-[400px] w-full overflow-hidden rounded-2xl border border-white/15 bg-black/60 shadow-2xl">
                <Image
                  src={activeBorough.image}
                  alt={`${activeBorough.name} Electrical Services`}
                  fill
                  sizes="(min-width: 1024px) 35vw, 90vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070a0f] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/10 bg-black/80 p-3.5 backdrop-blur-md">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase">
                    <ShieldCheck className="h-4 w-4" /> NYC DOB NOW Registered
                  </div>
                  <div className="text-[11px] text-slate-300 mt-0.5">
                    Class-A Master Electrician trucks fully equipped for {activeBorough.name} residential & commercial codes.
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
