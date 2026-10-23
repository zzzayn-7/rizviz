"use client";

import { useEffect, useRef } from "react";
import type * as ThreeNS from "three";
import type { RoundedBoxGeometry as RoundedBoxClass } from "three/addons/geometries/RoundedBoxGeometry.js";
import {
  brushedTexture,
  clamp01,
  glowTexture,
  makeCanvas,
  roundRect,
  smooth,
  studioEnvironment,
  tex,
  type Three,
} from "./three-kit";

// The Careers hero: a person's growth, drawn as a chart. Five glass columns
// climb from left to right on a floating platform, a glowing line runs over
// their tops, and a light runs up it, lighting each step as it goes
// and finishing at the top.

const STEPS = ["Join", "Learn", "Build", "Lead", "Inspire"];
const HEIGHTS = [0.8, 1.35, 1.95, 2.65, 3.4];
const SPACING = 1.3;
const X0 = -2.6;
const COL_W = 0.95;
const COL_D = 1.5;
const TOP = 0.32; // top of the platform

const stepX = (i: number) => X0 + i * SPACING;

function labelTexture(THREE: Three, text: string) {
  const { c, ctx } = makeCanvas(256, 96);
  ctx.fillStyle = "rgba(255,255,255,0.92)";
  roundRect(ctx, 6, 10, 244, 76, 38);
  ctx.fill();
  ctx.strokeStyle = "rgba(63,180,242,0.9)";
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.fillStyle = "#0b3a66";
  ctx.font = '700 40px ui-sans-serif, "Segoe UI", system-ui, sans-serif';
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, 128, 50);
  return tex(THREE, c);
}

function build(
  THREE: Three,
  RoundedBoxGeometry: typeof RoundedBoxClass,
  el: HTMLElement,
  still: boolean,
) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  let pixelRatio = Math.min(window.devicePixelRatio, 1.5);
  renderer.setPixelRatio(pixelRatio);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  const canvas = renderer.domElement;
  canvas.style.cssText = "display:block;width:100%;height:100%";
  el.appendChild(canvas);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTexture = pmrem.fromScene(studioEnvironment(THREE), 0.02).texture;
  scene.environment = envTexture;
  scene.environmentIntensity = 1.2;

  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 80);
  scene.add(new THREE.HemisphereLight(0xffffff, 0xa9c8e2, 0.8));
  const key = new THREE.DirectionalLight(0xffffff, 2.3);
  key.position.set(4, 8, 6);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x6fc1f5, 2.1);
  rim.position.set(-6, 3, -4);
  scene.add(rim);

  const world = new THREE.Group();
  scene.add(world);

  const brushed = brushedTexture(THREE);
  const silver = new THREE.MeshStandardMaterial({
    color: 0xdfe6ec,
    roughness: 0.3,
    roughnessMap: brushed,
    metalness: 1,
  });
  const graphite = new THREE.MeshStandardMaterial({
    color: 0x1b2631,
    roughness: 0.4,
    metalness: 0.75,
  });
  const led = new THREE.MeshBasicMaterial({
    color: 0x7fd0ff,
    toneMapped: false,
  });
  const rbox = (w: number, h: number, d: number, r: number) =>
    new RoundedBoxGeometry(w, h, d, 3, r);
  const add = (
    geo: ThreeNS.BufferGeometry,
    m: ThreeNS.Material,
    x: number,
    y: number,
    z: number,
    parent: ThreeNS.Object3D = world,
  ) => {
    const o = new THREE.Mesh(geo, m);
    o.position.set(x, y, z);
    parent.add(o);
    return o;
  };

  // The platform
  add(rbox(7.6, 0.3, 3.3, 0.13), silver, 0, 0.17, 0);
  add(rbox(6.9, 0.14, 2.7, 0.06), graphite, 0, -0.02, 0);
  add(new THREE.BoxGeometry(6.7, 0.025, 2.5), led, 0, -0.1, 0);
  const deck = new THREE.Mesh(
    rbox(7.3, 0.04, 3.0, 0.1),
    new THREE.MeshPhysicalMaterial({
      color: 0xbcdcf4,
      transparent: true,
      opacity: 0.6,
      roughness: 0.08,
      clearcoat: 1,
      envMapIntensity: 2,
    }),
  );
  deck.position.y = TOP + 0.01;
  world.add(deck);
  for (const z of [-1.5, 1.5]) {
    add(new THREE.BoxGeometry(7.3, 0.02, 0.03), led, 0, TOP + 0.04, z);
  }
  for (const x of [-3.65, 3.65]) {
    add(new THREE.BoxGeometry(0.03, 0.02, 3.0), led, x, TOP + 0.04, 0);
  }

  // The columns: frosted glass with a glowing core that fills as they grow
  const glass = new THREE.MeshPhysicalMaterial({
    color: 0xa8d4f6,
    transparent: true,
    opacity: 0.5,
    roughness: 0.06,
    clearcoat: 1,
    envMapIntensity: 2.4,
    depthWrite: false,
  });
  const coreMat = new THREE.MeshBasicMaterial({
    color: 0x4db3f0,
    transparent: true,
    opacity: 0.85,
    toneMapped: false,
  });
  const capMat = new THREE.MeshBasicMaterial({
    color: 0xd6efff,
    toneMapped: false,
  });
  const cols = HEIGHTS.map((h, i) => {
    const g = new THREE.Group();
    g.position.set(stepX(i), TOP, 0);
    world.add(g);
    const body = new THREE.Mesh(rbox(COL_W, h, COL_D, 0.12), glass);
    body.position.y = h / 2;
    body.renderOrder = 2;
    g.add(body);
    const core = new THREE.Mesh(
      rbox(COL_W - 0.34, h - 0.2, COL_D - 0.7, 0.08),
      coreMat,
    );
    core.position.y = (h - 0.2) / 2 + 0.05;
    g.add(core);
    const cap = new THREE.Mesh(
      rbox(COL_W + 0.04, 0.05, COL_D + 0.04, 0.02),
      capMat,
    );
    cap.position.y = h + 0.02;
    g.add(cap);
    return { g, h, core, body };
  });

  // The path: a line curving over the tops of the columns
  const topPts = HEIGHTS.map(
    (h, i) => new THREE.Vector3(stepX(i), TOP + h + 0.4, 0),
  );
  const path = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(X0 - 0.9, TOP + 0.45, 0),
      ...topPts,
      new THREE.Vector3(stepX(4) + 0.6, TOP + HEIGHTS[4] + 0.9, 0),
    ],
    false,
    "catmullrom",
    0.5,
  );
  const tube = new THREE.Mesh(
    new THREE.TubeGeometry(path, 120, 0.045, 10, false),
    new THREE.MeshBasicMaterial({ color: 0x3fb4f2, toneMapped: false }),
  );
  world.add(tube);
  const glowTex = glowTexture(THREE, "112,199,244");
  const trail = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: glowTex,
      transparent: true,
      depthWrite: false,
      toneMapped: false,
    }),
  );
  trail.scale.setScalar(0.7);
  world.add(trail);

  // Milestones: a node and a label above each column
  const nodes = topPts.map((p, i) => {
    const node = new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 20, 16),
      new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false }),
    );
    node.position.copy(p);
    world.add(node);
    const halo = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowTex,
        transparent: true,
        depthWrite: false,
        toneMapped: false,
        opacity: 0,
      }),
    );
    halo.scale.setScalar(0.8);
    halo.position.copy(p);
    world.add(halo);
    const label = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: labelTexture(THREE, STEPS[i]),
        transparent: true,
        depthWrite: false,
        toneMapped: false,
        opacity: 0,
      }),
    );
    label.scale.set(1.05, 0.39, 1);
    label.position.set(p.x, p.y + 0.85, 0);
    world.add(label);
    return { node, halo, label };
  });

  // Pooled light beneath, drifting specks
  const pool = new THREE.Mesh(
    new THREE.PlaneGeometry(11, 6),
    new THREE.MeshBasicMaterial({
      map: glowTexture(THREE, "112,199,244", 0.5),
      transparent: true,
      depthWrite: false,
      toneMapped: false,
    }),
  );
  pool.rotation.x = -Math.PI / 2;
  pool.position.y = -0.15;
  scene.add(pool);

  let seed = 5;
  const rng = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
  const DUST = 60;
  const dustGeo = new THREE.BufferGeometry();
  const dustPos = new Float32Array(DUST * 3);
  const dustSeed = Array.from({ length: DUST }, () => ({
    x: (rng() - 0.5) * 20,
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

  // Timeline: the columns grow one by one, then a light climbs the path, rests at the
  // top, and starts again.
  const GROW = 0.6;
  const GROW_END = 0.5 + STEPS.length * GROW;
  const CLIMB = 6;
  const REST = 2.2;
  const CYCLE = CLIMB + REST;

  let start = -1;
  const update = (now: number) => {
    if (start < 0) start = now;
    const t = now - start;

    cols.forEach((c, i) => {
      const k = smooth(clamp01((t - 0.4 - i * GROW) / (GROW + 0.5)));
      const s = Math.max(0.0001, k);
      c.g.scale.y = s;
      c.g.visible = k > 0.002;
    });

    const run = Math.max(0, t - GROW_END);
    const phase = run % CYCLE;
    const climb = still ? 1 : clamp01(phase / CLIMB);
    const u = smooth(climb) * 0.9 + 0.05; // along the curve, leaving the ends
    const pos = path.getPointAt(Math.min(u, 0.999));
    trail.position.set(pos.x, pos.y, 0);
    (trail.material as ThreeNS.SpriteMaterial).opacity = climb < 1 ? 0.9 : 0.4;

    nodes.forEach((n, i) => {
      const reached = climb >= (i + 0.5) / (STEPS.length + 0.5) || still;
      const built = clamp01((t - 0.4 - i * GROW - 0.4) / 0.5);
      const lab = n.label.material as ThreeNS.SpriteMaterial;
      lab.opacity += (built * (reached ? 1 : 0.55) - lab.opacity) * 0.15;
      (n.halo.material as ThreeNS.SpriteMaterial).opacity =
        built * (reached ? 0.9 : 0.15);
      n.node.visible = built > 0.01;
    });

    const rise = smooth(clamp01(t / 1.2));
    world.position.y = (1 - rise) * -0.8;
    mouse.sx += (mouse.x - mouse.sx) * 0.04;
    mouse.sy += (mouse.y - mouse.sy) * 0.04;
    world.rotation.y = -0.12 + Math.sin(now * 0.22) * 0.1 + mouse.sx * 0.1;
    world.rotation.x = mouse.sy * 0.02;
    for (let i = 0; i < DUST; i++) {
      const s = dustSeed[i];
      const ph = (now * s.speed + s.phase) % 1;
      dustPos[i * 3] = s.x + Math.sin(now * 0.2 + i) * 0.3;
      dustPos[i * 3 + 1] = (s.y + ph * 6) % 6;
      dustPos[i * 3 + 2] = s.z;
    }
    dustGeo.attributes.position.needsUpdate = true;
  };

  const resize = () => {
    const w = Math.max(el.clientWidth, 1);
    const h = Math.max(el.clientHeight, 1);
    renderer.setSize(w, h, false);
    const aspect = w / h;
    camera.aspect = aspect;
    const wide = aspect >= 1.1;
    camera.fov = wide ? 30 : 44;
    camera.position.set(0, wide ? 4.4 : 5.5, wide ? 17.5 : 19);
    camera.lookAt(0, 2.0, 0);
    camera.setViewOffset(
      w,
      h,
      wide ? -w * 0.22 : 0,
      wide ? -h * 0.03 : h * 0.2,
      w,
      h,
    );
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(() => {
    resize();
    if (still) {
      start = 0;
      update(30);
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
    renderer.render(scene, camera);
  };
  const io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
  });
  io.observe(el);
  if (still) {
    start = 0;
    update(30);
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

// The Careers hero scene. It fills its parent; with no WebGL the page shows
// the text on its plain background.
export default function CareerHero3D() {
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
        if (cancelled) return;
        cleanup = build(THREE, RoundedBoxGeometry, el, still);
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
