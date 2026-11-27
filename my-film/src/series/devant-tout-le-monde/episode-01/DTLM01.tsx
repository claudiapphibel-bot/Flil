import React from "react";
import { Audio } from "@remotion/media";
import { AbsoluteFill, Img, Sequence, interpolate, staticFile } from "remotion";
import { Letterbox } from "../../../components/Overlay";
import { Plan } from "../../../components/fruit/Plan";
import { Accroche, Etalonnage, TitreSobre } from "../../../components/fruit/Cinema";

// Devant tout le monde · Épisode 1 : « Pourquoi t'as ma bague ? » (format 30 s).
// Plans parlés : Seedance (clips A et B). Gestes de la bague : Grok (aller, puis le même plan à l'envers).
// Gravure : image fixe. Fin : carte de vote sur la première image (boucle).
const S = 60; // images par seconde
const ACCENT = "#E2B65B"; // or : couleur de la série
const DIR = "ia/devant-tout-le-monde/ep01/";
const IMAGE_BOUCLE = DIR + "accroche-debut.jpg"; // image du clip A à 2,0 s
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Réglage du clip B (après vérification du clip : on coupe les temps morts)
const CLIP_B = { debut: 0.6, duree: 9.3 }; // « Tu le savais ? » à 0,9 s ; fin de l'aveu à 9,6 s

// Montage : [clip, début dans le clip (s), durée (s), son, vitesse]
type Morceau = { nom: string; video?: string; image?: string; debut?: number; duree: number; son?: number; vitesse?: number; zoom?: [number, number] };
const MORCEAUX: Morceau[] = [
  { nom: "P1 · Inès : « Pourquoi t'as ma bague ? »", video: "clipA.mp4", debut: 2.0, duree: 2.0, son: 1 },
  { nom: "P2 · Maya : « C'était à sa grand-mère. »", video: "clipA.mp4", debut: 4.6, duree: 1.9, son: 1 },
  { nom: "P3 · Inès : « Regarde à l'intérieur. »", video: "clipA.mp4", debut: 6.5, duree: 1.5, son: 1 },
  { nom: "P4 · Maya retire la bague", video: "P4-bague.mp4", debut: 0.4, duree: 2.0, son: 0.7 },
  { nom: "P5 · La gravure", image: "bague-gravure.png", duree: 2.0, zoom: [1, 1.12] },
  { nom: "P6 · Maya remet la bague", video: "P6-bague-remise.mp4", debut: 0.5, duree: 1.55, vitesse: 1.6 },
  { nom: "P7-P9 · « Tu le savais ? » … l'aveu", video: "clipB.mp4", debut: CLIP_B.debut, duree: CLIP_B.duree, son: 1 },
];

const DEBUTS = MORCEAUX.reduce<number[]>((acc, m, i) => [...acc, i === 0 ? 0 : acc[i - 1] + Math.round(MORCEAUX[i - 1].duree * S)], []);
const FIN_HISTOIRE = DEBUTS[DEBUTS.length - 1] + Math.round(MORCEAUX[MORCEAUX.length - 1].duree * S);
const TITRE = 12 * 30; // 12 battements = 6 s
export const TOTAL_IMAGES_DTLM01 = FIN_HISTOIRE + TITRE;

const ImageBoucle: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Img src={staticFile(IMAGE_BOUCLE)} style={{ position: "absolute", left: 0, top: (1920 - 1935) / 2, width: 1080, height: 1935, objectFit: "cover" }} />
  </AbsoluteFill>
);

// Musique : discrète, un peu plus présente pendant les gestes muets (« la musique du mariage continue »)
const P4 = DEBUTS[3];
const P7 = DEBUTS[6];
const volumeMusique = (f: number) =>
  interpolate(f, [0, P4 - 10, P4 + 10, P7 - 10, P7 + 10, FIN_HISTOIRE, FIN_HISTOIRE + 15], [0.035, 0.035, 0.09, 0.09, 0.035, 0.035, 0.045], clamp);

export const DTLM01: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    {MORCEAUX.map((m, i) => {
      const d = Math.round(m.duree * S);
      return (
        <Sequence key={m.nom} from={DEBUTS[i]} durationInFrames={d} name={m.nom}>
          {m.video ? (
            <Plan src={IMAGE_BOUCLE} video={DIR + m.video} sonVideo={m.son} debutVideo={Math.round((m.debut ?? 0) * S)} vitesse={m.vitesse} duree={d} zoom={[1, 1]} vivant={false} entree={false} />
          ) : (
            <Plan src={DIR + m.image} duree={d} zoom={m.zoom ?? [1, 1]} vivant={false} entree={false} />
          )}
        </Sequence>
      );
    })}
    <Sequence from={0} durationInFrames={2} name="Image de boucle (début)">
      <ImageBoucle />
    </Sequence>
    <Sequence from={FIN_HISTOIRE} durationInFrames={TITRE} name="Image de boucle (fin)">
      <ImageBoucle />
    </Sequence>

    <Etalonnage />

    <Sequence from={0} durationInFrames={2 * S} name="Accroche · texte">
      <Accroche ligne="Pourquoi t'as ma bague ?" accent={ACCENT} duree={2 * S} />
    </Sequence>

    <Sequence from={FIN_HISTOIRE} durationInFrames={TITRE} name="Titre et vote">
      <TitreSobre
        duree={12}
        tailleTitre={62}
        titre="DEVANT TOUT LE MONDE"
        sousTitre="Épisode 1 · Le mariage"
        accent={ACCENT}
        voteA={1}
        vote={{ question: "Que fait Maya avant le discours ?", a: "Team Explication : le fiancé", b: "Team Sœurs : parler à Inès", consigne: "Réponds A ou B en commentaire\nLike · abonne-toi", suite: "Épisode 2 · lundi 19 h" }}
      />
    </Sequence>
    <Letterbox />

    <Sequence from={0} durationInFrames={TOTAL_IMAGES_DTLM01} layout="none" name="♪ musique (le mariage, au loin)">
      <Audio src={staticFile("ia/lina-14-etages/v2/musique-cinema.mp3")} volume={volumeMusique} />
    </Sequence>
    {/* Au loin, les invités applaudissent : l'heure du discours (pendant l'aveu de Maya) */}
    <Sequence from={P7 + Math.round((7.4 - CLIP_B.debut) * S)} durationInFrames={Math.round(3.2 * S)} layout="none" name="♪ applaudissements au loin">
      <Audio src={staticFile("sfx/applaudissements.wav")} volume={(f) => interpolate(f, [0, 60, 150, 192], [0, 0.22, 0.22, 0], clamp)} />
    </Sequence>
    <Sequence from={FIN_HISTOIRE + 6} layout="none" name="🎙 narrateur">
      <Audio src={staticFile(DIR + "narrateur.mp3")} volume={1} />
    </Sequence>
  </AbsoluteFill>
);
