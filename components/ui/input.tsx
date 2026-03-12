"use client";
import * as React from "react";

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`h-9 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-[var(--color-primary)] dark:border-zinc-700 dark:bg-zinc-950 ${className || ""}`}
      {...props}
    />
  );
}
