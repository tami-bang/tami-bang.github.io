"use client";

import { useState } from "react"; // 용도 테마 상태 관리

type ThemeMode = "dark" | "light";

const THEME_STORAGE_KEY = "tami-theme";
const DEFAULT_THEME: ThemeMode = "dark";

function isBrowser() {
  return typeof window !== "undefined";
}

function isThemeMode(value: string | null): value is ThemeMode {
  return value === "light" || value === "dark";
}

function getSavedTheme() {
  if (!isBrowser()) {
    return null;
  }

  return window.localStorage.getItem(THEME_STORAGE_KEY);
}

function getInitialTheme(): ThemeMode {
  const savedTheme = getSavedTheme();

  if (isThemeMode(savedTheme)) {
    return savedTheme;
  }

  return DEFAULT_THEME;
}

function getNextTheme(currentTheme: ThemeMode): ThemeMode {
  return currentTheme === "dark" ? "light" : "dark";
}

function applyTheme(theme: ThemeMode) {
  if (!isBrowser()) {
    return;
  }

  document.documentElement.dataset.theme = theme;
  window.localStorage.setItem(THEME_STORAGE_KEY, theme);
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const initialTheme = getInitialTheme();

    applyTheme(initialTheme);

    return initialTheme;
  });

  function handleToggleTheme() {
    const nextTheme = getNextTheme(theme);

    setTheme(nextTheme);
    applyTheme(nextTheme);
  }

  return (
    <button
      type="button"
      onClick={handleToggleTheme}
      className="theme-toggle"
      aria-label="다크모드 화이트모드 전환"
    >
      <span className="theme-toggle__dot" />
      <span>{theme === "dark" ? "Dark" : "Light"}</span>
    </button>
  );
}
