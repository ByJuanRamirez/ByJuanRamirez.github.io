import { process } from '../data/portfolio.js';
import { sectionHead } from './section-head.js';

export function processHTML() {
  return `
    <section class="section wrap" id="proceso">
      ${sectionHead('04', 'Proceso', 'Cómo trabajamos juntos.')}
      <ol class="process">
        ${process.map((p, i) => `
          <li class="process__step reveal">
            <span class="process__num mono">${String(i + 1).padStart(2, '0')}</span>
            <h3 class="process__title">${p.step}</h3>
            <p class="process__text">${p.text}</p>
          </li>
        `).join('')}
      </ol>
    </section>
  `;
}
