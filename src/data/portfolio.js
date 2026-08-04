// ============================================================
// DATOS DEL PORTAFOLIO — Juan Diego Cabrera Ramírez
// Edita este archivo para actualizar el contenido del sitio
// ============================================================

export const profile = {
  name: 'Juan Diego Cabrera Ramírez',
  title: 'JavaScript Developer & AI-Augmented Builder',
  tagline: 'Llevo tu idea desde el diseño hasta producción. Solo, rápido y potenciado con IA.',
  avatar: null, // Ruta a public/avatar.jpg cuando esté disponible
  initials: 'JDC',
  email: 'juandiego@example.com',       // ← actualizar
  github: 'https://github.com/tu-usuario', // ← actualizar
  linkedin: 'https://linkedin.com/in/tu-perfil', // ← actualizar
  location: 'Colombia',
};

export const about = {
  bio: [
    'Soy desarrollador JavaScript fullstack con capacidad real de llevar un producto desde la idea hasta producción: diseño, API, base de datos, contenedores y despliegue. Sin intermediarios.',
    'Trabajo con Claude y herramientas de IA como parte central de mi flujo profesional. Esto me permite entregar más rápido, con mejor arquitectura y menos deuda técnica que un equipo convencional.',
    'Si tienes un proyecto en mente y necesitas a alguien que lo ejecute de principio a fin — soy esa persona.',
  ],
  highlights: [
    { label: 'Entrega en producción', icon: 'deploy' },
    { label: 'Código mantenible', icon: 'code' },
    { label: 'Fullstack end-to-end', icon: 'fullstack' },
    { label: 'IA en el flujo de trabajo', icon: 'ai' },
    { label: 'Comunicación directa', icon: 'chat' },
    { label: 'Iteración rápida', icon: 'fast' },
  ],
};

export const skills = [
  // Frontend
  { id: 'js',         name: 'JavaScript',    category: 'Frontend',  level: 5, description: 'Core del stack. ES6+, async/await, DOM, Canvas API.' },
  { id: 'ts',         name: 'TypeScript',    category: 'Frontend',  level: 3, description: 'Tipado estático para proyectos escalables.' },
  { id: 'react',      name: 'React',         category: 'Frontend',  level: 3, description: 'Componentes, hooks, estado global.' },
  { id: 'astro',      name: 'Astro',         category: 'Frontend',  level: 2, description: 'Sites estáticos con componentes isomórficos.' },
  { id: 'css',        name: 'CSS / Design',  category: 'Frontend',  level: 4, description: 'Variables CSS, Flexbox, Grid, animaciones.' },

  // Backend
  { id: 'node',       name: 'Node.js',       category: 'Backend',   level: 4, description: 'Runtime principal para APIs y servicios.' },
  { id: 'express',    name: 'Express',       category: 'Backend',   level: 4, description: 'Framework REST API, middlewares, routing.' },
  { id: 'sql',        name: 'SQL',           category: 'Backend',   level: 3, description: 'PostgreSQL, diseño de esquemas, queries.' },

  // DevOps
  { id: 'docker',     name: 'Docker',        category: 'DevOps',    level: 3, description: 'Contenedores, Dockerfile, Compose.' },
  { id: 'linux',      name: 'Linux / CLI',   category: 'DevOps',    level: 4, description: 'Terminal, scripts bash, administración básica.' },
  { id: 'railway',    name: 'Railway',       category: 'DevOps',    level: 3, description: 'Despliegue y CI/CD en producción.' },

  // AI Tools
  { id: 'claude',     name: 'Claude AI',     category: 'AI Tools',  level: 5, description: 'Pair programming, arquitectura, code review con IA.' },
  { id: 'ai-tools',   name: 'AI Workflow',   category: 'AI Tools',  level: 4, description: 'Integración de LLMs en flujo de trabajo profesional.' },

  // Version Control
  { id: 'git',        name: 'Git',           category: 'VCS',       level: 4, description: 'Branching, merging, resolución de conflictos.' },
  { id: 'github',     name: 'GitHub',        category: 'VCS',       level: 4, description: 'Pull requests, issues, GitHub Actions básico.' },
];

export const experience = [
  {
    id: 1,
    title: 'Sistema de Gestión Fullstack',
    type: 'project',
    date: '2024',
    duration: '3 meses',
    description: 'Aplicación web completa para gestión de recursos internos: autenticación segura, panel de administración, CRUD completo y despliegue en producción con Docker. Del diseño a producción, sin depender de nadie más.',
    tech: ['JavaScript', 'Node.js', 'Express', 'PostgreSQL', 'Docker'],
    image: null,
    links: { github: '#', live: '#' },
    status: 'Producción',
  },
  {
    id: 2,
    title: 'API REST con Auth JWT & Rate Limiting',
    type: 'project',
    date: '2024',
    duration: '6 semanas',
    description: 'API de producción con autenticación por tokens JWT, rate limiting, validación de datos y documentación integrada. Desplegada y operativa en Railway con uptime estable.',
    tech: ['Node.js', 'Express', 'JWT', 'PostgreSQL', 'Railway'],
    image: null,
    links: { github: '#', live: null },
    status: 'Producción',
  },
  {
    id: 3,
    title: 'Portafolio — Diseño & Desarrollo',
    type: 'project',
    date: '2025',
    duration: '2 semanas',
    description: 'Este sitio. Construido con Vanilla JS y Vite sin frameworks pesados: Canvas API para el grafo de skills interactivo, sistema de temas dark/light, animaciones fluidas y código limpio y modular.',
    tech: ['JavaScript', 'CSS', 'Vite', 'Canvas API'],
    image: null,
    links: { github: '#', live: '#' },
    status: 'En desarrollo',
  },
  {
    id: 4,
    title: 'Bot de Automatización con Claude API',
    type: 'project',
    date: '2025',
    duration: '1 mes',
    description: 'Integración directa con la Claude API para automatizar tareas repetitivas: procesamiento de texto, generación de respuestas contextuales y flujos condicionales. Corriendo en un servidor Linux con Docker.',
    tech: ['Node.js', 'Claude API', 'Docker', 'Linux'],
    image: null,
    links: { github: '#', live: null },
    status: 'Mantenimiento',
  },
];

export const blogPosts = [
  {
    id: 1,
    title: 'Cómo uso la IA en mi flujo de trabajo diario como developer',
    excerpt: 'No como sustituto, sino como copiloto. Mis estrategias reales para trabajar con Claude.',
    date: 'Próximamente',
    tags: ['AI', 'Workflow', 'Productividad'],
    comingSoon: true,
  },
  {
    id: 2,
    title: 'De idea a producción: mi stack para proyectos en solitario',
    excerpt: 'JavaScript, Node, Docker y Railway: el stack que me permite lanzar productos completos solo.',
    date: 'Próximamente',
    tags: ['Node.js', 'Docker', 'Deploy'],
    comingSoon: true,
  },
  {
    id: 3,
    title: 'Docker para developers frontend: lo que necesitas saber',
    excerpt: 'Guía práctica para empezar a containerizar tus apps sin dolor.',
    date: 'Próximamente',
    tags: ['Docker', 'DevOps', 'Tutorial'],
    comingSoon: true,
  },
];
