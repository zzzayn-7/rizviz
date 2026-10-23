import type * as ThreeNS from "three";
import type { mergeGeometries as MergeFn } from "three/addons/utils/BufferGeometryUtils.js";

// Helpers shared by the 3D hero scenes (home page and About page).

export type Three = typeof ThreeNS;

export const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
export const smooth = (t: number) => t * t * (3 - 2 * t);

export function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

export function makeCanvas(w: number, h: number) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return { c, ctx: c.getContext("2d")! };
}

export function tex(THREE: Three, c: HTMLCanvasElement, color = true) {
  const t = new THREE.CanvasTexture(c);
  if (color) t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

export function glowTexture(THREE: Three, rgb: string, peak = 0.95) {
  const { c, ctx } = makeCanvas(128, 128);
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, `rgba(${rgb},${peak})`);
  g.addColorStop(0.35, `rgba(${rgb},${peak * 0.42})`);
  g.addColorStop(1, `rgba(${rgb},0)`);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  return tex(THREE, c);
}

// Fine streaks, for brushed metal: used for roughness and bump.
export function brushedTexture(THREE: Three, vertical = false) {
  const { c, ctx } = makeCanvas(512, 512);
  ctx.fillStyle = "#808080";
  ctx.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 2600; i++) {
    const v = 100 + Math.random() * 90;
    ctx.fillStyle = `rgba(${v},${v},${v},0.5)`;
    const p = Math.random() * 512;
    const len = 40 + Math.random() * 260;
    const o = Math.random() * 512;
    if (vertical) ctx.fillRect(p, o, 1, len);
    else ctx.fillRect(o, p, len, 1);
  }
  const t = tex(THREE, c, false);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

// Soft boxes for the reflections on the metal: a big white one above, a cool
// blue strip on the left, a white one on the right.
export function studioEnvironment(THREE: Three) {
  const env = new THREE.Scene();
  env.background = new THREE.Color(0x9fb5c6);
  const panel = (w: number, h: number, color: number, intensity: number) =>
    new THREE.Mesh(
      new THREE.PlaneGeometry(w, h),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(color).multiplyScalar(intensity),
        side: THREE.DoubleSide,
      }),
    );
  const top = panel(18, 12, 0xffffff, 3.2);
  top.position.set(0, 12, 0);
  top.rotation.x = Math.PI / 2;
  env.add(top);
  const left = panel(8, 14, 0x6fc1f5, 3.4);
  left.position.set(-12, 5, 2);
  left.rotation.y = Math.PI / 2;
  env.add(left);
  const right = panel(8, 12, 0xffffff, 2.4);
  right.position.set(12, 5, -3);
  right.rotation.y = -Math.PI / 2;
  env.add(right);
  const back = panel(20, 6, 0xdff1ff, 1.4);
  back.position.set(0, 4, -12);
  env.add(back);
  const front = panel(14, 5, 0xffffff, 1.0);
  front.position.set(0, 3, 12);
  env.add(front);
  return env;
}

// A dark glass card with a bright rim, used for the floating software panels.
export function glass(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  r = 26,
) {
  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, "rgba(14,52,86,0.92)");
  g.addColorStop(1, "rgba(7,28,48,0.94)");
  ctx.fillStyle = g;
  roundRect(ctx, 8, 8, w - 16, h - 16, r);
  ctx.fill();
  ctx.strokeStyle = "rgba(112,199,244,0.8)";
  ctx.lineWidth = 3;
  roundRect(ctx, 8, 8, w - 16, h - 16, r);
  ctx.stroke();
  ctx.strokeStyle = "rgba(255,255,255,0.16)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(26 + r, 14);
  ctx.lineTo(w - 26 - r, 14);
  ctx.stroke();
}

// Join every mesh flagged `userData.merge` into one mesh per material. Hundreds
// of small static parts become a handful of draw calls, which is what keeps
// the frame rate up. Meshes can opt out by setting `userData.merge = false`.
export function mergeStatic(
  THREE: Three,
  mergeGeometries: typeof MergeFn,
  world: ThreeNS.Object3D,
) {
  world.updateMatrixWorld(true);
  const buckets = new Map<ThreeNS.Material, ThreeNS.BufferGeometry[]>();
  const merged: ThreeNS.Mesh[] = [];
  world.traverse((o) => {
    const m = o as ThreeNS.Mesh;
    if (!m.isMesh || !m.userData.merge) return;
    // Make every piece the same kind (not indexed, position/normal/uv only)
    // so they can be joined.
    const g = m.geometry.index ? m.geometry.toNonIndexed() : m.geometry.clone();
    for (const name of Object.keys(g.attributes)) {
      if (!["position", "normal", "uv"].includes(name)) g.deleteAttribute(name);
    }
    g.applyMatrix4(m.matrixWorld);
    const list = buckets.get(m.material as ThreeNS.Material) ?? [];
    list.push(g);
    buckets.set(m.material as ThreeNS.Material, list);
    merged.push(m);
  });
  merged.forEach((m) => {
    m.removeFromParent();
    m.geometry.dispose();
  });
  buckets.forEach((geos, material) => {
    const geo = mergeGeometries(geos, false);
    if (!geo) return;
    const mesh = new THREE.Mesh(geo, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    world.add(mesh);
    geos.forEach((g) => g.dispose());
  });
}
