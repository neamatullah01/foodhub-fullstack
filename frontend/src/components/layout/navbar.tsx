"use client";

import {
  Menu,
  UtensilsCrossed,
  Search,
  User,
  ShoppingBag,
  LogOut,
  LayoutDashboard,
  ClipboardList,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { ModeToggle } from "./ModeToggle";
import { CartSheet } from "../modules/cart/CartSheet";
import { ProfileDropdown } from "./ProfileDropdown";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface NavbarProps {
  className?: string;
  logo?: {
    url: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user?: any;
}

const Navbar = ({
  logo = {
    url: "/",
    alt: "FoodHub Logo",
    title: "FoodHub",
  },
  menu = [
    { title: "Home", url: "/" },
    {
      title: "Browse Meals",
      url: "/meals",
      items: [
        {
          title: "All Meals",
          description: "Explore our complete catalog of homemade dishes.",
          icon: <Search className="size-5 shrink-0" />,
          url: "/meals",
        },
      ],
    },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Sign up", url: "/register" },
  },
  className,
  user,
}: NavbarProps) => {
  const router = useRouter();

  const handleLogout = async () => {
    const toastId = toast.loading("Signing out...");
    try {
      await authClient.signOut();
      toast.success("Logged out successfully", { id: toastId });
      router.refresh();
      router.push("/");
    } catch (error) {
      toast.error("Failed to log out. Please try again.", { id: toastId });
    }
  };

  // 1. Properly extract the deeply nested user object and role
  const userData = user?.data?.user;
  const role = userData?.role?.toUpperCase();

  return (
    <section
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className,
      )}
    >
      <div className="container mx-auto px-4">
        {/* --- DESKTOP NAV --- */}
        <nav className="hidden h-16 items-center justify-between lg:flex">
          <div className="flex items-center gap-6">
            <Link href={logo.url} className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <UtensilsCrossed className="size-5" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                {logo.title}
              </span>
            </Link>

            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          <div className="flex gap-2 items-center">
            {/* 2. Hide Cart for Providers */}
            {role !== "PROVIDER" && <CartSheet />}

            <Button asChild size="sm" variant="ghost">
              <ModeToggle />
            </Button>

            {userData ? (
              <>
                {/* Pass the extracted userData here so the Dropdown reads it correctly */}
                <ProfileDropdown user={userData} />
              </>
            ) : (
              <>
                <Button asChild variant="ghost" size="sm">
                  <Link href={auth.login.url}>{auth.login.title}</Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="bg-[#FFC222] text-black hover:bg-[#e5ae1e]"
                >
                  <Link href={auth.signup.url}>{auth.signup.title}</Link>
                </Button>
              </>
            )}
          </div>
        </nav>

        {/* --- MOBILE NAV --- */}
        <div className="flex h-16 items-center justify-between lg:hidden">
          <Link href={logo.url} className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <UtensilsCrossed className="size-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              {logo.title}
            </span>
          </Link>

          <div className="flex items-center gap-2">
            {/* 3. Hide Cart for Providers on Mobile */}
            {role !== "PROVIDER" && <CartSheet />}

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="size-7" />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="overflow-y-auto flex flex-col h-full"
              >
                <SheetHeader>
                  <SheetTitle className="text-left">
                    <Link href={logo.url} className="flex items-center gap-2">
                      <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <UtensilsCrossed className="size-5" />
                      </div>
                      <span className="font-bold">{logo.title}</span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>

                {/* Mobile Menu Links */}
                <div className="flex-1 flex flex-col gap-6 p-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>
                </div>

                {/* Mobile Auth & Profile Section (Pinned to Bottom) */}
                <div className="border-t p-6 bg-slate-50/50 dark:bg-slate-900/50 mt-auto">
                  {userData ? (
                    <div className="flex flex-col gap-4">
                      {/* User Mini Profile Header */}
                      <div className="flex items-center gap-3 mb-2">
                        <Avatar className="h-10 w-10 border border-slate-200 dark:border-slate-700">
                          <AvatarImage
                            src={userData.image || ""}
                            alt={userData.name}
                          />
                          <AvatarFallback className="bg-[#FFC222] text-black font-bold">
                            {userData.name?.substring(0, 2).toUpperCase() ||
                              "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold text-foreground">
                              {userData.name}
                            </p>
                            {/* PRO badge on mobile */}
                            {role === "PROVIDER" && (
                              <span className="bg-[#FFC222]/20 text-[#e5ae1e] text-[10px] font-bold px-1.5 py-0.5 rounded">
                                PRO
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {userData.email}
                          </p>
                        </div>
                      </div>

                      {/* Conditional Mobile Profile Links */}
                      <div className="flex flex-col gap-1">
                        {role === "PROVIDER" ? (
                          <>
                            <Link
                              href="/dashboard"
                              className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            >
                              <LayoutDashboard className="size-4 text-[#FFC222]" />
                              Dashboard
                            </Link>
                            <Link
                              href="/incomingOrders"
                              className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            >
                              <ClipboardList className="size-4 text-[#FFC222]" />
                              Incoming Orders
                            </Link>
                          </>
                        ) : (
                          <>
                            <Link
                              href="/profile"
                              className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            >
                              <User className="size-4 text-[#FFC222]" />
                              Manage Profile
                            </Link>
                            <Link
                              href="/orders"
                              className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            >
                              <ShoppingBag className="size-4 text-[#FFC222]" />
                              My Orders
                            </Link>
                          </>
                        )}
                      </div>

                      <Button
                        onClick={handleLogout}
                        variant="outline"
                        className="w-full mt-2 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 dark:border-red-900/30 dark:hover:bg-red-950/30"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <Button asChild variant="outline" className="w-full">
                        <Link href={auth.login.url}>{auth.login.title}</Link>
                      </Button>
                      <Button
                        asChild
                        className="w-full bg-[#FFC222] text-black hover:bg-[#e5ae1e]"
                      >
                        <Link href={auth.signup.url}>{auth.signup.title}</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Helper Functions ---

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
            {item.items.map((subItem) => (
              <li key={subItem.title}>
                <NavigationMenuLink asChild>
                  <SubMenuLink item={subItem} />
                </NavigationMenuLink>
              </li>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink asChild>
        <Link href={item.url} className={navigationMenuTriggerStyle()}>
          {item.title}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-base font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2 flex flex-col gap-2 pl-4">
          {item.items.map((subItem) => (
            <Link
              key={subItem.title}
              href={subItem.url}
              className="flex items-center gap-2 rounded-md p-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              {subItem.icon && <span className="size-4">{subItem.icon}</span>}
              {subItem.title}
            </Link>
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Link
      key={item.title}
      href={item.url}
      className="py-2 text-base font-semibold hover:text-primary"
    >
      {item.title}
    </Link>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <Link
      href={item.url}
      className="flex select-none gap-3 rounded-md p-3 leading-none no-underline transition-colors outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
    >
      {item.icon && (
        <div className="flex size-8 shrink-0 items-center justify-center text-primary">
          {item.icon}
        </div>
      )}
      <div className="space-y-1">
        <div className="text-sm font-medium leading-none">{item.title}</div>
        {item.description && (
          <p className="text-xs leading-snug text-muted-foreground line-clamp-2">
            {item.description}
          </p>
        )}
      </div>
    </Link>
  );
};

export { Navbar };
