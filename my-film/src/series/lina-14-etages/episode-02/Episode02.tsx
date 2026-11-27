import React from "react";
import { Audio } from "@remotion/media";
import { AbsoluteFill, Easing, Sequence, staticFile } from "remotion";
import { Letterbox } from "../../../components/Overlay";
import { Plan } from "../../../components/fruit/Plan";
import { Accroche, Etalonnage, TitreSobre } from "../../../components/fruit/Cinema";

// Lina — Les 14 étages · Épisode 2 (13ᵉ étage) : « L'appartement d'avant ».
// Scènes Seedance 2.5 (animation, voix et lèvres générées ensemble), montage cinéma sobre.
// 120 BPM : 1 battement = 30 images.
const B = 30;
const ACCENT = "#2EC4B6";
const SC = (n: number) => `ia/lina-14-etages/ep02/scene${n}.mp4`;
const IMMEUBLE = "ia/lina-14-etages/ep02/immeuble-13.jpg"; // fenêtre allumée au 13ᵉ
const FENETRE: [number, number] = [0.541, 0.376];

// Scènes dans l'ordre, durée en secondes. prolonge = raccord continu avec la précédente.
const LISTE: { n: number; duree: number; prolonge?: boolean }[] = [
  { n: 1, duree: 10 }, // escalier de service (vote B)
  { n: 2, duree: 10 }, // couloir du 13ᵉ, la clé
  { n: 3, duree: 10 }, // salon du 1301
  { n: 4, duree: 10 }, // chambre, pic
  { n: 5, duree: 10, prolonge: true }, // le calendrier
];
const INTRO = 6; // battements
const SCENES = LISTE.reduce<{ n: number; b: number; duree: number; prolonge?: boolean }[]>((acc, s) => {
  const b = acc.length ? acc[acc.length - 1].b + acc[acc.length - 1].duree * 2 : INTRO;
  return [...acc, { ...s, b }];
}, []);
const FIN_SCENES = SCENES[SCENES.length - 1].b + SCENES[SCENES.length - 1].duree * 2;
const TITRE = FIN_SCENES + 4;
export const TOTAL_BATTEMENTS_EP02 = TITRE + 24;

export const Episode02: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      {/* Accroche : l'immeuble, lente avancée vers la fenêtre allumée du 13ᵉ (image de boucle) */}
      <Sequence from={0} durationInFrames={INTRO * B} name="Accroche · immeuble">
        <Plan src={IMMEUBLE} duree={INTRO * B} zoom={[1, 1.25]} focus={FENETRE} vivant={false} entree={false} easing={Easing.inOut(Easing.cubic)} />
      </Sequence>

      {SCENES.map((s) => (
        <Sequence key={s.n} from={s.b * B} durationInFrames={s.duree * 2 * B} name={`Scène ${s.n}`}>
          <Plan src={IMMEUBLE} video={SC(s.n)} sonVideo={1} duree={s.duree * 2 * B} zoom={[1, 1]} vivant={false} entree={false} />
        </Sequence>
      ))}

      {/* Retour à l'immeuble (même image qu'au début), puis titre et vote */}
      <Sequence from={FIN_SCENES * B} durationInFrames={(TOTAL_BATTEMENTS_EP02 - FIN_SCENES) * B} name="Retour · immeuble">
        <Plan src={IMMEUBLE} duree={4 * B} zoom={[1.25, 1]} focus={FENETRE} vivant={false} entree={false} easing={Easing.inOut(Easing.cubic)} />
      </Sequence>

      <Etalonnage />

      <Sequence from={0} durationInFrames={INTRO * B} name="Accroche · texte">
        <Accroche
          surLigne="Épisode précédent · vous avez choisi B"
          ligne={"Elle habite au 14ᵉ.\nAlors pourquoi sa clé ouvre le 13ᵉ ?"}
          sousLigne="C'est toi qui choisis la suite"
          accent={ACCENT}
          duree={INTRO * B}
        />
      </Sequence>

      <Sequence from={TITRE * B} durationInFrames={24 * B} name="Titre de fin">
        <TitreSobre
          titre="LINA — LES 14 ÉTAGES"
          sousTitre="Épisode 2 · 13ᵉ étage"
          accent={ACCENT}
          voteA={1}
          vote={{ question: "Doit-elle lire ce qui est écrit ?", a: "Décoller le papier et lire", b: "Ne pas lire, descendre au 12ᵉ", consigne: "Réponds A ou B en commentaire\nLike · abonne-toi", suite: "Épisode 3 · demain 19 h" }}
        />
      </Sequence>
      <Letterbox />

      {/* Son : ambiance de nuit dehors, musique de la série, narrateur sur le vote */}
      <Sequence from={0} durationInFrames={INTRO * B} layout="none" name="♪ nuit (début)">
        <Audio src={staticFile("sfx/ambiance-nuit.wav")} volume={0.3} />
      </Sequence>
      <Sequence from={FIN_SCENES * B} layout="none" name="♪ nuit (fin)">
        <Audio src={staticFile("sfx/ambiance-nuit.wav")} volume={0.3} />
      </Sequence>
      <Sequence from={0} durationInFrames={TOTAL_BATTEMENTS_EP02 * B} layout="none" name="♪ musique">
        <Audio src={staticFile("ia/lina-14-etages/v2/musique-cinema.mp3")} volume={0.12} />
      </Sequence>
      {/* Narrateur (12,8 s) : démarre 2 battements avant le titre pour finir avant la boucle */}
      <Sequence from={(TITRE - 2) * B} layout="none" name="🎙 narrateur">
        <Audio src={staticFile("ia/lina-14-etages/ep02/narrateur.mp3")} volume={1} />
      </Sequence>
    </AbsoluteFill>
  );
};
