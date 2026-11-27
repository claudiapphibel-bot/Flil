// Générateur d'effets sonores 100 % synthétisés en code.
// Aucun échantillon externe : chaque son est calculé mathématiquement
// (oscillateurs, bruit, filtres, enveloppes). Les fichiers produits sont donc
// originaux et libres de droits, utilisables sans risque sur TikTok.
//
// Utilisation : npm run sfx   →   écrit les fichiers .wav dans public/sfx/
// Le résultat est toujours identique (bruit pseudo-aléatoire avec graine fixe).

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const SR = 44100;
const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "sfx");
const TAU = Math.PI * 2;

// ---------- Outils ----------

// Bruit blanc pseudo-aléatoire déterministe (mulberry32)
const makeRng = (seed) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const noiseGen = (seed) => {
  const r = makeRng(seed);
  return () => r() * 2 - 1;
};

// Filtre biquad (formules RBJ), fréquence modifiable à chaque échantillon
const biquad = (type, q = 0.707) => {
  let x1 = 0, x2 = 0, y1 = 0, y2 = 0;
  return (x, freq) => {
    const w = (TAU * Math.min(freq, SR * 0.45)) / SR;
    const cos = Math.cos(w);
    const alpha = Math.sin(w) / (2 * q);
    let b0, b1, b2;
    if (type === "lowpass") {
      b0 = (1 - cos) / 2; b1 = 1 - cos; b2 = (1 - cos) / 2;
    } else if (type === "highpass") {
      b0 = (1 + cos) / 2; b1 = -(1 + cos); b2 = (1 + cos) / 2;
    } else {
      b0 = alpha; b1 = 0; b2 = -alpha; // passe-bande
    }
    const a0 = 1 + alpha, a1 = -2 * cos, a2 = 1 - alpha;
    const y = (b0 * x + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2) / a0;
    x2 = x1; x1 = x; y2 = y1; y1 = y;
    return y;
  };
};

const expDecay = (t, tau) => Math.exp(-t / tau);
const attack = (t, a) => Math.min(1, t / a);
const saw = (phase) => 2 * (phase - Math.floor(phase + 0.5));

const render = (seconds, fn) => {
  const n = Math.round(seconds * SR);
  const out = new Float32Array(n);
  for (let i = 0; i < n; i++) out[i] = fn(i / SR, i, n);
  return out;
};

// Fondu de sortie pour éviter les clics
const fadeOut = (buf, seconds = 0.02) => {
  const n = Math.round(seconds * SR);
  for (let i = 0; i < n && i < buf.length; i++) buf[buf.length - 1 - i] *= i / n;
  return buf;
};

const writeWav = (name, buf, peak = 0.9) => {
  let max = 0;
  for (const v of buf) max = Math.max(max, Math.abs(v));
  const gain = max > 0 ? peak / max : 1;
  const data = Buffer.alloc(buf.length * 2);
  for (let i = 0; i < buf.length; i++) {
    const s = Math.max(-1, Math.min(1, buf[i] * gain));
    data.writeInt16LE(Math.round(s * 32767), i * 2);
  }
  const h = Buffer.alloc(44);
  h.write("RIFF", 0); h.writeUInt32LE(36 + data.length, 4); h.write("WAVE", 8);
  h.write("fmt ", 12); h.writeUInt32LE(16, 16); h.writeUInt16LE(1, 20);
  h.writeUInt16LE(1, 22); h.writeUInt32LE(SR, 24); h.writeUInt32LE(SR * 2, 28);
  h.writeUInt16LE(2, 32); h.writeUInt16LE(16, 34);
  h.write("data", 36); h.writeUInt32LE(data.length, 40);
  writeFileSync(join(OUT, `${name}.wav`), Buffer.concat([h, data]));
  console.log(`  ✓ ${name}.wav  (${(buf.length / SR).toFixed(2)} s)`);
};

// ---------- Les sons ----------

const sounds = {
  // Nappe de nuit : vent sourd + léger bourdonnement électrique de la ville
  "ambiance-nuit": () => {
    const n = noiseGen(1), lp = biquad("lowpass"), lp2 = biquad("lowpass");
    return render(20, (t) => {
      const gust = 0.55 + 0.45 * Math.sin(TAU * 0.07 * t) * Math.sin(TAU * 0.031 * t + 1);
      const wind = lp(lp2(n(), 900), 260 + 220 * gust) * gust;
      const hum = 0.04 * Math.sin(TAU * 60 * t) + 0.015 * Math.sin(TAU * 120 * t);
      const edge = Math.min(1, t / 1, (20 - t) / 1); // fondu entrée / sortie
      return (wind * 1.6 + hum) * edge;
    });
  },

  // Grésillement d'un lampadaire / néon
  "bourdon-lampe": () => {
    const n = noiseGen(2), bp = biquad("bandpass", 4);
    return render(6, (t) => {
      const buzz = saw(100 * t) * 0.3 + Math.sin(TAU * 200 * t) * 0.2;
      const crackle = bp(n(), 3000) * (Math.sin(TAU * 0.9 * t) > 0.95 ? 1 : 0.05);
      const edge = Math.min(1, t / 0.3, (6 - t) / 0.3);
      return (buzz * 0.5 + crackle) * edge;
    });
  },

  // Petit « tic » quand le compteur de JOURS change
  "tic-compteur": () =>
    fadeOut(render(0.15, (t) =>
      (Math.sin(TAU * 1320 * t) + 0.4 * Math.sin(TAU * 2640 * t)) * expDecay(t, 0.025) * attack(t, 0.002))),

  // « Pop » quand le nombre de répétitions s'affiche
  "pop-repetition": () =>
    fadeOut(render(0.18, (t) => {
      const f = 380 + 700 * Math.min(1, t / 0.06);
      return Math.sin(TAU * f * t) * expDecay(t, 0.04) * attack(t, 0.003);
    })),

  // Souffle d'un mouvement rapide (élan d'un coup)
  whoosh: () => {
    const n = noiseGen(3), bp = biquad("bandpass", 1.6), bp2 = biquad("bandpass", 1.6);
    const d = 0.5;
    return fadeOut(render(d, (t) => {
      const p = t / d;
      const freq = 300 + 2400 * Math.sin(Math.PI * Math.pow(p, 0.8));
      const env = Math.sin(Math.PI * Math.pow(p, 0.6)) ** 2;
      return bp2(bp(n(), freq), freq) * env;
    }));
  },

  // Coup puissant : grosse frappe grave + claquement
  impact: () => {
    const n = noiseGen(4), lp = biquad("lowpass");
    let phase = 0;
    return fadeOut(render(0.7, (t) => {
      const f = 45 + 110 * expDecay(t, 0.05);
      phase += f / SR;
      const body = Math.sin(TAU * phase) * expDecay(t, 0.16);
      const crack = lp(n(), 2500) * expDecay(t, 0.018);
      return Math.tanh((body * 1.4 + crack * 1.2) * 2.2);
    }));
  },

  // Pas de course
  pas: () => {
    const n = noiseGen(5), lp = biquad("lowpass");
    let phase = 0;
    return fadeOut(render(0.14, (t) => {
      phase += (70 + 60 * expDecay(t, 0.02)) / SR;
      return Math.sin(TAU * phase) * expDecay(t, 0.03) + lp(n(), 1200) * expDecay(t, 0.012) * 0.6;
    }));
  },

  // Battement de cœur (« boum-boum ») : quand il faiblit
  battement: () => {
    const thump = (t) => {
      if (t < 0) return 0;
      // fréquence qui chute de 70 Hz à 40 Hz (phase intégrée analytiquement)
      const ph = 40 * t + 30 * 0.03 * (1 - Math.exp(-t / 0.03));
      return Math.sin(TAU * ph) * expDecay(t, 0.07) * attack(t, 0.004);
    };
    const lp = biquad("lowpass");
    return fadeOut(render(0.75, (t) => lp(thump(t) + 0.75 * thump(t - 0.26), 180)));
  },

  // Nappe grave et inquiétante de l'ombre
  "ombre-nappe": () => {
    const lp = biquad("lowpass", 1.2);
    const d = 5;
    return render(d, (t) => {
      const s = saw(55 * t) + saw(55.35 * t) + 0.6 * saw(82.6 * t) + 0.4 * Math.sin(TAU * 27.5 * t);
      const trem = 0.8 + 0.2 * Math.sin(TAU * 3.2 * t);
      const env = Math.min(1, t / 1.5) * Math.min(1, (d - t) / 0.8);
      return lp(s, 200 + 250 * Math.min(1, t / d)) * trem * env;
    });
  },

  // Apparition d'une réplique de l'ombre : souffle qui monte, scintillant
  "ombre-voix": () => {
    const n = noiseGen(6), bp = biquad("bandpass", 6);
    const d = 1.3;
    return fadeOut(render(d, (t) => {
      const p = t / d;
      const env = Math.pow(Math.sin(Math.PI * p), 2);
      const shimmer = bp(n(), 1800 + 1500 * p) * 0.8;
      const low = Math.sin(TAU * 73.4 * t) * 0.5 + Math.sin(TAU * 110 * t + Math.sin(TAU * 5 * t)) * 0.25;
      return (shimmer + low) * env;
    }), 0.08);
  },

  // Une lettre du titre qui apparaît
  "titre-lettre": () => {
    const n = noiseGen(7), hp = biquad("highpass");
    return fadeOut(render(0.08, (t) =>
      (hp(n(), 2000) * 0.5 + Math.sin(TAU * 900 * t) * 0.5) * expDecay(t, 0.012)));
  },

  // Carillon final sous le titre (cloche en partiels)
  "titre-carillon": () => {
    const partials = [[1, 1, 1.6], [2.76, 0.5, 0.9], [5.4, 0.25, 0.5], [8.93, 0.12, 0.3]];
    const base = 523.25;
    return fadeOut(render(3.5, (t) =>
      partials.reduce((s, [r, a, tau]) => s + a * Math.sin(TAU * base * r * t) * expDecay(t, tau), 0) *
      attack(t, 0.004)), 0.2);
  },

  // Trait qui se dessine (lignes du générique)
  "trait-ligne": () => {
    const n = noiseGen(8), bp = biquad("bandpass", 2);
    const d = 0.6;
    return fadeOut(render(d, (t) => bp(n(), 1500 + 2500 * (t / d)) * Math.sin(Math.PI * (t / d)) * 0.8));
  },

  // Flash / éclair blanc sur un coup puissant
  flash: () => {
    const n = noiseGen(9), hp = biquad("highpass");
    return fadeOut(render(0.35, (t) => hp(n(), 4000) * expDecay(t, 0.06)));
  },

  // Réveil électronique des années 80 : bip-bip, bip-bip
  reveil: () =>
    render(1.6, (t) => {
      const k = t % 0.8;
      const on = k < 0.09 || (k > 0.16 && k < 0.25);
      return on ? Math.sign(Math.sin(TAU * 2048 * t)) * 0.35 * Math.min(1, (0.8 - t % 0.8) * 50) : 0;
    }),

  // Ding d'ascenseur : deux notes de cloche, un peu fausses
  "ding-ascenseur": () =>
    fadeOut(render(2, (t) => {
      const note = (t0, f) => (t < t0 ? 0 : (Math.sin(TAU * f * (t - t0)) + 0.3 * Math.sin(TAU * f * 2.76 * (t - t0))) * expDecay(t - t0, 0.5));
      return note(0, 1046) + note(0.28, 830 * 0.985);
    }), 0.2),

  // Porte lourde : grincement puis claquement sourd
  porte: () => {
    const n = noiseGen(10), bp = biquad("bandpass", 12), lp = biquad("lowpass");
    let ph = 0;
    return fadeOut(render(1.6, (t) => {
      const f = 380 + 160 * Math.sin(TAU * 1.3 * t) + 60 * Math.sin(TAU * 7 * t);
      ph += f / SR;
      const creak = t < 1.1 ? bp(saw(ph) + n() * 0.3, f * 2) * Math.sin(Math.PI * Math.min(1, t / 1.1)) : 0;
      const slam = t > 1.15 ? lp(n(), 300) * expDecay(t - 1.15, 0.08) * 3 + Math.sin(TAU * 55 * (t - 1.15)) * expDecay(t - 1.15, 0.12) : 0;
      return creak * 0.8 + slam;
    }));
  },

  // Coup sourd frappé contre une porte
  toc: () => {
    const n = noiseGen(11), lp = biquad("lowpass");
    let ph = 0;
    return fadeOut(render(0.35, (t) => {
      ph += (90 + 120 * expDecay(t, 0.01)) / SR;
      return Math.sin(TAU * ph) * expDecay(t, 0.05) + lp(n(), 900) * expDecay(t, 0.015);
    }));
  },

  // Cliquetis d'aiguilles à tricoter
  aiguilles: () => {
    const n = noiseGen(12), hp = biquad("highpass");
    return render(2, (t) => {
      const k = (t * 3.1) % 1;
      const click = (x) => (k > x && k < x + 0.01 ? 1 : 0);
      return hp(n(), 3000) * (click(0.1) + click(0.55)) * 0.7 + Math.sin(TAU * 2600 * t) * (click(0.1) + click(0.55)) * 0.2;
    });
  },

  // Scintillement magique : notes cristallines qui montent
  scintillement: () =>
    fadeOut(render(2.2, (t) => {
      let s = 0;
      [0, 0.12, 0.24, 0.36, 0.48, 0.6, 0.72].forEach((t0, i) => {
        if (t >= t0) s += Math.sin(TAU * 880 * Math.pow(1.122, i * 2) * (t - t0)) * expDecay(t - t0, 0.35) * 0.4;
      });
      return s;
    }), 0.3),

  // Montée de tension (avant une révélation) : souffle + note qui grimpent
  montee: () => {
    const n = noiseGen(13), bp = biquad("bandpass", 3);
    let ph = 0;
    const d = 2;
    return fadeOut(render(d, (t) => {
      const p = t / d;
      ph += (110 + 330 * p * p) / SR;
      return (bp(n(), 400 + 5000 * p * p) * 0.9 + saw(ph) * 0.25) * Math.pow(p, 1.6);
    }), 0.01);
  },

  // Boum grave sur un rebondissement (sous-basse qui tombe)
  boum: () => {
    let ph = 0;
    const n = noiseGen(14), lp = biquad("lowpass");
    return fadeOut(render(1.2, (t) => {
      ph += (30 + 70 * expDecay(t, 0.08)) / SR;
      return Math.tanh(Math.sin(TAU * ph) * expDecay(t, 0.45) * 2.5) + lp(n(), 200) * expDecay(t, 0.03) * 0.8;
    }), 0.1);
  },

  // Applaudissements lointains (une salle de fête) : des dizaines de claps de bruit filtré, qui montent puis retombent
  applaudissements: () => {
    const r = makeRng(21), n = noiseGen(22), bp = biquad("bandpass", 1.1), lp = biquad("lowpass");
    const duree = 5, env = new Float32Array(Math.round(duree * SR));
    for (let c = 0; c < 45; c++) {
      let t = r() * 0.8;
      const pas = 0.17 + 0.1 * r();
      while (t < duree) {
        const i0 = Math.round(t * SR), a = 0.4 + 0.6 * r();
        for (let k = 0; k < Math.round(0.012 * SR) && i0 + k < env.length; k++) env[i0 + k] += a * Math.exp(-k / (0.003 * SR));
        t += pas * (0.85 + 0.3 * r());
      }
    }
    return fadeOut(render(duree, (t, i) => {
      const monte = Math.min(1, t / 1.2), descend = t > duree - 1.5 ? (duree - t) / 1.5 : 1;
      return lp(bp(n(), 2000) * env[i], 3200) * monte * descend;
    }), 0.3);
  },

  // Jingle du vote : 3 notes qui montent
  vote: () =>
    fadeOut(render(1.4, (t) => {
      let s = 0;
      [[0, 523.25], [0.16, 659.25], [0.32, 783.99]].forEach(([t0, f]) => {
        if (t >= t0) s += (Math.sin(TAU * f * (t - t0)) + 0.25 * Math.sin(TAU * f * 2 * (t - t0))) * expDecay(t - t0, 0.3);
      });
      return s;
    }), 0.2),
};

mkdirSync(OUT, { recursive: true });
console.log(`Génération des effets sonores dans ${OUT}`);
for (const [name, make] of Object.entries(sounds)) writeWav(name, make());
