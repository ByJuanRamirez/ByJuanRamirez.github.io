import '../iso/iso.css';
import { process } from '../data/portfolio.js';
import { sectionHead } from './section-head.js';
import { buildProceso } from '../figures/proceso.js';
import { mountProceso } from '../figures/proceso-live.js';

const pad = (n) => String(n).padStart(2, '0');
const total = pad(process.length);

// Lectura de la figura: etapa, nombre y la cifra real de Bitácora
const readoutOf = (i, versions) => {
  const head = `${pad(i + 1)} / ${total} · ${process[i].step}`;
  return i === process.length - 1 ? `${head} · v0.1.${versions}` : `${head} · ${process[i].readout}`;
};

const detailHTML = (p, i) => `
  <p class="pf-detail__num mono">${pad(i + 1)} / ${total}</p>
  <h3 class="pf-detail__title">${p.title}</h3>
  <p class="pf-detail__text">${p.text}</p>
  <dl class="pf-detail__facts">
    <div><dt class="mono">Entregable</dt><dd>${p.output}</dd></div>
    <div><dt class="mono">En Bitácora</dt><dd>${p.example}</dd></div>
  </dl>
`;

export function processHTML() {
  return `
    <section class="section wrap" id="proceso">
      ${sectionHead('04', 'Proceso', 'Cómo trabajamos juntos.', 'Seis estaciones, de la primera conversación a la versión que el cliente usa todos los días. El ejemplo es real: Bitácora, una app de gestión hecha con FastAPI y Flutter.')}
      <div class="pf reveal">
        <figure class="iso-figure pf__figure">
          <div class="iso-plate">
            <div class="iso-plate-corners" aria-hidden="true">
              <span class="iso-plate-corner" data-corner="fig">Fig 04</span>
              <span class="iso-plate-corner" data-corner="title">Línea de proceso</span>
              <span class="iso-plate-corner" data-corner="hint">Pasa el cursor o toca una estación</span>
              <span class="iso-plate-corner" data-corner="readout" data-readout>${readoutOf(0, 0)}</span>
            </div>
            <div class="iso-stage" tabindex="0" role="slider" aria-label="Línea de proceso: las flechas mueven el carro de una estación a otra" aria-valuemin="1" aria-valuemax="${process.length}" aria-valuenow="1">
              ${buildProceso()}
            </div>
          </div>
          <figcaption class="iso-legend">
            <span class="iso-keys">
              <span class="iso-key"><svg class="iso-swatch" data-mark="raised" viewBox="0 0 16 10" aria-hidden="true"><path d="M2 4.5 8 1.5 14 4.5 14 6 8 9 2 6Z"/><path class="iso-swatch-crease" d="M2 4.5 8 7.5 14 4.5"/></svg>El dispositivo: la app que pasa por cada estación</span>
              <span class="iso-key"><svg class="iso-swatch" data-mark="lit" viewBox="0 0 16 10" aria-hidden="true"><path d="M1.5 5h13"/></svg>Aguja: versiones publicadas</span>
            </span>
          </figcaption>
        </figure>

        <div class="pf__steps">
          <ol class="pf-list" role="list">
            ${process.map((p, i) => `
              <li>
                <button type="button" class="pf-list__btn" data-step="${i}" aria-pressed="${i === 0}">
                  <span class="pf-list__num mono">${pad(i + 1)}</span>
                  <span class="pf-list__name">${p.step}</span>
                </button>
              </li>
            `).join('')}
          </ol>
          <div class="pf-detail" aria-live="polite">${detailHTML(process[0], 0)}</div>
        </div>
      </div>
    </section>
  `;
}

export function mountProcess() {
  const root = document.querySelector('#proceso .pf');
  if (!root) return;
  const buttons = [...root.querySelectorAll('.pf-list__btn')];
  const detail = root.querySelector('.pf-detail');

  const select = (i) => {
    buttons.forEach((b, j) => b.setAttribute('aria-pressed', String(i === j)));
    detail.innerHTML = detailHTML(process[i], i);
  };

  const figure = mountProceso(root, { readoutOf, onStage: select });
  buttons.forEach((b) => b.addEventListener('click', () => {
    const i = Number(b.dataset.step);
    select(i);
    figure.go(i);
  }));
}
