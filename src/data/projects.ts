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
  alt: string;
  width: number;
  height: number;
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
    technologies: ['Flutter', 'Dart', 'Riverpod', 'STT/TTS', 'Offline-first'],
    repositoryUrl: 'https://github.com/luchonicolini/Puente_Flutter',
    image: {
      src: '/projects/puente/preview.png',
      alt: 'Puente — Pantalla de incorporación y comunicación accesible',
      width: 1080,
      height: 1080
    },
    es: {
      title: 'Puente',
      tagline: 'Accesibilidad y comunicación sin barreras',
      description:
        'Aplicación móvil en Flutter diseñada para que personas sordas o con dificultades auditivas se desenvuelvan con mayor autonomía en situaciones cotidianas, sin almacenar audio ni depender de servidores externos.',
      categoryLabel: 'Mobile / Accesibilidad',
      statusLabel: 'MVP funcional en desarrollo activo',
      highlights: [
        'Arquitectura por capas con Riverpod',
        'Ciclo de vida y privacidad de audio estricto',
        'Detección y contrastación segura de datos'
      ]
    },
    en: {
      title: 'Puente',
      tagline: 'Inclusive communication and accessibility',
      description:
        'Flutter mobile application designed to bridge communication gaps for deaf and hard-of-hearing users in daily interactions, completely offline-first with zero external audio storage.',
      categoryLabel: 'Mobile / Accessibility',
      statusLabel: 'Functional MVP in active development',
      highlights: [
        'Layered architecture with Riverpod',
        'Strict audio lifecycle & privacy controls',
        'Safe structured data confirmation'
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
      alt: 'DolarTo — Captura de cotizaciones en tiempo real en iOS',
      width: 383,
      height: 830
    },
    es: {
      title: 'DolarTo',
      tagline: 'Cotizaciones del dólar en tiempo real',
      description:
        'Aplicación nativa para iOS construida en SwiftUI con arquitectura MVVM para consultar y comparar cotizaciones del dólar en Argentina mediante DolarApi, con foco en simplicidad y velocidad.',
      categoryLabel: 'iOS Nativo / SwiftUI',
      statusLabel: 'Lanzamiento iOS / SwiftUI',
      highlights: [
        'Arquitectura MVVM desacoplada',
        'Integración reactiva con DolarApi',
        'Interfaz nativa fluida y ligera'
      ]
    },
    en: {
      title: 'DolarTo',
      tagline: 'Real-time currency exchange rates',
      description:
        'Native iOS application built with SwiftUI and MVVM architecture to track and compare Argentine peso to USD exchange rates via DolarApi, optimized for clarity and speed.',
      categoryLabel: 'Native iOS / SwiftUI',
      statusLabel: 'Native iOS Release',
      highlights: [
        'Clean MVVM architecture',
        'Reactive DolarApi integration',
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
      alt: 'StitchHub — Plataforma de descubrimiento visual de interfaces',
      width: 1280,
      height: 720
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
    repositoryUrl: 'https://github.com/luchonicolini/Oportunidades_laborales',
    es: {
      title: 'LeadRadar',
      tagline: 'Motor de prospección B2B y auditoría web',
      description:
        'Sistema privado de prospección automatizada y auditoría técnica de sitios web para detección de oportunidades comerciales, con cola de trabajo distribuida, deduplicación y controles SSRF.',
      categoryLabel: 'Ingeniería / Automatización',
      statusLabel: 'Herramienta interna / Caso técnico',
      highlights: [
        'Cola atómica con heartbeat y fencing',
        'Auditoría automatizada con Playwright',
        'Controles de seguridad pre-conexión SSRF'
      ]
    },
    en: {
      title: 'LeadRadar',
      tagline: 'B2B prospecting and automated web audit',
      description:
        'Private B2B prospecting and automated technical website audit platform featuring distributed background workers, prospect deduplication, and pre-connection SSRF safeguards.',
      categoryLabel: 'Engineering / Automation',
      statusLabel: 'Internal System / Case Study',
      highlights: [
        'Atomic queue with heartbeat fencing',
        'Automated audits with Playwright',
        'Robust SSRF security controls'
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
      alt: 'Rial Electrónica — Vista previa del catálogo de productos',
      width: 600,
      height: 400
    },
    es: {
      title: 'Rial Electrónica',
      tagline: 'Demostración de rediseño de catálogo comercial',
      description:
        'Demostración independiente e interactiva de rediseño para catálogo de productos electrónicos, con navegación responsiva, derivación de cotización a WhatsApp y cotizador dinámico.',
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
      tagline: 'Commercial catalog redesign demonstration',
      description:
        'Independent, unofficial e-commerce catalog redesign demo featuring a responsive product grid, animated interactions, and direct WhatsApp quotation handoff.',
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
      tagline: 'Control de alcance y presupuestos para freelancers',
      description:
        'Herramienta móvil en desarrollo orientada a profesionales independientes y desarrolladores para definir alcances técnicos, documentar cambios y gestionar aprobaciones sin fricción.',
      categoryLabel: 'Mobile / En desarrollo',
      statusLabel: 'En desarrollo (fundación demostrativa)',
      highlights: [
        'Diseño mobile-first en Material 3',
        'Gestión reactiva de estado con Riverpod',
        'Registro y control de modificaciones'
      ]
    },
    en: {
      title: 'ScopeGuard',
      tagline: 'Scope definition and change tracking for freelancers',
      description:
        'Early-stage mobile product tailored for independent contractors and developers to define project scope, document change requests, and streamline client sign-offs.',
      categoryLabel: 'Mobile / In Development',
      statusLabel: 'In Development (Early Foundation)',
      highlights: [
        'Mobile-first Material 3 UI',
        'Reactive state with Riverpod',
        'Scope and change tracking model'
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
