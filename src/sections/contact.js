import { profile } from '../data/portfolio.js';
import { ICONS } from '../icons.js';
import { splitWords } from '../text.js';

export function contactHTML() {
  const handle = profile.linkedin.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

  return `
    <section class="contact" id="contacto" aria-labelledby="contact-title">
      <div class="wrap">
        <p class="mono contact__index"><span>05</span> Contacto</p>
        <h2 class="contact__title split reveal" id="contact-title" aria-label="¿Tienes algo en mente? Hablemos.">${splitWords('¿Tienes algo en mente?\n*Hablemos.*')}</h2>

        <a href="${profile.linkedin}" target="_blank" rel="noopener" class="contact__link reveal">
          <span class="contact__link-icon">${ICONS.linkedin}</span>
          <span class="contact__link-text">${handle.replace('/in/', '/in/<wbr>')}</span>
          <span class="contact__link-arrow">${ICONS.arrow}</span>
        </a>

        <div class="contact__bottom reveal">
          <p class="contact__note">Escríbeme por LinkedIn. Si me cuentas qué quieres construir, para cuándo y con qué presupuesto, puedo darte una propuesta concreta.</p>
        </div>
      </div>

      <footer class="wrap">
        <div class="footer mono">
          <span>© ${new Date().getFullYear()} ${profile.name}</span>
          <a href="#top">Volver arriba ↑</a>
        </div>
      </footer>
    </section>
  `;
}
