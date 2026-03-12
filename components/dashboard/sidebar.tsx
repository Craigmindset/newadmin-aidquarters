"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  LogOut,
  LayoutDashboard,
  Users,
  Briefcase,
  CreditCard,
  Wallet,
  Settings,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

export function DashboardSidebar() {
  const pathname = usePathname();
  const { signOut } = useAuth();
  const { collapsed, toggle } = useSidebar();
  const items: Array<{
    href: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }> = [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/employees", label: "Employees", icon: Users },
    { href: "/dashboard/recruitment", label: "Recruitment", icon: Briefcase },
    { href: "/dashboard/payroll", label: "Payroll", icon: CreditCard },
    { href: "/dashboard/wallet", label: "Wallet", icon: Wallet },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
  ];
  return (
    <aside
      className={`hidden md:flex ${collapsed ? "w-16" : "w-64"} shrink-0 flex-col h-full border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950`}
    >
      <div className="p-3 flex items-center justify-between">
        <div className={`text-lg font-semibold ${collapsed ? "hidden" : ""}`}>
          Menu
        </div>
        <Button
          size="icon"
          variant="outline"
          className="h-8 w-8"
          onClick={toggle}
          title={collapsed ? "Expand" : "Collapse"}
        >
          {collapsed ? (
            <ChevronsRight className="h-4 w-4" />
          ) : (
            <ChevronsLeft className="h-4 w-4" />
          )}
        </Button>
      </div>
      <nav className="px-2 pb-4 space-y-1">
        {items.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm ${
                active
                  ? "bg-[var(--color-primary)] text-white"
                  : "hover:bg-zinc-100 dark:hover:bg-zinc-900"
              }`}
              title={item.label}
            >
              <Icon className="w-5 h-5" />
              <span className={`${collapsed ? "hidden" : "inline"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
      <div className="px-2 pb-4 mt-auto">
        <Button
          variant="outline"
          className={`w-full ${collapsed ? "justify-center" : "justify-start"}`}
          onClick={signOut}
          title="Logout"
        >
          <LogOut className="h-4 w-4 mr-2" />
          <span className={`${collapsed ? "hidden" : "inline"}`}>Logout</span>
        </Button>
      </div>
    </aside>
  );
}
