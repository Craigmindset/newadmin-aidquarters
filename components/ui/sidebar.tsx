"use client";
import React from "react";

type Ctx = { collapsed: boolean; toggle: () => void };

const SidebarContext = React.createContext<Ctx>({
  collapsed: false,
  toggle: () => {},
});

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = React.useState(false);
  React.useEffect(() => {
    try {
      const v = localStorage.getItem("aq:sidebar:collapsed");
      if (v === "1") setCollapsed(true);
    } catch {}
  }, []);
  const toggle = React.useCallback(() => {
    setCollapsed((c) => {
      const n = !c;
      try {
        localStorage.setItem("aq:sidebar:collapsed", n ? "1" : "0");
      } catch {}
      return n;
    });
  }, []);
  return (
    <SidebarContext.Provider value={{ collapsed, toggle }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  return React.useContext(SidebarContext);
}
