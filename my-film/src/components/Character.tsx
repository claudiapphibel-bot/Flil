import React from "react";
import { COLORS } from "./theme";

// Pose du personnage. Angles en degrés : 0 = vers le bas, positif = vers l'avant (droite).
export type Pose = {
  armF: number; elbowF: number; armB: number; elbowB: number;
  legF: number; kneeF: number; legB: number; kneeB: number;
  squash: number; // >1 étiré vers le haut, <1 écrasé
  lean: number; // inclinaison du corps (degrés, positif = vers l'avant)
  bob: number; // décalage vertical du corps (px, négatif = vers le haut)
  brow: number; // -1 triste … 0 neutre … 1 en colère / déterminé
  browY: number; // hauteur des sourcils (négatif = relevés)
  mouth: number; // -1 moue … 1 sourire
  blink: number; // 0 ouvert … 1 fermé
};

export const IDLE: Pose = {
  armF: 8, elbowF: 6, armB: -6, elbowB: 4,
  legF: 6, kneeF: 0, legB: -6, kneeB: 0,
  squash: 1, lean: 0, bob: 0, brow: 0, browY: 0, mouth: 0, blink: 0,
};

const rad = (d: number) => (d * Math.PI) / 180;
const limb = (x: number, y: number, a: number, bend: number, len: number) => {
  const ex = x + Math.sin(rad(a)) * len * 0.5;
  const ey = y + Math.cos(rad(a)) * len * 0.5;
  const hx = ex + Math.sin(rad(a + bend)) * len * 0.5;
  const hy = ey + Math.cos(rad(a + bend)) * len * 0.5;
  return { d: `M${x},${y} L${ex},${ey} L${hx},${hy}`, hand: [hx, hy] as [number, number] };
};

// Squelette (coordonnées locales, pieds en 0,0, regard vers la droite)
const HIP: [number, number] = [0, -125];
const SHOULDER: [number, number] = [4, -200];
const HEAD = { cx: 6, cy: -300, r: 82 };
const LIMB_W = 11;

type Props = {
  x: number;
  y: number;
  scale?: number;
  pose: Pose;
  variant?: "hero" | "shadow";
  flip?: boolean;
  opacity?: number;
  children?: React.ReactNode; // objet tenu / porté, dessiné en coordonnées locales
};

const Silhouette: React.FC<{ pose: Pose; front: string; back: string; extra: number }> = ({ pose, front, back, extra }) => {
  const w = LIMB_W + extra * 2;
  const aB = limb(...SHOULDER, pose.armB, pose.elbowB, 150);
  const aF = limb(...SHOULDER, pose.armF, pose.elbowF, 150);
  const lB = limb(...HIP, pose.legB, pose.kneeB, 128);
  const lF = limb(...HIP, pose.legF, pose.kneeF, 128);
  const line = (d: string, c: string) => (
    <path d={d} stroke={c} strokeWidth={w} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  );
  return (
    <>
      {line(aB.d, back)}
      {line(lB.d, back)}
      <ellipse cx={0} cy={-172} rx={40 + extra} ry={58 + extra} fill={front} />
      {line(lF.d, front)}
      <circle cx={HEAD.cx} cy={HEAD.cy} r={HEAD.r + extra} fill={front} />
      {line(aF.d, front)}
    </>
  );
};

export const handPosition = (pose: Pose) => limb(...SHOULDER, pose.armF, pose.elbowF, 150).hand;

export const Character: React.FC<Props> = ({ x, y, scale = 1, pose, variant = "hero", flip, opacity = 1, children }) => {
  const sx = (scale / Math.sqrt(pose.squash)) * (flip ? -1 : 1);
  const sy = scale * pose.squash;
  const shadow = variant === "shadow";
  const browL = -338 + pose.browY - pose.brow * 9;
  const browR = -338 + pose.browY + pose.brow * 9;
  const eyeRy = 8 * (1 - pose.blink) + 1;
  return (
    <g transform={`translate(${x},${y}) scale(${sx},${sy}) rotate(${pose.lean}) translate(0,${pose.bob})`} opacity={opacity}>
      {shadow ? (
        <>
          <g filter="url(#shadowGlow)">
            <Silhouette pose={pose} front={COLORS.accent} back={COLORS.accent} extra={4} />
          </g>
          <Silhouette pose={pose} front="#000" back="#000" extra={0} />
          {[24, 62].map((ex) => (
            <path
              key={ex}
              d="M-15,0 Q0,-10 15,0 Q0,10 -15,0 Z"
              transform={`translate(${ex},-308) rotate(-12) scale(1,${1 - pose.blink})`}
              fill={COLORS.accent}
              filter="url(#shadowGlow)"
            />
          ))}
        </>
      ) : (
        <>
          <Silhouette pose={pose} front={COLORS.character} back={COLORS.characterBack} extra={0} />
          <ellipse cx={48} cy={-310} rx={8} ry={eyeRy} fill={COLORS.face} />
          <path d={`M24,${browL} L66,${browR}`} stroke={COLORS.face} strokeWidth={7} strokeLinecap="round" />
          <path
            d={`M42,-258 Q56,${-258 + pose.mouth * 10} 70,-258`}
            stroke={COLORS.face}
            strokeWidth={6}
            fill="none"
            strokeLinecap="round"
          />
        </>
      )}
      {children}
    </g>
  );
};

// À placer une fois dans chaque <svg> qui contient une ombre
export const ShadowDefs: React.FC<{ intensity?: number }> = ({ intensity = 1 }) => (
  <defs>
    <filter id="shadowGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation={6 * intensity} result="b" />
      <feMerge>
        <feMergeNode in="b" />
        <feMergeNode in="b" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
);
