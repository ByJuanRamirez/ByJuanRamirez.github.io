import { splitWords } from '../text.js';

// Encabezado común: índice a la izquierda, título a la derecha
export function sectionHead(index, label, title, lead = '') {
  return `
    <header class="section-head reveal">
      <p class="section-head__index mono"><span>${index}</span> ${label}</p>
      <div>
        <h2 class="section-head__title split" aria-label="${title}">${splitWords(title)}</h2>
        ${lead ? `<p class="section-head__lead reveal-child">${lead}</p>` : ''}
      </div>
    </header>
  `;
}
