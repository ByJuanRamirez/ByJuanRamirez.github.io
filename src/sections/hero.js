import { profile, hero, experience, skills } from '../data/portfolio.js';
import { ICONS } from '../icons.js';
import { splitWords } from '../text.js';

const BADGE_TEXT = 'Disponible · Fullstack · Colombia · ';

export function heroHTML() {
  const shipped = experience.filter(p => p.status !== 'En desarrollo').length;

  const facts = [
    { value: profile.yearsExperience, label: 'años escribiendo software' },
    { value: String(shipped).padStart(2, '0'), label: 'proyectos en producción' },
    { value: String(skills.length), label: 'herramientas en mi stack' },
    { value: profile.timezone, label: `${profile.location}, horario compatible con EE. UU.` },
  ];

  return `
    <section class="hero wrap" aria-labelledby="hero-title">
      <div class="hero__meta mono">
        <span>${profile.role}</span>
        ${profile.available ? `<span class="status"><i aria-hidden="true"></i>Disponible para proyectos</span>` : ''}
      </div>

      <div class="hero__grid">
        <div class="hero__copy">
          <h1 class="hero__title split" id="hero-title" aria-label="${hero.headline.replace(/\*/g, '')}">${splitWords(hero.headline)}</h1>
          <p class="hero__intro">${hero.intro}</p>
          <div class="hero__cta">
            <a href="#contacto" class="btn">Cuéntame tu proyecto ${ICONS.arrow}</a>
            <a href="#proyectos" class="link-under">Ver trabajo reciente</a>
          </div>
        </div>

        <figure class="hero__photo" data-parallax="0.06">
          <div class="portrait" id="portrait">
            <div class="hero__glow" aria-hidden="true"></div>
            <div class="portrait__frame">
              <img class="portrait__img" src="${profile.avatar}" alt="Retrato de ${profile.name}" width="1254" height="1254" fetchpriority="high">
              <span class="portrait__grain" aria-hidden="true"></span>
            </div>
            <svg class="portrait__badge" viewBox="0 0 120 120" aria-hidden="true">
              <defs><path id="badgeCircle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0"/></defs>
              <circle cx="60" cy="60" r="59" class="portrait__badge-bg"/>
              <text><textPath href="#badgeCircle" textLength="286">${BADGE_TEXT.repeat(1)}</textPath></text>
              <path d="M52 68 68 52M56 52h12v12" class="portrait__badge-arrow"/>
            </svg>
          </div>
          <figcaption class="mono">
            <span>${profile.shortName}</span>
            <span id="localTime">${profile.location}</span>
          </figcaption>
        </figure>
      </div>

      <dl class="facts reveal">
        ${facts.map(f => `
          <div class="facts__item reveal-child">
            <dt class="facts__value" data-count>${f.value}</dt>
            <dd class="facts__label">${f.label}</dd>
          </div>
        `).join('')}
      </dl>
    </section>
  `;
}
