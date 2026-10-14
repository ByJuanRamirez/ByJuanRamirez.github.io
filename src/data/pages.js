// ============================================================
// PÁGINAS DE SERVICIO, PROYECTO Y CONTRATACIÓN
// Cada página apunta a un grupo de búsquedas (ver "keywords").
// Se prerenderizan al compilar en /servicios/<slug>/, /proyectos/<slug>/
// y /contratar-desarrollador-freelance-ia/.
// ============================================================

export const servicePages = [
  {
    slug: 'agentes-de-ia',
    nav: 'Agentes de IA',
    title: 'Desarrollo de agentes de IA a medida · Desarrollador freelance',
    description:
      'Desarrollador freelance de agentes de IA: agentes autónomos que reciben mensajes, deciden y ejecutan tareas solos, con Claude o Gemini, desplegados en tu servidor.',
    h1: 'Desarrollo de *agentes de IA* a medida.',
    lead:
      'Construyo agentes de inteligencia artificial que trabajan por su cuenta: reciben una petición, deciden qué hacer, usan herramientas y te devuelven el resultado. No es un prototipo en un notebook, es un servicio que corre en producción.',
    keywords: [
      'desarrollador de agentes de IA', 'crear un agente de IA', 'agentes autónomos', 'agente de IA para empresas',
      'agentes de inteligencia artificial a medida', 'AI agent developer', 'freelance agentes IA',
    ],
    intro: [
      'Un agente de IA es un programa que combina un modelo de lenguaje con herramientas reales: puede leer mensajes, consultar una base de datos, llamar a una API o ejecutar un flujo, y decide en cada paso qué acción tomar. La diferencia con un chatbot es que el agente no solo responde: actúa.',
      'Mi trabajo es convertir esa idea en un sistema fiable. Defino qué puede y qué no puede hacer el agente, conecto el modelo con tus datos y servicios, pongo límites y registros para que sepas qué hizo y por qué, y lo dejo desplegado en un servidor que tú controlas.',
    ],
    includes: [
      ['Diseño del agente', 'Objetivo, herramientas que puede usar, reglas y casos límite, escritos antes de programar.'],
      ['Integración con modelos', 'Claude (Anthropic) o Gemini (Google AI Studio), según costo, calidad y latencia que necesites.'],
      ['Herramientas y datos', 'Conexión con tus APIs, base de datos, hojas de cálculo o servicios externos.'],
      ['Canales', 'Telegram, una API propia o tu aplicación web como puerta de entrada al agente.'],
      ['Despliegue y operación', 'Docker, servidor Linux o Railway, con registros para revisar cada decisión del agente.'],
    ],
    useCases: [
      'Un asistente interno que responde preguntas sobre tus procesos y ejecuta tareas repetitivas.',
      'Un agente en Telegram que recibe pedidos o solicitudes y los registra sin intervención manual.',
      'Un agente que clasifica correos, mensajes o tickets y los envía al lugar correcto.',
      'Un agente que prepara reportes a partir de datos que hoy se copian a mano.',
    ],
    tech: ['JavaScript', 'Node.js', 'OpenClaw', 'Claude API', 'Google AI Studio', 'Telegram Bot API', 'Docker'],
    projects: ['agente-telegram', 'bot-claude'],
    faq: [
      ['¿En qué se diferencia un agente de IA de un chatbot?', 'Un chatbot conversa; un agente además ejecuta acciones con herramientas reales (consultar datos, llamar APIs, registrar información) y decide por su cuenta qué paso dar.'],
      ['¿Qué modelo de IA usas?', 'He trabajado con modelos de Claude y de Google AI Studio. Elijo según la tarea: calidad de razonamiento, costo por uso y velocidad de respuesta.'],
      ['¿El agente puede trabajar sin supervisión?', 'Sí, para tareas bien acotadas. Por eso defino límites claros, registros de cada acción y, cuando hace falta, un paso de aprobación humana antes de acciones sensibles.'],
    ],
  },
  {
    slug: 'chatbots-con-ia',
    nav: 'Chatbots con IA',
    title: 'Chatbots con IA para Telegram y tu web · Freelance',
    description:
      'Desarrollo de chatbots con inteligencia artificial para Telegram y sitios web: conversación con contexto, conexión a tus datos y despliegue en tu servidor.',
    h1: '*Chatbots con IA* para Telegram y tu web.',
    lead:
      'Un chatbot con inteligencia artificial que entiende lo que le escriben, recuerda el contexto de la conversación y responde con información de tu negocio, no con frases genéricas.',
    keywords: [
      'chatbot con IA', 'bot de Telegram con IA', 'chatbot para Telegram', 'chatbot a medida', 'chatbot con inteligencia artificial',
      'chatbot para mi negocio', 'crear chatbot con Claude', 'chatbot con Gemini',
    ],
    intro: [
      'Los bots de reglas («escribe 1 para ventas») se quedan cortos en cuanto alguien pregunta algo distinto. Un chatbot con un modelo de lenguaje entiende preguntas escritas de cualquier forma y puede responder con la información que le das: tus servicios, tus horarios, tus preguntas frecuentes o datos de tu sistema.',
      'Construyo el bot completo: el canal (Telegram o un widget en tu web), el servidor que guarda el contexto de cada conversación, la conexión con el modelo de IA y las reglas para que no invente lo que no sabe.',
    ],
    includes: [
      ['Bot de Telegram', 'Construido sobre la API oficial de bots de Telegram, con comandos, botones y conversación libre.'],
      ['Chat en tu sitio web', 'Un widget ligero conectado a tu propio backend, sin depender de plataformas de terceros.'],
      ['Contexto y memoria', 'Historial por usuario para que el bot recuerde de qué se está hablando.'],
      ['Conocimiento de tu negocio', 'Respuestas basadas en tus documentos o tu base de datos.'],
      ['Traspaso a una persona', 'Cuando el bot no sabe algo, lo dice y deja el caso listo para que lo atiendas tú.'],
    ],
    useCases: [
      'Atención de preguntas frecuentes las 24 horas.',
      'Recepción de pedidos, reservas o solicitudes por Telegram.',
      'Un asistente para tu equipo que responde sobre procesos internos.',
      'Notificaciones y recordatorios con respuestas en lenguaje natural.',
    ],
    tech: ['Node.js', 'Telegram Bot API', 'Claude API', 'Google AI Studio', 'PostgreSQL', 'Docker'],
    projects: ['agente-telegram', 'bot-claude'],
    faq: [
      ['¿El chatbot puede responder con la información de mi empresa?', 'Sí. Le doy acceso a tus documentos o a tu base de datos y le indico que responda solo con esa información, para reducir respuestas inventadas.'],
      ['¿Funciona en Telegram?', 'Sí, he construido agentes que operan desde Telegram con la API oficial de bots. También puedo ponerlo como chat dentro de tu sitio web.'],
      ['¿Cuánto cuesta mantener un chatbot con IA?', 'Depende del volumen de mensajes y del modelo. Te explico el costo estimado por uso antes de empezar y elijo el modelo que mejor equilibre calidad y precio.'],
    ],
  },
  {
    slug: 'integracion-de-ia',
    nav: 'Integración de IA',
    title: 'Integración de IA en tu app: Claude y Gemini · Freelance',
    description:
      'Integro modelos de lenguaje (LLM) como Claude y Gemini en aplicaciones web existentes: APIs, prompts, control de costos y despliegue en producción.',
    h1: '*Integración de IA* en tu aplicación.',
    lead:
      'Ya tienes un producto y quieres que use inteligencia artificial. Conecto modelos de lenguaje a tu aplicación de forma segura, medible y sin reescribir lo que ya funciona.',
    keywords: [
      'integrar IA en mi aplicación', 'integración de modelos de lenguaje', 'desarrollador LLM', 'integrar Claude API',
      'integrar Gemini API', 'Google AI Studio', 'IA en aplicaciones web', 'API de inteligencia artificial',
    ],
    intro: [
      'Integrar un modelo de IA es más que llamar a una API: hay que decidir qué datos se envían, cómo se escriben los prompts, cómo se valida la respuesta, qué pasa si el servicio falla y cuánto cuesta cada llamada.',
      'Trabajo sobre tu stack actual. Agrego un servicio en tu backend que habla con el modelo, protege tus claves, limita el uso y devuelve resultados listos para tu interfaz.',
    ],
    includes: [
      ['Análisis del caso de uso', 'Dónde aporta valor la IA en tu producto y dónde no hace falta.'],
      ['Servicio de IA en tu backend', 'Endpoints en Node.js que llaman al modelo con tus claves protegidas.'],
      ['Prompts y validación', 'Instrucciones versionadas y validación de la salida antes de mostrarla.'],
      ['Control de costos', 'Límites de peticiones, caché y elección del modelo adecuado para cada tarea.'],
      ['Interfaz', 'Componentes en tu frontend para mostrar resultados, estados de carga y errores.'],
    ],
    useCases: [
      'Resumir, clasificar o extraer datos de textos que hoy se procesan a mano.',
      'Generar borradores de respuestas, descripciones o reportes dentro de tu app.',
      'Búsqueda en lenguaje natural sobre la información de tu producto.',
      'Revisión automática de formularios o documentos antes de guardarlos.',
    ],
    tech: ['Claude API', 'Google AI Studio', 'Node.js', 'Express', 'JavaScript', 'React', 'JWT'],
    projects: ['bot-claude', 'api-rest-jwt'],
    faq: [
      ['¿Tengo que cambiar mi stack para usar IA?', 'No. Agrego la integración como un servicio en tu backend actual y la conecto con tu frontend.'],
      ['¿Mis datos quedan expuestos?', 'Las claves de la API quedan en el servidor, nunca en el navegador, y solo se envía al modelo la información necesaria para cada tarea.'],
      ['¿Con qué modelos trabajas?', 'Con modelos de Claude (Anthropic) y de Google AI Studio (Gemini).'],
    ],
  },
  {
    slug: 'automatizacion-con-ia',
    nav: 'Automatización con IA',
    title: 'Automatización de procesos con IA · Desarrollador freelance',
    description:
      'Automatizo tareas repetitivas con inteligencia artificial: procesar mensajes y textos, mover datos entre sistemas y ejecutar flujos sin intervención manual.',
    h1: '*Automatización* de procesos con IA.',
    lead:
      'Las tareas que tu equipo repite todos los días —copiar datos, leer mensajes, clasificar solicitudes, armar reportes— pueden hacerse solas. Construyo automatizaciones a medida que usan IA donde hace falta entender texto.',
    keywords: [
      'automatización con IA', 'automatizar procesos con inteligencia artificial', 'automatizar tareas repetitivas',
      'automatización de flujos', 'bots de automatización', 'automatización para pymes',
    ],
    intro: [
      'Una buena automatización empieza por entender el proceso: de dónde vienen los datos, qué decisión se toma y a dónde van. Muchas partes se resuelven con código tradicional; la IA entra cuando hay que interpretar texto libre, como un mensaje, un correo o un documento.',
      'El resultado es un servicio que corre en un servidor, se ejecuta solo y deja registro de cada paso, para que puedas confiar en él y revisar qué pasó.',
    ],
    includes: [
      ['Mapeo del proceso', 'Qué pasos se automatizan, cuáles necesitan una persona y qué reglas aplican.'],
      ['Procesamiento de texto con IA', 'Lectura, clasificación y extracción de datos con Claude o Gemini.'],
      ['Integraciones', 'Conexión con APIs, bases de datos y canales como Telegram.'],
      ['Ejecución programada', 'Tareas periódicas o disparadas por eventos, corriendo en Docker.'],
      ['Registros y alertas', 'Historial de cada ejecución y avisos cuando algo falla.'],
    ],
    useCases: [
      'Procesar mensajes entrantes y crear registros en tu sistema.',
      'Generar respuestas con contexto y ejecutar flujos condicionales.',
      'Consolidar información de varias fuentes en un reporte.',
      'Revisar y etiquetar documentos o solicitudes automáticamente.',
    ],
    tech: ['Node.js', 'Claude API', 'Google AI Studio', 'Docker', 'Linux / Bash', 'PostgreSQL'],
    projects: ['bot-claude', 'agente-telegram'],
    faq: [
      ['¿Toda automatización necesita IA?', 'No. Uso IA solo en los pasos que requieren entender texto; el resto se resuelve con código tradicional, que es más barato y predecible.'],
      ['¿Dónde corre la automatización?', 'En un contenedor Docker sobre un servidor Linux o en Railway, según lo que prefieras mantener.'],
      ['¿Qué pasa si algo falla?', 'Cada ejecución queda registrada y configuro avisos para que te enteres de los errores sin revisar a mano.'],
    ],
  },
  {
    slug: 'desarrollo-web-fullstack',
    nav: 'Desarrollo web fullstack',
    title: 'Desarrollador web fullstack freelance · JavaScript y React',
    description:
      'Desarrollador fullstack freelance en Colombia: aplicaciones web y MVP con JavaScript, React, Node.js y PostgreSQL, desde el diseño hasta el despliegue.',
    h1: 'Desarrollo web *fullstack* de la idea a producción.',
    lead:
      'Aplicaciones web completas hechas por una sola persona responsable: interfaz, API, base de datos e infraestructura. Ideal para un MVP o para un sistema interno que tiene que funcionar desde el primer día.',
    keywords: [
      'desarrollador fullstack freelance', 'desarrollador web freelance Colombia', 'programador freelance JavaScript',
      'desarrollo de aplicaciones web a medida', 'desarrollo de MVP', 'desarrollador React freelance', 'programador freelance remoto',
    ],
    intro: [
      'Trabajar con un desarrollador fullstack significa una sola persona que entiende el producto de punta a punta. No hay pasos perdidos entre el frontend y el backend, y las decisiones se toman pensando en todo el sistema.',
      'Sigo un proceso en seis etapas —planear, mapear, diseñar, construir, lanzar e iterar— con versiones en línea desde temprano, para que veas y uses el producto real mientras se construye.',
    ],
    includes: [
      ['Interfaces', 'Frontends rápidos y accesibles con JavaScript, React o Astro, y CSS escrito a mano.'],
      ['Backend y APIs', 'Servicios REST en Node.js y Express con autenticación y validación.'],
      ['Base de datos', 'Modelado en PostgreSQL pensado para crecer sin reescribirse.'],
      ['Despliegue', 'Docker, Railway, servidores Linux y GitHub Actions para publicar en cada cambio.'],
      ['Iteración', 'Versiones pequeñas y frecuentes con notas de lo que cambió.'],
    ],
    useCases: [
      'El MVP de un producto que necesitas validar con usuarios reales.',
      'Un sistema de gestión interna con roles, panel de administración y CRUD completo.',
      'Una aplicación web con funciones de IA integradas desde el diseño.',
      'Sitios y portafolios rápidos, accesibles y optimizados para buscadores.',
    ],
    tech: ['JavaScript', 'TypeScript', 'React', 'Astro', 'Node.js', 'Express', 'PostgreSQL', 'Docker', 'GitHub Actions'],
    projects: ['sistema-gestion-interna', 'bitacora'],
    faq: [
      ['¿Haces el diseño o solo programas?', 'Hago ambos: maquetas para teléfono y escritorio, y después la implementación completa.'],
      ['¿Puedo ver avances durante el proyecto?', 'Sí. Publico versiones en línea desde temprano para que pruebes el producto real, no capturas de pantalla.'],
      ['¿Te adaptas a un stack existente?', 'Sí. Trabajo con el stack y el equipo que ya tienes cuando el proyecto lo requiere.'],
    ],
  },
  {
    slug: 'apis-y-backend',
    nav: 'APIs y backend',
    title: 'Desarrollo de APIs REST y backend con Node.js · Freelance',
    description:
      'Desarrollador backend freelance: APIs REST en Node.js y Express con JWT, rate limiting, validación, PostgreSQL y despliegue con Docker o Railway.',
    h1: 'APIs y *backend* con Node.js.',
    lead:
      'El backend es lo que no se ve y lo que más se nota cuando falla. Construyo APIs seguras, documentadas y listas para producción, con datos bien modelados desde el principio.',
    keywords: [
      'desarrollador backend freelance', 'desarrollo de API REST', 'API con Node.js', 'desarrollador Node.js freelance',
      'Express JWT', 'backend para app móvil', 'PostgreSQL',
    ],
    intro: [
      'Una API de producción necesita más que rutas que respondan: autenticación, validación de entrada, límites de peticiones, manejo de errores, documentación y un despliegue estable.',
      'Diseño el esquema de datos pensando en cómo va a crecer el producto y dejo la API documentada para que tu frontend, tu app móvil u otros equipos la usen sin depender de mí.',
    ],
    includes: [
      ['Diseño de la API', 'Recursos, endpoints y contratos claros antes de escribir código.'],
      ['Seguridad', 'Autenticación con JWT, validación de entrada y rate limiting.'],
      ['Base de datos', 'Esquemas SQL en PostgreSQL con migraciones.'],
      ['Documentación', 'Documentación integrada para quien consuma la API.'],
      ['Despliegue', 'Contenedores Docker y Railway o servidores Linux.'],
    ],
    useCases: [
      'El backend de una aplicación web o móvil.',
      'Una API pública o para socios con autenticación y límites de uso.',
      'Un servicio que expone funciones de IA a otras aplicaciones.',
      'La migración de un backend frágil a uno mantenible.',
    ],
    tech: ['Node.js', 'Express', 'PostgreSQL', 'REST / JWT', 'Docker', 'Railway'],
    projects: ['api-rest-jwt', 'sistema-gestion-interna'],
    faq: [
      ['¿La API queda documentada?', 'Sí, con documentación integrada para que otros desarrolladores la usen.'],
      ['¿Dónde se despliega?', 'En Railway o en un servidor Linux con Docker, según tus necesidades y presupuesto.'],
      ['¿Puedes trabajar sobre una API existente?', 'Sí. Puedo revisarla, corregir problemas de seguridad o rendimiento y extenderla.'],
    ],
  },
];

// Detalle de los proyectos: se combina con "experience" de portfolio.js por "slug".
export const projectPages = {
  'agente-telegram': {
    title: 'Agente de IA autogestionado en Telegram · Caso de estudio',
    description: 'Caso de estudio: agente de IA que opera solo desde Telegram, construido en JavaScript sobre OpenClaw con modelos de Google AI Studio.',
    problem: 'Que un agente pudiera recibir mensajes y ejecutar tareas por su cuenta, sin que una persona tuviera que intervenir en cada paso.',
    solution: 'Un agente en JavaScript sobre OpenClaw que usa Telegram como canal de conversación: recibe mensajes, decide qué hacer con un modelo de Google AI Studio y ejecuta la tarea.',
    services: ['agentes-de-ia', 'chatbots-con-ia', 'automatizacion-con-ia'],
  },
  'bot-claude': {
    title: 'Bot de automatización con la API de Claude · Caso de estudio',
    description: 'Caso de estudio: servicio en Node.js que usa la API de Claude para procesar texto, responder con contexto y ejecutar flujos condicionales, en Docker.',
    problem: 'Procesar texto de forma automática, generar respuestas que tuvieran en cuenta el contexto y decidir qué flujo ejecutar en cada caso.',
    solution: 'Un servicio en Node.js que llama a la API de Claude y ejecuta flujos condicionales según la respuesta. Corre dentro de Docker en un servidor Linux.',
    services: ['integracion-de-ia', 'automatizacion-con-ia', 'chatbots-con-ia'],
  },
  'api-rest-jwt': {
    title: 'API REST con JWT y rate limiting en Node.js · Caso de estudio',
    description: 'Caso de estudio: API de producción en Node.js y Express con JWT, límites de peticiones, validación de entrada y documentación, desplegada en Railway.',
    problem: 'Una API pública necesitaba autenticación, protección contra abuso y documentación para quien la consumiera.',
    solution: 'Una API en Node.js y Express con tokens JWT, rate limiting, validación de entrada y documentación integrada, operando en Railway.',
    services: ['apis-y-backend', 'integracion-de-ia'],
  },
  'sistema-gestion-interna': {
    title: 'Sistema de gestión interna en Node.js · Caso de estudio',
    description: 'Caso de estudio: aplicación web de gestión de recursos internos con autenticación, panel de administración y CRUD completo, desplegada con Docker.',
    problem: 'Gestionar recursos internos en un solo lugar, con acceso seguro y un panel de administración.',
    solution: 'Una aplicación web en Node.js, Express y PostgreSQL con autenticación segura, panel de administración y CRUD completo, desplegada con Docker.',
    services: ['desarrollo-web-fullstack', 'apis-y-backend'],
  },
};

export const bitacoraPage = {
  slug: 'bitacora',
  title: 'Bitácora: app con FastAPI y Flutter · Caso de estudio',
  description: 'Caso de estudio completo: de los requerimientos al despliegue de una app de gestión con FastAPI, MySQL y Flutter, con 117 pruebas y 11 versiones en 5 días.',
  name: 'Bitácora',
  summary: 'App de gestión con roles y cinco módulos, hecha con FastAPI, MySQL y Flutter para Android, web y escritorio. Este es el proyecto que uso para mostrar mi proceso de trabajo, etapa por etapa.',
  tech: ['Python', 'FastAPI', 'MySQL', 'Flutter', 'Railway'],
  date: 'Oct 2026',
  services: ['desarrollo-web-fullstack', 'apis-y-backend'],
};

export const hirePage = {
  slug: 'contratar-desarrollador-freelance-ia',
  title: 'Contratar un desarrollador freelance de IA en Colombia',
  description:
    'Cómo trabajar con un desarrollador freelance de IA remoto desde Colombia: servicios, proceso en seis etapas, horario compatible con EE. UU. y cómo pedir una propuesta.',
  h1: 'Contrata un *desarrollador freelance* de IA.',
  lead:
    'Si buscas a alguien que construya tu agente, tu chatbot o tu aplicación con IA y además la deje funcionando en producción, aquí tienes todo lo que necesitas saber antes de escribirme.',
  keywords: [
    'contratar desarrollador freelance IA', 'desarrollador freelance de inteligencia artificial', 'freelance IA Colombia',
    'desarrollador remoto Colombia', 'programador freelance Latinoamérica', 'contratar programador freelance', 'nearshore Colombia',
  ],
  why: [
    ['Producto completo', 'No solo la parte de IA: interfaz, API, base de datos y despliegue, con una sola persona responsable.'],
    ['En producción desde temprano', 'Publico versiones que puedes usar desde las primeras semanas, no capturas de pantalla.'],
    ['Horario compatible', 'Trabajo desde Colombia (UTC−5), el mismo horario que la costa este de Estados Unidos en invierno y cercano al de toda Latinoamérica.'],
    ['Comunicación directa', 'Hablas con quien construye. Sin intermediarios ni cuentas que se pasan de mano en mano.'],
  ],
  steps: [
    ['Cuéntame el proyecto', 'Escríbeme por LinkedIn con qué quieres construir, para cuándo y con qué presupuesto.'],
    ['Recibe una propuesta', 'Te envío alcance, entregables, tiempos y costo, con lo que queda dentro y fuera.'],
    ['Empezamos a construir', 'Planeamos, diseñamos y publicamos la primera versión en línea lo antes posible.'],
    ['Iteramos', 'Cada comentario entra como una versión nueva, pequeña y publicada.'],
  ],
};
