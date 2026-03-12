"use client";
import * as React from "react";

type DialogProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
};

const DialogContext = React.createContext<{
  close: () => void;
}>({
  close: () => {},
});

export function Dialog({ open = false, onOpenChange, children }: DialogProps) {
  const close = React.useCallback(() => onOpenChange?.(false), [onOpenChange]);
  if (!open) return null;
  return (
    <DialogContext.Provider value={{ close }}>
      {children}
    </DialogContext.Provider>
  );
}

export function DialogContent({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
  const { close } = React.useContext(DialogContext);
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={close}
    >
      <div
        className={`mx-4 w-full max-w-lg rounded-lg border border-zinc-200 bg-white p-6 shadow-lg dark:border-zinc-800 dark:bg-zinc-900 ${className || ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export function DialogHeader(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div className="mb-4" {...props} />;
}

export function DialogTitle(
  props: React.HTMLAttributes<HTMLHeadingElement>
) {
  return <h2 className="text-lg font-semibold" {...props} />;
}

export function DialogFooter(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div className="mt-6 flex justify-end gap-2" {...props} />;
}
