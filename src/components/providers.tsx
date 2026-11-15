"use client";

import { Toaster } from "react-hot-toast";
import { useEffect } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const savedTheme = localStorage.getItem("booknook-theme");
    document.documentElement.setAttribute("data-theme", savedTheme || "light");
  }, []);

  return (
    <>
      {children}
      <Toaster position="top-right" toastOptions={{ duration: 3200 }} />
    </>
  );
}
