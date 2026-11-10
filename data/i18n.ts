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
}

export const TRANSLATIONS: Record<Locale, TranslationDictionary> = {
  en: {
    nav: {
      services: "All Services",
      boroughs: "Boroughs & Coverage",
      compliance: "DOB & Insurances",
      about: "About Firm",
      quote: "Quote Project",
    },
    mobileNav: {
      services: "Services",
      boroughs: "Boroughs",
      call: "24/7 Call",
      quote: "Quote",
      firm: "Firm",
    },
    heroWelcome: {
      badge: "Class-A NYC DOB Master Electrician • Lic. #008472 • 5 Boroughs",
      h1: "Licensed NYC Master Electrician & Architectural Contracting",
      description: "At WERB Solutions, we deliver certified high-voltage electrical engineering, urban clean energy, and luxury architectural renovations across NYC—backed by $2M COI and guaranteed DOB NOW™ sign-offs.",
      ctaPrimary: "Request Project Intake",
      ctaSecondary: "Explore Service Scope",
    },
    servicesPage: {
      badge: "Turnkey Contracting Directory • 5 NYC Boroughs",
      h1: "Engineered Electrical, Clean Energy & Luxury Alterations",
      subtitle: "Turnkey licensed MEP execution, DOB NOW™ permitted filings, ConEd interconnections, and luxury alterations for NYC residential and commercial properties.",
      searchPlaceholder: "Search 200A panels, rooftop solar, EV chargers, framing, FDNY alarms...",
      results: "results",
      filterAll: "All Scopes",
      highVoltage: "01. High-Voltage",
      solarEv: "02. Solar & EV",
      construction: "03. Construction",
      aiCalendar: "AI Calendar",
    },
    slides: [
      {
        id: 1,
        badge: "Class-A NYC DOB Master Electrician • License #008472",
        h1: "High-Voltage Infrastructure & 200A Smart Panels",
        title: "High-Voltage Infrastructure & 200A Smart Panels",
        subtitle: "Eaton & Square-D Smart Enclosures with Load Shedding",
        description: "Turnkey replacements of obsolete Federal Pacific & Zinsco panels for historic Brooklyn brownstones, Manhattan co-ops and luxury condominiums with guaranteed DOB inspection sign-off.",
        tags: ["Under 8-Hour Cutover", "DOB NOW™ Sign-Off Tag", "Smart Load Shedding Integration"],
        ctaPrimary: "Schedule Inspection With AI",
        ctaSecondary: "Explore High-Voltage Specs",
      },
      {
        id: 2,
        badge: "NYC Local Law 97 Compliant • ConEd Interconnection",
        h1: "Urban Rooftop Solar & Universal Level-2 EV Charging",
        title: "Urban Rooftop Solar & Universal Level-2 EV Charging",
        subtitle: "Photovoltaic Flat Rooftops & Multi-Family Fleet Stations",
        description: "Commercial and residential flat rooftop photovoltaic canopies with Enphase/Tesla Powerwall battery storage, ConEdison load letters, and NYC solar property tax abatement filings.",
        tags: ["ConEd Net Metering Setup", "Tesla Wall Connectors", "Avoid Local Law 97 Carbon Penalties"],
        ctaPrimary: "Schedule Solar & EV Audit",
        ctaSecondary: "Explore Clean Energy Scope",
      },
      {
        id: 3,
        badge: "Tribeca & Soho Standards • High-End Resi Specification",
        h1: "Lutron Architectural & Facade Lighting Systems",
        title: "Lutron Architectural & Facade Lighting Systems",
        subtitle: "Precision Magnetic Track & Lutron HomeWorks Keypads",
        description: "Precision magnetic track lighting, cove indirect illumination, and Lutron HomeWorks automated wireless keypad integration tailored to alteration agreements of premier NYC residences.",
        tags: ["Lutron HomeWorks QSX", "Zero-Flicker 3000K Dimming", "Venetian Plaster Flush Mounts"],
        ctaPrimary: "Schedule Lighting Consult",
        ctaSecondary: "Explore Lighting Systems",
      },
      {
        id: 4,
        badge: "FDNY Title 3 RCNY §907 Code Compliant",
        h1: "FDNY Life Safety & Fire Alarm Networks",
        title: "FDNY Life Safety & Fire Alarm Networks",
        subtitle: "Rigid EMT Conduit, Pull Stations & Annunciator Panels",
        description: "Rigid EMT conduit wiring, pull stations, heat/smoke sensor arrays, and central station annunciator interconnections strictly complying with FDNY fire life safety protocols.",
        tags: ["FDNY Plan Examination Support", "Rigid EMT Fire Runs", "Annual Central Station Inspection"],
        ctaPrimary: "Schedule FDNY Inspection",
        ctaSecondary: "Explore Safety Scope",
      },
      {
        id: 5,
        badge: "EPA Lead-Safe Certified Firm • Luxury Alterations",
        h1: "Controlled Demolition, Level-5 Drywall & Fine Finishes",
        title: "Controlled Demolition, Level-5 Drywall & Fine Finishes",
        subtitle: "Negative Air Dust Containment & Soundproof Steel Studs",
        description: "Controlled non-structural demolition, acoustic steel stud framing, Sound Transmission Class (STC) soundproofing, and museum-grade Benjamin Moore coatings for premier NYC residences.",
        tags: ["Level-5 Skim Coating", "Acoustic QuietRock Partitions", "Zero-VOC Eco Premium Paints"],
        ctaPrimary: "Schedule Contracting Scope",
        ctaSecondary: "Explore Contracting Directory",
      },
    ],
  },
  es: {
    nav: {
      services: "Servicios",
      boroughs: "Zonas y Cobertura",
      compliance: "Licencias y Seguros",
      about: "Nosotros",
      quote: "Cotizar Proyecto",
    },
    mobileNav: {
      services: "Servicios",
      boroughs: "Zonas",
      call: "24/7 Llamar",
      quote: "Cotizar",
      firm: "Empresa",
    },
    heroWelcome: {
      badge: "Electricista Maestro Clase-A NYC DOB • Lic. #008472 • 5 Distritos",
      h1: "Electricista Maestro Matriculado de NYC y Contratación Arquitectónica",
      description: "En WERB Solutions brindamos ingeniería eléctrica certificada de alta tensión, energía solar urbana y reformas de lujo en todo Nueva York, con $2M en póliza COI y aprobación garantizada en DOB NOW™.",
      ctaPrimary: "Solicitar Inspección",
      ctaSecondary: "Ver Catálogo Técnico",
    },
    servicesPage: {
      badge: "Directorio Oficial de Contratación • 5 Distritos de NYC",
      h1: "Ingeniería Eléctrica, Energía Limpia y Construcción de Lujo",
      subtitle: "Ejecución técnica certificada, tramitación oficial de permisos en DOB NOW™, interconexiones con ConEd y reformas de alto nivel para condominios e inmuebles en Nueva York.",
      searchPlaceholder: "Buscar paneles 200A, energía solar, cargadores EV, tabiquería, alarmas FDNY...",
      results: "resultados",
      filterAll: "Todos",
      highVoltage: "01. Alta Tensión",
      solarEv: "02. Solar & EV",
      construction: "03. Construcción",
      aiCalendar: "Agenda IA",
    },
    slides: [
      {
        id: 1,
        badge: "Electricista Maestro Matriculado de NYC • Licencia #008472",
        h1: "Infraestructura de Alta Tensión y Paneles Inteligentes 200A",
        title: "Infraestructura de Alta Tensión y Paneles Inteligentes 200A",
        subtitle: "Gabinetes Inteligentes Eaton y Square-D con Descarga Dinámica",
        description: "Reemplazo integral de paneles obsoletos Federal Pacific y Zinsco en brownstones históricos de Brooklyn y condominios de Manhattan con aprobación oficial del DOB.",
        tags: ["Corte y Empalme en <8 Horas", "Sello de Aprobación DOB NOW™", "Descarga Inteligente de Cargas"],
        ctaPrimary: "Agendar Inspección con IA",
        ctaSecondary: "Ver Especificaciones",
      },
      {
        id: 2,
        badge: "Cumplimiento Local Law 97 • Interconexión con ConEdison",
        h1: "Energía Solar en Techos Urbanos y Carga de Vehículos EV Nivel-2",
        title: "Energía Solar en Techos Urbanos y Carga de Vehículos EV Nivel-2",
        subtitle: "Canopias Fotovoltaicas y Estaciones de Carga Multifamiliares",
        description: "Sistemas solares en techos planos con almacenamiento Tesla Powerwall, cartas de carga ConEdison y exenciones fiscales del impuesto a la propiedad solar de NYC.",
        tags: ["Medición Neta ConEd", "Conectores Tesla Wall", "Evite Multas de Emisiones LL97"],
        ctaPrimary: "Agendar Auditoría Solar y EV",
        ctaSecondary: "Ver Soluciones Limpias",
      },
      {
        id: 3,
        badge: "Estándares Tribeca y Soho • Acabados Residenciales de Alta Gama",
        h1: "Iluminación Arquitectónica y Fachadas Lutron",
        title: "Iluminación Arquitectónica y Fachadas Lutron",
        subtitle: "Riel Magnético de Precisión y Teclados Automatizados Lutron",
        description: "Rieles magnéticos microempotrados, iluminación indirecta LED y teclados inalámbricos Lutron HomeWorks adaptados a acuerdos de reforma de edificios exclusivos.",
        tags: ["Lutron HomeWorks QSX", "Atenuación 3000K sin Parpadeo", "Montajes Enrasados en Yeso"],
        ctaPrimary: "Agendar Consulta de Iluminación",
        ctaSecondary: "Ver Iluminación",
      },
      {
        id: 4,
        badge: "Cumplimiento con Código de Incendios FDNY Title 3",
        h1: "Redes de Detección de Incendios y Seguridad Humana FDNY",
        title: "Redes de Detección de Incendios y Seguridad Humana FDNY",
        subtitle: "Tubería Rígida EMT, Estaciones Manuales y Central de Alarmas",
        description: "Tubería metálica EMT rígida, sensores fotoeléctricos, estaciones de tirón y tableros anunciadores en estricta regla con protocolos de vida y fuego del FDNY.",
        tags: ["Aprobación de Planos FDNY", "Tendido Rígido EMT de Fuego", "Certificación Anual de Estación"],
        ctaPrimary: "Agendar Inspección FDNY",
        ctaSecondary: "Ver Seguridad",
      },
      {
        id: 5,
        badge: "Empresa Certificada EPA Lead-Safe • Reformas de Lujo",
        h1: "Demolición Selectiva, Tabiquería Nivel-5 y Acabados de Pintura",
        title: "Demolición Selectiva, Tabiquería Nivel-5 y Acabados de Pintura",
        subtitle: "Presión Negativa Antipolvo y Montantes de Acero Acústico",
        description: "Demolición interior controlada, tabiquería de acero acústica (QuietRock) y aplicación de recubrimientos Benjamin Moore de calidad museo para residencias neoyorquinas.",
        tags: ["Enlucido Nivel 5 de Museo", "Tabiques Aislantes QuietRock", "Pinturas Cero-VOC de Lujo"],
        ctaPrimary: "Agendar Proyecto de Obra",
        ctaSecondary: "Ver Servicios de Obra",
      },
    ],
  },
  zh: {
    nav: {
      services: "全部服务",
      boroughs: "服务区域与覆盖",
      compliance: "DOB执照与保险",
      about: "关于公司",
      quote: "获取项目报价",
    },
    mobileNav: {
      services: "服务",
      boroughs: "区域",
      call: "24/7 电话",
      quote: "报价",
      firm: "公司",
    },
    heroWelcome: {
      badge: "纽约市房屋局甲级持证电气总承包商 • 执照 #008472 • 覆盖五大区",
      h1: "纽约市房屋局持证电气总承包与高级建筑翻新",
      description: "在WERB Solutions，我们为纽约全境提供权威认证的高压电气工程、城市清洁能源及高端建筑翻新，附带200万美元责任商业保险（COI）并确保DOB NOW™官方验收通过。",
      ctaPrimary: "立即预约评估",
      ctaSecondary: "探索服务范围",
    },
    servicesPage: {
      badge: "一站式工程承包名录 • 纽约市五大区全覆盖",
      h1: "专业电气工程、清洁能源与高级建筑改造",
      subtitle: "提供房屋局DOB持证工程施工、DOB NOW™报批、爱迪生电力ConEd并网申请及高端住宅商业装修翻新服务。",
      searchPlaceholder: "搜索200A配电盘、屋顶太阳能、EV充电桩、隔音墙、FDNY火警...",
      results: "个结果",
      filterAll: "全部",
      highVoltage: "01. 高压电气",
      solarEv: "02. 太阳能与电车",
      construction: "03. 建筑翻新",
      aiCalendar: "AI智能预约",
    },
    slides: [
      {
        id: 1,
        badge: "纽约市DOB持证总电气师 • 执照 #008472",
        h1: "高压电网基础设施与200A智能配电盘升级",
        title: "高压电网基础设施与200A智能配电盘升级",
        subtitle: "Eaton与Square-D智能负载管理配电箱",
        description: "为布鲁克林历史联排排屋、曼哈顿合作公寓与豪华共管公寓全面替换淘汰的FPE和Zinsco老化电箱，确保DOB官方检验合格。",
        tags: ["8小时内无缝换线", "DOB NOW™官方合格标牌", "智能负荷削峰管理"],
        ctaPrimary: "通过AI预约电检",
        ctaSecondary: "查看电气规格",
      },
      {
        id: 2,
        badge: "符合纽约市第97号减碳法案 • ConEdison直连并网",
        h1: "城市平屋顶太阳能发电与二级通用EV充电站",
        title: "城市平屋顶太阳能发电与二级通用EV充电站",
        subtitle: "光伏遮阳棚系统与多户公寓车队充电站",
        description: "商业与住宅平顶光伏系统，配备特斯拉Powerwall储能电池、爱迪生电力负荷证明及纽约市房产太阳能税收减免申报。",
        tags: ["ConEd净计量并网", "特斯拉专用充电桩", "免除第97号法案高额碳税"],
        ctaPrimary: "预约太阳能与EV评估",
        ctaSecondary: "了解清洁能源",
      },
      {
        id: 3,
        badge: "翠贝卡与SOHO高端标准 • 豪宅定制规格",
        h1: "路创（Lutron）建筑与外立面照明智能系统",
        title: "路创（Lutron）建筑与外立面照明智能系统",
        subtitle: "精密磁吸轨道灯与Lutron HomeWorks智能面板",
        description: "精密微型磁吸轨道、天花暗藏间接LED照明及路创无线智能面板，完美符合高端大厦业委会改建装修公约。",
        tags: ["Lutron HomeWorks QSX", "无频闪3000K精细调光", "威尼斯石膏平嵌工艺"],
        ctaPrimary: "预约灯光设计咨询",
        ctaSecondary: "探索照明系统",
      },
      {
        id: 4,
        badge: "符合纽约消防局FDNY Title 3规范要求",
        h1: "FDNY生命安全防护与消防火灾报警网络",
        title: "FDNY生命安全防护与消防火灾报警网络",
        subtitle: "重型EMT金属电线管、拉发报警器与控制主机",
        description: "符合纽约消防局标准的坚固EMT金属管道火警布线、手动报警拉掣、烟温感应器阵列及总控制室警报中继系统。",
        tags: ["FDNY图纸会审支持", "重型EMT金属防燃管", "中央监控年检证书"],
        ctaPrimary: "预约消防安全检查",
        ctaSecondary: "查看安防工程",
      },
      {
        id: 5,
        badge: "联邦环保署EPA无铅除漆认证企业 • 奢华装潢",
        h1: "精准保护性拆除、5级石膏隔墙与博物馆级油漆",
        title: "精准保护性拆除、5级石膏隔墙与博物馆级油漆",
        subtitle: "负压防尘环保隔离与STC级超强隔音轻钢龙骨",
        description: "规范室内非结构拆改、清运密封袋装、QuietRock高级隔音轻钢隔墙及本杰明摩尔高端环保面漆工艺。",
        tags: ["5级博物馆石膏饰面", "QuietRock高级声学隔音", "零VOC环保顶级涂料"],
        ctaPrimary: "预约工程量报价",
        ctaSecondary: "查看翻新工程",
      },
    ],
  },
  ru: {
    nav: {
      services: "Все услуги",
      boroughs: "Районы и охват",
      compliance: "Лицензии DOB и страховка",
      about: "О компании",
      quote: "Рассчитать проект",
    },
    mobileNav: {
      services: "Услуги",
      boroughs: "Районы",
      call: "24/7 Вызов",
      quote: "Заявка",
      firm: "О фирме",
    },
    heroWelcome: {
      badge: "Лицензированный мастер-электрик DOB NYC класса A • Лиц. #008472",
      h1: "Лицензированный мастер-электрик и генподрядчик в Нью-Йорке",
      description: "Компания WERB Solutions выполняет профессиональные высоковольтные электромонтажные работы, установку солнечных панелей и элитный ремонт в Нью-Йорке. Страховой полис COI на $2,000,000 и официальная сдача инспекциям DOB NOW™.",
      ctaPrimary: "Заказать аудит объекта",
      ctaSecondary: "Каталог услуг",
    },
    servicesPage: {
      badge: "Реестр строительно-монтажных услуг • 5 боро Нью-Йорка",
      h1: "Электромонтажные работы, солнечная энергия и элитный ремонт",
      subtitle: "Лицензированные инженерные работы, официальные разрешения DOB NOW™, подключение к сетям ConEd и премиальная отделка коммерческих и жилых объектов в NYC.",
      searchPlaceholder: "Поиск панелей 200A, солнечных панелей, зарядок EV, стен, пожарной сигнализации...",
      results: "результатов",
      filterAll: "Все",
      highVoltage: "01. Высокое напряжение",
      solarEv: "02. Солнце и EV",
      construction: "03. Строительство",
      aiCalendar: "ИИ Календарь",
    },
    slides: [
      {
        id: 1,
        badge: "Лицензия мастера-электрика DOB NYC #008472",
        h1: "Высоковольтная инфраструктура и смарт-панели 200А",
        title: "Высоковольтная инфраструктура и смарт-панели 200А",
        subtitle: "Смарт-щиты Eaton и Square-D с управлением нагрузкой",
        description: "Полная замена устаревших щитов Federal Pacific и Zinsco в таунхаусах Бруклина и кондоминиумах Манхэттена с официальным сертификатом инспекции DOB.",
        tags: ["Переключение менее чем за 8 часов", "Гарантия сдачи DOB NOW™", "Автоматическое снятие нагрузки"],
        ctaPrimary: "Записаться на аудит через ИИ",
        ctaSecondary: "Параметры щитов",
      },
      {
        id: 2,
        badge: "Соответствие Local Law 97 • Подключение к ConEdison",
        h1: "Крышные солнечные электростанции и зарядки электромобилей Level-2",
        title: "Крышные солнечные электростанции и зарядки электромобилей Level-2",
        subtitle: "Фотоэлектрические навесы и зарядные станции для кондо",
        description: "Установка солнечных панелей на плоских крышах, аккумуляторы Tesla Powerwall, расчеты для ConEdison и оформление налоговых льгот NYC по налогу на имущество.",
        tags: ["Чистый учет ConEd Net Metering", "Станции Tesla Wall", "Защита от штрафов Local Law 97"],
        ctaPrimary: "Заказать аудит Solar & EV",
        ctaSecondary: "Решения чистой энергии",
      },
      {
        id: 3,
        badge: "Стандарты Трайбека и Сохо • Премиум спецификации",
        h1: "Архитектурное освещение и системы управления Lutron",
        title: "Архитектурное освещение и системы управления Lutron",
        subtitle: "Магнитные треки и беспроводные панели Lutron HomeWorks",
        description: "Прецизионный магнитный трековый свет, светодиодные подсветки карнизов и интеграция беспроводных панелей Lutron в соответствии с регламентом элитных домов NYC.",
        tags: ["Lutron HomeWorks QSX", "Плавное диммирование 3000K", "Установка заподлицо со штукатуркой"],
        ctaPrimary: "Консультация по освещению",
        ctaSecondary: "Системы освещения",
      },
      {
        id: 4,
        badge: "Соответствие противопожарным нормам FDNY Title 3",
        h1: "Системы пожарной безопасности и сигнализации FDNY",
        title: "Системы пожарной безопасности и сигнализации FDNY",
        subtitle: "Металлорукава EMT, ручные извещатели и панели тревоги",
        description: "Монтаж пожарной проводки в жестких трубах EMT, датчики дыма и тепла, ручные извещатели и связь с центральной пультовой станцией по нормам FDNY.",
        tags: ["Согласование планов в FDNY", "Огнестойкие кабельные трассы EMT", "Ежегодные сертификаты проверки"],
        ctaPrimary: "Вызов инспектора FDNY",
        ctaSecondary: "Пожарная безопасность",
      },
      {
        id: 5,
        badge: "Сертифицированная фирма EPA Lead-Safe • Элитный ремонт",
        h1: "Контролируемый демонтаж, гипсокартон Level-5 и чистовая отделка",
        title: "Контролируемый демонтаж, гипсокартон Level-5 и чистовая отделка",
        subtitle: "Пылеулавливание с отрицательным давлением и акустические стены",
        description: "Безопасный демонтаж ненесущих перегородок, стальной акустический каркас QuietRock и шпаклевка качества музейного уровня Level-5 красками Benjamin Moore.",
        tags: ["Шпаклевка Level 5 музейного качества", "Акустические стены QuietRock", "Эко-краски с нулевым содержанием ЛОС"],
        ctaPrimary: "Заказать смету на ремонт",
        ctaSecondary: "Строительные услуги",
      },
    ],
  },
};
