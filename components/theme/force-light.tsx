"use client";
import { useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";

export default function ForceLight() {
  const { setTheme } = useTheme();
  useEffect(() => {
    setTheme("light");
  }, [setTheme]);
  return null;
}
