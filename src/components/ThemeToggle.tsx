"use client";

import { useEffect, useSyncExternalStore } from "react";

type ThemeMode = "dark" | "light";
const THEME_STORAGE_KEY = "tami-theme";
const THEME_CHANGE_EVENT = "tami-theme-change";

function getSavedTheme(): ThemeMode {
  try {
    return window.localStorage.getItem(THEME_STORAGE_KEY) === "light"
      ? "light"
      : "dark";
  } catch {
    return document.documentElement.dataset.theme === "light"
      ? "light"
      : "dark";
  }
}

function subscribe(notify: () => void) {
  window.addEventListener("storage", notify);
  window.addEventListener(THEME_CHANGE_EVENT, notify);
  return () => {
    window.removeEventListener("storage", notify);
    window.removeEventListener(THEME_CHANGE_EVENT, notify);
  };
}

export default function ThemeToggle() {
  // 서버와 hydration의 첫 렌더를 일치시키고 저장된 테마는 구독으로 반영합니다.
  const theme = useSyncExternalStore(
    subscribe,
    getSavedTheme,
    () => "dark" as const,
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  function handleToggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {
      // 저장소 접근이 차단되어도 현재 탭에서 테마 전환은 지원합니다.
    }
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  }

  return (
    <button
      type="button"
      onClick={handleToggleTheme}
      className="theme-toggle"
      aria-label="다크모드 화이트모드 전환"
      aria-pressed={theme === "light"}
    >
      <span className="theme-toggle__dot" />
      <span>{theme === "dark" ? "Dark" : "Light"}</span>
    </button>
  );
}
