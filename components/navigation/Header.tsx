"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Sun, 
  Moon, 
  PhoneCall, 
  Menu, 
  X,
  Sparkles,
  Globe
} from "lucide-react";
import { useSite } from "@/context/SiteContext";
import { Locale } from "@/data/i18n";

export default function Header() {
  const { texts, theme, toggleTheme, locale, setLocale, t } = useSite();
  const isDark = theme === "dark";
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const languages: { code: Locale; label: string; flag: string }[] = [
    { code: "en", label: "English", flag: "🇺🇸" },
    { code: "es", label: "Español", flag: "🇪🇸" },
    { code: "zh", label: "中文", flag: "🇨🇳" },
    { code: "ru", label: "Русский", flag: "🇷🇺" },
  ];

  return (
    <header className={`fixed inset-x-0 z-40 transition-all duration-300 ${
      texts.marqueeEnabled 
        ? (scrolled ? "top-0" : "top-8") 
        : "top-0"
    } ${
      scrolled 
        ? "bg-black/75 dark:bg-[#050810]/85 backdrop-blur-2xl border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] py-2.5" 
        : "bg-transparent border-b border-transparent py-3 sm:py-4"
    }`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand: Single clean logo with complete lettering */}
        <Link href="/" className="flex items-center group py-0.5" aria-label="WERB Solutions NYC">
          <div className="relative h-10 w-44 sm:w-48 transition-transform duration-200 group-hover:scale-[1.02]">
            <Image
              src="/media/logo_navbar.webp"
              alt="WERB Solutions"
              fill
              sizes="200px"
              className="object-contain object-left drop-shadow-md"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold tracking-wide">
          <Link href="/services" className="text-white/85 hover:text-white transition-colors">
            {t.nav.services}
          </Link>
          <Link href="/#boroughs" className="text-white/85 hover:text-white transition-colors">
            {t.nav.boroughs}
          </Link>
          <Link href="/#compliance" className="text-white/85 hover:text-white transition-colors">
            {t.nav.compliance}
          </Link>
          <Link href="/#about" className="text-white/85 hover:text-white transition-colors">
            {t.nav.about}
          </Link>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* NYC 4-Language Selector Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              aria-label="Select Language"
              className="flex h-9 items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 sm:px-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/20 transition-all active:scale-95 shadow-sm backdrop-blur-md cursor-pointer"
            >
              <Globe className="h-3.5 w-3.5 text-[#e2c97d]" />
              <span className="font-mono text-[11px]">{locale.toUpperCase()}</span>
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-36 rounded-2xl border border-white/15 bg-black/90 p-1.5 backdrop-blur-2xl shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => {
                      setLocale(lang.code);
                      setLangMenuOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition-colors cursor-pointer ${
                      locale === lang.code
                        ? "bg-[#e2c97d]/20 text-[#ece8a6] font-bold"
                        : "text-slate-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </span>
                    {locale === lang.code && <span className="h-1.5 w-1.5 rounded-full bg-[#e2c97d]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20 transition-all active:scale-90 shadow-sm backdrop-blur-md cursor-pointer"
          >
            {isDark ? <Sun className="h-4 w-4 text-[#ece8a6]" /> : <Moon className="h-4 w-4 text-white" />}
          </button>

          {/* Phone Dispatch Direct Hotline */}
          <a
            href={`tel:${texts.phone.replace(/\D/g, "")}`}
            className="hidden md:inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-white/20 hover:border-[#e2c97d]/50 transition-all active:scale-95 shadow-sm backdrop-blur-md"
          >
            <PhoneCall className="h-3.5 w-3.5 text-[#ece8a6]" />
            <span className="font-mono">{texts.phone}</span>
          </a>

          {/* Quote Button (Desktop only with authentic brushed gold gradient) */}
          <Link
            href="/#nyc-lead-wizard"
            className="gold-gradient-btn hidden sm:inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-transform active:scale-95 shadow-md"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>{t.nav.quote}</span>
          </Link>

          {/* Mobile Hamburger Trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20 transition-all active:scale-90 shadow-sm backdrop-blur-md cursor-pointer"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-white/10 bg-slate-50/98 dark:bg-[#050810]/98 backdrop-blur-2xl px-6 py-6 space-y-5 animate-in slide-in-from-top-3 duration-200">
          <div className="flex flex-col gap-3 font-semibold text-sm">
            <Link 
              href="/services" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between text-slate-800 dark:text-slate-200 py-2 border-b border-slate-200 dark:border-white/[0.06]"
            >
              <span>All Engineered Services</span>
              <span className="text-[11px] font-mono text-[#b79f53] dark:text-[#ece8a6]">Full Catalog →</span>
            </Link>
            <Link 
              href="/#boroughs" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-800 dark:text-slate-200 py-2 border-b border-slate-200 dark:border-white/[0.06]"
            >
              Manhattan, Brooklyn & Queens Boroughs
            </Link>
            <Link 
              href="/#compliance" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-800 dark:text-slate-200 py-2 border-b border-slate-200 dark:border-white/[0.06]"
            >
              DOB NOW™ & Insurance Filings
            </Link>
            <Link 
              href="/#about" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-800 dark:text-slate-200 py-2 border-b border-slate-200 dark:border-white/[0.06]"
            >
              About WERB Solutions
            </Link>
            <Link 
              href="/privacy" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-500 dark:text-slate-400 py-1.5 text-xs"
            >
              Privacy Policy & Terms
            </Link>
          </div>

          <div className="pt-2">
            <Link
              href="/#nyc-lead-wizard"
              onClick={() => setMobileMenuOpen(false)}
              className="gold-gradient-btn flex items-center justify-center gap-2 w-full rounded-2xl py-3 text-xs font-bold uppercase tracking-wider shadow-lg active:scale-95 transition-transform"
            >
              <Sparkles className="h-4 w-4" />
              <span>Request Project Intake</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
