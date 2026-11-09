import React from "react";
import type { Metadata } from "next";
import Header from "@/components/navigation/Header";
import Footer from "@/components/Footer";
import MobileActionBar from "@/components/navigation/MobileActionBar";
import { ShieldCheck, Scale, Hammer, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | WERB Solutions NYC",
  description: "Terms of service, New York State Labor Law 240/241 disclosures, and NYC Department of Buildings terms for WERB Solutions LLC.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] dark:bg-[#050810] text-slate-900 dark:text-slate-100 transition-colors">
      <Header />
      <MobileActionBar />

      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 space-y-10">
        <div className="border-b border-slate-200 dark:border-white/10 pb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e6b93e]/30 bg-[#e6b93e]/10 px-3.5 py-1 text-xs font-mono font-bold uppercase text-[#b88c22] dark:text-[#e6b93e] mb-3">
            <Scale className="h-3.5 w-3.5" />
            <span>NYC Contracting Terms</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-slate-900 dark:text-white uppercase">
            Terms of Service & DOB Legal Standards
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Contracting regulations, insurance certificates, and code compliance standards governing all projects undertaken by WERB Solutions LLC across the five boroughs of New York City.
          </p>
        </div>

        <section className="space-y-4 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#090e17] p-6 sm:p-8 shadow-sm">
          <h2 className="text-lg font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
            <Hammer className="h-5 w-5 text-[#b88c22] dark:text-[#e6b93e]" />
            <span>1. NYC DOB Permitting & Filing Representation</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            All high-voltage installations, electrical service cutovers, solar panel canopies, and commercial EV charging stations require official filings with the NYC Department of Buildings through DOB NOW™. WERB Solutions acts as the licensed master electrician of record for certified jobs.
          </p>
        </section>

        <section className="space-y-4 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#090e17] p-6 sm:p-8 shadow-sm">
          <h2 className="text-lg font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-500" />
            <span>2. Insurance & NY Labor Law 240/241 Compliance</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            WERB Solutions LLC maintains full Comprehensive General Liability ($2,000,000 aggregate), Workers' Compensation, and Disability insurance complying with New York State Labor Law § 240 and § 241 (Scaffold Law). Certificates of Insurance (COI) naming building management boards, landlords, and condo HOAs as additional insureds are generated promptly upon contract execution.
          </p>
        </section>

        <section className="space-y-4 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#090e17] p-6 sm:p-8 shadow-sm">
          <h2 className="text-lg font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-[#b88c22] dark:text-[#e6b93e]" />
            <span>3. Emergency Dispatch & Response Times</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            24/7 emergency dispatch target response times (under 45 minutes in Manhattan, under 30 minutes in Brooklyn, and under 40 minutes in Queens) are dependent on MTA transit traffic, severe weather events, and active FDNY/NYPD area cordons.
          </p>
        </section>
      </div>

      <Footer />
    </main>
  );
}
