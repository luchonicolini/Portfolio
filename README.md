# Luciano Nicolini — Portfolio

**Mobile & Web Developer · Argentina**

Construyo aplicaciones y productos web, desde la idea inicial hasta una experiencia que se pueda usar.

Trabajo principalmente con **SwiftUI, Flutter, React y Next.js**. Me interesan los productos que resuelven problemas concretos, las interfaces cuidadas y las decisiones técnicas que tienen sentido para cada proyecto.

Este repositorio contiene mi portafolio personal: proyectos, casos de estudio y un laboratorio de experimentos de interfaz.

[Ver proyectos](#proyectos) · [Developer Lab](#developer-lab) · [Nicolini Design](https://nicolini-design.vercel.app/) · [GitHub](https://github.com/luchonicolini)

---

## Proyectos

### 01 · Puente
**Flutter · Dart · Riverpod · Accesibilidad**

Aplicación móvil para facilitar la comunicación cotidiana de personas sordas o con dificultades auditivas. Explora herramientas de asistencia en conversaciones, privacidad del audio y preferencias guardadas localmente.

*Estado: MVP funcional en desarrollo.*

[Repositorio](https://github.com/luchonicolini/Puente_Flutter)

### 02 · DolarTo
**SwiftUI · iOS · MVVM · API REST**

Aplicación nativa de iOS para consultar y comparar cotizaciones del dólar en Argentina, desarrollada con SwiftUI e integración con DolarApi.

*Estado: aplicación iOS publicada.*

[Repositorio](https://github.com/luchonicolini/DolarToApp)

### 03 · StitchHub
**Next.js · React · TypeScript · Supabase**

Plataforma para descubrir y compartir ideas de interfaces, componentes frontend y código creativo. Combina diseño visual con autenticación, perfiles y colecciones.

[Ver sitio](https://stitch-hub-one.vercel.app) · [Repositorio](https://github.com/luchonicolini/StitchHub)

### 04 · LeadRadar
**Next.js · TypeScript · PostgreSQL · Playwright**

Herramienta interna de prospección B2B y auditoría de sitios web. Organiza oportunidades comerciales y automatiza parte del análisis técnico.

*Estado: sistema interno y caso de estudio de ingeniería.*

### 05 · Rial Electrónica
**Next.js · React · TypeScript · Diseño web**

Demostración independiente de rediseño de un catálogo de productos electrónicos, con navegación responsive, filtros y consultas por WhatsApp.

*Es una propuesta no oficial, no un trabajo contratado por la empresa.*

[Ver demo](https://rialelectronic-demo.vercel.app) · [Repositorio](https://github.com/luchonicolini/Rialelectronic_demo)

### 06 · ScopeGuard
**Flutter · Riverpod · Material 3**

Prototipo móvil para estructurar alcances de trabajo y solicitudes de cambio en proyectos.

*Estado: desarrollo inicial.*

[Repositorio](https://github.com/luchonicolini/QuoteFlow_Flutter)

### 07 · Nicolini Design
**Next.js · React · TypeScript · Tailwind CSS**

Mi emprendimiento independiente de diseño y desarrollo web para negocios y profesionales.

Con Nicolini Design trabajo en una propuesta orientada a explicar servicios con claridad y facilitar el contacto directo con potenciales clientes. Es el punto de encuentro entre mi trabajo técnico y el desarrollo de un proyecto comercial propio.

[Visitar Nicolini Design](https://nicolini-design.vercel.app/) · [Repositorio](https://github.com/luchonicolini/Emprendimiento-web)

---

## Developer Lab

El portafolio incluye un espacio interactivo para explorar diseño e ingeniería frontend:

- **Button Builder:** controles visuales para personalizar botones y exportar CSS.
- **Spring Physics:** experimentos con movimiento y parámetros físicos.
- **Typography Playground:** pruebas de tipografía y composición.
- **Design Tokens:** colores, variables y contraste.
- **Layout Animation:** cambios de disposición con transiciones.
- **SVG Animation:** gráficos vectoriales interactivos.

No es una galería de efectos: es un lugar donde pruebo ideas y técnicas que pueden resultar útiles en otros productos.

---

## Sobre este portafolio

Quería evitar el típico portafolio armado como una sucesión de tarjetas. Opté por una dirección **editorial neo-brutalista**, con tipografía protagonista, contrastes marcados, composiciones asimétricas y movimiento discreto.

Está desarrollado con **Next.js 16, React 19, TypeScript, Tailwind CSS v4, CSS Modules, Motion y next-intl**. Incluye contenido en español e inglés, casos de estudio individuales y diseño responsive.

La calidad del proyecto se verifica con **Vitest, Playwright, Axe, Lighthouse CI, ESLint, TypeScript y GitHub Actions**.

## Desarrollo local

La versión que incorpora Nicolini Design se encuentra actualmente en la rama `feature/nicolini-design-integration`. La publicación definitiva del portafolio todavía está pendiente.

```bash
git clone https://github.com/luchonicolini/Portfolio.git
cd Portfolio
git switch feature/nicolini-design-integration
npm ci
npm run dev
```

Abrir `http://localhost:3000`.

Para ejecutar las comprobaciones automatizadas:

```bash
npm run check
```

Documentación técnica: [arquitectura](docs/ARCHITECTURE.md) · [sistema de diseño](docs/DESIGN_SYSTEM.md) · [accesibilidad](docs/ACCESSIBILITY.md) · [roadmap](ROADMAP.md).

---

## Contacto

Si querés conocer mi trabajo o conversar sobre un proyecto, podés encontrarme en:

- [GitHub — luchonicolini](https://github.com/luchonicolini)
- [Nicolini Design — Desarrollo web para negocios](https://nicolini-design.vercel.app/)

---

*Diseñado y desarrollado por Luciano Nicolini · Argentina.*
