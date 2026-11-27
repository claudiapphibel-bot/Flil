import React from "react";
import { AbsoluteFill, Easing, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/fonts";
import { BAR, HEIGHT, WIDTH } from "../theme";

export const FREDOKA = "Fredoka";
loadFont({ family: FREDOKA, url: staticFile("fonts/fredoka-latin-500-normal.woff2"), weight: "500" });
loadFont({ family: FREDOKA, url: staticFile("fonts/fredoka-latin-700-normal.woff2"), weight: "700" });

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Sous-titre de dialogue : bulle sombre, nom du personnage dans sa couleur,
// texte qui s'écrit mot par mot pendant que la voix parle.
export const SousTitre: React.FC<{ nom: string; couleur: string; texte: string; parole: number; duree: number }> = ({
  nom, couleur, texte, parole, duree,
}) => {
  const f = useCurrentFrame();
  const mots = texte.split(" ");
  if (mots.filter((m) => /[\p{L}\p{N}]/u.test(m)).length > 8) throw new Error(`Sous-titre trop long (8 mots max) : ${texte}`);
  const n = Math.min(mots.length, Math.floor(interpolate(f, [0, Math.max(1, parole * 0.85)], [1, mots.length + 0.999], clamp)));
  const o = interpolate(f, [0, 6, duree - 8, duree], [0, 1, 1, 0], clamp);
  const y = interpolate(f, [0, 10], [24, 0], { ...clamp, easing: Easing.out(Easing.cubic) });
  return (
    <div style={{ position: "absolute", left: 60, right: 60, bottom: BAR + 150, display: "flex", justifyContent: "center", opacity: o, translate: `0 ${y}px` }}>
      <div style={{ background: "rgba(12,12,20,0.72)", borderRadius: 28, padding: "18px 30px 22px", maxWidth: 900, fontFamily: FREDOKA }}>
        <div style={{ color: couleur, fontWeight: 700, fontSize: 30, letterSpacing: 2, marginBottom: 4 }}>{nom}</div>
        <div style={{ color: "#fff", fontWeight: 500, fontSize: 50, lineHeight: 1.18 }}>
          {mots.map((m, i) => (
            <span key={i} style={{ opacity: i < n ? 1 : 0 }}>{m}{i < mots.length - 1 ? " " : ""}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

// Mot-choc : un seul mot géant au centre, en ressort
export const MotChoc: React.FC<{ texte: string; duree: number; couleur?: string }> = ({ texte, duree, couleur = "#fff" }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: f, fps, config: { damping: 9, stiffness: 220 } });
  const o = interpolate(f, [duree - 10, duree], [1, 0], clamp);
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: o }}>
      <div style={{
        fontFamily: FREDOKA, fontWeight: 700, fontSize: 260, color: couleur, scale: String(interpolate(s, [0, 1], [2.2, 1])),
        rotate: `${interpolate(s, [0, 1], [-14, -4])}deg`, WebkitTextStroke: "10px #14101e", paintOrder: "stroke",
        textShadow: "0 12px 40px rgba(0,0,0,0.6)",
      }}>{texte}</div>
    </AbsoluteFill>
  );
};

// Afficheur d'étage façon ascenseur rétro (en haut à gauche)
export const Afficheur: React.FC<{ etage: string; duree: number }> = ({ etage, duree }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: f, fps, config: { damping: 12, stiffness: 200 } });
  const sortie = interpolate(f, [duree - 30, duree], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) });
  return (
    <div style={{
      position: "absolute", top: BAR + 36, left: 40, padding: "8px 18px", borderRadius: 14, background: "#0b0b0b",
      border: "4px solid #4a4a52", boxShadow: "0 6px 20px rgba(0,0,0,0.6)", scale: String(interpolate(s, [0, 1], [0.4, 1])),
      opacity: 1 - sortie, translate: `0 ${-120 * sortie}px`, transformOrigin: "left top",
    }}>
      <span style={{ fontFamily: "monospace", fontWeight: 700, fontSize: 64, color: "#ffb43a", textShadow: "0 0 14px #ff9a1c, 0 0 30px #ff7a00" }}>{etage}</span>
    </div>
  );
};

// Flash blanc
export const Flash: React.FC<{ duree?: number; couleur?: string }> = ({ duree = 14, couleur = "#fff" }) => {
  const f = useCurrentFrame();
  return <AbsoluteFill style={{ background: couleur, opacity: interpolate(f, [0, 2, duree], [0, 0.95, 0], clamp) }} />;
};

// Lignes de vitesse rayonnantes
export const LignesVitesse: React.FC<{ duree: number; couleur?: string }> = ({ duree, couleur = "#fff" }) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [0, 3, duree * 0.6, duree], [0, 0.9, 0.6, 0], clamp);
  const cx = WIDTH / 2, cy = HEIGHT / 2;
  return (
    <svg width={WIDTH} height={HEIGHT} style={{ position: "absolute", opacity: o }}>
      {Array.from({ length: 48 }).map((_, i) => {
        const a = (i / 48) * Math.PI * 2 + (i % 3) * 0.03;
        const r1 = 520 + ((i * 97) % 160) - f * 3;
        const r2 = 1500;
        return <line key={i} x1={cx + Math.cos(a) * r1} y1={cy + Math.sin(a) * r1} x2={cx + Math.cos(a) * r2} y2={cy + Math.sin(a) * r2}
          stroke={couleur} strokeWidth={4 + (i % 4) * 3} strokeLinecap="round" />;
      })}
    </svg>
  );
};

// Étincelles (étoiles à 4 branches) qui montent
export const Etincelles: React.FC<{ duree: number; couleur?: string; n?: number; intensite?: number }> = ({ duree, couleur = "#7ff7ee", n = 40, intensite = 1 }) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [0, 12, duree - 15, duree], [0, 1, 1, 0], clamp) * intensite;
  return (
    <svg width={WIDTH} height={HEIGHT} style={{ position: "absolute", opacity: o, mixBlendMode: "screen" }}>
      {Array.from({ length: n }).map((_, i) => {
        const x = ((i * 241) % 1000) + 40;
        const y = HEIGHT - (((i * 137 + f * (2 + (i % 5))) % (HEIGHT + 200)) - 100);
        const s = 6 + (i % 6) * 4;
        const tw = 0.5 + 0.5 * Math.sin(f / 5 + i);
        return <path key={i} d={`M${x},${y - s} L${x + s * 0.25},${y - s * 0.25} L${x + s},${y} L${x + s * 0.25},${y + s * 0.25} L${x},${y + s} L${x - s * 0.25},${y + s * 0.25} L${x - s},${y} L${x - s * 0.25},${y - s * 0.25} Z`}
          fill={couleur} opacity={tw} style={{ filter: `drop-shadow(0 0 6px ${couleur})` }} />;
      })}
    </svg>
  );
};

// Fondu (noir ou couleur) sur tout l'écran
export const Voile: React.FC<{ de: number; a: number; couleur?: string; sens?: "entree" | "sortie" }> = ({ de, a, couleur = "#000", sens = "sortie" }) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [de, a], sens === "sortie" ? [0, 1] : [1, 0], clamp);
  return <AbsoluteFill style={{ background: couleur, opacity: o }} />;
};
