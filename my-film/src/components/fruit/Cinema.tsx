import React from "react";
import { AbsoluteFill, Easing, interpolate, staticFile, useCurrentFrame } from "remotion";
import { loadFont } from "@remotion/fonts";
import { HEIGHT, WIDTH } from "../theme";

// Habillage « cinéma » : sobre, pas enfantin. Étalonnage léger (vignettage + grain),
// titre de fin élégant, carte de vote discrète.
export const TITRE_FONT = "Playfair Display";
export const TEXTE_FONT = "Inter";
loadFont({ family: TITRE_FONT, url: staticFile("fonts/playfair-display-latin-600-normal.woff2"), weight: "600" });
loadFont({ family: TITRE_FONT, url: staticFile("fonts/playfair-display-latin-700-normal.woff2"), weight: "700" });
loadFont({ family: TEXTE_FONT, url: staticFile("fonts/inter-latin-400-normal.woff2"), weight: "400" });
loadFont({ family: TEXTE_FONT, url: staticFile("fonts/inter-latin-600-normal.woff2"), weight: "600" });

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const BEAT = 30;

// Vignettage doux + grain de film léger (le grain change à chaque image)
export const Etalonnage: React.FC<{ grain?: number }> = ({ grain = 0.05 }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <AbsoluteFill style={{ background: "radial-gradient(ellipse 85% 75% at 50% 48%, transparent 55%, rgba(0,0,0,0.45) 100%)" }} />
      <svg width={WIDTH} height={HEIGHT} style={{ position: "absolute", opacity: grain, mixBlendMode: "overlay" }}>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={f % 60} stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </AbsoluteFill>
  );
};

export type VoteSobre = { question: string; a: string; b: string; consigne: string };

// Titre de fin sobre (24 battements) : lettres en fondu, trait fin ondulé, lignes, vote, sortie en ease-in
export const TitreSobre: React.FC<{ titre: string; sousTitre: string; accent: string; vote: VoteSobre; voteA?: number }> = ({ titre, sousTitre, accent, vote, voteA = 1 }) => {
  const f = useCurrentFrame();
  const lettres = Array.from(titre);
  const pas = BEAT / 4;
  const finLettres = lettres.length * pas;
  const ease = { ...clamp, easing: Easing.out(Easing.cubic) };
  const trait = interpolate(f, [finLettres, finLettres + BEAT], [0, 1], ease);
  const ligneB = interpolate(f, [finLettres + BEAT, finLettres + 1.5 * BEAT], [0, 1], ease);
  const ligneA = interpolate(f, [finLettres + 1.5 * BEAT, finLettres + 2 * BEAT], [0, 1], ease);
  const sortie = interpolate(f, [22 * BEAT, 24 * BEAT - 1], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) });
  const carte = interpolate(f, [voteA * BEAT, voteA * BEAT + 24], [0, 1], ease);
  const ligne = (i: number) => interpolate(f, [voteA * BEAT + 12 + i * 12, voteA * BEAT + 30 + i * 12], [0, 1], ease);
  const largeur = 760;
  const vague = Array.from({ length: 41 }, (_, i) => `${(i / 40) * largeur},${8 + Math.sin(i * 0.8) * 4}`).join(" ");
  return (
    <AbsoluteFill style={{ opacity: 1 - sortie }}>
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 45%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.6) 100%)", opacity: carte }} />
      <div style={{ position: "absolute", top: 300, left: 0, right: 0, textAlign: "center" }}>
        <div style={{ fontFamily: TITRE_FONT, fontWeight: 700, fontSize: 84, color: "#fff", letterSpacing: 3, textShadow: "0 6px 30px rgba(0,0,0,0.8)" }}>
          {lettres.map((l, i) => (
            <span key={i} style={{ opacity: interpolate(f, [i * pas, i * pas + 12], [0, 1], clamp), whiteSpace: "pre" }}>{l}</span>
          ))}
        </div>
        <svg width={largeur} height={18} style={{ display: "block", margin: "10px auto 0" }}>
          <polyline points={vague} fill="none" stroke={accent} strokeWidth={3} strokeLinecap="round" strokeDasharray={1000} strokeDashoffset={1000 * (1 - trait)} />
        </svg>
        <div style={{ width: 420 * ligneB, height: 2, background: "rgba(255,255,255,0.9)", margin: "22px auto 0" }} />
        <div style={{ width: 90 * ligneA, height: 2, background: accent, margin: "12px auto 0" }} />
        <div style={{ marginTop: 22, fontFamily: TEXTE_FONT, fontWeight: 400, fontSize: 34, letterSpacing: 6, color: "rgba(255,255,255,0.85)", opacity: ligneA, textTransform: "uppercase" }}>{sousTitre}</div>
      </div>
      <div style={{ position: "absolute", left: 110, right: 110, top: 1080, fontFamily: TEXTE_FONT, color: "#fff", opacity: carte, translate: `0 ${(1 - carte) * 30}px` }}>
        <div style={{ fontFamily: TITRE_FONT, fontWeight: 600, fontSize: 52, textAlign: "center", marginBottom: 34, fontStyle: "italic" }}>{vote.question}</div>
        {[["A", vote.a], ["B", vote.b]].map(([k, t], i) => (
          <div key={k} style={{ display: "flex", alignItems: "center", gap: 26, margin: "20px 0", opacity: ligne(i) }}>
            <div style={{ width: 70, height: 70, borderRadius: 35, border: `2px solid ${accent}`, color: "#fff", fontWeight: 600, fontSize: 34, display: "flex", justifyContent: "center", alignItems: "center" }}>{k}</div>
            <div style={{ fontWeight: 400, fontSize: 40 }}>{t}</div>
          </div>
        ))}
        <div style={{ textAlign: "center", fontWeight: 400, fontSize: 30, marginTop: 34, letterSpacing: 1, color: "rgba(255,255,255,0.8)", opacity: ligne(2) }}>{vote.consigne}</div>
      </div>
    </AbsoluteFill>
  );
};
