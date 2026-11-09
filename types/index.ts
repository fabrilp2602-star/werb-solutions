export type Borough = 'Manhattan' | 'Brooklyn' | 'Queens' | 'Long Island / Bronx / SI';

export type PropertyType = 
  | 'Condo' 
  | 'Co-op' 
  | 'Historic Brownstone' 
  | 'Commercial DOB NOW';

export type ServiceScope = 
  | '200A / 400A Heavy-Up Panel'
  | 'DOB NOW Violation Removal'
  | 'Brownstone Complete Rewire'
  | 'Architectural Lutron Lighting'
  | 'Commercial 3-Phase & Switchgear'
  | 'EV Fleet / Rooftop Solar & BESS';

export interface LeadSubmission {
  borough: Borough;
  propertyType: PropertyType;
  service: ServiceScope;
  urgency: 'Emergency (Immediate)' | 'Within 48h' | 'Scheduled Renovation';
  fullName: string;
  phone: string;
  propertyAddress: string;
  dobJobNumber?: string;
  notes?: string;
}
