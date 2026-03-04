"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { AdminSidebar } from "./AdminSidebar";
import { ModeToggle } from "@/components/layout/ModeToggle";
import { ProfileDropdown } from "@/components/layout/ProfileDropdown";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AdminHeader({ user }: { user: any }) {
  return (
    <header className="h-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-40">
      {/* Mobile Menu Trigger */}
      <div className="md:hidden flex items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="mr-2">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="p-0 w-64 bg-slate-900 border-r-slate-800"
          >
            <SheetTitle className="sr-only">Admin Navigation</SheetTitle>
            <AdminSidebar />
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex-1"></div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-4">
        <ModeToggle />
        {user ? <ProfileDropdown user={user} /> : null}
      </div>
    </header>
  );
}
