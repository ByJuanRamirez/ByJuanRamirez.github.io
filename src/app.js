// Marcado completo del sitio. Sin dependencias del navegador:
// se usa en el cliente (main.js) y al compilar (vite.config.js) para prerenderizar.
import { navHTML } from './sections/nav.js';
import { heroHTML } from './sections/hero.js';
import { servicesHTML } from './sections/services.js';
import { workHTML } from './sections/work.js';
import { stackHTML } from './sections/stack.js';
import { processHTML } from './sections/process.js';
import { faqHTML } from './sections/faq.js';
import { contactHTML } from './sections/contact.js';

export function renderApp() {
  return `
  ${navHTML()}
  <main>
    ${heroHTML()}
    ${servicesHTML()}
    ${workHTML()}
    ${stackHTML()}
    ${processHTML()}
    ${faqHTML()}
  </main>
  ${contactHTML()}
`;
}
