import { defineConfig } from 'vite';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

// ============================================================
// SEO en tiempo de compilación
// - Prerenderiza el sitio dentro de #app: los buscadores y los rastreadores
//   de IA reciben el contenido completo sin ejecutar JavaScript.
// - Genera <head> (title, description, Open Graph, Twitter, JSON-LD,
//   verificación de buscadores y Google Analytics) desde src/data/portfolio.js.
// - Genera las páginas internas (servicios, proyectos, contratación, buscador)
//   a partir de src/pages/render.js, usando dist/index.html como plantilla.
// - Emite sitemap.xml y search-index.json (índice del buscador).
// ============================================================

const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/"/g, '&quot;')
  .replace(/</g, '&lt;').replace(/>/g, '&gt;');

function jsonLd({ site, profile, services, skills, faq }) {
  const url = site.url;
  const person = {
    '@type': 'Person',
    '@id': `${url}#person`,
    name: profile.name,
    alternateName: profile.handle.replace('@', ''),
    jobTitle: profile.role,
    description: site.description,
    url,
    image: `${url}perfil.jpeg`,
    address: { '@type': 'PostalAddress', addressCountry: 'CO' },
    knowsAbout: [
      'Inteligencia artificial', 'Agentes de IA', 'Chatbots', 'Modelos de lenguaje (LLM)',
      ...skills.map((s) => s.name),
    ],
    knowsLanguage: ['es'],
    sameAs: [profile.linkedin, site.github].filter(Boolean),
  };

  const service = {
    '@type': 'ProfessionalService',
    '@id': `${url}#service`,
    name: `${profile.name} — ${profile.role}`,
    description: site.description,
    url,
    image: `${url}${site.ogImage}`,
    founder: { '@id': `${url}#person` },
    provider: { '@id': `${url}#person` },
    areaServed: [
      { '@type': 'Country', name: 'Colombia' },
      { '@type': 'Place', name: 'Latinoamérica' },
      { '@type': 'Country', name: 'Estados Unidos' },
    ],
    availableLanguage: 'es',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.title, description: s.text },
      })),
    },
  };

  const website = {
    '@type': 'WebSite',
    '@id': `${url}#website`,
    url,
    name: profile.name,
    inLanguage: 'es-CO',
    publisher: { '@id': `${url}#person` },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${url}buscar/?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  };

  const page = {
    '@type': 'ProfilePage',
    '@id': `${url}#page`,
    url,
    name: site.title,
    inLanguage: 'es-CO',
    isPartOf: { '@id': `${url}#website` },
    mainEntity: { '@id': `${url}#person` },
    dateModified: new Date().toISOString(),
  };

  const faqPage = {
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return [person, service, website, page, faqPage];
}

const ldScript = (graph) =>
  `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c')}</script>`;

// <head> de una página. Sin "page" es la portada.
function seoHead(data, page) {
  const { site, profile } = data;
  const og = `${site.url}${site.ogImage}`;
  const url = page ? new URL(page.path, site.url).href : site.url;
  const title = page ? page.title : site.title;
  const description = page ? page.description : site.description;
  const shareTitle = page ? page.title : site.shareTitle;
  const shareDescription = page ? page.description : site.shareDescription;

  let graph;
  if (page) {
    const [person, , website] = jsonLd(data);
    graph = [
      person,
      website,
      {
        '@type': 'WebPage',
        '@id': `${url}#page`,
        url,
        name: title,
        description,
        inLanguage: 'es-CO',
        isPartOf: { '@id': `${site.url}#website` },
        about: { '@id': `${site.url}#person` },
        dateModified: new Date().toISOString(),
      },
      ...page.jsonLd,
    ];
  } else {
    graph = jsonLd(data);
  }

  const tags = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    `<meta name="author" content="${esc(profile.name)}" />`,
    `<meta name="robots" content="${page?.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<link rel="me" href="${profile.linkedin}" />`,
    site.github && `<link rel="me" href="${site.github}" />`,
    site.googleVerification && `<meta name="google-site-verification" content="${esc(site.googleVerification)}" />`,
    site.bingVerification && `<meta name="msvalidate.01" content="${esc(site.bingVerification)}" />`,
    '',
    `<meta property="og:type" content="${page ? 'website' : 'profile'}" />`,
    `<meta property="og:site_name" content="${esc(profile.name)}" />`,
    `<meta property="og:title" content="${esc(shareTitle)}" />`,
    `<meta property="og:description" content="${esc(shareDescription)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${og}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(`${profile.name}, ${profile.role.charAt(0).toLowerCase()}${profile.role.slice(1)}`)}" />`,
    `<meta property="og:locale" content="${site.locale}" />`,
    !page && `<meta property="profile:first_name" content="Juan Diego" />`,
    !page && `<meta property="profile:last_name" content="Cabrera Ramírez" />`,
    '',
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:site" content="${profile.handle}" />`,
    `<meta name="twitter:creator" content="${profile.handle}" />`,
    `<meta name="twitter:title" content="${esc(shareTitle)}" />`,
    `<meta name="twitter:description" content="${esc(shareDescription)}" />`,
    `<meta name="twitter:image" content="${og}" />`,
    '',
    ldScript(graph),
  ];

  if (site.ga4Id) {
    tags.push(
      `<script async src="https://www.googletagmanager.com/gtag/js?id=${esc(site.ga4Id)}"></script>`,
      `<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${esc(site.ga4Id)}');` +
        // Clics en LinkedIn = contacto: se registran como evento "generate_lead"
        `document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href*="linkedin.com"]');if(a)gtag('event','generate_lead',{method:'linkedin',link_url:a.href});});</script>`,
    );
  }

  return `<!--seo:start-->\n    ${tags.filter((t) => t !== false && t !== undefined).join('\n    ')}\n    <!--seo:end-->`;
}

// Sustituye <head> SEO y contenido de #app en una página ya generada
const fillPage = (html, head, body) => html
  .replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, () => head)
  .replace(/<!--app:start-->[\s\S]*?<!--app:end-->/, () => `<!--app:start-->${body}<!--app:end-->`);

function searchIndex(data, pages, render) {
  const clip = (s) => String(s || '').replace(/\s+/g, ' ').trim().slice(0, 1200);
  return JSON.stringify([
    ...render.homeSearchEntries(data.faq),
    ...pages.filter((p) => !p.skipIndex),
  ].map((p) => ({ path: p.path, type: p.type, title: String(p.h1 || p.title).replace(/\.$/, ''), keywords: p.keywords || [], text: clip(p.text || p.description) })));
}

function sitemap(data, pages) {
  const today = new Date().toISOString().slice(0, 10);
  const prio = (p) => (p === '/' ? '1.0' : p.startsWith('/servicios/') || p.startsWith('/contratar') ? '0.9' : '0.7');
  const urls = ['/', ...pages.filter((p) => !p.noindex).map((p) => p.path)];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.map((u) => `  <url>
    <loc>${new URL(u, data.site.url).href}</loc>
    <lastmod>${today}</lastmod>
    <priority>${prio(u)}</priority>${u === '/' ? `
    <image:image><image:loc>${data.site.url}perfil.jpeg</image:loc></image:image>` : ''}
  </url>`).join('\n')}
</urlset>
`;
}

function seo() {
  let server;
  let outDir;
  let root = process.cwd();
  const load = async () => {
    const mods = ['/src/data/portfolio.js', '/src/app.js', '/src/pages/render.js'];
    const [data, app, render] = server
      ? await Promise.all(mods.map((m) => server.ssrLoadModule(m)))
      : await Promise.all(mods.map((m) => import(`${pathToFileURL(path.join(root, m)).href}?t=${Date.now()}`)));
    return { data, app, render };
  };

  return {
    name: 'seo-prerender',
    configResolved(c) { root = c.root; outDir = path.resolve(c.root, c.build.outDir); },

    configureServer(s) {
      server = s;
      // En desarrollo, las páginas internas y el índice se generan al vuelo
      s.middlewares.use(async (req, res, next) => {
        try {
          const url = req.url.split('?')[0];
          const { data, render } = await load();
          const pages = render.renderPages();
          if (url === '/search-index.json') {
            res.setHeader('Content-Type', 'application/json');
            return res.end(searchIndex(data, pages, render));
          }
          const page = pages.find((p) => p.path === url || p.path === `${url}/`);
          if (!page) return next();
          const raw = fs.readFileSync(path.resolve(s.config.root, 'index.html'), 'utf8');
          const html = await s.transformIndexHtml(req.url, raw);
          res.setHeader('Content-Type', 'text/html');
          res.end(fillPage(html, seoHead(data, page), page.html));
        } catch (e) { next(e); }
      });
    },

    async transformIndexHtml(html) {
      const { data, app } = await load();
      return html
        .replace('<!--seo-head-->', seoHead(data))
        .replace('<html lang="es">', `<html lang="${data.site.lang}">`)
        .replace('<div id="app"></div>', `<div id="app"><!--app:start-->${app.renderApp()}<!--app:end--></div>`);
    },

    async closeBundle() {
      if (server) return;
      const { data, render } = await load();
      const template = fs.readFileSync(path.join(outDir, 'index.html'), 'utf8');
      const pages = render.renderPages();
      for (const page of pages) {
        const file = path.join(outDir, page.path, 'index.html');
        fs.mkdirSync(path.dirname(file), { recursive: true });
        fs.writeFileSync(file, fillPage(template, seoHead(data, page), page.html));
      }
      fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemap(data, pages));
      fs.writeFileSync(path.join(outDir, 'search-index.json'), searchIndex(data, pages, render));
      console.log(`seo-prerender: ${pages.length} páginas internas, sitemap.xml y search-index.json`);
    },
  };
}

export default defineConfig({
  plugins: [seo()],
});
