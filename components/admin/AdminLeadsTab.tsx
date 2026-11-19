"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Inbox,
  Search,
  RefreshCw,
  Phone,
  X,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Filter,
} from "lucide-react";

export interface LeadItem {
  id: string;
  createdAt: string;
  borough: string;
  propertyType: string;
  service: string;
  urgency: string;
  fullName: string;
  phone: string;
  propertyAddress: string;
  dobJobNumber?: string;
  status: "pending" | "contacted" | "dispatched" | "closed";
}

interface AdminLeadsTabProps {
  isDark: boolean;
  leads: LeadItem[];
  loadingLeads: boolean;
  leadSearch: string;
  setLeadSearch: (s: string) => void;
  loadLeads: () => Promise<void>;
  updateLeadStatus: (id: string, newStatus: LeadItem["status"]) => Promise<void>;
}

export function AdminLeadsTab({
  isDark,
  leads,
  loadingLeads,
  leadSearch,
  setLeadSearch,
  loadLeads,
  updateLeadStatus,
}: AdminLeadsTabProps) {
  const [leadStatusFilter, setLeadStatusFilter] = useState<
    "all" | "pending" | "contacted" | "dispatched" | "closed"
  >("all");
  const [selectedLeadDetail, setSelectedLeadDetail] = useState<LeadItem | null>(
    null
  );

  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      l.fullName.toLowerCase().includes(leadSearch.toLowerCase()) ||
      l.phone.includes(leadSearch) ||
      l.borough.toLowerCase().includes(leadSearch.toLowerCase()) ||
      l.service.toLowerCase().includes(leadSearch.toLowerCase()) ||
      l.propertyAddress.toLowerCase().includes(leadSearch.toLowerCase());
    const matchesStatus =
      leadStatusFilter === "all" || l.status === leadStatusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      {/* ─────────────────────────────────────────────────────────────
          1. EMPTY STATE CUANDO leads.length === 0
      ───────────────────────────────────────────────────────────── */}
      {leads.length === 0 && !loadingLeads ? (
        <div
          className={`rounded-3xl border p-12 sm:p-16 text-center shadow-sm backdrop-blur-xl transition-all ${
            isDark
              ? "border-white/10 bg-[#090e17]/80 text-white"
              : "border-slate-200/90 bg-white/95 text-slate-900"
          }`}
        >
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-[#ece8a6]/20 to-[#b79f53]/30 border border-[#b79f53]/40 text-[#b79f53] mb-6 shadow-lg shadow-[#b79f53]/10">
            <Inbox className="h-10 w-10 stroke-[1.5]" />
          </div>

          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wide font-sans mb-2">
            Bandeja de Leads Limpia
          </h2>

          <p
            className={`max-w-md mx-auto text-xs sm:text-sm leading-relaxed mb-8 ${
              isDark ? "text-slate-400" : "text-slate-600"
            }`}
          >
            Las solicitudes reales ingresadas desde el cotizador NYC Lead Wizard
            aparecerán aquí en tiempo real.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => loadLeads()}
              className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold uppercase tracking-wider gold-gradient-btn text-[#1a1608] shadow-md cursor-pointer active:scale-95 transition-transform"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Actualizar Bandeja</span>
            </button>

            <Link
              href="/#quote"
              target="_blank"
              className={`inline-flex items-center gap-2 rounded-xl border px-5 py-2.5 text-xs font-semibold transition-all active:scale-95 cursor-pointer ${
                isDark
                  ? "border-white/15 bg-white/5 text-slate-200 hover:bg-white/10 hover:text-white"
                  : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Sparkles className="h-3.5 w-3.5 text-[#b79f53]" />
              <span>Abrir NYC Lead Wizard</span>
              <ExternalLink className="h-3 w-3 text-slate-400" />
            </Link>
          </div>
        </div>
      ) : (
        /* ─────────────────────────────────────────────────────────────
            2. LEADS TOOLBAR & TABLA CUANDO HAY REGISTROS O ESTÁ CARGANDO
        ───────────────────────────────────────────────────────────── */
        <>
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-sm sm:hidden">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Buscar por nombre, barrio, teléfono..."
                value={leadSearch}
                onChange={(e) => setLeadSearch(e.target.value)}
                className={`w-full rounded-xl border pl-9 pr-4 py-2 text-xs transition-colors focus:outline-none focus:border-[#b79f53] ${
                  isDark
                    ? "border-white/10 bg-black/40 text-white placeholder-slate-500"
                    : "border-slate-200 bg-white text-slate-900 placeholder-slate-400"
                }`}
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Status Filter Buttons */}
              <div
                className={`flex rounded-xl border p-1 text-xs ${
                  isDark ? "border-white/10 bg-black/30" : "border-slate-200 bg-white"
                }`}
              >
                {(
                  [
                    "all",
                    "pending",
                    "contacted",
                    "dispatched",
                    "closed",
                  ] as const
                ).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setLeadStatusFilter(st)}
                    className={`px-2.5 py-1 rounded-lg font-bold capitalize transition-all cursor-pointer text-[11px] ${
                      leadStatusFilter === st
                        ? "gold-gradient-btn text-[#1a1608] shadow-sm"
                        : isDark
                        ? "text-slate-400 hover:text-white"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={loadLeads}
                className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition-all cursor-pointer active:scale-95 ${
                  isDark
                    ? "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-sm"
                }`}
                title="Recargar leads"
              >
                <RefreshCw
                  className={`h-3.5 w-3.5 ${loadingLeads ? "animate-spin" : ""}`}
                />
                <span className="hidden sm:inline">Refrescar</span>
              </button>
            </div>
          </div>

          {loadingLeads ? (
            <div className="py-20 text-center text-xs text-slate-500">
              Accediendo al pipeline de leads NYC...
            </div>
          ) : filteredLeads.length === 0 ? (
            <div
              className={`rounded-2xl border p-12 text-center text-xs ${
                isDark
                  ? "border-white/10 bg-white/[0.02] text-slate-400"
                  : "border-slate-200 bg-white text-slate-500 shadow-sm"
              }`}
            >
              No hay solicitudes que coincidan con la búsqueda &quot;{leadSearch}
              &quot; o el filtro seleccionado.
            </div>
          ) : (
            <div
              className={`overflow-x-auto rounded-2xl border ${
                isDark
                  ? "border-white/10 bg-white/[0.02]"
                  : "border-slate-200 bg-white shadow-sm"
              }`}
            >
              <table className="w-full text-left text-xs">
                <thead
                  className={`border-b text-[11px] font-mono uppercase ${
                    isDark
                      ? "border-white/10 bg-white/5 text-slate-400"
                      : "border-slate-200 bg-slate-50 text-slate-600"
                  }`}
                >
                  <tr>
                    <th className="p-3.5">Fecha</th>
                    <th className="p-3.5">Cliente & Teléfono</th>
                    <th className="p-3.5">Ubicación & Borough</th>
                    <th className="p-3.5">Alcance Seleccionado</th>
                    <th className="p-3.5">Estado</th>
                    <th className="p-3.5 text-right">Acción Dispatch</th>
                  </tr>
                </thead>
                <tbody
                  className={`divide-y ${
                    isDark ? "divide-white/[0.06]" : "divide-slate-100"
                  }`}
                >
                  {filteredLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      onClick={() => setSelectedLeadDetail(lead)}
                      className={`transition-colors cursor-pointer ${
                        isDark ? "hover:bg-white/5" : "hover:bg-slate-50"
                      }`}
                    >
                      <td className="p-3.5 font-mono text-slate-400 whitespace-nowrap">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-3.5">
                        <div className="font-bold">{lead.fullName}</div>
                        <a
                          href={`tel:${lead.phone}`}
                          onClick={(e) => e.stopPropagation()}
                          className="text-[#b79f53] hover:underline font-mono"
                        >
                          {lead.phone}
                        </a>
                      </td>
                      <td className="p-3.5">
                        <div className="font-bold">{lead.borough}</div>
                        <div
                          className={`text-[11px] truncate max-w-xs ${
                            isDark ? "text-slate-400" : "text-slate-500"
                          }`}
                        >
                          {lead.propertyAddress}
                        </div>
                      </td>
                      <td className="p-3.5">
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          {lead.service}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <span
                          className={`inline-block rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase ${
                            lead.status === "dispatched"
                              ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                              : lead.status === "contacted"
                              ? "bg-sky-500/10 text-sky-500 border border-sky-500/20"
                              : lead.status === "closed"
                              ? "bg-slate-500/10 text-slate-400 border border-slate-500/20"
                              : "bg-[#b79f53]/15 text-[#b79f53] border border-[#b79f53]/30"
                          }`}
                        >
                          {lead.status}
                        </span>
                      </td>
                      <td
                        className="p-3.5 text-right"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <select
                          value={lead.status}
                          onChange={(e) =>
                            updateLeadStatus(
                              lead.id,
                              e.target.value as LeadItem["status"]
                            )
                          }
                          className={`rounded-lg border px-2 py-1 text-[11px] focus:outline-none focus:border-[#b79f53] cursor-pointer ${
                            isDark
                              ? "border-white/20 bg-black text-slate-200"
                              : "border-slate-200 bg-white text-slate-800"
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="contacted">Contacted</option>
                          <option value="dispatched">Dispatched</option>
                          <option value="closed">Closed</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* ─────────────────────────────────────────────────────────────
          3. MODAL: DETALLE DEL LEAD
      ───────────────────────────────────────────────────────────── */}
      {selectedLeadDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div
            className={`w-full max-w-lg rounded-3xl border p-6 sm:p-8 space-y-4 shadow-2xl ${
              isDark
                ? "border-white/15 bg-[#090e17] text-white"
                : "border-slate-200 bg-white text-slate-900"
            }`}
          >
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm uppercase">
                  Inbound Lead Specification
                </span>
                <span className="text-[10px] font-mono text-[#b79f53] bg-[#b79f53]/10 px-2 py-0.5 rounded">
                  {selectedLeadDetail.status.toUpperCase()}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedLeadDetail(null)}
                className="h-7 w-7 rounded-full flex items-center justify-center text-slate-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Cliente
                  </span>
                  <span className="font-bold">{selectedLeadDetail.fullName}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Teléfono
                  </span>
                  <a
                    href={`tel:${selectedLeadDetail.phone}`}
                    className="font-mono text-[#b79f53] underline"
                  >
                    {selectedLeadDetail.phone}
                  </a>
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Alcance Eléctrico
                </span>
                <span className="font-bold text-sm text-[#b79f53]">
                  {selectedLeadDetail.service}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Borough & Tipo de Propiedad
                  </span>
                  <span>
                    {selectedLeadDetail.borough} • {selectedLeadDetail.propertyType}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Urgencia
                  </span>
                  <span className="capitalize">{selectedLeadDetail.urgency}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Dirección en NYC
                </span>
                <span className="font-mono">
                  {selectedLeadDetail.propertyAddress}
                </span>
              </div>

              {selectedLeadDetail.dobJobNumber && (
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    DOB Job # / Notas
                  </span>
                  <span className="font-mono text-[#b79f53]">
                    {selectedLeadDetail.dobJobNumber}
                  </span>
                </div>
              )}
            </div>

            <div className="pt-4 border-t flex justify-end gap-3">
              <a
                href={`tel:${selectedLeadDetail.phone}`}
                className="gold-gradient-btn inline-flex items-center gap-1.5 rounded-xl px-5 py-2 text-xs font-bold uppercase tracking-wider text-[#1a1608]"
              >
                <Phone className="h-3.5 w-3.5" /> Llamar Cliente
              </a>
              <button
                type="button"
                onClick={() => setSelectedLeadDetail(null)}
                className={`rounded-xl border px-4 py-2 text-xs font-semibold ${
                  isDark
                    ? "border-white/10 text-slate-300"
                    : "border-slate-200 text-slate-700"
                }`}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
