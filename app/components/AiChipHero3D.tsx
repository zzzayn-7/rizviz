"use client";

import { useEffect, useRef } from "react";
import type * as ThreeNS from "three";
import type { RoundedBoxGeometry as RoundedBoxClass } from "three/addons/geometries/RoundedBoxGeometry.js";
import type { mergeGeometries as MergeFn } from "three/addons/utils/BufferGeometryUtils.js";
import {
  brushedTexture,
  clamp01,
  glowTexture,
  makeCanvas,
  mergeStatic,
  smooth,
  studioEnvironment,
  tex,
  type Three,
} from "./three-kit";

// The service pages' hero: a slim silver plate with a pane of glass floating
// over it. Inside the glass a small network lights up, and a glowing mark (AI,
// the DevOps loop, a database...) sits across the top. Nothing else: no board,
// no wiring, just the object over soft light.

const SLAB_REST = 1.15; // height the glass floats at
const SLAB_START = 3.2; // and where it starts, before it settles

const IDLE = 0.4;
const T_END = IDLE + 3.2;

// The glowing mark across the top of the glass: "AI", or the DevOps infinity
// loop.
function markTexture(
  THREE: Three,
  mark:
    "ai" | "devops" | "data" | "servicenow" | "software" | "website" | "mobile",
) {
  const S = 1024;
  const { c, ctx } = makeCanvas(S, S);
  const shapes: Record<string, () => void> = {
    // </> : two chevrons and a slash
    software: () => {
      ctx.beginPath();
      ctx.moveTo(330, 330);
      ctx.lineTo(160, 512);
      ctx.lineTo(330, 694);
      ctx.moveTo(694, 330);
      ctx.lineTo(864, 512);
      ctx.lineTo(694, 694);
      ctx.moveTo(580, 290);
      ctx.lineTo(444, 734);
    },
    // a browser window with a globe in it
    website: () => {
      ctx.beginPath();
      ctx.roundRect(170, 250, 684, 520, 56);
      ctx.moveTo(170, 360);
      ctx.lineTo(854, 360);
      ctx.moveTo(612, 565);
      ctx.arc(512, 565, 100, 0, Math.PI * 2);
      ctx.moveTo(412, 565);
      ctx.lineTo(612, 565);
      ctx.moveTo(512, 465);
      ctx.bezierCurveTo(450, 520, 450, 610, 512, 665);
      ctx.moveTo(512, 465);
      ctx.bezierCurveTo(574, 520, 574, 610, 512, 665);
    },
    // a phone, with its speaker and home bar
    mobile: () => {
      ctx.beginPath();
      ctx.roundRect(332, 190, 360, 660, 70);
      ctx.moveTo(452, 252);
      ctx.lineTo(572, 252);
      ctx.moveTo(452, 790);
      ctx.lineTo(572, 790);
      ctx.moveTo(450, 470);
      ctx.lineTo(450, 620);
      ctx.lineTo(580, 545);
      ctx.closePath();
    },
  };
  if (shapes[mark]) {
    ctx.lineJoin = ctx.lineCap = "round";
    for (const [blur, a, w] of [
      [110, 0.55, 74],
      [60, 0.8, 64],
      [28, 0.95, 56],
    ] as const) {
      ctx.shadowColor = `rgba(47,155,224,${a})`;
      ctx.shadowBlur = blur;
      ctx.strokeStyle = "rgba(76,180,255,0.9)";
      ctx.lineWidth = w;
      shapes[mark]();
      ctx.stroke();
    }
    ctx.shadowBlur = 0;
    const g = ctx.createLinearGradient(0, S * 0.2, 0, S * 0.8);
    g.addColorStop(0, "#69c4ff");
    g.addColorStop(1, "#1a78e0");
    ctx.strokeStyle = g;
    ctx.lineWidth = 50;
    shapes[mark]();
    ctx.stroke();
    ctx.strokeStyle = "rgba(255,255,255,0.85)";
    ctx.lineWidth = 5;
    shapes[mark]();
    ctx.stroke();
    return tex(THREE, c);
  }
  if (mark === "servicenow") {
    // A ring that is open on one side, with a dot at its heart.
    const cx = S / 2;
    const cy = S / 2 + 20;
    const ring = () => {
      ctx.beginPath();
      ctx.arc(cx, cy, 300, -Math.PI * 0.18, Math.PI * 1.62);
    };
    ctx.lineJoin = ctx.lineCap = "round";
    for (const [blur, a, w] of [
      [110, 0.55, 100],
      [60, 0.8, 90],
      [28, 0.95, 82],
    ] as const) {
      ctx.shadowColor = `rgba(47,155,224,${a})`;
      ctx.shadowBlur = blur;
      ctx.strokeStyle = "rgba(76,180,255,0.9)";
      ctx.lineWidth = w;
      ring();
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, cy, 100, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(76,180,255,0.9)";
      ctx.fill();
    }
    ctx.shadowBlur = 0;
    const g = ctx.createLinearGradient(0, S * 0.2, 0, S * 0.8);
    g.addColorStop(0, "#69c4ff");
    g.addColorStop(1, "#1a78e0");
    ctx.strokeStyle = g;
    ctx.lineWidth = 74;
    ring();
    ctx.stroke();
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(cx, cy, 100, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.85)";
    ctx.lineWidth = 6;
    ctx.stroke();
    ctx.lineWidth = 5;
    ring();
    ctx.stroke();
    return tex(THREE, c);
  }
  if (mark === "data") {
    // A database: a stack of three discs, glowing.
    const disc = (cy: number) => {
      ctx.beginPath();
      ctx.ellipse(S / 2, cy, 300, 90, 0, 0, Math.PI * 2);
    };
    const body = () => {
      ctx.beginPath();
      ctx.moveTo(S / 2 - 300, 360);
      ctx.lineTo(S / 2 - 300, 700);
      ctx.ellipse(S / 2, 700, 300, 90, 0, Math.PI, 0, true);
      ctx.lineTo(S / 2 + 300, 360);
    };
    ctx.lineJoin = ctx.lineCap = "round";
    for (const [blur, a, w] of [
      [110, 0.55, 64],
      [60, 0.8, 54],
      [28, 0.95, 46],
    ] as const) {
      ctx.shadowColor = `rgba(47,155,224,${a})`;
      ctx.shadowBlur = blur;
      ctx.strokeStyle = "rgba(76,180,255,0.9)";
      ctx.lineWidth = w;
      body();
      ctx.stroke();
      for (const cy of [360, 530]) {
        disc(cy);
        ctx.stroke();
      }
    }
    ctx.shadowBlur = 0;
    const g = ctx.createLinearGradient(0, S * 0.3, 0, S * 0.75);
    g.addColorStop(0, "#69c4ff");
    g.addColorStop(1, "#1a78e0");
    for (const [w, st] of [
      [46, g],
      [5, "rgba(255,255,255,0.85)"],
    ] as const) {
      ctx.strokeStyle = st;
      ctx.lineWidth = w;
      body();
      ctx.stroke();
      for (const cy of [360, 530]) {
        disc(cy);
        ctx.stroke();
      }
    }
    return tex(THREE, c);
  }
  if (mark === "devops") {
    const loop = () => {
      ctx.beginPath();
      for (let i = 0; i <= 160; i++) {
        const t = (i / 160) * Math.PI * 2;
        const d = 1 + Math.sin(t) ** 2;
        const x = S / 2 + (Math.cos(t) / d) * 400;
        const y = S / 2 + 20 + ((Math.sin(t) * Math.cos(t)) / d) * 400;
        if (i) ctx.lineTo(x, y);
        else ctx.moveTo(x, y);
      }
      ctx.closePath();
    };
    ctx.lineJoin = ctx.lineCap = "round";
    for (const [blur, a, w] of [
      [110, 0.55, 80],
      [60, 0.8, 70],
      [28, 0.95, 62],
    ] as const) {
      ctx.shadowColor = `rgba(47,155,224,${a})`;
      ctx.shadowBlur = blur;
      ctx.strokeStyle = "rgba(76,180,255,0.9)";
      ctx.lineWidth = w;
      loop();
      ctx.stroke();
    }
    ctx.shadowBlur = 0;
    const g = ctx.createLinearGradient(S * 0.1, 0, S * 0.9, 0);
    g.addColorStop(0, "#69c4ff");
    g.addColorStop(1, "#1a78e0");
    ctx.strokeStyle = g;
    ctx.lineWidth = 60;
    loop();
    ctx.stroke();
    ctx.strokeStyle = "rgba(255,255,255,0.85)";
    ctx.lineWidth = 6;
    ctx.lineJoin = "round";
    loop();
    ctx.stroke();
    // an arrowhead showing the loop turning
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.moveTo(S / 2 + 400 - 8, S / 2 + 20 - 80);
    ctx.lineTo(S / 2 + 400 + 62, S / 2 + 20 + 10);
    ctx.lineTo(S / 2 + 400 - 70, S / 2 + 20 + 10);
    ctx.closePath();
    ctx.fill();
    return tex(THREE, c);
  }
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = '900 540px "Arial Black", ui-sans-serif, system-ui, sans-serif';
  const y = S / 2 + 24;
  for (const [blur, a] of [
    [120, 0.55],
    [70, 0.8],
    [34, 0.95],
  ] as const) {
    ctx.shadowColor = `rgba(47,155,224,${a})`;
    ctx.shadowBlur = blur;
    ctx.fillStyle = "rgba(76,180,255,0.9)";
    ctx.fillText("AI", S / 2, y);
  }
  ctx.shadowBlur = 0;
  const g = ctx.createLinearGradient(0, S * 0.25, 0, S * 0.75);
  g.addColorStop(0, "#69c4ff");
  g.addColorStop(1, "#1a78e0");
  ctx.fillStyle = g;
  ctx.fillText("AI", S / 2, y);
  ctx.strokeStyle = "rgba(255,255,255,0.85)";
  ctx.lineWidth = 5;
  ctx.strokeText("AI", S / 2, y);
  return tex(THREE, c);
}

function build(
  THREE: Three,
  RoundedBoxGeometry: typeof RoundedBoxClass,
  mergeGeometries: typeof MergeFn,
  el: HTMLElement,
  still: boolean,
  mark:
    "ai" | "devops" | "data" | "servicenow" | "software" | "website" | "mobile",
) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  let pixelRatio = Math.min(window.devicePixelRatio, 1.5);
  renderer.setPixelRatio(pixelRatio);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.shadowMap.autoUpdate = false;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  const canvas = renderer.domElement;
  canvas.style.cssText = "display:block;width:100%;height:100%";
  el.appendChild(canvas);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTexture = pmrem.fromScene(studioEnvironment(THREE), 0.02).texture;
  scene.environment = envTexture;
  scene.environmentIntensity = 1.1;

  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 90);
  camera.position.set(0, 6.4, 10.6);
  camera.lookAt(0, 0.8, 0);

  scene.add(new THREE.HemisphereLight(0xffffff, 0xa9c8e2, 0.7));
  const key = new THREE.DirectionalLight(0xffffff, 2.4);
  key.position.set(5, 9, 4);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.left = -7;
  key.shadow.camera.right = 7;
  key.shadow.camera.top = 7;
  key.shadow.camera.bottom = -7;
  key.shadow.camera.far = 26;
  key.shadow.bias = -0.0003;
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x6fc1f5, 2.0);
  rim.position.set(-6, 3, -4);
  scene.add(rim);
  const chipLight = new THREE.PointLight(0x4db3f0, 0, 6, 2);
  chipLight.position.set(0, 1.1, 0);
  scene.add(chipLight);

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
  };
  const rbox = (w: number, h: number, d: number, r: number) =>
    new RoundedBoxGeometry(w, h, d, 3, r);
  const add = (
    geo: ThreeNS.BufferGeometry,
    m: ThreeNS.Material,
    x: number,
    y: number,
    z: number,
  ) => {
    const mesh = new THREE.Mesh(geo, m);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.userData.merge = true;
    world.add(mesh);
    return mesh;
  };

  // The plate: slim silver with a pale glass top and one fine line of light
  add(rbox(3.9, 0.12, 3.9, 0.12), M.silver, 0, 0.06, 0);
  add(rbox(3.5, 0.06, 3.5, 0.1), M.polish, 0, 0.15, 0);
  add(new THREE.BoxGeometry(3.3, 0.02, 0.03), M.led, 0, 0.2, 1.65);
  add(new THREE.BoxGeometry(3.3, 0.02, 0.03), M.led, 0, 0.2, -1.65);
  add(new THREE.BoxGeometry(0.03, 0.02, 3.3), M.led, 1.65, 0.2, 0);
  add(new THREE.BoxGeometry(0.03, 0.02, 3.3), M.led, -1.65, 0.2, 0);
  mergeStatic(THREE, mergeGeometries, world);

  // The glass, and what is inside it
  const glowTex = glowTexture(THREE, "112,199,244");
  const slab = new THREE.Group();
  slab.position.y = SLAB_START;
  world.add(slab);
  const slabGeo = rbox(2.8, 0.3, 2.8, 0.16);
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xc4e2f8,
    transparent: true,
    opacity: 0.45,
    roughness: 0.05,
    metalness: 0,
    clearcoat: 1,
    clearcoatRoughness: 0.05,
    envMapIntensity: 2.6,
    depthWrite: false,
  });
  const glass = new THREE.Mesh(slabGeo, glassMat);
  glass.castShadow = false;
  glass.renderOrder = 2;
  slab.add(glass);
  const rimLines = new THREE.LineSegments(
    new THREE.EdgesGeometry(slabGeo, 26),
    new THREE.LineBasicMaterial({
      color: 0xbfe6ff,
      transparent: true,
      opacity: 0.9,
      toneMapped: false,
    }),
  );
  rimLines.renderOrder = 3;
  slab.add(rimLines);
  // A bright edge along the top and bottom of the glass
  const edgeMat = new THREE.MeshBasicMaterial({
    color: 0xd6efff,
    transparent: true,
    opacity: 0.9,
    toneMapped: false,
  });
  for (const y of [-0.15, 0.15]) {
    for (const [w, d, x, z] of [
      [2.46, 0.035, 0, 1.4],
      [2.46, 0.035, 0, -1.4],
      [0.035, 2.46, 1.4, 0],
      [0.035, 2.46, -1.4, 0],
    ]) {
      const e = new THREE.Mesh(new THREE.BoxGeometry(w, 0.035, d), edgeMat);
      e.position.set(x, y, z);
      e.renderOrder = 3;
      slab.add(e);
    }
  }

  // The network: nodes around the glass, joined to their neighbours
  const NODES = 11;
  const nodePos: ThreeNS.Vector3[] = [];
  for (let i = 0; i < NODES; i++) {
    const a = (i / NODES) * Math.PI * 2 + 0.3;
    const r = 1.0 + (i % 3) * 0.12;
    nodePos.push(new THREE.Vector3(Math.cos(a) * r, 0, Math.sin(a) * r));
  }
  const links: [number, number][] = [];
  for (let i = 0; i < NODES; i++) {
    links.push([i, (i + 1) % NODES]);
    if (i % 2 === 0) links.push([i, (i + 3) % NODES]);
  }
  const linePos = new Float32Array(links.length * 6);
  links.forEach(([a, b], i) => {
    nodePos[a].toArray(linePos, i * 6);
    nodePos[b].toArray(linePos, i * 6 + 3);
  });
  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute("position", new THREE.BufferAttribute(linePos, 3));
  const lineMat = new THREE.LineBasicMaterial({
    color: 0x2f9be0,
    transparent: true,
    opacity: 0,
    toneMapped: false,
  });
  const netLines = new THREE.LineSegments(lineGeo, lineMat);
  netLines.renderOrder = 1;
  slab.add(netLines);
  const nodes = nodePos.map((p, i) => {
    const size = i % 3 === 0 ? 0.21 : 0.14;
    const node = new THREE.Mesh(
      new THREE.SphereGeometry(size, 20, 16),
      new THREE.MeshStandardMaterial({
        color: 0xcfeaff,
        emissive: 0x3aa4f0,
        emissiveIntensity: 0.9,
        roughness: 0.15,
        metalness: 0,
      }),
    );
    node.position.copy(p);
    node.scale.setScalar(0.0001);
    slab.add(node);
    const halo = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowTex,
        transparent: true,
        depthWrite: false,
        toneMapped: false,
        opacity: 0,
      }),
    );
    halo.scale.setScalar(size * 5);
    halo.position.copy(p);
    slab.add(halo);
    return { node, halo, size };
  });
  // Small lights travelling along the network
  const sparks = Array.from({ length: 6 }, (_, i) => {
    const s = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowTex,
        transparent: true,
        depthWrite: false,
        toneMapped: false,
        opacity: 0,
      }),
    );
    s.scale.setScalar(0.22);
    slab.add(s);
    return { s, link: (i * 3) % links.length, offset: i / 6 };
  });
  // "AI", glowing, on top
  const aiMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(2.5, 2.5),
    new THREE.MeshBasicMaterial({
      map: markTexture(THREE, mark),
      transparent: true,
      depthWrite: false,
      toneMapped: false,
      opacity: 0,
    }),
  );
  aiMesh.rotation.x = -Math.PI / 2;
  aiMesh.position.y = 0.16;
  aiMesh.renderOrder = 4;
  slab.add(aiMesh);

  // Light pooled on the chip beneath the glass
  const pool = new THREE.Mesh(
    new THREE.PlaneGeometry(6, 6),
    new THREE.MeshBasicMaterial({
      map: glowTexture(THREE, "70,170,240", 0.7),
      transparent: true,
      depthWrite: false,
      toneMapped: false,
      opacity: 0,
    }),
  );
  pool.rotation.x = -Math.PI / 2;
  pool.position.y = 0.22;
  world.add(pool);

  // Light specks
  let seed = 5;
  const rng = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
  const DUST = 60;
  const dustGeo = new THREE.BufferGeometry();
  const dustPos = new Float32Array(DUST * 3);
  const dustSeed = Array.from({ length: DUST }, () => ({
    x: (rng() - 0.5) * 18,
    y: rng() * 6,
    z: (rng() - 0.5) * 8 - 1,
    speed: 0.02 + rng() * 0.05,
    phase: rng(),
  }));
  dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
  scene.add(
    new THREE.Points(
      dustGeo,
      new THREE.PointsMaterial({
        map: glowTexture(THREE, "112,199,244"),
        size: 0.18,
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
    const t = now - start - IDLE;

    // The glass settles onto the chip
    const drop = smooth(clamp01(t / 1.8));
    slab.position.y =
      SLAB_START +
      (SLAB_REST - SLAB_START) * drop +
      Math.sin(time * 1.1) * 0.05 * drop;
    slab.rotation.y = (1 - drop) * 0.9;

    // The network and the lettering light up
    nodes.forEach((n, i) => {
      const k = smooth(clamp01((t - 1.0 - i * 0.09) / 0.5));
      n.node.scale.setScalar(Math.max(0.0001, k));
      (n.halo.material as ThreeNS.SpriteMaterial).opacity =
        k * (0.55 + 0.3 * Math.sin(time * 2 + i));
    });
    const net = smooth(clamp01((t - 1.4) / 1.0));
    lineMat.opacity = net * 0.85;
    sparks.forEach((sp) => {
      const ph = (time * 0.35 + sp.offset) % 1;
      const [a, b] = links[sp.link];
      sp.s.position.lerpVectors(nodePos[a], nodePos[b], ph);
      (sp.s.material as ThreeNS.SpriteMaterial).opacity =
        net * Math.sin(ph * Math.PI);
    });
    const ai = smooth(clamp01((t - 1.6) / 1.0));
    (aiMesh.material as ThreeNS.MeshBasicMaterial).opacity =
      ai * (0.92 + 0.08 * Math.sin(time * 2.2));
    (pool.material as ThreeNS.MeshBasicMaterial).opacity =
      ai * (0.7 + 0.3 * Math.sin(time * 1.6));
    chipLight.intensity = ai * 6;

    // A slow turn, with the mouse leaning it a little
    mouse.sx += (mouse.x - mouse.sx) * 0.04;
    mouse.sy += (mouse.y - mouse.sy) * 0.04;
    world.rotation.y =
      Math.PI / 4 + Math.sin(time * 0.2) * 0.3 + mouse.sx * 0.2;
    world.rotation.x = mouse.sy * 0.03;
    // keep the lettering reading upright to the viewer
    aiMesh.rotation.z = -world.rotation.y;

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

  // The canvas fills the hero; the picture is shifted right so the chip sits
  // on the right, clear of the text.
  const resize = () => {
    const w = Math.max(el.clientWidth, 1);
    const h = Math.max(el.clientHeight, 1);
    renderer.setSize(w, h, false);
    const aspect = w / h;
    camera.aspect = aspect;
    const wide = aspect >= 1.1;
    camera.fov = wide ? 30 : 44;
    camera.position.set(0, wide ? 6.4 : 8, wide ? 10.6 : 13.5);
    camera.lookAt(0, 0.8, 0);
    camera.setViewOffset(
      w,
      h,
      wide ? -w * 0.24 : 0,
      wide ? h * 0.02 : h * 0.18,
      w,
      h,
    );
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(() => {
    resize();
    if (still) {
      start = 0;
      update(T_END + 6);
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
    update(T_END + 6);
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
        std.alphaMap?.dispose?.();
        x.dispose();
      });
    });
    envTexture.dispose();
    pmrem.dispose();
    renderer.dispose();
    canvas.remove();
  };
}

// The AI / ML hero scene. It fills its parent; if the browser has no WebGL the
// page simply shows the text on its plain background.
export default function AiChipHero3D({
  mark = "ai",
}: {
  mark?:
    "ai" | "devops" | "data" | "servicenow" | "software" | "website" | "mobile";
}) {
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
          mark,
        );
      } catch {
        // No WebGL: leave the plain background.
      }
    })();
    return () => {
      cancelled = true;
      cleanup();
    };
  }, [mark]);

  return <div ref={mount} aria-hidden className="absolute inset-0" />;
}
