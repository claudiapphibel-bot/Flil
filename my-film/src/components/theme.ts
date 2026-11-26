import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Charte de la chaîne (voir CLAUDE.md)
export const COLORS = {
  character: "#F2A65A",
  characterBack: "#C9823F", // membres arrière, un peu plus sombres
  face: "#2A1A10",
  accent: "#3DE0FF", // ombre, ses répliques, couleur contrastante du titre
  background: "#0A0A0F",
  outline: "#5A5A66",
  propFill: "#121219",
  white: "#FFFFFF",
  lampLight: "#FFD98A",
  moonLight: "#CFE0FF",
};

export const WIDTH = 1080;
export const HEIGHT = 1920;
export const FPS = 60;
export const BAR = 60; // bandes noires haut/bas → image utile 1080 × 1800 (6:10)
export const GROUND_Y = 1580;

export const FONT = "Comic Neue";
loadFont({ family: FONT, url: staticFile("fonts/comic-neue-latin-400-normal.woff2"), weight: "400" });
loadFont({ family: FONT, url: staticFile("fonts/comic-neue-latin-700-normal.woff2"), weight: "700" });

// Pseudo-hasard déterministe (même résultat à chaque rendu)
export const hash = (...n: number[]) => {
  let h = 0;
  for (const v of n) h = Math.sin(h * 12.9898 + v * 78.233 + 0.5) * 43758.5453;
  return h - Math.floor(h);
};
