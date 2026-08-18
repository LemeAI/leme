import type { Dictionary } from "./en";

export const es: Dictionary = {
  site: {
    name: "Leme",
    tagline: "Sube HTML generado por IA y compártelo con un enlace",
    description:
      "Sube archivos HTML generados por IA y compártelos con cualquiera a través de un enlace. Colabora con comentarios, sugerencias y forks.",
  },
  nav: {
    plans: "Planes",
    blog: "Blog",
    myFiles: "Mis archivos",
    newUpload: "Nueva subida",
    signIn: "Iniciar sesión",
    signOut: "Cerrar sesión",
  },
  home: {
    heroBadge: "HTML generado por IA, listo para compartir",
    heroTitle: "Convierte lo que construyes con IA en páginas que cualquiera puede abrir",
    heroDescription:
      "Sube el HTML generado por tu herramienta de IA favorita, obtén un enlace compartible en segundos y permite que las personas comenten, sugieran cambios o hagan un fork.",
    ctaUpload: "Sube tu HTML",
    ctaPlans: "Ver planes",
    heroNote: "No se necesita cuenta para probar — las páginas que subes sin iniciar sesión se guardan en este navegador.",
    featureUpload: "Subir",
    featureUploadDesc: "Arrastra cualquier archivo .html de hasta 2MB — sin build, sin configuración.",
    featureShare: "Compartir",
    featureShareDesc: "Cada subida obtiene su propia página y enlace, listo para enviar.",
    featureCollaborate: "Colaborar",
    featureCollaborateDesc: "Los visitantes pueden comentar, sugerir cambios o hacer un fork de tu página.",
    featureControl: "Mantén el control",
    featureControlDesc: "El plan gratuito tiene límites y una marca de agua; Pro elimina ambos.",
    howTitle: "Cómo funciona",
    howSubtitle: "De un prompt de IA a un enlace público en cuatro pasos.",
    step1: "Generar",
    step1Desc: "Pide a ChatGPT, Claude, Gemini o cualquier asistente de IA un único archivo HTML.",
    step2: "Guardar",
    step2Desc: "Copia el código HTML y guárdalo como un archivo .html en tu computadora.",
    step3: "Subir",
    step3Desc: "Arrastra el archivo a Leme y añade un título y descripción.",
    step4: "Compartir",
    step4Desc: "Obtén un enlace público como leme.app/p/xyz y compártelo en cualquier lugar.",
    toolsTitle: "Funciona con tus herramientas de IA favoritas",
    toolsSubtitle: "Sube HTML generado por los asistentes de código y constructores de apps más populares.",
    finalTitle: "¿Listo para compartir lo que creaste?",
    finalSubtitle: "Toma menos de un minuto — no se requiere registro para empezar.",
  },
  footer: {
    product: "Producto",
    resources: "Recursos",
    social: "Social",
    features: "Funciones",
    pricing: "Precios",
    useCases: "Casos de uso",
    about: "Acerca de",
    blog: "Blog",
    faq: "FAQ",
    terms: "Términos",
    privacy: "Privacidad",
    contact: "Contacto",
    rights: "Todos los derechos reservados.",
    madeFor: "Hecho para HTML generado por IA.",
  },
  pricing: {
    title: "Planes simples, sin trucos",
    subtitle:
      "Úsalo sin crear cuenta para probar rápido, crea una cuenta gratuita para guardar más páginas, o elige Pro cuando quieras mantener todo online sin límites.",
    noAccount: {
      name: "Sin cuenta",
      price: "$0",
      description: "Para probar rápido, sin registrarte.",
      features: {
        pages: "{count} página activa a la vez",
        expires: "Expira en {days} días",
        watermark: "Con marca de agua",
      },
      cta: "Usar ahora",
    },
    free: {
      name: "Gratis",
      price: "$0",
      description: "Crea una cuenta y obtén más espacio.",
      features: {
        pages: "{count} páginas activas al mismo tiempo",
        expires: "Expira en {days} días",
        watermark: "Con marca de agua",
      },
      cta: "Crear cuenta gratis",
    },
    pro: {
      name: "Pro",
      description: "Para quienes quieren mantener páginas online sin límites.",
      monthly: "Mensual",
      yearly: "Anual",
      priceUnitMonth: "mes",
      priceUnitYear: "año",
      yearlySavings: "2 meses gratis frente al pago mensual",
      features: ["Páginas activas ilimitadas", "Nunca expira", "Sin marca de agua"],
      cta: "Actualizar a Pro",
      ctaLoading: "Redirigiendo...",
    },
    footerNote: "Los pagos se procesan de forma segura con Stripe. Cancela en cualquier momento desde tus ajustes de facturación.",
  },
  common: {
    expiration: {
      expired: "expirado",
      oneDay: "expira en 1 día",
      days: "expira en {count} días",
    },
  },
  about: {
    metadataDescription:
      "Conoce Leme: una forma sencilla de subir páginas HTML generadas por IA y compartirlas con un enlace.",
    title: "Acerca de Leme",
    intro:
      "Leme fue creado para todos los que generan HTML con IA y necesitan una forma rápida y confiable de compartir el resultado. Sin configuración de hosting, sin pipeline de build: solo sube tu archivo y obtén un enlace que puedes enviar a cualquiera.",
    whyTitle: "Por qué lo creamos",
    whyText:
      "Las herramientas de IA pueden generar páginas HTML completas en segundos, pero publicarlas sigue siendo más difícil de lo necesario. Queríamos un lugar donde pudieras soltar un archivo, copiar un enlace y seguir adelante.",
    whatTitle: "Qué puedes hacer",
    whatItems: [
      "Sube archivos HTML únicos hasta el límite de tu plan",
      "Obtén una página pública y un enlace compartible al instante",
      "Recibe comentarios, sugerencias y forks de los visitantes",
      "Actualiza a Pro para páginas ilimitadas y sin marca de agua",
    ],
    cta: "Ver planes",
  },
  features: {
    metadataDescription:
      "Descubre las funciones de Leme: sube HTML, comparte enlaces, colabora con comentarios, sugerencias y forks.",
    title: "Funciones",
    subtitle: "Todo lo que necesitas para publicar y compartir páginas HTML generadas por IA.",
    items: [
      {
        title: "Subida instantánea",
        description: "Arrastra o selecciona un archivo HTML y obtén un enlace público en segundos.",
      },
      {
        title: "Páginas compartibles",
        description: "Cada subida se convierte en una página limpia con su propia URL, lista para compartir en cualquier lugar.",
      },
      {
        title: "Colaboración",
        description: "Los visitantes pueden dejar comentarios, sugerencias o hacer un fork de tu página para crear algo nuevo.",
      },
      {
        title: "No se necesita cuenta",
        description: "Prueba Leme sin registrarte. Crea una cuenta cuando quieras guardar más páginas.",
      },
      {
        title: "Plan Pro",
        description: "Elimina la marca de agua y mantén páginas ilimitadas online para siempre.",
      },
      {
        title: "Facturación sencilla",
        description: "Actualiza o cancela en cualquier momento desde tus ajustes de facturación.",
      },
    ],
  },
  faq: {
    metadataDescription:
      "Preguntas frecuentes sobre Leme: sube HTML generado por IA, comparte enlaces, colabora y gestiona tus planes.",
    metadataOpenGraphTitle: "Preguntas frecuentes de Leme — Respuestas claras",
    title: "Preguntas frecuentes",
    subtitle: "Todo lo que necesitas saber para subir, compartir y colaborar con Leme.",
    stillQuestionsTitle: "¿Todavía tienes dudas?",
    stillQuestionsText: "Envíanos un email a",
    items: [
      {
        question: "¿Qué es Leme?",
        answer:
          "Leme es una forma rápida de subir archivos HTML generados por IA y publicarlos como páginas web compartibles. Obtienes un enlace público al instante y los visitantes pueden comentar, sugerir cambios o hacer un fork de tu página.",
      },
      {
        question: "¿Cómo subo un archivo HTML?",
        answer:
          "Ve a la página de subida, arrastra o selecciona tu archivo .html, añade un título y una descripción opcional, y haz clic en Subir. Leme aloja el archivo y te da un enlace público en segundos.",
      },
      {
        question: "¿Necesito una cuenta para usar Leme?",
        answer:
          "No. Puedes subir sin registrarte. Las subidas anónimas se guardan en tu navegador, pero tienen límites más estrictos y expiran después de unos días. Crear una cuenta gratuita te da más páginas y mayor retención.",
      },
      {
        question: "¿Qué herramientas de IA funcionan con Leme?",
        answer:
          "Cualquier herramienta que exporte un único archivo .html funciona. Opciones populares incluyen ChatGPT, Claude, Gemini, v0, Lovable, Bolt, Replit y HTML escrito a mano desde cualquier generador de código.",
      },
      {
        question: "¿Cuál es el límite de tamaño de archivo?",
        answer:
          "El límite actual de subida es de 2 MB por archivo. Esto cubre la mayoría de landing pages, portafolios, dashboards y prototipos generados por IA. Si tu archivo es más grande, intenta comprimir imágenes o dividir la página.",
      },
      {
        question: "¿Puedo compartir una página con otra persona?",
        answer:
          "Sí. Cada página obtiene un enlace público como leme.app/p/[id]. También puedes crear un enlace de compartir dedicado desde la barra lateral, que es más fácil de copiar y enviar.",
      },
      {
        question: "¿Cómo funciona la colaboración?",
        answer:
          "Los visitantes con el enlace pueden abrir la barra lateral y dejar comentarios, sugerencias o forks. Los forks crean una nueva copia de la página que el contribuyente puede editar y compartir de vuelta.",
      },
      {
        question: "¿Qué sucede cuando una página expira?",
        answer:
          "Las páginas gratuitas y anónimas expiran después de su período de retención. Una vez expirada, la página ya no es visible. Las páginas Pro nunca expiran mientras la suscripción esté activa.",
      },
      {
        question: "¿Cuál es la diferencia entre Gratis y Pro?",
        answer:
          "El plan Gratis te permite mantener un número pequeño de páginas activas con una marca de agua de Leme. El plan Pro elimina la marca de agua, elimina el límite de páginas activas y mantiene las páginas online para siempre.",
      },
      {
        question: "¿Cuánto cuesta Pro?",
        answer:
          "Leme Pro cuesta $9 por mes o $90 por año. El plan anual ahorra el equivalente a dos meses frente al pago mensual.",
      },
      {
        question: "¿Puedo cancelar Pro en cualquier momento?",
        answer:
          "Sí. Puedes cancelar desde la página de facturación en cualquier momento. Tus beneficios Pro permanecen activos hasta el final del período de facturación actual.",
      },
      {
        question: "¿El contenido que subo es público?",
        answer:
          "Las páginas subidas a Leme son públicas por defecto a través de sus enlaces compartibles. Cualquiera con el enlace puede ver la página. No subas contenido sensible, privado o confidencial.",
      },
      {
        question: "¿Puedo eliminar una página?",
        answer:
          "Sí. Si creaste la página iniciando sesión, puedes eliminarla desde tu panel. Las páginas anónimas están vinculadas a tu navegador y se pueden eliminar desde la página Mis subidas.",
      },
      {
        question: "¿Leme funciona en móvil?",
        answer:
          "Sí. El sitio de Leme es responsive. Puedes subir, ver y compartir páginas desde cualquier navegador moderno en escritorio, tablet o móvil.",
      },
      {
        question: "¿Puedo usar mi propio dominio?",
        answer:
          "Aún no. Hoy cada página se aloja bajo leme.app. Los dominios personalizados están en la hoja de ruta para una futura versión.",
      },
      {
        question: "¿Leme admite CSS, JavaScript e imágenes dentro del HTML?",
        answer:
          "Sí. Un único archivo .html que incluya CSS, JavaScript e imágenes en base64 se renderizará correctamente. Los recursos externos vinculados por URL pueden cargar dependiendo de CORS y su disponibilidad.",
      },
      {
        question: "¿Cómo reporto abuso o contenido con derechos de autor?",
        answer:
          "Envía un email a hello@leme-app.com con el enlace de la página y una descripción. Revisamos los reportes y tomamos medidas contra el contenido que viole nuestros Términos de Servicio.",
      },
      {
        question: "¿Hay una API pública?",
        answer: "No. Leme está diseñado para subidas manuales a través de la interfaz web. El acceso por API no está disponible.",
      },
      {
        question: "¿Quién creó Leme?",
        answer:
          "Leme fue creado por un equipo pequeño enfocado en hacer que el HTML generado por IA sea fácil de publicar y compartir. Somos independientes, autofinanciados y sostenidos por suscripciones Pro de nuestros clientes.",
      },
      {
        question: "¿Cómo puedo contactaros?",
        answer: "Escríbenos a hello@leme-app.com o contáctanos a través de Twitter / X y LinkedIn.",
      },
    ],
  },
  aiLanding: {
    worksWith: "Funciona con {toolName}",
    howItWorks: "Cómo funciona",
    commonUseCases: "Casos de uso comunes",
    readyToPublish: "¿Listo para publicar tu HTML de {toolName}?",
    ctaUpload: "Sube tu HTML",
    noAccount: "Sube tu archivo y obtén un enlace público en segundos. No se necesita cuenta para probar.",
    whyUseLeme: "¿Por qué usar Leme con {toolName}?",
    whyPoints: [
      "Obtén un enlace público sin salir de tu navegador.",
      "Comparte la página con cualquiera, incluso si no tiene acceso a {toolName}.",
      "Recopila feedback, sugerencias y forks de los revisores.",
      "Mantén las páginas online para siempre con Leme Pro.",
    ],
  },
  aiTools: {
    chatgpt: {
      metadataTitle: "Aloja y comparte HTML de ChatGPT",
      metadataDescription:
        "Sube HTML generado por ChatGPT a Leme y obtén un enlace público compartible en segundos. No se necesita configuración de hosting.",
      ogTitle: "Aloja HTML de ChatGPT — Leme",
      ogDescription: "Sube HTML generado por ChatGPT y compártelo con un enlace público.",
      headline: "Aloja y comparte HTML de ChatGPT",
      description:
        "ChatGPT puede escribir páginas de aterrizaje, portafolios y prototipos completos en un solo archivo HTML. Sube ese archivo a Leme y obtén un enlace público que puedes compartir en cualquier lugar.",
      useCases: ["Landing pages de ChatGPT", "Portafolios de ChatGPT", "Prototipos de ChatGPT", "Sitios de una página de ChatGPT"],
      steps: [
        "Pide a ChatGPT que genere una página HTML completa y de un solo archivo con CSS inline. Por ejemplo: 'Crea una landing page responsive para un producto SaaS en un solo archivo HTML.'",
        "Copia la respuesta HTML completa y guárdala como page.html en tu computadora.",
        "Abre Leme, arrastra el archivo al formulario de subida y añade un título y una descripción opcional.",
        "Haz clic en Subir. Leme aloja la página y te da un enlace público como leme.app/p/xyz.",
        "Comparte el enlace con compañeros, clientes o en redes sociales. Los visitantes también pueden dejar comentarios y sugerencias.",
      ],
      schemaName: "Cómo publicar HTML de ChatGPT con Leme",
      schemaDescription:
        "Guía paso a paso para subir HTML generado por ChatGPT a Leme y obtener un enlace público compartible.",
    },
    bolt: {
      metadataTitle: "Aloja y comparte HTML de Bolt",
      metadataDescription:
        "Sube HTML generado por Bolt a Leme y obtén un enlace público compartible en segundos. Comparte prototipos y sitios de una página de Bolt sin un despliegue completo.",
      ogTitle: "Aloja HTML de Bolt — Leme",
      ogDescription: "Sube HTML generado por Bolt y compártelo con un enlace público.",
      headline: "Aloja y comparte HTML de Bolt",
      description:
        "Bolt crea apps full-stack a partir de prompts. Exporta una sola página HTML o una captura de tu proyecto Bolt y súbela a Leme para compartir una vista previa en vivo al instante.",
      useCases: ["Vistas previas de apps de Bolt", "Landing pages de Bolt", "Prototipos de Bolt", "Demos compartibles de Bolt"],
      steps: [
        "Genera una página o app en Bolt. Elige una sola pantalla o landing page que se pueda exportar como un archivo HTML independiente.",
        "Copia o exporta el código fuente HTML y guárdalo como page.html. Asegúrate de que los estilos y scripts estén inline para que el archivo funcione por sí solo.",
        "Sube el archivo a Leme y añade un título y descripción.",
        "Haz clic en Subir para obtener un enlace público como leme.app/p/xyz.",
        "Comparte el enlace con los interesados. Pueden revisar, comentar, sugerir o hacer un fork de la página.",
      ],
      schemaName: "Cómo publicar HTML de Bolt con Leme",
      schemaDescription:
        "Guía paso a paso para subir HTML generado por Bolt a Leme y obtener un enlace público compartible.",
    },
    claude: {
      metadataTitle: "Aloja y comparte HTML de Claude",
      metadataDescription:
        "Sube HTML generado por Claude a Leme y obtén un enlace público compartible en segundos. Perfecto para Claude Artifacts y prototipos.",
      ogTitle: "Aloja HTML de Claude — Leme",
      ogDescription: "Sube HTML generado por Claude y compártelo con un enlace público.",
      headline: "Aloja y comparte HTML de Claude",
      description:
        "Claude, incluyendo Claude Artifacts, puede generar páginas HTML pulidas y componentes. Súbelas a Leme para hacerlas públicas y compartibles sin ningún despliegue.",
      useCases: ["Alojamiento de Claude Artifacts", "Prototipos de Claude", "Landing pages de Claude", "Demos de componentes de Claude"],
      steps: [
        "Genera una página o artifact en Claude. Pide un único archivo HTML autocontenido con CSS y JavaScript inline.",
        "Cambia a la vista de código en el panel de Claude Artifact y copia el código HTML completo.",
        "Guarda el código como page.html en tu computadora.",
        "Sube el archivo a Leme, añade un título y haz clic en Subir.",
        "Copia el enlace público y compártelo. Los revisores pueden dejar comentarios, sugerencias o forks en la barra lateral.",
      ],
      schemaName: "Cómo publicar HTML de Claude con Leme",
      schemaDescription:
        "Guía paso a paso para subir HTML generado por Claude o Claude Artifacts a Leme y obtener un enlace público compartible.",
    },
    gemini: {
      metadataTitle: "Aloja y comparte HTML de Gemini",
      metadataDescription:
        "Sube HTML generado por Google Gemini a Leme y obtén un enlace público compartible en segundos. No se necesita hosting ni paso de build.",
      ogTitle: "Aloja HTML de Gemini — Leme",
      ogDescription: "Sube HTML generado por Gemini y compártelo con un enlace público.",
      headline: "Aloja y comparte HTML de Gemini",
      description:
        "Gemini puede generar páginas HTML, componentes y pequeñas apps web. Sube el archivo HTML generado a Leme y publícalo como una página en vivo con un enlace compartible.",
      useCases: ["Landing pages de Gemini", "Prototipos de Gemini", "Dashboards de Gemini", "Sitios de una página de Gemini"],
      steps: [
        "Pide a Gemini que cree una página HTML completa y de un solo archivo. Por ejemplo: 'Construye una página de portafolio responsive en un solo archivo HTML con CSS inline.'",
        "Copia el HTML generado y guárdalo como page.html.",
        "Abre Leme y sube el archivo. Añade un título y una descripción opcional para que los visitantes entiendan la página.",
        "Haz clic en Subir y obtén un enlace público como leme.app/p/xyz.",
        "Comparte el enlace. La barra lateral permite a los visitantes colaborar con comentarios, sugerencias y forks.",
      ],
      schemaName: "Cómo publicar HTML de Gemini con Leme",
      schemaDescription:
        "Guía paso a paso para subir HTML generado por Google Gemini a Leme y obtener un enlace público compartible.",
    },
    lovable: {
      metadataTitle: "Aloja y comparte HTML de Lovable",
      metadataDescription:
        "Sube HTML generado por Lovable a Leme y obtén un enlace público compartible en segundos. Publica apps de Lovable como páginas independientes.",
      ogTitle: "Aloja HTML de Lovable — Leme",
      ogDescription: "Sube HTML generado por Lovable y compártelo con un enlace público.",
      headline: "Aloja y comparte HTML de Lovable",
      description:
        "Lovable construye apps y páginas full-stack. Exporta una captura HTML única de tu proyecto Lovable y súbela a Leme para una vista previa pública rápida.",
      useCases: ["Vistas previas de apps de Lovable", "Landing pages de Lovable", "Prototipos de Lovable", "Demos compartibles de Lovable"],
      steps: [
        "Genera una página o app en Lovable. Enfócate en una sola pantalla o landing page que funcione como un archivo HTML independiente.",
        "Exporta o copia el código fuente HTML y guárdalo como page.html. Usa CSS y JavaScript inline para que el archivo funcione por sí solo.",
        "Sube el archivo a Leme y completa el título y la descripción.",
        "Haz clic en Subir para obtener un enlace público.",
        "Comparte el enlace con los revisores. Pueden dejar comentarios y sugerencias sin necesidad de acceso a Lovable.",
      ],
      schemaName: "Cómo publicar HTML de Lovable con Leme",
      schemaDescription:
        "Guía paso a paso para subir HTML generado por Lovable a Leme y obtener un enlace público compartible.",
    },
    v0: {
      metadataTitle: "Aloja y comparte HTML de v0",
      metadataDescription:
        "Sube HTML generado por v0 a Leme y obtén un enlace público compartible en segundos. Comparte tus prototipos de v0 sin desplegar un proyecto completo.",
      ogTitle: "Aloja HTML de v0 — Leme",
      ogDescription: "Sube HTML generado por v0 y compártelo con un enlace público.",
      headline: "Aloja y comparte HTML de v0",
      description:
        "v0 genera componentes React y HTML hermosos. Exporta un único archivo HTML desde v0 y súbelo a Leme para compartir una vista previa en vivo con cualquiera.",
      useCases: ["Vistas previas de componentes de v0", "Landing pages de v0", "Prototipos de v0", "Demos de UI de v0"],
      steps: [
        "Genera una UI o página en v0. Pide un único archivo HTML autocontenido, o exporta el código generado y envuélvelo en un archivo HTML.",
        "Copia el código fuente HTML y guárdalo como page.html.",
        "Sube el archivo a Leme y añade un título y descripción claros.",
        "Haz clic en Subir para obtener un enlace público.",
        "Comparte el enlace y recopila feedback a través de comentarios, sugerencias y forks.",
      ],
      schemaName: "Cómo publicar HTML de v0 con Leme",
      schemaDescription:
        "Guía paso a paso para subir HTML generado por v0 a Leme y obtener un enlace público compartible.",
    },
  },
  useCases: {
    metadataDescription:
      "Descubre cómo equipos y creadores usan Leme para publicar y compartir páginas HTML generadas por IA: landing pages, portafolios, prototipos, dashboards y más.",
    metadataOpenGraphTitle: "Casos de uso de Leme — Publica HTML generado por IA para cualquier proyecto",
    title: "¿Qué puedes publicar con Leme?",
    subtitle: "Cualquier archivo HTML generado por IA se convierte en una página en vivo y compartible. Estos son los usos más comunes de Leme.",
    ctaTitle: "¿Tienes un archivo HTML listo?",
    ctaSubtitle: "Subelo ahora y obtén un enlace compartible en segundos.",
    ctaButton: "Sube tu HTML",
    items: [
      {
        title: "Landing pages",
        description:
          "Genera una landing page de marketing completa con un asistente de código de IA, luego súbela a Leme y comparte el enlace con tu equipo, clientes o interesados en segundos.",
        keywords: ["Landing page de IA", "compartir landing page", "alojar landing page HTML"],
      },
      {
        title: "Portafolios",
        description:
          "Convierte un archivo HTML único de un experimento de diseño o proyecto personal en una pieza de portafolio en vivo. Ideal para diseñadores, desarrolladores y estudiantes que quieren una demo pública rápida.",
        keywords: ["Portafolio de IA", "compartir portafolio HTML", "alojar portafolio online"],
      },
      {
        title: "Prototipos y MVPs",
        description:
          "Construye un prototipo interactivo con IA, publícalo en Leme y recopila feedback a través de comentarios y sugerencias sin configurar un pipeline de despliegue completo.",
        keywords: ["Prototipo de IA", "alojar prototipo HTML", "compartir MVP"],
      },
      {
        title: "Dashboards",
        description:
          "Publica HTML de dashboards generados por IA con gráficos y tablas para que tus compañeros puedan previsualizar el diseño y la interacción sin necesidad de backend o base de datos conectada.",
        keywords: ["Dashboard de IA", "alojar dashboard HTML", "compartir dashboard"],
      },
      {
        title: "Newsletters y one-pagers",
        description:
          "Crea un email o anuncio de una página hermoso con IA, alójalo en Leme y comparte el enlace en tu newsletter, redes sociales o chat.",
        keywords: ["One-pager de IA", "alojar newsletter HTML", "compartir sitio de una página"],
      },
      {
        title: "Formularios y micro-apps",
        description:
          "Sube formularios HTML, calculadoras o widgets interactivos generados por IA y compártelos con un enlace directo. Ideal para experimentos rápidos y pruebas de usuario.",
        keywords: ["Alojamiento de formularios de IA", "micro-app HTML", "compartir formulario HTML"],
      },
      {
        title: "Documentación y demos",
        description:
          "Publica páginas de documentación técnica, demos de componentes o guías de estilo generadas desde prompts de IA para que tu equipo tenga una referencia en vivo para revisar y discutir.",
        keywords: ["Documentación de IA", "alojar demo HTML", "compartir documentación"],
      },
      {
        title: "Páginas de eventos y campañas",
        description:
          "Genera una página de campaña o evento de temporada con IA y publícala al instante. Actualiza haciendo un fork de la página y compartiendo la nueva versión.",
        keywords: ["Página de campaña de IA", "alojar página de evento", "compartir campaña HTML"],
      },
    ],
  },
  dashboard: {
    title: "Mi panel",
    newUpload: "+ Nueva subida",
    activePages: "{active}/{max} páginas activas",
    activePagesUnlimited: "{active} página(s) activa(s) · sin límite",
    renewsOn: "Renueva el {date}",
    cancelsAtPeriodEnd: " · cancela al final del período",
    yearly: " · anual",
    monthly: " · mensual",
    limitReachedUpgrade: "Límite alcanzado — actualizar",
    viewProPlan: "Ver plan Pro",
    billingSettings: "Ajustes de facturación",
    emptyState: "Aún no has subido ningún HTML.",
    emptyStateLink: "Haz tu primera subida",
    views: "{count} vistas",
    uploadedOn: "subido el {date}",
  },
  mine: {
    title: "Mis subidas",
    newUpload: "+ Nueva subida",
    activePagesInBrowser: "{active}/{max} página(s) activa(s) en este navegador",
    noAccount: "Sin cuenta",
    createAccountForSpace: "Crea una cuenta gratuita para más espacio",
    emptyState: "Aún no hay subidas guardadas en este navegador.",
    emptyStateLink: "Sube tu primer HTML",
    browserListWarning:
      "Esta lista se guarda en este navegador — si borras los datos del sitio o cambias de dispositivo, desaparece.",
    createAccountLink: "Crea una cuenta",
    dontLoseUploads: "para no perder tus subidas.",
    views: "{count} vistas",
    uploadedOn: "subido el {date}",
  },
  blog: {
    title: "Blog de Leme",
    subtitle: "Consejos, tutoriales y novedades sobre publicar y compartir HTML generado por IA.",
    readMore: "Leer más \u2192",
    posts: [
      {
        slug: "how-to-publish-html-from-ai",
        title: "Cómo publicar HTML de ChatGPT, Claude y Gemini",
        excerpt:
          "Una guía paso a paso para exportar HTML de los asistentes de código de IA más populares y publicarlo online con un enlace compartible.",
        date: "2026-08-16",
      },
      {
        slug: "share-ai-landing-page-in-30-seconds",
        title: "Cómo compartir una landing page generada por IA en 30 segundos",
        excerpt:
          "Convierte un prompt en una landing page en vivo. Sube el HTML a Leme y envía el enlace a cualquiera.",
        date: "2026-08-16",
      },
      {
        slug: "collect-feedback-on-html-prototypes",
        title: "La mejor forma de recopilar feedback en prototipos HTML",
        excerpt:
          "Por qué los comentarios, sugerencias y forks hacen de Leme una herramienta ligera de feedback para prototipos generados por IA.",
        date: "2026-08-16",
      },
    ],
  },
  blogPosts: {
    howToPublish: {
      metadataTitle: "Cómo publicar HTML de ChatGPT, Claude y Gemini",
      metadataDescription:
        "Aprende a exportar HTML de ChatGPT, Claude, Gemini y otros asistentes de código de IA, y publicarlo online con Leme.",
      ogTitle: "Cómo publicar HTML de ChatGPT, Claude y Gemini",
      ogDescription: "Guía paso a paso para exportar HTML generado por IA y compartirlo con un enlace público.",
      title: "Cómo publicar HTML de ChatGPT, Claude y Gemini",
      subtitle:
        "Una guía paso a paso para exportar HTML de los asistentes de código de IA más populares y publicarlo online con un enlace compartible.",
      ctaTitle: "Pruébalo ahora",
      ctaSubtitle: "Sube un archivo HTML y obtén un enlace compartible en segundos.",
      sections: [
        {
          type: "paragraph",
          content:
            "Los asistentes de código de IA pueden generar páginas HTML completas en segundos. El problema es compartirlas. La mayoría pega el código en un archivo local, lo abre en un navegador y envía una captura. Eso funciona para una vista rápida, pero no es un enlace realmente compartible.",
        },
        { type: "heading", content: "El flujo de trabajo más fácil" },
        {
          type: "list",
          items: [
            "Pide a la IA una página HTML de un solo archivo. Por ejemplo: 'Crea una landing page para una cafetería en un solo archivo HTML con CSS inline.'",
            "Copia el código HTML generado.",
            "Guárdalo como page.html en tu computadora.",
            "Ve a la subida de Leme y selecciona el archivo.",
            "Añade un título y una descripción opcional.",
            "Haz clic en Subir. Obtienes un enlace público como leme.app/p/xyz.",
          ],
        },
        { type: "heading", content: "ChatGPT" },
        {
          type: "paragraph",
          content:
            "En ChatGPT, pide un archivo HTML completo. Si la respuesta es demasiado larga, pídele que continúe. Una vez que tengas el código completo, guárdalo como .html y súbelo a Leme. ChatGPT Code Interpreter también puede generar archivos HTML directamente si le pides que escriba y exporte el archivo.",
        },
        { type: "heading", content: "Claude" },
        {
          type: "paragraph",
          content:
            "Claude Artifacts puede renderizar HTML y componentes React. Cuando Claude muestre un artifact, haz clic en la vista de código, copia el HTML y guárdalo. Leme alojará ese HTML exacto y lo hará compartible con cualquiera.",
        },
        { type: "heading", content: "Gemini" },
        {
          type: "paragraph",
          content:
            "Gemini puede generar fragmentos HTML en su respuesta. Pide un único archivo HTML autocontenido con estilos inline. Copia el resultado, guárdalo y súbelo a Leme.",
        },
        { type: "heading", content: "Otras herramientas" },
        {
          type: "paragraph",
          content:
            "El mismo flujo funciona para v0, Lovable, Bolt, Replit Agent y cualquier otra herramienta que produzca un solo archivo HTML. Si la herramienta exporta un ZIP o varios archivos, primero combina el CSS y JavaScript en el archivo HTML, luego súbelo.",
        },
        { type: "heading", content: "Qué hace útil a Leme" },
        {
          type: "list",
          items: [
            "Sin configuración de hosting.",
            "Enlace público instantáneo.",
            "Funciona en escritorio y móvil.",
            "Los visitantes pueden dejar comentarios y sugerencias.",
            "Gratis para probar; Pro para páginas ilimitadas y sin marca de agua.",
          ],
        },
      ],
    },
    shareLandingPage: {
      metadataTitle: "Cómo compartir una landing page generada por IA en 30 segundos",
      metadataDescription:
        "Convierte un prompt en una landing page en vivo. Sube el HTML generado por IA a Leme y envía el enlace a cualquiera.",
      ogTitle: "Cómo compartir una landing page generada por IA en 30 segundos",
      ogDescription: "De prompt a enlace público en menos de un minuto usando Leme.",
      title: "Cómo compartir una landing page generada por IA en 30 segundos",
      subtitle: "De prompt a enlace público en menos de un minuto. Sin despliegue, sin cuenta de hosting, sin paso de build.",
      ctaTitle: "Crea tu landing page",
      ctaSubtitle: "Sube tu HTML generado por IA y obtén un enlace en segundos.",
      sections: [
        {
          type: "paragraph",
          content:
            "Las landing pages son uno de los mejores casos de uso para los asistentes de código de IA. Describes tu producto, la IA escribe el copy, elige colores y construye un diseño responsive. La única pieza que falta es una URL pública.",
        },
        { type: "heading", content: "El flujo de 30 segundos" },
        {
          type: "list",
          items: [
            "Pide a la IA: 'Crea una landing page responsive para un SaaS que ayuda a compartir HTML generado por IA. Un solo archivo HTML, CSS inline, diseño moderno.'",
            "Guarda la respuesta como landing.html.",
            "Abre la subida de Leme.",
            "Arrastra el archivo, añade un título y haz clic en Subir.",
            "Copia el enlace público y compártelo.",
          ],
        },
        { type: "heading", content: "Por qué esto supera a otras opciones" },
        {
          type: "list",
          items: [
            "GitHub Pages requiere un repositorio y un commit.",
            "Netlify Drop es genial para carpetas, pero excesivo para un solo archivo.",
            "Vercel está hecho para frameworks, no para archivos HTML planos.",
            "Leme está hecho exactamente para esto: un archivo HTML, un enlace público.",
          ],
        },
        { type: "heading", content: "Comparte con contexto" },
        {
          type: "paragraph",
          content:
            "Cuando compartes un enlace de Leme, los visitantes pueden abrir la barra lateral para ver el título, la descripción e incluso dejar comentarios. Esto la hace perfecta para feedback temprano, revisiones de clientes y colaboración en equipo.",
        },
        { type: "heading", content: "Manténla online para siempre" },
        {
          type: "paragraph",
          content:
            "Las páginas gratuitas y anónimas expiran después de un tiempo. Si quieres una landing page que permanezca online sin marcas de agua, actualiza a Leme Pro para páginas ilimitadas y alojamiento permanente.",
        },
      ],
    },
    collectFeedback: {
      metadataTitle: "La mejor forma de recopilar feedback en prototipos HTML",
      metadataDescription:
        "Por qué los comentarios, sugerencias y forks hacen de Leme una herramienta ligera de feedback para prototipos HTML generados por IA.",
      ogTitle: "La mejor forma de recopilar feedback en prototipos HTML",
      ogDescription: "Recopila comentarios, sugerencias y forks en prototipos HTML generados por IA con Leme.",
      title: "La mejor forma de recopilar feedback en prototipos HTML",
      subtitle:
        "Por qué los comentarios, sugerencias y forks hacen de Leme una herramienta ligera de feedback para prototipos generados por IA.",
      ctaTitle: "Empieza a recopilar feedback",
      ctaSubtitle: "Sube tu prototipo y compártelo con tu equipo.",
      sections: [
        {
          type: "paragraph",
          content:
            "Los prototipos están hechos para revisarse. Pero cuando compartes un archivo HTML por email o Slack, recibes feedback vago como 'se ve bien' o 'cambia el azul'. Leme convierte un archivo estático en una superficie de revisión colaborativa.",
        },
        { type: "heading", content: "Tres tipos de feedback" },
        {
          type: "list",
          items: [
            "Comentarios: pensamientos y reacciones generales sobre la página o una idea específica.",
            "Sugerencias: propuestas de cambio concretas, como 'haz el título más grande' o 'añade una sección de precios'.",
            "Forks: un colaborador puede crear una copia de la página, editarla y compartir la nueva versión de vuelta. Es lo más cercano a un pull request para una página generada por IA.",
          ],
        },
        { type: "heading", content: "Cómo usarlo" },
        {
          type: "list",
          items: [
            "Genera tu prototipo con un asistente de IA.",
            "Súbelo a Leme.",
            "Comparte el enlace con los revisores.",
            "Los revisores abren la barra lateral y añaden comentarios o sugerencias.",
            "Para cambios mayores, pide a un revisor que haga un fork de la página y itere.",
          ],
        },
        { type: "heading", content: "Cuándo usar Leme en lugar de Figma o GitHub" },
        {
          type: "paragraph",
          content:
            "Figma es excelente para diseño y GitHub es excelente para código. Leme está en el medio: la página ya es HTML en vivo, pero aún necesitas feedback rápido antes de comprometerte con un despliegue completo. Es ideal para proyectos personales, previsualizaciones de clientes y experimentos puntuales generados por IA.",
        },
        { type: "heading", content: "Mantén un registro" },
        {
          type: "paragraph",
          content:
            "Como cada página tiene su propia URL, puedes compartir la versión A, luego la versión B, luego la versión C. Cada enlace es una instantánea. Los revisores pueden compararlas fácilmente y tú puedes quedarte con la mejor como versión final.",
        },
      ],
    },
  },
  terms: {
    metadataTitle: "Términos de Servicio",
    metadataDescription: "Términos de servicio para usar Leme.",
    title: "Términos de Servicio",
    lastUpdated: "Última actualización: agosto de 2026",
    sections: [
      {
        title: "1. Aceptación de los términos",
        paragraphs: [
          "Al acceder o usar Leme, aceptas quedar vinculado por estos Términos de Servicio. Si no estás de acuerdo, por favor no uses el servicio.",
        ],
      },
      {
        title: "2. Descripción del servicio",
        paragraphs: [
          "Leme es una plataforma que permite a los usuarios subir archivos HTML, generar enlaces compartibles y colaborar a través de comentarios, sugerencias y forks.",
        ],
      },
      {
        title: "3. Contenido del usuario",
        paragraphs: [
          "Conservas la propiedad de cualquier contenido que subas. Al subir contenido, otorgas a Leme una licencia limitada para alojar, mostrar y compartir ese contenido según sea necesario para proporcionar el servicio.",
          "Eres el único responsable del contenido que subas. No subas contenido ilegal, dañino, infractor o que viole los derechos de otros.",
        ],
      },
      {
        title: "4. Usos prohibidos",
        paragraphs: [
          "No puedes usar Leme para distribuir malware, páginas de phishing, spam o cualquier contenido que viole leyes o regulaciones aplicables.",
        ],
      },
      {
        title: "5. Suscripciones de pago",
        paragraphs: [
          "Leme ofrece planes gratuitos y de pago. Las suscripciones de pago se facturan a través de Stripe y pueden cancelarse en cualquier momento desde tus ajustes de facturación.",
        ],
      },
      {
        title: "6. Terminación",
        paragraphs: [
          "Nos reservamos el derecho de suspender o terminar cuentas que violen estos términos o abusen del servicio.",
        ],
      },
      {
        title: "7. Cambios en los términos",
        paragraphs: [
          "Podemos actualizar estos términos de vez en cuando. El uso continuado del servicio después de los cambios constituye la aceptación de los términos actualizados.",
        ],
      },
      {
        title: "8. Contacto",
        paragraphs: [
          "Para preguntas sobre estos términos, por favor contáctanos a través de nuestra página de contacto.",
        ],
      },
    ],
  },
  privacy: {
    metadataTitle: "Política de Privacidad",
    metadataDescription: "Política de privacidad para los usuarios de Leme.",
    title: "Política de Privacidad",
    lastUpdated: "Última actualización: agosto de 2026",
    sections: [
      {
        title: "1. Información que recopilamos",
        paragraphs: [
          "Cuando usas Leme, podemos recopilar información que proporcionas directamente, como tu dirección de email al iniciar sesión, e identificadores anónimos cuando subes sin una cuenta.",
        ],
      },
      {
        title: "2. Contenido subido",
        paragraphs: [
          "Los archivos HTML que subes se almacenan de forma segura para poder servirlos a través de enlaces compartibles. No escaneamos ni usamos el contenido de tus subidas para fines publicitarios.",
        ],
      },
      {
        title: "3. Autenticación",
        paragraphs: [
          "Leme usa Firebase Authentication para el inicio de sesión. Almacenamos un identificador de usuario único y tu dirección de email cuando te autenticas.",
        ],
      },
      {
        title: "4. Pagos",
        paragraphs: [
          "Los pagos se procesan por Stripe. No almacenamos los datos de tu tarjeta de pago. Stripe puede recopilar información necesaria para procesar pagos según su propia política de privacidad.",
        ],
      },
      {
        title: "5. Cookies y analíticas",
        paragraphs: [
          "Usamos cookies esenciales para mantener tu sesión iniciada y recordar subidas anónimas en tu navegador. No usamos cookies publicitarias de terceros.",
        ],
      },
      {
        title: "6. Retención de datos",
        paragraphs: [
          "Las páginas subidas se retienen según tu plan. Las páginas gratuitas y anónimas expiran después del período de retención del plan. Las páginas Pro se mantienen mientras tu suscripción esté activa.",
        ],
      },
      {
        title: "7. Tus derechos",
        paragraphs: [
          "Puedes eliminar tus páginas subidas en cualquier momento. Si tienes preguntas sobre tus datos, contáctanos a través de nuestra página de contacto.",
        ],
      },
      {
        title: "8. Cambios en esta política",
        paragraphs: [
          "Podemos actualizar esta política de privacidad de vez en cuando. Los cambios significativos se publicarán en esta página.",
        ],
      },
    ],
  },
  login: {
    title: "Iniciar sesión",
    subtitle: "Accede a tu cuenta para gestionar tus subidas y enlaces compartidos.",
    googleSignIn: "Iniciar sesión con Google",
    googleSignInLoading: "Abriendo Google...",
    or: "o",
    magicLink: "Enlace mágico",
    emailAndPassword: "Email y contraseña",
    emailLabel: "Email",
    emailPlaceholder: "tu@email.com",
    passwordLabel: "Contraseña",
    passwordPlaceholder: "••••••••",
    sendMagicLink: "Enviar enlace mágico",
    sending: "Enviando...",
    signIn: "Iniciar sesión",
    createAccount: "Crear cuenta",
    pleaseWait: "Espera un momento...",
    noAccount: "¿No tienes cuenta? Crea una ahora",
    hasAccount: "¿Ya tienes cuenta? Inicia sesión",
    magicLinkSent: "¡Enlace mágico enviado! Revisa tu bandeja de entrada para continuar.",
  },
  auth: {
    codeErrorTitle: "No pudimos confirmar tu inicio de sesión",
    codeErrorSubtitle:
      "El enlace puede haber expirado o ya haber sido usado. Por favor, intenta iniciar sesión de nuevo.",
    codeErrorCta: "Volver al inicio de sesión",
    callbackConfirming: "Confirmando tu inicio de sesión...",
    callbackEmailPrompt: "Confirma tu email para terminar de iniciar sesión",
    callbackError: "Este enlace puede haber expirado o ya haber sido usado.",
  },
  uploadLanding: {
    title: "Sube tu HTML",
    savedFile: "Tu archivo guardado",
    savedFiles: "Tus archivos guardados",
    noAccount: "¿Sin cuenta? No hay problema — tu subida se guarda en este navegador; accede más tarde en {link}.",
    myUploads: "Mis subidas",
  },
  uploadForm: {
    fileLabel: "Archivo HTML (.html, hasta 2MB)",
    titleLabel: "Título",
    titlePlaceholder: "Ej.: Landing page generada con GPT",
    descriptionLabel: "Descripción (opcional)",
    descriptionPlaceholder: "Cuéntanos un poco sobre este HTML...",
    uploading: "Subiendo...",
    upload: "Subir",
    errors: {
      notHtml: "Selecciona un archivo .html.",
      tooLarge: "El archivo debe tener como máximo 2MB.",
      noFile: "Elige un archivo .html para subir.",
      generic: "Error de conexión al subir el archivo.",
    },
  },
  planUpsell: {
    usage: "{active}/{max} páginas activas usadas.",
    atLimit: "Has alcanzado el límite de {max} página(s) activa(s).",
    description: "Pro elimina el límite, quita la marca de agua y las páginas nunca expiran.",
    cta: "Actualizar a Pro",
  },
  planLabels: {
    anonymous: "Anónimo",
    free: "Gratis",
    pro: "Pro",
  },
  expiredNotice: {
    title: "Esta página ha expirado",
    description:
      "El plan del autor limita cuánto tiempo permanece activa una página. Si eres el autor, actualiza al plan Pro para evitar que tus páginas expiren.",
    cta: "Volver al inicio",
  },
  uploadsMenu: {
    title: "Tus subidas",
    empty: "Aún no tienes otras subidas.",
    views: "{count} vistas",
    viewingNow: "viendo ahora",
    deleteLabel: "Eliminar subida",
    deleteConfirm: "¿Eliminar \"{title}\"? La página, su enlace y sus comentarios se pierden para siempre.",
    deleteError: "No se pudo eliminar la subida.",
    deleteTitle: "¿Eliminar esta subida?",
    deleteCta: "Eliminar",
    cancel: "Cancelar",
  },
  billing: {
    title: "Facturación",
    subtitle: "Gestiona tu plan, intervalo de facturación y facturas.",
    subscription: {
      title: "Suscripción",
      freePlan: "Estás en el plan Gratis. Actualiza a Pro para mantener las páginas online para siempre y quitar la marca de agua.",
      viewPlans: "Ver planes",
      proTitle: "Plan Pro",
      billedAnnually: "Facturado anualmente",
      billedMonthly: "Facturado mensualmente",
      statusActive: "Activa",
      statusCancelsSoon: "Cancela pronto",
      currentPeriodEnds: "El período actual termina",
      billingInterval: "Intervalo de facturación",
      intervalYearly: "Anual",
      intervalMonthly: "Mensual",
      cancelWarning:
        "Tu plan Pro está programado para cancelarse al final del período de facturación actual. Puedes reactivarlo antes de entonces para conservar los beneficios.",
      syncing: "Sincronizando detalles de la suscripción...",
    },
    invoices: {
      title: "Historial de facturas",
      loading: "Cargando facturas...",
      error: "No se pudieron cargar las facturas.",
      empty: "Aún no hay facturas.",
      invoice: "Factura",
      view: "Ver",
      statusPaid: "pagada",
    },
    actions: {
      manageBilling: "Gestionar facturación",
      manageBillingLoading: "Abriendo...",
      cancelSubscription: "Cancelar suscripción",
      cancelling: "Cancelando...",
      cancelConfirm:
        "¿Estás seguro de que quieres cancelar tu plan Pro? Mantendrás el acceso hasta el final del período de facturación actual.",
      cancelConfirmTitle: "¿Cancelar el plan Pro?",
      cancelKeep: "Mantener plan",
      cancelError: "No se pudo cancelar la suscripción.",
      upgradeToAnnual: "Cambiar a anual",
      upgrading: "Abriendo checkout...",
      upgradeError: "No se pudo iniciar la actualización.",
    },
  },
  pageViewer: {
    pageLink: "Enlace de la página",
    views: "{count} vistas",
    uploadedOn: "subido el {date}",
    sourceNote: "vía enlace compartido",
    reopenLabel: "Colaborar",
  },
  collapsibleSidebar: {
    show: "Mostrar barra lateral",
    hide: "Ocultar barra lateral",
  },
  copyLink: {
    copy: "Copiar",
    copied: "¡Copiado!",
  },
  contributions: {
    typeComment: "Comentario",
    typeSuggestion: "Sugerencia",
    typeFork: "Fork",
    authorPlaceholder: "Tu nombre (opcional)",
    forkTitlePlaceholder: "Título del fork",
    forkHtmlLabel: "Edita el HTML antes de crear el fork:",
    commentPlaceholder: "Deja un comentario...",
    suggestionPlaceholder: "Describe tu sugerencia...",
    forkMessagePlaceholder: "Mensaje sobre este fork (opcional)",
    submit: "Enviar",
    createFork: "Crear fork",
    submitting: "Enviando...",
    emptyState: "Aún no hay contribuciones. ¡Sé el primero!",
    viewFork: "Ver fork →",
    error: "Error de conexión al enviar la contribución.",
    forkOf: "Fork de {title}",
  },
  shareButton: {
    share: "Compartir",
    generating: "Generando...",
    error: "Error de conexión al generar el enlace.",
  },
  meta: {
    loginTitle: "Iniciar sesión",
    loginDescription:
      "Inicia sesión en Leme para gestionar tus páginas HTML subidas y tus enlaces compartidos.",
    mineTitle: "Mis subidas",
    mineDescription: "Consulta tus subidas anónimas en Leme.",
    dashboardTitle: "Panel",
    dashboardDescription:
      "Gestiona tus páginas HTML subidas y tus enlaces compartidos en Leme.",
    billingTitle: "Facturación",
    billingDescription:
      "Gestiona tu suscripción Leme Pro, el intervalo de facturación y tus facturas.",
    newTitle: "Subir HTML",
    newDescription:
      "Sube un archivo HTML generado por IA a Leme y obtén un enlace para compartir.",
    pageNotFound: "Página no encontrada",
    sharedPageNotFound: "Página compartida no encontrada",
    untitledPage: "Página compartida",
    viewPageDescription: "Mira {title} en Leme.",
  },
  pageMemory: {
    title: "Shared memory",
    loading: "Loading shared memory...",
    error: "Could not load shared memory.",
    empty: "No data stored yet. Open this page and edit a field to see it here.",
    filterPlaceholder: "Filter keys or values...",
    exportCsv: "Export CSV",
  },
  newMemoryAlert: {
    message: "New data has been added to this page.",
    reload: "Reload",
    dismiss: "Dismiss",
  },
  pageSettings: {
    title: "Ajustes de la página",
    proOnly: "Pro",
    contributions: "Permitir contribuciones",
    contributionsHint: "Los visitantes pueden comentar, sugerir cambios o hacer un fork de esta página.",
    branding: "Mostrar cabecera de Leme",
    brandingHint: "La barra de Leme permanece visible sobre tu página.",
    saving: "Guardando...",
    error: "No se pudieron guardar los ajustes.",
  },
  authErrors: {
    invalidEmail: "Esa dirección de correo no parece válida.",
    userDisabled: "Esta cuenta ha sido deshabilitada.",
    userNotFound: "No se encontró una cuenta con ese correo.",
    wrongPassword: "Correo o contraseña incorrectos.",
    invalidCredential: "Correo o contraseña incorrectos.",
    emailAlreadyInUse: "Ya existe una cuenta con ese correo. Prueba iniciando sesión.",
    weakPassword: "Elige una contraseña de al menos 6 caracteres.",
    tooManyRequests: "Demasiados intentos. Espera un momento e intenta de nuevo.",
    networkRequestFailed: "No se pudo conectar con el servidor. Revisa tu conexión.",
    popupBlocked: "Tu navegador bloqueó la ventana emergente de inicio de sesión. Permite ventanas emergentes e intenta de nuevo.",
    unauthorizedDomain: "Este dominio no está autorizado en Firebase. Agrégalo en Authentication > Settings > Authorized domains.",
    operationNotAllowed: "Este método de inicio de sesión está deshabilitado. Habilitarlo en Authentication > Sign-in method en la consola de Firebase.",
    accountExistsWithDifferentCredential: "Ya tienes una cuenta con este correo usando otro método de inicio de sesión. Inicia sesión de esa manera primero.",
    default: "No se pudo completar el inicio de sesión. Inténtalo de nuevo.",
    connectionError: "No se pudo conectar. Revisa tu conexión a internet e intenta de nuevo.",
  },
};
