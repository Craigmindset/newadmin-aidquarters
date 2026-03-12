"use client";
import * as React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "ghost" | "outline" | "destructive";
  size?: "default" | "icon" | "sm";
};

export function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors";
  const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
    default:
      "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-700",
    ghost: "hover:bg-zinc-100 dark:hover:bg-zinc-800",
    outline:
      "border border-zinc-300 text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800",
    destructive: "bg-red-600 text-white hover:bg-red-700",
  };
  const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
    default: "h-9 px-4 py-2",
    icon: "h-9 w-9 p-0",
    sm: "h-8 px-3",
  };
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className || ""}`}
      {...props}
    />
  );
}
