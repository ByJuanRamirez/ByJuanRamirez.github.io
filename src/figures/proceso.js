// Fig. 04 — Línea de ensamblaje del proceso.
// Un carro lleva el dispositivo (la app) por seis estaciones de un pórtico.
// En cada una baja una herramienta y deja su trabajo en la pantalla;
// el reloj de la última estación cuenta las versiones publicadas.
// Geometría con el kit de la skill anatomy (src/iso, licencia MIT).
import * as k from '../iso/iso-kit.mjs';

export const WIDTH = 720;
export const HEIGHT = 380;

// ── Mundo (unidades ≈ px; x a lo largo de la línea, z hacia arriba) ──
const BASE = { x: -252, y: -58, w: 504, d: 116, r: 8 };
const BASE_H = 12;
const FOOT_H = 5;

export const STATIONS = [-175, -105, -35, 35, 105, 175];
const RAIL_YS = [-18, 13];
const RAIL_FROM = -217;
const RAIL_TO = 217;

const CAR = { x: -40, y: -27, w: 80, d: 54, r: 3 };
const CAR_Z = 3;
const CAR_TOP = 8;
const PAD_TOP = 9.5;
const DEV = { x: -27, y: -17, w: 54, d: 34, r: 4 };
export const DEV_TOP = 15.5;
const SCREEN = k.insetPlan(DEV, 2.6);

const POST_X = 229;
const BEAM = { x: -236, y: -54, w: 472, d: 14, r: 2 };
const BEAM_Z = 80;
const BEAM_TOP = 96;
const ARM_Z = 82;
const ARM_TOP = 90;
const HOUSING_R = 6;
const HOUSING_Z = 46;
const GLAND_Z = 43;
const ROD_R = 1.5;

const DIAL_R = 12;
const DIAL_Z = 94;
const DIAL_TOP = 100;
export const VERSIONS = 11;

const P = k.fitProjection(
  [
    ...k.boxCorners(BASE, -BASE_H - FOOT_H, 0),
    ...k.boxCorners(BEAM, BEAM_Z, BEAM_TOP),
    [STATIONS[5], DIAL_R, DIAL_TOP],
    [STATIONS[5] + DIAL_R, 0, DIAL_TOP],
  ],
  WIDTH,
  HEIGHT,
  { pad: 26, azimuth: 60 },
);
export { P };

const at = (point) => k.iso(point, P);
const S = (paths, style) => k.solidSvg(paths, style);
const L = (d, style) => k.lineSvg(d, style);
const D = (points, style) => k.dotsSvg(points, style);
const byDepth = (points) => [...points].sort((a, b) => k.depthOf([a[0], a[1], 0], P) - k.depthOf([b[0], b[1], 0], P));
const knob = (x, y, r, z, h, count) =>
  S(k.cylinder(x, y, r, z, h, P, 24), { tone: 'mid' }) + L(k.knurl(x, y, r, z, z + h, count, P), { tone: 'lo' });

// ── Herramientas: el fondo de cada punta está a esta altura en reposo ──
const TIP_BOTTOM = [34, 33, 34, 32, 33, 34];
export const TRAVEL = TIP_BOTTOM.map((b) => b - DEV_TOP);

// ── Base, regla y placa ───────────────────────────────────
function base() {
  const out = [`<path class="iso-halo" d="${k.haloOf(BASE, -BASE_H - FOOT_H, BASE_H, P)}"/>`];
  const feet = [...k.corners(BASE, 22), [0, BASE.y + 22], [0, BASE.y + BASE.d - 22]];
  for (const [x, y] of byDepth(feet)) {
    out.push(S(k.cylinder(x, y, 7, -BASE_H - FOOT_H, 1.6, P, 28), { tone: 'lo' }));
    out.push(S(k.cylinder(x, y, 5.4, -BASE_H - FOOT_H + 1.6, FOOT_H - 1.6, P, 28), { tone: 'mid' }));
  }
  out.push(S(k.slabOf(BASE, -BASE_H, BASE_H, P, 8, 1.6), { tone: 'mid', inner: L(k.sideSeam(BASE, -4, P, 8), { tone: 'faint' }) }));
  out.push(L(k.planOutline(k.insetPlan(BASE, 5), 0, P), { tone: 'lo' }));
  const screws = k.corners(BASE, 10);
  out.push(L(screws.map(([x, y]) => k.ring(x, y, 2.2, 0, P, 16)).join(''), { tone: 'lo' }));
  out.push(D(screws.map(([x, y]) => at([x, y, 0])), { size: 0.5 }));

  // Regla: mayores cada 35, así caen en cada estación y entre estaciones
  const strip = { x: -222, y: BASE.y + BASE.d - 15, w: 444, d: 7, r: 1 };
  out.push(S(k.slabOf(strip, 0, 0.6, P, 3), { tone: 'lo', crease: 'none' }));
  const ticks = k.topTicks(-210, 210, 5, 7, strip.y + 0.8, 0.6, [2, 3.8], P);
  out.push(L(ticks.minor, { tone: 'lo' }), L(ticks.major, { tone: 'mid' }));
  out.push(D([at([strip.x + 2.5, strip.y + 3.5, 0.6]), at([strip.x + strip.w - 2.5, strip.y + 3.5, 0.6])], { size: 0.45 }));

  // Pasadores de índice: uno por estación, delante del riel
  for (const x of STATIONS) {
    out.push(S(k.cylinder(x, 37, 1.8, 0, 2.2, P, 16), { tone: 'mid' }));
    out.push(D([at([x, 37, 2.2])], { size: 0.45, tone: 'lo' }));
  }

  // Placa de identificación con el único rótulo grabado
  const label = { x: -212, y: -36, w: 40, d: 14, r: 1.2 };
  out.push(S(k.slabOf(label, 0, 0.8, P, 4), { tone: 'lo', crease: 'none' }));
  out.push(L(k.planOutline(k.insetPlan(label, 1.6), 0.8, P, 4), { tone: 'faint' }));
  out.push(k.faceTextSvg(k.topMatrix([label.x + 4, label.y + 6.4], 0.8, P, 'x'), 'BITÁCORA', { size: 3, tone: 'lo' }));
  out.push(L(k.lineOnTop([label.x + 4, label.y + 9.6], [label.x + 26, label.y + 9.6], 0.8, P), { tone: 'lo', free: true }));
  out.push(L(k.lineOnTop([label.x + 4, label.y + 11.4], [label.x + 18, label.y + 11.4], 0.8, P), { tone: 'lo', free: true }));
  out.push(D([at([label.x + label.w - 3, label.y + 3, 0.8]), at([label.x + label.w - 3, label.y + label.d - 3, 0.8])], { size: 0.4 }));
  return out.join('');
}

// ── Pórtico trasero: postes y viga ─────────────────────────
function posts() {
  const out = [];
  for (const cx of [-POST_X, POST_X]) {
    const flange = { x: cx - 10, y: -57, w: 20, d: 20, r: 2 };
    out.push(S(k.slabOf(flange, 0, 3, P, 3, 0.5), { tone: 'mid' }));
    out.push(D(k.corners(flange, 3).map(([x, y]) => at([x, y, 3])), { size: 0.45 }));
    const post = { x: cx - 7, y: -54, w: 14, d: 14, r: 2 };
    out.push(S(k.slabOf(post, 3, BEAM_Z - 3, P, 3, 0.5), { tone: 'mid', inner: L(k.sideSeam(post, 40, P, 3), { tone: 'faint' }) }));
  }
  return out.join('');
}

function beam() {
  const out = [];
  out.push(S(k.slabOf(BEAM, BEAM_Z, BEAM_TOP - BEAM_Z, P, 3, 0.8), { tone: 'mid', inner: L(k.sideSeam(BEAM, 88, P, 3), { tone: 'faint' }) }));
  out.push(L(k.planOutline(k.insetPlan(BEAM, 3), BEAM_TOP, P, 3), { tone: 'faint' }));
  out.push(D([-POST_X, POST_X].flatMap((x) => [at([x - 3, -47, BEAM_TOP]), at([x + 3, -47, BEAM_TOP])]), { size: 0.45 }));
  return out.join('');
}

// ── Rieles, tornillo de avance, topes y motor ──────────────
function rails() {
  const out = [];
  const screw = { x: RAIL_FROM - 2, y: -3.6, w: RAIL_TO - RAIL_FROM + 4, d: 3.2, r: 1.5 };
  out.push(S(k.slabOf(screw, 1.5, 3, P, 4), { tone: 'lo', crease: 'none' }));
  const threads = [];
  for (let x = screw.x + 3; x < screw.x + screw.w - 2; x += 3.5) threads.push(k.lineOnTop([x, screw.y + 0.2], [x + 1.2, screw.y + screw.d - 0.2], 4.5, P));
  out.push(L(threads.join(''), { tone: 'faint' }));
  for (const y of RAIL_YS) {
    out.push(S(k.slabOf({ x: RAIL_FROM, y, w: RAIL_TO - RAIL_FROM, d: 5, r: 1 }, 0, 3, P, 3, 0.4), { tone: 'mid' }));
    out.push(D([RAIL_FROM + 6, -70, 0, 70, RAIL_TO - 6].map((x) => at([x, y + 2.5, 3])), { size: 0.4 }));
  }
  for (const x of [RAIL_FROM - 5, RAIL_TO]) {
    out.push(S(k.slabOf({ x, y: -22, w: 5, d: 42, r: 1.2 }, 0, 8, P, 3, 0.5), { tone: 'mid' }));
    out.push(D([at([x + 2.5, -18, 8]), at([x + 2.5, 15, 8])], { size: 0.45 }));
  }
  return out.join('');
}

function motor() {
  const out = [];
  const box = { x: -246, y: -13, w: 22, d: 26, r: 2 };
  out.push(S(k.slabOf(box, 0, 18, P, 3, 0.6), { tone: 'mid', inner: L(k.sideSeam(box, 6, P, 3), { tone: 'faint' }) }));
  for (let i = 0; i < 4; i++) {
    out.push(L(k.planOutline({ x: box.x + 4, y: box.y + 4 + i * 4.6, w: 14, d: 1.8, r: 0.9 }, 18, P, 3), { tone: 'lo' }));
  }
  out.push(knob(box.x + 11, box.y + 23, 3.2, 18, 3.6, 22));
  out.push(D([at([box.x + 2.5, box.y + 2.5, 18]), at([box.x + box.w - 2.5, box.y + 2.5, 18])], { size: 0.45 }));
  return out.join('');
}

// ── Carro con el dispositivo (se construye en x = 0) ───────
function carriage(screen) {
  const out = [`<path class="iso-halo" d="${k.haloOf(k.insetPlan(CAR, 3), CAR_Z, 0.1, P)}" style="filter:blur(4px)"/>`];
  out.push(S(k.slabOf(CAR, CAR_Z, CAR_TOP - CAR_Z, P, 5, 0.6), { tone: 'mid' }));
  out.push(D([-32, -16, 16, 32].map((x) => at([x, CAR.y + CAR.d - 2.6, CAR_TOP])), { size: 0.4, tone: 'lo' }));

  const bushing = (x, y) => {
    const plan = { x: x - 4.5, y: y - 1, w: 9, d: 7, r: 1 };
    return S(k.slabOf(plan, CAR_TOP, 3, P, 3, 0.4), { tone: 'mid' }) + D([at([x - 2.2, y + 2.5, CAR_TOP + 3]), at([x + 2.2, y + 2.5, CAR_TOP + 3])], { size: 0.4 });
  };
  out.push(bushing(-35, RAIL_YS[0]), bushing(35, RAIL_YS[0]));

  out.push(S(k.slabOf(k.insetPlan(DEV, -1), CAR_TOP, PAD_TOP - CAR_TOP, P, 5), { tone: 'lo', crease: 'none' }));

  const jaw = (x) => {
    const plan = { x: x - 2, y: -8, w: 4, d: 16, r: 1 };
    return S(k.slabOf(plan, CAR_TOP, 6, P, 3, 0.4), { tone: 'mid' }) + knob(x, 0, 2, CAR_TOP + 6, 3, 14);
  };
  out.push(jaw(-30));

  // El dispositivo: la pieza que se trabaja
  out.push(S(k.slabOf(DEV, PAD_TOP, DEV_TOP - PAD_TOP, P, 6, 0.8), { tone: 'hi', crease: 'lo' }));
  out.push(L(k.planOutline(SCREEN, DEV_TOP, P, 5), { tone: 'lo' }));
  out.push(L(k.ring(0, DEV.y + DEV.d - 1.3, 0.6, DEV_TOP, P, 10), { tone: 'lo' }));
  out.push(`<g transform="${k.topMatrix([0, 0], DEV_TOP, P, 'x')}">${screen}</g>`);
  out.push(`<circle data-part="led" class="pf-led" cx="${at([DEV.x + DEV.w - 1.3, 0, DEV_TOP])[0].toFixed(1)}" cy="${at([DEV.x + DEV.w - 1.3, 0, DEV_TOP])[1].toFixed(1)}" r="0.9"/>`);

  out.push(jaw(30));
  out.push(bushing(-35, RAIL_YS[1]), bushing(35, RAIL_YS[1]));

  // Manija frontal
  out.push(S(k.slabOf({ x: 22, y: CAR.y + CAR.d - 1, w: 4, d: 4, r: 1 }, CAR_Z + 1, 3, P, 2), { tone: 'mid', crease: 'none' }));
  out.push(knob(24, CAR.y + CAR.d + 4, 3, CAR_Z, 5, 18));
  return out.join('');
}

// ── Pantalla del dispositivo: una capa por etapa ───────────
// Coordenadas locales en el plano de la pantalla (x a lo largo, y hacia el frente).
const SX0 = SCREEN.x;
const SX1 = SCREEN.x + SCREEN.w;
const SY0 = SCREEN.y;
const SY1 = SCREEN.y + SCREEN.d;
const f = (n) => Math.round(n * 100) / 100;
const box = (x, y, w, d, tone = 'mid', fill = '') =>
  `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(d)}" rx="0.6" class="pf-box"${fill ? ` data-fill="${fill}"` : ''} data-tone="${tone}"/>`;
const rule = (x0, x1, y, tone = 'lo') => `<path class="iso-line" data-tone="${tone}" data-free="" d="M${f(x0)} ${f(y)}H${f(x1)}"/>`;
const link = (d, tone = 'mid') => `<path class="iso-line" data-tone="${tone}" d="${d}"/>`;

function screenLayers() {
  // 01 · Plan: lista de requerimientos con casillas
  const plan = [rule(SX0 + 3, SX0 + 22, SY0 + 3.4, 'mid')];
  [7.6, 11.6, 15.6, 19.6].forEach((y, i) => {
    plan.push(box(SX0 + 3, SY0 + y - 1.3, 2.6, 2.6, 'mid'));
    plan.push(rule(SX0 + 7.4, SX0 + 7.4 + [22, 16, 26, 12][i], SY0 + y, 'lo'));
    if (i < 3) plan.push(`<path class="iso-line" data-tone="hi" data-free="" d="M${f(SX0 + 3.6)} ${f(SY0 + y)}l0.7 0.7l1.1-1.4"/>`);
  });

  // 02 · Mapa: login → inicio → módulos
  const nodes = [
    [SX0 + 2.5, -2.2, 7, 4.4],
    [SX0 + 13, -2.2, 7, 4.4],
    [SX0 + 26, -8.6, 9, 4.4],
    [SX0 + 26, -2.2, 9, 4.4],
    [SX0 + 26, 4.2, 9, 4.4],
  ];
  const map = nodes.map(([x, y, w, d], i) => box(x, y, w, d, i === 1 ? 'hi' : 'mid'));
  const hub = SX0 + 23;
  map.push(link(`M${f(SX0 + 9.5)} 0H${f(SX0 + 13)}`));
  map.push(link(`M${f(SX0 + 20)} 0H${f(SX0 + 26)}`));
  map.push(link(`M${f(hub)} 0V-6.4H${f(SX0 + 26)}`));
  map.push(link(`M${f(hub)} 0V6.4H${f(SX0 + 26)}`));
  map.push(`<circle class="pf-dot" cx="${f(hub)}" cy="0" r="0.55"/>`);

  // 03 · Maqueta: barra lateral, cabecera y tarjetas en línea
  const wire = (filled) => {
    const t = filled ? 'hi' : 'mid';
    const out = [
      box(SX0 + 1.2, SY0 + 1.2, 8, SCREEN.d - 2.4, t, filled ? 'side' : ''),
      box(SX0 + 11, SY0 + 1.2, SCREEN.w - 12.2, 3.6, t, filled ? 'top' : ''),
    ];
    for (const [cx, cy] of [[0, 0], [1, 0], [0, 1], [1, 1]]) {
      const w = (SCREEN.w - 12.2 - 1.4) / 2;
      const d = (SCREEN.d - 7.4 - 1.4) / 2;
      const x = SX0 + 11 + cx * (w + 1.4);
      const y = SY0 + 6.2 + cy * (d + 1.4);
      out.push(box(x, y, w, d, t, filled ? 'card' : ''));
      out.push(rule(x + 1.4, x + w * (filled ? 0.7 : 0.55), y + 2, filled ? 'mid' : 'lo'));
      if (filled) out.push(rule(x + 1.4, x + w * 0.45, y + 3.6, 'lo'));
    }
    [4, 7, 10, 13].forEach((y) => out.push(rule(SX0 + 2.6, SX0 + 7.4, SY0 + y, filled ? 'mid' : 'lo')));
    return out.join('');
  };

  return [plan.join(''), map.join(''), wire(false), wire(true)];
}

// Etapa → capa de pantalla (Lanzar e Iterar muestran la app terminada)
export const LAYER_OF = [0, 1, 2, 3, 3, 3];

// ── Cabezales ──────────────────────────────────────────────
function tool(i, x) {
  const out = [];
  const b = TIP_BOTTOM[i];
  const lit = (paths) => S(paths, { tone: 'hi', crease: 'lo' });
  let top;
  switch (i) {
    case 0: // sello
      out.push(lit(k.slabOf({ x: x - 6, y: -6, w: 12, d: 12, r: 1.4 }, b, 3, P, 3, 0.5)));
      out.push(S(k.cylinder(x, 0, 3, b + 3, 3, P, 20), { tone: 'mid' }));
      top = b + 6;
      break;
    case 1: // plumilla
      out.push(lit(k.cylinder(x, 0, 0.7, b, 2.5, P, 12)));
      out.push(lit(k.cylinder(x, 0, 1.8, b + 2.5, 4, P, 16)));
      out.push(knob(x, 0, 2.6, b + 6.5, 3, 16));
      top = b + 9.5;
      break;
    case 2: // plantilla
      out.push(lit(k.slabOf({ x: x - 9, y: -6, w: 18, d: 12, r: 1 }, b, 2, P, 3, 0.4)));
      out.push(L(k.planOutline({ x: x - 6.5, y: -3.5, w: 13, d: 7, r: 0.6 }, b + 2, P, 3), { tone: 'lo' }));
      out.push(S(k.cylinder(x, 0, 2.6, b + 2, 4, P, 20), { tone: 'mid' }));
      top = b + 6;
      break;
    case 3: // destornillador
      out.push(lit(k.cylinder(x, 0, 0.9, b, 5, P, 12)));
      out.push(knob(x, 0, 2.8, b + 5, 5, 18));
      top = b + 10;
      break;
    case 4: // conector
      out.push(lit(k.cylinder(x - 1.6, 0, 0.6, b, 1.6, P, 10)));
      out.push(lit(k.cylinder(x + 1.6, 0, 0.6, b, 1.6, P, 10)));
      out.push(S(k.slabOf({ x: x - 4, y: -3, w: 8, d: 6, r: 1 }, b + 1.6, 5, P, 3, 0.4), { tone: 'mid', inner: L(k.sideSeam({ x: x - 4, y: -3, w: 8, d: 6, r: 1 }, b + 4, P, 3), { tone: 'faint' }) }));
      top = b + 6.6;
      break;
    default: // palpador del reloj
      out.push(lit(k.cylinder(x, 0, 1.6, b, 1.2, P, 16)));
      out.push(lit(k.cylinder(x, 0, 1, b + 1.2, 4.8, P, 12)));
      top = b + 6;
  }
  out.push(S(k.cylinder(x, 0, ROD_R, top, ARM_Z - top, P, 16), { tone: 'mid', crease: 'none' }));
  return out.join('');
}

function head(i) {
  const x = STATIONS[i];
  const out = [];
  out.push(`<g data-part="tool" data-i="${i}">${tool(i, x)}</g>`);
  out.push(S(k.cylinder(x, 0, 3.8, GLAND_Z, HOUSING_Z - GLAND_Z, P, 24), { tone: 'mid' }));
  out.push(L(k.sideArc(x, 0, 3.8, GLAND_Z + 1.5, P, 16), { tone: 'faint' }));
  const housing = k.cylinder(x, 0, HOUSING_R, HOUSING_Z, ARM_Z - HOUSING_Z, P, 32);
  out.push(S(housing, { tone: 'mid', crease: 'none', inner: L(k.sideArc(x, 0, HOUSING_R, 52, P, 24) + k.sideArc(x, 0, HOUSING_R, 76, P, 24), { tone: 'faint' }) }));
  out.push(L(k.knurl(x, 0, HOUSING_R, 64, 70, 28, P), { tone: 'lo' }));

  // Escuadra contra la viga y brazo
  const bracket = { x: x - 8, y: -40, w: 16, d: 5, r: 1 };
  out.push(S(k.slabOf(bracket, ARM_Z - 4, ARM_TOP - ARM_Z + 8, P, 3, 0.4), { tone: 'mid' }));
  out.push(D([at([x - 5, -37.5, ARM_TOP + 4]), at([x + 5, -37.5, ARM_TOP + 4])], { size: 0.45 }));
  const arm = { x: x - 6.5, y: -35, w: 13, d: 41.5, r: 6.5 };
  out.push(S(k.slabOf(arm, ARM_Z, ARM_TOP - ARM_Z, P, 8, 0.6), { tone: 'mid' }));
  out.push(L(k.ring(x, 0, 3.2, ARM_TOP, P, 20), { tone: 'lo' }));
  out.push(D([at([x, -28, ARM_TOP]), at([x, -14, ARM_TOP])], { size: 0.45 }));
  if (i === STATIONS.length - 1) out.push(dial(x));
  return out.join('');
}

function dial(x) {
  const out = [];
  out.push(S(k.cylinder(x, 0, 2.6, ARM_TOP, DIAL_Z - ARM_TOP, P, 20), { tone: 'mid' }));
  out.push(S(k.cylinder(x, 0, DIAL_R, DIAL_Z, DIAL_TOP - DIAL_Z, P, 64, 0.8), { tone: 'hi', crease: 'lo' }));
  out.push(L(k.knurl(x, 0, DIAL_R, DIAL_TOP - 3, DIAL_TOP, 60, P, 0.3), { tone: 'lo' }));
  out.push(L(k.ring(x, 0, DIAL_R - 1.8, DIAL_TOP, P, 64), { tone: 'lo' }));
  // Doce marcas mayores: v0.1.0 a v0.1.11
  const ticks = k.radialTicks(x, 0, DIAL_R - 1.8, 60, 5, DIAL_TOP, [1, 2.2], P);
  out.push(L(ticks.minor, { tone: 'lo' }), L(ticks.major, { tone: 'mid' }));
  out.push(L(k.lineOnTop([x, -(DIAL_R - 1.8)], [x, -(DIAL_R - 4.4)], DIAL_TOP, P), { tone: 'hi' }));
  out.push(L(k.ring(x, 0, 1.2, DIAL_TOP, P, 14), { tone: 'mid' }));
  return out.join('');
}

export function needleAt(x, versions) {
  const a = (versions / 12) * Math.PI * 2;
  const r = DIAL_R - 3.6;
  return k.lineOnTop([x - Math.sin(a) * 2.4, Math.cos(a) * 2.4], [x + Math.sin(a) * r, -Math.cos(a) * r], DIAL_TOP + 0.2, P);
}

// ── Ensamblaje ─────────────────────────────────────────────
export function buildProceso() {
  const layers = screenLayers()
    .map((markup, i) => `<g data-part="layer" data-i="${i}" opacity="0">${markup}</g>`)
    .join('');
  const startX = STATIONS[0];
  const lastX = STATIONS[STATIONS.length - 1];
  const svg = k.figureSvg({
    width: WIDTH,
    height: HEIGHT,
    label:
      'Una línea de ensamblaje con seis estaciones. Un carro lleva un dispositivo por un riel y, en cada estación, baja una herramienta distinta que deja su trabajo en la pantalla: un sello para la lista de requerimientos, una plumilla para el diagrama de flujo, una plantilla para la maqueta, un destornillador para la implementación, un conector para el despliegue y un reloj comparador que cuenta las versiones publicadas.',
    body: [
      base(),
      posts(),
      beam(),
      motor(),
      rails(),
      `<g data-part="carriage" transform="${k.translateAlong(P, [startX, 0, 0])}">${carriage(layers)}</g>`,
      ...STATIONS.map((_, i) => head(i)),
      `<path data-part="needle" class="iso-line" data-tone="lit" data-free="" d="${needleAt(lastX, 0)}" style="stroke-width:1.1"/>`,
    ],
  });
  return svg;
}
