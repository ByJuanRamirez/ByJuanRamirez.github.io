// Páginas internas: servicios, proyectos, contratación, buscador e índices.
// Devuelve, para cada página, su marcado y sus metadatos SEO.
// No depende del navegador: se usa al compilar (vite.config.js).
import { profile, site, experience, process, services } from '../data/portfolio.js';
import { servicePages, projectPages, bitacoraPage, hirePage } from '../data/pages.js';
import { serviceNav } from '../data/service-nav.js';

if (JSON.stringify(serviceNav) !== JSON.stringify(servicePages.map(({ slug, nav }) => ({ slug, nav })))) {
  throw new Error('src/data/service-nav.js no coincide con los servicios de src/data/pages.js');
}
import { navHTML } from '../sections/nav.js';
import { contactHTML } from '../sections/contact.js';
import { ICONS } from '../icons.js';

const em = (s) => s.replace(/\*([^*]+)\*/g, '<em>$1</em>');
const plain = (s) => s.replace(/\*/g, '');
const abs = (path) => new URL(path, site.url).href;

const serviceBySlug = Object.fromEntries(servicePages.map((s) => [s.slug, s]));

// Proyectos con página: los de "experience" + Bitácora
export const projects = [
  ...experience.filter((p) => p.slug).map((p) => ({
    ...p, ...projectPages[p.slug], name: p.title, summary: p.description,
  })),
  { ...bitacoraPage, status: 'Producción', duration: '', links: {} },
];
const projectBySlug = Object.fromEntries(projects.map((p) => [p.slug, p]));

const servicePath = (slug) => `/servicios/${slug}/`;
const projectPath = (slug) => `/proyectos/${slug}/`;

// ── Piezas comunes ─────────────────────────────────────────
function crumbsHTML(trail) {
  return `
    <nav class="crumbs mono" aria-label="Ruta de navegación">
      <ol>
        ${trail.map((c, i) => i < trail.length - 1
          ? `<li><a href="${c.path}">${c.name}</a></li>`
          : `<li><span aria-current="page">${c.name}</span></li>`).join('')}
      </ol>
    </nav>`;
}

function breadcrumbLd(trail) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: abs(c.path) })),
  };
}

function faqLd(faq, path) {
  return {
    '@type': 'FAQPage',
    '@id': `${abs(path)}#faq`,
    mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  };
}

function pageHero({ trail, kicker, h1, lead, cta = true }) {
  return `
    <header class="page-hero wrap">
      ${crumbsHTML(trail)}
      <p class="page-hero__kicker mono">${kicker}</p>
      <h1 class="page-hero__title">${em(h1)}</h1>
      ${lead ? `<p class="page-hero__lead">${lead}</p>` : ''}
      ${cta ? `<div class="hero__cta page-hero__cta">
        <a href="${profile.linkedin}" target="_blank" rel="noopener" class="btn">Cuéntame tu proyecto ${ICONS.arrow}</a>
        <a href="/${hirePage.slug}/" class="link-under">Cómo trabajo</a>
      </div>` : ''}
    </header>`;
}

function block(label, title, body) {
  return `
    <section class="page-block wrap">
      <p class="page-block__label mono">${label}</p>
      <div class="page-block__body">
        ${title ? `<h2 class="page-block__title">${title}</h2>` : ''}
        ${body}
      </div>
    </section>`;
}

const defList = (items) => `
  <dl class="page-list">
    ${items.map(([t, d]) => `<div><dt>${t}</dt><dd>${d}</dd></div>`).join('')}
  </dl>`;

const faqList = (faq) => `
  <div class="faq">
    ${faq.map(([q, a], i) => `
      <details class="faq__item"${i === 0 ? ' open' : ''}>
        <summary class="faq__q"><h3>${q}</h3><span class="faq__icon mono" aria-hidden="true">+</span></summary>
        <p class="faq__a">${a}</p>
      </details>`).join('')}
  </div>`;

const cardList = (cards) => `
  <ul class="cards">
    ${cards.map((c) => `
      <li class="card">
        <a href="${c.path}" class="card__link">
          <span class="card__meta mono">${c.meta}</span>
          <span class="card__title">${c.title}</span>
          ${c.text ? `<span class="card__text">${c.text}</span>` : ''}
          <span class="card__arrow" aria-hidden="true">${ICONS.arrow}</span>
        </a>
      </li>`).join('')}
  </ul>`;

const serviceCard = (s) => ({ path: servicePath(s.slug), meta: 'Servicio', title: s.nav, text: s.description });
const projectCard = (p) => ({ path: projectPath(p.slug), meta: `Proyecto · ${p.date}`, title: p.name, text: p.summary });

const shell = (body) => `
  ${navHTML()}
  <main class="page" id="contenido">${body}</main>
  ${contactHTML()}
`;

const HOME = { name: 'Inicio', path: '/' };
const SERVICES = { name: 'Servicios', path: '/servicios/' };
const PROJECTS = { name: 'Proyectos', path: '/proyectos/' };

// ── Páginas ────────────────────────────────────────────────
function servicePage(s) {
  const path = servicePath(s.slug);
  const trail = [HOME, SERVICES, { name: s.nav, path }];
  const related = s.projects.map((slug) => projectBySlug[slug]).filter(Boolean);
  const others = servicePages.filter((o) => o.slug !== s.slug);

  const body = [
    pageHero({ trail, kicker: `Servicio · ${profile.role}`, h1: s.h1, lead: s.lead }),
    block('Qué es', null, s.intro.map((p) => `<p class="page-prose">${p}</p>`).join('')),
    block('Qué incluye', 'Lo que construyo.', defList(s.includes)),
    block('Para qué sirve', 'Casos de uso.', `<ul class="page-bullets">${s.useCases.map((u) => `<li>${u}</li>`).join('')}</ul>`),
    block('Tecnologías', 'Herramientas.', `<p class="page-tags mono">${s.tech.join(' · ')}</p>`),
    related.length ? block('Proyectos', 'Trabajo relacionado.', cardList(related.map(projectCard))) : '',
    block('Preguntas', 'Preguntas frecuentes.', faqList(s.faq)),
    block('Más servicios', 'También hago.', cardList(others.map(serviceCard))),
  ].join('');

  return {
    path, type: 'Servicio', title: s.title, description: s.description, h1: plain(s.h1),
    keywords: s.keywords, text: [s.lead, ...s.intro, ...s.includes.flat(), ...s.useCases, ...s.faq.flat(), s.tech.join(' ')].join(' '),
    html: shell(body),
    jsonLd: [
      {
        '@type': 'Service',
        '@id': `${abs(path)}#service`,
        name: s.nav,
        serviceType: s.nav,
        description: s.description,
        url: abs(path),
        provider: { '@id': `${site.url}#person` },
        areaServed: ['Colombia', 'Latinoamérica', 'Estados Unidos'],
        availableChannel: { '@type': 'ServiceChannel', serviceUrl: profile.linkedin },
      },
      breadcrumbLd(trail),
      faqLd(s.faq, path),
    ],
  };
}

function projectPage(p) {
  const path = projectPath(p.slug);
  const trail = [HOME, PROJECTS, { name: p.name, path }];
  const svc = (p.services || []).map((slug) => serviceBySlug[slug]).filter(Boolean);
  const isBitacora = p.slug === bitacoraPage.slug;

  const facts = [
    ['Estado', p.status],
    ['Fecha', p.date],
    p.duration && ['Duración', p.duration],
    ['Tecnologías', (p.tech || []).join(', ')],
  ].filter(Boolean);

  const links = [
    p.links?.live && p.links.live !== '#' && `<a class="link-under" href="${p.links.live}" target="_blank" rel="noopener">Ver sitio</a>`,
    p.links?.github && p.links.github !== '#' && `<a class="link-under" href="${p.links.github}" target="_blank" rel="noopener">Ver código</a>`,
  ].filter(Boolean).join(' ');

  const body = [
    pageHero({ trail, kicker: `Caso de estudio · ${p.date}`, h1: `${p.name}.`, lead: p.summary }),
    block('Ficha', null, `${defList(facts)}${links ? `<p class="page-links">${links}</p>` : ''}`),
    !isBitacora ? block('El reto', 'Qué había que resolver.', `<p class="page-prose">${p.problem}</p>`) : '',
    !isBitacora ? block('La solución', 'Cómo lo construí.', `<p class="page-prose">${p.solution}</p>`) : '',
    isBitacora ? block('Proceso', 'Etapa por etapa.', `
      <ol class="page-steps">
        ${process.map((st, i) => `
          <li>
            <p class="page-steps__num mono">${String(i + 1).padStart(2, '0')} · ${st.step} · ${st.readout}</p>
            <h3>${st.title}</h3>
            <p>${st.example}</p>
          </li>`).join('')}
      </ol>`) : '',
    svc.length ? block('Servicios', 'Si necesitas algo parecido.', cardList(svc.map(serviceCard))) : '',
    block('Más proyectos', 'Otros casos.', cardList(projects.filter((o) => o.slug !== p.slug).map(projectCard))),
  ].join('');

  return {
    path, type: 'Proyecto', title: p.title, description: p.description, h1: p.name,
    keywords: p.tech || [],
    text: [p.summary, p.problem, p.solution, ...(isBitacora ? process.map((s) => `${s.title} ${s.example}`) : [])].filter(Boolean).join(' '),
    html: shell(body),
    jsonLd: [
      {
        '@type': 'CreativeWork',
        '@id': `${abs(path)}#work`,
        name: p.name,
        description: p.description,
        url: abs(path),
        author: { '@id': `${site.url}#person` },
        keywords: (p.tech || []).join(', '),
        inLanguage: 'es',
      },
      breadcrumbLd(trail),
    ],
  };
}

function hire() {
  const path = `/${hirePage.slug}/`;
  const trail = [HOME, { name: 'Contratar', path }];
  const body = [
    pageHero({ trail, kicker: `Freelance · ${profile.location} · ${profile.timezone}`, h1: hirePage.h1, lead: hirePage.lead }),
    block('Por qué', 'Qué obtienes.', defList(hirePage.why)),
    block('Servicios', 'Qué puedo construir para ti.', cardList(servicePages.map(serviceCard))),
    block('Cómo empezamos', 'Cuatro pasos.', `<ol class="page-steps">${hirePage.steps.map(([t, d], i) => `
      <li><p class="page-steps__num mono">${String(i + 1).padStart(2, '0')}</p><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>`),
    block('Proceso', 'Seis etapas, un ejemplo real.', `<p class="page-prose">${process.map((s) => s.step).join(' → ')}. Puedes ver cada etapa con cifras reales en el caso de <a class="link-under" href="${projectPath('bitacora')}">Bitácora</a>.</p>`),
    block('Trabajo', 'Proyectos recientes.', cardList(projects.map(projectCard))),
  ].join('');

  return {
    path, type: 'Página', title: hirePage.title, description: hirePage.description, h1: plain(hirePage.h1),
    keywords: hirePage.keywords, text: [hirePage.lead, ...hirePage.why.flat(), ...hirePage.steps.flat()].join(' '),
    html: shell(body),
    jsonLd: [breadcrumbLd(trail)],
  };
}

function servicesIndex() {
  const path = SERVICES.path;
  const trail = [HOME, SERVICES];
  const body = [
    pageHero({ trail, kicker: profile.role, h1: 'Servicios de *IA* y desarrollo web.', lead: 'Agentes, chatbots, integraciones y automatizaciones con IA, y el producto completo alrededor: interfaz, API, base de datos y despliegue.' }),
    block('Todos', null, cardList(servicePages.map(serviceCard))),
  ].join('');
  return {
    path, type: 'Página', title: 'Servicios de desarrollo con IA · Freelance en Colombia',
    description: 'Servicios de un desarrollador freelance de IA: agentes de IA, chatbots para Telegram y web, integración de Claude y Gemini, automatización, desarrollo fullstack y APIs.',
    h1: 'Servicios de IA y desarrollo web', keywords: ['servicios', 'desarrollo con IA'], text: servicePages.map((s) => s.nav).join(' '),
    html: shell(body),
    jsonLd: [
      breadcrumbLd(trail),
      { '@type': 'ItemList', itemListElement: servicePages.map((s, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(servicePath(s.slug)), name: s.nav })) },
    ],
  };
}

function projectsIndex() {
  const path = PROJECTS.path;
  const trail = [HOME, PROJECTS];
  const body = [
    pageHero({ trail, kicker: 'Casos de estudio', h1: 'Proyectos con *IA* y desarrollo web.', lead: 'Agentes, bots y aplicaciones que construí y que hoy están en producción o en mantenimiento.' }),
    block('Todos', null, cardList(projects.map(projectCard))),
  ].join('');
  return {
    path, type: 'Página', title: 'Proyectos y casos de estudio · Juan Diego Cabrera',
    description: 'Casos de estudio de un desarrollador freelance de IA: agente en Telegram, bot con la API de Claude, API REST con JWT, sistema de gestión y la app Bitácora.',
    h1: 'Proyectos', keywords: ['proyectos', 'casos de estudio', 'portafolio'], text: projects.map((p) => p.name).join(' '),
    html: shell(body),
    jsonLd: [
      breadcrumbLd(trail),
      { '@type': 'ItemList', itemListElement: projects.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(projectPath(p.slug)), name: p.name })) },
    ],
  };
}

function searchPage() {
  const path = '/buscar/';
  const trail = [HOME, { name: 'Buscar', path }];
  const body = `
    ${pageHero({ trail, kicker: 'Buscador', h1: 'Buscar en el sitio.', lead: 'Servicios, proyectos y preguntas frecuentes.', cta: false })}
    <section class="wrap search-page">
      <form class="search-page__form" action="/buscar/" method="get" role="search">
        <label class="sr-only" for="searchPageInput">Buscar</label>
        <input id="searchPageInput" class="search-input" type="search" name="q" placeholder="Ej.: chatbot para Telegram" autocomplete="off" />
        <button class="btn" type="submit">Buscar</button>
      </form>
      <ul class="search-results" id="searchPageResults" aria-live="polite"></ul>
      <noscript><p class="page-prose">El buscador necesita JavaScript. Puedes ver todos los <a class="link-under" href="/servicios/">servicios</a> y <a class="link-under" href="/proyectos/">proyectos</a>.</p></noscript>
    </section>`;
  return {
    path, type: 'Página', title: 'Buscar · Juan Diego Cabrera', description: 'Busca servicios, proyectos y preguntas frecuentes.',
    h1: 'Buscar', noindex: true, skipIndex: true, html: shell(body), jsonLd: [],
  };
}

export function renderPages() {
  return [
    ...servicePages.map(servicePage),
    ...projects.map(projectPage),
    hire(),
    servicesIndex(),
    projectsIndex(),
    searchPage(),
  ];
}

// Entradas del buscador para la página de inicio (secciones y preguntas)
export function homeSearchEntries(faq) {
  return [
    { path: '/', type: 'Inicio', title: `${profile.name} — ${profile.role}`, text: site.description, keywords: services.map((s) => s.title) },
    ...faq.map((f) => ({ path: '/#preguntas', type: 'Pregunta', title: f.q, text: f.a, keywords: [] })),
    { path: '/#stack', type: 'Sección', title: 'Stack: herramientas que uso a diario', text: 'JavaScript TypeScript React Astro Node.js Express PostgreSQL Docker Linux Railway GitHub Actions Claude API Google AI Studio OpenClaw Telegram', keywords: [] },
    { path: '/#proceso', type: 'Sección', title: 'Proceso: cómo trabajamos juntos', text: process.map((p) => `${p.title} ${p.text}`).join(' '), keywords: [] },
  ];
}

export { servicePath, projectPath };
