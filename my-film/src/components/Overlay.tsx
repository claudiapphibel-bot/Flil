import React from "react";
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BAR, COLORS, FONT } from "./theme";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Fines bandes noires en haut et en bas (image utile 6:10)
export const Letterbox: React.FC = () => (
  <AbsoluteFill style={{ pointerEvents: "none" }}>
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: BAR, background: "#000" }} />
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: BAR, background: "#000" }} />
  </AbsoluteFill>
);

// Petit compteur de JOURS, en haut à gauche. `days` = liste [image, numéro du jour].
export const DayCounter: React.FC<{ days: [number, number][] }> = ({ days }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const current = [...days].reverse().find(([f]) => frame >= f);
  if (!current) return null;
  const pop = spring({ frame: frame - current[0], fps, config: { damping: 12, stiffness: 220 } });
  return (
    <div
      style={{
        position: "absolute", top: BAR + 36, left: 44, fontFamily: FONT, fontWeight: 700, fontSize: 38,
        color: COLORS.white, letterSpacing: 3, padding: "6px 16px", border: `3px solid ${COLORS.outline}`,
        borderRadius: 10, background: "rgba(10,10,15,0.7)", scale: interpolate(pop, [0, 1], [1.5, 1]), transformOrigin: "left center",
      }}
    >
      JOUR {current[1]}
    </div>
  );
};

// Nombre de répétitions affiché à l'écran. `reps` = liste [image, nombre].
export const RepCounter: React.FC<{ reps: [number, number][] }> = ({ reps }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const current = [...reps].reverse().find(([f]) => frame >= f);
  if (!current) return null;
  const pop = spring({ frame: frame - current[0], fps, config: { damping: 9, stiffness: 260 } });
  return (
    <div
      style={{
        position: "absolute", top: BAR + 30, right: 50, fontFamily: FONT, fontWeight: 700, fontSize: 84,
        color: COLORS.white, scale: interpolate(pop, [0, 1], [1.8, 1]), rotate: `${interpolate(pop, [0, 1], [-12, 0])}deg`,
        textShadow: "0 0 18px rgba(255,255,255,0.35)",
      }}
    >
      ×{current[1]}
    </div>
  );
};

// Réplique du narrateur : petite, blanche, centrée en haut, fondu. 8 mots maximum.
export const Narrator: React.FC<{ text: string; duration: number }> = ({ text, duration }) => {
  const frame = useCurrentFrame();
  if (text.split(/\s+/).length > 8) throw new Error(`Réplique du narrateur trop longue (8 mots max) : "${text}"`);
  return (
    <div
      style={{
        position: "absolute", top: BAR + 140, left: 60, right: 60, textAlign: "center", fontFamily: FONT, fontSize: 46,
        color: COLORS.white, opacity: interpolate(frame, [0, 24, duration - 24, duration], [0, 1, 1, 0], clamp),
      }}
    >
      {text}
    </div>
  );
};

// Réplique de l'ombre : couleur d'accent, à côté de l'ombre (x, y en px écran)
export const ShadowLine: React.FC<{ text: string; x: number; y: number; duration: number }> = ({ text, x, y, duration }) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: "absolute", left: x, top: y, width: 420, fontFamily: FONT, fontWeight: 700, fontSize: 50, lineHeight: 1.15,
        color: COLORS.accent, textShadow: `0 0 16px ${COLORS.accent}`,
        opacity: interpolate(frame, [0, 18, duration - 20, duration], [0, 1, 1, 0], clamp),
        translate: `${Math.sin(frame * 0.9) * 1.2}px ${interpolate(frame, [0, 30], [16, 0], { ...clamp, easing: Easing.out(Easing.cubic) })}px`,
      }}
    >
      {text}
    </div>
  );
};

// Flash blanc des coups puissants
export const Flash: React.FC<{ at: number; length?: number }> = ({ at, length = 8 }) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [at, at + 1, at + length], [0, 0.85, 0], clamp);
  if (o <= 0) return null;
  return <AbsoluteFill style={{ background: "#FFFFFF", opacity: o }} />;
};

// Caméra : zoom autour d'un point (travelling avant ou gros plan)
export const Camera: React.FC<{ zoom: number; x: number; y: number; children: React.ReactNode }> = ({ zoom, x, y, children }) => (
  <AbsoluteFill style={{ scale: String(zoom), transformOrigin: `${x}px ${y}px` }}>{children}</AbsoluteFill>
);
