export type Theme = {
  id: string;
  name: string;
  primary: string;
  bright: string;
  muted: string;
  dark: string;
  background: string;
};

export const themes: Record<string, Theme> = {
  green: {
    id: "green",
    name: "Matrix Green",
    primary: "#39FF88",
    bright: "#63FF9B",
    muted: "#228B55",
    dark: "#0B2A18",
    background: "#030504",
  },
  cyan: {
    id: "cyan",
    name: "Cyber Cyan",
    primary: "#00F5FF",
    bright: "#7CFFFF",
    muted: "#168B91",
    dark: "#06282A",
    background: "#020607",
  },
  blue: {
    id: "blue",
    name: "Terminal Blue",
    primary: "#4DA3FF",
    bright: "#8CC7FF",
    muted: "#28649A",
    dark: "#0B1D30",
    background: "#020509",
  },
  purple: {
    id: "purple",
    name: "Neon Purple",
    primary: "#C084FC",
    bright: "#E0B3FF",
    muted: "#75469C",
    dark: "#24112F",
    background: "#060308",
  },
  pink: {
    id: "pink",
    name: "Neon Pink",
    primary: "#FF4FD8",
    bright: "#FF8BEA",
    muted: "#A8328D",
    dark: "#3A0B2F",
    background: "#080308",
  },
  amber: {
    id: "amber",
    name: "Retro Amber",
    primary: "#FFB000",
    bright: "#FFD166",
    muted: "#A86F00",
    dark: "#302000",
    background: "#080603",
  },
  red: {
    id: "red",
    name: "Hacker Red",
    primary: "#FF4D4D",
    bright: "#FF8585",
    muted: "#A83232",
    dark: "#300909",
    background: "#080303",
  },
  white: {
    id: "white",
    name: "Classic Terminal",
    primary: "#E8E8E8",
    bright: "#FFFFFF",
    muted: "#888888",
    dark: "#222222",
    background: "#050505",
  },
};

export const themeOrder = [
  "green",
  "cyan",
  "blue",
  "purple",
  "pink",
  "amber",
  "red",
  "white",
];
