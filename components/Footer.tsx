"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ShieldCheck, 
  PhoneCall 
} from "lucide-react";
import { openCookiePreferences } from "@/components/AnalyticsConsent";
import { useSite } from "@/context/SiteContext";

export default function Footer() {
  const { texts, t } = useSite();

  return (
    <footer className="border-t border-slate-200/80 dark:border-white/[0.08] bg-slate-100/90 dark:bg-[#050810] text-slate-600 dark:text-slate-400 text-xs pb-32 md:pb-8 pt-6 sm:pt-8 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Compact 4-Column Grid */}
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
              {t.footer.brandDesc}
            </p>
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-semibold">
                <ShieldCheck className="h-3 w-3" />
                <span>{texts.coiAmount} {t.footer.coiBadge}</span>
              </span>
            </div>
          </div>

          {/* Col 2: Services Directory */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-2 font-mono">
              {t.footer.servicesTitle}
            </h3>
            <ul className="space-y-1 text-[11px]">
              <li>
                <Link href="/services#high-voltage-systems" className="hover:text-slate-950 dark:hover:text-white transition-colors">
                  {t.footer.serviceLinks.panels}
                </Link>
              </li>
              <li>
                <Link href="/services#high-voltage-systems" className="hover:text-slate-950 dark:hover:text-white transition-colors">
                  {t.footer.serviceLinks.fireAlarms}
                </Link>
              </li>
              <li>
                <Link href="/services#clean-energy" className="hover:text-slate-950 dark:hover:text-white transition-colors">
                  {t.footer.serviceLinks.solar}
                </Link>
              </li>
              <li>
                <Link href="/services#architectural-construction" className="hover:text-slate-950 dark:hover:text-white transition-colors">
                  {t.footer.serviceLinks.painting}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Borough Coverage */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-2 font-mono">
              {t.footer.dispatchTitle}
            </h3>
            <ul className="space-y-1 text-[11px]">
              <li className="flex items-center justify-between">
                <span>{t.footer.dispatchManhattan}</span>
                <span className="font-mono text-[#c99818] dark:text-[#e5d15e]">&lt;45 min</span>
              </li>
              <li className="flex items-center justify-between">
                <span>{t.footer.dispatchBrooklyn}</span>
                <span className="font-mono text-[#c99818] dark:text-[#e5d15e]">&lt;30 min</span>
              </li>
              <li className="pt-1.5">
                <a
                  href={`tel:${texts.phone.replace(/[^+\d]/g, "")}`}
                  className="inline-flex items-center gap-1.5 text-slate-900 dark:text-white font-mono font-bold hover:text-[#c99818] dark:hover:text-[#e5d15e] transition-colors"
                >
                  <PhoneCall className="h-3 w-3 text-[#c99818] dark:text-[#e5d15e]" />
                  <span>{texts.phone}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Regulatory & Legal Compliance */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-2 font-mono">
              {t.footer.complianceTitle}
            </h3>
            <ul className="space-y-1 text-[11px]">
              <li>
                <Link href="/privacy" className="hover:text-slate-950 dark:hover:text-white transition-colors">
                  {t.footer.privacyLink}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-slate-950 dark:hover:text-white transition-colors">
                  {t.footer.termsLink}
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={openCookiePreferences}
                  className="hover:text-slate-950 dark:hover:text-white transition-colors text-left cursor-pointer"
                >
                  {t.footer.cookiesLink}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Compact Bottom Bar: Links on top on mobile, copyright below, centered and cleared from bottom bar */}
        <div className="border-t border-slate-200/80 dark:border-white/10 pt-4 flex flex-col-reverse sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-[11px] sm:text-[10.5px]">
          <div className="leading-relaxed text-slate-500 dark:text-slate-400">
            <div>&copy; 2026 <strong className="text-slate-800 dark:text-slate-200">WERB SOLUTIONS LLC</strong>.</div>
            <div className="text-[10px] text-slate-500/90 dark:text-slate-400/90 mt-0.5">{t.footer.copyright}</div>
          </div>
          <div className="flex items-center justify-center gap-3 font-medium">
            <Link href="/privacy" className="hover:text-[#c99818] dark:hover:text-[#e5d15e] transition-colors">{t.footer.privacyLink.split("&")[0].trim()}</Link>
            <span className="text-slate-400 dark:text-slate-600">•</span>
            <Link href="/terms" className="hover:text-[#c99818] dark:hover:text-[#e5d15e] transition-colors">{t.footer.termsLink.split("&")[0].trim()}</Link>
            <span className="text-slate-400 dark:text-slate-600">•</span>
            <button type="button" onClick={openCookiePreferences} className="hover:text-[#c99818] dark:hover:text-[#e5d15e] transition-colors cursor-pointer">
              Cookies
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
