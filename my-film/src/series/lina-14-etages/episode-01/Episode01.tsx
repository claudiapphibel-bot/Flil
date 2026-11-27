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
const VID = (n: string) => `ia/lina-14-etages/videos/${n}.mp4`;
const ACCENT = "#2EC4B6";

type Perso = "LINA" | "L'AUTRE" | "MADAME IRIS" | "NOÉ" | "???";
const COULEUR: Record<Perso, string> = { LINA: "#FF5A6E", "L'AUTRE": "#8FE3DA", "MADAME IRIS": "#C98AC0", NOÉ: "#FF9F1C", "???": "#FFFFFF" };
const VOIX = ia.voix as Record<string, Voix>;
const BOUCHES = ia.bouches as Record<string, { cx: number; cy: number; rx: number; ry: number }>;

// Répliques : b = battement où la parole commence. Le texte peut être coupé en morceaux avec « | ».
type Replique = { id: string; b: number; qui: Perso; texte: string; parts?: [number, string][] }; // parts : [secondes depuis le début du fichier, texte]
const REPLIQUES: Replique[] = [
  { id: "c-salon-lina", b: 11.7, qui: "LINA", texte: "", parts: [[0.35, "Maman ?"], [2.75, "Y a quelqu'un ?"]] },
  { id: "b032-iris", b: 25, qui: "MADAME IRIS", texte: "Encore debout à 4 h 44, ma puce ?" },
  { id: "b037-lina", b: 34.5, qui: "LINA", texte: "Comment ça, « encore » ?" },
  { id: "b040-iris", b: 39.5, qui: "MADAME IRIS", texte: "Surtout, ne prends pas l'escalier." },
  { id: "b062-noe", b: 62.5, qui: "NOÉ", texte: "Enfin quelqu'un !" },
  { id: "c-noe-boutons", b: 67.24, qui: "NOÉ", texte: "", parts: [[0.62, "J'appuie sur tous les boutons depuis des heures !"], [3.5, "Partout, c'est le 14 !"]] },
  { id: "b077-noe", b: 77, qui: "NOÉ", texte: "Elle, elle t'attend depuis hier." },
  { id: "b092-autre", b: 96.5, qui: "L'AUTRE", texte: "T'en as mis, du temps." },
  { id: "b096-lina", b: 102.5, qui: "LINA", texte: "Pourquoi t'as mon visage ?" },
  { id: "b101-autre", b: 106.5, qui: "L'AUTRE", texte: "Tu poses toujours la même question." },
  { id: "c-iris-croiser", b: 120.34, qui: "MADAME IRIS", texte: "", parts: [[0.42, "Je vous avais dit…"], [1.3, "de ne jamais vous croiser !"], [2.98, "Venez avec moi. Vite !"]] },
  { id: "b138-inconnue", b: 133.5, qui: "???", texte: "Lina… c'est moi. Ouvre-moi." },
  { id: "b142-noe", b: 140.5, qui: "NOÉ", texte: "Elle a… ta voix !" },
];
const audioDebut = (r: Replique) => Math.round(r.b * B - VOIX[r.id].debut * 60);
const parole = (r: Replique) => Math.round((VOIX[r.id].fin - VOIX[r.id].debut) * 60);

// Plans : de/a en battements, bouche = répliques à synchroniser sur l'image « -parle »
type P = { de: number; a: number; img: string; zoom?: [number, number]; focus?: [number, number]; miroir?: boolean; vivant?: boolean; dureeZoom?: number; easing?: (t: number) => number; parle?: string[]; secousse?: number; entree?: boolean; video?: string; dessus?: React.ReactNode };
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
  { de: 0, a: 4, img: "01-immeuble", zoom: [1, 1.4], focus: FENETRE, vivant: false, entree: false, easing: Easing.in(Easing.cubic) },
  { de: 4, a: 10, img: "02-yeux-lina", video: VID("02-yeux-lina"), zoom: [1.14, 1], easing: Easing.out(Easing.cubic) },
  { de: 10, a: 20, img: "03-salon", video: VID("03-salon-ls"), zoom: [1, 1.07], focus: [0.5, 0.45], dessus: <Horloge /> },
  { de: 20, a: 24, img: "04-tele", video: VID("04-tele"), zoom: [1, 1.1], focus: [0.45, 0.5] },
  { de: 24, a: 30, img: "05-couloir-iris", video: VID("05-couloir-iris"), zoom: [1, 1.06], focus: [0.62, 0.5] },
  { de: 30, a: 34, img: "06-iris-gp", video: VID("06-iris-gp-a-ls"), zoom: [1, 1.04] },
  { de: 34, a: 39, img: "07-lina-gp-couloir", video: VID("07-lina-gp-couloir-ls"), zoom: [1, 1.05] },
  { de: 39, a: 47, img: "06-iris-gp", video: VID("06-iris-gp-b-ls"), zoom: [1.06, 1.12], focus: [0.5, 0.45] },
  { de: 47, a: 49, img: "08-pelote", video: VID("08-pelote"), zoom: [1, 1.14], focus: [0.5, 0.5] },
  { de: 49, a: 54, img: "09-chaise-vide", video: VID("09-chaise-vide"), zoom: [1, 1.07], focus: [0.72, 0.6] },
  { de: 54, a: 56, img: "10-bouton", zoom: [2, 2.1], focus: [0.5, 0.62] },
  { de: 56, a: 58, img: "11-ecran", zoom: [1.25, 1.3], focus: [0.49, 0.31], dessus: <Ecran /> },
  { de: 58, a: 60, img: "10-bouton", zoom: [2.15, 2.25], focus: [0.5, 0.62] },
  { de: 60, a: 62, img: "11-ecran", zoom: [1.35, 1.45], focus: [0.49, 0.31], dessus: <Ecran /> },
  { de: 62, a: 66, img: "12-ascenseur-noe", video: VID("12-ascenseur-noe"), zoom: [1, 1.08], focus: [0.5, 0.45] },
  { de: 66, a: 76, img: "13-noe-gp", video: VID("13-noe-gp-ls"), zoom: [1, 1.1] },
  { de: 76, a: 86, img: "14-porte-escalier", video: VID("14-porte-escalier"), zoom: [1, 1.14], focus: [0.45, 0.33] },
  { de: 86, a: 90, img: "15-poignee", video: VID("15-poignee"), zoom: [1, 1.07], focus: [0.4, 0.55] },
  { de: 90, a: 96, img: "16-revelation", video: VID("16-revelation"), zoom: [1.02, 1.07] },
  { de: 96, a: 102, img: "17-autre-gp", video: VID("17-autre-gp-a-ls"), miroir: true, zoom: [1, 1.06] },
  { de: 102, a: 106, img: "18-lina-gp-escalier", video: VID("18-lina-gp-escalier-ls"), zoom: [1.04, 1.1] },
  { de: 106, a: 111, img: "17-autre-gp", video: VID("17-autre-gp-b-ls"), miroir: true, zoom: [1.08, 1.16], focus: [0.5, 0.5] },
  { de: 111, a: 119, img: "20-fils", video: VID("20-fils"), zoom: [1, 1.18], focus: [0.5, 0.42], secousse: 2 * B },
  { de: 119, a: 129, img: "21-iris-porte", video: VID("21-iris-porte-ls"), zoom: [1, 1.12], focus: [0.5, 0.38] },
  { de: 129, a: 136, img: "22-porte-15", video: VID("22-porte-15"), zoom: [1, 1.16], focus: [0.5, 0.3] },
  { de: 136, a: 144, img: "25-noe-gp-escalier", video: VID("25-noe-gp-escalier-ls"), zoom: [1, 1.07] },
  { de: 144, a: 147, img: "24-lucarne", video: VID("24-lucarne"), zoom: [1, 2.8], focus: [0.5, 0.14], easing: Easing.in(Easing.cubic) },
  { de: 147, a: 174, img: "01-immeuble", zoom: [2.6, 1], focus: FENETRE, vivant: false, entree: false, dureeZoom: 3 * B, easing: Easing.out(Easing.cubic) },
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
        // petit coup de zoom au début de chaque réplique entendue pendant ce plan
        const coups = REPLIQUES.filter((r) => r.b >= p.de && r.b < p.a).map((r) => Math.round(r.b * B) - de);
        return (
          <Sequence key={i} name={`Plan ${i + 1} · ${p.img}`} from={de} durationInFrames={(p.a - p.de) * B} premountFor={B}>
            <Plan src={IMG(p.img)} video={p.video} duree={p.dureeZoom ?? (p.a - p.de) * B} zoom={p.zoom} focus={p.focus} miroir={p.miroir} vivant={p.vivant} easing={p.easing} bouche={bouche} secousse={p.secousse} entree={p.entree} coups={coups}>
              {p.dessus}
            </Plan>
          </Sequence>
        );
      })}

      {/* Pic d'intensité (b119) : étincelles, lignes de vitesse, flash */}
      <Sequence from={111 * B} durationInFrames={8 * B} name="Étincelles"><Etincelles duree={8 * B} couleur="#7ff7ee" n={50} /></Sequence>
      <Sequence from={113 * B} durationInFrames={B} name="Lignes de vitesse"><LignesVitesse duree={B} couleur="#bdfcf7" /></Sequence>
      <Sequence from={113 * B} durationInFrames={14} name="Flash"><Flash /></Sequence>
      <Sequence from={119 * B} durationInFrames={10 * B} name="Fil d'Iris"><Etincelles duree={10 * B} couleur={ACCENT} n={18} intensite={0.6} /></Sequence>
      {/* Rebondissements : flash bref + lignes de vitesse */}
      {[24, 62, 129].map((t) => (
        <React.Fragment key={t}>
          <Sequence from={t * B} durationInFrames={8} name="Flash rebondissement"><Flash duree={8} /></Sequence>
          <Sequence from={t * B} durationInFrames={20} name="Lignes rebondissement"><LignesVitesse duree={20} /></Sequence>
        </React.Fragment>
      ))}
      <Sequence from={147 * B} durationInFrames={12} name="Passage dehors"><Flash duree={12} couleur="#cdb8ff" /></Sequence>

      {/* Afficheur d'étage */}
      <Sequence from={10 * B} durationInFrames={134 * B} name="Afficheur 14"><Afficheur etage="14" duree={134 * B} /></Sequence>

      {/* Sous-titres */}
      {REPLIQUES.flatMap((r, i) => {
        const suivant = REPLIQUES[i + 1];
        const limite = suivant ? Math.round(suivant.b * B) - 4 : 147 * B;
        const fin = Math.min(Math.round(r.b * B) + parole(r) + 24, limite);
        const morceaux: [number, string][] = r.parts
          ? r.parts.map(([t, x]) => [audioDebut(r) + Math.round(t * 60), x])
          : r.texte.split("|").map((x, k, all) => [Math.round(r.b * B) + Math.round(((fin - Math.round(r.b * B)) * k) / all.length), x]);
        return morceaux.map(([de, x], k) => {
          const a = k + 1 < morceaux.length ? morceaux[k + 1][0] - 2 : fin;
          const d = Math.max(20, a - de);
          return (
            <Sequence key={`${r.id}-${k}`} from={de} durationInFrames={d} name={`💬 ${r.qui}`} layout="none">
              <SousTitre nom={r.qui} couleur={COULEUR[r.qui]} texte={x} parole={Math.round(d * 0.7)} duree={d} />
            </Sequence>
          );
        });
      })}
      <Sequence from={75.5 * B} durationInFrames={2.5 * B} name="Mot-choc 14"><MotChoc texte="14 !" duree={2.5 * B} couleur="#ffb43a" /></Sequence>

      {/* Titre de fin + vote (24 derniers battements) */}
      <Sequence from={150 * B} durationInFrames={24 * B} name="Titre de fin">
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

      {/* Voix */}
      {REPLIQUES.map((r) => (
        <Sequence key={r.id} from={audioDebut(r)} layout="none" name={`🎙 ${r.qui}`}>
          <Audio src={staticFile(`ia/lina-14-etages/voix/${r.id}.wav`)} volume={r.qui === "???" ? 0.75 : 1} />
        </Sequence>
      ))}

      {/* Ambiances et bruitages (générés par code) */}
      {/* Un « whoosh » sur chaque coupe (sauf le montage de l'ascenseur et la boucle) */}
      {PLANS.slice(1).filter((p) => !["10-bouton", "11-ecran"].includes(p.img) && p.de !== 147).map((p) => <Son key={p.de} b={p.de - 0.25} nom="whoosh" vol={0.22} />)}
      {/* Rebondissements et tension */}
      <Son b={24} nom="boum" vol={0.55} />
      <Son b={62} nom="boum" vol={0.55} />
      <Son b={90} nom="boum" vol={0.45} />
      <Son b={109} nom="montee" vol={0.35} />
      <Son b={113} nom="boum" vol={0.45} />
      <Son b={127} nom="montee" vol={0.45} />
      <Son b={129} nom="boum" vol={0.55} />
      <Son b={0} nom="ambiance-nuit" vol={0.35} duree={10} />
      <Son b={4} nom="reveil" vol={0.45} />
      <Son b={10} nom="tic-compteur" vol={0.4} />
      <Son b={24} nom="bourdon-lampe" vol={0.12} duree={62} boucle />
      <Son b={24} nom="aiguilles" vol={0.45} />
      <Son b={30.5} nom="aiguilles" vol={0.3} />
      <Son b={49} nom="whoosh" vol={0.3} />
      <Son b={54} nom="tic-compteur" vol={0.5} />
      <Son b={58} nom="tic-compteur" vol={0.5} />
      <Son b={61} nom="ding-ascenseur" vol={0.5} />
      <Son b={73} nom="pop-repetition" vol={0.4} />
      <Son b={76} nom="ombre-nappe" vol={0.45} duree={10} boucle />
      <Son b={88} nom="battement" vol={0.45} />
      <Son b={90} nom="porte" vol={0.7} />
      <Son b={91.5} nom="battement" vol={0.8} />
      <Son b={96} nom="ombre-nappe" vol={0.28} duree={15} boucle />
      <Son b={111} nom="scintillement" vol={0.6} />
      <Son b={112} nom="whoosh" vol={0.4} />
      <Son b={113} nom="impact" vol={0.5} />
      <Son b={113} nom="flash" vol={0.35} />
      <Son b={119} nom="ombre-voix" vol={0.35} />
      <Son b={129} nom="ombre-nappe" vol={0.45} duree={15} boucle />
      <Son b={131} nom="toc" vol={0.9} />
      <Son b={132} nom="toc" vol={0.9} />
      <Son b={133} nom="toc" vol={0.9} />
      <Son b={144} nom="ambiance-nuit" vol={0.35} duree={30} />
      <Son b={146} nom="whoosh" vol={0.5} />
      {Array.from("LINA — LES 14 ÉTAGES").map((l, i) => (l.trim() ? <Son key={i} b={150 + i / 4} nom="titre-lettre" vol={0.2} /> : null))}
      <Son b={155} nom="trait-ligne" vol={0.3} />
      <Son b={156} nom="titre-carillon" vol={0.25} />
      <Son b={151} nom="vote" vol={0.4} />
      <Sequence from={151 * B - 12} layout="none" name="🎙 NARRATEUR (appel à l'action)">
        <Audio src={staticFile("ia/lina-14-etages/voix/narrateur-vote.wav")} volume={1} />
      </Sequence>
      <Son b={152} nom="pop-repetition" vol={0.3} />
      <Son b={152.5} nom="pop-repetition" vol={0.3} />
    </AbsoluteFill>
  );
};
