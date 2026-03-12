"use client";
import * as React from "react";

export function Avatar({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`relative inline-flex h-10 w-10 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800 ${className || ""}`}
    >
      {children}
    </div>
  );
}

export function AvatarImage(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      {...props}
      className={`h-full w-full object-cover ${props.className || ""}`}
    />
  );
}

export function AvatarFallback({
  className,
  children,
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={`flex h-full w-full items-center justify-center text-sm text-zinc-600 dark:text-zinc-300 ${className || ""}`}
    >
      {children}
    </span>
  );
}
