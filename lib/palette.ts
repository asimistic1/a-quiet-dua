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
  oceanLight: "#7EB8E8",
  oceanMid: "#4A90C8",
  oceanDeep: "#1B4F8A",
  oceanNight: "#0E2A5C",
  foam: "#E8F4FC",
  lavenderSea: "#B8A4D4",
  jellyGlow: "#D4E8F8",
} as const;

export type PaletteKey = keyof typeof palette;

/** Stars fade across night chapters; birthday (0) uses underwater sparkles instead */
export const starOpacity = [0, 0.85, 0.4, 0.35, 0.3, 0.12] as const;

export const frameOpacity = [0, 0.48, 0.3, 0.26, 0.26, 0.32] as const;

/** Precomposed multi-stop skies — one paint layer, no blur filters. */
export function skyGradient(chapter: number): string {
  switch (chapter) {
    case 0:
      // Richer watercolor ocean — birthday opener
      return [
        `radial-gradient(95% 75% at 50% 8%, rgba(255,255,255,0.55) 0%, rgba(200,235,255,0.25) 28%, transparent 55%)`,
        `radial-gradient(70% 55% at 12% 78%, rgba(100,170,230,0.55) 0%, transparent 58%)`,
        `radial-gradient(65% 50% at 92% 22%, rgba(130,110,190,0.4) 0%, transparent 52%)`,
        `radial-gradient(80% 60% at 70% 85%, rgba(40,90,160,0.35) 0%, transparent 50%)`,
        `radial-gradient(120% 100% at 50% 50%, #A8D4F5 0%, #6BB0E0 22%, #3D84C4 48%, #1F5FA8 72%, #0E2A5C 100%)`,
      ].join(", ");
    case 1:
      // Quiet apology — powerful luminous night
      return [
        `radial-gradient(70% 55% at 50% 8%, rgba(243,223,174,0.32) 0%, rgba(230,194,128,0.12) 32%, transparent 58%)`,
        `radial-gradient(85% 70% at 50% 45%, rgba(60,110,160,0.28) 0%, transparent 55%)`,
        `radial-gradient(75% 60% at 8% 75%, rgba(20,110,90,0.55) 0%, transparent 58%)`,
        `radial-gradient(70% 55% at 95% 25%, rgba(70,50,120,0.42) 0%, transparent 52%)`,
        `radial-gradient(90% 50% at 50% 100%, rgba(230,194,128,0.14) 0%, transparent 45%)`,
        `radial-gradient(120% 100% at 50% 40%, #1A2F4A 0%, #122038 28%, #0C1A2C 55%, #081018 100%)`,
      ].join(", ");
    case 2:
      // Weight of mistake — ash, mauve, deep wine stillness
      return [
        `radial-gradient(80% 60% at 50% 0%, rgba(90,60,80,0.45) 0%, transparent 55%)`,
        `radial-gradient(70% 55% at 15% 80%, rgba(50,40,70,0.5) 0%, transparent 55%)`,
        `radial-gradient(65% 50% at 90% 40%, rgba(120,70,70,0.28) 0%, transparent 52%)`,
        `radial-gradient(90% 50% at 50% 100%, rgba(180,150,140,0.1) 0%, transparent 45%)`,
        `radial-gradient(120% 100% at 50% 42%, #1A1420 0%, #14101A 32%, #0E0C14 60%, #08070C 100%)`,
      ].join(", ");
    case 3:
      return [
        `radial-gradient(80% 60% at 30% 20%, rgba(14,59,51,0.55) 0%, transparent 50%)`,
        `radial-gradient(70% 50% at 80% 70%, rgba(16,27,51,0.4) 0%, transparent 55%)`,
        `linear-gradient(155deg, #0E3B33 0%, #0C2224 42%, #14161E 100%)`,
      ].join(", ");
    case 4:
      return [
        `radial-gradient(90% 70% at 50% 30%, rgba(10,42,38,0.9) 0%, transparent 60%)`,
        `radial-gradient(100% 85% at 50% 45%, #0A2A26 0%, #0B1C1A 55%, #071210 100%)`,
      ].join(", ");
    case 5:
    default:
      return [
        `radial-gradient(70% 45% at 50% 100%, rgba(230,194,128,0.18) 0%, transparent 55%)`,
        `radial-gradient(85% 55% at 50% 0%, rgba(16,27,51,0.85) 0%, transparent 50%)`,
        `linear-gradient(180deg, #101B33 0%, #2A2438 55%, #3A2E3F 100%)`,
      ].join(", ");
  }
}
