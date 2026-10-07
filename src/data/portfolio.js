// ============================================================
// DATOS DEL PORTAFOLIO — Juan Diego Cabrera Ramírez
// Edita este archivo para actualizar el contenido del sitio
// ============================================================

export const profile = {
  name: 'Juan Diego Cabrera Ramírez',
  shortName: 'Juan Diego',
  handle: '@ByJuanRamirez',
  role: 'Desarrollador JavaScript fullstack',
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
  headline: 'Construyo productos web completos, de la *primera línea* al *deploy*.',
  intro:
    'Soy Juan Diego, desarrollador JavaScript en Colombia. Diseño la interfaz, escribo la API, modelo la base de datos y dejo todo corriendo en producción.',
};

export const services = [
  {
    title: 'Interfaces',
    text: 'Frontends rápidos y accesibles con JavaScript moderno, React o Astro. CSS escrito a mano, sin plantillas genéricas.',
    tags: ['JavaScript', 'React', 'Astro', 'CSS'],
  },
  {
    title: 'APIs y datos',
    text: 'Servicios REST en Node y Express con autenticación, validación y esquemas SQL pensados para crecer sin reescribirse.',
    tags: ['Node.js', 'Express', 'PostgreSQL', 'JWT'],
  },
  {
    title: 'Infraestructura',
    text: 'Contenedores con Docker, despliegues en Railway y servidores Linux. Lo que construyo queda en línea, no en una carpeta.',
    tags: ['Docker', 'Linux', 'Railway', 'CI/CD'],
  },
  {
    title: 'IA aplicada',
    text: 'Construyo agentes que trabajan solos, desde Telegram u otros canales, e integro modelos de Claude y Google AI Studio en productos reales. También uso IA a diario para revisar arquitectura y código.',
    tags: ['Agentes', 'OpenClaw', 'Google AI Studio', 'Claude API'],
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
    title: 'API REST con JWT y rate limiting',
    date: '2026',
    duration: '6 semanas',
    description: 'API de producción con tokens JWT, límites de peticiones, validación de entrada y documentación integrada. Operando en Railway con uptime estable.',
    tech: ['Node.js', 'Express', 'JWT', 'Railway'],
    links: { github: '#', live: null },
    status: 'Producción',
  },
  {
    title: 'Bot de automatización con Claude',
    date: '2026',
    duration: '1 mes',
    description: 'Servicio que usa la API de Claude para procesar texto, generar respuestas con contexto y ejecutar flujos condicionales. Corre en un servidor Linux dentro de Docker.',
    tech: ['Node.js', 'Claude API', 'Docker', 'Linux'],
    links: { github: '#', live: null },
    status: 'Mantenimiento',
  },
  {
    title: 'Agente autogestionado en Telegram',
    date: 'Sep 2026',
    duration: '',
    description: 'Agente de IA que opera por su cuenta desde Telegram: recibe mensajes, decide qué hacer y ejecuta tareas sin intervención manual. Construido en JavaScript sobre OpenClaw, con modelos de Google AI Studio y la API de bots de Telegram como canal de conversación.',
    tech: ['JavaScript', 'OpenClaw', 'Google AI Studio', 'Telegram Bot API'],
    links: { github: '#', live: null },
    status: 'Producción',
  },
  {
    title: 'Sistema de gestión interna',
    date: 'Oct 2025',
    duration: '3 meses',
    description: 'Aplicación web para gestionar recursos internos: autenticación segura, panel de administración y CRUD completo, desplegada con Docker.',
    tech: ['Node.js', 'Express', 'PostgreSQL', 'Docker'],
    links: { github: '#', live: '#' },
    status: 'Producción',
  },
];

export const process = [
  { step: 'Entender', text: 'Una llamada corta para aterrizar el problema, el alcance y lo que significa "terminado".' },
  { step: 'Proponer', text: 'Te envío un plan con stack, entregables y fechas. Sin letra pequeña.' },
  { step: 'Construir', text: 'Avances visibles cada semana en un entorno real, no capturas de pantalla.' },
  { step: 'Lanzar', text: 'Deploy en producción, documentación y traspaso. Sigo disponible después.' },
];
