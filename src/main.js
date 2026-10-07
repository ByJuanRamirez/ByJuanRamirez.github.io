import './style.css';
import { navHTML } from './sections/nav.js';
import { heroHTML } from './sections/hero.js';
import { servicesHTML } from './sections/services.js';
import { workHTML } from './sections/work.js';
import { stackHTML } from './sections/stack.js';
import { processHTML } from './sections/process.js';
import { contactHTML } from './sections/contact.js';

// ── Montar ─────────────────────────────────────────────────
document.getElementById('app').innerHTML = `
  ${navHTML()}
  <main>
    ${heroHTML()}
    ${servicesHTML()}
    ${workHTML()}
    ${stackHTML()}
    ${processHTML()}
  </main>
  ${contactHTML()}
`;

// ── Tema ───────────────────────────────────────────────────
// El tema inicial se aplica en index.html antes del primer render
const root = document.documentElement;
document.getElementById('themeToggle').addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  try { localStorage.setItem('theme', next); } catch {}
});

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

// ── Scroll: borde del nav, barra de progreso y parallax ────
const nav = document.querySelector('.nav');
const parallaxEls = [...document.querySelectorAll('[data-parallax]')];
let ticking = false;

const onScroll = () => {
  const y = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  nav.classList.toggle('nav--scrolled', y > 8);
  root.style.setProperty('--progress', max > 0 ? (y / max).toFixed(4) : 0);
  if (!reduceMotion) {
    parallaxEls.forEach((el) => {
      el.style.setProperty('--py', `${(y * parseFloat(el.dataset.parallax)).toFixed(1)}px`);
    });
  }
  ticking = false;
};
window.addEventListener('scroll', () => {
  if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
}, { passive: true });
onScroll();

// ── Entrada del hero ───────────────────────────────────────
requestAnimationFrame(() => document.body.classList.add('is-loaded'));
setTimeout(() => document.body.classList.add('is-settled'), 2600);

// ── Retrato: profundidad leve siguiendo al cursor ──────────
const portrait = document.getElementById('portrait');
if (!reduceMotion && matchMedia('(hover: hover)').matches) {
  portrait.addEventListener('pointermove', (e) => {
    const r = portrait.getBoundingClientRect();
    portrait.style.setProperty('--tx', `${((e.clientX - r.left) / r.width - 0.5) * -14}px`);
    portrait.style.setProperty('--ty', `${((e.clientY - r.top) / r.height - 0.5) * -14}px`);
  });
  portrait.addEventListener('pointerleave', () => {
    portrait.style.setProperty('--tx', '0px');
    portrait.style.setProperty('--ty', '0px');
  });
}

// ── Hora local en Colombia ─────────────────────────────────
const timeEl = document.getElementById('localTime');
const fmt = new Intl.DateTimeFormat('es-CO', {
  hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'America/Bogota',
});
const tick = () => { timeEl.textContent = `${fmt.format(new Date())} en Colombia`; };
tick();
setInterval(tick, 30_000);

// ── Contadores ─────────────────────────────────────────────
function countUp(el) {
  const match = el.textContent.match(/^(\d+)(.*)$/);
  if (!match || reduceMotion) return;
  const [, num, suffix] = match;
  const target = parseInt(num, 10);
  const pad = num.length;
  const t0 = performance.now();
  const dur = 1100;
  const step = (now) => {
    const p = Math.min((now - t0) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = String(Math.round(target * eased)).padStart(pad, '0') + suffix;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// ── Aparición al hacer scroll ──────────────────────────────
// Escalonar hijos dentro de cada grupo
document.querySelectorAll('.reveal-child').forEach((el) => {
  el.style.setProperty('--d', `${[...el.parentElement.children].indexOf(el) * 90}ms`);
});
document.querySelectorAll('.services, .process').forEach((group) => {
  [...group.children].forEach((el, i) => el.style.setProperty('--d', `${(i % 4) * 90}ms`));
});

const reveal = (el) => {
  el.classList.add('is-visible');
  el.querySelectorAll('[data-count]').forEach(countUp);
};

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        reveal(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach(reveal);
}
