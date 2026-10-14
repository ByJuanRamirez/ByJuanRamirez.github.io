import { faq } from '../data/portfolio.js';
import { sectionHead } from './section-head.js';

export function faqHTML() {
  return `
    <section class="section wrap" id="preguntas">
      ${sectionHead('05', 'Preguntas', 'Preguntas frecuentes.', 'Lo que suelen preguntarme antes de empezar un proyecto de IA.')}
      <div class="faq reveal">
        ${faq.map((f, i) => `
          <details class="faq__item reveal-child"${i === 0 ? ' open' : ''}>
            <summary class="faq__q"><h3>${f.q}</h3><span class="faq__icon mono" aria-hidden="true">+</span></summary>
            <p class="faq__a">${f.a}</p>
          </details>
        `).join('')}
      </div>
    </section>
  `;
}
