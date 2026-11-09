'use client';

import React, { useState } from 'react';
import { ServiceItem } from '@/types/admin';
import {
  Zap,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  ShieldCheck,
  Clock,
  Search,
  Sparkles
} from 'lucide-react';

const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'srv_1',
    title: '200A / 400A Heavy-Up Service Panel Upgrade',
    category: 'Electrical & Panels',
    powerRating: '200A - 400A Single/3-Phase',
    dobPermitRequired: true,
    active: true,
    turnaroundTime: '24h Expedited / 48h Final',
    description: 'Full service entrance replacement, ConEd meter pan coordination, transit box installations and zero-interruption cutovers for pre-war buildings.',
    image: '/media/service_panel_verification_desktop.webp',
  },
  {
    id: 'srv_2',
    title: 'NYC DOB NOW Violation Removal & Expediters',
    category: 'DOB Compliance',
    powerRating: 'All Class 1, 2, 3 Electrical Infractions',
    dobPermitRequired: true,
    active: true,
    turnaroundTime: '48h Filing Guarantee',
    description: 'Certified Master Electrician sealing, emergency inspection remedies, ECB hearing dismissals, and Certificate of Electrical Inspection (Letter of Completion).',
    image: '/media/service_safety_briefing_desktop.webp',
  },
  {
    id: 'srv_3',
    title: 'Historic Brownstone & Townhouse Complete Rewiring',
    category: 'Electrical & Panels',
    powerRating: '100A to 200A High-Capacity',
    dobPermitRequired: true,
    active: true,
    turnaroundTime: '3 - 5 Business Days',
    description: 'Non-destructive snake conduit routing through plaster moldings, removal of hazardous knob-and-tube, and architectural concealed outlets.',
    image: '/media/hero_loft_blueprints_desktop.webp',
  },
  {
    id: 'srv_4',
    title: 'Architectural Lutron HomeWorks & Ketra Lighting',
    category: 'Lighting Architecture',
    powerRating: 'Low Voltage & 120V Smart Dimmers',
    dobPermitRequired: false,
    active: true,
    turnaroundTime: 'Custom Phased Implementation',
    description: 'Luxury penthouse lighting automation, dynamic color-temperature tunable illumination, and whole-residence scene keypad integration.',
    image: '/media/service_lighting_penthouse_mobile.webp',
  },
  {
    id: 'srv_5',
    title: 'NYC Rooftop Solar PV & BESS Storage Systems',
    category: 'Solar & BESS',
    powerRating: '10kW - 150kW Tier-1 Arrays',
    dobPermitRequired: true,
    active: true,
    turnaroundTime: '7 Days DOB/FDNY Clearance',
    description: 'Local Law 92/94 compliance for flat roofs, FDNY setback compliance, battery energy storage systems, and NY-Sun solar tax credit filing.',
    image: '/media/service_solar_brooklyn_rooftop_mobile.webp',
  },
  {
    id: 'srv_6',
    title: 'Level 2 & DC Fast EV Charging Infrastructure',
    category: 'Commercial Heavy Power',
    powerRating: '48A - 80A Dedicated Circuits',
    dobPermitRequired: true,
    active: true,
    turnaroundTime: '24h - 48h Installation',
    description: 'Tesla Wall Connector, ChargePoint, and commercial fleet load management systems for underground condo garages and commercial parking lots.',
    image: '/media/service_ev_wallbox_detail_mobile.webp',
  }
];

export default function ServicesManager() {
  const [services, setServices] = useState<ServiceItem[]>(INITIAL_SERVICES);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const categories = ['All', 'Electrical & Panels', 'DOB Compliance', 'Solar & BESS', 'Lighting Architecture', 'Commercial Heavy Power'];

  const filteredServices = services.filter(s => {
    const matchesCat = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesSearch = s.title.toLowerCase().includes(search.toLowerCase()) ||
                          s.description.toLowerCase().includes(search.toLowerCase()) ||
                          s.powerRating.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggleActive = (id: string) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, active: !s.active } : s));
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this service from the public catalog?')) {
      setServices(prev => prev.filter(s => s.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Control */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0b0f17]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-lg">
        <div>
          <h2 className="text-xl font-black uppercase text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            NYC Electrical & Solar Catalog
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage high-voltage services, DOB NOW permit declarations, and power ratings visible across NYC.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingService({
              id: `srv_${Date.now()}`,
              title: '',
              category: 'Electrical & Panels',
              powerRating: '200A 120/240V',
              dobPermitRequired: true,
              active: true,
              turnaroundTime: '24h - 48h',
              description: '',
              image: '/media/service_panel_verification_desktop.webp',
            });
            setIsAddModalOpen(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black text-xs font-black uppercase tracking-wider shadow-amber-glow active:scale-95 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Service</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-[#0b0f17]/60 border border-white/10 rounded-xl p-3.5">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text"
            placeholder="Search catalog by service name, voltage, or scope..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === c
                  ? 'bg-amber-500 text-black font-bold shadow-amber-glow'
                  : 'bg-white/5 text-slate-300 border border-white/5 hover:bg-white/10'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredServices.map(srv => (
          <div 
            key={srv.id}
            className={`bg-[#0b0f17]/85 backdrop-blur-xl border rounded-2xl p-5 shadow-lg flex flex-col justify-between transition-all hover:border-amber-500/40 group ${
              srv.active ? 'border-white/10' : 'border-rose-500/20 opacity-60'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  {srv.category}
                </span>

                <button
                  onClick={() => toggleActive(srv.id)}
                  className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded-full border transition-all ${
                    srv.active 
                      ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' 
                      : 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                  }`}
                >
                  {srv.active ? 'Public' : 'Inactive'}
                </button>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                {srv.title}
              </h3>

              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mt-2 font-mono">
                <span className="bg-white/5 px-2 py-0.5 rounded text-slate-300 border border-white/5">
                  ⚡ {srv.powerRating}
                </span>
                <span className="bg-white/5 px-2 py-0.5 rounded text-cyan-300 border border-white/5">
                  ⏱️ {srv.turnaroundTime}
                </span>
              </div>

              <p className="text-xs text-slate-400 mt-3 line-clamp-3 leading-relaxed">
                {srv.description}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
                {srv.dobPermitRequired ? (
                  <span className="text-amber-400 flex items-center gap-1">
                    <FileCheck className="w-3.5 h-3.5" />
                    DOB NOW Permit Required
                  </span>
                ) : (
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Direct Sign-Off
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    setEditingService(srv);
                    setIsAddModalOpen(true);
                  }}
                  className="p-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all"
                  title="Edit service details"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(srv.id)}
                  className="p-1.5 rounded-lg border border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/20 text-rose-400 hover:text-rose-200 transition-all"
                  title="Delete service"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Add Modal */}
      {isAddModalOpen && editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#0b0f17] border border-white/20 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-black uppercase text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              {services.some(s => s.id === editingService.id) ? 'Edit Service' : 'Add New Service to Catalog'}
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-mono uppercase">Service Title</label>
                <input
                  type="text"
                  value={editingService.title}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  placeholder="e.g. 400A Commercial Switchgear Upgrade"
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-mono uppercase">Category</label>
                  <select
                    value={editingService.category}
                    onChange={(e) => setEditingService({ ...editingService, category: e.target.value as any })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  >
                    {categories.filter(c => c !== 'All').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-mono uppercase">Power Rating</label>
                  <input
                    type="text"
                    value={editingService.powerRating}
                    onChange={(e) => setEditingService({ ...editingService, powerRating: e.target.value })}
                    placeholder="e.g. 200A / 3-Phase"
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-mono uppercase">Turnaround Time</label>
                <input
                  type="text"
                  value={editingService.turnaroundTime}
                  onChange={(e) => setEditingService({ ...editingService, turnaroundTime: e.target.value })}
                  placeholder="e.g. 24h Emergency Response"
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-mono uppercase">Description</label>
                <textarea
                  rows={3}
                  value={editingService.description}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  placeholder="Service description for NYC property managers..."
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="permitReq"
                  checked={editingService.dobPermitRequired}
                  onChange={(e) => setEditingService({ ...editingService, dobPermitRequired: e.target.checked })}
                  className="rounded border-white/20 bg-black text-amber-500 focus:ring-amber-500"
                />
                <label htmlFor="permitReq" className="text-slate-300 font-mono">Requires NYC DOB NOW Filing & Permit</label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-slate-300 hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!editingService.title) return alert('Title is required');
                  setServices(prev => {
                    const exists = prev.some(s => s.id === editingService.id);
                    if (exists) {
                      return prev.map(s => s.id === editingService.id ? editingService : s);
                    }
                    return [editingService, ...prev];
                  });
                  setIsAddModalOpen(false);
                }}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-black uppercase tracking-wider shadow-amber-glow"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
