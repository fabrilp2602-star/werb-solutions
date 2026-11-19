export interface HeroSlide {
  id: number;
  serviceId: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  mobileImageUrl?: string;
  tags: string[];
  ctaPrimary: {
    text: string;
    href: string;
  };
  ctaSecondary: {
    text: string;
    href: string;
  };
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    serviceId: "high-voltage-systems",
    badge: "Class-A NYC DOB Master Electrician • License #008472",
    title: "High-Voltage Infrastructure & 200A Smart Panels",
    subtitle: "Eaton & Square-D Smart Enclosures with Load Shedding",
    description: "Turnkey replacements of obsolete Federal Pacific & Zinsco panels for historic Brooklyn brownstones, Manhattan co-ops and luxury condominiums with guaranteed DOB inspection sign-off.",
    imageUrl: "/media/hero_electrical_desktop.jpg",
    mobileImageUrl: "/media/hero_electrical_mobile.jpg",
    tags: ["Under 8-Hour Cutover", "DOB NOW™ Sign-Off Tag", "Smart Load Shedding Integration"],
    ctaPrimary: {
      text: "Schedule Inspection With AI",
      href: "#ai-booking-calendar"
    },
    ctaSecondary: {
      text: "Explore High-Voltage Specs",
      href: "#high-voltage-systems"
    }
  },
  {
    id: 2,
    serviceId: "clean-energy",
    badge: "NYC Local Law 97 Compliant • ConEd Interconnection",
    title: "Urban Rooftop Solar & Universal Level-2 EV Charging",
    subtitle: "Photovoltaic Flat Rooftops & Multi-Family Fleet Stations",
    description: "Commercial and residential flat rooftop photovoltaic canopies with Enphase/Tesla Powerwall battery storage, ConEdison load letters, and NYC solar property tax abatement filings.",
    imageUrl: "/media/hero_solar_desktop.jpg",
    mobileImageUrl: "/media/hero_solar_mobile.jpg",
    tags: ["ConEd Net Metering Setup", "Tesla Wall Connectors", "Avoid Local Law 97 Carbon Penalties"],
    ctaPrimary: {
      text: "Schedule Solar & EV Audit",
      href: "#ai-booking-calendar"
    },
    ctaSecondary: {
      text: "Explore Clean Energy Scope",
      href: "#clean-energy"
    }
  },
  {
    id: 3,
    serviceId: "architectural-lighting",
    badge: "Tribeca & Soho Standards • High-End Resi Specification",
    title: "Lutron Architectural & Facade Lighting Systems",
    subtitle: "Precision Magnetic Track & Lutron HomeWorks Keypads",
    description: "Precision magnetic track lighting, cove indirect illumination, and Lutron HomeWorks automated wireless keypad integration tailored to alteration agreements of premier NYC residences.",
    imageUrl: "/media/hero_lighting_desktop.jpg",
    mobileImageUrl: "/media/hero_lighting_mobile.jpg",
    tags: ["Lutron HomeWorks QSX", "Zero-Flicker 3000K Dimming", "Venetian Plaster Flush Mounts"],
    ctaPrimary: {
      text: "Schedule Lighting Consult",
      href: "#ai-booking-calendar"
    },
    ctaSecondary: {
      text: "Explore Lighting Systems",
      href: "#high-voltage-systems"
    }
  },
  {
    id: 4,
    serviceId: "fire-alarm",
    badge: "FDNY Title 3 RCNY §907 Code Compliant",
    title: "FDNY Life Safety & Fire Alarm Networks",
    subtitle: "Rigid EMT Conduit, Pull Stations & Annunciator Panels",
    description: "Rigid EMT conduit wiring, pull stations, heat/smoke sensor arrays, and central station annunciator interconnections strictly complying with FDNY fire life safety protocols.",
    imageUrl: "/media/hero_firealarm_desktop.jpg",
    mobileImageUrl: "/media/hero_firealarm_mobile.jpg",
    tags: ["FDNY Plan Examination Support", "Rigid EMT Fire Runs", "Annual Central Station Inspection"],
    ctaPrimary: {
      text: "Schedule FDNY Inspection",
      href: "#ai-booking-calendar"
    },
    ctaSecondary: {
      text: "Explore Safety Scope",
      href: "#high-voltage-systems"
    }
  },
  {
    id: 5,
    serviceId: "architectural-construction",
    badge: "EPA Lead-Safe Certified Firm • Luxury Alterations",
    title: "Controlled Demolition, Level-5 Drywall & Fine Finishes",
    subtitle: "Negative Air Dust Containment & Soundproof Steel Studs",
    description: "Controlled non-structural demolition, acoustic steel stud framing, Sound Transmission Class (STC) soundproofing, and museum-grade Benjamin Moore coatings for premier NYC residences.",
    imageUrl: "/media/hero_construction_desktop.jpg",
    mobileImageUrl: "/media/hero_construction_mobile.jpg",
    tags: ["Level-5 Skim Coating", "Acoustic QuietRock Partitions", "Zero-VOC Eco Premium Paints"],
    ctaPrimary: {
      text: "Schedule Contracting Scope",
      href: "#ai-booking-calendar"
    },
    ctaSecondary: {
      text: "Explore Contracting Directory",
      href: "#architectural-construction"
    }
  }
];

export interface StatItem {
  id: string;
  value: string;
  label: string;
}

export const DEFAULT_STATS: StatItem[] = [
  { id: "pass-rate", value: "100%", label: "DOB NOW™ Inspection Sign-Off" },
  { id: "dispatch", value: "<45m", label: "24/7 Manhattan Rapid Emergency" },
  { id: "insurance", value: "$2M", label: "Commercial General Liability COI" },
  { id: "experience", value: "15+", label: "Years Licensed NYC Practice" },
];
