/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import Link from "next/link";
import { ModeToggle } from "@/components/layout/ModeToggle";
import { ProfileDropdown } from "@/components/layout/ProfileDropdown";

export function ProviderHeader({ user }: { user: any }) {
  return (
    <header className="h-16 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-40">
      <div className="md:hidden flex items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="-ml-2">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-64 bg-slate-900 border-r-slate-800 p-0"
          >
            <SheetTitle className="sr-only">Provider Navigation</SheetTitle>
            <div className="p-6 text-white font-bold text-xl border-b border-slate-800">
              FoodHub Pro
            </div>
            <nav className="p-4 flex flex-col gap-2">
              <Link
                href="/dashboard"
                className="text-slate-300 hover:text-white p-2"
              >
                Dashboard
              </Link>
              <Link
                href="/menu"
                className="text-slate-300 hover:text-white p-2"
              >
                Manage Menu
              </Link>
              <Link
                href="/providerOrders"
                className="text-slate-300 hover:text-white p-2"
              >
                Orders
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden md:block"></div>

      <div className="flex items-center gap-3">
        <ModeToggle />
        {user && <ProfileDropdown user={user} />}
      </div>
    </header>
  );
}
