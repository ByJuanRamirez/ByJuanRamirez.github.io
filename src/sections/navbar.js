import { profile } from '../data/portfolio.js';

const NAV_LINKS = [
  { href: '#hero',       label: 'Inicio' },
  { href: '#about',      label: 'Sobre mí' },
  { href: '#skills',     label: 'Skills' },
  { href: '#experience', label: 'Proyectos' },
  { href: '#contact',    label: 'Contacto' },
];

// SVG icons
const SUN_ICON = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;

const MOON_ICON = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

export function createNavbar() {
  const nav = document.createElement('nav');
  nav.className = 'navbar';
  nav.setAttribute('role', 'navigation');
  nav.setAttribute('aria-label', 'Navegación principal');

  const linksHtml = NAV_LINKS.map(l =>
    `<li><a href="${l.href}">${l.label}</a></li>`
  ).join('');

  const mobileLinksHtml = NAV_LINKS.map(l =>
    `<a href="${l.href}">${l.label}</a>`
  ).join('');

  const avatarContent = profile.avatar
    ? `<img src="${profile.avatar}" alt="${profile.name}">`
    : `<span>${profile.initials}</span>`;

  nav.innerHTML = `
    <div class="navbar__inner">
      <div class="navbar__avatar" title="${profile.name}">
        ${avatarContent}
      </div>

      <ul class="navbar__nav">
        ${linksHtml}
      </ul>

      <div style="display:flex;align-items:center;gap:10px;">
        <button class="theme-toggle" aria-label="Cambiar tema" title="Cambiar entre modo oscuro y claro">
          ${MOON_ICON}
        </button>
        <button class="navbar__hamburger" aria-label="Abrir menú" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>

    <div class="navbar__mobile">
      ${mobileLinksHtml}
    </div>
  `;

  return nav;
}

export function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const themeToggle = navbar.querySelector('.theme-toggle');
  const hamburger = navbar.querySelector('.navbar__hamburger');
  const mobileMenu = navbar.querySelector('.navbar__mobile');
  const allLinks = navbar.querySelectorAll('a[href^="#"]');

  // ── Theme toggle ──────────────────────────────────────────
  const savedTheme = localStorage.getItem('theme') || 'dark';
  applyTheme(savedTheme);

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('theme', next);
  });

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    themeToggle.innerHTML = theme === 'dark' ? SUN_ICON : MOON_ICON;
    themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro');
  }

  // ── Hamburger menu ────────────────────────────────────────
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Cerrar al hacer click en link móvil
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
    });
  });

  // ── Active link on scroll ─────────────────────────────────
  const sections = document.querySelectorAll('section[id]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        allLinks.forEach(a => a.classList.remove('active'));
        const active = navbar.querySelectorAll(`a[href="#${entry.target.id}"]`);
        active.forEach(a => a.classList.add('active'));
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));

  // ── Scroll: fondo sólido al bajar ─────────────────────────
  window.addEventListener('scroll', () => {
    navbar.style.borderBottomColor = window.scrollY > 10 ? 'var(--border)' : 'var(--border-muted)';
  }, { passive: true });
}
