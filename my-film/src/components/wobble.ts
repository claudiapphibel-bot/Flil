import { hash } from "./theme";

// Contours « tremblés » façon dessin à la main : le tracé change
// légèrement 12 fois par seconde (effet « boil »), sur une vidéo à 60 i/s.
export const boilStep = (frame: number) => Math.floor(frame / 5);

export const wobblyPolygon = (
  pts: [number, number][],
  frame: number,
  seed = 0,
  amp = 2.5,
  step = 26,
) => {
  const b = boilStep(frame);
  const out: string[] = [];
  let k = 0;
  for (let i = 0; i < pts.length; i++) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[(i + 1) % pts.length];
    const len = Math.hypot(x2 - x1, y2 - y1);
    const n = Math.max(1, Math.round(len / step));
    for (let j = 0; j < n; j++) {
      const t = j / n;
      const dx = (hash(seed, k, b) - 0.5) * 2 * amp;
      const dy = (hash(seed + 7, k, b) - 0.5) * 2 * amp;
      out.push(`${(x1 + (x2 - x1) * t + dx).toFixed(1)},${(y1 + (y2 - y1) * t + dy).toFixed(1)}`);
      k++;
    }
  }
  return `M${out.join(" L")} Z`;
};

export const wobblyRect = (x: number, y: number, w: number, h: number, frame: number, seed = 0, amp = 2.5) =>
  wobblyPolygon([[x, y], [x + w, y], [x + w, y + h], [x, y + h]], frame, seed, amp);

export const wobblyLine = (x1: number, y1: number, x2: number, y2: number, frame: number, seed = 0, amp = 2) => {
  const b = boilStep(frame);
  const n = Math.max(1, Math.round(Math.hypot(x2 - x1, y2 - y1) / 30));
  const pts: string[] = [];
  for (let j = 0; j <= n; j++) {
    const t = j / n;
    const d = (hash(seed, j, b) - 0.5) * 2 * amp;
    pts.push(`${(x1 + (x2 - x1) * t).toFixed(1)},${(y1 + (y2 - y1) * t + d).toFixed(1)}`);
  }
  return `M${pts.join(" L")}`;
};

export const wobblyCircle = (cx: number, cy: number, r: number, frame: number, seed = 0, amp = 2) => {
  const b = boilStep(frame);
  const n = Math.max(12, Math.round((2 * Math.PI * r) / 22));
  const pts: string[] = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const rr = r + (hash(seed, i, b) - 0.5) * 2 * amp;
    pts.push(`${(cx + Math.cos(a) * rr).toFixed(1)},${(cy + Math.sin(a) * rr).toFixed(1)}`);
  }
  return `M${pts.join(" L")} Z`;
};
