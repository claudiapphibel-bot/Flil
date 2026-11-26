import React from "react";
import { Audio } from "@remotion/media";
import { AbsoluteFill, Easing, Sequence, staticFile } from "remotion";
import { Letterbox } from "../../../components/Overlay";
import { Plan } from "../../../components/fruit/Plan";
import { Accroche, Etalonnage, TitreSobre } from "../../../components/fruit/Cinema";

// Lina — Les 14 étages · Épisode 1, version 2 : scènes Seedance 2.5 (animation, voix et lèvres
// générées ensemble). Montage « cinéma » sobre : coupes franches, étalonnage léger (vignettage, grain),
// aucun effet gadget, pas de sous-titres. Remotion : accroche, enchaînement, musique, titre, vote, narrateur.
// 120 BPM : 1 battement = 30 images.
const B = 30;
const ACCENT = "#2EC4B6";
const SC = (n: number) => `ia/lina-14-etages/v2/scene${n}.mp4`;
const IMG = (n: string) => `ia/lina-14-etages/plans/${n}.jpg`;
const FENETRE: [number, number] = [0.546, 0.333];

// Scènes dans l'ordre, avec leur durée en secondes. prolonge = raccord continu avec la précédente.
export const AVEC_SCENE_3 = true;
const LISTE: { n: number; duree: number; prolonge?: boolean }[] = [
  { n: 1, duree: 8 },
  { n: 2, duree: 10 },
  ...(AVEC_SCENE_3 ? [{ n: 3, duree: 6 }] : []),
  { n: 4, duree: 12 },
  { n: 5, duree: 8, prolonge: true },
  { n: 6, duree: 10 },
  { n: 7, duree: 8, prolonge: true },
  { n: 8, duree: 10, prolonge: true },
];
const INTRO = 4; // battements
const SCENES = LISTE.reduce<{ n: number; b: number; duree: number; prolonge?: boolean }[]>((acc, s) => {
  const b = acc.length ? acc[acc.length - 1].b + acc[acc.length - 1].duree * 2 : INTRO;
  return [...acc, { ...s, b }];
}, []);
const FIN_SCENES = SCENES[SCENES.length - 1].b + SCENES[SCENES.length - 1].duree * 2;
const TITRE = FIN_SCENES + 4;
export const TOTAL_BATTEMENTS_V2 = TITRE + 24;

export const Episode01v2: React.FC = () => {
  const s4 = SCENES.find((s) => s.n === 4)!;
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      {/* Accroche : l'immeuble, lente avancée vers la seule fenêtre allumée (image de boucle) */}
      <Sequence from={0} durationInFrames={INTRO * B} name="Accroche · immeuble">
        <Plan src={IMG("01-immeuble")} duree={INTRO * B} zoom={[1, 1.25]} focus={FENETRE} vivant={false} entree={false} easing={Easing.inOut(Easing.cubic)} />
      </Sequence>

      {/* Scènes Seedance, coupes franches, son des voix conservé */}
      {SCENES.map((s) => (
        <Sequence key={s.n} from={s.b * B} durationInFrames={s.duree * 2 * B} name={`Scène ${s.n}`}>
          <Plan src={IMG("01-immeuble")} video={SC(s.n)} sonVideo={1} duree={s.duree * 2 * B} zoom={[1, 1]} vivant={false} entree={false} />
        </Sequence>
      ))}
      {/* Scène 4 : flou discret sur le texte « UP / LOBBY 4 » du panneau, pendant les plans du bouton */}
      {[[0, 1.2], [3.0, 6.0]].map(([a, b]) => (
        <Sequence key={a} from={s4.b * B + Math.round(a * 60)} durationInFrames={Math.round((b - a) * 60)} name="Flou texte panneau" layout="none">
          <div style={{ position: "absolute", left: "8%", top: 0, width: "62%", height: "38%", backdropFilter: "blur(22px)", WebkitBackdropFilter: "blur(22px)", maskImage: "radial-gradient(ellipse 60% 60% at 50% 45%, #000 60%, transparent 100%)", WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 50% 45%, #000 60%, transparent 100%)" }} />
        </Sequence>
      ))}

      {/* Retour à l'immeuble (même image qu'au début), puis titre et vote */}
      <Sequence from={FIN_SCENES * B} durationInFrames={(TOTAL_BATTEMENTS_V2 - FIN_SCENES) * B} name="Retour · immeuble">
        <Plan src={IMG("01-immeuble")} duree={4 * B} zoom={[1.25, 1]} focus={FENETRE} vivant={false} entree={false} easing={Easing.inOut(Easing.cubic)} />
      </Sequence>

      <Etalonnage />

      {/* Phrase d'accroche (zone sûre TikTok), pendant la première avancée vers la fenêtre */}
      <Sequence from={0} durationInFrames={INTRO * B} name="Accroche · texte">
        <Accroche ligne={"Il est 4 h 44.\nCet immeuble n'a que 14 étages."} sousLigne="Une histoire dont tu choisis la suite" accent={ACCENT} duree={INTRO * B} />
      </Sequence>

      <Sequence from={TITRE * B} durationInFrames={24 * B} name="Titre de fin">
        <TitreSobre
          titre="LINA — LES 14 ÉTAGES"
          sousTitre="Épisode 1 · 14ᵉ étage"
          accent={ACCENT}
          voteA={1}
          vote={{ question: "Qui doit-elle croire ?", a: "Ouvrir la porte du 15ᵉ", b: "Suivre Madame Iris", consigne: "Réponds A ou B en commentaire\nLike · abonne-toi", suite: "Épisode 2 · demain 19 h" }}
        />
      </Sequence>
      <Letterbox />

      {/* Son : ambiance de nuit dehors, musique discrète, narrateur sur le vote */}
      <Sequence from={0} durationInFrames={INTRO * B} layout="none" name="♪ nuit (début)">
        <Audio src={staticFile("sfx/ambiance-nuit.wav")} volume={0.3} />
      </Sequence>
      <Sequence from={FIN_SCENES * B} layout="none" name="♪ nuit (fin)">
        <Audio src={staticFile("sfx/ambiance-nuit.wav")} volume={0.3} />
      </Sequence>
      <Sequence from={0} durationInFrames={TOTAL_BATTEMENTS_V2 * B} layout="none" name="♪ musique">
        <Audio src={staticFile("ia/lina-14-etages/v2/musique-cinema.mp3")} volume={0.12} />
      </Sequence>
      <Sequence from={TITRE * B} layout="none" name="🎙 narrateur">
        <Audio src={staticFile("ia/lina-14-etages/v2/narrateur-tiktok.mp3")} volume={1} />
      </Sequence>
    </AbsoluteFill>
  );
};
