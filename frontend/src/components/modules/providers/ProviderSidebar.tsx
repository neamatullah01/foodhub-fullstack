"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  UtensilsCrossed,
  ClipboardList,
  Store,
  Home,
} from "lucide-react";

const sidebarLinks = [
  { name: "Dashboard", href: "/provider/dashboard", icon: LayoutDashboard },
  { name: "Manage Menu", href: "/provider/menu", icon: UtensilsCrossed },
  { name: "Incoming Orders", href: "/provider/orders", icon: ClipboardList },
  { name: "Restaurant Profile", href: "/provider/profile", icon: Store },
];

export function ProviderSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 hidden md:flex flex-col h-screen fixed left-0 top-0 border-r border-slate-800">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800 bg-slate-950">
        <div className="flex items-center gap-2 text-white font-bold text-xl tracking-tight">
          <div className="bg-[#FFC222] text-black p-1.5 rounded-lg">
            <UtensilsCrossed className="w-5 h-5" />
          </div>
          FoodHub <span className="text-[#FFC222]">Pro</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto">
        {sidebarLinks.map((link) => {
          const isActive = pathname.startsWith(link.href);
          const Icon = link.icon;

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-medium ${
                isActive
                  ? "bg-[#FFC222] text-black shadow-sm"
                  : "hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {link.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Back to Main App */}
      <div className="p-4 border-t border-slate-800">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-medium text-slate-400 hover:text-white hover:bg-slate-800"
        >
          <Home className="w-5 h-5 shrink-0" />
          Back to App
        </Link>
      </div>
    </aside>
  );
}
