import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Video } from "@remotion/media";
import { HEIGHT, WIDTH } from "../theme";

// Plan fixe animé à partir d'une image (générée ou non) : travelling lent,
// respiration, léger flottement de caméra et bouche synchronisée sur une voix.

export type Bouche = { cx: number; cy: number; rx: number; ry: number };
export type Voix = { env: number[]; debut: number; fin: number; duree: number };

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const IMG_RATIO = 1935 / 1080; // images 1080 × 1935 (9:16 de Higgsfield)

type Props = {
  src: string; // chemin dans public/
  video?: string; // clip animé (Higgsfield) qui remplace l'image ; muet, le son vient du montage
  sonVideo?: number; // volume du son du clip (voix Seedance) ; absent = muet
  duree: number; // durée du plan en images
  zoom?: [number, number]; // zoom au début et à la fin du plan
  focus?: [number, number]; // point visé par le zoom (0–1)
  easing?: (t: number) => number;
  miroir?: boolean;
  vivant?: boolean; // respiration + flottement (désactiver pour l'image de boucle)
  bouche?: { srcParle: string; zone: Bouche; voix: Voix; debut: number }[]; // debut = image où démarre l'audio
  secousse?: number; // image d'un choc (secousse de caméra)
  entree?: boolean; // « snap » d'entrée : le plan arrive légèrement zoomé puis se pose (dynamisme)
  coups?: number[]; // images où la caméra donne un petit coup de zoom (début de chaque réplique)
  children?: React.ReactNode; // éléments dessinés par-dessus, dans le repère de l'image
};

const boucheOuverte = (voix: Voix, f: number) => {
  for (let k = -2; k <= 1; k++) {
    const v = voix.env[f + k];
    if (v !== undefined && v > 0.28) return true;
  }
  return false;
};

export const Plan: React.FC<Props> = ({
  src, video, sonVideo, duree, zoom = [1, 1.04], focus = [0.5, 0.5], easing = Easing.inOut(Easing.sin), miroir, vivant = true, bouche = [], secousse, entree = true, coups = [], children,
}) => {
  const f = useCurrentFrame();
  const z = interpolate(f, [0, duree], zoom, { ...clamp, easing });
  const respire = vivant ? 1 + 0.004 * Math.sin(f / 38) : 1;
  const snap = entree ? interpolate(f, [0, 12], [1.07, 1], { ...clamp, easing: Easing.out(Easing.cubic) }) : 1;
  const punch = coups.reduce((acc, c) => acc + interpolate(f, [c, c + 7], [0, 0.035], { ...clamp, easing: Easing.out(Easing.back(2)) }), 0);
  const fx = vivant ? 3 * Math.sin(f / 71) : 0;
  const fy = vivant ? 2 * Math.sin(f / 53 + 1) : 0;
  let sx = 0, sy = 0;
  if (secousse !== undefined && f >= secousse && f < secousse + 24) {
    const k = 1 - (f - secousse) / 24;
    sx = Math.sin(f * 2.7) * 18 * k;
    sy = Math.cos(f * 3.1) * 14 * k;
  }
  const h = WIDTH * IMG_RATIO;
  const top = (HEIGHT - h) / 2;
  const actif = bouche.find((b) => f >= b.debut && f < b.debut + b.voix.env.length && boucheOuverte(b.voix, f - b.debut));
  const image = (s: string, style?: React.CSSProperties) => (
    <Img src={staticFile(s)} style={{ position: "absolute", left: 0, top, width: WIDTH, height: h, ...style }} />
  );
  return (
    <AbsoluteFill style={{ background: "#000", overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          scale: String(z * respire * snap * (1 + punch)),
          transformOrigin: `${focus[0] * WIDTH}px ${top + focus[1] * h}px`,
          translate: `${fx + sx}px ${fy + sy}px`,
        }}
      >
        <AbsoluteFill style={{ scale: miroir ? "-1 1" : undefined }}>
          {video ? (
            <Video src={staticFile(video)} muted={sonVideo === undefined} volume={sonVideo ?? 0} style={{ position: "absolute", left: 0, top, width: WIDTH, height: h, objectFit: "cover" }} />
          ) : (
            image(src)
          )}
          {(video ? [] : bouche).map((b) => (
            <React.Fragment key={b.srcParle + b.debut}>
              {image(b.srcParle, {
                opacity: actif === b ? 1 : 0,
                maskImage: `radial-gradient(ellipse ${b.zone.rx * 100}% ${b.zone.ry * 100}% at ${b.zone.cx * 100}% ${b.zone.cy * 100}%, #000 55%, transparent 100%)`,
                WebkitMaskImage: `radial-gradient(ellipse ${b.zone.rx * 100}% ${b.zone.ry * 100}% at ${b.zone.cx * 100}% ${b.zone.cy * 100}%, #000 55%, transparent 100%)`,
              })}
            </React.Fragment>
          ))}
          <div style={{ position: "absolute", left: 0, top, width: WIDTH, height: h }}>{children}</div>
        </AbsoluteFill>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
