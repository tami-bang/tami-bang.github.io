"use client";

import { useEffect, useState } from "react"; // 용도 테마 상태 관리와 초기 테마 적용

type ThemeMode = "dark" | "light";

const THEME_STORAGE_KEY = "tami-theme";

function getInitialTheme(): ThemeMode {
  if (typeof window === "undefined") {
    return "dark";
  }

  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return "dark";
}

function applyTheme(theme: ThemeMode) {
  document.documentElement.dataset.theme = theme;
  window.localStorage.setItem(THEME_STORAGE_KEY, theme);
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>("dark");

  useEffect(() => {
    const initialTheme = getInitialTheme();
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  function handleToggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";

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