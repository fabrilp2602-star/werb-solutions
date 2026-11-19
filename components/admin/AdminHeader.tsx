"use client";

import React, { useState } from "react";
import { Sun, Moon, Search, Menu, X, Globe, UserPlus } from "lucide-react";
import { useSite } from "@/context/SiteContext";
import { Locale } from "@/data/locales/types";

interface AdminHeaderProps {
  isDark: boolean;
  activeTab: string;
  headerMeta: Record<string, { title: string; desc: string }>;
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: (open: boolean) => void;
  leadSearch: string;
  setLeadSearch: (s: string) => void;
  toggleTheme: () => void;
  onOpenCreateUser?: () => void;
}

const LANGUAGES: { code: Locale; label: string; flag: string }[] = [
  { code: "en", label: "EN", flag: "🇺🇸" },
  { code: "es", label: "ES", flag: "🇪🇸" },
  { code: "ru", label: "RU", flag: "🇷🇺" },
  { code: "zh", label: "ZH", flag: "🇨🇳" },
];

export function AdminHeader({
  isDark,
  activeTab,
  headerMeta,
  mobileSidebarOpen,
  setMobileSidebarOpen,
  leadSearch,
  setLeadSearch,
  toggleTheme,
  onOpenCreateUser,
}: AdminHeaderProps) {
  const { locale, setLocale } = useSite();
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const current = headerMeta[activeTab] || {
    title: "WERB Admin",
    desc: "Control HQ",
  };

  return (
    <header
      className={`h-16 shrink-0 border-b flex items-center justify-between px-3 sm:px-6 gap-2 z-20 transition-colors ${
        isDark
          ? "border-white/10 bg-[#090e17]/95 text-white"
          : "border-stone-200 bg-white/95 text-stone-900 shadow-xs"
      } backdrop-blur-xl`}
    >
      {/* Izquierda: Menú móvil + Título del módulo activo + Badge 'Live' + Descripción */}
      <div className="flex items-center gap-2.5 min-w-0">
        <button
          type="button"
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className={`md:hidden flex h-9 w-9 items-center justify-center rounded-xl border shrink-0 ${
            isDark
              ? "border-white/10 text-white hover:bg-white/5"
              : "border-stone-200 text-stone-800 hover:bg-stone-100"
          }`}
          aria-label="Abrir menú"
        >
          {mobileSidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-sm sm:text-base font-bold tracking-tight truncate leading-tight font-headline">
              {current.title}
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono font-bold uppercase text-emerald-500 shrink-0">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live
            </span>
          </div>
          <p
            className={`text-[11px] truncate leading-tight mt-0.5 max-w-xl ${
              isDark ? "text-slate-400" : "text-stone-500"
            }`}
          >
            {current.desc}
          </p>
        </div>
      </div>

      {/* Derecha: Buscador (leads) + Botón Contextual (Crear Usuario) + Idioma + Sun/Moon */}
      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
        {/* Buscador de texto en leads */}
        {activeTab === "leads" && (
          <div className="relative hidden md:block w-44 lg:w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-stone-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar leads..."
              value={leadSearch}
              onChange={(e) => setLeadSearch(e.target.value)}
              className={`w-full h-9 pl-9 pr-3 rounded-xl text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-[#b79f53]/40 ${
                isDark
                  ? "border border-white/10 bg-black/40 text-white placeholder-slate-500"
                  : "border border-stone-200 bg-stone-100 text-stone-900 placeholder-stone-400 focus:bg-white"
              }`}
            />
          </div>
        )}

        {/* Botón contextual cuando activeTab === 'users' */}
        {activeTab === "users" && onOpenCreateUser && (
          <button
            type="button"
            onClick={onOpenCreateUser}
            className="gold-gradient-btn inline-flex items-center gap-1.5 rounded-xl px-3 sm:px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#1a1608] shadow-sm cursor-pointer active:scale-95 transition-transform"
          >
            <UserPlus className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Crear Usuario</span>
          </button>
        )}

        {/* Selector de Idioma (Junto al botón de Claro/Oscuro) */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
            className={`h-9 px-2.5 sm:px-3 rounded-full border transition-all active:scale-95 shadow-xs flex items-center gap-1.5 text-xs font-bold font-mono cursor-pointer ${
              isDark
                ? "border-stone-700 bg-stone-900/80 hover:bg-stone-800 text-[#ece8a6]"
                : "border-stone-300 bg-white hover:bg-stone-100 text-stone-800"
            }`}
            title="Seleccionar idioma del sistema"
            aria-label="Seleccionar idioma"
          >
            <Globe className="h-3.5 w-3.5 text-[#b79f53]" />
            <span>{locale.toUpperCase()}</span>
          </button>

          {langDropdownOpen && (
            <div
              className={`absolute right-0 mt-2 w-32 rounded-2xl border p-1.5 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150 ${
                isDark
                  ? "border-white/15 bg-black/95 backdrop-blur-2xl"
                  : "border-stone-200 bg-white shadow-xl"
              }`}
            >
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => {
                    setLocale(lang.code);
                    setLangDropdownOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                    locale === lang.code
                      ? "bg-[#b79f53]/20 text-[#b79f53] dark:text-[#ece8a6] font-bold"
                      : isDark
                      ? "text-slate-300 hover:bg-white/10 hover:text-white"
                      : "text-stone-700 hover:bg-stone-100 hover:text-stone-900"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </span>
                  {locale === lang.code && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[#b79f53]" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Alternar tema Claro/Oscuro (Sun / Moon) */}
        <button
          type="button"
          onClick={toggleTheme}
          className={`h-9 w-9 rounded-full border transition-all active:scale-95 shadow-xs shrink-0 flex items-center justify-center cursor-pointer ${
            isDark
              ? "border-stone-700 bg-stone-900/80 hover:bg-stone-800 text-amber-400"
              : "border-stone-300 bg-white hover:bg-stone-100 text-slate-700"
          }`}
          title="Alternar Modo Claro / Oscuro"
          aria-label="Alternar modo claro u oscuro"
        >
          {isDark ? (
            <Sun className="h-4 w-4 text-amber-400" />
          ) : (
            <Moon className="h-4 w-4 text-slate-700" />
          )}
        </button>
      </div>
    </header>
  );
}
