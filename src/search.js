// Buscador del sitio.
// - Ventana con Ctrl/⌘ + K, "/" o el botón de la lupa.
// - Página /buscar/?q=… (también la usa Google como destino de búsqueda).
// - El índice (/search-index.json) se genera al compilar y se carga al abrir.
// - Si Google Analytics está activo, cada búsqueda se registra como evento "search".

const SUGGESTIONS = ['agente de IA', 'chatbot Telegram', 'integrar Claude', 'automatización', 'API Node.js', 'freelance'];

let indexPromise;
const loadIndex = () =>
  (indexPromise ||= fetch('/search-index.json')
    .then((r) => (r.ok ? r.json() : []))
    .then((items) => items.map((it) => ({
      ...it,
      _title: norm(it.title),
      _kw: norm((it.keywords || []).join(' ')),
      _text: norm(it.text || ''),
    })))
    .catch(() => []));

const norm = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const escapeHTML = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const STOP = new Set(['de', 'la', 'el', 'en', 'y', 'a', 'un', 'una', 'para', 'con', 'por', 'los', 'las', 'del', 'que', 'mi', 'tu', 'se']);

function tokens(q) {
  return norm(q).split(/[^a-z0-9ñ.+#]+/).filter((t) => t.length > 1 && !STOP.has(t));
}

export function search(items, q) {
  const qs = tokens(q);
  if (!qs.length) return [];
  const scored = items.map((it) => {
    let score = 0, hits = 0;
    for (const t of qs) {
      let s = 0;
      if (it._title.includes(t)) s += 6 + (new RegExp(`\\b${t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`).test(it._title) ? 2 : 0);
      if (it._kw.includes(t)) s += 4;
      if (it._text.includes(t)) s += 1 + Math.min(2, it._text.split(t).length - 2);
      if (s) hits++;
      score += s;
    }
    if (it.type === 'Servicio') score *= 1.15;
    return { it, score: hits === qs.length ? score * 2 : score, hits };
  }).filter((r) => r.score > 0);
  scored.sort((a, b) => b.hits - a.hits || b.score - a.score);
  return scored.slice(0, 12).map((r) => r.it);
}

function snippet(it, q) {
  const text = it.text || '';
  const n = norm(text);
  const t = tokens(q).find((x) => n.includes(x));
  let start = 0;
  if (t) start = Math.max(0, n.indexOf(t) - 50);
  let out = text.slice(start, start + 160);
  out = (start > 0 ? '…' : '') + out + (start + 160 < text.length ? '…' : '');
  return highlight(out, q);
}

function highlight(text, q) {
  let html = escapeHTML(text);
  const ts = tokens(q).sort((a, b) => b.length - a.length);
  if (!ts.length) return html;
  // Resalta respetando tildes: compara sobre la versión normalizada
  const n = norm(html);
  const marks = [];
  ts.forEach((t) => {
    let i = n.indexOf(t);
    while (i !== -1) { marks.push([i, i + t.length]); i = n.indexOf(t, i + t.length); }
  });
  marks.sort((a, b) => a[0] - b[0]);
  let res = '', last = 0;
  for (const [a, b] of marks) {
    if (a < last) continue;
    res += html.slice(last, a) + '<mark>' + html.slice(a, b) + '</mark>';
    last = b;
  }
  return res + html.slice(last);
}

function resultsHTML(results, q) {
  if (!q.trim()) {
    return `<li class="search-hint mono">Prueba con: ${SUGGESTIONS.map((s) => `<button type="button" class="search-chip" data-suggest="${s}">${s}</button>`).join('')}</li>`;
  }
  if (!results.length) {
    return `<li class="search-hint">Sin resultados para «${escapeHTML(q)}». Mira todos los <a class="link-under" href="/servicios/">servicios</a> o <a class="link-under" href="/proyectos/">proyectos</a>.</li>`;
  }
  return results.map((r, i) => `
    <li>
      <a class="search-result" href="${r.path}" data-i="${i}">
        <span class="search-result__type mono">${escapeHTML(r.type)}</span>
        <span class="search-result__title">${highlight(r.title, q)}</span>
        <span class="search-result__text">${snippet(r, q)}</span>
      </a>
    </li>`).join('');
}

let trackTimer;
function track(q) {
  clearTimeout(trackTimer);
  if (!q.trim() || typeof window.gtag !== 'function') return;
  trackTimer = setTimeout(() => window.gtag('event', 'search', { search_term: q.trim() }), 1200);
}

// Navegación con teclado dentro de una lista de resultados
function keyNav(input, list) {
  let active = -1;
  const links = () => [...list.querySelectorAll('.search-result')];
  const set = (i) => {
    const ls = links();
    ls.forEach((l, j) => l.classList.toggle('is-active', j === i));
    active = i;
    if (ls[i]) ls[i].scrollIntoView({ block: 'nearest' });
  };
  input.addEventListener('keydown', (e) => {
    const ls = links();
    if (e.key === 'ArrowDown') { e.preventDefault(); set(Math.min(active + 1, ls.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); set(Math.max(active - 1, 0)); }
    else if (e.key === 'Enter' && ls[active]) { e.preventDefault(); ls[active].click(); }
  });
  return () => { active = -1; };
}

function wireSuggestions(list, input, run) {
  list.addEventListener('click', (e) => {
    const b = e.target.closest('[data-suggest]');
    if (!b) return;
    input.value = b.dataset.suggest;
    input.focus();
    run();
  });
}

// ── Ventana de búsqueda ────────────────────────────────────
function mountDialog() {
  const dialog = document.createElement('dialog');
  dialog.className = 'search-dialog';
  dialog.setAttribute('aria-label', 'Buscar en el sitio');
  dialog.innerHTML = `
    <form class="search-dialog__form" action="/buscar/" method="get" role="search">
      <label class="sr-only" for="searchDialogInput">Buscar</label>
      <input id="searchDialogInput" class="search-input" type="search" name="q" placeholder="Busca un servicio, proyecto o tecnología…" autocomplete="off" />
      <button type="button" class="search-dialog__close mono" data-close>Esc</button>
    </form>
    <ul class="search-results" aria-live="polite"></ul>`;
  document.body.append(dialog);

  const input = dialog.querySelector('input');
  const list = dialog.querySelector('.search-results');
  const reset = keyNav(input, list);

  const run = async () => {
    const q = input.value;
    const items = await loadIndex();
    list.innerHTML = resultsHTML(search(items, q), q);
    reset();
    track(q);
  };
  input.addEventListener('input', run);
  wireSuggestions(list, input, run);
  dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
  list.addEventListener('click', (e) => { if (e.target.closest('.search-result')) dialog.close(); });

  const open = () => {
    if (dialog.open) return;
    dialog.showModal();
    input.select();
    run();
  };

  document.querySelectorAll('[data-search-open]').forEach((el) =>
    el.addEventListener('click', (e) => { e.preventDefault(); open(); }));

  document.addEventListener('keydown', (e) => {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName) || document.activeElement?.isContentEditable;
    if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing)) {
      e.preventDefault();
      open();
    }
  });
}

// ── Página /buscar/ ────────────────────────────────────────
function mountPage() {
  const input = document.getElementById('searchPageInput');
  const list = document.getElementById('searchPageResults');
  if (!input || !list) return;
  const reset = keyNav(input, list);

  const run = async () => {
    const q = input.value;
    const url = new URL(location.href);
    if (q) url.searchParams.set('q', q); else url.searchParams.delete('q');
    history.replaceState(null, '', url);
    const items = await loadIndex();
    list.innerHTML = resultsHTML(search(items, q), q);
    reset();
    track(q);
  };
  input.value = new URLSearchParams(location.search).get('q') || '';
  input.closest('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
  input.addEventListener('input', run);
  wireSuggestions(list, input, run);
  input.focus();
  run();
}

export function mountSearch() {
  if ('HTMLDialogElement' in window) mountDialog();
  mountPage();
}
