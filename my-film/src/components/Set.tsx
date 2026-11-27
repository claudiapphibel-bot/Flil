import React from "react";
import { COLORS, GROUND_Y, WIDTH, hash } from "./theme";
import { wobblyCircle, wobblyLine, wobblyPolygon, wobblyRect } from "./wobble";

// Grande lueur douce autour d'une source de lumière (à mettre dans un <svg>)
export const Glow: React.FC<{ x: number; y: number; r: number; color: string; intensity?: number; frame: number; id: string }> = ({
  x, y, r, color, intensity = 1, frame, id,
}) => {
  const flicker = 1 + 0.03 * Math.sin(frame * 0.21) + 0.02 * Math.sin(frame * 0.53 + 1);
  return (
    <>
      <defs>
        <radialGradient id={id}>
          <stop offset="0%" stopColor={color} stopOpacity={0.55 * intensity} />
          <stop offset="35%" stopColor={color} stopOpacity={0.18 * intensity} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </radialGradient>
      </defs>
      <circle cx={x} cy={y} r={r * flicker} fill={`url(#${id})`} />
    </>
  );
};

export const Ground: React.FC<{ frame: number; y?: number }> = ({ frame, y = GROUND_Y }) => (
  <path d={wobblyLine(-20, y, WIDTH + 20, y, frame, 3, 1.5)} stroke={COLORS.outline} strokeWidth={3} fill="none" />
);

const outline = { stroke: COLORS.outline, strokeWidth: 3, strokeLinejoin: "round" as const };

export const Moon: React.FC<{ x: number; y: number; frame: number }> = ({ x, y, frame }) => (
  <>
    <Glow x={x} y={y} r={300} color={COLORS.moonLight} intensity={0.7} frame={frame} id="moonGlow" />
    <path d={wobblyCircle(x, y, 52, frame, 11)} fill="#E8EEF8" {...outline} />
  </>
);

// Lampadaire : poteau à x, bras vers la gauche jusqu'à lampX
export const Lamppost: React.FC<{ x: number; lampX: number; top: number; frame: number; id?: string }> = ({
  x, lampX, top, frame, id = "lamp",
}) => (
  <>
    <defs>
      <linearGradient id={`${id}Cone`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={COLORS.lampLight} stopOpacity={0.22} />
        <stop offset="100%" stopColor={COLORS.lampLight} stopOpacity={0.02} />
      </linearGradient>
    </defs>
    <path
      d={`M${lampX - 22},${top + 22} L${lampX + 22},${top + 22} L${lampX + 230},${GROUND_Y} L${lampX - 230},${GROUND_Y} Z`}
      fill={`url(#${id}Cone)`}
    />
    <Glow x={lampX} y={top + 20} r={420} color={COLORS.lampLight} frame={frame} id={`${id}Glow`} />
    <path d={wobblyRect(x - 9, top - 10, 18, GROUND_Y - top + 10, frame, 21)} fill={COLORS.propFill} {...outline} />
    <path d={wobblyRect(Math.min(x, lampX) - 6, top - 14, Math.abs(x - lampX) + 12, 12, frame, 22)} fill={COLORS.propFill} {...outline} />
    <path d={wobblyPolygon([[lampX - 30, top + 10], [lampX + 30, top + 10], [lampX + 18, top - 6], [lampX - 18, top - 6]], frame, 23)} fill={COLORS.propFill} {...outline} />
    <ellipse cx={lampX} cy={top + 14} rx={20} ry={7} fill="#FFF3D0" />
  </>
);

// Sac de frappe suspendu ; angle en degrés (positif = poussé vers la droite)
export const PunchingBag: React.FC<{ x: number; top: number; angle: number; frame: number }> = ({ x, top, angle, frame }) => (
  <g transform={`rotate(${-angle} ${x} ${top})`}>
    <path d={wobblyLine(x, top, x, top + 170, frame, 31, 1)} stroke={COLORS.outline} strokeWidth={4} fill="none" />
    <path d={wobblyRect(x - 58, top + 170, 116, 270, frame, 32, 3)} fill={COLORS.propFill} {...outline} />
    <path d={wobblyLine(x - 58, top + 215, x + 58, top + 215, frame, 33, 1.5)} stroke={COLORS.outline} strokeWidth={2} fill="none" />
    <path d={wobblyLine(x - 58, top + 395, x + 58, top + 395, frame, 34, 1.5)} stroke={COLORS.outline} strokeWidth={2} fill="none" />
  </g>
);

// Ville en silhouette qui défile (offset en px). Deux plans pour la parallaxe.
const TILE = 1500;
const buildings = (seed: number, minH: number, maxH: number) => {
  const list: { x: number; w: number; h: number }[] = [];
  let x = 0;
  let i = 0;
  while (x < TILE) {
    const w = Math.min(120 + hash(seed, i) * 160, TILE - x);
    list.push({ x, w, h: minH + hash(seed + 1, i) * (maxH - minH) });
    x += w + 10 + hash(seed + 2, i) * 40;
    i++;
  }
  return list;
};
const NEAR = buildings(1, 260, 620);
const FAR = buildings(5, 400, 820);

export const City: React.FC<{ offset: number; frame: number }> = ({ offset, frame }) => {
  const layer = (list: typeof NEAR, off: number, fill: string, seed: number, windows: boolean) => {
    const base = -(((off % TILE) + TILE) % TILE);
    return [0, 1].map((rep) => (
      <g key={rep} transform={`translate(${base + rep * TILE},0)`}>
        {list.map((b, i) => (
          <g key={i}>
            <path d={wobblyRect(b.x, GROUND_Y - b.h, b.w, b.h, frame, seed + i, 2)} fill={fill} stroke={COLORS.outline} strokeWidth={2} strokeOpacity={windows ? 0.8 : 0.35} />
            {windows &&
              Array.from({ length: Math.floor(b.h / 90) }).map((_, r) =>
                Array.from({ length: Math.floor(b.w / 60) }).map((__, c) => {
                  const lit = hash(seed, i, r, c) > 0.82;
                  return (
                    <rect key={`${r}-${c}`} x={b.x + 18 + c * 60} y={GROUND_Y - b.h + 30 + r * 90} width={22} height={34}
                      fill={lit ? COLORS.lampLight : "#1A1A22"} opacity={lit ? 0.55 : 1} />
                  );
                }),
              )}
          </g>
        ))}
      </g>
    ));
  };
  return (
    <>
      {layer(FAR, offset * 0.35, "#0C0C12", 100, false)}
      {layer(NEAR, offset, COLORS.propFill, 200, true)}
    </>
  );
};

// Lignes de vitesse autour d'un point d'impact. age = images depuis l'impact.
export const SpeedLines: React.FC<{ x: number; y: number; age: number; count?: number; seed?: number }> = ({
  x, y, age, count = 22, seed = 0,
}) => {
  if (age < 0 || age > 18) return null;
  const o = 1 - age / 18;
  return (
    <g opacity={o}>
      {Array.from({ length: count }).map((_, i) => {
        const a = (i / count) * Math.PI * 2 + hash(seed, i) * 0.25;
        const r1 = 90 + hash(seed + 1, i) * 60 + age * 9;
        const r2 = r1 + 80 + hash(seed + 2, i) * 160;
        return (
          <line key={i} x1={x + Math.cos(a) * r1} y1={y + Math.sin(a) * r1} x2={x + Math.cos(a) * r2} y2={y + Math.sin(a) * r2}
            stroke="#FFFFFF" strokeWidth={3 + hash(seed + 3, i) * 5} strokeLinecap="round" />
        );
      })}
    </g>
  );
};
