import { profile } from '../data/portfolio.js';

export function createHero() {
  const section = document.createElement('section');
  section.className = 'hero';
  section.id = 'hero';

  const avatarHtml = profile.avatar
    ? `<img src="${profile.avatar}" alt="${profile.name}" class="hero__avatar-img">`
    : `<span class="hero__avatar-initials">${profile.initials}</span>`;

  section.innerHTML = `
    <!-- Orbs de blur animados -->
    <div class="hero__orbs" aria-hidden="true">
      <div class="hero__orb hero__orb--1"></div>
      <div class="hero__orb hero__orb--2"></div>
      <div class="hero__orb hero__orb--3"></div>
    </div>

    <div class="hero__content">
      <div class="hero__avatar-wrap">
        ${avatarHtml}
        <span class="hero__avatar-dot" aria-hidden="true"></span>
      </div>
      <p class="hero__greeting">// Hola, soy</p>
      <h1 class="hero__name">
        Juan Diego<br><span>Cabrera Ramírez</span>
      </h1>
      <p class="hero__title">${profile.title}</p>
      <p class="hero__tagline">${profile.tagline}</p>
      <div class="hero__cta">
        <a href="#experience" class="btn btn--primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          Ver mis proyectos
        </a>
        <a href="#contact" class="btn btn--outline">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          Hablemos
        </a>
      </div>
    </div>

    <div class="hero__scroll" aria-hidden="true">
      <span>scroll</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>
    </div>
  `;

  return section;
}

// No hay canvas — función vacía para compatibilidad con main.js
export function initHeroCanvas() {}
