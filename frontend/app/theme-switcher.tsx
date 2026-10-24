"use client";

import { useSyncExternalStore } from "react";

type Theme = "system" | "light" | "dark";
const storageKey = "calico-theme";

function readTheme(): Theme {
  const value = document.documentElement.dataset.theme;
  return value === "light" || value === "dark" ? value : "system";
}

function subscribe(callback: () => void) {
  const syncStorage = (event: StorageEvent) => {
    if (event.key !== storageKey && event.key !== null) return;
    const theme = event.newValue;
    if (theme === "light" || theme === "dark") document.documentElement.setAttribute("data-theme", theme);
    else document.documentElement.removeAttribute("data-theme");
    callback();
  };
  window.addEventListener("calico-theme-change", callback);
  window.addEventListener("storage", syncStorage);
  return () => {
    window.removeEventListener("calico-theme-change", callback);
    window.removeEventListener("storage", syncStorage);
  };
}

export function ThemeSwitcher() {
  const theme = useSyncExternalStore(subscribe, readTheme, () => "system" as Theme);

  function selectTheme(value: Theme) {
    if (value === "system") document.documentElement.removeAttribute("data-theme");
    else document.documentElement.setAttribute("data-theme", value);
    try { localStorage.setItem(storageKey, value); } catch { /* Theme still works without storage access. */ }
    window.dispatchEvent(new Event("calico-theme-change"));
  }

  return (
    <div className="theme-switcher" role="group" aria-label="Color theme">
      {(["light", "dark", "system"] as const).map((value) => (
        <button key={value} type="button" aria-pressed={theme === value} onClick={() => selectTheme(value)}>
          {value[0].toUpperCase() + value.slice(1)}
        </button>
      ))}
    </div>
  );
}
