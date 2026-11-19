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
      fs.writeFileSync(DATA_FILE, '[]', 'utf-8');
      return [];
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
