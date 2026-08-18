"use client";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { themes, themeOrder, type Theme } from "./themes";

type ThemeName = keyof typeof themes;

type ThemeContextType = {
  theme: ThemeName;
  setTheme: (t: ThemeName) => void;
  resetTheme: () => void;
  themes: typeof themes;
};

const STORAGE_KEY = "portfolio-theme";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function applyThemeVars(theme: Theme) {
  const root = document.documentElement;
  root.style.setProperty("--terminal-primary", theme.primary);
  root.style.setProperty("--terminal-bright", theme.bright);
  root.style.setProperty("--terminal-muted", theme.muted);
  root.style.setProperty("--terminal-dark", theme.dark);
  root.style.setProperty("--terminal-background", theme.background);
}

function hexToRgb(hex: string) {
  const h = hex.replace('#','');
  const bigint = parseInt(h, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r}, ${g}, ${b}`;
}

export function ThemeProviderClient({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>("green");

  useEffect(() => {
    // hydration-safe read
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as ThemeName | null;
      if (stored && themes[stored]) {
        setThemeState(stored);
        applyThemeVars(themes[stored]);
        // set rgb helper vars
        try {
          const rgb = hexToRgb(themes[stored].primary);
          const brightRgb = hexToRgb(themes[stored].bright);
          document.documentElement.style.setProperty('--terminal-primary-rgb', rgb);
          document.documentElement.style.setProperty('--terminal-bright-rgb', brightRgb);
        } catch (e) {}
        return;
      }
    } catch (e) {
      // ignore
    }
    // default
    applyThemeVars(themes["green"]);
    try {
      const rgb = hexToRgb(themes["green"].primary);
      const brightRgb = hexToRgb(themes["green"].bright);
      document.documentElement.style.setProperty('--terminal-primary-rgb', rgb);
      document.documentElement.style.setProperty('--terminal-bright-rgb', brightRgb);
    } catch (e) {}
  }, []);

  const setTheme = useCallback((t: ThemeName) => {
    if (!themes[t]) return;
    setThemeState(t);
    applyThemeVars(themes[t]);
    try {
      const rgb = hexToRgb(themes[t].primary);
      const brightRgb = hexToRgb(themes[t].bright);
      document.documentElement.style.setProperty('--terminal-primary-rgb', rgb);
      document.documentElement.style.setProperty('--terminal-bright-rgb', brightRgb);
    } catch (e) {}
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch (e) {}
  }, []);

  const resetTheme = useCallback(() => {
    setTheme("green");
  }, [setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resetTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProviderClient");
  return ctx;
}
