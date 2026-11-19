"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  FileEdit,
  Inbox,
  SlidersHorizontal,
  LogOut,
  ExternalLink,
  Globe,
  Sun,
  Moon,
  Search,
  Menu,
  X,
  ShieldCheck,
} from "lucide-react";
import { useSite } from "@/context/SiteContext";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { AdminContentTab } from "@/components/admin/AdminContentTab";
import { AdminSwitchesTab } from "@/components/admin/AdminSwitchesTab";
import { AdminLeadsTab, LeadItem } from "@/components/admin/AdminLeadsTab";

type AdminTab = "content" | "leads" | "settings";

export default function AdminPage() {
  const {
    texts,
    updateTexts,
    resetTexts,
    theme,
    toggleTheme,
    setTheme,
    isAuthenticated,
    login,
    logout,
  } = useSite();

  const [activeTab, setActiveTab] = useState<AdminTab>("content");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Leads state
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [leadSearch, setLeadSearch] = useState("");

  const isDark = theme === "dark";

  const loadLeads = useCallback(async () => {
    setLoadingLeads(true);
    try {
      const res = await fetch("/api/leads");
      const data = await res.json();
      if (data.success && Array.isArray(data.leads)) {
        setLeads(data.leads);
      }
    } catch (e) {
      console.error("Error loading leads:", e);
    } finally {
      setLoadingLeads(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadLeads();
    }
  }, [isAuthenticated, loadLeads]);

  const updateLeadStatus = async (
    id: string,
    newStatus: LeadItem["status"]
  ) => {
    try {
      await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      setLeads((prev) =>
        prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
      );
    } catch (e) {
      console.error("Failed to update status:", e);
    }
  };

  // IF NOT AUTHENTICATED: SHOW APPLE-CLASS DUAL-THEME LOGIN
  if (!isAuthenticated) {
    return (
      <AdminLoginForm
        isDark={isDark}
        toggleTheme={toggleTheme}
        onLoginSuccess={loadLeads}
        login={login}
      />
    );
  }

  const navItems = [
    {
      id: "content" as const,
      label: "Content Editor",
      icon: FileEdit,
      count: "Live",
    },
    {
      id: "leads" as const,
      label: "Inbound NYC Leads",
      icon: Inbox,
      count: leads.length,
    },
    {
      id: "settings" as const,
      label: "Switches & Toggles",
      icon: SlidersHorizontal,
      count: "2",
    },
  ];

  // Header Titles and Descriptions
  const headerMeta: Record<
    AdminTab,
    { title: string; desc: string }
  > = {
    content: {
      title: "NYC Content & Live Copywriting Editor",
      desc: "Live Website Copy & Editorial CMS",
    },
    leads: {
      title: "NYC Inbound Lead Pipeline & CRM",
      desc: "Pipeline de captación y gestión de prospectos eléctricos DOB NOW",
    },
    settings: {
      title: "Global Switches & Toggles",
      desc: "Interruptores globales de visibilidad y marquesina en tiempo real",
    },
  };

  return (
    <div
      className={`h-screen w-full flex font-sans transition-colors duration-200 overflow-hidden ${
        isDark ? "bg-[#050810] text-slate-100" : "bg-[#FAF8F5]/90 text-slate-900"
      }`}
    >
      {/* ─────────────────────────────────────────────────────────────
          1. HEADER IZQUIERDO + BARRA LATERAL (ASIDE)
      ───────────────────────────────────────────────────────────── */}
      <aside
        className={`hidden md:flex w-64 shrink-0 h-full flex-col border-r transition-colors z-20 ${
          isDark
            ? "border-white/10 bg-[#070b12]"
            : "border-stone-200 bg-white shadow-xs"
        }`}
      >
        {/* Header Izquierdo: Altura h-16, con border-b y border-r */}
        <div
          className={`h-16 shrink-0 border-b px-4 flex items-center justify-between ${
            isDark ? "border-white/10" : "border-stone-200"
          }`}
        >
          <div className="flex items-center gap-3 w-full">
            {/* Logo WS con gradiente dorado */}
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#ece8a6] to-[#b79f53] flex items-center justify-center text-[#1a1608] font-black text-xs shrink-0 shadow-sm">
              WS
            </div>
            <div className="flex flex-col leading-none min-w-0">
              <div className="flex items-center gap-1.5">
                <span
                  className={`text-xs font-bold tracking-tight uppercase truncate font-headline ${
                    isDark ? "text-white" : "text-stone-950"
                  }`}
                >
                  WERB Solutions
                </span>
                <span className="px-1.5 py-0.5 rounded-full text-[9px] font-extrabold bg-[#b79f53]/20 text-[#b79f53] dark:text-[#ece8a6] shrink-0">
                  HQ
                </span>
              </div>
              <span
                className={`text-[10px] font-medium mt-1 truncate ${
                  isDark ? "text-slate-400" : "text-stone-500"
                }`}
              >
                Control Command
              </span>
            </div>
          </div>
        </div>

        {/* Botones de navegación de la barra lateral */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          <div
            className={`text-[10px] uppercase font-bold tracking-wider px-3 py-2 ${
              isDark ? "text-slate-500" : "text-stone-400"
            }`}
          >
            Workspaces
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveTab(item.id);
                  if (item.id === "leads") loadLeads();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all active:scale-95 cursor-pointer ${
                  active
                    ? isDark
                      ? "bg-[#b79f53]/20 text-[#ece8a6] border border-[#b79f53]/40 shadow-sm font-bold"
                      : "bg-[#e2c97d]/25 text-[#735408] border border-[#b79f53]/30 shadow-xs font-bold"
                    : isDark
                    ? "text-slate-400 hover:text-white hover:bg-white/5"
                    : "text-stone-600 hover:text-stone-950 hover:bg-stone-100"
                }`}
              >
                <div className="flex items-center gap-3 truncate">
                  <Icon
                    className={`h-4 w-4 shrink-0 ${
                      active ? "text-[#b79f53]" : "text-slate-400"
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${
                    active
                      ? isDark
                        ? "bg-[#b79f53]/30 text-white"
                        : "bg-[#b79f53]/20 text-[#735408]"
                      : isDark
                      ? "bg-white/5 text-slate-400"
                      : "bg-stone-100 text-stone-500"
                  }`}
                >
                  {item.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Abajo del sidebar: Credenciales + Botón de Cerrar Sesión con hover rojo */}
        <div
          className={`p-3 border-t space-y-2 shrink-0 ${
            isDark ? "border-white/10" : "border-stone-200"
          }`}
        >
          {/* Botón de Cerrar Sesión con icono de LogOut y hover rojo */}
          <button
            type="button"
            onClick={logout}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-2xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 hover:text-rose-700 dark:hover:text-rose-300 transition-colors active:scale-95 cursor-pointer"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            <span>Cerrar Sesión</span>
          </button>

          {/* Tarjeta de Credenciales */}
          <div
            className={`rounded-xl p-2.5 border text-[10px] font-mono ${
              isDark
                ? "border-white/10 bg-white/[0.02] text-slate-400"
                : "border-stone-200 bg-stone-50 text-stone-600"
            }`}
          >
            <div className="flex items-center gap-1.5 text-[#b79f53] font-bold uppercase tracking-wider">
              <ShieldCheck className="h-3 w-3" />
              <span>NYC DOB Licensed</span>
            </div>
            <div className="mt-1 truncate">Lic: {texts.licenseNumber}</div>
            <div className="truncate">COI: {texts.coiAmount} Verified</div>
          </div>
        </div>
      </aside>

      {/* ─────────────────────────────────────────────────────────────
          2. HEADER DERECHO + CONTENEDOR PRINCIPAL
      ───────────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        {/* Header Derecho: Altura h-16, con border-b, alineado con Header Izquierdo */}
        <header
          className={`h-16 shrink-0 border-b flex items-center justify-between px-3 sm:px-6 gap-2 z-30 transition-colors ${
            isDark
              ? "border-white/10 bg-[#090e17]/95 text-white"
              : "border-stone-200 bg-white/95 text-stone-900 shadow-xs"
          } backdrop-blur-xl`}
        >
          {/* Izquierda: Menú móvil + Título del módulo activo + Badge 'Live' animado + Descripción */}
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
              {mobileSidebarOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-bold tracking-tight truncate leading-tight font-headline">
                  {headerMeta[activeTab].title}
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
                {headerMeta[activeTab].desc}
              </p>
            </div>
          </div>

          {/* Derecha: Buscador (si leads) + Sun/Moon exacto GM + Ver Sitio + admin pill + LogOut */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Buscador de texto en leads si está activo ese tab */}
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

            {/* Botón circular de alternar tema Claro/Oscuro (Sun / Moon) exacto al de Modulares GM */}
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

            {/* Enlace a 'Ver Sitio' (Live Site) con icono ExternalLink */}
            <Link
              href="/"
              target="_blank"
              className={`hidden sm:inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all active:scale-95 shadow-xs ${
                isDark
                  ? "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
                  : "border-stone-300 bg-white text-stone-700 hover:bg-stone-50 hover:text-stone-900"
              }`}
            >
              <Globe className="h-3.5 w-3.5 text-[#b79f53]" />
              <span className="text-[11px]">Ver Sitio</span>
              <ExternalLink className="h-3 w-3 text-stone-400" />
            </Link>

            {/* Pill con usuario admin ('admin@werbsolutions.com') y punto verde */}
            <div
              className={`hidden xl:flex items-center gap-2 rounded-full border px-3 py-1 text-xs shadow-xs ${
                isDark
                  ? "border-white/10 bg-white/5 text-slate-300"
                  : "border-stone-200 bg-stone-100 text-stone-700"
              }`}
            >
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-[11px]">
                admin@werbsolutions.com
              </span>
            </div>

            {/* Botón de LogOut */}
            <button
              type="button"
              onClick={logout}
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 transition-colors active:scale-95 cursor-pointer"
              title="Cerrar Sesión"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline text-[11px]">Log Out</span>
            </button>
          </div>
        </header>

        {/* Drawer móvil cuando mobileSidebarOpen está activo */}
        {mobileSidebarOpen && (
          <div
            className={`md:hidden border-b p-4 space-y-2 z-40 backdrop-blur-2xl shadow-xl transition-all ${
              isDark ? "border-white/10 bg-[#090e17]/98" : "border-stone-200 bg-white/98"
            }`}
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileSidebarOpen(false);
                    if (item.id === "leads") loadLeads();
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold ${
                    active
                      ? "gold-gradient-btn text-[#1a1608]"
                      : isDark
                      ? "text-slate-300 bg-white/5"
                      : "text-slate-700 bg-stone-100"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </div>
                  <span className="font-mono text-[10px]">{item.count}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Contenedor Principal con Scroll Independiente */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-5xl mx-auto space-y-6">
            {activeTab === "content" && (
              <AdminContentTab
                isDark={isDark}
                texts={texts}
                updateTexts={updateTexts}
                resetTexts={resetTexts}
              />
            )}

            {activeTab === "leads" && (
              <AdminLeadsTab
                isDark={isDark}
                leads={leads}
                loadingLeads={loadingLeads}
                leadSearch={leadSearch}
                setLeadSearch={setLeadSearch}
                loadLeads={loadLeads}
                updateLeadStatus={updateLeadStatus}
              />
            )}

            {activeTab === "settings" && (
              <AdminSwitchesTab
                isDark={isDark}
                texts={texts}
                updateTexts={updateTexts}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
