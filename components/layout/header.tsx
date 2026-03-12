"use client";
import Link from "next/link";
import { Sun, Moon, LogOut } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export function Header() {
  const title = process.env.NEXT_PUBLIC_APP_NAME || "Admin";
  const { theme, toggle } = useTheme();
  const { signOut } = useAuth();
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-zinc-200 dark:bg-zinc-950/80 dark:border-zinc-800">
      <div className="mx-auto max-w-screen-2xl px-4 py-3 flex items-center justify-between">
        <Link href="/dashboard" className="font-semibold">
          {title}
        </Link>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={signOut}
            className="hidden sm:inline-flex"
            title="Logout"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            onClick={toggle}
            className="text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
            title={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
