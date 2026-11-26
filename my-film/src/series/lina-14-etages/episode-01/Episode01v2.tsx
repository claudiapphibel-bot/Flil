import React from "react";
import { Audio } from "@remotion/media";
import { AbsoluteFill, Easing, Sequence, staticFile } from "remotion";
import { Letterbox } from "../../../components/Overlay";
import { Plan } from "../../../components/fruit/Plan";
import { Afficheur, Etincelles, Flash, LignesVitesse, MotChoc, SousTitre } from "../../../components/fruit/Interface";
import { TitreFin } from "../../../components/fruit/TitreFin";

// Lina — Les 14 étages · Épisode 1, version 2 : scènes Seedance 2.5 (animation, voix et lèvres
// générées ensemble). Remotion : accroche, enchaînement, sous-titres, effets, musique, titre et vote.
// 120 BPM : 1 battement = 30 images.
const B = 30;
const ACCENT = "#2EC4B6";
const SC = (n: number) => `ia/lina-14-etages/v2/scene${n}.mp4`;
const IMG = (n: string) => `ia/lina-14-etages/plans/${n}.jpg`;
const FENETRE: [number, number] = [0.546, 0.333];

type Perso = "LINA" | "L'AUTRE" | "MADAME IRIS" | "NOÉ" | "???";
const COULEUR: Record<Perso, string> = { LINA: "#FF5A6E", "L'AUTRE": "#8FE3DA", "MADAME IRIS": "#C98AC0", NOÉ: "#FF9F1C", "???": "#FFFFFF" };

// Scènes (battement de début) — la scène 3 a été bloquée par le filtre Higgsfield : on passe de 2 à 4.
// ⛓ = prolongement (pas de « snap » ni de whoosh, le raccord est continu)
type Scene = { n: number; b: number; duree: number; prolonge?: boolean };
const SCENES: Scene[] = [
  { n: 1, b: 4, duree: 8 },
  { n: 2, b: 20, duree: 10 },
  { n: 4, b: 40, duree: 12 },
  { n: 5, b: 64, duree: 8, prolonge: true },
  { n: 6, b: 80, duree: 10 },
  { n: 7, b: 100, duree: 8, prolonge: true },
  { n: 8, b: 116, duree: 10, prolonge: true },
];
const debutScene = (n: number) => SCENES.find((s) => s.n === n)!.b * B;

// Sous-titres : [scène, seconde dans la scène, durée (s), qui, texte]
type Sub = [number, number, number, Perso, string];
const SUBS: Sub[] = [
  [1, 3.0, 1.6, "LINA", "Maman ?"],
  [1, 5.0, 2.2, "LINA", "Y a quelqu'un ?"],
  [2, 1.3, 2.6, "MADAME IRIS", "Encore debout à 4 h 44, ma puce ?"],
  [2, 4.1, 2.2, "LINA", "Comment ça, « encore » ?"],
  [2, 7.6, 2.4, "MADAME IRIS", "Surtout, ne prends pas l'escalier."],
  [4, 6.7, 0.9, "NOÉ", "Enfin quelqu'un !"],
  [4, 7.6, 1.8, "NOÉ", "J'appuie sur tous les boutons depuis des heures !"],
  [4, 9.4, 1.6, "NOÉ", "Partout, c'est le 14 !"],
  [4, 11.0, 1.0, "LINA", "C'est pas possible."],
  [5, 2.1, 2.4, "NOÉ", "Elle, elle t'attend depuis hier."],
  [5, 4.7, 1.8, "LINA", "Qui ça, « elle » ?"],
  [6, 3.9, 2.4, "L'AUTRE", "T'en as mis, du temps."],
  [6, 6.4, 1.8, "LINA", "Pourquoi t'as mon visage ?"],
  [6, 8.3, 1.7, "L'AUTRE", "Tu poses toujours la même question."],
  [7, 1.5, 2.2, "NOÉ", "Euh… vos poignets… ils brillent."],
  [7, 5.9, 0.9, "MADAME IRIS", "Je vous avais dit…"],
  [7, 6.8, 1.2, "MADAME IRIS", "de ne jamais vous croiser !"],
  [8, 0.4, 1.8, "MADAME IRIS", "Venez avec moi. Vite !"],
  [8, 4.2, 2.6, "???", "Lina… c'est moi. Ouvre-moi."],
  [8, 7.4, 1.8, "NOÉ", "Elle a… ta voix !"],
];

const Son: React.FC<{ b: number; nom: string; vol?: number; duree?: number }> = ({ b, nom, vol = 1, duree }) => (
  <Sequence from={Math.round(b * B)} durationInFrames={duree ? Math.round(duree * B) : undefined} layout="none" name={`♪ ${nom}`}>
    <Audio src={staticFile(`sfx/${nom}.wav`)} volume={vol} />
  </Sequence>
);

const TOTAL = 164; // battements (82 s)

export const Episode01v2: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      {/* Accroche : l'immeuble, zoom accéléré vers la fenêtre (image de boucle) */}
      <Sequence from={0} durationInFrames={4 * B} name="Accroche · immeuble">
        <Plan src={IMG("01-immeuble")} duree={4 * B} zoom={[1, 1.4]} focus={FENETRE} vivant={false} entree={false} easing={Easing.in(Easing.cubic)} />
      </Sequence>

      {/* Scènes Seedance (son des voix gardé) */}
      {SCENES.map((s) =>
        s.n === 4 ? (
          <React.Fragment key={s.n}>
            <Sequence from={s.b * B} durationInFrames={s.duree * 2 * B} name="Scène 4">
              <Plan src={IMG("10-bouton")} video={SC(4)} sonVideo={1} duree={s.duree * 2 * B} zoom={[1, 1.04]} />
            </Sequence>
            {/* flou sur le texte « UP / LOBBY 4 » du panneau, pendant les plans du bouton (0–1,2 s et 3–6 s) */}
            {[[0, 1.2], [3.0, 6.0]].map(([a, b]) => (
              <Sequence key={a} from={s.b * B + Math.round(a * 60)} durationInFrames={Math.round((b - a) * 60)} name="Flou texte panneau" layout="none">
                <div style={{ position: "absolute", left: "8%", top: 0, width: "62%", height: "38%", backdropFilter: "blur(22px)", WebkitBackdropFilter: "blur(22px)", maskImage: "radial-gradient(ellipse 60% 60% at 50% 45%, #000 60%, transparent 100%)", WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 50% 45%, #000 60%, transparent 100%)" }} />
              </Sequence>
            ))}
          </React.Fragment>
        ) : (
          <Sequence key={s.n} from={s.b * B} durationInFrames={s.duree * 2 * B} name={`Scène ${s.n}`}>
            <Plan src={IMG("01-immeuble")} video={SC(s.n)} sonVideo={1} duree={s.duree * 2 * B} zoom={[1, 1.04]} entree={!s.prolonge} />
          </Sequence>
        ),
      )}

      {/* Retour à l'immeuble (même image qu'au début), puis titre */}
      <Sequence from={136 * B} durationInFrames={(TOTAL - 136) * B} name="Retour · immeuble">
        <Plan src={IMG("01-immeuble")} duree={4 * B} zoom={[2.6, 1]} focus={FENETRE} vivant={false} entree={false} easing={Easing.out(Easing.cubic)} />
      </Sequence>
      <Sequence from={136 * B} durationInFrames={12} name="Passage dehors"><Flash duree={12} couleur="#cdb8ff" /></Sequence>

      {/* Rebondissements : flash bref + lignes de vitesse ; pic (fils) avec étincelles */}
      {[20, 53, 120].map((t) => (
        <React.Fragment key={t}>
          <Sequence from={t * B} durationInFrames={8} name="Flash rebondissement"><Flash duree={8} /></Sequence>
          <Sequence from={t * B} durationInFrames={20} name="Lignes rebondissement"><LignesVitesse duree={20} /></Sequence>
        </React.Fragment>
      ))}
      <Sequence from={104 * B} durationInFrames={10 * B} name="Étincelles (pic)"><Etincelles duree={10 * B} couleur="#7ff7ee" n={50} /></Sequence>
      <Sequence from={108 * B} durationInFrames={14} name="Flash (pic)"><Flash /></Sequence>
      <Sequence from={44 * B} durationInFrames={2.5 * B} name="Mot-choc 14"><MotChoc texte="14" duree={2.5 * B} couleur="#ffb43a" /></Sequence>

      {/* Afficheur d'étage */}
      <Sequence from={6 * B} durationInFrames={130 * B} name="Afficheur 14"><Afficheur etage="14" duree={130 * B} /></Sequence>

      {/* Sous-titres */}
      {SUBS.map(([n, t, d, qui, texte], i) => (
        <Sequence key={i} from={debutScene(n) + Math.round(t * 60)} durationInFrames={Math.round(d * 60)} name={`💬 ${qui}`} layout="none">
          <SousTitre nom={qui} couleur={COULEUR[qui]} texte={texte} parole={Math.round(d * 60 * 0.6)} duree={Math.round(d * 60)} />
        </Sequence>
      ))}

      {/* Titre de fin + vote + narrateur */}
      <Sequence from={140 * B} durationInFrames={24 * B} name="Titre de fin">
        <TitreFin
          titre="LINA — LES 14 ÉTAGES"
          sousTitre="Épisode 1 · 14ᵉ étage"
          accent={ACCENT}
          lettre={0.25}
          voteA={1}
          vote={{ question: "QUI DOIT-ELLE CROIRE ?", a: "Ouvrir la porte du 15ᵉ", b: "Suivre Madame Iris", consigne: "Écris A ou B en commentaire", abonnement: true }}
        />
      </Sequence>
      <Letterbox />

      {/* Musique (ElevenLabs), narrateur (ElevenLabs) */}
      <Sequence from={0} durationInFrames={TOTAL * B} layout="none" name="♪ musique">
        <Audio src={staticFile("ia/lina-14-etages/v2/musique.mp3")} volume={0.14} />
      </Sequence>
      <Sequence from={141 * B} layout="none" name="🎙 narrateur">
        <Audio src={staticFile("ia/lina-14-etages/v2/narrateur.mp3")} volume={1} />
      </Sequence>

      {/* Bruitages d'appoint */}
      <Son b={0} nom="ambiance-nuit" vol={0.3} duree={4} />
      <Son b={2} nom="whoosh" vol={0.4} />
      {SCENES.filter((s) => !s.prolonge && s.b > 4).map((s) => <Son key={s.n} b={s.b - 0.25} nom="whoosh" vol={0.22} />)}
      <Son b={6} nom="tic-compteur" vol={0.3} />
      <Son b={20} nom="boum" vol={0.45} />
      <Son b={53} nom="boum" vol={0.45} />
      <Son b={80} nom="boum" vol={0.35} />
      <Son b={104} nom="montee" vol={0.3} />
      <Son b={108} nom="boum" vol={0.45} />
      <Son b={120} nom="boum" vol={0.45} />
      <Son b={134} nom="whoosh" vol={0.4} />
      <Son b={136} nom="ambiance-nuit" vol={0.3} duree={28} />
      {Array.from("LINA — LES 14 ÉTAGES").map((l, i) => (l.trim() ? <Son key={i} b={140 + i / 4} nom="titre-lettre" vol={0.2} /> : null))}
      <Son b={140} nom="vote" vol={0.35} />
    </AbsoluteFill>
  );
};
