import { services } from '../data/portfolio.js';
import { sectionHead } from './section-head.js';

export function servicesHTML() {
  return `
    <section class="section wrap" id="servicios">
      ${sectionHead('01', 'Servicios', 'IA aplicada, del diseño al despliegue.', 'Trabajo en las capas que necesita un producto con IA para salir a producción: el modelo, la interfaz, la API y la infraestructura. Me adapto al stack y al equipo que ya tienes.')}
      <div class="services">
        ${services.map((s, i) => `
          <article class="service reveal">
            <span class="service__num mono">${String(i + 1).padStart(2, '0')}</span>
            <h3 class="service__title">${s.page ? `<a href="/servicios/${s.page}/">${s.title}</a>` : s.title}</h3>
            <p class="service__text">${s.text}</p>
            <p class="service__tags mono">${s.tags.join(' · ')}</p>
          </article>
        `).join('')}
      </div>
      <p class="section-more"><a class="link-under" href="/servicios/">Ver todos los servicios: agentes, chatbots, integración y automatización con IA</a></p>
    </section>
  `;
}
