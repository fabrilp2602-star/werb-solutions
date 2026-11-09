"use client";

import React from "react";
import Image from "next/image";
import { 
  ShieldCheck, 
  FileCheck2, 
  ExternalLink, 
  Award, 
  Scale, 
  Lock, 
  Building2, 
  CheckCircle2,
  AlertOctagon
} from "lucide-react";

export default function NycLegalShieldSection() {
  return (
    <section id="nyc-legal-shield" className="relative z-10 py-20 border-t border-white/10 bg-[#06080d]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-400 mb-3">
            <ShieldCheck className="h-4 w-4" /> Comprehensive Regulatory Shield
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            Institutional NYC Compliance & Legal Indemnity
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            Engineered to safeguard property owners, Co-op/Condo boards, managing agents, and general contractors
            against catastrophic liability, stop-work orders, and Scaffold Law exposure.
          </p>
        </div>

        {/* 4 Regulatory Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          {/* Pillar 1: Master Electrician License */}
          <div className="rounded-3xl border border-white/10 bg-[#0b0f17]/90 p-6 flex flex-col justify-between hover:border-amber-500/40 transition-all shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="h-11 w-11 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Award className="h-6 w-6" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-white/5 text-amber-400 border border-amber-500/20">
                  License # Valid
                </span>
              </div>
              <h3 className="text-lg font-black uppercase text-white">
                Master Electrician Licensed
              </h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Legally authorized by the City of New York to pull permits, submit electrical drawings, and sign off on high-voltage service entrances.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 text-[11px] text-slate-300 space-y-1.5">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="h-3.5 w-3.5" /> Full Class-A Authority
              </div>
              <div>Direct NYC DOB Jurisdiction in all 5 boroughs</div>
            </div>
          </div>

          {/* Pillar 2: DOB NOW Direct Link & Filings */}
          <div className="rounded-3xl border border-white/10 bg-[#0b0f17]/90 p-6 flex flex-col justify-between hover:border-cyan-500/40 transition-all shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="h-11 w-11 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <FileCheck2 className="h-6 w-6" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                  DOB NOW™ Direct
                </span>
              </div>
              <h3 className="text-lg font-black uppercase text-white">
                DOB NOW™ Electronic Filings
              </h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Direct portal integration for real-time electrical permits, Certificate of Correction filings, ECB violation dismissals, and final sign-offs.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 space-y-2">
              <a
                href="https://a810-dobnow.nyc.gov/publish/Index.html#!/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Verify DOB NOW Portal <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <div className="text-[11px] text-slate-400">Instant job number lookup & tracking</div>
            </div>
          </div>

          {/* Pillar 3: NY Labor Law 240/241 Scaffold Law Shield */}
          <div className="rounded-3xl border border-white/10 bg-[#0b0f17]/90 p-6 flex flex-col justify-between hover:border-amber-500/40 transition-all shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="h-11 w-11 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Scale className="h-6 w-6" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-white/5 text-amber-400 border border-amber-500/20">
                  Strict Liability
                </span>
              </div>
              <h3 className="text-lg font-black uppercase text-white">
                Labor Law 240/241 Indemnity
              </h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Full legal compliance with New York State Scaffold Law statutes, protecting building owners and managing agents from strict liability elevation claims.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 text-[11px] text-slate-300 space-y-1.5">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="h-3.5 w-3.5" /> Hold-Harmless Endorsements
              </div>
              <div>Pre-cleared Co-op Alteration Agreements</div>
            </div>
          </div>

          {/* Pillar 4: $2,000,000 COI Insurance Certificate */}
          <div className="rounded-3xl border border-white/10 bg-[#0b0f17]/90 p-6 flex flex-col justify-between hover:border-emerald-500/40 transition-all shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="h-11 w-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Lock className="h-6 w-6" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  $2M Umbrella
                </span>
              </div>
              <h3 className="text-lg font-black uppercase text-white">
                $2,000,000 COI Insurance
              </h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Commercial General Liability, NYS Workers&apos; Compensation, and Disability coverage. Sample COI delivered within 1 hour for any management company.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 text-[11px] text-slate-300 space-y-1.5">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="h-3.5 w-3.5" /> Additional Insured Custom COI
              </div>
              <div>First Service, Douglas Elliman, AKAM ready</div>
            </div>
          </div>

        </div>

        {/* Co-op / Managing Agent Direct Guarantee Banner */}
        <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-[#0b0f17] to-cyan-500/10 p-6 sm:p-10 backdrop-blur-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                <AlertOctagon className="h-4 w-4" /> Managing Agent & Board Expedited Protocol
              </div>
              <h4 className="text-xl sm:text-2xl font-black uppercase text-white">
                Need a Custom COI or Alteration Package for your Board?
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Our in-house compliance desk generates customized Certificates of Insurance (COI) naming building owners, 
                managing entities, and mortgage holders as Additional Insured on a primary and non-contributory basis within 60 minutes.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="#nyc-lead-wizard"
                className="rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3 text-xs font-black uppercase tracking-wider text-black shadow-amber-glow hover:brightness-110 active:scale-95 transition-all"
              >
                Request Board Intake Package
              </a>
              <a
                href="tel:+19295847647"
                className="rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-xs font-bold text-white hover:bg-white/10 active:scale-95 transition-all"
              >
                Compliance Hotline: +1 (929) 584-7647
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
