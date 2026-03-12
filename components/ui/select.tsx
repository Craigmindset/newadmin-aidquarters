"use client";
import * as React from "react";

type SelectRootProps = {
  value: string;
  onValueChange: (v: string) => void;
  children: React.ReactNode;
};

function collectItems(children: React.ReactNode, acc: Array<{ value: string; label: React.ReactNode }>) {
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;
    const anyType: any = child.type as any;
    if (anyType && anyType.displayName === "SelectItem") {
      const v = (child.props as any).value ?? "";
      acc.push({ value: v, label: child.props.children });
    } else if (child.props && child.props.children) {
      collectItems(child.props.children, acc);
    }
  });
  return acc;
}

export function Select({ value, onValueChange, children }: SelectRootProps) {
  const items = collectItems(children, []);
  return (
    <div className="relative">
      <select
        className="h-9 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-[var(--color-primary)] dark:border-zinc-700 dark:bg-zinc-950"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
      >
        {items.map((it) => (
          <option key={String(it.value)} value={String(it.value)}>
            {it.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function SelectTrigger({ children }: { children?: React.ReactNode }) {
  return null;
}
SelectTrigger.displayName = "SelectTrigger";

export function SelectValue({ placeholder }: { placeholder?: string }) {
  return null;
}
SelectValue.displayName = "SelectValue";

export function SelectContent({ children }: { children?: React.ReactNode }) {
  return null;
}
SelectContent.displayName = "SelectContent";

export function SelectItem({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  return null;
}
SelectItem.displayName = "SelectItem";
