"use client";

import React from "react";
import { Sun, Moon, Search, Menu, X } from "lucide-react";

interface AdminHeaderProps {
  isDark: boolean;
  activeTab: string;
  headerMeta: Record<string, { title: string; desc: string }>;
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: (open: boolean) => void;
  leadSearch: string;
  setLeadSearch: (s: string) => void;
  toggleTheme: () => void;
}

export function AdminHeader({
  isDark,
  activeTab,
  headerMeta,
  mobileSidebarOpen,
  setMobileSidebarOpen,
  leadSearch,
  setLeadSearch,
  toggleTheme,
}: AdminHeaderProps) {
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
        {/* Trigger Móvil */}
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

      {/* Derecha: Buscador (si leads) + Sun/Moon */}
      <div className="flex items-center gap-2 shrink-0">
        {activeTab === "leads" && (
          <div className="relative hidden md:block w-48 lg:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-stone-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar en leads..."
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
