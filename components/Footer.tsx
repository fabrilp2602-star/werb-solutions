"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ShieldCheck, 
  Lock, 
  PhoneCall, 
  ArrowRight 
} from "lucide-react";
import { openCookiePreferences } from "@/components/AnalyticsConsent";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/80 dark:border-white/[0.08] bg-slate-100/90 dark:bg-[#050810] text-slate-600 dark:text-slate-400 text-xs pb-20 md:pb-6 pt-6 sm:pt-8 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Compact 4-Column Grid (Reduced vertical padding to half) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          
          {/* Col 1: Brand & Backing */}
          <div className="space-y-2">
            <div className="relative h-10 w-44">
              <Image
                src="/media/legacy_logo_white.webp"
                alt="WERB Solutions"
                fill
                sizes="176px"
                className="object-contain object-left drop-shadow-sm brightness-105"
              />
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
              NYC Department of Buildings Licensed Master Electrician. 24/7 high-voltage emergency dispatch & general construction for NYC.
            </p>
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-semibold">
                <ShieldCheck className="h-3 w-3" />
                <span>$2,000,000 COI Active</span>
              </span>
            </div>
          </div>

          {/* Col 2: Services Directory */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-2 font-mono">
              Engineered Services
            </h3>
            <ul className="space-y-1 text-[11px]">
              <li>
                <Link href="/services#high-voltage-systems" className="hover:text-slate-950 dark:hover:text-white transition-colors">
                  Circuit Breakers & Smart Panels
                </Link>
              </li>
              <li>
                <Link href="/services#high-voltage-systems" className="hover:text-slate-950 dark:hover:text-white transition-colors">
                  FDNY Code Fire Alarm Systems
                </Link>
              </li>
              <li>
                <Link href="/services#clean-energy" className="hover:text-slate-950 dark:hover:text-white transition-colors">
                  Rooftop Solar & Local Law 97
                </Link>
              </li>
              <li>
                <Link href="/services#architectural-construction" className="hover:text-slate-950 dark:hover:text-white transition-colors">
                  Demolition, Drywall & Fine Painting
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Borough Coverage */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-2 font-mono">
              Borough Dispatch 24/7
            </h3>
            <ul className="space-y-1 text-[11px]">
              <li className="flex items-center justify-between">
                <span>Manhattan Condos & Co-ops</span>
                <span className="font-mono text-[#c99818] dark:text-[#e5d15e]">&lt;45 min</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Brooklyn Brownstones</span>
                <span className="font-mono text-[#c99818] dark:text-[#e5d15e]">&lt;30 min</span>
              </li>
              <li className="pt-1.5">
                <a
                  href="tel:+19295847647"
                  className="inline-flex items-center gap-1.5 text-slate-900 dark:text-white font-mono font-bold hover:text-[#c99818] dark:hover:text-[#e5d15e] transition-colors"
                >
                  <PhoneCall className="h-3 w-3 text-[#c99818] dark:text-[#e5d15e]" />
                  <span>+1 (929) 584-7647</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Regulatory & Legal Compliance */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-2 font-mono">
              NYC Compliance
            </h3>
            <ul className="space-y-1 text-[11px]">
              <li>
                <Link href="/privacy" className="hover:text-slate-950 dark:hover:text-white transition-colors">
                  Privacy Policy & NY SHIELD Act
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-slate-950 dark:hover:text-white transition-colors">
                  Terms & Labor Law 240/241
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={openCookiePreferences}
                  className="hover:text-slate-950 dark:hover:text-white transition-colors text-left"
                >
                  Cookie Consent Preferences
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Compact Single-line Bottom Bar */}
        <div className="border-t border-slate-200/80 dark:border-white/10 pt-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10.5px]">
          <div>
            &copy; 2026 <strong className="text-slate-800 dark:text-slate-200">WERB SOLUTIONS LLC</strong>. All Rights Reserved. New York City.
          </div>
          <div className="flex items-center gap-3">
            <Link href="/privacy" className="hover:text-slate-900 dark:hover:text-white">Privacy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-slate-900 dark:hover:text-white">Terms</Link>
            <span>•</span>
            <button type="button" onClick={openCookiePreferences} className="hover:text-slate-900 dark:hover:text-white">
              Cookies
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
