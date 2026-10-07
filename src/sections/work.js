import { experience } from '../data/portfolio.js';
import { ICONS } from '../icons.js';
import { sectionHead } from './section-head.js';

const STATUS = { 'Producción': 'live', 'Mantenimiento': 'maint', 'En desarrollo': 'wip' };
const hasLink = (url) => url && url !== '#';

export function workHTML() {
  const rows = experience.map((p) => {
    const links = [
      hasLink(p.links?.live)   && `<a href="${p.links.live}" target="_blank" rel="noopener">Ver sitio ${ICONS.arrow}</a>`,
      hasLink(p.links?.github) && `<a href="${p.links.github}" target="_blank" rel="noopener">Código ${ICONS.arrow}</a>`,
    ].filter(Boolean).join('');

    return `
      <li class="project reveal">
        <span class="project__year mono">${p.date}</span>
        <div class="project__main">
          <h3 class="project__title">${p.title}</h3>
          <p class="project__desc">${p.description}</p>
          ${links ? `<div class="project__links">${links}</div>` : ''}
        </div>
        <ul class="project__tech mono" aria-label="Tecnologías">
          ${p.tech.map(t => `<li>${t}</li>`).join('')}
        </ul>
        <div class="project__aside mono">
          <span class="badge badge--${STATUS[p.status] || 'live'}">${p.status}</span>
          <span class="project__duration">${p.duration}</span>
        </div>
      </li>
    `;
  }).join('');

  return `
    <section class="section wrap" id="proyectos">
      ${sectionHead('02', 'Proyectos', 'Trabajo reciente.', 'Una selección de proyectos que he construido y mantengo.')}
      <ol class="projects">${rows}</ol>
    </section>
  `;
}
