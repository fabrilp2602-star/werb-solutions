"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

import { Locale, TRANSLATIONS, TranslationDictionary } from "@/data/i18n";

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
}

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
  login: (u: string, p: string) => boolean;
  logout: () => void;
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
  login: () => false,
  logout: () => {},
});

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [texts, setTexts] = useState<SiteContentTexts>(DEFAULT_TEXTS);
  const [theme, setThemeState] = useState<"dark" | "light">("dark");
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
        setThemeState("dark");
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

      const authState = sessionStorage.getItem("werb_admin_auth");
      if (authState === "true") setIsAuthenticated(true);
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

  const login = (u: string, p: string): boolean => {
    const trimmedUser = u.trim().toLowerCase();
    // Authorized master accounts or quick demo pass for onboarding video
    if (
      (trimmedUser === "pablofgarciaf@gmail.com" || trimmedUser === "admin@werbsolutions.com") &&
      (p === "Pruebas123" || p === "werb2026" || p === "admin123" || p === "")
    ) {
      setIsAuthenticated(true);
      try {
        sessionStorage.setItem("werb_admin_auth", "true");
        sessionStorage.setItem("werb_admin_user", trimmedUser);
      } catch (e) {}
      return true;
    }
    // Also allow direct entry if email is entered for review video
    if (trimmedUser.includes("@") && (p === "Pruebas123" || p === "werb2026" || p === "")) {
      setIsAuthenticated(true);
      try {
        sessionStorage.setItem("werb_admin_auth", "true");
        sessionStorage.setItem("werb_admin_user", trimmedUser);
      } catch (e) {}
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem("werb_admin_auth");
    } catch (e) {}
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

