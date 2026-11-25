"use client";

import React from "react";
import Image from "next/image";
import { LogOut, LucideIcon } from "lucide-react";
import { useSite } from "@/context/SiteContext";

export interface NavItemConfig {
  id: string;
  label: string;
  icon: LucideIcon;
  count: string | number;
}

interface AdminSidebarProps {
  isDark: boolean;
  activeTab: string;
  onTabChange: (tabId: any) => void;
  navItems: NavItemConfig[];
  logout: () => void;
}

export function AdminSidebar({
  isDark,
  activeTab,
  onTabChange,
  navItems,
  logout,
}: AdminSidebarProps) {
  const { adminProfile } = useSite();
  const displayName = adminProfile?.name || "Administrador";
  const displayEmail = adminProfile?.email || "";
  const displayRole = adminProfile?.role || "super";
  return (
    <aside
      className={`hidden md:flex w-64 shrink-0 h-screen flex-col border-r transition-colors z-20 overflow-hidden ${
        isDark ? "border-white/10 bg-[#070b12]" : "border-stone-200 bg-white shadow-xs"
      }`}
    >
      {/* Header Izquierdo: Altura h-16, con border-b */}
      <div
        className={`h-16 shrink-0 border-b px-4 flex items-center justify-between ${
          isDark ? "border-white/10" : "border-stone-200"
        }`}
      >
        <div className="flex items-center gap-3 w-full">
          <div className="relative h-9 w-9 rounded-xl overflow-hidden bg-black/40 border border-white/10 flex items-center justify-center shrink-0 p-1 shadow-sm">
            <Image
              src="/media/brand_logo_symbol_transparent.png"
              alt="WERB Solutions"
              width={32}
              height={32}
              className="object-contain"
            />
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

      {/* Perfil del usuario administrador: DEBAJO del header izquierdo */}
      <div
        className={`p-3.5 border-b shrink-0 ${
          isDark ? "border-white/10 bg-white/[0.015]" : "border-stone-200 bg-stone-50/60"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#ece8a6] to-[#b79f53] flex items-center justify-center text-[#1a1608] font-black text-xs shrink-0 shadow-sm">
              PG
            </div>
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-[#070b12]" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <span
                className={`text-xs font-bold truncate ${
                  isDark ? "text-white" : "text-stone-900"
                }`}
              >
                {displayName}
              </span>
              <span className="text-[9px] font-mono font-bold uppercase text-[#b79f53] bg-[#b79f53]/10 px-1.5 py-0.5 rounded">
                {displayRole}
              </span>
            </div>
            <span
              className={`text-[11px] font-mono truncate block mt-0.5 ${
                isDark ? "text-slate-400" : "text-stone-500"
              }`}
            >
              {displayEmail}
            </span>
          </div>
        </div>
      </div>

      {/* Botones de navegación: ÚNICA sección del sidebar con desplazamiento (overflow-y-auto) */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        <div
          className={`text-[10px] uppercase font-bold tracking-wider px-3 py-2 ${
            isDark ? "text-slate-500" : "text-stone-400"
          }`}
        >
          Módulos HQ
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const active = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onTabChange(item.id)}
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

      {/* Barra inferior del sidebar: Altura h-16, con border-t, SOLO el botón de Cerrar Sesión */}
      <div
        className={`h-16 shrink-0 border-t flex items-center px-3 ${
          isDark ? "border-white/10" : "border-stone-200"
        }`}
      >
        <button
          type="button"
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 hover:text-rose-700 dark:hover:text-rose-300 transition-colors active:scale-95 cursor-pointer"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
}
