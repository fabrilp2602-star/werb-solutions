"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

import { Locale, TRANSLATIONS, TranslationDictionary } from "@/data/i18n";

export interface CustomServiceItem {
  id: string;
  title: string;
  targetService: string;
  badge: string;
  desc: string;
  features: string[];
}

export interface SiteContentTexts {
  heroTagline: string;
  heroHeadline: string;
  heroSubtitle: string;
  heroBadge: string;
  phone: string;
  email: string;
  whatsappNumber: string;
  whatsappVisible: boolean;
  marqueeEnabled: boolean;
  marqueeText: string;
  licenseNumber: string;
  coiAmount: string;
  aboutTitle: string;
  aboutText: string;
  customServices?: CustomServiceItem[];
}

const DEFAULT_SERVICES: CustomServiceItem[] = [
  {
    id: "panel-upgrade",
    title: "200A Smart Electrical Panel Upgrade",
    targetService: "200A Smart Electrical Panel Upgrade",
    badge: "DOB NOW™ Certified",
    desc: "Full service entrance replacement, ConEd meter pan coordination, transit box installations and zero-interruption cutovers for pre-war buildings.",
    features: ["Cutover in Under 8 Hours", "Guaranteed DOB Inspection Sign-Off", "Smart Load-Shedding Integration"],
  },
  {
    id: "ev-charging",
    title: "Tesla & Universal Level-2 Chargers",
    targetService: "Level-2 EV Charger Dedicated Line",
    badge: "NYC Code Compliant",
    desc: "Complete Level-2 charger installations for private garages, co-ops, and multi-family buildings with dedicated 240V lines and permit handling.",
    features: ["Load Calculation Verification", "Concealed Conduit Routing", "Official NYC DOB Certificate"],
  },
  {
    id: "architectural-lighting",
    title: "Lutron Architectural Smart Lighting",
    targetService: "Lutron Architectural Smart Lighting",
    badge: "Luxury Penthouses",
    desc: "Precision magnetic track lighting, cove indirect channels, and Lutron HomeWorks keypads for luxury Manhattan residences.",
    features: ["Warm 3000K Flicker-Free Dimming", "Flush Plaster-in Mounting", "Mobile & Voice Automation"],
  },
  {
    id: "solar-battery",
    title: "Urban Rooftop Solar & Battery Storage",
    targetService: "Solar Rooftop & Battery Backup System",
    badge: "Local Law 97 Ready",
    desc: "Commercial and residential flat rooftop photovoltaic arrays with Enphase and Tesla Powerwall backup across Brooklyn & Queens.",
    features: ["NYC Solar Property Tax Abatement", "ConEd Interconnection Filing", "Carbon Penalty Mitigation"],
  },
];

const DEFAULT_TEXTS: SiteContentTexts = {
  heroTagline: "Class-A NYC DOB Master Electrician • 5 Boroughs",
  heroHeadline: "HIGH-VOLTAGE PRECISION & SECURITY",
  heroSubtitle: "Master electrical engineering, DOB NOW official filings, historic brownstone rewiring, and 24/7 emergency dispatch for condominiums, co-ops, and commercial infrastructure.",
  heroBadge: "Tribeca Loft Electrical Specification",
  phone: "+1 (929) 584-7647",
  email: "info@werbsolutions.com",
  whatsappNumber: "+19295847647",
  whatsappVisible: true,
  marqueeEnabled: true,
  marqueeText: "⚡ 24/7 EMERGENCY ELECTRICAL DISPATCH • NYC DOB LICENSED MASTER ELECTRICIAN • $2,000,000 COI FOR CONDOS & CO-OPS • LABOR LAW 240/241 COMPLIANT",
  licenseNumber: "NYC DOB #008472",
  coiAmount: "$2,000,000",
  aboutTitle: "Wired for Excellence Across New York City",
  aboutText: "With over 15 years serving Manhattan, Brooklyn and Queens, WERB Solutions delivers licensed master electrical expertise that passes rigorous building management boards and city inspections.",
  customServices: DEFAULT_SERVICES,
};

interface SiteContextType {
  texts: SiteContentTexts;
  updateTexts: (newTexts: Partial<SiteContentTexts>) => void;
  resetTexts: () => void;
  theme: "dark" | "light";
  toggleTheme: () => void;
  setTheme: (t: "dark" | "light") => void;
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: TranslationDictionary;
  isAuthenticated: boolean;
  login: (u: string, p: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const SiteContext = createContext<SiteContextType>({
  texts: DEFAULT_TEXTS,
  updateTexts: () => {},
  resetTexts: () => {},
  theme: "dark",
  toggleTheme: () => {},
  setTheme: () => {},
  locale: "en",
  setLocale: () => {},
  t: TRANSLATIONS.en,
  isAuthenticated: false,
  login: async () => false,
  logout: async () => {},
});

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [texts, setTexts] = useState<SiteContentTexts>(DEFAULT_TEXTS);
  const [theme, setThemeState] = useState<"dark" | "light">("light");
  const [locale, setLocaleState] = useState<Locale>("en");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const savedTexts = localStorage.getItem("werb_site_texts");
      if (savedTexts) {
        setTexts({ ...DEFAULT_TEXTS, ...JSON.parse(savedTexts) });
      }

      const savedTheme = localStorage.getItem("werb_theme") as "dark" | "light" | null;
      if (savedTheme === "light" || savedTheme === "dark") {
        setThemeState(savedTheme);
      } else {
        setThemeState("light");
      }

      // Locale resolution: default strictly to English ('en')
      // If URL explicitly sets ?lang=..., respect it.
      // If user previously chose a language in this browser session, respect it.
      // Otherwise, stay on 'en' to avoid unexpected foreign language initial load.
      const searchParams = new URLSearchParams(window.location.search);
      const urlLang = searchParams.get("lang") as Locale | null;
      const savedLocale = localStorage.getItem("werb_locale") as Locale | null;

      if (urlLang && (urlLang === "en" || urlLang === "es" || urlLang === "zh" || urlLang === "ru")) {
        setLocaleState(urlLang);
      } else if (savedLocale && (savedLocale === "en" || savedLocale === "es" || savedLocale === "zh" || savedLocale === "ru")) {
        setLocaleState(savedLocale);
      } else {
        setLocaleState("en");
      }

      fetch("/api/admin/session").then((res) => setIsAuthenticated(res.ok)).catch(() => setIsAuthenticated(false));
    } catch (e) {
      console.error(e);
    }
    setMounted(true);
  }, []);

  // Listen to cross-tab storage changes
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "werb_site_texts" && e.newValue) {
        try {
          setTexts({ ...DEFAULT_TEXTS, ...JSON.parse(e.newValue) });
        } catch {}
      }
      if (e.key === "werb_theme" && e.newValue) {
        const next = e.newValue as "dark" | "light";
        if (next === "dark" || next === "light") setThemeState(next);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const updateTexts = (newTexts: Partial<SiteContentTexts>) => {
    setTexts((prev) => {
      const updated = { ...prev, ...newTexts };
      try {
        localStorage.setItem("werb_site_texts", JSON.stringify(updated));
        // Dispatch storage event locally so same tab updates immediately
        window.dispatchEvent(new Event("storage"));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const resetTexts = () => {
    setTexts(DEFAULT_TEXTS);
    try {
      localStorage.removeItem("werb_site_texts");
      window.dispatchEvent(new Event("storage"));
    } catch (e) {
      console.error(e);
    }
  };

  const setTheme = (next: "dark" | "light") => {
    setThemeState(next);
    try {
      localStorage.setItem("werb_theme", next);
    } catch (e) {}
  };

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
  };

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }
  }, [theme, mounted]);

  const login = async (u: string, p: string): Promise<boolean> => {
    const res = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: u, password: p }) });
    const success = res.ok;
    setIsAuthenticated(success);
    return success;
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setIsAuthenticated(false);
  };

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem("werb_locale", next);
      const url = new URL(window.location.href);
      if (next === "en") {
        url.searchParams.delete("lang");
      } else {
        url.searchParams.set("lang", next);
      }
      window.history.replaceState({}, "", url.toString());
    } catch (e) {}
  };

  const t = TRANSLATIONS[locale] || TRANSLATIONS.en;

  return (
    <SiteContext.Provider value={{ texts, updateTexts, resetTexts, theme, toggleTheme, setTheme, locale, setLocale, t, isAuthenticated, login, logout }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  return useContext(SiteContext);
}

