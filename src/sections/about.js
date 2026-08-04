import { about, profile } from '../data/portfolio.js';

const ICON_MAP = {
  deploy:    `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`,
  code:      `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  fullstack: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
  ai:        `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 8v4l3 3"/><circle cx="18" cy="6" r="3"/></svg>`,
  chat:      `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  fast:      `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
};

export function createAbout() {
  const section = document.createElement('section');
  section.className = 'about';
  section.id = 'about';

  const paragraphs = about.bio.map(p => `<p>${p}</p>`).join('');

  const highlights = about.highlights.map((item, i) => `
    <div class="about__highlight-item reveal reveal-delay-${(i % 4) + 1}">
      <div class="about__highlight-icon">${ICON_MAP[item.icon] || ICON_MAP.code}</div>
      <span class="about__highlight-label">${item.label}</span>
    </div>
  `).join('');

  const avatarHtml = profile.avatar
    ? `<img src="${profile.avatar}" alt="${profile.name}" class="about__photo">`
    : `<div class="about__photo about__photo--initials"><span>${profile.initials}</span></div>`;

  section.innerHTML = `
    <div class="container">
      <div class="about__grid">
        <div class="about__bio reveal">
          <span class="section-label">Sobre mí</span>
          <h2>Construyo productos<br>de <em style="color:var(--blue);font-style:normal;">inicio a fin</em></h2>
          ${paragraphs}
          <a href="#contact" class="btn btn--primary" style="margin-top:28px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            Hablemos
          </a>
        </div>
        <div class="about__right reveal">
          <div class="about__photo-wrap">
            ${avatarHtml}
          </div>
          <div class="about__highlights">
            ${highlights}
          </div>
        </div>
      </div>
    </div>
  `;

  return section;
}
