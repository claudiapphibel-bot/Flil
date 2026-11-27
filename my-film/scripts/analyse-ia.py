# Analyse les fichiers Higgsfield d'un épisode pour l'animation Remotion :
#  - enveloppe de volume de chaque réplique (60 valeurs/s) pour la bouche synchronisée
#  - zone de la bouche (différence image « bouche fermée » / « bouche ouverte »)
#  - début et fin de la parole dans chaque fichier
# Usage : python3 scripts/analyse-ia.py public/ia/lina-14-etages src/series/lina-14-etages/episode-01/ia.json
import sys, json, glob, os, math, wave, array
from PIL import Image, ImageChops, ImageFilter
src, out = sys.argv[1], sys.argv[2]
res = {"voix": {}, "bouches": {}}
for f in sorted(glob.glob(f"{src}/voix/*.wav")):
    w = wave.open(f); sr = w.getframerate(); ch = w.getnchannels()
    a = array.array('h', w.readframes(w.getnframes()))[::ch]
    win = sr // 60
    env = [math.sqrt(sum(x * x for x in a[i:i + win]) / win) for i in range(0, len(a) - win, win)]
    pk = max(env) or 1
    env = [round(e / pk, 3) for e in env]
    idx = [i for i, e in enumerate(env) if e > 0.08]
    res["voix"][os.path.basename(f)[:-4]] = {"duree": round(len(a) / sr, 3), "debut": idx[0] / 60, "fin": idx[-1] / 60, "env": env}
for g in sorted(glob.glob(f"{src}/plans/*-parle.png")):
    base = g.replace("-parle", "")
    A = Image.open(base).convert("L"); Bm = Image.open(g).convert("L").resize(A.size)
    small = (A.width // 8, A.height // 8)
    d = ImageChops.difference(A.resize(small), Bm.resize(small)).filter(ImageFilter.GaussianBlur(2))
    px = d.load(); W, H = small
    mx = max(px[x, y] for x in range(W) for y in range(H))
    pts = [(x, y) for x in range(W) for y in range(H) if px[x, y] > mx * 0.5]
    cx = sum(p[0] for p in pts) / len(pts) / W; cy = sum(p[1] for p in pts) / len(pts) / H
    xs = sorted(p[0] for p in pts); ys = sorted(p[1] for p in pts)
    rw = (xs[int(len(xs) * .95)] - xs[int(len(xs) * .05)]) / W; rh = (ys[int(len(ys) * .95)] - ys[int(len(ys) * .05)]) / H
    res["bouches"][os.path.basename(base)[:-4]] = {"cx": round(cx, 4), "cy": round(cy, 4), "rx": round(max(rw, .06), 4), "ry": round(max(rh, .03), 4)}
json.dump(res, open(out, "w"))
for k, v in res["bouches"].items(): print(k, v)
