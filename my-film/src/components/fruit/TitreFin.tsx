import React from "react";
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FREDOKA } from "./Interface";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const BEAT = 30;

// Titre de fin (24 battements) : lettres une par demi-battement, trait ondulé,
// ligne blanche, courte ligne d'accent, sous-titre, appel à l'action, puis sortie en ease-in.
export type Vote = { question: string; a: string; b: string; consigne: string; abonnement?: boolean };

// lettre = battements par lettre ; voteA = battement (dans le titre) où apparaît la carte de vote
export const TitreFin: React.FC<{ titre: string; sousTitre: string; accent: string; vote: Vote; lettre?: number; voteA?: number }> = ({ titre, sousTitre, accent, vote, lettre = 0.5, voteA = 12 }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lettres = Array.from(titre);
  const pas = lettre * BEAT;
  const finLettres = lettres.length * pas;
  const trait = interpolate(f, [finLettres, finLettres + BEAT], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const ligneB = interpolate(f, [finLettres + BEAT, finLettres + 1.5 * BEAT], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const ligneA = interpolate(f, [finLettres + 1.5 * BEAT, finLettres + 2 * BEAT], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const voteDebut = voteA * BEAT;
  const sortie = interpolate(f, [22 * BEAT, 24 * BEAT - 1], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) });
  const carte = spring({ frame: f - voteDebut, fps, config: { damping: 12, stiffness: 160 } });
  const ligne = (i: number) => spring({ frame: f - voteDebut - 8 - i * 10, fps, config: { damping: 12 } });
  const largeur = 900;
  const vague = Array.from({ length: 41 }, (_, i) => `${(i / 40) * largeur},${12 + Math.sin(i * 0.9) * 9}`).join(" ");
  return (
    <AbsoluteFill style={{ opacity: 1 - sortie, translate: `0 ${-260 * sortie}px` }}>
      <div style={{ position: "absolute", top: 330, left: 0, right: 0, textAlign: "center", fontFamily: FREDOKA }}>
        <div style={{ fontWeight: 700, fontSize: 92, color: "#fff", letterSpacing: 2, WebkitTextStroke: "6px #14101e", paintOrder: "stroke", textShadow: "0 8px 30px rgba(0,0,0,0.7)" }}>
          {lettres.map((l, i) => {
            const s = spring({ frame: f - i * pas, fps, config: { damping: 10, stiffness: 240 } });
            return <span key={i} style={{ display: "inline-block", opacity: f >= i * pas ? 1 : 0, scale: String(interpolate(s, [0, 1], [1.8, 1])), translate: `0 ${interpolate(s, [0, 1], [-30, 0])}px`, whiteSpace: "pre" }}>{l}</span>;
          })}
        </div>
        <svg width={largeur} height={28} style={{ display: "block", margin: "6px auto 0" }}>
          <polyline points={vague} fill="none" stroke={accent} strokeWidth={9} strokeLinecap="round" strokeDasharray={1400} strokeDashoffset={1400 * (1 - trait)} style={{ filter: `drop-shadow(0 0 8px ${accent})` }} />
        </svg>
        <div style={{ width: 620 * ligneB, height: 6, background: "#fff", margin: "26px auto 0", borderRadius: 3 }} />
        <div style={{ width: 160 * ligneA, height: 6, background: accent, margin: "14px auto 0", borderRadius: 3 }} />
        <div style={{ marginTop: 22, fontWeight: 500, fontSize: 44, color: "#fff", opacity: ligneA, textShadow: "0 4px 16px rgba(0,0,0,0.8)" }}>{sousTitre}</div>
      </div>
      <div style={{
        position: "absolute", left: 70, right: 70, top: 1040, padding: "34px 40px", borderRadius: 40, background: "rgba(14,12,26,0.82)",
        border: `4px solid ${accent}`, boxShadow: `0 0 40px ${accent}55`, fontFamily: FREDOKA, color: "#fff",
        opacity: f >= voteDebut ? 1 : 0, scale: String(interpolate(carte, [0, 1], [0.6, 1])),
      }}>
        <div style={{ fontWeight: 700, fontSize: 54, textAlign: "center", color: accent, marginBottom: 22 }}>{vote.question}</div>
        {[["A", vote.a], ["B", vote.b]].map(([k, t], i) => (
          <div key={k} style={{ display: "flex", alignItems: "center", gap: 22, margin: "16px 0", opacity: ligne(i), translate: `${interpolate(ligne(i), [0, 1], [-80, 0])}px 0` }}>
            <div style={{ width: 84, height: 84, borderRadius: 42, background: accent, color: "#0e0c1a", fontWeight: 700, fontSize: 54, display: "flex", justifyContent: "center", alignItems: "center" }}>{k}</div>
            <div style={{ fontWeight: 500, fontSize: 46 }}>{t}</div>
          </div>
        ))}
        <div style={{ textAlign: "center", fontWeight: 500, fontSize: 38, marginTop: 20, opacity: ligne(2) }}>{vote.consigne}</div>
        {vote.abonnement ? (
          <div style={{ display: "flex", justifyContent: "center", gap: 28, marginTop: 24, opacity: ligne(3), scale: String(interpolate(ligne(3), [0, 1], [0.7, 1])) }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, background: "#ff3b5c", borderRadius: 40, padding: "12px 26px", fontWeight: 700, fontSize: 38 }}>
              <svg width={40} height={36} viewBox="0 0 24 22"><path d="M12 21.6 10.3 20C4.2 14.5 0 10.7 0 6.2 0 2.7 2.7 0 6.2 0c2 0 3.9.9 5.8 2.4C13.9.9 15.8 0 17.8 0 21.3 0 24 2.7 24 6.2c0 4.5-4.2 8.3-10.3 13.8z" fill="#fff" /></svg>
              LIKE
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, background: accent, color: "#0e0c1a", borderRadius: 40, padding: "12px 26px", fontWeight: 700, fontSize: 38 }}>
              <svg width={34} height={38} viewBox="0 0 20 22"><path d="M10 22a2.5 2.5 0 0 0 2.5-2.5h-5A2.5 2.5 0 0 0 10 22zm7.5-6.5V10c0-3.6-2-6.3-5.5-7.1V2a2 2 0 0 0-4 0v.9C4.5 3.7 2.5 6.4 2.5 10v5.5L0 18v1h20v-1z" fill="#0e0c1a" /></svg>
              ABONNE-TOI
            </div>
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};
