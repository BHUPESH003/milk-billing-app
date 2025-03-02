import type React from "react";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  enableSystem?: boolean;
  storageKey?: string;
  attribute?: string;
  disableTransitionOnChange?: boolean;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  enableSystem = true,
  storageKey = "ui-theme",
  attribute = "data-theme",
  disableTransitionOnChange = false,
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    const root = window.document.documentElement;
    const isDark =
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    if (disableTransitionOnChange) {
      root.classList.add("disable-transition");
      window.requestAnimationFrame(() => {
        root.classList.remove("disable-transition");
      });
    }

    root.classList[isDark ? "add" : "remove"]("dark");
    root.setAttribute(attribute, isDark ? "dark" : "light");

    if (enableSystem && theme === "system") {
      const darkModeMediaQuery = window.matchMedia(
        "(prefers-color-scheme: dark)"
      );
      const onDarkModeChange = (e: MediaQueryListEvent) => {
        root.classList[e.matches ? "add" : "remove"]("dark");
        root.setAttribute(attribute, e.matches ? "dark" : "light");
      };
      darkModeMediaQuery.addEventListener("change", onDarkModeChange);
      return () =>
        darkModeMediaQuery.removeEventListener("change", onDarkModeChange);
    }
  }, [theme, attribute, disableTransitionOnChange, enableSystem]);

  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem(storageKey);
      if (storedTheme) {
        setTheme(storedTheme as Theme);
      } else if (enableSystem) {
        setTheme("system");
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
  }, [enableSystem, storageKey]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      try {
        localStorage.setItem(storageKey, theme);
      } catch (error) {
        console.error("Error accessing localStorage:", error);
      }
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider value={value} {...props}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
