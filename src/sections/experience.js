import { experience } from '../data/portfolio.js';

const GITHUB_ICON = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>`;

const EXTERNAL_ICON = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;

function statusBadge(status) {
  if (!status) return '';
  const map = {
    'Producción':     'prod',
    'En desarrollo':  'dev',
    'Mantenimiento':  'maint',
  };
  const cls = map[status] || 'prod';
  return `<span class="timeline__status timeline__status--${cls}">${status}</span>`;
}

export function createExperience() {
  const section = document.createElement('section');
  section.className = 'experience';
  section.id = 'experience';

  const items = experience.map((item, i) => {
    const techTags = item.tech.map(t =>
      `<span class="timeline__tech-tag">${t}</span>`
    ).join('');

    const links = [];
    if (item.links?.github && item.links.github !== '#') {
      links.push(`<a href="${item.links.github}" target="_blank" rel="noopener" class="timeline__link">${GITHUB_ICON} GitHub</a>`);
    } else if (item.links?.github) {
      links.push(`<span class="timeline__link" style="opacity:0.4;cursor:default">${GITHUB_ICON} Privado</span>`);
    }
    if (item.links?.live && item.links.live !== '#') {
      links.push(`<a href="${item.links.live}" target="_blank" rel="noopener" class="timeline__link">${EXTERNAL_ICON} Ver live</a>`);
    }

    const imageHtml = item.image
      ? `<img src="${item.image}" alt="${item.title}" class="timeline__image" loading="lazy">`
      : '';

    return `
      <div class="timeline__item reveal reveal-delay-${(i % 3) + 1}">
        <div class="timeline__dot"></div>
        <div class="timeline__card">
          <div class="timeline__meta">
            <span class="timeline__date">${item.date}</span>
            <span class="timeline__duration">· ${item.duration}</span>
            ${statusBadge(item.status)}
          </div>
          <h3 class="timeline__title">${item.title}</h3>
          ${imageHtml}
          <p class="timeline__desc">${item.description}</p>
          <div class="timeline__tech">${techTags}</div>
          ${links.length ? `<div class="timeline__links">${links.join('')}</div>` : ''}
        </div>
      </div>
    `;
  }).join('');

  section.innerHTML = `
    <div class="container">
      <div class="section-header reveal">
        <span class="section-label">Proyectos</span>
        <h2>Lo que construyo</h2>
        <p style="max-width:520px;margin:0 auto;">
          Proyectos reales, de principio a fin: diseño, desarrollo, infraestructura y despliegue.
        </p>
      </div>

      <div class="timeline">
        ${items}
      </div>
    </div>
  `;

  return section;
}
