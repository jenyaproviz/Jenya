import React, { useState, useEffect } from "react";
import "../../styles/darkmode.css";

function ThemeSwitcher() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme;
  }, [theme]);
  return (
    <div className={`ThemeSwitcher ${theme}`}>
      <button
        className="p-0 text-secondary-emphasis bg-secondary-subtle border border-secondary-subtle rounded-3"
        onClick={toggleTheme}
      >
        Dark Mode
      </button>
    </div>
  );
}
export default ThemeSwitcher;
