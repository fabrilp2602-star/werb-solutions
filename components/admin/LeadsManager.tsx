'use client';

import React, { useState, useMemo } from 'react';
import { 
  AdminLeadItem, 
  NYCLeadStatus 
} from '@/types/admin';
import {
  Search,
  Filter,
  Download,
  Phone,
  MapPin,
  Clock,
  AlertTriangle,
  Building2,
  CheckCircle2,
  ChevronDown,
  RefreshCw,
  ExternalLink,
  ShieldAlert,
  Flame,
  FileSpreadsheet
} from 'lucide-react';

interface LeadsManagerProps {
  initialLeads?: AdminLeadItem[];
}

const BOROUGHS = ['All', 'Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island'] as const;
const URGENCIES = ['All', 'Emergency (Immediate)', 'Within 48h', 'Scheduled Renovation'] as const;
const STATUSES = ['All', 'pending', 'contacted', 'dispatched', 'closed'] as const;

export default function LeadsManager({ initialLeads = [] }: LeadsManagerProps) {
  const [leads, setLeads] = useState<AdminLeadItem[]>(initialLeads);
  const [loading, setLoading] = useState(false);
  const [selectedBorough, setSelectedBorough] = useState<string>('All');
  const [selectedUrgency, setSelectedUrgency] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusUpdatingId, setStatusUpdatingId] = useState<string | null>(null);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/leads');
      const data = await res.json();
      if (data.success && Array.isArray(data.leads)) {
        setLeads(data.leads);
      }
    } catch (err) {
      console.error('Error fetching leads:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: NYCLeadStatus) => {
    setStatusUpdatingId(id);
    try {
      const res = await fetch('/api/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
      }
    } catch (err) {
      console.error('Failed to update lead status:', err);
    } finally {
      setStatusUpdatingId(null);
    }
  };

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      // Borough matching
      const matchesBorough = selectedBorough === 'All' || 
        lead.borough.toLowerCase() === selectedBorough.toLowerCase() ||
        (selectedBorough === 'Bronx' && lead.borough.toLowerCase().includes('bronx')) ||
        (selectedBorough === 'Staten Island' && lead.borough.toLowerCase().includes('si'));

      // Urgency matching
      const matchesUrgency = selectedUrgency === 'All' || lead.urgency === selectedUrgency;

      // Status matching
      const matchesStatus = selectedStatus === 'All' || lead.status === selectedStatus;

      // Search matching (Name, Address, Service, Phone, DOB number)
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        lead.fullName.toLowerCase().includes(query) ||
        lead.propertyAddress.toLowerCase().includes(query) ||
        lead.service.toLowerCase().includes(query) ||
        lead.phone.includes(query) ||
        (lead.dobJobNumber && lead.dobJobNumber.toLowerCase().includes(query));

      return matchesBorough && matchesUrgency && matchesStatus && matchesSearch;
    });
  }, [leads, selectedBorough, selectedUrgency, selectedStatus, searchQuery]);

  // Export filtered leads to CSV
  const exportToCSV = () => {
    if (filteredLeads.length === 0) return;

    const headers = [
      'Lead ID',
      'Date Created',
      'Borough',
      'Property Type',
      'Service Required',
      'Urgency',
      'Full Name',
      'Phone',
      'Property Address',
      'DOB NOW Job #',
      'Status',
      'Notes'
    ];

    const rows = filteredLeads.map(l => [
      `"${l.id}"`,
      `"${new Date(l.createdAt).toLocaleString('en-US', { timeZone: 'America/New_York' })}"`,
      `"${l.borough}"`,
      `"${l.propertyType}"`,
      `"${l.service.replace(/"/g, '""')}"`,
      `"${l.urgency}"`,
      `"${l.fullName.replace(/"/g, '""')}"`,
      `"${l.phone}"`,
      `"${l.propertyAddress.replace(/"/g, '""')}"`,
      `"${l.dobJobNumber || 'N/A'}"`,
      `"${l.status.toUpperCase()}"`,
      `"${(l.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `WERB_Solutions_Leads_NYC_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Metric Cards Top Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#0b0f17]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-amber-500/40 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all pointer-events-none" />
          <span className="text-xs uppercase tracking-wider font-mono text-slate-400">Total Leads</span>
          <div className="text-3xl font-black text-white mt-1">{leads.length}</div>
          <span className="text-[11px] text-amber-400 font-medium mt-1 inline-flex items-center gap-1">
            NYC 5-Boroughs Intake
          </span>
        </div>

        <div className="bg-[#0b0f17]/80 backdrop-blur-xl border border-rose-500/20 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-rose-500/40 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider font-mono text-slate-400">24/7 Emergencies</span>
            <Flame className="w-4 h-4 text-rose-500 animate-pulse" />
          </div>
          <div className="text-3xl font-black text-rose-400 mt-1">
            {leads.filter(l => l.urgency === 'Emergency (Immediate)').length}
          </div>
          <span className="text-[11px] text-rose-300 font-medium mt-1 inline-block">
            Requiring Rapid Dispatch
          </span>
        </div>

        <div className="bg-[#0b0f17]/80 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-cyan-500/40 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider font-mono text-slate-400">DOB Violations</span>
            <ShieldAlert className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-black text-cyan-300 mt-1">
            {leads.filter(l => l.dobJobNumber || l.service.toLowerCase().includes('dob')).length}
          </div>
          <span className="text-[11px] text-cyan-400 font-medium mt-1 inline-block">
            Expediting Required
          </span>
        </div>

        <div className="bg-[#0b0f17]/80 backdrop-blur-xl border border-emerald-500/20 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-emerald-500/40 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          <span className="text-xs uppercase tracking-wider font-mono text-slate-400">Active Pipeline</span>
          <div className="text-3xl font-black text-emerald-400 mt-1">
            {leads.filter(l => l.status === 'dispatched' || l.status === 'contacted').length}
          </div>
          <span className="text-[11px] text-emerald-400/80 font-medium mt-1 inline-block">
            In Progress / On Site
          </span>
        </div>
      </div>

      {/* Control Bar: Filters, Search, Export */}
      <div className="bg-[#0b0f17]/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              placeholder="Search by client name, address, borough, phone or DOB job #..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/40 border border-white/10 focus:border-amber-500/60 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 self-end lg:self-auto">
            <button
              onClick={fetchLeads}
              disabled={loading}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-200 active:scale-95 transition-all disabled:opacity-50"
              title="Refresh leads list"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-amber-400' : ''}`} />
              <span>Refresh</span>
            </button>

            <button
              onClick={exportToCSV}
              disabled={filteredLeads.length === 0}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black text-xs font-black uppercase tracking-wider shadow-amber-glow active:scale-95 transition-all disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV ({filteredLeads.length})</span>
            </button>
          </div>
        </div>

        {/* Filter Badges & Selects */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-white/5">
          {/* Borough Filter */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-amber-400" />
              NYC Borough
            </label>
            <div className="relative">
              <select
                value={selectedBorough}
                onChange={(e) => setSelectedBorough(e.target.value)}
                className="w-full appearance-none bg-black/50 border border-white/10 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-200 focus:outline-none focus:border-amber-500 transition-all cursor-pointer"
              >
                {BOROUGHS.map((b) => (
                  <option key={b} value={b} className="bg-slate-900 text-white">{b}</option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
            </div>
          </div>

          {/* Urgency Filter */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-cyan-400" />
              Response Urgency
            </label>
            <div className="relative">
              <select
                value={selectedUrgency}
                onChange={(e) => setSelectedUrgency(e.target.value)}
                className="w-full appearance-none bg-black/50 border border-white/10 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-200 focus:outline-none focus:border-amber-500 transition-all cursor-pointer"
              >
                {URGENCIES.map((u) => (
                  <option key={u} value={u} className="bg-slate-900 text-white">{u}</option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Filter className="w-3 h-3 text-emerald-400" />
              Intake Status
            </label>
            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full appearance-none bg-black/50 border border-white/10 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-200 focus:outline-none focus:border-amber-500 transition-all cursor-pointer"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s} className="bg-slate-900 text-white">
                    {s === 'All' ? 'All Statuses' : s.toUpperCase()}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Leads List / Cards */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between text-xs text-slate-400 px-1 font-mono">
          <span>Showing {filteredLeads.length} of {leads.length} records</span>
          {searchQuery && <span>Filtered by &ldquo;{searchQuery}&rdquo;</span>}
        </div>

        {filteredLeads.length === 0 ? (
          <div className="bg-[#0b0f17]/60 border border-white/10 rounded-2xl p-12 text-center">
            <Building2 className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-200">No matching NYC leads found</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Try adjusting your borough, urgency filters, or clear your search term to see more results.
            </p>
          </div>
        ) : (
          filteredLeads.map((lead) => {
            const isEmergency = lead.urgency === 'Emergency (Immediate)';
            return (
              <div 
                key={lead.id}
                className={`bg-[#0b0f17]/85 backdrop-blur-xl border rounded-2xl p-5 transition-all shadow-md hover:shadow-xl ${
                  isEmergency 
                    ? 'border-rose-500/40 bg-gradient-to-r from-[#0b0f17] via-rose-950/10 to-[#0b0f17]' 
                    : 'border-white/10 hover:border-amber-500/30'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left Column: Client & Address Details */}
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                        lead.status === 'dispatched' ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' :
                        lead.status === 'contacted' ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30' :
                        lead.status === 'closed' ? 'bg-slate-800 text-slate-400 border-slate-700' :
                        'bg-amber-500/10 text-amber-300 border-amber-500/30'
                      }`}>
                        {lead.status.toUpperCase()}
                      </span>

                      {isEmergency && (
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse flex items-center gap-1">
                          <Flame className="w-3 h-3 text-rose-400" />
                          24/7 Immediate Emergency
                        </span>
                      )}

                      <span className="text-[11px] font-mono font-semibold text-slate-400 bg-white/5 px-2 py-0.5 rounded">
                        {lead.borough} &bull; {lead.propertyType}
                      </span>

                      <span className="text-[10px] font-mono text-slate-400 ml-auto lg:ml-0">
                        {new Date(lead.createdAt).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>

                    {/* Client Name & Service */}
                    <div className="pt-1">
                      <div className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                        {lead.fullName}
                        <span className="text-xs font-normal text-amber-400 font-mono">
                          ({lead.service})
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300 mt-1">
                        <span className="flex items-center gap-1.5 text-slate-200">
                          <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                          {lead.propertyAddress}
                        </span>

                        <a 
                          href={`tel:${lead.phone.replace(/[^0-9+]/g, '')}`} 
                          className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 transition-colors font-mono font-medium"
                        >
                          <Phone className="w-3 h-3" />
                          {lead.phone}
                        </a>

                        {lead.dobJobNumber && (
                          <span className="flex items-center gap-1 text-cyan-300 font-mono text-[11px] bg-cyan-950/40 border border-cyan-800/40 px-2 py-0.5 rounded">
                            <ShieldAlert className="w-3 h-3" />
                            DOB NOW Job #{lead.dobJobNumber}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Notes */}
                    {lead.notes && (
                      <div className="text-xs text-slate-400 bg-black/40 border border-white/5 rounded-xl p-2.5 mt-2">
                        <span className="text-slate-400 font-mono text-[10px] uppercase block mb-0.5">Project Scope / Notes:</span>
                        {lead.notes}
                      </div>
                    )}
                  </div>

                  {/* Right Column: Status Actions */}
                  <div className="flex flex-col sm:flex-row lg:flex-col items-end justify-center gap-2 pt-2 lg:pt-0 border-t lg:border-t-0 border-white/5">
                    <div className="text-[10px] font-mono uppercase text-slate-400 text-right">
                      Change State
                    </div>
                    <div className="flex items-center gap-1.5">
                      {(['pending', 'contacted', 'dispatched', 'closed'] as const).map((st) => (
                        <button
                          key={st}
                          onClick={() => handleUpdateStatus(lead.id, st)}
                          disabled={statusUpdatingId === lead.id || lead.status === st}
                          className={`text-[10px] font-mono uppercase font-bold px-2.5 py-1.5 rounded-lg border transition-all ${
                            lead.status === st
                              ? 'bg-amber-500 text-black border-amber-400 shadow-amber-glow'
                              : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          {st === 'dispatched' ? 'Dispatch' : st}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
