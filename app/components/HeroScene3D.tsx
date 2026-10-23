"use client";

import { useEffect, useRef, useState } from "react";
import type * as ThreeNS from "three";
import type { RoundedBoxGeometry as RoundedBoxClass } from "three/addons/geometries/RoundedBoxGeometry.js";
import type { mergeGeometries as MergeFn } from "three/addons/utils/BufferGeometryUtils.js";
import icon from "../icon.png";
import HeroScene from "./HeroScene";
import {
  brushedTexture,
  clamp01,
  glass,
  glowTexture,
  makeCanvas,
  mergeStatic,
  roundRect,
  smooth,
  studioEnvironment,
  tex,
  type Three,
} from "./three-kit";

const BOARD_W = 6.6;
const BOARD_D = 4.5;
const TOP = 0.08; // top surface of the board

// Traces on the board, in world units (x, z), running out from the processor.
const TRACES: [number, number][][] = [
  [
    [-0.5, -0.8],
    [-0.5, -1.15],
    [-0.95, -1.6],
    [-2.6, -1.6],
  ],
  [
    [-0.2, -0.8],
    [-0.2, -1.2],
    [-0.45, -1.45],
    [-0.45, -2.05],
  ],
  [
    [0.2, -0.8],
    [0.2, -1.2],
    [0.55, -1.55],
    [2.2, -1.55],
  ],
  [
    [0.5, -0.8],
    [0.5, -1.1],
    [0.95, -1.55],
    [0.95, -2.05],
  ],
  [
    [-0.8, -0.5],
    [-1.15, -0.5],
    [-1.5, -0.85],
    [-3.0, -0.85],
  ],
  [
    [-0.8, -0.1],
    [-1.6, -0.1],
    [-1.9, 0.2],
    [-3.0, 0.2],
  ],
  [
    [-0.8, 0.3],
    [-1.2, 0.3],
    [-1.5, 0.65],
    [-3.0, 0.65],
  ],
  [
    [-0.8, 0.65],
    [-1.05, 0.65],
    [-1.4, 1.1],
    [-1.4, 1.5],
  ],
  [
    [-0.5, 0.8],
    [-0.5, 1.15],
    [-0.95, 1.7],
    [-2.5, 1.7],
  ],
  [
    [0.2, 0.8],
    [0.2, 1.3],
    [0.2, 2.05],
  ],
  [
    [0.55, 0.8],
    [0.55, 1.2],
    [0.9, 1.6],
    [1.8, 1.6],
  ],
  [
    [0.8, 0.5],
    [1.1, 0.5],
    [1.4, 0.9],
    [1.4, 1.4],
  ],
];

// Long runs that carry the signal off to the left, across the whole hero.
const WIDE: [number, number, number][][] = [
  [
    [-3.2, 0.0, 0.2],
    [-6, 0.0, 0.2],
    [-9, 0.0, -0.6],
    [-14, 0.0, -0.6],
  ],
  [
    [-3.2, 0.0, 0.65],
    [-5.5, 0.0, 0.65],
    [-8, 0.0, 1.6],
    [-14, 0.0, 1.6],
  ],
  [
    [-3.2, 0.0, -0.85],
    [-6.5, 0.0, -0.85],
    [-9.5, 0.0, -2],
    [-14, 0.0, -2],
  ],
];

// Solder-mask blue board with silvery traces and a few glowing ones.
function boardTextures(THREE: Three) {
  const W = 1600;
  const H = Math.round((W * BOARD_D) / BOARD_W);
  const px = (x: number) => ((x + BOARD_W / 2) / BOARD_W) * W;
  const py = (z: number) => ((z + BOARD_D / 2) / BOARD_D) * H;
  const color = makeCanvas(W, H);
  const glow = makeCanvas(W, H);
  const g = color.ctx.createLinearGradient(0, 0, W, H);
  g.addColorStop(0, "#0c2f4c");
  g.addColorStop(1, "#082238");
  color.ctx.fillStyle = g;
  color.ctx.fillRect(0, 0, W, H);
  glow.ctx.fillStyle = "#000";
  glow.ctx.fillRect(0, 0, W, H);

  // Dense fine routing under the parts
  color.ctx.strokeStyle = "rgba(120,190,235,0.22)";
  color.ctx.lineWidth = 2;
  let seed = 11;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
  for (let i = 0; i < 260; i++) {
    const x = rnd() * W;
    const y = rnd() * H;
    color.ctx.beginPath();
    color.ctx.moveTo(x, y);
    const l = 40 + rnd() * 150;
    const turn = rnd() > 0.5;
    color.ctx.lineTo(x + l, y);
    if (turn) color.ctx.lineTo(x + l + l * 0.4, y + l * 0.4);
    color.ctx.stroke();
  }

  for (const line of TRACES) {
    for (const [ctx, stroke, width] of [
      [color.ctx, "#b9d8ee", 6],
      [glow.ctx, "#2f9be0", 6],
    ] as const) {
      ctx.strokeStyle = stroke;
      ctx.lineWidth = width;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.beginPath();
      line.forEach(([x, z], i) =>
        i ? ctx.lineTo(px(x), py(z)) : ctx.moveTo(px(x), py(z)),
      );
      ctx.stroke();
    }
    const [ex, ez] = line[line.length - 1];
    color.ctx.fillStyle = "#e8f3fb";
    color.ctx.beginPath();
    color.ctx.arc(px(ex), py(ez), 10, 0, Math.PI * 2);
    color.ctx.fill();
    glow.ctx.fillStyle = "#7fd0ff";
    glow.ctx.beginPath();
    glow.ctx.arc(px(ex), py(ez), 7, 0, Math.PI * 2);
    glow.ctx.fill();
  }

  // Silkscreen
  color.ctx.fillStyle = "rgba(235,246,255,0.75)";
  color.ctx.font = "600 22px ui-monospace, monospace";
  const marks: [string, number, number][] = [
    ["RZ-X9 PRO", -2.9, -2.05],
    ["DDR5 · CH A/B", 1.4, -2.0],
    ["PCIe 5.0 x16", -1.2, 2.05],
    ["VRM", -1.6, -0.35],
    ["M.2", -2.9, 1.2],
  ];
  for (const [t, x, z] of marks) color.ctx.fillText(t, px(x), py(z));

  // Mounting holes
  for (const [x, z] of [
    [-3.15, -2.05],
    [3.15, -2.05],
    [-3.15, 2.05],
    [3.15, 2.05],
  ]) {
    color.ctx.fillStyle = "#c7d6e2";
    color.ctx.beginPath();
    color.ctx.arc(px(x), py(z), 20, 0, Math.PI * 2);
    color.ctx.fill();
    color.ctx.fillStyle = "#06182a";
    color.ctx.beginPath();
    color.ctx.arc(px(x), py(z), 10, 0, Math.PI * 2);
    color.ctx.fill();
  }
  return { map: tex(THREE, color.c), emissive: tex(THREE, glow.c) };
}

// Laser etching on the heat spreader.
function etchTexture(THREE: Three) {
  const { c, ctx } = makeCanvas(512, 512);
  ctx.clearRect(0, 0, 512, 512);
  ctx.fillStyle = "rgba(25,45,62,0.85)";
  ctx.textAlign = "center";
  ctx.font = "700 34px ui-sans-serif, system-ui";
  ctx.fillText("RIZVIZ  ZX-9", 256, 400);
  ctx.font = "500 20px ui-monospace, monospace";
  ctx.fillText("16C / 32T   5.4 GHz   LGA-1851", 256, 436);
  ctx.fillText("A3C7 · 4429 · PRO", 256, 464);
  ctx.strokeStyle = "rgba(25,45,62,0.55)";
  ctx.lineWidth = 3;
  roundRect(ctx, 40, 40, 432, 432, 24);
  ctx.stroke();
  return tex(THREE, c);
}

// The die under the heat spreader: glowing cores.
function dieTexture(THREE: Three) {
  const { c, ctx } = makeCanvas(512, 512);
  ctx.fillStyle = "#06233b";
  ctx.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      const x = 26 + i * 120;
      const y = 26 + j * 120;
      const g = ctx.createLinearGradient(x, y, x + 100, y + 100);
      g.addColorStop(0, "#a8e0ff");
      g.addColorStop(1, "#2f9be0");
      ctx.fillStyle = g;
      roundRect(ctx, x, y, 104, 104, 9);
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.7)";
      ctx.lineWidth = 2;
      for (let k = 1; k < 5; k++) {
        ctx.beginPath();
        ctx.moveTo(x + 8, y + k * 20);
        ctx.lineTo(x + 96, y + k * 20);
        ctx.stroke();
      }
    }
  }
  return tex(THREE, c);
}

// Floating software panels: dark glass with bright lines, redrawn live.
function makePanel(
  THREE: Three,
  w: number,
  h: number,
  draw: (ctx: CanvasRenderingContext2D, t: number) => void,
) {
  const { c, ctx } = makeCanvas(w, h);
  const t = tex(THREE, c);
  return {
    texture: t,
    redraw(time: number) {
      ctx.clearRect(0, 0, w, h);
      draw(ctx, time);
      t.needsUpdate = true;
    },
  };
}

function drawCode(ctx: CanvasRenderingContext2D, t: number) {
  const w = 640;
  const h = 440;
  glass(ctx, w, h);
  ["#329fe0", "#70c7f4", "#9fb7c8"].forEach((col, i) => {
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.arc(46 + i * 26, 44, 8, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.fillStyle = "rgba(181,229,255,0.8)";
  ctx.font = "600 20px ui-monospace, monospace";
  ctx.fillText("scheduler.ts", w - 170, 50);

  const lines: [number, number, string][][] = [
    [
      [0, 70, "#70c7f4"],
      [86, 150, "#e6f4ff"],
      [246, 60, "#329fe0"],
    ],
    [
      [36, 110, "#329fe0"],
      [160, 52, "#e6f4ff"],
      [226, 120, "#70c7f4"],
    ],
    [
      [36, 160, "#e6f4ff"],
      [208, 90, "#329fe0"],
    ],
    [
      [36, 70, "#70c7f4"],
      [118, 170, "#e6f4ff"],
    ],
    [
      [36, 130, "#e6f4ff"],
      [180, 80, "#70c7f4"],
      [274, 40, "#329fe0"],
    ],
    [[0, 44, "#70c7f4"]],
  ];
  const cycle = (t % 10) / 10;
  const reveal =
    cycle < 0.08 ? 0 : cycle > 0.92 ? 0 : Math.min(1, (cycle - 0.08) / 0.55);
  let cx = 50;
  let cy = 110;
  lines.forEach((tokens, row) => {
    const y = 108 + row * 52;
    const rowReveal = clamp01((reveal - row / lines.length) * lines.length);
    const total = tokens.reduce((s, tk) => s + tk[1], 0) + tokens.length * 14;
    let shown = rowReveal * total;
    for (const [ox, len, col] of tokens) {
      const part = Math.max(0, Math.min(len, shown));
      shown -= len + 14;
      if (part > 0) {
        ctx.fillStyle = col;
        roundRect(ctx, 50 + ox, y, part, 15, 7);
        ctx.fill();
        cx = 50 + ox + part + 8;
        cy = y;
      }
    }
  });
  if (Math.floor(t * 2) % 2 === 0 && reveal > 0 && reveal < 1) {
    ctx.fillStyle = "#70c7f4";
    ctx.fillRect(cx, cy - 3, 8, 22);
  }
}

function drawChart(ctx: CanvasRenderingContext2D, t: number) {
  const w = 560;
  const h = 440;
  glass(ctx, w, h);
  ctx.fillStyle = "rgba(223,241,252,0.95)";
  ctx.font = "700 24px ui-sans-serif, system-ui";
  ctx.fillText("Throughput", 48, 74);
  ctx.fillStyle = "#70c7f4";
  ctx.font = "600 20px ui-monospace, monospace";
  ctx.fillText(`${(92 + Math.sin(t) * 4).toFixed(1)} %`, w - 150, 74);
  for (let i = 0; i < 8; i++) {
    const v =
      0.5 +
      0.28 * Math.sin(t * (0.9 + i * 0.13) + i * 1.3) +
      0.14 * Math.sin(t * 0.5 + i);
    const bh = 250 * clamp01(v);
    const gr = ctx.createLinearGradient(0, 370 - bh, 0, 370);
    gr.addColorStop(0, "#9fdcff");
    gr.addColorStop(1, "#2f9be0");
    ctx.fillStyle = gr;
    roundRect(ctx, 52 + i * 56, 370 - bh, 32, bh, 9);
    ctx.fill();
  }
  ctx.strokeStyle = "rgba(112,199,244,0.35)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(44, 376);
  ctx.lineTo(w - 44, 376);
  ctx.stroke();
}

function drawStatus(ctx: CanvasRenderingContext2D, t: number) {
  const w = 600;
  const h = 190;
  glass(ctx, w, h, 62);
  ctx.fillStyle = "rgba(112,199,244,0.18)";
  ctx.beginPath();
  ctx.arc(104, 95, 42, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#9fdcff";
  ctx.lineWidth = 9;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.globalAlpha = 0.65 + 0.35 * Math.sin(t * 2.6);
  ctx.beginPath();
  ctx.moveTo(84, 95);
  ctx.lineTo(98, 109);
  ctx.lineTo(126, 79);
  ctx.stroke();
  ctx.globalAlpha = 1;
  ctx.fillStyle = "#eaf6ff";
  ctx.font = "700 40px ui-sans-serif, system-ui";
  ctx.fillText("Build passing", 168, 92);
  ctx.fillStyle = "#70c7f4";
  ctx.font = "500 27px ui-monospace, monospace";
  ctx.fillText("deploy · live", 168, 132);
}

function build(
  THREE: Three,
  RoundedBoxGeometry: typeof RoundedBoxClass,
  mergeGeometries: typeof MergeFn,
  el: HTMLElement,
  still: boolean,
  iconUrl: string,
) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  let pixelRatio = Math.min(window.devicePixelRatio, 1.5);
  renderer.setPixelRatio(pixelRatio);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  // The shadow only needs refreshing every few frames; the scene moves slowly.
  renderer.shadowMap.autoUpdate = false;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  const canvas = renderer.domElement;
  canvas.style.cssText = "display:block;width:100%;height:100%";
  el.appendChild(canvas);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTexture = pmrem.fromScene(studioEnvironment(THREE), 0.02).texture;
  scene.environment = envTexture;
  scene.environmentIntensity = 1.0;

  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 80);
  camera.position.set(0, 6.4, 14);
  camera.lookAt(0, 0.7, 0);

  scene.add(new THREE.HemisphereLight(0xffffff, 0x9cc3e0, 0.55));
  const key = new THREE.DirectionalLight(0xffffff, 2.4);
  key.position.set(4, 8, 5);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.left = -5;
  key.shadow.camera.right = 5;
  key.shadow.camera.top = 5;
  key.shadow.camera.bottom = -5;
  key.shadow.camera.far = 24;
  key.shadow.bias = -0.0003;
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x6fc1f5, 2.4);
  rim.position.set(-6, 3, -4);
  scene.add(rim);
  const underGlow = new THREE.PointLight(0x2f9be0, 6, 9, 2);
  underGlow.position.set(0, 0.8, 0);
  scene.add(underGlow);

  const world = new THREE.Group();
  scene.add(world);

  const brushed = brushedTexture(THREE);
  const brushedV = brushedTexture(THREE, true);
  const M = {
    board: new THREE.MeshStandardMaterial({
      color: 0x0a2740,
      roughness: 0.5,
      metalness: 0.15,
    }),
    silver: new THREE.MeshStandardMaterial({
      color: 0xdfe6ec,
      roughness: 0.3,
      roughnessMap: brushed,
      metalness: 1,
    }),
    silverFin: new THREE.MeshStandardMaterial({
      color: 0xd2dbe3,
      roughness: 0.34,
      roughnessMap: brushedV,
      metalness: 1,
    }),
    polish: new THREE.MeshStandardMaterial({
      color: 0xf1f5f8,
      roughness: 0.1,
      metalness: 1,
    }),
    graphite: new THREE.MeshStandardMaterial({
      color: 0x1b2631,
      roughness: 0.4,
      metalness: 0.75,
    }),
    black: new THREE.MeshStandardMaterial({
      color: 0x0b1118,
      roughness: 0.35,
      metalness: 0.3,
    }),
    gold: new THREE.MeshStandardMaterial({
      color: 0xe0b866,
      roughness: 0.22,
      metalness: 1,
    }),
    led: new THREE.MeshBasicMaterial({ color: 0x7fd0ff, toneMapped: false }),
  };
  const add = (
    geo: ThreeNS.BufferGeometry,
    m: ThreeNS.Material,
    x: number,
    y: number,
    z: number,
    parent: ThreeNS.Object3D = world,
  ) => {
    const mesh = new THREE.Mesh(geo, m);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.userData.merge = true;
    parent.add(mesh);
    return mesh;
  };
  const rbox = (w: number, h: number, d: number, r: number) =>
    new RoundedBoxGeometry(w, h, d, 2, r);

  // Ground: a faint perspective grid running right across the hero, and a
  // soft shadow under the board.
  const grid = new THREE.GridHelper(60, 60, 0x70c7f4, 0x9fd3f2);
  (grid.material as ThreeNS.Material).transparent = true;
  (grid.material as ThreeNS.Material).opacity = 0.2;
  grid.position.y = -0.6;
  scene.add(grid);
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(30, 20),
    new THREE.ShadowMaterial({ opacity: 0.07 }),
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.59;
  ground.receiveShadow = true;
  scene.add(ground);

  // Board
  add(rbox(BOARD_W, 0.16, BOARD_D, 0.06), M.board, 0, 0, 0);
  const { map, emissive } = boardTextures(THREE);
  const surface = new THREE.Mesh(
    new THREE.PlaneGeometry(BOARD_W - 0.06, BOARD_D - 0.06),
    new THREE.MeshStandardMaterial({
      map,
      emissiveMap: emissive,
      emissive: 0xffffff,
      emissiveIntensity: 1.4,
      roughness: 0.4,
      metalness: 0.1,
    }),
  );
  surface.rotation.x = -Math.PI / 2;
  surface.position.y = TOP + 0.001;
  surface.receiveShadow = true;
  world.add(surface);
  // Light strip along the front edge
  add(
    new THREE.BoxGeometry(BOARD_W - 0.5, 0.03, 0.04),
    M.led,
    0,
    0.0,
    BOARD_D / 2 + 0.005,
  );

  // CPU socket: a steel load plate around the processor
  const sock = new THREE.Group();
  sock.position.y = TOP;
  world.add(sock);
  add(rbox(2.15, 0.06, 2.15, 0.03), M.graphite, 0, 0.03, 0, sock);
  for (const s of [-1, 1]) {
    add(
      new THREE.BoxGeometry(2.2, 0.05, 0.14),
      M.silver,
      0,
      0.09,
      s * 1.0,
      sock,
    );
    add(
      new THREE.BoxGeometry(0.14, 0.05, 2.2),
      M.silver,
      s * 1.0,
      0.09,
      0,
      sock,
    );
  }
  for (const [x, z] of [
    [-1.0, -1.0],
    [1.0, -1.0],
    [-1.0, 1.0],
    [1.0, 1.0],
  ])
    add(
      new THREE.CylinderGeometry(0.06, 0.06, 0.04, 20),
      M.polish,
      x,
      0.13,
      z,
      sock,
    );

  // The processor, built in layers so it can lift apart
  const chip = new THREE.Group();
  chip.position.y = TOP + 0.07;
  world.add(chip);
  const substrate = add(
    rbox(1.72, 0.06, 1.72, 0.03),
    M.black,
    0,
    0.02,
    0,
    chip,
  );
  for (let i = 0; i < 22; i++) {
    for (const [dx, dz] of [
      [-0.8, 0],
      [0.8, 0],
      [0, -0.8],
      [0, 0.8],
    ]) {
      const off = -0.74 + (i / 21) * 1.48;
      add(
        new THREE.BoxGeometry(dx ? 0.035 : 0.04, 0.012, dz ? 0.035 : 0.04),
        M.gold,
        dx ? dx : off,
        0.057,
        dz ? dz : off,
        chip,
      );
    }
  }
  const dieMat = new THREE.MeshStandardMaterial({
    map: dieTexture(THREE),
    emissiveMap: dieTexture(THREE),
    emissive: 0xffffff,
    emissiveIntensity: 0.9,
    roughness: 0.35,
    metalness: 0.2,
  });
  const die = add(
    new THREE.BoxGeometry(0.9, 0.05, 0.9),
    dieMat,
    0,
    0.09,
    0,
    chip,
  );
  const spreader = new THREE.Group();
  spreader.position.y = 0.2;
  chip.add(spreader);
  add(rbox(1.52, 0.13, 1.52, 0.05), M.silver, 0, 0, 0, spreader);
  add(rbox(1.34, 0.025, 1.34, 0.025), M.silver, 0, 0.07, 0, spreader);
  const etchMat = new THREE.MeshBasicMaterial({
    transparent: true,
    toneMapped: false,
    opacity: 0,
  });
  const etch = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 1.3), etchMat);
  etch.rotation.x = -Math.PI / 2;
  etch.position.y = 0.0835;
  etchMat.map = etchTexture(THREE);
  etchMat.opacity = 1;
  spreader.add(etch);
  const logoMat = new THREE.MeshBasicMaterial({
    transparent: true,
    toneMapped: false,
    opacity: 0,
  });
  const logo = new THREE.Mesh(new THREE.PlaneGeometry(0.62, 0.62), logoMat);
  logo.rotation.x = -Math.PI / 2;
  logo.position.set(0, 0.085, -0.12);
  spreader.add(logo);
  new THREE.TextureLoader().load(iconUrl, (t) => {
    t.colorSpace = THREE.SRGBColorSpace;
    logoMat.map = t;
    logoMat.opacity = 1;
    logoMat.needsUpdate = true;
  });
  const ripple = new THREE.Mesh(
    new THREE.RingGeometry(0.97, 1, 90),
    new THREE.MeshBasicMaterial({
      color: 0x329fe0,
      transparent: true,
      opacity: 0,
      toneMapped: false,
      side: THREE.DoubleSide,
    }),
  );
  ripple.rotation.x = -Math.PI / 2;
  ripple.position.y = TOP + 0.012;
  world.add(ripple);

  // Heatsinks: a stack of aluminium fins, for the power stage and the chipset
  const finGeo = new THREE.BoxGeometry(0.03, 0.62, 0.95);
  const heatsink = (x: number, z: number, n: number, rotY = 0) => {
    const g = new THREE.Group();
    g.position.set(x, TOP, z);
    g.rotation.y = rotY;
    world.add(g);
    add(rbox(n * 0.07 + 0.1, 0.07, 1.05, 0.02), M.silver, 0, 0.035, 0, g);
    const inst = new THREE.InstancedMesh(finGeo, M.silverFin, n);
    inst.castShadow = true;
    inst.receiveShadow = true;
    const m4 = new THREE.Matrix4();
    for (let i = 0; i < n; i++) {
      m4.makeTranslation(-((n - 1) * 0.07) / 2 + i * 0.07, 0.38, 0);
      inst.setMatrixAt(i, m4);
    }
    g.add(inst);
    add(
      new THREE.BoxGeometry(n * 0.07 + 0.1, 0.05, 1.05),
      M.silver,
      0,
      0.7,
      0,
      g,
    );
    add(
      new THREE.BoxGeometry(n * 0.07 + 0.1, 0.012, 0.04),
      M.led,
      0,
      0.7,
      0.53,
      g,
    );
    return g;
  };
  heatsink(-1.95, -0.55, 9, 0);
  heatsink(-1.95, 0.55, 9, 0);
  heatsink(0.0, -1.85, 11, Math.PI / 2);

  // Memory: four modules with brushed spreaders and a light bar each
  const leds: ThreeNS.Mesh[] = [];
  for (let i = 0; i < 4; i++) {
    const x = 1.75 + i * 0.26;
    add(rbox(0.16, 0.07, 1.5, 0.02), M.black, x, TOP + 0.035, 0.1);
    add(new THREE.BoxGeometry(0.065, 0.78, 1.38), M.silver, x, TOP + 0.45, 0.1);
    add(
      new THREE.BoxGeometry(0.02, 0.62, 1.2),
      M.graphite,
      x + 0.04,
      TOP + 0.45,
      0.1,
    );
    add(new THREE.BoxGeometry(0.052, 0.045, 1.3), M.gold, x, TOP + 0.1, 0.1);
    const led = new THREE.Mesh(
      new THREE.BoxGeometry(0.075, 0.035, 1.28),
      new THREE.MeshBasicMaterial({ color: 0x7fd0ff, toneMapped: false }),
    );
    led.position.set(x, TOP + 0.86, 0.1);
    world.add(led);
    leds.push(led);
  }

  // M.2 drive with its own cover
  add(rbox(1.5, 0.045, 0.42, 0.01), M.black, -2.05, TOP + 0.045, 1.55);
  add(rbox(1.2, 0.07, 0.4, 0.02), M.silver, -2.0, TOP + 0.11, 1.55);

  // Power stage: polymer capacitors and chokes round the socket
  for (let i = 0; i < 8; i++) {
    const x = -1.2 + i * 0.3;
    add(
      new THREE.CylinderGeometry(0.1, 0.1, 0.24, 28),
      M.black,
      x,
      TOP + 0.12,
      1.5,
    );
    add(
      new THREE.CylinderGeometry(0.1, 0.1, 0.02, 28),
      M.polish,
      x,
      TOP + 0.25,
      1.5,
    );
  }
  for (let i = 0; i < 6; i++) {
    add(
      rbox(0.26, 0.2, 0.26, 0.03),
      M.graphite,
      1.25 + (i % 2) * 0.0,
      TOP + 0.1,
      -1.45 + i * 0.3,
    ).rotation.y = 0.0;
  }
  for (let i = 0; i < 5; i++) {
    add(
      rbox(0.3, 0.16, 0.26, 0.03),
      M.graphite,
      -1.2 + i * 0.35,
      TOP + 0.08,
      -1.55,
    );
  }
  // PCIe slot along the front
  add(rbox(3.4, 0.12, 0.2, 0.02), M.black, 0.3, TOP + 0.06, 1.95);
  add(new THREE.BoxGeometry(3.2, 0.02, 0.06), M.gold, 0.3, TOP + 0.125, 1.95);

  // Only the die and heat spreader, which lift apart, stay separate.
  die.userData.merge = false;
  spreader.traverse((o) => {
    o.userData.merge = false;
  });
  mergeStatic(THREE, mergeGeometries, world);

  // Software panels hovering over the board
  const code = makePanel(THREE, 640, 440, drawCode);
  const chart = makePanel(THREE, 560, 440, drawChart);
  const status = makePanel(THREE, 600, 190, drawStatus);
  const panelMat = (t: ThreeNS.Texture) =>
    new THREE.MeshBasicMaterial({
      map: t,
      transparent: true,
      toneMapped: false,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
  const panels = [
    { p: code, w: 2.6, h: 1.79, pos: [-2.15, 2.1, -0.3], ry: 0.42, ph: 0 },
    { p: chart, w: 2.2, h: 1.73, pos: [2.9, 1.9, 0.3], ry: -0.42, ph: 2 },
    { p: status, w: 2.4, h: 0.76, pos: [0.9, 3.15, -1.2], ry: -0.18, ph: 4 },
  ].map((d) => {
    const m = new THREE.Mesh(
      new THREE.PlaneGeometry(d.w, d.h),
      panelMat(d.p.texture),
    );
    m.position.set(d.pos[0], d.pos[1], d.pos[2]);
    m.rotation.y = d.ry;
    world.add(m);
    return { ...d, mesh: m, base: d.pos[1] };
  });

  // Light running along the traces
  let seed = 7;
  const rng = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
  const glowTex = glowTexture(THREE, "50,159,224");
  type Pulse = {
    sprite: ThreeNS.Sprite;
    pts: ThreeNS.Vector3[];
    lens: number[];
    total: number;
    speed: number;
    offset: number;
  };
  const pulses: Pulse[] = [];
  const addPulses = (
    pts: ThreeNS.Vector3[],
    speed: number,
    count: number,
    scale: number,
  ) => {
    const lens: number[] = [0];
    for (let i = 1; i < pts.length; i++)
      lens.push(lens[i - 1] + pts[i].distanceTo(pts[i - 1]));
    for (let k = 0; k < count; k++) {
      const sprite = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: glowTex,
          transparent: true,
          depthWrite: false,
          toneMapped: false,
        }),
      );
      sprite.scale.setScalar(scale);
      world.add(sprite);
      pulses.push({
        sprite,
        pts,
        lens,
        total: lens[lens.length - 1],
        speed: speed * (0.85 + rng() * 0.3),
        offset: k / count + rng() * 0.1,
      });
    }
  };
  for (const line of TRACES) {
    addPulses(
      line.map(([x, z]) => new THREE.Vector3(x, TOP + 0.03, z)),
      0.4,
      1,
      0.34,
    );
  }
  // The long runs leave the board and cross the whole page
  for (const line of WIDE) {
    const pts = line.map(
      ([x, y, z]) => new THREE.Vector3(x, y + 0.04 - 0.55, z),
    );
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const ln = new THREE.Line(
      geo,
      new THREE.LineBasicMaterial({
        color: 0x70c7f4,
        transparent: true,
        opacity: 0.55,
      }),
    );
    world.add(ln);
    addPulses(pts, 0.085, 2, 0.5);
  }

  // Dust of light drifting through the whole space
  const COUNT = 90;
  const partGeo = new THREE.BufferGeometry();
  const partPos = new Float32Array(COUNT * 3);
  const seeds = Array.from({ length: COUNT }, () => ({
    x: (rng() - 0.5) * 30,
    y: rng() * 7,
    z: (rng() - 0.5) * 12 - 1,
    speed: 0.02 + rng() * 0.06,
    phase: rng(),
  }));
  partGeo.setAttribute("position", new THREE.BufferAttribute(partPos, 3));
  const dust = new THREE.Points(
    partGeo,
    new THREE.PointsMaterial({
      map: glowTexture(THREE, "112,199,244"),
      size: 0.2,
      transparent: true,
      depthWrite: false,
      opacity: 0.8,
      toneMapped: false,
    }),
  );
  scene.add(dust);

  // Data rising out of the chip towards the panels
  const RISE = 45;
  const riseGeo = new THREE.BufferGeometry();
  const risePos = new Float32Array(RISE * 3);
  const riseSeed = Array.from({ length: RISE }, () => ({
    x: (rng() - 0.5) * 1.0,
    z: (rng() - 0.5) * 1.0,
    speed: 0.25 + rng() * 0.3,
    phase: rng(),
    drift: (rng() - 0.5) * 0.6,
  }));
  riseGeo.setAttribute("position", new THREE.BufferAttribute(risePos, 3));
  world.add(
    new THREE.Points(
      riseGeo,
      new THREE.PointsMaterial({
        map: glowTexture(THREE, "159,220,255"),
        size: 0.17,
        transparent: true,
        depthWrite: false,
        opacity: 0.95,
        toneMapped: false,
      }),
    ),
  );

  // Packets hopping between the chip and the panels
  const packet = (rgb: string) => {
    const s = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowTexture(THREE, rgb),
        transparent: true,
        depthWrite: false,
        toneMapped: false,
      }),
    );
    s.scale.setScalar(0.34);
    world.add(s);
    return s;
  };
  const toCode = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(-0.4, 0.55, -0.1),
    new THREE.Vector3(-1.5, 1.9, 0),
    new THREE.Vector3(-2.2, 1.5, -0.2),
  );
  const toChart = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(0.4, 0.55, 0.1),
    new THREE.Vector3(1.6, 1.9, 0.3),
    new THREE.Vector3(2.5, 1.5, 0.3),
  );
  const packets = [
    { s: packet("50,159,224"), curve: toCode, off: 0 },
    { s: packet("112,199,244"), curve: toCode, off: 0.5 },
    { s: packet("50,159,224"), curve: toChart, off: 0.25 },
    { s: packet("112,199,244"), curve: toChart, off: 0.75 },
  ];

  const mouse = { x: 0, y: 0, sx: 0, sy: 0 };
  const onMove = (e: PointerEvent) => {
    mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
  };
  window.addEventListener("pointermove", onMove, { passive: true });

  const pointOn = (p: Pulse, d: number, out: ThreeNS.Vector3) => {
    for (let i = 1; i < p.pts.length; i++) {
      if (d <= p.lens[i]) {
        const t = (d - p.lens[i - 1]) / (p.lens[i] - p.lens[i - 1]);
        return out.lerpVectors(p.pts[i - 1], p.pts[i], t);
      }
    }
    return out.copy(p.pts[p.pts.length - 1]);
  };

  let panelClock = -1;
  let panelTurn = 0;
  let frameNo = 0;
  const update = (time: number) => {
    // 12s cycle: assembled, the spreader lifts off, hangs open, closes again.
    const c = time % 12;
    const open =
      smooth(clamp01((c - 4.5) / 1.6)) * (1 - smooth(clamp01((c - 8.6) / 1.6)));
    spreader.position.y = 0.2 + open * 1.1;
    spreader.rotation.y = open * 0.7;
    die.position.y = 0.09 + open * 0.36;
    substrate.position.y = 0.02;
    dieMat.emissiveIntensity = 0.7 + open * 1.2;
    underGlow.intensity = 5 + open * 9;
    const ripT = clamp01((c - 5.6) / 2.4);
    ripple.scale.setScalar(0.9 + ripT * 3.8);
    (ripple.material as ThreeNS.MeshBasicMaterial).opacity =
      ripT > 0 && ripT < 1 ? (1 - ripT) * 0.55 : 0;

    mouse.sx += (mouse.x - mouse.sx) * 0.04;
    mouse.sy += (mouse.y - mouse.sy) * 0.04;
    world.rotation.y = Math.sin(time * 0.2) * 0.36 + mouse.sx * 0.22;
    world.rotation.x = mouse.sy * 0.04;
    camera.position.y = 6.4 + Math.sin(time * 0.15) * 0.25;
    camera.lookAt(0, 0.7, 0);

    leds.forEach((l, i) => {
      const k = 0.55 + 0.45 * Math.sin(time * 1.6 + i * 0.8);
      (l.material as ThreeNS.MeshBasicMaterial).color.setRGB(
        0.3 + 0.2 * k,
        0.65 + 0.3 * k,
        1,
      );
    });
    panels.forEach((d) => {
      d.mesh.position.y = d.base + Math.sin(time * 0.9 + d.ph) * 0.07;
    });
    // Redraw one panel per tick, round robin, so no single frame pays for all.
    if (time - panelClock > 0.1) {
      panelClock = time;
      panelTurn = (panelTurn + 1) % 3;
      [code, chart, status][panelTurn].redraw(time);
    }
    for (const p of pulses) {
      const phase = (time * p.speed + p.offset) % 1;
      pointOn(p, phase * p.total, p.sprite.position);
      (p.sprite.material as ThreeNS.SpriteMaterial).opacity = Math.sin(
        phase * Math.PI,
      );
    }
    for (let i = 0; i < COUNT; i++) {
      const s = seeds[i];
      const ph = (time * s.speed + s.phase) % 1;
      partPos[i * 3] = s.x + Math.sin(time * 0.2 + i) * 0.3;
      partPos[i * 3 + 1] = -0.2 + ((s.y + ph * 7) % 7);
      partPos[i * 3 + 2] = s.z;
    }
    partGeo.attributes.position.needsUpdate = true;
    for (let i = 0; i < RISE; i++) {
      const s = riseSeed[i];
      const ph = (time * s.speed * 0.5 + s.phase) % 1;
      risePos[i * 3] = s.x * (1 - ph * 0.3) + s.drift * ph;
      risePos[i * 3 + 1] = 0.5 + ph * 2.6;
      risePos[i * 3 + 2] = s.z * (1 - ph * 0.3);
    }
    riseGeo.attributes.position.needsUpdate = true;
    for (const k of packets) {
      const ph = (time * 0.42 + k.off) % 1;
      k.curve.getPoint(ph, k.s.position);
      (k.s.material as ThreeNS.SpriteMaterial).opacity = Math.sin(ph * Math.PI);
    }
  };

  // The canvas fills the whole hero; the picture is shifted right so the
  // processor sits on the right-hand side, where the details should be.
  const resize = () => {
    const w = Math.max(el.clientWidth, 1);
    const h = Math.max(el.clientHeight, 1);
    renderer.setSize(w, h, false);
    const aspect = w / h;
    camera.aspect = aspect;
    camera.fov = aspect < 1.1 ? 44 : 30;
    const wide = aspect >= 1.1;
    camera.position.z = wide ? 17.2 : 21;
    const shift = wide ? w * 0.17 : 0;
    camera.setViewOffset(w, h, -shift, wide ? -h * 0.06 : h * 0.3, w, h);
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(() => {
    resize();
    if (still) {
      update(3);
      renderer.render(scene, camera);
    }
  });
  ro.observe(el);
  resize();

  let frame = 0;
  let visible = true;
  // If frames are slow, trade sharpness for speed: lower the resolution a
  // step at a time until it keeps up.
  let acc = 0;
  let samples = 0;
  let last = 0;
  const loop = (now: number) => {
    frame = requestAnimationFrame(loop);
    if (!visible) {
      last = 0;
      return;
    }
    if (last) {
      acc += now - last;
      samples++;
      if (samples === 40) {
        if (acc / samples > 24 && pixelRatio > 0.75) {
          pixelRatio = Math.max(0.75, pixelRatio - 0.25);
          renderer.setPixelRatio(pixelRatio);
          resize();
        }
        acc = 0;
        samples = 0;
      }
    }
    last = now;
    update(now / 1000);
    if (frameNo++ % 4 === 0) renderer.shadowMap.needsUpdate = true;
    renderer.render(scene, camera);
  };
  const io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
  });
  io.observe(el);
  renderer.shadowMap.needsUpdate = true;
  if (still) {
    update(3);
    renderer.render(scene, camera);
  } else {
    frame = requestAnimationFrame(loop);
  }

  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener("pointermove", onMove);
    io.disconnect();
    ro.disconnect();
    scene.traverse((o) => {
      const m = o as ThreeNS.Mesh;
      m.geometry?.dispose?.();
      const mm = m.material as
        ThreeNS.Material | ThreeNS.Material[] | undefined;
      (Array.isArray(mm) ? mm : mm ? [mm] : []).forEach((x) => {
        (x as ThreeNS.MeshBasicMaterial).map?.dispose?.();
        x.dispose();
      });
    });
    envTexture.dispose();
    pmrem.dispose();
    renderer.dispose();
    canvas.remove();
  };
}

// A 3D processor on its motherboard, with memory, heatsinks and software
// panels, filling the whole hero behind the text. If the browser has no WebGL
// the flat drawing is shown instead.
export default function HeroScene3D() {
  const mount = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = mount.current;
    if (!el) return;
    let cancelled = false;
    let cleanup = () => {};
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    (async () => {
      try {
        const THREE = await import("three");
        const { RoundedBoxGeometry } =
          await import("three/addons/geometries/RoundedBoxGeometry.js");
        const { mergeGeometries } =
          await import("three/addons/utils/BufferGeometryUtils.js");
        if (cancelled) return;
        cleanup = build(
          THREE,
          RoundedBoxGeometry,
          mergeGeometries,
          el,
          still,
          icon.src,
        );
      } catch {
        if (!cancelled) setFailed(true);
      }
    })();
    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  if (failed) {
    return (
      <div className="absolute inset-0 flex items-center justify-end overflow-hidden opacity-90 lg:pr-10">
        <div className="w-full max-w-[44rem]">
          <HeroScene />
        </div>
      </div>
    );
  }
  return <div ref={mount} aria-hidden className="absolute inset-0" />;
}
