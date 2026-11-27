import React from "react";
import { Audio } from "@remotion/media";
import { AbsoluteFill, Easing, Img, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Letterbox } from "../../../components/Overlay";
import { Plan } from "../../../components/fruit/Plan";
import { Accroche, Etalonnage, TEXTE_FONT, TitreSobre } from "../../../components/fruit/Cinema";

// Lina — Les 14 étages · Épisode 3 (12ᵉ étage) : « Le fil ». Format 30 s (règles ACCROCHE, DYNAMISME).
// 120 BPM : 1 battement = 30 images.
const B = 30;
const ACCENT = "#2EC4B6";
const SC = (n: number) => `ia/lina-14-etages/ep03/scene${n}.mp4`;
const IMAGE_ACCROCHE = "ia/lina-14-etages/ep03/accroche-debut.jpg"; // 1re image de l'accroche = image de boucle
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const ACCROCHE = 4; // battements
const S1 = { b: ACCROCHE, duree: 19 }; // 9,5 s : la scène 1 s'arrête après « tu restes ici. »
const S2 = { b: S1.b + S1.duree, duree: 24 }; // 12 s
const TITRE = S2.b + S2.duree;
export const TOTAL_BATTEMENTS_EP03 = TITRE + 12;

// Image figée de l'accroche, posée exactement comme la vidéo (même cadre, objectFit cover)
const ImageBoucle: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Img src={staticFile(IMAGE_ACCROCHE)} style={{ position: "absolute", left: 0, top: (1920 - 1935) / 2, width: 1080, height: 1935, objectFit: "cover" }} />
  </AbsoluteFill>
);

// Petit encart « Vous avez choisi A », après l'accroche
const Encart: React.FC<{ texte: string; duree: number }> = ({ texte, duree }) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [0, 10, duree - 12, duree], [0, 1, 1, 0], clamp);
  return (
    <div style={{ position: "absolute", top: 170, left: 0, width: 1080, display: "flex", justifyContent: "center", opacity: o }}>
      <div style={{ marginRight: 60, padding: "12px 28px", borderRadius: 40, background: "rgba(8,10,18,0.6)", fontFamily: TEXTE_FONT, fontWeight: 600, fontSize: 28, letterSpacing: 3, textTransform: "uppercase", color: "#fff" }}>
        {texte}
      </div>
    </div>
  );
};

// Musique très discrète (règle SON)
const volumeMusique = (f: number) =>
  interpolate(f, [0, ACCROCHE * B, TITRE * B, TITRE * B + 15], [0.05, 0.035, 0.035, 0.04], clamp);

export const Episode03: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      {/* Accroche (2 s) : le fil qui casse (extrait de la scène 1, ralenti, muet) + voix de l'Autre */}
      <Sequence from={0} durationInFrames={ACCROCHE * B} name="Accroche · le fil casse">
        <Plan src={IMAGE_ACCROCHE} video={SC(1)} debutVideo={255} vitesse={0.625} duree={ACCROCHE * B} zoom={[1, 1.06]} vivant={false} entree={false} easing={Easing.out(Easing.cubic)} />
      </Sequence>
      <Sequence from={0} durationInFrames={2} name="Image de boucle (début)">
        <ImageBoucle />
      </Sequence>

      <Sequence from={S1.b * B} durationInFrames={S1.duree * B} name="Scène 1 · Départ">
        <Plan src={IMAGE_ACCROCHE} video={SC(1)} sonVideo={1} duree={S1.duree * B} zoom={[1, 1]} vivant={false} entree={false} />
      </Sequence>
      <Sequence from={S2.b * B} durationInFrames={S2.duree * B} name="Scène 2 · Les miroirs">
        <Plan src={IMAGE_ACCROCHE} video={SC(2)} sonVideo={1} duree={S2.duree * B} zoom={[1, 1]} vivant={false} entree={false} />
      </Sequence>

      {/* Fin : retour à l'image de l'accroche, figée, sous le titre et le vote (boucle) */}
      <Sequence from={TITRE * B} durationInFrames={12 * B} name="Image de boucle (fin)">
        <ImageBoucle />
      </Sequence>

      <Etalonnage />

      <Sequence from={0} durationInFrames={ACCROCHE * B} name="Accroche · texte">
        <Accroche ligne={"Si ce fil casse,\nelle disparaît."} accent={ACCENT} duree={ACCROCHE * B} />
      </Sequence>
      <Sequence from={(S1.b + 1) * B} durationInFrames={5 * B} name="Encart vote">
        <Encart texte="Vous avez choisi A" duree={5 * B} />
      </Sequence>

      <Sequence from={TITRE * B} durationInFrames={12 * B} name="Titre et vote">
        <TitreSobre
          duree={12}
          titre="LINA — LES 14 ÉTAGES"
          sousTitre="Épisode 3 · 12ᵉ étage"
          accent={ACCENT}
          voteA={1}
          vote={{ question: "Team Noé ou l'Autre ?", a: "Fuir avec Noé", b: "Le miroir, avec l'Autre", consigne: "Réponds A ou B en commentaire\nLike · abonne-toi", suite: "Épisode 4 · demain 19 h" }}
        />
      </Sequence>
      <Letterbox />

      {/* Son */}
      <Sequence from={6} durationInFrames={ACCROCHE * B - 6} layout="none" name="🎙 accroche : « S'il casse avant le hall, tu restes ici. »">
        <Audio src={staticFile(SC(1))} trimBefore={Math.round(7.35 * 60)} trimAfter={Math.round(9.15 * 60)} volume={1} />
      </Sequence>
      <Sequence from={0} durationInFrames={TOTAL_BATTEMENTS_EP03 * B} layout="none" name="♪ musique">
        <Audio src={staticFile("ia/lina-14-etages/v2/musique-cinema.mp3")} volume={volumeMusique} />
      </Sequence>
      <Sequence from={TITRE * B + 6} layout="none" name="🎙 narrateur">
        <Audio src={staticFile("ia/lina-14-etages/ep03/narrateur.mp3")} volume={1} />
      </Sequence>
    </AbsoluteFill>
  );
};
