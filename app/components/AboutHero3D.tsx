"use client";

import { useEffect, useRef } from "react";
import type * as ThreeNS from "three";
import type { RoundedBoxGeometry as RoundedBoxClass } from "three/addons/geometries/RoundedBoxGeometry.js";
import type { mergeGeometries as MergeFn } from "three/addons/utils/BufferGeometryUtils.js";
import icon from "../icon.png";
import {
  brushedTexture,
  clamp01,
  glowTexture,
  makeCanvas,
  mergeStatic,
  roundRect,
  smooth,
  studioEnvironment,
  tex,
  type Three,
} from "./three-kit";

// A small floating platform with a mini city on it. The buildings rise one by
// one, their windows light up, and the Rizviz tower finishes last. Once built
// the city stays put, with light running round its edge.

// ---- The city ------------------------------------------------------------

const PLATFORM_W = 4.7;
const PLATFORM_D = 3.5;
const TOP = 0.32; // top surface of the platform
const CITY_X = 0; // the platform is centered on the middle of the scene

type Tier = { w: number; d: number; h: number };
type Building = {
  x: number;
  z: number;
  // Stacked from the ground up; one tier for most, several for the tower.
  tiers: Tier[];
  delay: number; // seconds after the build starts
  seconds: number;
  hq?: boolean;
};

const BUILDINGS: Building[] = [
  {
    x: -1.55,
    z: 0.75,
    tiers: [{ w: 0.75, d: 0.75, h: 0.95 }],
    delay: 0.0,
    seconds: 0.9,
  },
  {
    x: 1.45,
    z: 0.8,
    tiers: [{ w: 0.9, d: 0.65, h: 1.05 }],
    delay: 0.35,
    seconds: 0.9,
  },
  {
    x: -1.5,
    z: -0.55,
    tiers: [
      { w: 0.8, d: 0.8, h: 1.5 },
      { w: 0.5, d: 0.5, h: 0.35 },
    ],
    delay: 0.7,
    seconds: 1.0,
  },
  {
    x: 1.5,
    z: -0.6,
    tiers: [
      { w: 0.8, d: 0.8, h: 1.85 },
      { w: 0.5, d: 0.5, h: 0.4 },
    ],
    delay: 1.05,
    seconds: 1.1,
  },
  {
    x: -0.55,
    z: 1.05,
    tiers: [{ w: 0.7, d: 0.55, h: 0.65 }],
    delay: 1.4,
    seconds: 0.8,
  },
  {
    x: 0.7,
    z: 1.1,
    tiers: [{ w: 0.55, d: 0.55, h: 0.5 }],
    delay: 1.65,
    seconds: 0.8,
  },
  {
    x: -0.55,
    z: -1.05,
    tiers: [{ w: 0.6, d: 0.5, h: 1.15 }],
    delay: 1.95,
    seconds: 0.9,
  },
  {
    x: 0.75,
    z: -1.1,
    tiers: [{ w: 0.55, d: 0.5, h: 0.8 }],
    delay: 2.2,
    seconds: 0.9,
  },
  {
    x: 0.1,
    z: -0.1,
    tiers: [
      { w: 1.0, d: 1.0, h: 2.1 },
      { w: 0.72, d: 0.72, h: 0.6 },
      { w: 0.46, d: 0.46, h: 0.5 },
    ],
    delay: 2.8,
    seconds: 1.8,
    hq: true,
  },
];
const BUILD_END = Math.max(...BUILDINGS.map((b) => b.delay + b.seconds));

// The line of light that runs round the edge of the platform (x, z), closed.
const RING: [number, number][] = [
  [-2.0, -1.45],
  [2.0, -1.45],
  [2.0, 1.45],
  [-2.0, 1.45],
  [-2.0, -1.45],
];

// Timeline: a short pause, then the build; after that it simply stays.
const IDLE = 0.8;
const T_BUILD_END = IDLE + BUILD_END;

// Windows: silver frames with dark glass, some of them lit.
function windowTextures(THREE: Three, seed: number) {
  const S = 128;
  const color = makeCanvas(S, S);
  const lit = makeCanvas(S, S);
  color.ctx.fillStyle = "#7f9bb0";
  color.ctx.fillRect(0, 0, S, S);
  lit.ctx.fillStyle = "#000";
  lit.ctx.fillRect(0, 0, S, S);
  let s = seed;
  const rnd = () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
  const cols = 4;
  const rows = 4;
  const cw = S / cols;
  const rh = S / rows;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const x = i * cw + 4;
      const y = j * rh + 5;
      const on = rnd() > 0.38;
      color.ctx.fillStyle = on ? "#62b8ee" : "#08203a";
      roundRect(color.ctx, x, y, cw - 8, rh - 10, 2);
      color.ctx.fill();
      if (on) {
        lit.ctx.fillStyle = rnd() > 0.5 ? "#6cc4f2" : "#b5e5ff";
        roundRect(lit.ctx, x, y, cw - 8, rh - 10, 2);
        lit.ctx.fill();
      }
    }
  }
  const map = tex(THREE, color.c);
  const emissive = tex(THREE, lit.c);
  for (const t of [map, emissive]) {
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
  }
  return { map, emissive };
}

// The platform's top: dark blue glass with a fine grid and a light edge.
function platformTexture(THREE: Three) {
  const W = 1200;
  const H = Math.round((W * PLATFORM_D) / PLATFORM_W);
  const px = (x: number) => ((x + PLATFORM_W / 2) / PLATFORM_W) * W;
  const py = (z: number) => ((z + PLATFORM_D / 2) / PLATFORM_D) * H;
  const color = makeCanvas(W, H);
  const glow = makeCanvas(W, H);
  const g = color.ctx.createLinearGradient(0, 0, W, H);
  g.addColorStop(0, "#0d3150");
  g.addColorStop(1, "#08243d");
  color.ctx.fillStyle = g;
  color.ctx.fillRect(0, 0, W, H);
  glow.ctx.fillStyle = "#000";
  glow.ctx.fillRect(0, 0, W, H);
  color.ctx.strokeStyle = "rgba(120,190,235,0.16)";
  color.ctx.lineWidth = 1;
  for (let x = 0; x < W; x += 30) {
    color.ctx.beginPath();
    color.ctx.moveTo(x, 0);
    color.ctx.lineTo(x, H);
    color.ctx.stroke();
  }
  for (let y = 0; y < H; y += 30) {
    color.ctx.beginPath();
    color.ctx.moveTo(0, y);
    color.ctx.lineTo(W, y);
    color.ctx.stroke();
  }
  // A thin light line just inside the edge, and nothing else.
  const edge = (
    ctx: CanvasRenderingContext2D,
    stroke: string,
    width: number,
  ) => {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = width;
    ctx.lineJoin = "round";
    ctx.beginPath();
    RING.forEach(([x, z], i) =>
      i ? ctx.lineTo(px(x), py(z)) : ctx.moveTo(px(x), py(z)),
    );
    ctx.stroke();
  };
  edge(color.ctx, "#6fb2da", 4);
  edge(glow.ctx, "#2f9be0", 4);
  return { map: tex(THREE, color.c), emissive: tex(THREE, glow.c) };
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
  camera.position.set(0, 5.0, 13);
  camera.lookAt(0, 1.85, 0);

  scene.add(new THREE.HemisphereLight(0xffffff, 0x9cc3e0, 0.6));
  const key = new THREE.DirectionalLight(0xffffff, 2.4);
  key.position.set(4, 8, 5);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.left = -6;
  key.shadow.camera.right = 6;
  key.shadow.camera.top = 6;
  key.shadow.camera.bottom = -6;
  key.shadow.camera.far = 24;
  key.shadow.bias = -0.0003;
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x6fc1f5, 2.2);
  rim.position.set(-6, 3, -4);
  scene.add(rim);
  const towerLight = new THREE.PointLight(0x4db3f0, 0, 5, 2);
  towerLight.position.set(CITY_X, 2.2, 1.2);
  scene.add(towerLight);

  const world = new THREE.Group();
  scene.add(world);

  const brushed = brushedTexture(THREE);
  const M = {
    silver: new THREE.MeshStandardMaterial({
      color: 0xdfe6ec,
      roughness: 0.3,
      roughnessMap: brushed,
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
    led: new THREE.MeshBasicMaterial({ color: 0x7fd0ff, toneMapped: false }),
    leaf: new THREE.MeshStandardMaterial({
      color: 0x9fdcff,
      roughness: 0.35,
      metalness: 0.4,
      emissive: 0x2f9be0,
      emissiveIntensity: 0.5,
    }),
  };
  const rbox = (w: number, h: number, d: number, r: number) =>
    new RoundedBoxGeometry(w, h, d, 2, r);
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

  // Floor: a faint grid and a soft shadow, and a pool of light under the platform
  const grid = new THREE.GridHelper(60, 60, 0x70c7f4, 0x9fd3f2);
  (grid.material as ThreeNS.Material).transparent = true;
  (grid.material as ThreeNS.Material).opacity = 0.18;
  grid.position.y = -0.02;
  scene.add(grid);
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(30, 20),
    new THREE.ShadowMaterial({ opacity: 0.1 }),
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.01;
  ground.receiveShadow = true;
  scene.add(ground);
  const pool = new THREE.Mesh(
    new THREE.PlaneGeometry(8, 6.4),
    new THREE.MeshBasicMaterial({
      map: glowTexture(THREE, "112,199,244", 0.5),
      transparent: true,
      depthWrite: false,
      toneMapped: false,
    }),
  );
  pool.rotation.x = -Math.PI / 2;
  pool.position.set(CITY_X, 0.0, 0);
  scene.add(pool);

  // The platform: a floating slab with a lit underside
  const city = new THREE.Group();
  city.position.x = CITY_X;
  world.add(city);
  add(rbox(PLATFORM_W, 0.3, PLATFORM_D, 0.12), M.silver, 0, 0.17, 0, city);
  add(
    rbox(PLATFORM_W - 0.7, 0.14, PLATFORM_D - 0.6, 0.06),
    M.graphite,
    0,
    -0.02,
    0,
    city,
  );
  add(
    new THREE.BoxGeometry(PLATFORM_W - 0.9, 0.025, PLATFORM_D - 0.8),
    M.led,
    0,
    -0.1,
    0,
    city,
  );
  const top = platformTexture(THREE);
  const topMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(PLATFORM_W - 0.2, PLATFORM_D - 0.2),
    new THREE.MeshStandardMaterial({
      map: top.map,
      emissiveMap: top.emissive,
      emissive: 0xffffff,
      emissiveIntensity: 1.3,
      roughness: 0.4,
      metalness: 0.15,
    }),
  );
  topMesh.rotation.x = -Math.PI / 2;
  topMesh.position.y = TOP + 0.002;
  topMesh.receiveShadow = true;
  city.add(topMesh);
  // Trees and lamps along the road
  for (const [x, z] of [
    [-1.8, -1.25],
    [-1.0, -1.28],
    [1.55, -1.3],
    [1.85, 1.28],
    [0.2, 1.3],
    [-1.8, 1.25],
    [-1.85, 0.1],
    [1.88, 0.15],
  ]) {
    add(
      new THREE.CylinderGeometry(0.02, 0.025, 0.14, 8),
      M.silver,
      x,
      TOP + 0.07,
      z,
      city,
    );
    add(new THREE.SphereGeometry(0.1, 12, 9), M.leaf, x, TOP + 0.2, z, city);
  }
  mergeStatic(THREE, mergeGeometries, world);

  // The buildings: each grows up from its base and its windows light up
  const logoTex = new THREE.TextureLoader().load(iconUrl, (t) => {
    t.colorSpace = THREE.SRGBColorSpace;
  });
  const windowMats: ThreeNS.MeshStandardMaterial[] = [];
  const growers: {
    b: Building;
    group: ThreeNS.Group;
    mat: ThreeNS.MeshStandardMaterial;
  }[] = [];
  let hq: ThreeNS.Group | null = null;
  let hqTopY = 0;
  BUILDINGS.forEach((b, i) => {
    const group = new THREE.Group();
    group.position.set(CITY_X + b.x, TOP, b.z);
    const wt = windowTextures(THREE, 11 + i * 7);
    const mat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: wt.map,
      emissiveMap: wt.emissive,
      emissive: 0xffffff,
      emissiveIntensity: 0,
      roughness: 0.28,
      metalness: 0.55,
    });
    windowMats.push(mat);
    let y = 0;
    b.tiers.forEach((t, k) => {
      const m = mat.clone();
      m.map = wt.map.clone();
      m.emissiveMap = wt.emissive.clone();
      m.map.repeat.set(
        Math.max(1, Math.round(t.w * 3)),
        Math.max(1, Math.round(t.h * 3.4)),
      );
      m.emissiveMap.repeat.copy(m.map.repeat);
      m.map.needsUpdate = true;
      m.emissiveMap.needsUpdate = true;
      windowMats.push(m);
      const body = new THREE.Mesh(new THREE.BoxGeometry(t.w, t.h, t.d), m);
      body.position.y = y + t.h / 2;
      body.castShadow = true;
      body.receiveShadow = true;
      group.add(body);
      const roof = new THREE.Mesh(
        rbox(t.w + 0.06, 0.04, t.d + 0.06, 0.012),
        M.silver,
      );
      roof.position.y = y + t.h + 0.02;
      roof.castShadow = true;
      group.add(roof);
      const edge = new THREE.Mesh(
        new THREE.BoxGeometry(t.w + 0.07, 0.012, 0.012),
        M.led,
      );
      edge.position.set(0, y + t.h + 0.045, t.d / 2 + 0.03);
      group.add(edge);
      y += t.h + 0.04;
      if (k === b.tiers.length - 1 && b.hq) {
        const mast = new THREE.Mesh(
          new THREE.CylinderGeometry(0.012, 0.02, 0.7, 10),
          M.silver,
        );
        mast.position.y = y + 0.35;
        group.add(mast);
        const tip = new THREE.Mesh(
          new THREE.SphereGeometry(0.04, 12, 9),
          M.led,
        );
        tip.position.y = y + 0.72;
        group.add(tip);
        hqTopY = y + 0.72;
      }
    });
    if (b.hq) {
      // The Rizviz mark on the front of the tower
      const logo = new THREE.Mesh(
        new THREE.PlaneGeometry(0.46, 0.46),
        new THREE.MeshBasicMaterial({
          map: logoTex,
          transparent: true,
          toneMapped: false,
        }),
      );
      logo.position.set(0, b.tiers[0].h * 0.62, b.tiers[0].d / 2 + 0.01);
      group.add(logo);
      hq = group;
    }
    world.add(group);
    growers.push({ b, group, mat });
  });
  void hq;
  const glowTex = glowTexture(THREE, "112,199,244");
  const beacon = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: glowTex,
      transparent: true,
      depthWrite: false,
      toneMapped: false,
    }),
  );
  beacon.scale.setScalar(0.5);
  beacon.position.set(CITY_X + 0.1, TOP + hqTopY, -0.1);
  world.add(beacon);

  // Light travelling round the road
  const ringPts = RING.map(
    ([x, z]) => new THREE.Vector3(CITY_X + x, TOP + 0.03, z),
  );
  const ringLens: number[] = [0];
  for (let i = 1; i < ringPts.length; i++)
    ringLens.push(ringLens[i - 1] + ringPts[i].distanceTo(ringPts[i - 1]));
  const ringTotal = ringLens[ringLens.length - 1];
  const runners = Array.from({ length: 5 }, (_, i) => {
    const sprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowTex,
        transparent: true,
        depthWrite: false,
        toneMapped: false,
      }),
    );
    sprite.scale.setScalar(0.3);
    world.add(sprite);
    return { sprite, offset: i / 5 };
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
  ripple.position.set(CITY_X + 0.1, TOP + 0.012, -0.1);
  world.add(ripple);

  // Light specks across the space
  let seed = 5;
  const rng = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
  const DUST = 70;
  const dustGeo = new THREE.BufferGeometry();
  const dustPos = new Float32Array(DUST * 3);
  const dustSeed = Array.from({ length: DUST }, () => ({
    x: (rng() - 0.5) * 22,
    y: rng() * 6,
    z: (rng() - 0.5) * 9 - 1,
    speed: 0.02 + rng() * 0.05,
    phase: rng(),
  }));
  dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
  scene.add(
    new THREE.Points(
      dustGeo,
      new THREE.PointsMaterial({
        map: glowTexture(THREE, "112,199,244"),
        size: 0.2,
        transparent: true,
        depthWrite: false,
        opacity: 0.8,
        toneMapped: false,
      }),
    ),
  );

  const mouse = { x: 0, y: 0, sx: 0, sy: 0 };
  const onMove = (e: PointerEvent) => {
    mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
  };
  window.addEventListener("pointermove", onMove, { passive: true });

  let frameNo = 0;

  let start = -1;
  const update = (now: number) => {
    if (start < 0) start = now;
    const time = now;
    const building = now - start - IDLE;

    // Buildings grow in turn, and then stay
    for (const g of growers) {
      const grow = smooth(clamp01((building - g.b.delay) / g.b.seconds));
      const sc = Math.max(0.0001, grow);
      g.group.scale.y = sc;
      g.group.visible = sc > 0.002;
    }
    // Windows light up as the last building finishes, and stay a little alive
    const lights = smooth(clamp01((building - (BUILD_END - 0.7)) / 1.1));
    windowMats.forEach((m, i) => {
      m.emissiveIntensity =
        lights * (1.0 + 0.18 * Math.sin(time * 1.3 + i * 1.7));
    });
    towerLight.intensity = lights * 5;
    (beacon.material as ThreeNS.SpriteMaterial).opacity =
      lights * (0.6 + 0.4 * Math.sin(time * 3));
    beacon.position.y =
      TOP +
      hqTopY * Math.max(0.0001, growers[growers.length - 1].group.scale.y);

    // Light running round the edge, and a ripple from the tower's foot
    runners.forEach((r) => {
      const ph = (time * 0.12 + r.offset) % 1;
      const d = ph * ringTotal;
      let i = 1;
      while (i < ringLens.length - 1 && d > ringLens[i]) i++;
      const t = (d - ringLens[i - 1]) / (ringLens[i] - ringLens[i - 1]);
      r.sprite.position.lerpVectors(ringPts[i - 1], ringPts[i], t);
      (r.sprite.material as ThreeNS.SpriteMaterial).opacity = lights;
    });
    const ripT = lights > 0.98 ? ((time - 1.5) % 4) / 2.6 : 2;
    ripple.scale.setScalar(0.5 + clamp01(ripT) * 3.2);
    (ripple.material as ThreeNS.MeshBasicMaterial).opacity =
      ripT >= 0 && ripT < 1 ? (1 - ripT) * 0.55 : 0;

    // Slow turn, with the mouse leaning it a little
    mouse.sx += (mouse.x - mouse.sx) * 0.04;
    mouse.sy += (mouse.y - mouse.sy) * 0.04;
    world.rotation.y = Math.sin(time * 0.2) * 0.35 + mouse.sx * 0.2;
    world.rotation.x = mouse.sy * 0.035;

    for (let i = 0; i < DUST; i++) {
      const s = dustSeed[i];
      const ph = (time * s.speed + s.phase) % 1;
      dustPos[i * 3] = s.x + Math.sin(time * 0.2 + i) * 0.3;
      dustPos[i * 3 + 1] = (s.y + ph * 6) % 6;
      dustPos[i * 3 + 2] = s.z;
    }
    dustGeo.attributes.position.needsUpdate = true;
    frameNo++;
  };

  // The canvas fills the whole hero; the picture is shifted right so the city
  // and screens sit on the right, clear of the text.
  const resize = () => {
    const w = Math.max(el.clientWidth, 1);
    const h = Math.max(el.clientHeight, 1);
    renderer.setSize(w, h, false);
    const aspect = w / h;
    camera.aspect = aspect;
    const wide = aspect >= 1.1;
    camera.fov = wide ? 30 : 44;
    camera.position.z = wide ? 12.6 : 17;
    camera.setViewOffset(
      w,
      h,
      wide ? -w * 0.25 : 0,
      wide ? h * 0.08 : h * 0.2,
      w,
      h,
    );
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(() => {
    resize();
    if (still) {
      start = 0;
      update(T_BUILD_END + 6);
      renderer.shadowMap.needsUpdate = true;
      renderer.render(scene, camera);
    }
  });
  ro.observe(el);
  resize();

  let frame = 0;
  let visible = true;
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
    if (frameNo % 4 === 0) renderer.shadowMap.needsUpdate = true;
    renderer.render(scene, camera);
  };
  const io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
  });
  io.observe(el);
  renderer.shadowMap.needsUpdate = true;
  if (still) {
    start = 0;
    update(T_BUILD_END + 6);
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
        const std = x as ThreeNS.MeshStandardMaterial;
        std.map?.dispose?.();
        std.emissiveMap?.dispose?.();
        x.dispose();
      });
    });
    envTexture.dispose();
    pmrem.dispose();
    renderer.dispose();
    canvas.remove();
  };
}

// The About page hero scene. It fills its parent; if the browser has no
// WebGL the page simply shows the text on its plain background.
export default function AboutHero3D() {
  const mount = useRef<HTMLDivElement>(null);

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
        // No WebGL: leave the plain background.
      }
    })();
    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return <div ref={mount} aria-hidden className="absolute inset-0" />;
}
