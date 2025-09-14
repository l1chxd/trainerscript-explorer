"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const pref = localStorage.getItem("theme") === "dark";
    setDark(pref);
    document.documentElement.classList.toggle("dark", pref);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <button onClick={toggle} className="btn" aria-label="Theme umschalten">
      {dark ? "🌙" : "☀️"}
    </button>
  );
}
