// Movimiento de la Fig. 04: el carro va a la estación elegida, la herramienta
// baja con un resorte, al tocar el dispositivo su trabajo aparece en la pantalla
// y vuelve a subir. Sin interacción, un recorrido pasa por las seis estaciones.
import { translateAlong, iso } from '../iso/iso-kit.mjs';
import { P, STATIONS, TRAVEL, DEV_TOP, LAYER_OF, VERSIONS, needleAt } from './proceso.js';

const HOLD = 0.9;      // s que la herramienta se queda abajo
const DWELL = 3.4;     // s por estación en el recorrido
const IDLE = 3600;     // ms sin tocar antes de retomar el recorrido
const LAUNCH = 4;      // desde esta etapa la app está en línea
const LAST = STATIONS.length - 1;

export function mountProceso(root, { readoutOf, onStage = () => {} }) {
  const stage = root.querySelector('.iso-stage');
  const svg = stage.querySelector('svg');
  const carriage = svg.querySelector('[data-part="carriage"]');
  const tools = [...svg.querySelectorAll('[data-part="tool"]')];
  const layers = [...svg.querySelectorAll('[data-part="layer"]')];
  const led = svg.querySelector('[data-part="led"]');
  const needle = svg.querySelector('[data-part="needle"]');
  const readout = root.querySelector('[data-readout]');
  const still = matchMedia('(prefers-reduced-motion: reduce)');

  // Posición en pantalla de cada estación, para elegir con el puntero
  const stationScreenX = STATIONS.map((x) => iso([x, 0, DEV_TOP], P)[0]);

  let x = STATIONS[0];
  let target = 0;
  let arrivedAt = -1;            // reloj del momento en que el carro llegó
  let worked = -1;               // estación cuyo trabajo ya se hizo en esta visita
  let shown = -1;                // última etapa que tocó el dispositivo
  const tip = tools.map(() => ({ at: 0, rate: 0 }));
  const alpha = layers.map(() => 0);
  let ledOn = 0;
  let versions = 0;

  let frame = 0, last = 0, clock = 0, tourClock = 0;
  let touring = !still.matches, visible = false, idleTimer = 0;

  const show = (i) => {
    if (i === shown) return;
    shown = i;
    stage.setAttribute('aria-valuenow', String(i + 1));
    stage.setAttribute('aria-valuetext', readoutOf(i, VERSIONS));
    onStage(i);
  };

  function draw() {
    carriage.setAttribute('transform', translateAlong(P, [x, 0, 0]));
    tools.forEach((el, i) => el.setAttribute('transform', translateAlong(P, [0, 0, -TRAVEL[i] * tip[i].at])));
    layers.forEach((el, i) => el.setAttribute('opacity', alpha[i].toFixed(3)));
    led.style.opacity = ledOn.toFixed(3);
    needle.setAttribute('d', needleAt(STATIONS[LAST], versions));
    const moving = Math.abs(STATIONS[target] - x) > 0.5;
    const text = moving
      ? `${String(target + 1).padStart(2, '0')} / 06 · en camino`
      : readoutOf(shown < 0 ? target : shown, Math.round(versions));
    if (readout.textContent !== text) readout.textContent = text;
  }

  const spring = (s, want, dt, calm) => {
    if (calm) { s.at = want; s.rate = 0; return; }
    for (let n = 0; n < 4; n++) {
      s.rate += ((want - s.at) * 260 - s.rate * 26) * dt / 4;
      s.at += s.rate * dt / 4;
      // La punta no atraviesa el dispositivo: rebota contra él
      if (s.at > 1) { s.at = 1; s.rate = Math.min(0, -s.rate * 0.25); }
    }
    if (Math.abs(want - s.at) < 5e-4 && Math.abs(s.rate) < 5e-4) { s.at = want; s.rate = 0; }
  };
  const follow = (value, want, dt, tau, calm) => {
    if (calm) return want;
    const next = value + (want - value) * (1 - Math.exp(-dt / tau));
    return Math.abs(want - next) < 1e-3 ? want : next;
  };

  function tick(now) {
    const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60;
    last = now;
    clock += dt;
    const calm = still.matches;

    if (touring) {
      tourClock += dt;
      const next = Math.floor(tourClock / DWELL) % STATIONS.length;
      if (next !== target) { target = next; arrivedAt = -1; worked = -1; }
    }

    const goal = STATIONS[target];
    x = follow(x, goal, dt, 0.42, calm);
    const here = Math.abs(goal - x) < 0.3;
    if (here && arrivedAt < 0) arrivedAt = clock;

    tip.forEach((s, i) => {
      const down = i === target && here && worked !== i && clock - arrivedAt < HOLD + 0.35;
      spring(s, down ? 1 : 0, dt, calm);
      if (i === target && s.at > 0.985 && worked !== i) {
        worked = i;
        show(i);
      }
    });
    if (calm && here && worked !== target) { worked = target; show(target); }

    alpha.forEach((a, i) => { alpha[i] = follow(a, shown >= 0 && LAYER_OF[shown] === i ? 1 : 0, dt, 0.22, calm); });
    ledOn = follow(ledOn, shown >= LAUNCH ? 1 : 0, dt, 0.3, calm);
    versions = follow(versions, shown === LAST ? VERSIONS : 0, dt, shown === LAST ? 0.55 : 0.3, calm);

    draw();
    const settled = !touring && x === goal && tip.every((s) => s.at === 0 && s.rate === 0) && worked === target
      && alpha.every((a, i) => a === (LAYER_OF[shown] === i ? 1 : 0)) && (versions === 0 || versions === VERSIONS);
    frame = visible && !settled ? requestAnimationFrame(tick) : 0;
  }

  const run = () => { if (!frame && visible) { last = 0; frame = requestAnimationFrame(tick); } };

  const go = (i, { resume = true } = {}) => {
    touring = false;
    if (i !== target) { target = i; arrivedAt = -1; worked = -1; }
    clearTimeout(idleTimer);
    if (resume) {
      idleTimer = setTimeout(() => {
        if (still.matches) return;
        touring = true;
        tourClock = target * DWELL;
        run();
      }, IDLE);
    }
    run();
  };

  const nearest = (event) => {
    const box = svg.getBoundingClientRect();
    const vx = ((event.clientX - box.left) / box.width) * svg.viewBox.baseVal.width;
    return stationScreenX.reduce((best, sx, i) => (Math.abs(sx - vx) < Math.abs(stationScreenX[best] - vx) ? i : best), 0);
  };

  stage.addEventListener('pointermove', (event) => { if (event.pointerType === 'mouse') go(nearest(event)); });
  stage.addEventListener('pointerdown', (event) => go(nearest(event)));
  stage.addEventListener('keydown', (event) => {
    let to = null;
    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') to = Math.min(LAST, target + 1);
    if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') to = Math.max(0, target - 1);
    if (event.key === 'Home') to = 0;
    if (event.key === 'End') to = LAST;
    if (to === null) return;
    event.preventDefault();
    go(to);
  });

  new IntersectionObserver((entries) => {
    visible = entries[entries.length - 1].isIntersecting;
    if (visible) run();
  }, { rootMargin: '120px 0px' }).observe(stage);

  if (still.matches) touring = false;
  draw();

  return { go };
}
