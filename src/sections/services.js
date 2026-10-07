import { services } from '../data/portfolio.js';
import { sectionHead } from './section-head.js';

export function servicesHTML() {
  return `
    <section class="section wrap" id="servicios">
      ${sectionHead('01', 'Servicios', 'Del diseño al despliegue.', 'Trabajo en las cuatro capas que necesita un producto para salir a producción y me adapto al stack y al equipo que ya tienes.')}
      <div class="services">
        ${services.map((s, i) => `
          <article class="service reveal">
            <span class="service__num mono">${String(i + 1).padStart(2, '0')}</span>
            <h3 class="service__title">${s.title}</h3>
            <p class="service__text">${s.text}</p>
            <p class="service__tags mono">${s.tags.join(' · ')}</p>
          </article>
        `).join('')}
      </div>
    </section>
  `;
}
