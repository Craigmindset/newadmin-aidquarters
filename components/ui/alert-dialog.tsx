"use client";
import * as React from "react";

export function AlertDialog({
  open,
  children,
}: {
  open?: boolean;
  children: React.ReactNode;
}) {
  if (!open) return null;
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">{children}</div>;
}

export function AlertDialogContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`relative w-full max-w-md rounded-lg border border-zinc-200 bg-white p-6 shadow-lg dark:border-zinc-800 dark:bg-zinc-900 ${className || ""}`}
      {...props}
    />
  );
}

export function AlertDialogHeader(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} />;
}

export function AlertDialogTitle(
  props: React.HTMLAttributes<HTMLHeadingElement>
) {
  return <h2 className="text-lg font-semibold" {...props} />;
}

export function AlertDialogDescription(
  props: React.HTMLAttributes<HTMLParagraphElement>
) {
  return <p className="text-sm text-zinc-600 dark:text-zinc-400" {...props} />;
}

export function AlertDialogFooter(
  props: React.HTMLAttributes<HTMLDivElement>
) {
  return <div className="mt-6 flex justify-end gap-2" {...props} />;
}

export function AlertDialogAction(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  return (
    <button
      className="inline-flex items-center justify-center rounded-md bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
      {...props}
    />
  );
}
