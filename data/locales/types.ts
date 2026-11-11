export type Locale = "en" | "es" | "zh" | "ru";

export interface TranslationDictionary {
  nav: {
    services: string;
    boroughs: string;
    compliance: string;
    about: string;
    quote: string;
  };
  mobileNav: {
    services: string;
    boroughs: string;
    call: string;
    quote: string;
    firm: string;
  };
  heroWelcome: {
    badge: string;
    h1: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
    trustSignals: {
      heavyUp: string;
      coi: string;
      dob: string;
    };
  };
  sliderMeta: {
    nextIntake: string;
    disciplineLabel: string;
  };
  heroStats: {
    passRate: string;
    passRateLabel: string;
    dispatch: string;
    dispatchLabel: string;
    insurance: string;
    insuranceLabel: string;
    experience: string;
    experienceLabel: string;
  };
  servicesPage: {
    badge: string;
    h1: string;
    subtitle: string;
    searchPlaceholder: string;
    results: string;
    filterAll: string;
    highVoltage: string;
    solarEv: string;
    construction: string;
    aiCalendar: string;
  };
  slides: {
    id: number;
    badge: string;
    h1: string;
    title: string;
    subtitle: string;
    description: string;
    tags: string[];
    ctaPrimary: string;
    ctaSecondary: string;
  }[];
  servicesSection: {
    badge: string;
    title: string;
    subtitle: string;
    requestSchedule: string;
    items: {
      id: string;
      title: string;
      targetService: string;
      badge: string;
      desc: string;
      features: string[];
    }[];
  };
  boroughsSection: {
    badge: string;
    title: string;
    subtitle: string;
    inspectionsLabel: string;
    dobStatus: string;
    items: {
      name: string;
      subtitle: string;
      neighborhoods: string;
      dispatchTime: string;
    }[];
  };
  complianceSection: {
    badge: string;
    title: string;
    subtitle: string;
    cards: {
      dobTitle: string;
      dobDesc: string;
      dobStatus: string;
      coiTitle: string;
      coiDesc: string;
      coiStatus: string;
      laborTitle: string;
      laborDesc: string;
      laborStatus: string;
    };
  };
  aboutSection: {
    badge: string;
    exploreBtn: string;
  };
  reviewsSection: {
    badge: string;
    title: string;
    subtitle: string;
    stats: {
      passRate: string;
      passRateLabel: string;
      coned: string;
      conedLabel: string;
      dispatch: string;
      dispatchLabel: string;
      fees: string;
      feesLabel: string;
    };
    verifiedClient: string;
    reviews: {
      quote: string;
      author: string;
    }[];
  };
  leadWizard: {
    badge: string;
    title: string;
    subtitle: string;
    preSelectedBadge: string;
    selectedBadge: string;
    changeBtn: string;
    step1Title: string;
    step2Title: string;
    step3Title: string;
    propStepHeader: string;
    propStepDesc: string;
    selectBoroughLabel: string;
    propertyTypes: {
      id: string;
      title: string;
      desc: string;
    }[];
    detailsStepHeader: string;
    detailsStepDesc: string;
    scopeLabel: string;
    urgencyLabel: string;
    urgencyStandard: string;
    urgencyStandardDesc: string;
    urgencyEmergency: string;
    urgencyEmergencyDesc: string;
    dobJobNumberLabel: string;
    dobJobNumberPlaceholder: string;
    contactStepHeader: string;
    contactStepDesc: string;
    fullNameLabel: string;
    fullNamePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    addressLabel: string;
    addressPlaceholder: string;
    notesLabel: string;
    notesPlaceholder: string;
    trustNote: string;
    backBtn: string;
    nextBtn: string;
    submitBtn: string;
    submittingBtn: string;
    successTitle: string;
    successDesc: string;
    submitAnotherBtn: string;
  };
  footer: {
    brandDesc: string;
    coiBadge: string;
    servicesTitle: string;
    serviceLinks: {
      panels: string;
      fireAlarms: string;
      solar: string;
      painting: string;
    };
    dispatchTitle: string;
    dispatchManhattan: string;
    dispatchBrooklyn: string;
    complianceTitle: string;
    privacyLink: string;
    termsLink: string;
    cookiesLink: string;
    copyright: string;
    allRightsReserved: string;
  };
}
