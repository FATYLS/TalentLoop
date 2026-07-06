export const brand = {
  name: "TalentLoop",
  tagline: "Automatisez vos candidatures avec l'IA",
  domain: "talentloop.fr",
  colors: {
    violet: "#BF00FF",
    violetDark: "#9900CC",
    violetLight: "#E066FF",
    black: "#0A0A0A",
    white: "#FFFFFF",
  },
} as const;

export function t(text: string): string {
  return text
    .replace(/Jobea/g, brand.name)
    .replace(/DC Start/g, brand.name);
}
