export type AdminTab = 'leads' | 'services' | 'compliance' | 'content' | 'users';

export interface GlassmorphismTokens {
  bg: string;
  bgDark: string;
  border: string;
  borderDark: string;
  shadow: string;
  shadowGlowAmber: string;
  shadowGlowCyan: string;
  blur: string;
}

export const ADMIN_GLASS_TOKENS: GlassmorphismTokens = {
  bg: 'rgba(15, 23, 42, 0.65)',
  bgDark: 'rgba(7, 10, 15, 0.85)',
  border: 'rgba(255, 255, 255, 0.08)',
  borderDark: 'rgba(245, 158, 11, 0.18)',
  shadow: '0 8px 32px rgba(0, 0, 0, 0.35)',
  shadowGlowAmber: '0 0 25px -5px rgba(245, 158, 11, 0.25)',
  shadowGlowCyan: '0 0 25px -5px rgba(56, 189, 248, 0.25)',
  blur: 'backdrop-blur-xl',
};

export type NYCLeadStatus = 'pending' | 'contacted' | 'dispatched' | 'closed';

export interface AdminLeadItem {
  id: string;
  createdAt: string;
  borough: 'Manhattan' | 'Brooklyn' | 'Queens' | 'Bronx' | 'Staten Island' | string;
  propertyType: string;
  service: string;
  urgency: 'Emergency (Immediate)' | 'Within 48h' | 'Scheduled Renovation' | string;
  fullName: string;
  phone: string;
  propertyAddress: string;
  dobJobNumber?: string;
  notes?: string;
  status: NYCLeadStatus;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: 'Electrical & Panels' | 'DOB Compliance' | 'Solar & BESS' | 'Lighting Architecture' | 'Commercial Heavy Power';
  powerRating: string;
  dobPermitRequired: boolean;
  active: boolean;
  description: string;
  turnaroundTime: string;
  image?: string;
}

export interface ComplianceRecord {
  id: string;
  title: string;
  authority: 'NYC DOB' | 'Con Edison' | 'FDNY' | 'NYS Insurance Dept' | 'LPC Landmark';
  documentNumber: string;
  holder: string;
  expirationDate: string;
  status: 'active' | 'pending_renewal' | 'under_audit';
  coverageLimit: string;
  dobNowStatus: 'Approved / Fully Permitted' | 'Under Plan Examination' | 'Sign-Off Ready';
}

export interface SiteContentConfig {
  headlineMain: string;
  headlineSubtitle: string;
  emergencyPhone: string;
  officeAddress: string;
  masterLicenseNumber: string;
  insuranceCoverageAmount: string;
  callToAction: string;
  badgeDOBNOW: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'Master Admin' | 'DOB Expediter' | 'Field Master Electrician' | 'Dispatcher';
  status: 'active' | 'suspended';
  lastLogin: string;
}
