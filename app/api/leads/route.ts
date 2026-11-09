import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export interface LeadRecord {
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
  notes?: string;
  status: 'pending' | 'contacted' | 'dispatched' | 'closed';
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'leads.json');

// Ensure data directory and file exist
function getLeads(): LeadRecord[] {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      // Seed with sample initial NYC Master Electrician leads
      const initialLeads: LeadRecord[] = [
        {
          id: 'lead_nyc_1001',
          createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
          borough: 'Manhattan',
          propertyType: 'Co-op',
          service: '200A / 400A Heavy-Up Panel',
          urgency: 'Within 48h',
          fullName: 'Eleanor Vance (Board VP)',
          phone: '+1 (917) 555-0142',
          propertyAddress: '740 Park Ave, Apt 11B, Manhattan, NY 10021',
          dobJobNumber: 'M0094821',
          notes: 'Alteration agreement signed. Need DOB NOW filing & ConEd 400A riser cutover.',
          status: 'dispatched',
        },
        {
          id: 'lead_nyc_1002',
          createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
          borough: 'Brooklyn',
          propertyType: 'Historic Brownstone',
          service: 'Brownstone Complete Rewire',
          urgency: 'Scheduled Renovation',
          fullName: 'Marcus Sterling',
          phone: '+1 (718) 555-8921',
          propertyAddress: '142 Willow St, Brooklyn Heights, NY 11201',
          dobJobNumber: 'B0034190',
          notes: 'Total knob-and-tube removal. LPC approval already granted.',
          status: 'pending',
        },
        {
          id: 'lead_nyc_1003',
          createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
          borough: 'Manhattan',
          propertyType: 'Condo',
          service: 'Architectural Lutron Lighting',
          urgency: 'Scheduled Renovation',
          fullName: 'Claire Dupont',
          phone: '+1 (212) 555-7319',
          propertyAddress: '56 Leonard St, Penthouse 48, Tribeca, NY 10013',
          notes: 'Lutron HomeWorks QSX system design & 200A subpanel upgrade.',
          status: 'contacted',
        }
      ];
      fs.writeFileSync(DATA_FILE, JSON.stringify(initialLeads, null, 2), 'utf-8');
      return initialLeads;
    }
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading leads:', err);
    return [];
  }
}

function saveLeads(leads: LeadRecord[]) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(leads, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving leads:', err);
  }
}

// GET /api/leads - Returns all leads sorted by date desc
export async function GET() {
  const leads = getLeads();
  leads.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return NextResponse.json({ success: true, count: leads.length, leads });
}

// POST /api/leads - Receives a new lead from the wizard
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Basic validation
    if (!body.fullName || !body.phone || !body.propertyAddress) {
      return NextResponse.json(
        { success: false, error: 'Full name, phone, and property address are required.' },
        { status: 400 }
      );
    }

    const leads = getLeads();
    const newLead: LeadRecord = {
      id: `lead_nyc_${Date.now()}`,
      createdAt: new Date().toISOString(),
      borough: body.borough || 'Manhattan',
      propertyType: body.propertyType || 'Condo',
      service: body.service || '200A / 400A Heavy-Up Panel',
      urgency: body.urgency || 'Emergency (Immediate)',
      fullName: body.fullName.trim(),
      phone: body.phone.trim(),
      propertyAddress: body.propertyAddress.trim(),
      dobJobNumber: body.dobJobNumber ? body.dobJobNumber.trim() : undefined,
      notes: body.notes ? body.notes.trim() : undefined,
      status: 'pending'
    };

    leads.unshift(newLead);
    saveLeads(leads);

    return NextResponse.json({ success: true, lead: newLead }, { status: 201 });
  } catch (err) {
    console.error('Failed to create lead:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

// PATCH /api/leads - Update status of a lead
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ success: false, error: 'id and status required' }, { status: 400 });
    }

    const leads = getLeads();
    const index = leads.findIndex(l => l.id === id);
    if (index === -1) {
      return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 });
    }

    leads[index].status = status;
    saveLeads(leads);

    return NextResponse.json({ success: true, lead: leads[index] });
  } catch (err) {
    console.error('Failed to update lead:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
