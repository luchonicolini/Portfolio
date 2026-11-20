interface CaseFeature {
  title: string;
  desc: string;
}

interface ArchitectureStep {
  step: number;
  label: string;
  detail: string;
}

interface CaseCopy {
  overview: string;
  problem: string;
  solution: string;
  implementation: string;
  architecture: string;
  design: string;
  testing: string;
  limitations: string;
  platforms: string;
  statusBadge: string;
  features: CaseFeature[];
  disclaimer?: string;
  architectureSteps?: ArchitectureStep[];
}

export interface CaseStudy {
  es: CaseCopy;
  en: CaseCopy;
}

export const caseStudies: Record<string, CaseStudy> = {
  puente: {
    es: {
      overview:
        'Herramienta de comunicación inclusiva, privada y accesible, pensada para la autonomía cotidiana de personas sordas o con dificultades auditivas.',
      problem:
        'Reducir las barreras de comunicación que experimentan las personas sordas o con dificultades auditivas en interacciones presenciales cotidianas (trámites, comercios y consultas), donde la agilidad y la claridad del intercambio resultan determinantes.',
      solution:
        'Una app móvil en Flutter que combina texto a voz, transcripción bajo demanda y frases rápidas locales con control explícito de turnos y privacidad.',
      implementation:
        'Flujo conversacional asistido con selección explícita de turnos, reconocimiento de voz (STT), síntesis de voz (TTS), confirmación obligatoria de datos sensibles antes de su reproducción, banco local de frases frecuentes y respuesta háptica en transiciones.',
      architecture:
        'Estructura modular en Flutter y Dart dividida en capas de core, dominio y funcionalidades (features). Gestión reactiva del estado mediante Riverpod y control estricto del ciclo de vida del audio bajo demanda, sin transmisión ni persistencia en servidores externos.',
      design:
        'Jerarquía visual accesible y de alto contraste con tipografía Figtree. La pieza gráfica de bienvenida es una ilustración conceptual de onboarding orientada a guiar el uso del servicio, no una captura de la interfaz en ejecución.',
      testing:
        'Arquitectura por capas validada con pruebas unitarias en Riverpod, control de contrastes WCAG AA y pruebas de interfaz en emuladores.',
      limitations:
        'El MVP sigue en desarrollo activo; la validación con personas usuarias y las pruebas en dispositivos físicos están pendientes. El reconocimiento de voz no se garantiza completamente sin conexión ni validez clínica.',
      platforms: 'iOS / Android (Flutter)',
      statusBadge: 'MVP en desarrollo activo',
      disclaimer:
        'Ilustración conceptual de onboarding; no representa una captura de pantalla de la aplicación en ejecución.',
      features: [
        {
          title: 'Texto a voz (TTS)',
          desc: 'Conversión rápida de mensajes escritos a voz sintética para responder al entorno.'
        },
        {
          title: 'Transcripción de voz',
          desc: 'Escucha bajo demanda con confirmación visual de lo expresado por la otra persona.'
        },
        {
          title: 'Conversación bidireccional',
          desc: 'Selector explícito de turnos para evitar superposiciones y malentendidos.'
        },
        {
          title: 'Confirmación de datos',
          desc: 'Verificación estructurada previa para números de documento, direcciones y montos.'
        },
        {
          title: 'Frases rápidas locales',
          desc: 'Respuestas cotidianas guardadas en el dispositivo sin envío a servidores externos.'
        }
      ]
    },
    en: {
      overview:
        'Inclusive, private, and accessible communication tool designed for daily autonomy for deaf and hard-of-hearing users.',
      problem:
        'Bridge communication barriers faced by deaf and hard-of-hearing individuals in daily in-person interactions (retail, public services, consultations), where conversational speed and mutual clarity are vital.',
      solution:
        'A Flutter mobile application combining text-to-speech, on-demand transcription, and local quick phrases with explicit turn management and privacy.',
      implementation:
        'Assisted conversational flow featuring explicit turn-taking, speech-to-text (STT), text-to-speech (TTS), explicit confirmation before vocalizing sensitive information, locally stored quick phrases, and haptic feedback during key transitions.',
      architecture:
        'Modular architecture in Flutter and Dart separated into core, domain, and feature layers. Decoupled state management using Riverpod with an explicitly controlled on-demand audio lifecycle, ensuring no external audio streaming or retention.',
      design:
        'High-contrast accessible hierarchy using Figtree typography and generous touch areas. The featured artwork is an onboarding illustration designed to guide expectations, not a live application screenshot.',
      testing:
        'Layered architecture validated with Riverpod unit tests, WCAG AA contrast verification, and emulator interface tests.',
      limitations:
        'The MVP remains in active development; user validation and physical-device testing are pending. Speech recognition is not guaranteed to work entirely offline or provide clinical efficacy.',
      platforms: 'iOS / Android (Flutter)',
      statusBadge: 'MVP in active development',
      disclaimer:
        'Conceptual onboarding illustration; does not depict a live application screenshot.',
      features: [
        {
          title: 'Text to speech (TTS)',
          desc: 'Quick conversion of typed phrases into spoken audio for conversational responses.'
        },
        {
          title: 'Speech transcription',
          desc: 'On-demand listening with visual confirmation of spoken words from conversational partners.'
        },
        {
          title: 'Two-way conversation',
          desc: 'Explicit turn selector to avoid conversational overlaps and miscommunications.'
        },
        {
          title: 'Data confirmation',
          desc: 'Structured confirmation step before communicating IDs, addresses, and payment sums.'
        },
        {
          title: 'Local quick phrases',
          desc: 'Frequently used phrases stored entirely on-device without cloud retention.'
        }
      ]
    }
  },
  dolarto: {
    es: {
      overview:
        'Aplicación nativa para iOS construida en SwiftUI con arquitectura MVVM para consultar y convertir cotizaciones del dólar en Argentina.',
      problem:
        'Proveer una herramienta nativa para iOS que permita consultar, comparar y calcular conversiones entre las distintas cotizaciones del dólar en Argentina con mínima latencia y navegación ágil.',
      solution:
        'Un cliente iOS nativo desacoplado con arquitectura MVVM, consumo de la API pública DolarApi y pantalla de conversión interactiva.',
      implementation:
        'Consumo asíncrono del servicio público DolarApi, categorización de tipos de cambio (oficial, blue, tarjeta, MEP, CCL), vista de detalle con calculadora de conversión bidireccional y actualización manual o reactiva.',
      architecture:
        'Arquitectura MVVM nativa en Swift y SwiftUI, con separación clara entre modelos de datos, DolarNetworkManager para transporte HTTP y ViewModels que exponen estado mediante Combine a vistas declarativas.',
      design:
        'Adopción rigurosa de las Human Interface Guidelines de Apple: tipografía SF Pro con soporte Dynamic Type, agrupamiento en tarjetas contrastadas y jerarquía numérica clara para facilitar la lectura inmediata.',
      testing:
        'Separación de modelos y networking probada con Swift; componentes nativos adaptados a guías de interfaz humana de Apple.',
      limitations:
        'La disponibilidad y precisión de los valores dependen exclusivamente del servicio externo DolarApi; no se garantiza cotización financiera en tiempo real. La publicación en App Store fue reportada por el autor pero el enlace público exacto continúa en proceso de indexación/verificación.',
      platforms: 'iOS nativo (Swift / SwiftUI)',
      statusBadge: 'Lanzamiento iOS verificado',
      disclaimer:
        'Valores informativos provistos por DolarApi; la disponibilidad del enlace público en App Store se encuentra en verificación.',
      features: [
        {
          title: 'Cotizaciones DolarApi',
          desc: 'Consulta organizada por categorías: oficial, blue, bolsa, cripto y tarjeta.'
        },
        {
          title: 'Calculadora de conversión',
          desc: 'Conversión bidireccional entre pesos argentinos y dólares según el tipo seleccionado.'
        },
        {
          title: 'Componentes nativos',
          desc: 'Diseño respetuoso de las guías de Apple con soporte nativo para temas claro y oscuro.'
        },
        {
          title: 'Arquitectura MVVM',
          desc: 'Separación estricta entre modelos de dominio, vistas SwiftUI y capa de servicio de red.'
        }
      ]
    },
    en: {
      overview:
        'Native iOS application built in SwiftUI with MVVM architecture to inspect and convert Argentine dollar exchange rates.',
      problem:
        'Provide a lightweight native iOS tool to query, compare, and calculate conversions across different Argentine dollar exchange rates with minimal latency and swift navigation.',
      solution:
        'A decoupled native iOS client using MVVM architecture, public DolarApi integration, and an interactive conversion screen.',
      implementation:
        'Asynchronous consumption of the public DolarApi service, rate categorization (official, blue, card, MEP, CCL), detail view with bidirectional currency calculator, and reactive state updates.',
      architecture:
        'Native MVVM architecture in Swift and SwiftUI, isolating data models, DolarNetworkManager for HTTP transport, and Combine-backed ViewModels driving declarative views.',
      design:
        'Strict adherence to Apple Human Interface Guidelines: SF Pro typography with Dynamic Type support, high-contrast grouped cards, and distinct numerical hierarchy for instant readability.',
      testing:
        'Model and networking separation verified with Swift; native components adapted to Apple Human Interface Guidelines.',
      limitations:
        'Rate availability and accuracy depend entirely on the external public DolarApi service; real-time financial accuracy is not guaranteed. App Store publication was reported by the owner but the exact public listing URL is pending indexing/verification.',
      platforms: 'Native iOS (Swift / SwiftUI)',
      statusBadge: 'Verified iOS launch',
      disclaimer:
        'Informational exchange rates sourced from DolarApi; App Store public listing link is currently in verification.',
      features: [
        {
          title: 'DolarApi exchange rates',
          desc: 'Structured rates across market categories: official, blue, financial, and crypto.'
        },
        {
          title: 'Currency conversion',
          desc: 'Two-way calculator between Argentine pesos and dollars based on selected rates.'
        },
        {
          title: 'Native Apple controls',
          desc: 'Native SwiftUI components adhering to Apple Human Interface Guidelines.'
        },
        {
          title: 'MVVM architecture',
          desc: 'Clean separation between domain models, SwiftUI views, and networking services.'
        }
      ]
    }
  },
  stitchhub: {
    es: {
      overview:
        'Plataforma colaborativa para descubrir, publicar e interactuar con componentes visuales, ideas de interfaz y código de frontend.',
      problem:
        'Ofrecer una plataforma de descubrimiento visual y técnico donde desarrolladores y diseñadores puedan explorar, compartir y catalogar componentes de interfaz, fragmentos de código y prompts de diseño.',
      solution:
        'Una plataforma web con Next.js, Supabase para autenticación y persistencia, estética neo-brutalista e interactividad con Motion.',
      implementation:
        'Galería interactiva con filtros por categorías, búsqueda de patrones, visualización de código/detalles, perfiles de usuario, colecciones de guardados e interacciones entre usuarios.',
      architecture:
        'Aplicación full-stack en Next.js (App Router), TypeScript, Tailwind CSS y Supabase (Auth, Postgres y Storage), con microinteracciones implementadas mediante Motion.',
      design:
        'El lenguaje neo-brutalista usa bordes marcados, sombras duras y acentos planos para destacar los trabajos.',
      testing:
        'Validación full-stack en Next.js, tipado estricto con TypeScript, políticas de seguridad RLS en Supabase y pruebas de interfaz.',
      limitations:
        'Despliegue activo en Vercel para exploración pública. Las capturas de pantalla de la página principal reflejan datos demostrativos cargados en el entorno y no representan volumen de usuarios ni métricas comerciales verificadas.',
      platforms: 'Web (Next.js / Supabase)',
      statusBadge: 'Plataforma desplegada',
      disclaimer:
        'Las capturas reflejan datos de prueba del entorno de demostración; no corresponden a métricas de producto verificadas.',
      features: [
        {
          title: 'Descubrimiento visual',
          desc: 'Exploración de componentes e ideas de diseño mediante etiquetas y filtros.'
        },
        {
          title: 'Autenticación Supabase',
          desc: 'Gestión segura de cuentas de usuario, perfiles públicos y colecciones personales.'
        },
        {
          title: 'Prompts y código UI',
          desc: 'Publicación de código limpio junto a los prompts de diseño correspondientes.'
        },
        {
          title: 'Identidad neo-brutalista',
          desc: 'Estilo editorial con bordes negros, sombras duras y acentos de color plano.'
        }
      ]
    },
    en: {
      overview:
        'Collaborative platform to discover, share, and interact with visual UI components, interface ideas, and frontend code.',
      problem:
        'Provide a visual and technical discovery platform where developers and designers can explore, publish, and catalog UI components, code snippets, and generative design prompts.',
      solution:
        'A web platform built with Next.js, Supabase for authentication and database, neo-brutalist styling, and Motion interactions.',
      implementation:
        'Interactive gallery featuring category filters, pattern search, code/detail preview, author profiles, bookmarked collections, and user interactions.',
      architecture:
        'Full-stack application built with Next.js (App Router), TypeScript, Tailwind CSS, and Supabase (Auth, PostgreSQL, and Storage), with micro-interactions orchestrated via Motion.',
      design:
        'The neo-brutalist language uses strong borders, hard shadows, and flat accents to highlight work.',
      testing:
        'Full-stack Next.js validation, strict TypeScript typing, Supabase RLS security policies, and UI testing.',
      limitations:
        'Active Vercel deployment for public demonstration. Homepage screenshots reflect demonstrative seed data in the preview environment and do not represent verified production user volume or business metrics.',
      platforms: 'Web (Next.js / Supabase)',
      statusBadge: 'Deployed web platform',
      disclaimer:
        'Screenshots reflect preview environment test fixtures; they do not correspond to verified product metrics.',
      features: [
        {
          title: 'Visual discovery',
          desc: 'Explore UI components and prompt ideas through structured tags and search.'
        },
        {
          title: 'Supabase authentication',
          desc: 'Secure user authentication, public profile pages, and bookmark collections.'
        },
        {
          title: 'Prompts and code',
          desc: 'Share verified frontend code alongside generative prompts and design specs.'
        },
        {
          title: 'Neo-brutalist craft',
          desc: 'Editorial visual design with bold borders, hard shadows, and flat color accents.'
        }
      ]
    }
  },
  leadradar: {
    es: {
      overview:
        'Caso de estudio de ingeniería interna: sistema de prospección B2B y auditoría técnica automatizada con cola asíncrona.',
      problem:
        'Sistematizar la prospección B2B y la auditoría técnica de sitios web para pequeñas empresas, automatizando la recolección de métricas de rendimiento y accesibilidad sin intervención manual repetitiva.',
      solution:
        'Una arquitectura desacoplada con Next.js, PostgreSQL/Supabase, worker en segundo plano con cola atómica y salvaguardas anti-SSRF.',
      implementation:
        'Gestión de campañas con importación de listas CSV, normalización y deduplicación de registros, cola de procesamiento atómica respaldada por PostgreSQL con heartbeat/fencing de workers, y ejecución desatendida de auditorías headless mediante Playwright.',
      architecture:
        'Pipeline de procesamiento desacoplado en Next.js, TypeScript, Supabase/PostgreSQL y Zod para validación de esquemas en runtime. Incluye controles preventivos de red contra Server-Side Request Forgery (SSRF) mediante resolución DNS previa y listas de exclusión de rangos privados antes de abrir sockets.',
      design:
        'Presentación técnica estructurada mediante diagramas de arquitectura desinfectados y especificaciones de ingeniería. Se resguarda deliberadamente la confidencialidad omitiendo datos de prospectos, capturas privadas o credenciales operativas.',
      testing:
        'Pruebas de concurrencia de cola, verificación de transacciones atómicas en base de datos y validación de endpoints sanitizados con Vitest.',
      limitations:
        'Herramienta interna privada; no es un producto SaaS público. Las medidas de seguridad y mitigaciones SSRF descritas corresponden a especificaciones de diseño técnico y no constituyen garantías de seguridad certificadas independientemente.',
      platforms: 'Servidor / Cola asíncrona / Web',
      statusBadge: 'Herramienta interna / Caso técnico',
      disclaimer:
        'Arquitectura técnica desinfectada; no expone datos de prospectos ni capturas privadas.',
      architectureSteps: [
        {
          step: 1,
          label: 'Ingesta y Deduplicación',
          detail:
            'Importación de listas CSV con validación de esquemas vía Zod y deduplicación contra registros existentes.'
        },
        {
          step: 2,
          label: 'Cola Atómica y Heartbeat',
          detail:
            'Asignación concurrente segura de tareas respaldada por PostgreSQL con heartbeat y fencing de workers.'
        },
        {
          step: 3,
          label: 'Mitigación SSRF Pre-conexión',
          detail:
            'Resolución DNS anticipada y bloqueo estricto de bloques CIDR privados, loopback y metadatos de nube.'
        },
        {
          step: 4,
          label: 'Auditoría con Playwright',
          detail:
            'Inspección headless desatendida con extracción y persistencia de evidencias técnicas sanitizadas.'
        }
      ],
      features: [
        {
          title: 'Cola de tareas atómica',
          desc: 'Gestión de trabajos con heartbeat, control de leasing y fencing para evitar doble ejecución.'
        },
        {
          title: 'Auditorías de navegador',
          desc: 'Análisis automatizado de sitios de prospectos para detectar oportunidades técnicas.'
        },
        {
          title: 'Mitigaciones anti-SSRF',
          desc: 'Validación previa de resolución DNS, bloqueo de rangos privados y timeout de socket.'
        },
        {
          title: 'Procesamiento CSV',
          desc: 'Importación estructurada con normalización de dominios y deduplicación por hash.'
        }
      ]
    },
    en: {
      overview:
        'Internal engineering case study: B2B prospecting and automated technical auditing system with asynchronous queue.',
      problem:
        'Systematize B2B discovery and technical website auditing for small businesses, automating performance and accessibility health checks without repetitive manual inspection.',
      solution:
        'A decoupled architecture with Next.js, PostgreSQL/Supabase, background worker with atomic queue, and anti-SSRF mitigations.',
      implementation:
        'Campaign management with CSV list ingestion, record normalization and deduplication, atomic PostgreSQL task queue with worker heartbeat/fencing, and headless browser audit execution using Playwright.',
      architecture:
        'Decoupled background processing pipeline using Next.js, TypeScript, Supabase/PostgreSQL, and Zod runtime validation. Incorporates pre-connection network SSRF mitigations through pre-socket DNS resolution and private CIDR block denylists.',
      design:
        'Technical case study structured around sanitized architecture diagrams and engineering documentation. Confidentiality is preserved by omitting prospect records, proprietary interface captures, and private access links.',
      testing:
        'Queue concurrency tests, database atomic transaction verification, and sanitized endpoint validation with Vitest.',
      limitations:
        'Private internal tooling; not a public SaaS platform. Documented security safeguards and SSRF mitigations reflect technical design specifications rather than third-party audited security certifications.',
      platforms: 'Server / Asynchronous queue / Web',
      statusBadge: 'Internal tool / Engineering case',
      disclaimer:
        'Sanitized technical architecture; contains no prospect records or proprietary screenshots.',
      architectureSteps: [
        {
          step: 1,
          label: 'Ingestion & Deduplication',
          detail:
            'CSV list ingestion with Zod runtime validation and deduplication against stored records.'
        },
        {
          step: 2,
          label: 'Atomic Queue & Heartbeat',
          detail:
            'Safe concurrent job assignment backed by PostgreSQL with worker heartbeat and fencing.'
        },
        {
          step: 3,
          label: 'Pre-connection SSRF Mitigations',
          detail:
            'Pre-socket DNS resolution with strict denylisting of private CIDR blocks, loopback, and cloud metadata.'
        },
        {
          step: 4,
          label: 'Playwright Auditing',
          detail:
            'Headless automated inspection extracting and persisting sanitized technical metrics.'
        }
      ],
      features: [
        {
          title: 'Atomic worker queue',
          desc: 'Task processing with heartbeat, leasing renewal, and fencing to prevent duplicate execution.'
        },
        {
          title: 'Automated browser audits',
          desc: 'Automated site inspection to detect technical deficiencies and modernization opportunities.'
        },
        {
          title: 'Anti-SSRF mitigations',
          desc: 'Pre-connection DNS validation, private IP range rejection, and strict connection timeouts.'
        },
        {
          title: 'Campaign deduplication',
          desc: 'CSV ingestion pipeline with domain normalization and SHA-based duplicate detection.'
        }
      ]
    }
  },
  'rial-electronica': {
    es: {
      overview:
        'Demostración independiente y no oficial de rediseño de catálogo comercial para un comercio local de productos electrónicos.',
      problem:
        'Explorar un rediseño moderno para el catálogo comercial de una tienda de electrónica de consumo, optimizando la consulta de productos y la solicitud de cotizaciones en un mercado con múltiples tipos de cambio.',
      solution:
        'Una demostración interactiva en Next.js con catálogo estructurado, filtrado por categorías, lista de cotización y derivación a WhatsApp.',
      implementation:
        'Catálogo interactivo con filtrado por categorías, vista detallada de producto, generador de lista de presupuesto y derivación estructurada del pedido hacia WhatsApp con el detalle de ítems precargado.',
      architecture:
        'Aplicación frontend desarrollada en Next.js, React, TypeScript y Tailwind CSS, con gestión de estado del carrito/cotización mediante React Context y animaciones de transición fluidas.',
      design:
        'Composición de comercio electrónico de alto contraste, fichas de producto legibles con especificaciones técnicas claras y flujo directo de conversión a mensajería sin fricciones de checkout complejo.',
      testing:
        'Pruebas de interfaz responsiva, persistencia de estado de cotización en cliente y validación de accesibilidad WCAG AA.',
      limitations:
        'Demostración técnica e interactiva independiente y no oficial; no constituye un encargo comisionado por la empresa ni procesa pagos reales o transacciones comerciales. El catálogo y los testimonios son datos simulados.',
      platforms: 'Web (Next.js / React)',
      statusBadge: 'Demostración comercial independiente',
      disclaimer:
        'Demostración técnica independiente y no oficial; no asociada con la marca comercial ni habilitada para pagos reales.',
      features: [
        {
          title: 'Catálogo responsivo',
          desc: 'Exploración de productos electrónicos con filtros por categoría y búsqueda.'
        },
        {
          title: 'Lista de cotización',
          desc: 'Selección de productos en un carrito ligero sin necesidad de registro.'
        },
        {
          title: 'Handoff a WhatsApp',
          desc: 'Generación de mensaje preformateado con los productos seleccionados para contacto directo.'
        },
        {
          title: 'Sin pasarela de pago',
          desc: 'Enfoque en consulta comercial y asesoramiento directo con el comercio.'
        }
      ]
    },
    en: {
      overview:
        'Independent, unofficial commercial catalog redesign demonstration for a local electronics retail business.',
      problem:
        'Explore a modern redesign for an electronics retail catalog, streamlining product exploration and quote requests in a market with multi-currency reference pricing.',
      solution:
        'An interactive Next.js demonstration with structured catalog, category filtering, quotation list, and WhatsApp handoff.',
      implementation:
        'Interactive catalog with category filtering, product detail views, quote list builder, and pre-formatted order handoff to WhatsApp with itemized quotation summaries.',
      architecture:
        'Frontend application built with Next.js, React, TypeScript, and Tailwind CSS, utilizing React Context for quotation cart state and smooth transition animations.',
      design:
        'High-contrast commercial composition, clear technical product specifications, and a streamlined quotation conversion flow avoiding complex checkout friction.',
      testing:
        'Responsive UI testing, client-side quotation state persistence, and WCAG AA accessibility validation.',
      limitations:
        'Independent, unofficial technical demonstration; it is not a commissioned client engagement and does not process real payments or financial transactions. Catalog items and testimonials are mock data.',
      platforms: 'Web (Next.js / React)',
      statusBadge: 'Independent commercial demo',
      disclaimer:
        'Independent, unofficial technical demonstration; not affiliated with the brand nor enabled for real payment processing.',
      features: [
        {
          title: 'Responsive catalog',
          desc: 'Electronics catalog browsing with category filtering and real-time search.'
        },
        {
          title: 'Quotation cart',
          desc: 'Lightweight product selection cart without mandatory account registration.'
        },
        {
          title: 'WhatsApp handoff',
          desc: 'Preformatted WhatsApp message generation with itemized product quotation.'
        },
        {
          title: 'Direct merchant contact',
          desc: 'Focus on direct consultative sales without third-party payment gateways.'
        }
      ]
    }
  },
  scopeguard: {
    es: {
      overview:
        'Fundación demostrativa móvil Android-first para explorar la gestión de alcances y solicitudes de cambio en proyectos de software.',
      problem:
        'Investigar una solución mobile-first que ayude a profesionales independientes a documentar el alcance de proyectos y registrar solicitudes de cambio formales para evitar la desviación descontrolada del trabajo (scope creep).',
      solution:
        'Un prototipo local en Flutter con Material 3, navegación GoRouter y arquitectura de estado con Riverpod para validar el flujo de alcance.',
      implementation:
        'Fundación móvil en Android con formulario de definición de entregables, cálculo estimativo de presupuesto y bosquejo del portal web de aprobación para clientes.',
      architecture:
        'Base de código en Flutter y Dart estructurada con Material 3, Riverpod para el estado local y GoRouter para la navegación modular; repositorio monorepo que alberga la app móvil y un workspace web exploratorio en Next.js.',
      design:
        'El prototipo prioriza una estructura móvil para explorar el flujo con jerarquía clara de tarjetas.',
      testing:
        'Pruebas de widgets y navegación en emulador Android, verificación de componentes Material 3 y desacoplamiento de capas.',
      limitations:
        'Prototipo de laboratorio demostrativo local. No cuenta con backend remoto, base de datos persistente, cuentas de usuario, enlaces compartidos ni aprobaciones reales; representan metas de desarrollo futuras.',
      platforms: 'Android-first (Flutter / Material 3)',
      statusBadge: 'Fundación demostrativa en desarrollo',
      disclaimer:
        'Fundación prototípica local sin backend ni persistencia; las aprobaciones de clientes son objetivos futuros.',
      features: [
        {
          title: 'Android-first Material 3',
          desc: 'Componentes modernos de diseño adaptados a las directrices de Android y Flutter.'
        },
        {
          title: 'Navegación GoRouter',
          desc: 'Enrutamiento declarativo estructurado por pantallas de proyectos y solicitudes.'
        },
        {
          title: 'Estado con Riverpod',
          desc: 'Gestión reactiva de proyectos, entregables y registro de cambios propuestos.'
        },
        {
          title: 'Fundación demostrativa',
          desc: 'Prototipo enfocado en validar la ergonomía del flujo antes de conectar servicios remotos.'
        }
      ]
    },
    en: {
      overview:
        'Android-first mobile foundation prototype exploring scope management and change requests in software projects.',
      problem:
        'Investigate a mobile-first workflow helping independent professionals document project scopes and track formal change orders to mitigate uncontrolled scope creep.',
      solution:
        'A local Flutter prototype using Material 3, GoRouter navigation, and Riverpod state management to validate the scope workflow.',
      implementation:
        'Android-first mobile foundation featuring deliverable specification forms, preliminary budget estimators, and an exploratory web client sign-off interface.',
      architecture:
        'Flutter and Dart codebase adopting Material 3 design tokens, Riverpod for local state management, and GoRouter for declarative routing within a monorepo containing the mobile app and an exploratory Next.js approval workspace.',
      design:
        'The prototype prioritizes a mobile structure for exploring the flow with clean structured cards.',
      testing:
        'Widget and navigation tests on Android emulator, Material 3 component verification, and layer decoupling.',
      limitations:
        'Early-stage local lab demonstration prototype. Does not include a remote backend, persistent database, user accounts, shared links, or real approvals; these represent future roadmap objectives.',
      platforms: 'Android-first (Flutter / Material 3)',
      statusBadge: 'Demonstration foundation in progress',
      disclaimer:
        'Local prototype foundation without backend or persistence; client approvals are future objectives.',
      features: [
        {
          title: 'Android-first Material 3',
          desc: 'Modern UI components tailored to Android design principles and Flutter tokens.'
        },
        {
          title: 'GoRouter navigation',
          desc: 'Declarative routing structure separating project list and change-request flows.'
        },
        {
          title: 'Riverpod state',
          desc: 'Reactive state management modeling scopes, milestones, and proposed modifications.'
        },
        {
          title: 'Proof-of-concept focus',
          desc: 'Ergonomic mobile flow validation prior to implementing cloud backend services.'
        }
      ]
    }
  }
};

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies[slug];
}

export function getAllCaseStudySlugs(): string[] {
  return Object.keys(caseStudies);
}

export function hasCaseStudy(slug: string): boolean {
  return Boolean(caseStudies[slug]);
}
