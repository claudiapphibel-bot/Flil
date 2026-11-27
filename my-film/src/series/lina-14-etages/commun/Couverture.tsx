import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { Letterbox } from "../../../components/Overlay";
import { Etalonnage, TEXTE_FONT, TITRE_FONT, ZONE } from "../../../components/fruit/Cinema";

// Couverture TikTok d'un épisode (image fixe 1080 × 1920). Dans la grille du profil, TikTok
// montre le centre de l'image (environ y 240–1680) : les textes restent dans cette zone.
const ACCENT = "#2EC4B6";

export const Couverture: React.FC<{ fond: string; episode: number; question: string; sous?: string }> = ({ fond, episode, question, sous = "Tu choisis la suite · A ou B" }) => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Img src={staticFile(fond)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 62%, rgba(0,0,0,0.8) 88%)" }} />
    <Etalonnage />
    <div style={{ position: "absolute", top: 280, left: ZONE.gauche, width: ZONE.largeur, textAlign: "center" }}>
      <div style={{ fontFamily: TEXTE_FONT, fontWeight: 600, fontSize: 34, letterSpacing: 8, color: ACCENT, textTransform: "uppercase" }}>Épisode {episode}</div>
      <div style={{ marginTop: 14, fontFamily: TITRE_FONT, fontWeight: 700, fontSize: 80, color: "#fff", letterSpacing: 2, whiteSpace: "nowrap", textShadow: "0 6px 30px rgba(0,0,0,0.85)" }}>LINA — LES 14 ÉTAGES</div>
    </div>
    <div style={{ position: "absolute", top: 1380, left: ZONE.gauche, width: ZONE.largeur, textAlign: "center" }}>
      <div style={{ fontFamily: TITRE_FONT, fontWeight: 600, fontStyle: "italic", fontSize: 82, color: "#fff", textShadow: "0 6px 30px rgba(0,0,0,0.9)" }}>{question}</div>
      <div style={{ marginTop: 18, fontFamily: TEXTE_FONT, fontWeight: 600, fontSize: 30, letterSpacing: 5, color: "rgba(255,255,255,0.85)", textTransform: "uppercase" }}>{sous}</div>
    </div>
    <Letterbox />
  </AbsoluteFill>
);
