"use client";

import { useEffect, useRef } from "react";
import type * as ThreeNS from "three";
import type { RoundedBoxGeometry as RoundedBoxClass } from "three/addons/geometries/RoundedBoxGeometry.js";
import {
  clamp01,
  glowTexture,
  makeCanvas,
  roundRect,
  smooth,
  studioEnvironment,
  tex,
  type Three,
} from "./three-kit";

// The Products hero: a tall pane of glass showing a dashboard, a glass phone
// in front of it. All of it is
// a light, frosted blue. The charts on the screens move gently.

type Dash = "web" | "phone";

// The dashboard drawn on the glass: translucent cards, a flowing area chart, a
// ring, and bars. Nothing here is a real product, it is only the look of one.
function drawDash(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  kind: Dash,
) {
  ctx.clearRect(0, 0, w, h);
  const card = (x: number, y: number, cw: number, ch: number, r = 26) => {
    ctx.fillStyle = "rgba(255,255,255,0.62)";
    roundRect(ctx, x, y, cw, ch, r);
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.9)";
    ctx.lineWidth = 2;
    ctx.stroke();
  };
  const pill = (x: number, y: number, pw: number, ph: number, c: string) => {
    ctx.fillStyle = c;
    roundRect(ctx, x, y, pw, ph, ph / 2);
    ctx.fill();
  };
  const wave = (x: number, y: number, ww: number, hh: number, ph: number) => {
    const pts: [number, number][] = [];
    for (let i = 0; i <= 60; i++) {
      const u = i / 60;
      const v =
        0.5 +
        0.26 * Math.sin(u * 6 + ph) +
        0.14 * Math.sin(u * 11 + ph * 1.7) +
        0.18 * u;
      pts.push([x + u * ww, y + hh - v * hh * 0.9]);
    }
    const fill = ctx.createLinearGradient(0, y, 0, y + hh);
    fill.addColorStop(0, "rgba(77,168,240,0.5)");
    fill.addColorStop(1, "rgba(122,140,240,0.02)");
    ctx.beginPath();
    pts.forEach(([px, py], i) => (i ? ctx.lineTo(px, py) : ctx.moveTo(px, py)));
    ctx.lineTo(x + ww, y + hh);
    ctx.lineTo(x, y + hh);
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.fill();
    const line = ctx.createLinearGradient(x, 0, x + ww, 0);
    line.addColorStop(0, "#3fb4f2");
    line.addColorStop(1, "#7a7cf0");
    ctx.beginPath();
    pts.forEach(([px, py], i) => (i ? ctx.lineTo(px, py) : ctx.moveTo(px, py)));
    ctx.strokeStyle = line;
    ctx.lineWidth = 6;
    ctx.lineJoin = "round";
    ctx.stroke();
  };
  const ring = (cx: number, cy: number, r: number, frac: number) => {
    ctx.lineWidth = r * 0.34;
    ctx.strokeStyle = "rgba(120,160,210,0.25)";
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
    const g = ctx.createLinearGradient(cx - r, cy, cx + r, cy);
    g.addColorStop(0, "#3fb4f2");
    g.addColorStop(1, "#7a7cf0");
    ctx.strokeStyle = g;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * frac);
    ctx.stroke();
    ctx.lineCap = "butt";
  };
  const bars = (x: number, y: number, bw: number, hh: number, n: number) => {
    const gap = bw / n;
    for (let i = 0; i < n; i++) {
      const base = 0.3 + 0.6 * ((i + 1) / n);
      const v = base * (0.82 + 0.18 * Math.sin(t * 1.4 + i * 0.9));
      const bh = hh * v;
      const g = ctx.createLinearGradient(0, y + hh - bh, 0, y + hh);
      g.addColorStop(0, i === n - 1 ? "#7a7cf0" : "#4da8f0");
      g.addColorStop(1, i === n - 1 ? "#a9a6f6" : "#a6d6fa");
      ctx.fillStyle = g;
      roundRect(ctx, x + i * gap, y + hh - bh, gap * 0.62, bh, gap * 0.2);
      ctx.fill();
    }
  };

  if (kind === "web") {
    // window dots and a sidebar
    for (const [i, c] of ["#3fb4f2", "#7ad0f6", "#a6b8f6"].entries()) {
      ctx.fillStyle = c;
      ctx.beginPath();
      ctx.arc(64 + i * 34, 62, 11, 0, Math.PI * 2);
      ctx.fill();
    }
    card(36, 120, 250, 760, 34);
    pill(66, 160, 190, 56, "#5a64f0");
    for (let i = 0; i < 4; i++) {
      ctx.fillStyle = i % 2 ? "#4da8f0" : "#7a7cf0";
      ctx.beginPath();
      ctx.arc(84, 270 + i * 82, 12, 0, Math.PI * 2);
      ctx.fill();
      pill(116, 262 + i * 82, 110, 16, "rgba(90,110,160,0.35)");
    }
    // the chart
    card(314, 120, 1010, 380);
    pill(350, 156, 130, 16, "rgba(90,110,160,0.5)");
    pill(350, 186, 200, 12, "rgba(90,110,160,0.25)");
    wave(340, 220, 950, 260, t * 0.7);
    // ring, bars and a second area
    card(314, 530, 320, 350);
    ring(474, 700, 82, 0.62 + 0.06 * Math.sin(t));
    pill(356, 820, 140, 14, "rgba(90,110,160,0.35)");
    card(656, 530, 320, 350);
    pill(690, 566, 110, 14, "rgba(90,110,160,0.5)");
    bars(694, 610, 240, 210, 5);
    card(998, 530, 326, 350);
    wave(1018, 620, 286, 200, t * 0.9 + 2);
  } else {
    pill(w / 2 - 60, 46, 120, 36, "rgba(40,60,110,0.55)");
    card(40, 120, w - 80, 430);
    pill(78, 156, 120, 14, "rgba(90,110,160,0.5)");
    bars(84, 200, w - 168, 310, 6);
    card(40, 580, w - 80, 270);
    wave(66, 612, w - 132, 200, t * 0.8 + 1);
    card(40, 880, w - 80, 120);
    ring(120, 940, 28, 0.7);
    pill(190, 922, 190, 14, "rgba(90,110,160,0.45)");
    pill(190, 952, 120, 12, "rgba(90,110,160,0.25)");
    card(40, 1030, w - 80, 120);
    ctx.fillStyle = "#3fb4f2";
    ctx.beginPath();
    ctx.arc(120, 1090, 28, 0, Math.PI * 2);
    ctx.fill();
    pill(190, 1072, 200, 14, "rgba(90,110,160,0.45)");
    pill(190, 1102, 130, 12, "rgba(90,110,160,0.25)");
  }
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
  renderer.toneMappingExposure = 1.1;
  const canvas = renderer.domElement;
  canvas.style.cssText = "display:block;width:100%;height:100%";
  el.appendChild(canvas);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTexture = pmrem.fromScene(studioEnvironment(THREE), 0.02).texture;
  scene.environment = envTexture;
  scene.environmentIntensity = 1.3;

  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 80);
  scene.add(new THREE.HemisphereLight(0xffffff, 0xb7d3ea, 0.9));
  const key = new THREE.DirectionalLight(0xffffff, 2.2);
  key.position.set(4, 7, 7);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x8fc8f5, 2.2);
  rim.position.set(-6, 3, -3);
  scene.add(rim);

  const world = new THREE.Group();
  scene.add(world);

  const rbox = (w: number, h: number, d: number, r: number) =>
    new RoundedBoxGeometry(w, h, d, 4, r);
  const glassMat = (color: number, opacity: number) =>
    new THREE.MeshPhysicalMaterial({
      color,
      transparent: true,
      opacity,
      roughness: 0.06,
      metalness: 0,
      clearcoat: 1,
      clearcoatRoughness: 0.04,
      envMapIntensity: 2.4,
      depthWrite: false,
    });
  const rimMat = new THREE.MeshStandardMaterial({
    color: 0xaec4d8,
    roughness: 0.18,
    metalness: 1,
  });
  const lit = (t: ThreeNS.Texture) =>
    new THREE.MeshBasicMaterial({
      map: t,
      transparent: true,
      toneMapped: false,
      depthWrite: false,
    });

  // The big pane
  const web = new THREE.Group();
  web.position.set(-1.3, 2.05, -0.4);
  web.rotation.y = 0.34;
  world.add(web);
  const paneGeo = rbox(5.9, 3.7, 0.16, 0.16);
  const pane = new THREE.Mesh(paneGeo, glassMat(0xb4d4f2, 0.5));
  pane.renderOrder = 1;
  web.add(pane);
  const paneRim = new THREE.LineSegments(
    new THREE.EdgesGeometry(paneGeo, 30),
    new THREE.LineBasicMaterial({
      color: 0x7fb8ea,
      transparent: true,
      opacity: 1,
      toneMapped: false,
    }),
  );
  paneRim.renderOrder = 2;
  web.add(paneRim);
  // a silver edge down the right side, like the reference
  const edgeR = new THREE.Mesh(rbox(0.06, 3.7, 0.2, 0.03), rimMat);
  edgeR.position.set(2.95, 0, 0);
  web.add(edgeR);
  const webCv = makeCanvas(1360, 900);
  const webTex = tex(THREE, webCv.c);
  const webScreen = new THREE.Mesh(
    new THREE.PlaneGeometry(5.5, 5.5 * (900 / 1360)),
    lit(webTex),
  );
  webScreen.position.z = 0.09;
  webScreen.renderOrder = 3;
  web.add(webScreen);

  // The phone
  const phone = new THREE.Group();
  phone.position.set(2.5, 1.7, 1.0);
  phone.rotation.y = 0.12;
  world.add(phone);
  const phoneBody = new THREE.Group();
  phone.add(phoneBody);
  const phoneFrame = new THREE.Mesh(rbox(1.75, 3.5, 0.17, 0.26), rimMat);
  phoneBody.add(phoneFrame);
  const glassFront = new THREE.Mesh(
    rbox(1.63, 3.38, 0.14, 0.22),
    new THREE.MeshStandardMaterial({
      color: 0xf4f9fe,
      roughness: 0.25,
      metalness: 0.1,
    }),
  );
  glassFront.position.z = 0.03;
  phoneBody.add(glassFront);
  const phoneCv = makeCanvas(620, 1180);
  const phoneTex = tex(THREE, phoneCv.c);
  const phoneScreen = new THREE.Mesh(
    new THREE.PlaneGeometry(1.5, 1.5 * (1180 / 620)),
    lit(phoneTex),
  );
  phoneScreen.position.z = 0.105;
  phoneScreen.renderOrder = 3;
  phoneBody.add(phoneScreen);
  const island = new THREE.Mesh(
    rbox(0.5, 0.12, 0.02, 0.06),
    new THREE.MeshBasicMaterial({ color: 0x2b3a55 }),
  );
  island.position.set(0, 1.55, 0.115);
  phoneBody.add(island);

  // Soft light pooled beneath, and drifting specks
  const pool = new THREE.Mesh(
    new THREE.PlaneGeometry(13, 7),
    new THREE.MeshBasicMaterial({
      map: glowTexture(THREE, "112,199,244", 0.55),
      transparent: true,
      depthWrite: false,
      toneMapped: false,
    }),
  );
  pool.rotation.x = -Math.PI / 2;
  pool.position.set(0.4, 0.02, 0.6);
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
        map: glowTexture(THREE, "130,190,245"),
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

  let start = -1;
  let frameNo = 0;
  const update = (now: number) => {
    if (start < 0) start = now;
    const t = now - start;
    const rise = smooth(clamp01(t / 1.4));
    world.position.y = (1 - rise) * -1.0;
    world.scale.setScalar(0.92 + 0.08 * rise);
    // The charts on the glass move gently; redraw at half rate
    if (frameNo % 2 === 0) {
      drawDash(webCv.ctx, 1360, 900, now, "web");
      webTex.needsUpdate = true;
      drawDash(phoneCv.ctx, 620, 1180, now, "phone");
      phoneTex.needsUpdate = true;
    }
    phoneBody.position.y = Math.sin(now * 1.1) * 0.05;
    mouse.sx += (mouse.x - mouse.sx) * 0.04;
    mouse.sy += (mouse.y - mouse.sy) * 0.04;
    world.rotation.y = Math.sin(now * 0.22) * 0.12 + mouse.sx * 0.1;
    world.rotation.x = mouse.sy * 0.02;
    for (let i = 0; i < DUST; i++) {
      const s = dustSeed[i];
      const ph = (now * s.speed + s.phase) % 1;
      dustPos[i * 3] = s.x + Math.sin(now * 0.2 + i) * 0.3;
      dustPos[i * 3 + 1] = (s.y + ph * 6) % 6;
      dustPos[i * 3 + 2] = s.z;
    }
    dustGeo.attributes.position.needsUpdate = true;
    frameNo++;
  };

  const resize = () => {
    const w = Math.max(el.clientWidth, 1);
    const h = Math.max(el.clientHeight, 1);
    renderer.setSize(w, h, false);
    const aspect = w / h;
    camera.aspect = aspect;
    const wide = aspect >= 1.1;
    camera.fov = wide ? 30 : 44;
    camera.position.set(0, wide ? 3.4 : 4, wide ? 17.5 : 19);
    camera.lookAt(0, 1.9, 0);
    camera.setViewOffset(
      w,
      h,
      wide ? -w * 0.24 : 0,
      wide ? h * 0.01 : h * 0.2,
      w,
      h,
    );
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(() => {
    resize();
    if (still) {
      start = 0;
      update(4);
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
    update(4);
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

// The Products hero scene. It fills its parent; with no WebGL the page shows
// the text on its plain background.
export default function ProductsHero3D() {
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
