"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Marquee from "@/components/navigation/Marquee";
import Header from "@/components/navigation/Header";
import Footer from "@/components/Footer";
import MobileActionBar from "@/components/navigation/MobileActionBar";
import NycLeadWizard from "@/components/features/NycLeadWizard";
import HeroSlider from "@/components/features/HeroSlider";
import { 
  ShieldCheck, 
  Zap, 
  Building, 
  CheckCircle, 
  Clock, 
  PhoneCall, 
  FileCheck2, 
  MapPin,
  ArrowRight,
  Check,
  Sparkles,
  Award
} from "lucide-react";
import { useSite } from "@/context/SiteContext";

const NYC_SERVICES = [
  {
    id: "panel-upgrade",
    title: "200A Smart Panel Upgrades",
    targetService: "200A Smart Electrical Panel Upgrade",
    badge: "DOB NOW™ Certified",
    desc: "Replacement of obsolete Federal Pacific & Zinsco panels with smart Eaton/Square-D units. Essential for EV chargers and central HVAC in Brooklyn Brownstones.",
    image: "/media/service_panel_verification_desktop.webp",
    features: ["Under 8-Hour Seamless Cutover", "DOB Inspection Tag Guaranteed", "Smart Load Shedding Integration"]
  },
  {
    id: "ev-charging",
    title: "Tesla & Universal Level-2 EV Chargers",
    targetService: "Level-2 EV Charger Dedicated Line",
    badge: "NYC Code Compliant",
    desc: "Complete multi-family, private garage, and commercial Level-2 EV charger installations with dedicated 240V lines and permit management.",
    image: "/media/service_ev_charger_install_mobile.webp",
    features: ["Load Calculation Verification", "Wall Connector Concealed Conduit", "NYC DOB Electrical Certificate"]
  },
  {
    id: "architectural-lighting",
    title: "Lutron Architectural Lighting",
    targetService: "Lutron Architectural Smart Lighting",
    badge: "Luxury Penthouses",
    desc: "Precision magnetic track lighting, cove indirect illumination, and Lutron HomeWorks automated wireless keypad integration for Manhattan residences.",
    image: "/media/service_lighting_penthouse_mobile.webp",
    features: ["Zero-Flicker 3000K Warm Dimming", "Venetian Plaster Flush Mounts", "Smartphone & Voice Automation"]
  },
  {
    id: "solar-battery",
    title: "Urban Rooftop Solar & Storage",
    targetService: "Solar Rooftop & Battery Backup System",
    badge: "Local Law 97 Ready",
    desc: "Commercial and residential flat rooftop photovoltaic canopies with Enphase/Tesla Powerwall battery backup systems across Brooklyn & Queens.",
    image: "/media/service_solar_brooklyn_rooftop_mobile.webp",
    features: ["NYC Solar Property Tax Abatement", "ConEd Interconnection Filing", "Carbon Penalty Mitigation"]
  }
];

const BOROUGHS = [
  {
    name: "Manhattan",
    subtitle: "High-Rise Condos, Co-ops & Historic Lofts",
    neighborhoods: "Tribeca • Soho • Upper East Side • Upper West Side • Chelsea • West Village • Financial District",
    dispatchTime: "Under 45 Mins 24/7"
  },
  {
    name: "Brooklyn",
    subtitle: "Historic Brownstones & Commercial Waterfront",
    neighborhoods: "Brooklyn Heights • DUMBO • Park Slope • Williamsburg • Cobble Hill • Carroll Gardens • Greenpoint",
    dispatchTime: "Under 30 Mins 24/7"
  },
  {
    name: "Queens & LIC",
    subtitle: "Commercial Hubs, Warehouses & Multi-Family",
    neighborhoods: "Long Island City • Astoria • Sunnyside • Forest Hills • Flushing • Ridgewood",
    dispatchTime: "Under 40 Mins 24/7"
  }
];

export default function Home() {
  const { texts } = useSite();
  const [selectedService, setSelectedService] = useState<string>("200A Smart Electrical Panel Upgrade");

  // Read URL query parameter if present (e.g. ?service=Level-2+EV+Charger...)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const srvParam = params.get("service");
      if (srvParam) {
        setSelectedService(srvParam);
        if (window.location.hash === "#nyc-lead-wizard") {
          setTimeout(() => {
            document.getElementById("nyc-lead-wizard")?.scrollIntoView({ behavior: "smooth" });
          }, 300);
        }
      }
    }
  }, []);

  const handleSelectService = (targetService: string) => {
    setSelectedService(targetService);
    const el = document.getElementById("nyc-lead-wizard");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="relative min-h-screen bg-[#f8fafc] dark:bg-[#050810] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Top Dynamic Marquee */}
      <Marquee />

      {/* Main Luxury Header (Without Admin button) */}
      <Header />

      {/* Persistent iOS Mobile Action Bar */}
      <MobileActionBar />

      {/* LUXURY HERO SLIDER (MODULARES GM PATTERN WITH FULL-BLEED BACKGROUND & SERVICE CARDS RAIL) */}
      <HeroSlider
        isHomePage={true}
        onSelectService={handleSelectService}
        phone={texts.phone}
      />

      {/* SERVICES SECTION */}
      <section id="services" className="relative z-10 border-t border-slate-200 dark:border-slate-800/80 bg-white/70 dark:bg-[#090e17]/70 py-20 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#b88c22] dark:text-[#e6b93e] mb-2 block">
              High-Spec Infrastructure Catalog
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold uppercase tracking-tight text-slate-900 dark:text-white">
              ENGINEERED ELECTRICAL SERVICES
            </h2>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
              Fully permitted under the New York City Electrical Code (Title 27 Chapter 3).
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {NYC_SERVICES.map((srv) => (
              <div 
                key={srv.id} 
                className="apple-glass-card group relative flex flex-col justify-between overflow-hidden rounded-2xl p-4 transition-all duration-300"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10">
                    <Image
                      src={srv.image}
                      alt={srv.title}
                      fill
                      sizes="300px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2.5 left-2.5 rounded-lg bg-black/80 px-2.5 py-1 text-[10px] font-mono font-bold uppercase text-[#e6b93e] backdrop-blur-md border border-[#e6b93e]/30">
                      {srv.badge}
                    </span>
                  </div>

                  <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
                    {srv.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {srv.desc}
                  </p>
                </div>

                <div className="mt-5 border-t border-slate-100 dark:border-slate-800/80 pt-4">
                  <ul className="space-y-1.5 text-[11px] text-slate-700 dark:text-slate-300">
                    {srv.features.map((feat, fidx) => (
                      <li key={fidx} className="flex items-center gap-1.5">
                        <Check className="h-3 w-3 text-emerald-500" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <button 
                    type="button"
                    onClick={() => handleSelectService(srv.targetService)}
                    className="mt-4 flex w-full items-center justify-between text-xs font-bold text-[#b79f53] dark:text-[#ece8a6] hover:underline cursor-pointer group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Request Schedule</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NYC BOROUGHS SECTION */}
      <section id="boroughs" className="relative z-10 py-20 bg-slate-50/50 dark:bg-black/40 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#b88c22] dark:text-[#e6b93e]">
              Immediate Rapid Dispatch
            </span>
            <h2 className="mt-1 text-3xl sm:text-4xl font-serif font-bold uppercase text-slate-900 dark:text-white">
              NYC COVERAGE BOROUGHS
            </h2>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
              Dedicated mobile technical vans stationed strategically across the metropolitan area.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BOROUGHS.map((b, idx) => (
              <div 
                key={idx}
                className="apple-glass-card rounded-2xl p-6 relative overflow-hidden group"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">
                    {b.name}
                  </h3>
                  <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-bold px-2.5 py-1">
                    {b.dispatchTime}
                  </span>
                </div>
                <div className="text-xs font-semibold text-[#b88c22] dark:text-[#e6b93e] mt-1">
                  {b.subtitle}
                </div>
                <p className="mt-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {b.neighborhoods}
                </p>
                <div className="mt-6 pt-4 border-t border-slate-200/40 dark:border-white/10 flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400">Inspections & Permits:</span>
                  <span className="font-mono font-bold text-[#b79f53] dark:text-[#ece8a6]">DOB NOW™ Ready</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOB & INSURANCES SECTION (LINKABLE FROM NAVBAR #compliance) */}
      <section id="compliance" className="relative z-10 border-t border-slate-200 dark:border-white/10 bg-slate-100/60 dark:bg-[#070b14]/80 py-20 backdrop-blur-xl scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#b88c22] dark:text-[#e6b93e]">
              Institutional Accreditations
            </span>
            <h2 className="mt-1 text-3xl sm:text-4xl font-serif font-bold uppercase text-slate-900 dark:text-white">
              NYC DOB & INSURANCE COMPLIANCE
            </h2>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
              Mandatory legal credentials demanded by Manhattan Condominiums, Co-op Boards, and General Contractors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="apple-glass-card rounded-2xl p-6 relative overflow-hidden group">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e6b93e]/15 border border-[#e6b93e]/30 text-[#e6b93e] mb-4 group-hover:scale-110 transition-transform duration-300">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-tight">
                NYC DOB Licensed Master Electrician
              </h3>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Licensed under the Department of Buildings (DOB). We file and process electrical permits directly via the <strong>DOB NOW: Inspections / Licensing</strong> portal.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-200/40 dark:border-white/10 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                ✓ License Active & Verified: {texts.licenseNumber}
              </div>
            </div>

            <div className="apple-glass-card rounded-2xl p-6 relative overflow-hidden group">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/15 border border-sky-500/30 text-sky-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                <FileCheck2 className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-tight">
                {texts.coiAmount} Commercial General Liability
              </h3>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Standard ISO CG 0001 coverage ($1M Occurrence / $2M Aggregate) naming property owners, management companies, and the City of New York as Additional Insureds.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-200/40 dark:border-white/10 text-[11px] font-mono text-sky-600 dark:text-sky-400 font-bold">
                ✓ COI Generated Same-Day for Building Boards
              </div>
            </div>

            <div className="apple-glass-card rounded-2xl p-6 relative overflow-hidden group">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                <Building className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-tight">
                NY Labor Law 240/241 & Scaffold Law
              </h3>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Comprehensive statutory worker protection policy strictly guarding general contractors and property owners against strict liability claims on high-elevation scaffolding.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-200/40 dark:border-white/10 text-[11px] font-mono text-amber-600 dark:text-amber-400 font-bold">
                ✓ Full NYS Workers' Comp & Disability Active
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION (LINKABLE FROM NAVBAR #about) */}
      <section id="about" className="relative z-10 border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#050810] py-20 scroll-mt-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#b88c22] dark:text-[#e6b93e]">
            Official NYC Contractor
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-serif font-bold uppercase text-slate-900 dark:text-white">
            {texts.aboutTitle}
          </h2>
          <p className="mt-5 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {texts.aboutText}
          </p>
          <div className="mt-8">
            <Link
              href="/services"
              className="gold-gradient-btn inline-flex items-center gap-2 rounded-xl px-7 py-3 text-xs font-bold uppercase tracking-wider text-black shadow-md"
            >
              <span>Explore Complete Services Directory</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* VERIFIED CLIENT REVIEWS (ORIGINAL TESTIMONIALS FROM GODADDY) */}
      <section className="relative z-10 border-t border-slate-200 dark:border-slate-800/80 bg-slate-100/50 dark:bg-[#090e17]/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#966b08] dark:text-[#e6b93e]">
              Verified NYC Client Feedback & Track Record
            </span>
            <h2 className="mt-1 text-3xl sm:text-4xl font-serif font-bold uppercase text-slate-900 dark:text-white">
              WHAT OUR CLIENTS SAY
            </h2>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
              Trusted by condo owners, brownstone renovators, and commercial facility managers across Manhattan, Brooklyn, and Queens.
            </p>
          </div>

          {/* Microfish Industry Trust Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10 text-center">
            <div className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#050810] p-4 shadow-sm">
              <div className="text-xl sm:text-2xl font-bold font-mono text-[#966b08] dark:text-[#e6b93e]">100%</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">DOB Inspection Pass Rate</div>
            </div>
            <div className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#050810] p-4 shadow-sm">
              <div className="text-xl sm:text-2xl font-bold font-mono text-[#966b08] dark:text-[#e6b93e]">ConEd</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Direct Load Letter Filing</div>
            </div>
            <div className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#050810] p-4 shadow-sm">
              <div className="text-xl sm:text-2xl font-bold font-mono text-[#966b08] dark:text-[#e6b93e]">&lt;45 min</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">24/7 Manhattan Emergency</div>
            </div>
            <div className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#050810] p-4 shadow-sm">
              <div className="text-xl sm:text-2xl font-bold font-mono text-[#966b08] dark:text-[#e6b93e]">$0</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Hidden Fees / Upfront Quote</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#050810] p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {"★".repeat(5)}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
                  &ldquo;Vladimir did a great job fixing my circuit breakers for a reasonable price. Very happy with the outcome.&rdquo;
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900 dark:text-white">Greg R.</span>
                <span className="text-slate-400">Verified Client</span>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#050810] p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {"★".repeat(5)}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
                  &ldquo;The team worked efficiently to identify the electrical issue and proposed recommendations to fix it. They acted quickly to fix the issues based on what we agreed and everything turned out well. I would definitely recommend them for all electrical needs.&rdquo;
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900 dark:text-white">Shauna W.</span>
                <span className="text-slate-400">Verified Client</span>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#050810] p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {"★".repeat(5)}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
                  &ldquo;Very polite and nicely have done the work. Installed 3 ceiling fan last minute call and a hallway light. Impressed with his workmanship.&rdquo;
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900 dark:text-white">Sabina H.</span>
                <span className="text-slate-400">Verified Client</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEAD CAPTURE WIZARD */}
      <section id="nyc-lead-wizard" className="relative z-10 border-t border-slate-200 dark:border-slate-800/80 bg-slate-100/60 dark:bg-[#050810] py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#b88c22] dark:text-[#e6b93e]">
              Direct Intake & COI Generator
            </span>
            <h2 className="mt-1 text-3xl sm:text-4xl font-serif font-bold uppercase text-slate-900 dark:text-white">
              SCHEDULE NYC INSPECTION & QUOTE
            </h2>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
              Complies with NYC Building Department guidelines and Alteration Agreements for luxury buildings.
            </p>
          </div>

          <NycLeadWizard 
            selectedService={selectedService} 
            onClearService={() => setSelectedService("")} 
          />
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </main>
  );
}
