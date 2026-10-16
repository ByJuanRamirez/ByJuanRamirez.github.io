import { profile } from '../data/portfolio.js';
import { ICONS } from '../icons.js';
import { splitWords } from '../text.js';
import { serviceNav } from '../data/service-nav.js';

export function contactHTML() {
  const handle = profile.linkedin.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

  return `
    <section class="contact" id="contacto" aria-labelledby="contact-title">
      <div class="wrap">
        <p class="mono contact__index"><span>06</span> Contacto</p>
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
        <nav class="footer-map" aria-label="Mapa del sitio">
          <div>
            <p class="footer-map__title mono">Servicios</p>
            <ul>${serviceNav.map((s) => `<li><a href="/servicios/${s.slug}/">${s.nav}</a></li>`).join('')}</ul>
          </div>
          <div>
            <p class="footer-map__title mono">Sitio</p>
            <ul>
              <li><a href="/proyectos/">Proyectos</a></li>
              <li><a href="/contratar-desarrollador-freelance-ia/">Contratar un freelance de IA</a></li>
              <li><a href="/#preguntas">Preguntas frecuentes</a></li>
              <li><a href="/buscar/">Buscar</a></li>
            </ul>
          </div>
          <div>
            <p class="footer-map__title mono">En otros sitios</p>
            <ul>
              <li><a href="${profile.linkedin}" target="_blank" rel="noopener me">LinkedIn</a></li>
              <li><a href="https://github.com/ByJuanRamirez" target="_blank" rel="noopener me">GitHub</a></li>
            </ul>
          </div>
        </nav>
        <div class="footer mono">
          <span>© ${new Date().getFullYear()} ${profile.name}</span>
          <a href="#top">Volver arriba ↑</a>
        </div>
      </footer>
    </section>
  `;
}
