import { skills } from '../data/portfolio.js';
import { sectionHead } from './section-head.js';

export function stackHTML() {
  const groups = skills.reduce((acc, s) => {
    (acc[s.category] ||= []).push(s.name);
    return acc;
  }, {});

  return `
    <section class="section wrap" id="stack">
      ${sectionHead('03', 'Stack', 'Herramientas que uso a diario.', 'Elijo tecnología aburrida y probada para lo crítico, y la IA para moverme más rápido en todo lo demás.')}
      <div class="stack reveal">
        ${Object.entries(groups).map(([cat, names]) => `
          <div class="stack__col reveal-child">
            <h3 class="stack__cat mono">${cat}</h3>
            <ul>${names.map(n => `<li>${n}</li>`).join('')}</ul>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}
