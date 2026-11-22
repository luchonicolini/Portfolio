type ProjectCategory =
  'mobile' | 'native-ios' | 'full-stack' | 'engineering' | 'web-design';

type ProjectStatus =
  | 'active-mvp'
  | 'published'
  | 'deployed'
  | 'private-tool'
  | 'commercial-demo'
  | 'in-development';

interface ProjectLocalizedContent {
  title: string;
  tagline: string;
  description: string;
  categoryLabel: string;
  statusLabel: string;
  highlights: string[];
}

interface ProjectImage {
  src: string;
  width: number;
  height: number;
  altEs: string;
  altEn: string;
}

export interface Project {
  id: string;
  slug: string;
  featured: boolean;
  priorityOrder: number;
  category: ProjectCategory;
  status: ProjectStatus;
  accentColor: 'mint' | 'coral' | 'yellow' | 'canvas';
  technologies: string[];
  repositoryUrl?: string;
  liveUrl?: string;
  image?: ProjectImage;
  es: ProjectLocalizedContent;
  en: ProjectLocalizedContent;
}

export const projects: Project[] = [
  {
    id: 'puente',
    slug: 'puente',
    featured: true,
    priorityOrder: 1,
    category: 'mobile',
    status: 'active-mvp',
    accentColor: 'mint',
    technologies: [
      'Flutter',
      'Dart',
      'Riverpod',
      'STT / TTS',
      'Persistencia local'
    ],
    repositoryUrl: 'https://github.com/luchonicolini/Puente_Flutter',
    image: {
      src: '/projects/puente/preview.png',
      width: 280,
      height: 285,
      altEs:
        'Puente — Ilustración original de incorporación y comunicación accesible',
      altEn:
        'Puente — Original onboarding illustration for accessible communication'
    },
    es: {
      title: 'Puente',
      tagline: 'Comunicación accesible y asistencia en conversaciones',
      description:
        'Aplicación móvil en Flutter diseñada para facilitar la comunicación cotidiana a personas sordas o con dificultades auditivas, con persistencia local de preferencias y ciclo de vida de audio controlado (STT/TTS bajo demanda, sin almacenamiento de audio en servidores externos).',
      categoryLabel: 'Mobile / Accesibilidad',
      statusLabel: 'MVP funcional en desarrollo activo',
      highlights: [
        'Arquitectura por capas con Riverpod',
        'Ciclo de vida y privacidad de audio controlado',
        'Persistencia local de frases frecuentes'
      ]
    },
    en: {
      title: 'Puente',
      tagline: 'Accessible communication and conversational assistance',
      description:
        'Flutter mobile application designed to bridge communication gaps for deaf and hard-of-hearing users in daily interactions, emphasizing local preferences and explicit audio lifecycle controls (on-demand STT/TTS without external audio retention).',
      categoryLabel: 'Mobile / Accessibility',
      statusLabel: 'Functional MVP in active development',
      highlights: [
        'Layered architecture with Riverpod',
        'Explicit audio lifecycle and privacy controls',
        'Local storage for frequent quick phrases'
      ]
    }
  },
  {
    id: 'dolarto',
    slug: 'dolarto',
    featured: true,
    priorityOrder: 2,
    category: 'native-ios',
    status: 'published',
    accentColor: 'coral',
    technologies: ['SwiftUI', 'iOS Nativo', 'MVVM', 'DolarApi', 'Combine'],
    repositoryUrl: 'https://github.com/luchonicolini/DolarToApp',
    image: {
      src: '/projects/dolarto/preview.png',
      width: 966,
      height: 1812,
      altEs:
        'DolarTo — Captura de pantalla de cotizaciones en aplicación nativa iOS',
      altEn: 'DolarTo — Screenshot of currency exchange rates in native iOS app'
    },
    es: {
      title: 'DolarTo',
      tagline: 'Consulta y comparación de cotizaciones del dólar',
      description:
        'Aplicación nativa para iOS construida en SwiftUI con arquitectura MVVM para consultar y comparar cotizaciones del dólar en Argentina mediante la API pública DolarApi. Código y capturas verificados; enlace público de App Store pendiente de confirmación.',
      categoryLabel: 'iOS Nativo / SwiftUI',
      statusLabel: 'Lanzamiento iOS / SwiftUI (código verificado)',
      highlights: [
        'Arquitectura MVVM desacoplada',
        'Integración con API pública DolarApi',
        'Interfaz nativa fluida y ligera'
      ]
    },
    en: {
      title: 'DolarTo',
      tagline: 'USD currency exchange rate tracking',
      description:
        'Native iOS application built with SwiftUI and MVVM architecture to track and compare Argentine exchange rates using the public DolarApi service. Source code and UI captures verified; public App Store listing link pending confirmation.',
      categoryLabel: 'Native iOS / SwiftUI',
      statusLabel: 'Native iOS Release (Code verified)',
      highlights: [
        'Decoupled MVVM architecture',
        'Public DolarApi integration',
        'Lightweight native interface'
      ]
    }
  },
  {
    id: 'stitchhub',
    slug: 'stitchhub',
    featured: true,
    priorityOrder: 3,
    category: 'full-stack',
    status: 'deployed',
    accentColor: 'yellow',
    technologies: [
      'Next.js',
      'React',
      'TypeScript',
      'Supabase',
      'Tailwind CSS'
    ],
    repositoryUrl: 'https://github.com/luchonicolini/StitchHub',
    liveUrl: 'https://stitch-hub-one.vercel.app',
    image: {
      src: '/projects/stitchhub/homepage.png',
      width: 1440,
      height: 1000,
      altEs:
        'StitchHub — Captura de pantalla de la página principal de descubrimiento visual',
      altEn: 'StitchHub — Screenshot of visual UI discovery homepage'
    },
    es: {
      title: 'StitchHub',
      tagline: 'Plataforma de descubrimiento e intercambio de UI',
      description:
        'Plataforma web colaborativa para descubrir, publicar e interactuar con componentes visuales, ideas de interfaz y código de frontend, con autenticación, perfiles y colecciones.',
      categoryLabel: 'Full-Stack / Web',
      statusLabel: 'Plataforma web desplegada',
      highlights: [
        'Autenticación y base de datos con Supabase',
        'Descubrimiento visual con filtros y búsqueda',
        'Animaciones de interfaz con Motion'
      ]
    },
    en: {
      title: 'StitchHub',
      tagline: 'Visual UI discovery and code sharing platform',
      description:
        'Collaborative web platform for discovering, sharing, and bookmarking UI design patterns, frontend components, and creative code snippets with authentication and profile feeds.',
      categoryLabel: 'Full-Stack / Web',
      statusLabel: 'Deployed Web Platform',
      highlights: [
        'Supabase authentication and database',
        'Visual discovery with search & tags',
        'Interactive UI motion patterns'
      ]
    }
  },
  {
    id: 'leadradar',
    slug: 'leadradar',
    featured: false,
    priorityOrder: 4,
    category: 'engineering',
    status: 'private-tool',
    accentColor: 'canvas',
    technologies: [
      'Next.js',
      'TypeScript',
      'Supabase/PostgreSQL',
      'Playwright',
      'Vitest'
    ],
    es: {
      title: 'LeadRadar',
      tagline: 'Arquitectura de prospección B2B y auditoría técnica',
      description:
        'Caso de estudio de arquitectura sobre un sistema interno de prospección y auditoría web, documentando una cola de tareas atómica con heartbeat/fencing, deduplicación y controles pre-conexión frente a SSRF.',
      categoryLabel: 'Ingeniería / Automatización',
      statusLabel: 'Herramienta interna / Caso técnico',
      highlights: [
        'Cola atómica documentada con heartbeat',
        'Auditoría automatizada con Playwright',
        'Controles preventivos de red contra SSRF'
      ]
    },
    en: {
      title: 'LeadRadar',
      tagline: 'B2B prospecting and automated technical audit architecture',
      description:
        'Engineering case study of an internal prospecting and website audit system, documenting an atomic task queue with heartbeat/fencing, prospect deduplication, and pre-connection SSRF safeguards.',
      categoryLabel: 'Engineering / Automation',
      statusLabel: 'Internal System / Technical Case Study',
      highlights: [
        'Documented atomic queue with heartbeat',
        'Automated audits with Playwright',
        'Pre-connection network SSRF safeguards'
      ]
    }
  },
  {
    id: 'rial-electronica',
    slug: 'rial-electronica',
    featured: false,
    priorityOrder: 5,
    category: 'web-design',
    status: 'commercial-demo',
    accentColor: 'mint',
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'Motion', 'TypeScript'],
    repositoryUrl: 'https://github.com/luchonicolini/Rialelectronic_demo',
    liveUrl: 'https://rialelectronic-demo.vercel.app',
    image: {
      src: '/projects/rial-electronica/preview.webp',
      width: 800,
      height: 540,
      altEs:
        'Rial Electrónica — Captura de pantalla de la demostración de catálogo comercial',
      altEn: 'Rial Electrónica — Screenshot of commercial catalog demonstration'
    },
    es: {
      title: 'Rial Electrónica',
      tagline: 'Demostración independiente de catálogo comercial',
      description:
        'Demostración interactiva e independiente de rediseño para catálogo de productos electrónicos (no comisionada por la marca), con navegación responsiva, derivación de cotización a WhatsApp y catálogo interactivo.',
      categoryLabel: 'Diseño Web / Demostración',
      statusLabel: 'Demostración independiente no oficial',
      highlights: [
        'Catálogo responsivo con filtros dinámicos',
        'Derivación de pedidos vía WhatsApp',
        'Experiencia editorial interactiva'
      ]
    },
    en: {
      title: 'Rial Electrónica',
      tagline: 'Independent commercial catalog redesign demo',
      description:
        'Independent, unofficial e-commerce catalog redesign demo for consumer electronics (not an official client engagement), featuring a responsive product grid, animated interactions, and direct WhatsApp quotation handoff.',
      categoryLabel: 'Web Design / Demo',
      statusLabel: 'Independent Unofficial Demo',
      highlights: [
        'Responsive catalog with dynamic filters',
        'WhatsApp checkout handoff',
        'Refined editorial interactions'
      ]
    }
  },
  {
    id: 'scopeguard',
    slug: 'scopeguard',
    featured: false,
    priorityOrder: 6,
    category: 'mobile',
    status: 'in-development',
    accentColor: 'yellow',
    technologies: ['Flutter', 'Riverpod', 'Material 3', 'Go Router'],
    repositoryUrl: 'https://github.com/luchonicolini/QuoteFlow_Flutter',
    es: {
      title: 'ScopeGuard',
      tagline: 'Fundación móvil para estructuración de alcance técnico',
      description:
        'Prototipo demostrativo local en fase inicial (Material 3 y Riverpod) para estructurar alcances de trabajo y solicitudes de cambio. Flujos de sincronización remota y portal de aprobación de clientes planificados.',
      categoryLabel: 'Mobile / En desarrollo',
      statusLabel: 'En desarrollo (fundación demostrativa local)',
      highlights: [
        'Diseño mobile-first en Material 3',
        'Estado reactivo con Riverpod',
        'Aprobaciones y backend planificados'
      ]
    },
    en: {
      title: 'ScopeGuard',
      tagline: 'Mobile foundation for project scope structuring',
      description:
        'Early-stage local prototype (Material 3 & Riverpod) demonstrating project scope structuring. Remote persistence and client approval workflows are planned.',
      categoryLabel: 'Mobile / In Development',
      statusLabel: 'In Development (Local Prototype)',
      highlights: [
        'Mobile-first Material 3 UI',
        'Reactive state with Riverpod',
        'Client sign-off workflow planned'
      ]
    }
  },
  {
    id: 'nicolini-design',
    slug: 'nicolini-design',
    featured: false,
    priorityOrder: 7,
    category: 'web-design',
    status: 'deployed',
    accentColor: 'yellow',
    technologies: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Tailwind CSS v4',
      'Radix UI'
    ],
    repositoryUrl: 'https://github.com/luchonicolini/Emprendimiento-web',
    liveUrl: 'https://nicolini-design.vercel.app/',
    image: {
      src: '/projects/nicolini-design/preview.png',
      width: 400,
      height: 250,
      altEs:
        'Nicolini Design — Plataforma de diseño y desarrollo web para negocios',
      altEn:
        'Nicolini Design — Web design and development platform for businesses'
    },
    es: {
      title: 'Nicolini Design',
      tagline: 'Emprendimiento de diseño y desarrollo web para negocios',
      description:
        'Iniciativa comercial independiente enfocada en la creación de sitios web a medida para profesionales y empresas, combinando arquitectura moderna en Next.js, diseño responsive y comunicación orientada a consultas.',
      categoryLabel: 'Web Design / Emprendimiento',
      statusLabel: 'En producción · Iniciativa comercial',
      highlights: [
        'Next.js 16 App Router con Turbopack y React 19',
        'Presupuestador interactivo y catálogo por etapas',
        'Enfoque comercial y canales directos de consulta'
      ]
    },
    en: {
      title: 'Nicolini Design',
      tagline: 'Independent web design and development business',
      description:
        'Independent commercial initiative providing bespoke website design and engineering for businesses, combining modern Next.js architecture, responsive layouts, and conversion-focused customer communication.',
      categoryLabel: 'Web Design / Initiative',
      statusLabel: 'Live in production · Commercial initiative',
      highlights: [
        'Next.js 16 App Router with Turbopack and React 19',
        'Interactive quote estimator and scoped service tiers',
        'Direct contact channels and performance analytics'
      ]
    }
  }
];

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getAllProjects(): Project[] {
  return [...projects].sort((a, b) => a.priorityOrder - b.priorityOrder);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
