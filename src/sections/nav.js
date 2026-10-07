import { profile } from '../data/portfolio.js';
import { ICONS } from '../icons.js';

const LINKS = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#stack',     label: 'Stack' },
  { href: '#proceso',   label: 'Proceso' },
];

export function navHTML() {
  return `
    <header class="nav" id="top">
      <span class="nav__progress" aria-hidden="true"></span>
      <div class="nav__inner wrap">
        <a href="#top" class="nav__brand" aria-label="Inicio">
          <span class="nav__mono">${profile.initials}</span>
          <span class="nav__name">${profile.name}</span>
        </a>
        <nav class="nav__links" aria-label="Secciones">
          ${LINKS.map(l => `<a href="${l.href}">${l.label}</a>`).join('')}
        </nav>
        <div class="nav__actions">
          <button class="icon-btn" id="themeToggle" type="button" aria-label="Cambiar tema">
            <span class="icon-btn__sun">${ICONS.sun}</span>
            <span class="icon-btn__moon">${ICONS.moon}</span>
          </button>
          <a href="#contacto" class="btn btn--small">Hablemos</a>
        </div>
      </div>
    </header>
  `;
}
