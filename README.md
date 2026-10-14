# byjuanramirez.github.io

Portafolio de **Juan Diego Cabrera Ramírez**, desarrollador freelance de IA en Colombia.
Sitio estático hecho con Vite y desplegado en GitHub Pages con GitHub Actions (`.github/workflows/deploy.yml`).

```bash
npm install
npm run dev      # desarrollo
npm run build    # genera dist/ (lo mismo que se publica)
npm run preview  # sirve dist/ en local
```

## Dónde se edita cada cosa

| Qué | Dónde |
| --- | --- |
| Textos, servicios, proyectos, stack, preguntas frecuentes | `src/data/portfolio.js` |
| Páginas de servicio, casos de estudio y página de contratación | `src/data/pages.js` (y `src/data/service-nav.js` para el menú) |
| Título, descripción, imagen para redes, IDs de analítica | `site` en `src/data/portfolio.js` |
| Secciones (HTML) | `src/sections/*.js` |
| Estilos | `src/style.css` |

## SEO

Todo se genera al compilar, desde `src/data/portfolio.js` (ver `vite.config.js`):

- **HTML prerenderizado**: el contenido completo llega en el HTML, sin depender de JavaScript. Google, Bing y los rastreadores de IA (ChatGPT, Perplexity, Claude) lo leen directamente.
- **`<head>`**: title, description, canonical, Open Graph y Twitter Card con imagen 1200×630 (`public/og-image.jpg`).
- **Datos estructurados (JSON-LD)**: `Person`, `ProfessionalService`, `WebSite`, `ProfilePage` y `FAQPage`.
- **Páginas por servicio y por proyecto** (`src/data/pages.js`, `src/pages/render.js`): cada una apunta a un grupo de búsquedas y se genera como HTML estático en `/servicios/…/` y `/proyectos/…/`.
- **Buscador** (`src/search.js`): `Ctrl/⌘ + K` o `/` en cualquier página, y `/buscar/?q=…`. El índice `search-index.json` se genera al compilar. Con GA4 activo, cada búsqueda se registra como evento `search`.
- **`sitemap.xml`** (todas las páginas, con la fecha de cada compilación), **`robots.txt`** y **`404.html`**.

### Activar Search Console y analítica

1. **Google Search Console** → [search.google.com/search-console](https://search.google.com/search-console): agrega la propiedad *Prefijo de URL* `https://byjuanramirez.github.io/`, elige el método **Etiqueta HTML** y copia solo el valor de `content="..."` en `site.googleVerification`. Publica, pulsa *Verificar* y envía `sitemap.xml` en *Sitemaps*.
2. **Google Analytics 4** → [analytics.google.com](https://analytics.google.com): crea una propiedad con un flujo web para la URL del sitio y copia el ID de medición (`G-…`) en `site.ga4Id`. Los clics en LinkedIn se registran como el evento `generate_lead`; márcalo como *evento clave* para medir contactos.
3. **Bing Webmaster Tools** (opcional) → [bing.com/webmasters](https://www.bing.com/webmasters): puedes importar el sitio desde Search Console o pegar el valor de `msvalidate.01` en `site.bingVerification`.

Cada push a `main` vuelve a compilar y publica.
