import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/navigation/Header";
import Footer from "@/components/Footer";
import MobileActionBar from "@/components/navigation/MobileActionBar";
import { ShieldCheck, Lock, FileText, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | WERB Solutions NYC",
  description: "Privacy practices, New York SHIELD Act and CCPA compliance for WERB Solutions LLC.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] dark:bg-[#050810] text-slate-900 dark:text-slate-100 transition-colors">
      <Header />
      <MobileActionBar />

      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 space-y-10">
        <div className="border-b border-slate-200 dark:border-white/10 pb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-mono font-bold uppercase text-emerald-600 dark:text-emerald-400 mb-3">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>US & NY Regulatory Standards</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-slate-900 dark:text-white uppercase">
            Privacy Policy & Data Security
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Official data governance standards for WERB Solutions LLC compliant with the New York Stop Hacks and Improve Electronic Data Security Act (NY SHIELD Act) and Federal trade standards.
          </p>
        </div>

        <section className="space-y-4 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#090e17] p-6 sm:p-8 shadow-sm">
          <h2 className="text-lg font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
            <Lock className="h-5 w-5 text-[#b88c22] dark:text-[#e6b93e]" />
            <span>1. Information Collection & Intake</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            WERB Solutions collects technical property information, contact details, and project specifications submitted via our intake wizard, phone hotline, or WhatsApp channel. This information is strictly utilized to file official NYC Department of Buildings (DOB NOW™) permits, schedule field master electrician inspections, and dispatch emergency personnel.
          </p>
        </section>

        <section className="space-y-4 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#090e17] p-6 sm:p-8 shadow-sm">
          <h2 className="text-lg font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="h-5 w-5 text-[#b88c22] dark:text-[#e6b93e]" />
            <span>2. Zero Third-Party Monetization</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            We never sell, rent, or trade your personal or building data to marketing brokers or third-party advertisers. All customer data remains encrypted at rest and in transit.
          </p>
        </section>

        <section className="space-y-4 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#090e17] p-6 sm:p-8 shadow-sm">
          <h2 className="text-lg font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-[#b88c22] dark:text-[#e6b93e]" />
            <span>3. Contact & Inquiries</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            For questions regarding privacy, records retention, or permit documentation, contact our compliance officer at <span className="font-mono text-[#b88c22] dark:text-[#e6b93e]">info@werbsolutions.com</span> or call <span className="font-mono font-bold">+1 (929) 584-7647</span>.
          </p>
        </section>
      </div>

      <Footer />
    </main>
  );
}
