import { defineConfig } from 'vite';

// ============================================================
// SEO en tiempo de compilación
// - Prerenderiza el sitio dentro de #app: los buscadores y los rastreadores
//   de IA reciben el contenido completo sin ejecutar JavaScript.
// - Genera <head> (title, description, Open Graph, Twitter, JSON-LD,
//   verificación de buscadores y Google Analytics) desde src/data/portfolio.js.
// - Emite sitemap.xml con la fecha de cada compilación.
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

  return JSON.stringify({ '@context': 'https://schema.org', '@graph': [person, service, website, page, faqPage] })
    .replace(/</g, '\\u003c');
}

function seoHead(data) {
  const { site, profile } = data;
  const og = `${site.url}${site.ogImage}`;
  const tags = [
    `<title>${esc(site.title)}</title>`,
    `<meta name="description" content="${esc(site.description)}" />`,
    `<meta name="author" content="${esc(profile.name)}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large" />`,
    `<link rel="canonical" href="${site.url}" />`,
    `<link rel="me" href="${profile.linkedin}" />`,
    site.github && `<link rel="me" href="${site.github}" />`,
    site.googleVerification && `<meta name="google-site-verification" content="${esc(site.googleVerification)}" />`,
    site.bingVerification && `<meta name="msvalidate.01" content="${esc(site.bingVerification)}" />`,
    '',
    `<meta property="og:type" content="profile" />`,
    `<meta property="og:site_name" content="${esc(profile.name)}" />`,
    `<meta property="og:title" content="${esc(site.shareTitle)}" />`,
    `<meta property="og:description" content="${esc(site.shareDescription)}" />`,
    `<meta property="og:url" content="${site.url}" />`,
    `<meta property="og:image" content="${og}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(`${profile.name}, ${profile.role.charAt(0).toLowerCase()}${profile.role.slice(1)}`)}" />`,
    `<meta property="og:locale" content="${site.locale}" />`,
    `<meta property="profile:first_name" content="Juan Diego" />`,
    `<meta property="profile:last_name" content="Cabrera Ramírez" />`,
    '',
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:site" content="${profile.handle}" />`,
    `<meta name="twitter:creator" content="${profile.handle}" />`,
    `<meta name="twitter:title" content="${esc(site.shareTitle)}" />`,
    `<meta name="twitter:description" content="${esc(site.shareDescription)}" />`,
    `<meta name="twitter:image" content="${og}" />`,
    '',
    `<script type="application/ld+json">${jsonLd(data)}</script>`,
  ];

  if (site.ga4Id) {
    tags.push(
      `<script async src="https://www.googletagmanager.com/gtag/js?id=${esc(site.ga4Id)}"></script>`,
      `<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${esc(site.ga4Id)}');` +
        // Clics en LinkedIn = contacto: se registran como evento "generate_lead"
        `document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href*="linkedin.com"]');if(a)gtag('event','generate_lead',{method:'linkedin',link_url:a.href});});</script>`,
    );
  }

  return tags.filter((t) => t !== false && t !== undefined).join('\n    ');
}

function seo() {
  let server;
  const load = async () => {
    const [data, app] = server
      ? await Promise.all([server.ssrLoadModule('/src/data/portfolio.js'), server.ssrLoadModule('/src/app.js')])
      : await Promise.all([import('./src/data/portfolio.js'), import('./src/app.js')]);
    return { data, app };
  };

  return {
    name: 'seo-prerender',
    configureServer(s) { server = s; },
    async transformIndexHtml(html) {
      const { data, app } = await load();
      return html
        .replace('<!--seo-head-->', seoHead(data))
        .replace('<html lang="es">', `<html lang="${data.site.lang}">`)
        .replace('<div id="app"></div>', `<div id="app">${app.renderApp()}</div>`);
    },
    async generateBundle() {
      const { data } = await load();
      const today = new Date().toISOString().slice(0, 10);
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${data.site.url}</loc>
    <lastmod>${today}</lastmod>
    <image:image><image:loc>${data.site.url}perfil.jpeg</image:loc></image:image>
  </url>
</urlset>
`,
      });
    },
  };
}

export default defineConfig({
  plugins: [seo()],
});
