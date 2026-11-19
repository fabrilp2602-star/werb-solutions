"use client";

import React from "react";
import { Save } from "lucide-react";

interface AdminBottomBarProps {
  isDark: boolean;
  saveSuccess: boolean;
  onReset: () => void;
  onSave: () => void;
}

export function AdminBottomBar({
  isDark,
  saveSuccess,
  onReset,
  onSave,
}: AdminBottomBarProps) {
  return (
    <div
      className={`fixed bottom-0 right-0 left-0 md:left-64 h-16 border-t backdrop-blur-xl z-30 flex items-center justify-between px-4 sm:px-8 transition-colors ${
        isDark
          ? "border-white/10 bg-[#070b12]/95 text-white"
          : "border-stone-200 bg-white/95 text-stone-900 shadow-md"
      }`}
    >
      <div className="flex items-center gap-2 text-xs">
        <span
          className={`h-2 w-2 rounded-full ${
            saveSuccess ? "bg-emerald-400" : "bg-[#b79f53]"
          } animate-pulse`}
        />
        <span className="font-mono text-[11px] text-slate-400">
          {saveSuccess
            ? "✓ Cambios aplicados y sincronizados en vivo"
            : "Control CMS • Cambios listos para publicar"}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onReset}
          className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all active:scale-95 cursor-pointer ${
            isDark
              ? "border-white/10 text-slate-300 hover:bg-white/5"
              : "border-stone-200 text-stone-700 hover:bg-stone-100"
          }`}
        >
          Restaurar Valores
        </button>

        <button
          type="button"
          onClick={onSave}
          className="gold-gradient-btn inline-flex items-center gap-2 rounded-xl px-5 py-2 text-xs font-bold uppercase tracking-wider text-[#1a1608] shadow-md cursor-pointer active:scale-95 transition-transform"
        >
          <Save className="h-4 w-4" />
          <span>Guardar Cambios</span>
        </button>
      </div>
    </div>
  );
}
