"use client";
import * as React from "react";

type DivProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: DivProps) {
  return (
    <div
      className={`rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 ${className || ""}`}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: DivProps) {
  return <div className={`p-4 ${className || ""}`} {...props} />;
}

export function CardTitle({ className, ...props }: DivProps) {
  return (
    <h3 className={`text-base font-semibold ${className || ""}`} {...props} />
  );
}

export function CardContent({ className, ...props }: DivProps) {
  return <div className={`p-4 pt-0 ${className || ""}`} {...props} />;
}
