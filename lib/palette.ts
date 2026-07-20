export const palette = {
  night: "#070D1A",
  midnight: "#0B132B",
  char: "#14161E",
  predawn: "#1B2340",
  mauve: "#3A2E3F",
  dawnIvory: "#F3E9E1",
  blush: "#EFDFD6",
  gold: "#E6C280",
  deepGold: "#A9834B",
  silver: "#C9CDD6",
  ink: "#3B3430",
  emeraldNight: "#08211D",
  emerald: "#0E3B33",
  tealShadow: "#0A2A26",
  indigoDeep: "#101B33",
  brightGold: "#F3DFAE",
  goldWhisper: "rgba(230,194,128,0.14)",
  roseMist: "#F2D6C9",
  sunBloom: "#FFE6B8",
  duskRose: "#C4A090",
} as const;

export type PaletteKey = keyof typeof palette;

export const starOpacity = [0.5, 0.45, 0.35, 0.3, 0.12, 0] as const;

export const frameOpacity = [0.3, 0.06, 0.26, 0.26, 0.32, 0.38] as const;

/** Precomposed multi-stop skies — one paint layer, no blur filters. */
export function skyGradient(chapter: number): string {
  switch (chapter) {
    case 0:
      return [
        `radial-gradient(90% 70% at 50% 18%, rgba(230,194,128,0.10) 0%, transparent 42%)`,
        `radial-gradient(70% 55% at 78% 22%, rgba(14,59,51,0.45) 0%, transparent 55%)`,
        `radial-gradient(120% 95% at 50% 38%, #0B132B 0%, #0A1C28 38%, #08211D 72%, #040E12 100%)`,
      ].join(", ");
    case 1:
      return [
        `radial-gradient(100% 80% at 50% 40%, #09141F 0%, #061510 58%, #030A09 100%)`,
      ].join(", ");
    case 2:
      return [
        `radial-gradient(80% 60% at 30% 20%, rgba(14,59,51,0.55) 0%, transparent 50%)`,
        `radial-gradient(70% 50% at 80% 70%, rgba(16,27,51,0.4) 0%, transparent 55%)`,
        `linear-gradient(155deg, #0E3B33 0%, #0C2224 42%, #14161E 100%)`,
      ].join(", ");
    case 3:
      return [
        `radial-gradient(90% 70% at 50% 30%, rgba(10,42,38,0.9) 0%, transparent 60%)`,
        `radial-gradient(100% 85% at 50% 45%, #0A2A26 0%, #0B1C1A 55%, #071210 100%)`,
      ].join(", ");
    case 4:
      return [
        `radial-gradient(70% 45% at 50% 100%, rgba(230,194,128,0.18) 0%, transparent 55%)`,
        `radial-gradient(85% 55% at 50% 0%, rgba(16,27,51,0.85) 0%, transparent 50%)`,
        `linear-gradient(180deg, #101B33 0%, #2A2438 55%, #3A2E3F 100%)`,
      ].join(", ");
    case 5:
    default:
      return [
        `radial-gradient(55% 40% at 50% 8%, rgba(255,230,184,0.55) 0%, rgba(243,223,174,0.22) 28%, transparent 58%)`,
        `radial-gradient(80% 55% at 18% 78%, rgba(242,214,201,0.45) 0%, transparent 50%)`,
        `radial-gradient(70% 50% at 88% 62%, rgba(230,194,128,0.28) 0%, transparent 48%)`,
        `radial-gradient(120% 80% at 50% 100%, rgba(196,160,144,0.2) 0%, transparent 45%)`,
        `linear-gradient(168deg, #FFF8F0 0%, #F3E9E1 28%, #F0DDD2 62%, #E8CFC2 100%)`,
      ].join(", ");
  }
}
