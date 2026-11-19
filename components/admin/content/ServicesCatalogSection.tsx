"use client";

import React, { useState } from "react";
import { Zap, Plus, Trash2, Edit3, X, Check } from "lucide-react";
import { CustomServiceItem } from "@/context/SiteContext";

interface ServicesCatalogSectionProps {
  isDark: boolean;
  services: CustomServiceItem[];
  onServicesChange: (services: CustomServiceItem[]) => void;
}

export function ServicesCatalogSection({
  isDark,
  services,
  onServicesChange,
}: ServicesCatalogSectionProps) {
  const [editingServiceIndex, setEditingServiceIndex] = useState<number | null>(null);
  const [isAddServiceModalOpen, setIsAddServiceModalOpen] = useState(false);

  // New service draft state
  const [serviceDraft, setServiceDraft] = useState<CustomServiceItem>({
    id: "",
    title: "",
    targetService: "",
    badge: "NYC Code Compliant",
    desc: "",
    features: ["Cumplimiento con Código Eléctrico NYC", "Garantía de Certificado DOB"],
  });

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceDraft.title.trim()) return;

    const newId =
      serviceDraft.id.trim() ||
      serviceDraft.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const newService: CustomServiceItem = {
      ...serviceDraft,
      id: newId,
      targetService: serviceDraft.targetService || serviceDraft.title,
    };

    onServicesChange([...services, newService]);
    setIsAddServiceModalOpen(false);
    setServiceDraft({
      id: "",
      title: "",
      targetService: "",
      badge: "NYC Code Compliant",
      desc: "",
      features: ["Cumplimiento con Código Eléctrico NYC", "Garantía de Certificado DOB"],
    });
  };

  const handleDeleteService = (index: number) => {
    const srv = services[index];
    if (!confirm(`¿Eliminar el servicio "${srv.title}"?`)) return;
    onServicesChange(services.filter((_, idx) => idx !== index));
  };

  return (
    <div
      className={`rounded-2xl border p-6 sm:p-7 space-y-6 shadow-sm backdrop-blur-xl transition-colors ${
        isDark ? "border-white/10 bg-white/[0.02]" : "border-slate-200 bg-white"
      }`}
    >
      <div
        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4 ${
          isDark ? "border-white/10" : "border-slate-200"
        }`}
      >
        <div>
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-[#b79f53]" />
            <h2 className="text-xs font-bold uppercase tracking-wider font-mono">
              Catálogo de Servicios & Especialidades ({services.length})
            </h2>
          </div>
          <p
            className={`text-xs mt-1 ${
              isDark ? "text-slate-400" : "text-stone-500"
            }`}
          >
            Edita, agrega o elimina servicios visibles en la portada y el asistente de cotización.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddServiceModalOpen(true)}
          className="gold-gradient-btn inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#1a1608] shadow-md cursor-pointer active:scale-95 transition-transform shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>Agregar Servicio</span>
        </button>
      </div>

      {/* Services List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((srv, idx) => {
          const isEditing = editingServiceIndex === idx;

          if (isEditing) {
            return (
              <div
                key={srv.id || idx}
                className={`rounded-2xl border p-5 space-y-3 ${
                  isDark
                    ? "border-[#b79f53]/50 bg-black/60"
                    : "border-[#b79f53]/50 bg-stone-50"
                }`}
              >
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-xs font-bold text-[#b79f53]">
                    Editar Servicio #{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => setEditingServiceIndex(null)}
                    className="text-slate-400 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                    Título del Servicio
                  </label>
                  <input
                    type="text"
                    value={srv.title}
                    onChange={(e) => {
                      const copy = { ...srv, title: e.target.value };
                      const updated = [...services];
                      updated[idx] = copy;
                      onServicesChange(updated);
                    }}
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#b79f53]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                    Badge Superior
                  </label>
                  <input
                    type="text"
                    value={srv.badge}
                    onChange={(e) => {
                      const copy = { ...srv, badge: e.target.value };
                      const updated = [...services];
                      updated[idx] = copy;
                      onServicesChange(updated);
                    }}
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#b79f53]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                    Descripción Detallada
                  </label>
                  <textarea
                    rows={2}
                    value={srv.desc}
                    onChange={(e) => {
                      const copy = { ...srv, desc: e.target.value };
                      const updated = [...services];
                      updated[idx] = copy;
                      onServicesChange(updated);
                    }}
                    className="w-full rounded-xl border border-white/10 bg-black/40 p-2.5 text-xs text-white focus:outline-none focus:border-[#b79f53]"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setEditingServiceIndex(null)}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#b79f53] text-[#1a1608] hover:bg-[#c9b165]"
                  >
                    Listo
                  </button>
                </div>
              </div>
            );
          }

          return (
            <div
              key={srv.id || idx}
              className={`rounded-2xl border p-5 flex flex-col justify-between transition-all hover:border-[#b79f53]/40 ${
                isDark ? "border-white/10 bg-black/20" : "border-slate-200 bg-slate-50/50"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-md bg-[#b79f53]/15 text-[#b79f53] dark:text-[#ece8a6] px-2 py-0.5 text-[10px] font-mono font-bold uppercase">
                    {srv.badge}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setEditingServiceIndex(idx)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer"
                      title="Editar servicio"
                    >
                      <Edit3 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteService(idx)}
                      className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 cursor-pointer"
                      title="Eliminar servicio"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="text-sm font-bold mt-2 font-headline">{srv.title}</h3>
                <p
                  className={`text-xs mt-1.5 leading-relaxed ${
                    isDark ? "text-slate-400" : "text-stone-600"
                  }`}
                >
                  {srv.desc}
                </p>
              </div>

              {srv.features && srv.features.length > 0 && (
                <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap gap-1.5">
                  {srv.features.map((feat, fidx) => (
                    <span
                      key={fidx}
                      className="text-[10px] rounded-md bg-white/5 px-2 py-0.5 font-mono text-slate-300 flex items-center gap-1"
                    >
                      <Check className="h-2.5 w-2.5 text-emerald-500" />
                      {feat}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal: Agregar Servicio */}
      {isAddServiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div
            className={`w-full max-w-lg rounded-2xl border p-6 shadow-2xl transition-all ${
              isDark ? "border-white/10 bg-[#090e17]" : "border-slate-200 bg-white"
            }`}
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-[#b79f53]" />
                <h3 className="text-sm font-bold font-headline">
                  Agregar Nueva Especialidad
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddServiceModalOpen(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleAddService} className="space-y-4 pt-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider mb-1 text-slate-400">
                  Título del Servicio
                </label>
                <input
                  type="text"
                  required
                  placeholder="ej. Instalación de Transformadores Trifásicos"
                  value={serviceDraft.title}
                  onChange={(e) =>
                    setServiceDraft({ ...serviceDraft, title: e.target.value })
                  }
                  className={`w-full px-3 py-2 rounded-xl text-xs border focus:outline-none focus:border-[#b79f53] ${
                    isDark
                      ? "border-white/10 bg-black/40 text-white"
                      : "border-slate-200 bg-slate-50 text-slate-900 focus:bg-white"
                  }`}
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider mb-1 text-slate-400">
                  Badge / Categoría Superior
                </label>
                <input
                  type="text"
                  placeholder="ej. Certificado DOB NOW™"
                  value={serviceDraft.badge}
                  onChange={(e) =>
                    setServiceDraft({ ...serviceDraft, badge: e.target.value })
                  }
                  className={`w-full px-3 py-2 rounded-xl text-xs border focus:outline-none focus:border-[#b79f53] ${
                    isDark
                      ? "border-white/10 bg-black/40 text-white"
                      : "border-slate-200 bg-slate-50 text-slate-900 focus:bg-white"
                  }`}
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider mb-1 text-slate-400">
                  Descripción Técnica
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Descripción detallada para propietarios y administradores..."
                  value={serviceDraft.desc}
                  onChange={(e) =>
                    setServiceDraft({ ...serviceDraft, desc: e.target.value })
                  }
                  className={`w-full p-2.5 rounded-xl text-xs border focus:outline-none focus:border-[#b79f53] ${
                    isDark
                      ? "border-white/10 bg-black/40 text-white"
                      : "border-slate-200 bg-slate-50 text-slate-900 focus:bg-white"
                  }`}
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsAddServiceModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="gold-gradient-btn px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-[#1a1608] shadow-md cursor-pointer active:scale-95 transition-transform"
                >
                  Guardar Servicio
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
