import type React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/layout/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="h-screen flex flex-col w-full bg-gray-50 dark:bg-gray-900">
        <Header />
        <div className="flex flex-1 min-h-0 overflow-hidden">
          <DashboardSidebar />
          <main className="flex-1 min-w-0 overflow-x-hidden overflow-y-auto p-4 sm:p-6 bg-white dark:bg-gray-950">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
