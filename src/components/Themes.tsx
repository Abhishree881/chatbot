'use client'

import React, { useState } from "react";

const themes = [
  { name: "Light", class: "theme-light", colors: ["#ffffff", "#171717", "#f3f2f5"] },
  { name: "Dark", class: "theme-dark", colors: ["#171717", "#ffffff", "#2c2c2c"] },
  { name: "Blue", class: "theme-blue", colors: ["#e6f7ff", "#005582", "#cceeff"] },
  { name: "Green", class: "theme-green", colors: ["#e8f5e9", "#1b5e20", "#c8e6c9"] },
];

const ThemeSwitcher = () => {
  const [activeTheme, setActiveTheme] = useState("theme-light");

  const handleThemeChange = (themeClass: string) => {
    document.documentElement.className = themeClass;
    setActiveTheme(themeClass);
  };

  return (
    <div className="theme-switcher">
      <h2>Choose a Theme</h2>
      <div className="theme-options">
        {themes.map((theme) => (
          <div
            key={theme.name}
            className={`theme-preview ${activeTheme === theme.class ? "active" : ""}`}
            onClick={() => handleThemeChange(theme.class)}
            style={{
              background: `linear-gradient(45deg, ${theme.colors.join(", ")})`,
              color: theme.colors[0],
            }}
          >
            {theme.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThemeSwitcher;
