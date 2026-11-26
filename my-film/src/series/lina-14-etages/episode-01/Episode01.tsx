import React from "react";
import { Audio } from "@remotion/media";
import { AbsoluteFill, Easing, Sequence, staticFile } from "remotion";
import { Letterbox } from "../../../components/Overlay";
import { Plan, Voix } from "../../../components/fruit/Plan";
import { Afficheur, Etincelles, Flash, LignesVitesse, MotChoc, SousTitre } from "../../../components/fruit/Interface";
import { TitreFin } from "../../../components/fruit/TitreFin";
import ia from "./ia.json";

// Lina — Les 14 étages · Épisode 1 (14ᵉ étage). Voir HISTOIRE.md.
// 120 BPM : 1 battement = 30 images. Tous les temps sont écrits en battements.
const B = 30;
const IMG = (n: string) => `ia/lina-14-etages/plans/${n}.jpg`;
const ACCENT = "#2EC4B6";

type Perso = "LINA" | "L'AUTRE" | "MADAME IRIS" | "NOÉ" | "???";
const COULEUR: Record<Perso, string> = { LINA: "#FF5A6E", "L'AUTRE": "#8FE3DA", "MADAME IRIS": "#C98AC0", NOÉ: "#FF9F1C", "???": "#FFFFFF" };
const VOIX = ia.voix as Record<string, Voix>;
const BOUCHES = ia.bouches as Record<string, { cx: number; cy: number; rx: number; ry: number }>;

// Répliques : b = battement où la parole commence. Le texte peut être coupé en morceaux avec « | ».
type Replique = { id: string; b: number; qui: Perso; texte: string };
const REPLIQUES: Replique[] = [
  { id: "b020-lina", b: 18, qui: "LINA", texte: "Maman ?" },
  { id: "b024-lina", b: 22, qui: "LINA", texte: "Y a quelqu'un ?" },
  { id: "b032-iris", b: 31, qui: "MADAME IRIS", texte: "Encore debout à 4 h 44, ma puce ?" },
  { id: "b037-lina", b: 40.5, qui: "LINA", texte: "Comment ça, « encore » ?" },
  { id: "b040-iris", b: 45.5, qui: "MADAME IRIS", texte: "Surtout, ne prends pas l'escalier." },
  { id: "b062-noe", b: 68.5, qui: "NOÉ", texte: "Enfin quelqu'un !" },
  { id: "b065-noe", b: 72.5, qui: "NOÉ", texte: "J'appuie sur tous les boutons depuis des heures !" },
  { id: "b070-noe", b: 77, qui: "NOÉ", texte: "Partout, c'est le 14 !" },
  { id: "b077-noe", b: 83, qui: "NOÉ", texte: "Elle, elle t'attend depuis hier." },
  { id: "b092-autre", b: 102.5, qui: "L'AUTRE", texte: "T'en as mis, du temps." },
  { id: "b096-lina", b: 108.5, qui: "LINA", texte: "Pourquoi t'as mon visage ?" },
  { id: "b101-autre", b: 112.5, qui: "L'AUTRE", texte: "Tu poses toujours la même question." },
  { id: "b122-iris", b: 126, qui: "MADAME IRIS", texte: "Je vous avais dit…|de ne jamais vous croiser !" },
  { id: "b129-iris", b: 130.5, qui: "MADAME IRIS", texte: "Venez avec moi. Vite !" },
  { id: "b138-inconnue", b: 139.5, qui: "???", texte: "Lina… c'est moi. Ouvre-moi." },
  { id: "b142-noe", b: 146.5, qui: "NOÉ", texte: "Elle a… ta voix !" },
];
const audioDebut = (r: Replique) => Math.round(r.b * B - VOIX[r.id].debut * 60);
const parole = (r: Replique) => Math.round((VOIX[r.id].fin - VOIX[r.id].debut) * 60);

// Plans : de/a en battements, bouche = répliques à synchroniser sur l'image « -parle »
type P = { de: number; a: number; img: string; zoom?: [number, number]; focus?: [number, number]; miroir?: boolean; vivant?: boolean; dureeZoom?: number; easing?: (t: number) => number; parle?: string[]; secousse?: number; dessus?: React.ReactNode };
const FENETRE: [number, number] = [0.546, 0.333];

const Horloge: React.FC = () => {
  const [x1, y1, x2, y2] = ia.horloge as number[];
  return (
    <div style={{ position: "absolute", left: `${(x1 - 0.012) * 100}%`, top: `${(y1 - 0.006) * 100}%`, width: `${(x2 - x1 + 0.024) * 100}%`, height: `${(y2 - y1 + 0.012) * 100}%`, background: "#120607", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ fontFamily: "monospace", fontWeight: 700, fontSize: 52, color: "#ff3b30", textShadow: "0 0 10px #ff2a1a, 0 0 24px #ff2a1a" }}>04:44</span>
    </div>
  );
};
const Ecran: React.FC = () => {
  const [x1, y1, x2, y2] = ia.ecran as number[];
  return (
    <div style={{ position: "absolute", left: `${x1 * 100}%`, top: `${y1 * 100}%`, width: `${(x2 - x1) * 100}%`, height: `${(y2 - y1) * 100}%`, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ fontFamily: "monospace", fontWeight: 700, fontSize: 190, color: "#ffb43a", textShadow: "0 0 18px #ff9a1c, 0 0 46px #ff7a00" }}>14</span>
    </div>
  );
};

const PLANS: P[] = [
  { de: 0, a: 10, img: "01-immeuble", zoom: [1, 1.07], focus: FENETRE, vivant: false },
  { de: 10, a: 16, img: "02-yeux-lina", zoom: [1.14, 1], easing: Easing.out(Easing.cubic) },
  { de: 16, a: 26, img: "03-salon", zoom: [1, 1.07], focus: [0.5, 0.45], parle: ["b020-lina", "b024-lina"], dessus: <Horloge /> },
  { de: 26, a: 30, img: "04-tele", zoom: [1, 1.1], focus: [0.45, 0.5] },
  { de: 30, a: 36, img: "05-couloir-iris", zoom: [1, 1.06], focus: [0.62, 0.5] },
  { de: 36, a: 40, img: "06-iris-gp", zoom: [1, 1.04], parle: ["b032-iris"] },
  { de: 40, a: 45, img: "07-lina-gp-couloir", zoom: [1, 1.05], parle: ["b037-lina"] },
  { de: 45, a: 53, img: "06-iris-gp", zoom: [1.06, 1.12], focus: [0.5, 0.45], parle: ["b040-iris"] },
  { de: 53, a: 55, img: "08-pelote", zoom: [1, 1.14], focus: [0.5, 0.5] },
  { de: 55, a: 60, img: "09-chaise-vide", zoom: [1, 1.07], focus: [0.72, 0.6] },
  { de: 60, a: 62, img: "10-bouton", zoom: [2, 2.1], focus: [0.5, 0.62] },
  { de: 62, a: 64, img: "11-ecran", zoom: [1.25, 1.3], focus: [0.49, 0.31], dessus: <Ecran /> },
  { de: 64, a: 66, img: "10-bouton", zoom: [2.15, 2.25], focus: [0.5, 0.62] },
  { de: 66, a: 68, img: "11-ecran", zoom: [1.35, 1.45], focus: [0.49, 0.31], dessus: <Ecran /> },
  { de: 68, a: 72, img: "12-ascenseur-noe", zoom: [1, 1.08], focus: [0.5, 0.45] },
  { de: 72, a: 82, img: "13-noe-gp", zoom: [1, 1.1], parle: ["b065-noe", "b070-noe"] },
  { de: 82, a: 92, img: "14-porte-escalier", zoom: [1, 1.14], focus: [0.45, 0.33] },
  { de: 92, a: 96, img: "15-poignee", zoom: [1, 1.07], focus: [0.4, 0.55] },
  { de: 96, a: 102, img: "16-revelation", zoom: [1.02, 1.07] },
  { de: 102, a: 108, img: "17-autre-gp", miroir: true, zoom: [1, 1.06], parle: ["b092-autre"] },
  { de: 108, a: 112, img: "18-lina-gp-escalier", zoom: [1.04, 1.1], parle: ["b096-lina"] },
  { de: 112, a: 117, img: "17-autre-gp", miroir: true, zoom: [1.08, 1.16], focus: [0.5, 0.5], parle: ["b101-autre"] },
  { de: 117, a: 125, img: "20-fils", zoom: [1, 1.18], focus: [0.5, 0.42], secousse: 2 * B },
  { de: 125, a: 135, img: "21-iris-porte", zoom: [1, 1.12], focus: [0.5, 0.38], parle: ["b122-iris", "b129-iris"] },
  { de: 135, a: 142, img: "22-porte-15", zoom: [1, 1.16], focus: [0.5, 0.3] },
  { de: 142, a: 150, img: "25-noe-gp-escalier", zoom: [1, 1.07], parle: ["b142-noe"] },
  { de: 150, a: 153, img: "24-lucarne", zoom: [1, 2.8], focus: [0.5, 0.14], easing: Easing.in(Easing.cubic) },
  { de: 153, a: 180, img: "01-immeuble", zoom: [2.6, 1], focus: FENETRE, vivant: false, dureeZoom: 3 * B, easing: Easing.out(Easing.cubic) },
];

const Son: React.FC<{ b: number; nom: string; vol?: number; duree?: number; boucle?: boolean }> = ({ b, nom, vol = 1, duree, boucle }) => (
  <Sequence from={Math.round(b * B)} durationInFrames={duree ? Math.round(duree * B) : undefined} layout="none" name={`♪ ${nom}`}>
    <Audio src={staticFile(`sfx/${nom}.wav`)} volume={vol} loop={boucle} />
  </Sequence>
);

export const Episode01: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      {PLANS.map((p, i) => {
        const de = p.de * B;
        const bouche = (p.parle ?? []).map((id) => {
          const r = REPLIQUES.find((x) => x.id === id)!;
          return { srcParle: IMG(`${p.img}-parle`), zone: BOUCHES[p.img], voix: VOIX[id], debut: audioDebut(r) - de };
        });
        return (
          <Sequence key={i} name={`Plan ${i + 1} · ${p.img}`} from={de} durationInFrames={(p.a - p.de) * B} premountFor={B}>
            <Plan src={IMG(p.img)} duree={p.dureeZoom ?? (p.a - p.de) * B} zoom={p.zoom} focus={p.focus} miroir={p.miroir} vivant={p.vivant} easing={p.easing} bouche={bouche} secousse={p.secousse}>
              {p.dessus}
            </Plan>
          </Sequence>
        );
      })}

      {/* Pic d'intensité (b119) : étincelles, lignes de vitesse, flash */}
      <Sequence from={117 * B} durationInFrames={8 * B} name="Étincelles"><Etincelles duree={8 * B} couleur="#7ff7ee" n={50} /></Sequence>
      <Sequence from={119 * B} durationInFrames={B} name="Lignes de vitesse"><LignesVitesse duree={B} couleur="#bdfcf7" /></Sequence>
      <Sequence from={119 * B} durationInFrames={14} name="Flash"><Flash /></Sequence>
      <Sequence from={125 * B} durationInFrames={10 * B} name="Fil d'Iris"><Etincelles duree={10 * B} couleur={ACCENT} n={18} intensite={0.6} /></Sequence>
      <Sequence from={153 * B} durationInFrames={12} name="Passage dehors"><Flash duree={12} couleur="#cdb8ff" /></Sequence>

      {/* Afficheur d'étage */}
      <Sequence from={16 * B} durationInFrames={134 * B} name="Afficheur 14"><Afficheur etage="14" duree={134 * B} /></Sequence>

      {/* Sous-titres */}
      {REPLIQUES.map((r, i) => {
        const suivant = REPLIQUES[i + 1];
        const fin = Math.min(Math.round(r.b * B) + parole(r) + 24, suivant ? Math.round(suivant.b * B) - 4 : 153 * B);
        const morceaux = r.texte.split("|");
        const total = fin - Math.round(r.b * B);
        return morceaux.map((m, k) => {
          const d = Math.round(total / morceaux.length);
          return (
            <Sequence key={`${r.id}-${k}`} from={Math.round(r.b * B) + k * d} durationInFrames={d} name={`💬 ${r.qui}`} layout="none">
              <SousTitre nom={r.qui} couleur={COULEUR[r.qui]} texte={m} parole={Math.round(parole(r) / morceaux.length)} duree={d} />
            </Sequence>
          );
        });
      })}
      <Sequence from={79 * B} durationInFrames={3 * B} name="Mot-choc 14"><MotChoc texte="14 !" duree={3 * B} couleur="#ffb43a" /></Sequence>

      {/* Titre de fin + vote (24 derniers battements) */}
      <Sequence from={156 * B} durationInFrames={24 * B} name="Titre de fin">
        <TitreFin
          titre="LINA — LES 14 ÉTAGES"
          sousTitre="Épisode 1 · 14ᵉ étage"
          accent={ACCENT}
          vote={{ question: "QUI DOIT-ELLE CROIRE ?", a: "Ouvrir la porte du 15ᵉ", b: "Suivre Madame Iris", consigne: "Écris A ou B en commentaire" }}
        />
      </Sequence>
      <Letterbox />

      {/* Voix */}
      {REPLIQUES.map((r) => (
        <Sequence key={r.id} from={audioDebut(r)} layout="none" name={`🎙 ${r.qui}`}>
          <Audio src={staticFile(`ia/lina-14-etages/voix/${r.id}.wav`)} volume={r.qui === "???" ? 0.75 : 1} />
        </Sequence>
      ))}

      {/* Ambiances et bruitages (générés par code) */}
      <Son b={0} nom="ambiance-nuit" vol={0.35} duree={16} />
      <Son b={10} nom="reveil" vol={0.45} />
      <Son b={16} nom="tic-compteur" vol={0.4} />
      <Son b={30} nom="bourdon-lampe" vol={0.12} duree={62} boucle />
      <Son b={30} nom="aiguilles" vol={0.45} />
      <Son b={36.5} nom="aiguilles" vol={0.3} />
      <Son b={55} nom="whoosh" vol={0.3} />
      <Son b={60} nom="tic-compteur" vol={0.5} />
      <Son b={64} nom="tic-compteur" vol={0.5} />
      <Son b={67} nom="ding-ascenseur" vol={0.5} />
      <Son b={79} nom="pop-repetition" vol={0.4} />
      <Son b={82} nom="ombre-nappe" vol={0.45} duree={10} boucle />
      <Son b={94} nom="battement" vol={0.45} />
      <Son b={96} nom="porte" vol={0.7} />
      <Son b={97.5} nom="battement" vol={0.8} />
      <Son b={102} nom="ombre-nappe" vol={0.28} duree={15} boucle />
      <Son b={117} nom="scintillement" vol={0.6} />
      <Son b={118} nom="whoosh" vol={0.6} />
      <Son b={119} nom="impact" vol={0.75} />
      <Son b={119} nom="flash" vol={0.35} />
      <Son b={125} nom="ombre-voix" vol={0.35} />
      <Son b={135} nom="ombre-nappe" vol={0.45} duree={15} boucle />
      <Son b={137} nom="toc" vol={0.9} />
      <Son b={138} nom="toc" vol={0.9} />
      <Son b={139} nom="toc" vol={0.9} />
      <Son b={150} nom="ambiance-nuit" vol={0.35} duree={30} />
      <Son b={152} nom="whoosh" vol={0.5} />
      {Array.from("LINA — LES 14 ÉTAGES").map((l, i) => (l.trim() ? <Son key={i} b={156 + i / 2} nom="titre-lettre" vol={0.3} /> : null))}
      <Son b={166} nom="trait-ligne" vol={0.5} />
      <Son b={167} nom="titre-carillon" vol={0.45} />
      <Son b={168} nom="vote" vol={0.55} />
      <Son b={168.5} nom="pop-repetition" vol={0.35} />
      <Son b={169} nom="pop-repetition" vol={0.35} />
    </AbsoluteFill>
  );
};
