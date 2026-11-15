"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(document.documentElement.getAttribute("data-theme") === "dark");
  }, []);
  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
    localStorage.setItem("booknook-theme", next ? "dark" : "light");
  }
  return (
    <button className="btn btn-ghost btn-circle btn-sm" onClick={toggle} aria-label="Toggle theme" type="button">
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
