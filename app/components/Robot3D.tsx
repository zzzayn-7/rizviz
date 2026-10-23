"use client";

import { useEffect, useRef } from "react";
import type * as ThreeNS from "three";
import type { RoundedBoxGeometry as RoundedBoxGeometryClass } from "three/addons/geometries/RoundedBoxGeometry.js";
import type { RoomEnvironment as RoomEnvironmentClass } from "three/addons/environments/RoomEnvironment.js";

type Three = typeof ThreeNS;
type RoundedBox = typeof RoundedBoxGeometryClass;
type RoomEnv = typeof RoomEnvironmentClass;

// How the robot looks and what it does, as a function of one flag. While
// `looking` is false it stands with its head bowed over the phone, scrolling.
// When it turns true the head comes up and turns to the right, towards the
// product being shown.
type LookRef = { current: boolean };

// A soft round glow, drawn once and reused as a texture.
function radialTexture(
  THREE: Three,
  rgb: string,
  alpha: number,
  size = 128,
): ThreeNS.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2,
  );
  g.addColorStop(0, `rgba(${rgb},${alpha})`);
  g.addColorStop(1, `rgba(${rgb},0)`);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// The phone's screen: a feed of cards that scrolls when the texture offset
// moves. Two screens' worth is drawn so the loop is seamless.
function feedTexture(THREE: Three): ThreeNS.CanvasTexture {
  const w = 256;
  const h = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  const bg = ctx.createLinearGradient(0, 0, 0, h);
  bg.addColorStop(0, "#0e2a42");
  bg.addColorStop(1, "#0b1d2d");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);
  const row = h / 4; // the pattern repeats every 256px
  for (let i = 0; i < 4; i++) {
    const y = i * row;
    ctx.fillStyle = "rgba(112,199,244,0.16)";
    ctx.beginPath();
    ctx.roundRect(14, y + 14, w - 28, 120, 14);
    ctx.fill();
    ctx.fillStyle = i % 2 ? "#329fe0" : "#70c7f4";
    ctx.beginPath();
    ctx.arc(44, y + 46, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(223,240,252,0.85)";
    ctx.beginPath();
    ctx.roundRect(70, y + 36, 110, 8, 4);
    ctx.roundRect(70, y + 54, 70, 7, 3.5);
    ctx.fill();
    ctx.fillStyle = "rgba(223,240,252,0.3)";
    ctx.beginPath();
    ctx.roundRect(28, y + 86, w - 56, 7, 3.5);
    ctx.roundRect(28, y + 102, w - 100, 7, 3.5);
    ctx.fill();
    ctx.fillStyle = "rgba(112,199,244,0.1)";
    ctx.beginPath();
    ctx.roundRect(14, y + 146, w - 28, 90, 14);
    ctx.fill();
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1, 0.5);
  return tex;
}

function build(
  THREE: Three,
  RoundedBoxGeometry: RoundedBox,
  RoomEnvironment: RoomEnv,
  el: HTMLElement,
  lookRef: LookRef,
  still: boolean,
) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  const canvas = renderer.domElement;
  canvas.style.display = "block";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  el.appendChild(canvas);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTexture;
  scene.environmentIntensity = 0.6;

  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
  camera.position.set(0.1, 1.18, 4.7);
  camera.lookAt(0, 1.02, 0);

  // Lights: a soft key from the front, a cool rim from behind, and the glow
  // of the phone itself on the face.
  scene.add(new THREE.HemisphereLight(0xcfe8ff, 0x16222f, 0.7));
  const key = new THREE.DirectionalLight(0xffffff, 2.4);
  key.position.set(2.6, 4.2, 3.6);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.left = -1.8;
  key.shadow.camera.right = 1.8;
  key.shadow.camera.top = 2.6;
  key.shadow.camera.bottom = -1;
  key.shadow.radius = 5;
  key.shadow.bias = -0.0004;
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x70c7f4, 2.2);
  rim.position.set(-3, 2.4, -3);
  scene.add(rim);
  const phoneLight = new THREE.PointLight(0x70c7f4, 2.2, 2.2, 2);
  scene.add(phoneLight);

  // Materials
  const shell = new THREE.MeshPhysicalMaterial({
    color: 0xdfeaf3,
    roughness: 0.28,
    metalness: 0.08,
    clearcoat: 1,
    clearcoatRoughness: 0.12,
  });
  const steel = new THREE.MeshPhysicalMaterial({
    color: 0x24384a,
    roughness: 0.38,
    metalness: 0.85,
  });
  const glass = new THREE.MeshPhysicalMaterial({
    color: 0x04070c,
    roughness: 0.06,
    metalness: 0.2,
    clearcoat: 1,
    clearcoatRoughness: 0.03,
  });
  const accent = new THREE.MeshPhysicalMaterial({
    color: 0x329fe0,
    roughness: 0.3,
    metalness: 0.4,
    emissive: 0x1a6fa8,
    emissiveIntensity: 0.6,
  });
  const glowMat = new THREE.MeshBasicMaterial({
    color: 0xb5e5ff,
    toneMapped: false,
  });

  const root = new THREE.Group();
  scene.add(root);
  const addMesh = (
    geo: ThreeNS.BufferGeometry,
    mat: ThreeNS.Material,
    parent: ThreeNS.Object3D = root,
    shadow = true,
  ) => {
    const m = new THREE.Mesh(geo, mat);
    m.castShadow = shadow;
    m.receiveShadow = shadow;
    parent.add(m);
    return m;
  };

  // Floor: a shadow catcher and a faint pool of light, barely there.
  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(0.8, 64),
    new THREE.ShadowMaterial({ opacity: 0.32 }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);
  const poolTex = radialTexture(THREE, "112,199,244", 0.2, 256);
  const pool = new THREE.Mesh(
    new THREE.CircleGeometry(0.72, 64),
    new THREE.MeshBasicMaterial({
      map: poolTex,
      transparent: true,
      depthWrite: false,
    }),
  );
  pool.rotation.x = -Math.PI / 2;
  pool.position.y = 0.002;
  scene.add(pool);

  // Legs and feet
  for (const s of [-1, 1]) {
    addMesh(new THREE.CapsuleGeometry(0.085, 0.42, 8, 16), shell).position.set(
      s * 0.16,
      0.42,
      0,
    );
    addMesh(new THREE.SphereGeometry(0.095, 24, 16), steel).position.set(
      s * 0.16,
      0.66,
      0,
    );
    addMesh(
      new RoundedBoxGeometry(0.24, 0.11, 0.34, 4, 0.05),
      steel,
    ).position.set(s * 0.16, 0.055, 0.04);
    addMesh(
      new RoundedBoxGeometry(0.2, 0.05, 0.28, 3, 0.02),
      accent,
    ).position.set(s * 0.16, 0.025, 0.05);
  }
  // Pelvis
  addMesh(new RoundedBoxGeometry(0.52, 0.22, 0.32, 5, 0.1), steel).position.set(
    0,
    0.76,
    0,
  );

  // Torso
  const torso = new THREE.Group();
  torso.position.set(0, 1.12, 0);
  root.add(torso);
  addMesh(
    new RoundedBoxGeometry(0.66, 0.64, 0.4, 6, 0.17),
    shell,
    torso,
  ).position.set(0, 0, 0);
  addMesh(
    new RoundedBoxGeometry(0.38, 0.3, 0.06, 4, 0.06),
    glass,
    torso,
  ).position.set(0, 0.02, 0.19);
  const core = new THREE.Mesh(new THREE.CircleGeometry(0.06, 32), glowMat);
  core.position.set(0, 0.02, 0.222);
  torso.add(core);
  const coreRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.085, 0.01, 8, 40),
    accent,
  );
  coreRing.position.set(0, 0.02, 0.222);
  torso.add(coreRing);
  const coreGlow = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: radialTexture(THREE, "112,199,244", 0.9),
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
    }),
  );
  coreGlow.scale.setScalar(0.34);
  coreGlow.position.set(0, 0.02, 0.24);
  torso.add(coreGlow);
  // Neck
  addMesh(new THREE.CylinderGeometry(0.075, 0.09, 0.1, 24), steel).position.set(
    0,
    1.47,
    0,
  );

  // Head: pivots at the neck so it can nod and turn.
  const head = new THREE.Group();
  head.position.set(0, 1.5, 0);
  root.add(head);
  addMesh(
    new RoundedBoxGeometry(0.6, 0.46, 0.5, 7, 0.15),
    shell,
    head,
  ).position.set(0, 0.25, 0);
  addMesh(
    new RoundedBoxGeometry(0.49, 0.31, 0.12, 6, 0.1),
    glass,
    head,
  ).position.set(0, 0.26, 0.21);
  // Eyes
  const eyes = new THREE.Group();
  eyes.position.set(0, 0.27, 0.275);
  head.add(eyes);
  const eyeGeo = new THREE.CapsuleGeometry(0.036, 0.05, 6, 16);
  const eyeL = new THREE.Mesh(eyeGeo, glowMat);
  const eyeR = new THREE.Mesh(eyeGeo, glowMat);
  eyeL.position.x = -0.12;
  eyeR.position.x = 0.12;
  eyeL.scale.z = eyeR.scale.z = 0.25;
  eyes.add(eyeL, eyeR);
  const eyeGlowMat = new THREE.SpriteMaterial({
    map: radialTexture(THREE, "112,199,244", 0.8),
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    transparent: true,
  });
  for (const s of [-1, 1]) {
    const g = new THREE.Sprite(eyeGlowMat);
    g.scale.setScalar(0.2);
    g.position.set(s * 0.12, 0, 0.02);
    eyes.add(g);
  }
  // Ears
  for (const s of [-1, 1]) {
    const ear = addMesh(
      new THREE.CylinderGeometry(0.1, 0.1, 0.07, 32),
      steel,
      head,
    );
    ear.rotation.z = Math.PI / 2;
    ear.position.set(s * 0.325, 0.25, 0);
    const ring = addMesh(
      new THREE.TorusGeometry(0.075, 0.012, 8, 32),
      accent,
      head,
    );
    ring.rotation.y = Math.PI / 2;
    ring.position.set(s * 0.363, 0.25, 0);
  }
  // Antenna
  addMesh(
    new THREE.CylinderGeometry(0.011, 0.011, 0.14, 12),
    steel,
    head,
  ).position.set(0, 0.55, 0);
  const tip = new THREE.Mesh(new THREE.SphereGeometry(0.035, 20, 14), glowMat);
  tip.position.set(0, 0.64, 0);
  head.add(tip);
  const tipGlow = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: radialTexture(THREE, "112,199,244", 0.9),
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
    }),
  );
  tipGlow.scale.setScalar(0.22);
  tipGlow.position.copy(tip.position);
  head.add(tipGlow);

  // Phone, with its scrolling screen
  const phone = new THREE.Group();
  root.add(phone);
  addMesh(new RoundedBoxGeometry(0.25, 0.47, 0.03, 4, 0.03), steel, phone);
  const feed = feedTexture(THREE);
  const screen = new THREE.Mesh(
    new THREE.PlaneGeometry(0.222, 0.436),
    new THREE.MeshBasicMaterial({ map: feed, toneMapped: false }),
  );
  screen.position.z = 0.0158;
  phone.add(screen);

  // Arms: shoulder -> elbow -> hand, solved each frame so both hands stay on
  // the phone however it moves.
  const L1 = 0.31;
  const L2 = 0.33;
  const up = new THREE.Vector3(0, 1, 0);
  const arms = [-1, 1].map((side) => {
    const upper = addMesh(
      new THREE.CapsuleGeometry(0.058, L1 - 0.116, 6, 14),
      shell,
    );
    const fore = addMesh(
      new THREE.CapsuleGeometry(0.052, L2 - 0.104, 6, 14),
      shell,
    );
    const shoulder = addMesh(new THREE.SphereGeometry(0.1, 24, 16), steel);
    const elbow = addMesh(new THREE.SphereGeometry(0.062, 20, 14), steel);
    const hand = addMesh(new THREE.SphereGeometry(0.068, 20, 14), steel);
    return {
      side,
      upper,
      fore,
      shoulder,
      elbow,
      hand,
      s: new THREE.Vector3(side * 0.4, 1.34, 0),
    };
  });
  // The scrolling thumb
  const thumb = addMesh(
    new THREE.CapsuleGeometry(0.02, 0.05, 4, 10),
    shell,
    phone,
  );

  const dir = new THREE.Vector3();
  const perp = new THREE.Vector3();
  const pole = new THREE.Vector3();
  const mid = new THREE.Vector3();
  const elbowP = new THREE.Vector3();
  const target = new THREE.Vector3();
  const quat = new THREE.Quaternion();
  const place = (
    mesh: ThreeNS.Mesh,
    a: ThreeNS.Vector3,
    b: ThreeNS.Vector3,
  ) => {
    mid.addVectors(a, b).multiplyScalar(0.5);
    mesh.position.copy(mid);
    dir.subVectors(b, a).normalize();
    quat.setFromUnitVectors(up, dir);
    mesh.quaternion.copy(quat);
  };
  const solveArm = (arm: (typeof arms)[number], t: ThreeNS.Vector3) => {
    const s = arm.s;
    dir.subVectors(t, s);
    let d = dir.length();
    d = Math.min(Math.max(d, Math.abs(L1 - L2) + 0.01), L1 + L2 - 0.005);
    dir.normalize();
    const a = (L1 * L1 - L2 * L2 + d * d) / (2 * d);
    const h = Math.sqrt(Math.max(L1 * L1 - a * a, 0));
    // The elbow sits down, back and slightly out from the shoulder-hand line.
    pole.set(arm.side * 0.5, -1, -0.7);
    perp.copy(pole).addScaledVector(dir, -pole.dot(dir)).normalize();
    elbowP.copy(s).addScaledVector(dir, a).addScaledVector(perp, h);
    // Put the hand where the elbow's reach actually ends.
    target.copy(s).addScaledVector(dir, d);
    arm.shoulder.position.copy(s);
    arm.elbow.position.copy(elbowP);
    arm.hand.position.copy(target);
    place(arm.upper, s, elbowP);
    place(arm.fore, elbowP, target);
  };

  // Poses, blended with `k` each frame (0 = head down on the phone, 1 =
  // looking up at the product).
  const pose = {
    down: {
      pitch: 0.62,
      yaw: 0.06,
      body: 0.22,
      phoneY: 1.16,
      phoneZ: 0.4,
      phoneTilt: -0.95,
      lean: 0.07,
    },
    up: {
      pitch: -0.1,
      yaw: 0.52,
      body: 0.6,
      phoneY: 1.0,
      phoneZ: 0.34,
      phoneTilt: -0.35,
      lean: 0,
    },
  };
  let k = still || lookRef.current ? 1 : 0;
  let eyeOpen = still || lookRef.current ? 1 : 0;
  let scroll = 0;
  let blink = 0;
  let nextBlink = 2;
  const grip = new THREE.Vector3();
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const update = (dt: number, time: number) => {
    const want = lookRef.current ? 1 : 0;
    k += (want - k) * (1 - Math.exp(-dt * 3.2));
    eyeOpen += (want - eyeOpen) * (1 - Math.exp(-dt * 6));
    const P = pose;
    const breathe = Math.sin(time * 1.6) * 0.012;

    root.rotation.y = lerp(P.down.body, P.up.body, k);
    torso.rotation.x = lerp(P.down.lean, P.up.lean, k);
    torso.scale.y = 1 + breathe;
    head.rotation.x =
      lerp(P.down.pitch, P.up.pitch, k) + Math.sin(time * 1.1) * 0.012;
    head.rotation.y = lerp(P.down.yaw, P.up.yaw, k);

    // Eyes narrow and drop while reading, open wide when looking up, and
    // blink now and then.
    nextBlink -= dt;
    if (nextBlink < 0) {
      blink = 0.16;
      nextBlink = 2.4 + Math.random() * 2.4;
    }
    blink = Math.max(0, blink - dt);
    const open = lerp(0.55, 1, eyeOpen) * (blink > 0 ? 0.1 : 1);
    eyeL.scale.y = eyeR.scale.y = open;
    eyes.position.y = 0.27 + lerp(-0.012, 0, eyeOpen);
    glowMat.color.setRGB(1, 1, 1).lerp(new THREE.Color(0xb5e5ff), 0.8);
    tipGlow.material.opacity = 0.7 + Math.sin(time * 3) * 0.3;
    coreGlow.scale.setScalar(0.32 + Math.sin(time * 2.4) * 0.03);

    // Phone follows the pose; hands grip its two edges.
    phone.position.set(
      0,
      lerp(P.down.phoneY, P.up.phoneY, k),
      lerp(P.down.phoneZ, P.up.phoneZ, k),
    );
    phone.rotation.x = lerp(P.down.phoneTilt, P.up.phoneTilt, k);
    phone.updateMatrixWorld(true);
    for (const arm of arms) {
      grip.set(arm.side * 0.145, -0.04, 0.02);
      phone.localToWorld(grip);
      root.worldToLocal(grip);
      solveArm(arm, grip);
    }

    // Scrolling: the feed moves and the thumb swipes up, repeatedly. It
    // slows right down while the robot is looking up.
    const speed = lerp(1, 0.08, k);
    scroll += dt * speed;
    feed.offset.y = -(scroll * 0.55) % 1;
    const swipe = (scroll * 1.15) % 1;
    thumb.position.set(0.075, lerp(-0.13, 0.1, swipe), 0.035);
    thumb.rotation.x = 0.4;
    thumb.visible = k < 0.9;

    phoneLight.position.set(0, phone.position.y + 0.25, phone.position.z + 0.3);
    phoneLight.intensity = lerp(2.4, 0.6, k);
  };

  const resize = () => {
    const w = Math.max(el.clientWidth, 1);
    const h = Math.max(el.clientHeight, 1);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  const observer = new ResizeObserver(() => {
    resize();
    if (still) renderer.render(scene, camera);
  });
  observer.observe(el);
  resize();

  let frame = 0;
  let last = performance.now();
  let visible = true;
  const loop = (now: number) => {
    frame = requestAnimationFrame(loop);
    if (!visible) {
      last = now;
      return;
    }
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    update(dt, now / 1000);
    renderer.render(scene, camera);
  };
  const io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
  });
  io.observe(el);

  if (still) {
    update(0.016, 0);
    renderer.render(scene, camera);
  } else {
    frame = requestAnimationFrame(loop);
  }

  return () => {
    cancelAnimationFrame(frame);
    io.disconnect();
    observer.disconnect();
    scene.traverse((o) => {
      const mesh = o as ThreeNS.Mesh;
      mesh.geometry?.dispose?.();
      const m = mesh.material as
        ThreeNS.Material | ThreeNS.Material[] | undefined;
      (Array.isArray(m) ? m : m ? [m] : []).forEach((mat) => {
        (mat as ThreeNS.MeshBasicMaterial).map?.dispose?.();
        mat.dispose();
      });
    });
    envTexture.dispose();
    pmrem.dispose();
    renderer.dispose();
    canvas.remove();
  };
}

export default function Robot3D({
  looking,
  still = false,
  className,
}: {
  looking: boolean;
  // Draw one frame in the looking pose and stop (for reduced motion).
  still?: boolean;
  className?: string;
}) {
  const mount = useRef<HTMLDivElement>(null);
  const lookRef = useRef(looking);

  useEffect(() => {
    lookRef.current = looking;
  }, [looking]);

  useEffect(() => {
    const el = mount.current;
    if (!el) return;
    let cancelled = false;
    let cleanup = () => {};
    (async () => {
      try {
        const THREE = await import("three");
        const { RoundedBoxGeometry } =
          await import("three/addons/geometries/RoundedBoxGeometry.js");
        const { RoomEnvironment } =
          await import("three/addons/environments/RoomEnvironment.js");
        if (cancelled) return;
        cleanup = build(
          THREE,
          RoundedBoxGeometry,
          RoomEnvironment,
          el,
          lookRef,
          still,
        );
      } catch {
        // No WebGL: the product card still works without the robot.
      }
    })();
    return () => {
      cancelled = true;
      cleanup();
    };
  }, [still]);

  return (
    <div
      ref={mount}
      role="img"
      aria-label="A robot reading on its phone, then looking up at a product"
      className={className}
    />
  );
}
