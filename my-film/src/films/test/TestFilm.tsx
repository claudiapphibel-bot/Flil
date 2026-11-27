import React from "react";
import { Audio } from "@remotion/media";
import { AbsoluteFill, Easing, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Character, IDLE, Pose, ShadowDefs } from "../../components/Character";
import { Camera, DayCounter, Flash, Letterbox, Narrator, RepCounter, ShadowLine } from "../../components/Overlay";
import { City, Ground, Lamppost, Moon, PunchingBag, SpeedLines } from "../../components/Set";
import { COLORS, GROUND_Y, HEIGHT, WIDTH } from "../../components/theme";

// Film test de 10 s — « JOUR 1 » : il s'entraîne la nuit, l'ombre le décourage.
// Découpage (60 i/s) : A 0–240 calme · B 240–300 course · C 300–330 coup ·
// D 330–360 gros plan coup · E 360–600 calme (l'ombre grandit, travelling avant).

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const ease = Easing.bezier(0.45, 0, 0.2, 1);

const mix = (a: Pose, b: Pose, t: number): Pose => {
  const k = Math.max(0, Math.min(1, t));
  const out = { ...a };
  (Object.keys(a) as (keyof Pose)[]).forEach((key) => (out[key] = a[key] + (b[key] - a[key]) * k));
  return out;
};

const WINDUP: Pose = { ...IDLE, armF: -50, elbowF: 110, armB: 25, elbowB: 20, legF: 22, legB: -20, kneeB: 15, squash: 0.92, lean: -8, brow: 1, browY: 4, mouth: -0.3 };
const PUNCH: Pose = { ...IDLE, armF: 90, elbowF: 0, armB: -45, elbowB: 35, legF: 32, legB: -28, kneeB: 12, squash: 0.9, lean: 9, brow: 1, browY: 6, mouth: -0.5 };
const TIRED: Pose = { ...IDLE, armF: 4, elbowF: 12, armB: -2, elbowB: 8, legF: 10, legB: -8, kneeF: -10, squash: 0.95, lean: 14, brow: -1, browY: -6, mouth: -0.7 };
const DETERMINED: Pose = { ...IDLE, armF: 35, elbowF: 115, armB: -18, elbowB: 20, legF: 12, legB: -12, squash: 1.04, lean: 2, brow: 1, browY: 6, mouth: -0.1 };
const LOOM: Pose = { ...IDLE, armF: 30, elbowF: 25, armB: -25, elbowB: 20, lean: 6 };

const HERO_SCALE = 1.25;
const SHADOW_BASE = 1.45;

// ---------- Décor commun (cour éclairée par un lampadaire) ----------
const Yard: React.FC<{ frame: number; bagAngle: number; shadowGlow?: number; children: React.ReactNode }> = ({
  frame, bagAngle, shadowGlow = 1, children,
}) => (
  <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} style={{ position: "absolute" }}>
    <ShadowDefs intensity={shadowGlow} />
    <defs>
      <radialGradient id="dark" cx={790} cy={1040} r={1250} gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#000" stopOpacity={0} />
        <stop offset="45%" stopColor="#000" stopOpacity={0.25} />
        <stop offset="100%" stopColor="#000" stopOpacity={0.8} />
      </radialGradient>
    </defs>
    <Moon x={190} y={330} frame={frame} />
    <Lamppost x={880} lampX={790} top={1000} frame={frame} />
    <Ground frame={frame} />
    <PunchingBag x={700} top={1005} angle={bagAngle} frame={frame} />
    {children}
    <rect width={WIDTH} height={HEIGHT} fill="url(#dark)" />
  </svg>
);

// ---------- Plan A : calme, il se prépare ----------
const ShotCalm: React.FC = () => {
  const f = useCurrentFrame();
  const pose = (t: number): Pose => {
    let p: Pose = { ...IDLE, squash: 1 + 0.015 * Math.sin(t * 0.08) };
    p = mix(p, { ...p, brow: 0.7, browY: 4, mouth: -0.2 }, interpolate(t, [130, 155], [0, 1], { ...clamp, easing: ease }));
    p = mix(p, { ...WINDUP, armF: -20, elbowF: 90 }, interpolate(t, [200, 238], [0, 1], { ...clamp, easing: ease }));
    p.blink = interpolate(t, [100, 103, 107], [0, 1, 0], clamp);
    return p;
  };
  return (
    <Yard frame={f} bagAngle={1.5 * Math.sin(f * 0.04)}>
      <Character x={230} y={GROUND_Y} scale={SHADOW_BASE} pose={pose(f - 8)} variant="shadow" opacity={0.9} />
      <Character x={430} y={GROUND_Y} scale={HERO_SCALE} pose={pose(f)} />
    </Yard>
  );
};

// ---------- Plan B : il court, la ville défile ----------
const runPose = (t: number): Pose => {
  const ph = (t / 60) * 2.5 * Math.PI * 2;
  const s = Math.sin(ph);
  return {
    ...IDLE,
    legF: 42 * s, kneeF: -35 * Math.max(0, -s) - 8, legB: -42 * s, kneeB: -35 * Math.max(0, s) - 8,
    armF: -45 * s + 10, elbowF: 70, armB: 45 * s + 10, elbowB: 70,
    lean: 12, bob: -Math.abs(Math.cos(ph)) * 14, squash: 1 - 0.05 * Math.cos(2 * ph),
    brow: 0.8, browY: 4, mouth: -0.3,
  };
};

const ShotRun: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} style={{ position: "absolute" }}>
      <ShadowDefs />
      <defs>
        <radialGradient id="darkRun" cx={850} cy={360} r={1500} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#000" stopOpacity={0} />
          <stop offset="100%" stopColor="#000" stopOpacity={0.7} />
        </radialGradient>
      </defs>
      <Moon x={850} y={360} frame={f} />
      <City offset={f * 16 + 400} frame={f} />
      <Ground frame={f} />
      {Array.from({ length: 10 }).map((_, i) => {
        const x = ((i * 140 - f * 22) % 1400 + 1400) % 1400 - 100;
        return <line key={i} x1={x} y1={GROUND_Y + 22} x2={x + 40} y2={GROUND_Y + 22} stroke={COLORS.outline} strokeWidth={3} strokeLinecap="round" />;
      })}
      <Character x={290} y={GROUND_Y} scale={SHADOW_BASE} pose={runPose(f - 5)} variant="shadow" opacity={0.9} />
      <Character x={540} y={GROUND_Y} scale={HERO_SCALE} pose={runPose(f)} />
      <rect width={WIDTH} height={HEIGHT} fill="url(#darkRun)" />
    </svg>
  );
};

// ---------- Plans C et D : le coup de poing ----------
const punchPose = (f: number, hit: number) =>
  f < hit - 4
    ? mix(IDLE, WINDUP, interpolate(f, [0, hit - 4], [0.3, 1], { ...clamp, easing: ease }))
    : mix(WINDUP, PUNCH, interpolate(f, [hit - 4, hit], [0, 1], { ...clamp, easing: Easing.in(Easing.quad) }));

const bagSwing = (f: number, hit: number) =>
  f < hit ? 0 : 16 * Math.sin((f - hit) * 0.22) * Math.exp(-(f - hit) / 30);

const ShotPunch: React.FC<{ hit: number; closeUp?: boolean }> = ({ hit, closeUp }) => {
  const f = useCurrentFrame();
  return (
    <>
      <Camera zoom={closeUp ? 2.3 : 1} x={610} y={1300}>
        <Yard frame={f} bagAngle={bagSwing(f, hit)}>
          <Character x={250} y={GROUND_Y} scale={SHADOW_BASE} pose={punchPose(f - 6, hit)} variant="shadow" opacity={0.9} />
          <Character x={470} y={GROUND_Y} scale={HERO_SCALE} pose={punchPose(f, hit)} />
        </Yard>
        <svg width={WIDTH} height={HEIGHT} style={{ position: "absolute" }}>
          <SpeedLines x={655} y={1325} age={f - hit} seed={hit} />
        </svg>
      </Camera>
      <Flash at={hit} />
    </>
  );
};

// ---------- Plan E : il faiblit, l'ombre grandit ----------
const ShotDoubt: React.FC = () => {
  const f = useCurrentFrame();
  const resolve = interpolate(f, [172, 200], [0, 1], { ...clamp, easing: ease });
  const hero = mix({ ...TIRED, squash: 0.95 + 0.03 * Math.sin(f * 0.25) }, DETERMINED, resolve);
  hero.blink = interpolate(f, [52, 58, 66], [0, 1, 0], clamp);
  const grow = interpolate(f, [0, 170], [0, 1], { ...clamp, easing: ease });
  const recoil = interpolate(f, [178, 215], [0, 1], { ...clamp, easing: ease });
  const shadowScale = SHADOW_BASE + 0.7 * grow - 0.2 * recoil;
  return (
    <Camera zoom={interpolate(f, [0, 240], [1, 1.15], { ...clamp, easing: Easing.inOut(Easing.sin) })} x={470} y={1250}>
      <Yard frame={f} bagAngle={1.2 * Math.sin(f * 0.05)} shadowGlow={1 + grow * 1.2 - recoil * 0.5}>
        <Character x={230 - 50 * grow} y={GROUND_Y} scale={shadowScale} pose={{ ...LOOM, squash: 1 + 0.02 * Math.sin(f * 0.05) }} variant="shadow" opacity={0.9 + 0.1 * grow} />
        <Character x={470} y={GROUND_Y} scale={HERO_SCALE} pose={hero} />
      </Yard>
    </Camera>
  );
};

const FadeToBlack: React.FC<{ from: number; to: number }> = ({ from, to }) => {
  const f = useCurrentFrame();
  return <AbsoluteFill style={{ background: "#000", opacity: interpolate(f, [from, to], [0, 1], clamp) }} />;
};

// ---------- Effets sonores (générés par scripts/generate-sfx.mjs) ----------
const Sfx: React.FC<{ at: number; name: string; volume?: number; duration?: number }> = ({ at, name, volume = 1, duration }) => (
  <Sequence from={at} durationInFrames={duration} layout="none" name={`♪ ${name}`}>
    <Audio src={staticFile(`sfx/${name}.wav`)} volume={volume} />
  </Sequence>
);

export const TestFilm: React.FC = () => {
  const { fps, durationInFrames } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: COLORS.background }}>
      <Sequence name="A · Calme" durationInFrames={4 * fps} premountFor={fps}>
        <ShotCalm />
        <Sequence from={15} durationInFrames={210} name="Narrateur" layout="none">
          <Narrator text="Chaque nuit, il s'entraîne seul." duration={210} />
        </Sequence>
      </Sequence>
      <Sequence name="B · Course" from={4 * fps} durationInFrames={1 * fps} premountFor={fps}>
        <ShotRun />
      </Sequence>
      <Sequence name="C · Coup" from={5 * fps} durationInFrames={0.5 * fps} premountFor={fps}>
        <ShotPunch hit={13} />
      </Sequence>
      <Sequence name="D · Gros plan" from={5.5 * fps} durationInFrames={0.5 * fps} premountFor={fps}>
        <ShotPunch hit={10} closeUp />
      </Sequence>
      <Sequence name="E · Doute" from={6 * fps} durationInFrames={4 * fps} premountFor={fps}>
        <ShotDoubt />
        <Sequence from={70} durationInFrames={120} name="Réplique de l'ombre" layout="none">
          <ShadowLine text="Tu n'y arriveras jamais." x={50} y={620} duration={120} />
        </Sequence>
      </Sequence>

      <DayCounter days={[[20, 1]]} />
      <RepCounter reps={[[313, 98], [340, 99]]} />
      <FadeToBlack from={durationInFrames - 20} to={durationInFrames} />
      <Letterbox />

      <Sfx at={0} name="ambiance-nuit" volume={0.35} duration={durationInFrames} />
      <Sfx at={0} name="bourdon-lampe" volume={0.12} duration={4 * fps} />
      <Sfx at={20} name="tic-compteur" volume={0.6} />
      {[0, 12, 24, 36, 48].map((k) => <Sfx key={k} at={4 * fps + k} name="pas" volume={0.7} />)}
      <Sfx at={303} name="whoosh" volume={0.6} />
      <Sfx at={313} name="impact" volume={0.55} />
      <Sfx at={313} name="flash" volume={0.2} />
      <Sfx at={313} name="pop-repetition" volume={0.3} />
      <Sfx at={332} name="whoosh" volume={0.6} />
      <Sfx at={340} name="impact" volume={0.55} />
      <Sfx at={340} name="flash" volume={0.2} />
      <Sfx at={340} name="pop-repetition" volume={0.3} />
      <Sfx at={6 * fps} name="bourdon-lampe" volume={0.1} duration={4 * fps} />
      <Sfx at={6 * fps} name="ombre-nappe" volume={0.5} duration={4 * fps} />
      {[20, 80, 140].map((k) => <Sfx key={k} at={6 * fps + k} name="battement" volume={0.75} />)}
      <Sfx at={6 * fps + 66} name="ombre-voix" volume={0.6} />
      <Sfx at={6 * fps + 176} name="whoosh" volume={0.5} />
    </AbsoluteFill>
  );
};
