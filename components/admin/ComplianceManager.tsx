'use client';

import React, { useState } from 'react';
import { ComplianceRecord } from '@/types/admin';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Building,
  RefreshCw,
  Plus,
  ExternalLink,
  Lock,
  DownloadCloud
} from 'lucide-react';

const INITIAL_COMPLIANCE: ComplianceRecord[] = [
  {
    id: 'comp_1',
    title: 'NYC Master Electrician License (Special Master #008124)',
    authority: 'NYC DOB',
    documentNumber: 'LIC-MEL-008124-NYC',
    holder: 'WERB Solutions Inc. (Lead Master)',
    expirationDate: '2028-12-31',
    status: 'active',
    coverageLimit: 'DOB Full Bonding Authority',
    dobNowStatus: 'Approved / Fully Permitted'
  },
  {
    id: 'comp_2',
    title: '$2,000,000 Commercial General Liability & Umbrella Insurance',
    authority: 'NYS Insurance Dept',
    documentNumber: 'POL-CGL-993821-X',
    holder: 'Travelers Property & Casualty of America',
    expirationDate: '2027-06-30',
    status: 'active',
    coverageLimit: '$2,000,000 per occurrence / $5,000,000 aggregate',
    dobNowStatus: 'Approved / Fully Permitted'
  },
  {
    id: 'comp_3',
    title: 'NYS Workers Compensation & Disability Benefits (SIF/DB-120.1)',
    authority: 'NYS Insurance Dept',
    documentNumber: 'WCB-NY-448201',
    holder: 'NYS Insurance Fund (NYSIF)',
    expirationDate: '2027-04-15',
    status: 'active',
    coverageLimit: 'Statutory NYC Coverage',
    dobNowStatus: 'Approved / Fully Permitted'
  },
  {
    id: 'comp_4',
    title: 'DOB NOW: Build Electrical Filing Authentication (#EXP-0294)',
    authority: 'NYC DOB',
    documentNumber: 'DOB-NOW-AUT-0294',
    holder: 'Electronic Seal & Signature Verified',
    expirationDate: '2027-01-01',
    status: 'active',
    coverageLimit: 'All 5 NYC Boroughs',
    dobNowStatus: 'Approved / Fully Permitted'
  },
  {
    id: 'comp_5',
    title: 'Con Edison Master Electrician Trade Ally & Work Authorization',
    authority: 'Con Edison',
    documentNumber: 'CONED-TA-88219',
    holder: 'WERB Solutions High Voltage Team',
    expirationDate: '2026-11-30',
    status: 'pending_renewal',
    coverageLimit: '480V 3-Phase Network Services',
    dobNowStatus: 'Under Plan Examination'
  },
  {
    id: 'comp_6',
    title: 'FDNY Certificate of Fitness for BESS & Energy Storage (G-60 / C-92)',
    authority: 'FDNY',
    documentNumber: 'FDNY-COF-81920',
    holder: 'Certified Site Supervisors',
    expirationDate: '2027-09-10',
    status: 'active',
    coverageLimit: 'Rooftop Solar & Commercial Lithium Batteries',
    dobNowStatus: 'Sign-Off Ready'
  }
];

export default function ComplianceManager() {
  const [records, setRecords] = useState<ComplianceRecord[]>(INITIAL_COMPLIANCE);
  const [authorityFilter, setAuthorityFilter] = useState<string>('All');

  const authorities = ['All', 'NYC DOB', 'Con Edison', 'FDNY', 'NYS Insurance Dept'];

  const filtered = records.filter(r => authorityFilter === 'All' || r.authority === authorityFilter);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-[#0b0f17]/85 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                NYC Department of Buildings & Insurance Trust Verification
              </span>
            </div>
            <h2 className="text-2xl font-black uppercase tracking-tight text-white mt-1 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-amber-400" />
              NYC DOB Licenses & $2M COI Compliance Hub
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Official records submitted to Condo & Co-op boards across Manhattan and Brooklyn. Real-time credential tracking for DOB NOW e-filings and Con Edison high-capacity cutovers.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => alert('Certificate of Insurance (COI) PDF package generated for NYC Condo/Co-op Board submission.')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 active:scale-95 transition-all"
            >
              <DownloadCloud className="w-4 h-4 text-cyan-400" />
              <span>Download Board COI Pack</span>
            </button>
            <button
              onClick={() => {
                const newRec: ComplianceRecord = {
                  id: `comp_${Date.now()}`,
                  title: 'New NYC Board COI / DOB Permit',
                  authority: 'NYC DOB',
                  documentNumber: 'PENDING-FILING',
                  holder: 'WERB Solutions Inc.',
                  expirationDate: '2028-01-01',
                  status: 'active',
                  coverageLimit: '$2,000,000 Occurrence',
                  dobNowStatus: 'Under Plan Examination'
                };
                setRecords([newRec, ...records]);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black text-xs font-black uppercase tracking-wider shadow-amber-glow active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Document</span>
            </button>
          </div>
        </div>
      </div>

      {/* Trust Metrics Pill Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#0b0f17]/70 border border-white/10 rounded-xl p-4 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 uppercase font-mono">Master Electrician</div>
            <div className="text-base font-black text-white">NYC DOB #008124</div>
            <div className="text-[11px] text-emerald-400 font-mono">Active & Fully Bonded</div>
          </div>
        </div>

        <div className="bg-[#0b0f17]/70 border border-white/10 rounded-xl p-4 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 uppercase font-mono">Liability & Umbrella</div>
            <div className="text-base font-black text-white">$2,000,000 COI</div>
            <div className="text-[11px] text-cyan-400 font-mono">Travelers NY Policy Active</div>
          </div>
        </div>

        <div className="bg-[#0b0f17]/70 border border-white/10 rounded-xl p-4 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 uppercase font-mono">DOB NOW Digital Seal</div>
            <div className="text-base font-black text-white">100% Expedited</div>
            <div className="text-[11px] text-emerald-400 font-mono">Class 1, 2, 3 Authorized</div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {authorities.map(a => (
          <button
            key={a}
            onClick={() => setAuthorityFilter(a)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              authorityFilter === a
                ? 'bg-amber-500 text-black font-bold shadow-amber-glow'
                : 'bg-[#0b0f17]/60 text-slate-300 border border-white/10 hover:bg-white/10'
            }`}
          >
            {a}
          </button>
        ))}
      </div>

      {/* Compliance Records List */}
      <div className="space-y-3">
        {filtered.map(rec => (
          <div
            key={rec.id}
            className="bg-[#0b0f17]/80 backdrop-blur-xl border border-white/10 hover:border-amber-500/30 rounded-2xl p-5 shadow-lg transition-all group"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono uppercase font-black px-2 py-0.5 rounded bg-white/5 text-amber-400 border border-white/10">
                    {rec.authority}
                  </span>

                  <span className={`text-[10px] font-mono uppercase font-black px-2 py-0.5 rounded-full border ${
                    rec.status === 'active'
                      ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                      : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                  }`}>
                    {rec.status === 'active' ? 'Active Verified' : 'Renewal In Progress'}
                  </span>

                  <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/40 border border-cyan-800/40 px-2 py-0.5 rounded">
                    DOB NOW: {rec.dobNowStatus}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                  {rec.title}
                </h3>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 font-mono">
                  <span>Document #: <strong className="text-slate-200">{rec.documentNumber}</strong></span>
                  <span>Holder: <strong className="text-slate-200">{rec.holder}</strong></span>
                  <span>Expires: <strong className="text-amber-400">{rec.expirationDate}</strong></span>
                </div>

                <div className="text-xs text-slate-400 font-mono bg-black/40 border border-white/5 rounded-lg px-3 py-1.5 mt-1">
                  Coverage / Scope: <span className="text-slate-200">{rec.coverageLimit}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end md:self-center">
                <button
                  onClick={() => alert(`Viewing verified DOB/Insurance dossier for ${rec.documentNumber}`)}
                  className="px-3 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-semibold flex items-center gap-1.5 active:scale-95 transition-all"
                >
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                  <span>View Filing</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
