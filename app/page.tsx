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
  Building, 
  FileCheck2, 
  ArrowRight,
  Check
} from "lucide-react";
import { useSite } from "@/context/SiteContext";

const SERVICE_IMAGES: Record<string, string> = {
  "panel-upgrade": "/media/service_panel_verification_desktop.webp",
  "ev-charging": "/media/service_ev_charger_install_mobile.webp",
  "architectural-lighting": "/media/service_lighting_penthouse_mobile.webp",
  "solar-battery": "/media/service_solar_brooklyn_rooftop_mobile.webp",
};

export default function Home() {
  const { texts, t } = useSite();
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

      {/* Main Luxury Header */}
      <Header />

      {/* Persistent iOS Mobile Action Bar */}
      <MobileActionBar />

      {/* LUXURY HERO SLIDER */}
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
              {t.servicesSection.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold uppercase tracking-tight text-slate-900 dark:text-white">
              {t.servicesSection.title}
            </h2>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
              {t.servicesSection.subtitle}
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.servicesSection.items.map((srv) => (
              <div 
                key={srv.id} 
                className="apple-glass-card group relative flex flex-col justify-between overflow-hidden rounded-2xl p-4 transition-all duration-300"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10">
                    <Image
                      src={SERVICE_IMAGES[srv.id] || "/media/service_panel_verification_desktop.webp"}
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
                    <span>{t.servicesSection.requestSchedule}</span>
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
              {t.boroughsSection.badge}
            </span>
            <h2 className="mt-1 text-3xl sm:text-4xl font-serif font-bold uppercase text-slate-900 dark:text-white">
              {t.boroughsSection.title}
            </h2>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
              {t.boroughsSection.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.boroughsSection.items.map((b, idx) => (
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
                  <span className="text-slate-500 dark:text-slate-400">{t.boroughsSection.inspectionsLabel}</span>
                  <span className="font-mono font-bold text-[#b79f53] dark:text-[#ece8a6]">{t.boroughsSection.dobStatus}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOB & INSURANCES SECTION */}
      <section id="compliance" className="relative z-10 border-t border-slate-200 dark:border-white/10 bg-slate-100/60 dark:bg-[#070b14]/80 py-20 backdrop-blur-xl scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#b88c22] dark:text-[#e6b93e]">
              {t.complianceSection.badge}
            </span>
            <h2 className="mt-1 text-3xl sm:text-4xl font-serif font-bold uppercase text-slate-900 dark:text-white">
              {t.complianceSection.title}
            </h2>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
              {t.complianceSection.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="apple-glass-card rounded-2xl p-6 relative overflow-hidden group">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e6b93e]/15 border border-[#e6b93e]/30 text-[#e6b93e] mb-4 group-hover:scale-110 transition-transform duration-300">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-tight">
                {t.complianceSection.cards.dobTitle}
              </h3>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {t.complianceSection.cards.dobDesc}
              </p>
              <div className="mt-4 pt-3 border-t border-slate-200/40 dark:border-white/10 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                {t.complianceSection.cards.dobStatus}: {texts.licenseNumber}
              </div>
            </div>

            <div className="apple-glass-card rounded-2xl p-6 relative overflow-hidden group">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/15 border border-sky-500/30 text-sky-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                <FileCheck2 className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-tight">
                {texts.coiAmount} {t.complianceSection.cards.coiTitle}
              </h3>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {t.complianceSection.cards.coiDesc}
              </p>
              <div className="mt-4 pt-3 border-t border-slate-200/40 dark:border-white/10 text-[11px] font-mono text-sky-600 dark:text-sky-400 font-bold">
                {t.complianceSection.cards.coiStatus}
              </div>
            </div>

            <div className="apple-glass-card rounded-2xl p-6 relative overflow-hidden group">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                <Building className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-tight">
                {t.complianceSection.cards.laborTitle}
              </h3>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {t.complianceSection.cards.laborDesc}
              </p>
              <div className="mt-4 pt-3 border-t border-slate-200/40 dark:border-white/10 text-[11px] font-mono text-amber-600 dark:text-amber-400 font-bold">
                {t.complianceSection.cards.laborStatus}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="relative z-10 border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#050810] py-20 scroll-mt-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#b88c22] dark:text-[#e6b93e]">
            {t.aboutSection.badge}
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
              <span>{t.aboutSection.exploreBtn}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* VERIFIED CLIENT REVIEWS */}
      <section className="relative z-10 border-t border-slate-200 dark:border-slate-800/80 bg-slate-100/50 dark:bg-[#090e17]/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#966b08] dark:text-[#e6b93e]">
              {t.reviewsSection.badge}
            </span>
            <h2 className="mt-1 text-3xl sm:text-4xl font-serif font-bold uppercase text-slate-900 dark:text-white">
              {t.reviewsSection.title}
            </h2>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
              {t.reviewsSection.subtitle}
            </p>
          </div>

          {/* Trust Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10 text-center">
            <div className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#050810] p-4 shadow-sm">
              <div className="text-xl sm:text-2xl font-bold font-mono text-[#966b08] dark:text-[#e6b93e]">{t.reviewsSection.stats.passRate}</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{t.reviewsSection.stats.passRateLabel}</div>
            </div>
            <div className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#050810] p-4 shadow-sm">
              <div className="text-xl sm:text-2xl font-bold font-mono text-[#966b08] dark:text-[#e6b93e]">{t.reviewsSection.stats.coned}</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{t.reviewsSection.stats.conedLabel}</div>
            </div>
            <div className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#050810] p-4 shadow-sm">
              <div className="text-xl sm:text-2xl font-bold font-mono text-[#966b08] dark:text-[#e6b93e]">{t.reviewsSection.stats.dispatch}</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{t.reviewsSection.stats.dispatchLabel}</div>
            </div>
            <div className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#050810] p-4 shadow-sm">
              <div className="text-xl sm:text-2xl font-bold font-mono text-[#966b08] dark:text-[#e6b93e]">{t.reviewsSection.stats.fees}</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{t.reviewsSection.stats.feesLabel}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.reviewsSection.reviews.map((rev, rIdx) => (
              <div key={rIdx} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#050810] p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-3">
                    {"★".repeat(5)}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
                    &ldquo;{rev.quote}&rdquo;
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 dark:text-white">{rev.author}</span>
                  <span className="text-slate-400">{t.reviewsSection.verifiedClient}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEAD CAPTURE WIZARD */}
      <section id="nyc-lead-wizard" className="relative z-10 border-t border-slate-200 dark:border-slate-800/80 bg-slate-100/60 dark:bg-[#050810] py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#b88c22] dark:text-[#e6b93e]">
              {t.leadWizard.badge}
            </span>
            <h2 className="mt-1 text-3xl sm:text-4xl font-serif font-bold uppercase text-slate-900 dark:text-white">
              {t.leadWizard.title}
            </h2>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
              {t.leadWizard.subtitle}
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
