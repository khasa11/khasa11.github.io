"use client";

import { createContext, useContext } from "react";

type Theme = "light" | "dark";

type DotGridProps = {
  theme?: Theme;
  spacing?: number;
};

const ThemeContext = createContext<Theme>("light");

export function useThemeContext() {
  return useContext(ThemeContext);
}

export default function DotGrid({
  theme: themeProp,
  spacing = 20,
}: DotGridProps) {
  const contextTheme = useThemeContext();
  const theme = themeProp ?? contextTheme;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `radial-gradient(circle, ${theme === "light" ? "#d4d4d4" : "#333333"} 1px, transparent 1px)`,
        backgroundSize: `${spacing}px ${spacing}px`,
        borderRadius: "inherit",
        pointerEvents: "none",
      }}
    />
  );
}