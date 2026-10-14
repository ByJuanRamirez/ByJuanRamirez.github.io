// ============================================================
// DATOS DEL PORTAFOLIO — Juan Diego Cabrera Ramírez
// Edita este archivo para actualizar el contenido del sitio
// ============================================================

// Datos del sitio para SEO, analítica y verificación de buscadores.
// Deja un campo vacío ('') para desactivarlo.
export const site = {
  url: 'https://byjuanramirez.github.io/',
  lang: 'es',
  locale: 'es_CO',
  title: 'Desarrollador freelance de IA en Colombia · Juan Diego Cabrera',
  description:
    'Desarrollador freelance de IA en Colombia: agentes de IA, chatbots e integraciones con Claude y Gemini listos para producción, con API, base de datos y deploy.',
  shareTitle: 'Juan Diego Cabrera — Desarrollador freelance de IA',
  shareDescription: 'Agentes de IA, chatbots e integraciones con LLMs que llegan a producción. Freelance desde Colombia, horario compatible con EE. UU.',
  ogImage: 'og-image.jpg',
  github: 'https://github.com/ByJuanRamirez',
  // Google Analytics 4: ID de medición, p. ej. 'G-XXXXXXXXXX'
  ga4Id: '',
  // Google Search Console: valor del meta tag de verificación (solo el content)
  googleVerification: '',
  // Bing Webmaster Tools: valor del meta tag msvalidate.01 (solo el content)
  bingVerification: '',
};

export const profile = {
  name: 'Juan Diego Cabrera Ramírez',
  shortName: 'Juan Diego',
  handle: '@ByJuanRamirez',
  role: 'Desarrollador freelance de IA',
  avatar: '/perfil.jpeg',
  initials: 'JDC',
  // Único canal de contacto
  linkedin: 'https://www.linkedin.com/in/byjuanramirez/',
  location: 'Colombia',
  timezone: 'UTC−5',
  yearsExperience: '3+',
  available: true,
};

export const hero = {
  // Las palabras entre *asteriscos* se resaltan con el color de acento
  headline: 'Construyo *agentes de IA* y productos web, de la primera línea al *deploy*.',
  intro:
    'Soy Juan Diego, desarrollador freelance de IA en Colombia. Integro modelos como Claude y Gemini en productos reales: agentes que trabajan solos, chatbots y automatizaciones, con su interfaz, su API, su base de datos y todo corriendo en producción.',
};

export const services = [
  {
    title: 'Agentes e IA aplicada',
    page: 'agentes-de-ia',
    text: 'Agentes de IA que trabajan solos desde Telegram u otros canales, chatbots con contexto y automatizaciones que integran modelos de Claude y Google AI Studio en tu producto o en tus procesos.',
    tags: ['Agentes de IA', 'Chatbots', 'Claude API', 'Google AI Studio'],
  },
  {
    title: 'Interfaces',
    page: 'desarrollo-web-fullstack',
    text: 'Frontends rápidos y accesibles con JavaScript moderno, React o Astro. CSS escrito a mano, sin plantillas genéricas.',
    tags: ['JavaScript', 'React', 'Astro', 'CSS'],
  },
  {
    title: 'APIs y datos',
    page: 'apis-y-backend',
    text: 'Servicios REST en Node y Express con autenticación, validación y esquemas SQL pensados para crecer sin reescribirse.',
    tags: ['Node.js', 'Express', 'PostgreSQL', 'JWT'],
  },
  {
    title: 'Infraestructura',
    page: 'desarrollo-web-fullstack',
    text: 'Contenedores con Docker, despliegues en Railway y servidores Linux. Lo que construyo queda en línea, no en una carpeta.',
    tags: ['Docker', 'Linux', 'Railway', 'CI/CD'],
  },
];

export const skills = [
  { name: 'JavaScript',   category: 'Frontend' },
  { name: 'TypeScript',   category: 'Frontend' },
  { name: 'React',        category: 'Frontend' },
  { name: 'Astro',        category: 'Frontend' },
  { name: 'CSS',          category: 'Frontend' },
  { name: 'Vite',         category: 'Frontend' },

  { name: 'Node.js',      category: 'Backend' },
  { name: 'Express',      category: 'Backend' },
  { name: 'PostgreSQL',   category: 'Backend' },
  { name: 'REST / JWT',   category: 'Backend' },

  { name: 'Docker',       category: 'Infra' },
  { name: 'Linux / Bash', category: 'Infra' },
  { name: 'Railway',      category: 'Infra' },
  { name: 'GitHub Actions', category: 'Infra' },

  { name: 'Claude API',   category: 'IA' },
  { name: 'Google AI Studio', category: 'IA' },
  { name: 'OpenClaw',     category: 'IA' },
  { name: 'Telegram Bot API', category: 'IA' },
  { name: 'Prompting',    category: 'IA' },
  { name: 'Git',          category: 'Flujo' },
  { name: 'GitHub',       category: 'Flujo' },
];

export const experience = [
  // Del más reciente al más antiguo
  {
    slug: 'api-rest-jwt',
    title: 'API REST con JWT y rate limiting',
    date: '2026',
    duration: '6 semanas',
    description: 'API de producción con tokens JWT, límites de peticiones, validación de entrada y documentación integrada. Operando en Railway con uptime estable.',
    tech: ['Node.js', 'Express', 'JWT', 'Railway'],
    links: { github: '#', live: null },
    status: 'Producción',
  },
  {
    slug: 'bot-claude',
    title: 'Bot de automatización con Claude',
    date: '2026',
    duration: '1 mes',
    description: 'Servicio que usa la API de Claude para procesar texto, generar respuestas con contexto y ejecutar flujos condicionales. Corre en un servidor Linux dentro de Docker.',
    tech: ['Node.js', 'Claude API', 'Docker', 'Linux'],
    links: { github: '#', live: null },
    status: 'Mantenimiento',
  },
  {
    slug: 'agente-telegram',
    title: 'Agente autogestionado en Telegram',
    date: 'Sep 2026',
    duration: '',
    description: 'Agente de IA que opera por su cuenta desde Telegram: recibe mensajes, decide qué hacer y ejecuta tareas sin intervención manual. Construido en JavaScript sobre OpenClaw, con modelos de Google AI Studio y la API de bots de Telegram como canal de conversación.',
    tech: ['JavaScript', 'OpenClaw', 'Google AI Studio', 'Telegram Bot API'],
    links: { github: '#', live: null },
    status: 'Producción',
  },
  {
    slug: 'sistema-gestion-interna',
    title: 'Sistema de gestión interna',
    date: 'Oct 2025',
    duration: '3 meses',
    description: 'Aplicación web para gestionar recursos internos: autenticación segura, panel de administración y CRUD completo, desplegada con Docker.',
    tech: ['Node.js', 'Express', 'PostgreSQL', 'Docker'],
    links: { github: '#', live: '#' },
    status: 'Producción',
  },
];

// Preguntas frecuentes: se muestran en la página y como datos estructurados (FAQPage).
export const faq = [
  {
    q: '¿Qué tipo de proyectos de IA desarrollas?',
    a: 'Agentes de IA que ejecutan tareas por su cuenta, chatbots con contexto para Telegram y otros canales, y automatizaciones que procesan texto con modelos como Claude o Gemini. También integro IA en aplicaciones web que ya existen.',
  },
  {
    q: '¿Solo haces la parte de IA o también el resto del producto?',
    a: 'El producto completo: interfaz, API, base de datos, contenedores y despliegue. Un agente o un chatbot necesita un backend fiable, autenticación y un servidor donde correr, y me encargo de todo eso.',
  },
  {
    q: '¿Trabajas de forma remota con clientes fuera de Colombia?',
    a: 'Sí. Trabajo en remoto desde Colombia (UTC−5), un horario compatible con Estados Unidos y Latinoamérica, y publico versiones que puedes abrir y probar desde las primeras semanas.',
  },
  {
    q: '¿Cómo empezamos un proyecto?',
    a: 'Escríbeme por LinkedIn contándome qué quieres construir, para cuándo y con qué presupuesto. Con eso preparo una propuesta concreta con alcance, entregables y tiempos.',
  },
];

// Proceso de un producto desde cero con un cliente.
// El ejemplo y sus cifras salen de Bitácora (FastAPI + Flutter, oct 2026).
export const process = [
  {
    step: 'Planear',
    title: 'Plan y requerimientos',
    text: 'Una conversación para aterrizar el problema: quién usa la app, qué puede hacer cada rol y qué significa "terminado".',
    output: 'Alcance, roles y lista de requerimientos.',
    example: 'Acceso solo para usuarios que crea un administrador, sin registro público. Cinco módulos: publicadores, grupos, informes mensuales, precursores y visitas de pastoreo.',
    readout: '5 módulos · sin registro público',
  },
  {
    step: 'Mapear',
    title: 'Mapeo de datos y flujo',
    text: 'Antes de escribir código dibujamos las pantallas, los datos de cada una y las reglas que los conectan.',
    output: 'Diagrama de flujo y modelo de datos.',
    example: 'Un diagrama en Excalidraw con 56 piezas: del login al inicio, y de ahí a publicadores, ancianos, precursores y grupos. La ficha del publicador quedó con 14 campos, y las reglas se anotaron ahí mismo («las horas se piden si no es precursor»).',
    readout: '56 piezas · 14 campos por publicador',
  },
  {
    step: 'Diseñar',
    title: 'Diseño y maquetación',
    text: 'Del diagrama a pantallas reales: jerarquía, estados vacíos, errores y cómo se ve en cada tamaño.',
    output: 'Maquetas navegables para teléfono y escritorio.',
    example: 'Primero el teléfono, después el escritorio: por debajo de 760 px, pestañas abajo y hojas que suben; desde ahí, menú lateral y ventanas centradas. En total, 18 vistas.',
    readout: '18 vistas · 2 tamaños',
  },
  {
    step: 'Construir',
    title: 'Implementación',
    text: 'API, base de datos y app, con pruebas desde el primer día y avances que el cliente puede abrir y tocar.',
    output: 'Código, pruebas y un entorno de prueba en línea.',
    example: 'API en Python con FastAPI y MySQL, y una app en Flutter que sirve para Android, la web y el escritorio. 19 tablas, 15 grupos de endpoints y 117 pruebas automáticas: 72 del API y 45 de la app.',
    readout: '19 tablas · 117 pruebas',
  },
  {
    step: 'Lanzar',
    title: 'Despliegue',
    text: 'Producción desde temprano: el cliente usa la versión real, no capturas de pantalla.',
    output: 'App en producción y documentación de operación.',
    example: 'El API quedó en Railway 27 minutos después del primer commit. La APK va firmada y se actualiza sola, y el mismo servidor sirve la versión web.',
    readout: 'en línea a los 27 min',
  },
  {
    step: 'Iterar',
    title: 'Iterar con el cliente',
    text: 'Cada comentario del cliente entra como una versión nueva, pequeña y publicada el mismo día.',
    output: 'Versiones cortas con notas de lo nuevo.',
    example: 'De v0.1.1 a v0.1.11 en 5 días. En el camino el cliente pidió áreas que no estaban en el plan, Personal y Cocina, y entraron como versiones nuevas.',
    readout: '11 versiones en 5 días',
  },
];
