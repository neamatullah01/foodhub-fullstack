"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Layers,
  UtensilsCrossed,
} from "lucide-react";

const sidebarLinks = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Manage Users", href: "/users", icon: Users },
  { name: "All Orders", href: "/adminOrders", icon: ClipboardList },
  { name: "Manage Categories", href: "/categories", icon: Layers },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-slate-300 fixed inset-y-0 left-0 z-50">
      {/* Logo Area */}
      <div className="flex items-center justify-center h-20 border-b border-slate-800">
        <Link
          href="/"
          className="flex items-center gap-2 text-white hover:text-[#FFC222] transition-colors"
        >
          <div className="bg-[#FFC222] text-black p-1.5 rounded-lg">
            <UtensilsCrossed className="w-6 h-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight">
            FoodHub{" "}
            <span className="text-[#FFC222] text-sm align-top">ADMIN</span>
          </span>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {sidebarLinks.map((link) => {
          // Check if the current path matches the link
          const isActive =
            pathname === link.href || pathname.startsWith(`${link.href}/`);

          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium",
                isActive
                  ? "bg-[#FFC222] text-black shadow-md"
                  : "hover:bg-slate-800 hover:text-white",
              )}
            >
              <link.icon
                className={cn(
                  "w-5 h-5",
                  isActive ? "text-black" : "text-slate-400",
                )}
              />
              {link.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
