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
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
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
    { title: "Explore Restaurants", url: "/providers" },
    {
      title: "Browse Meals",
      url: "/meals",
      items: [
        {
          title: "All Meals",
          description: "Explore our complete catalog of homemade dishes.",
          icon: <Search className="w-5 h-5" />,
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
  const handleLogout = async () => {
    const toastId = toast.loading("Signing out...");
    try {
      await authClient.signOut();
      toast.success("Logged out successfully", { id: toastId });
      window.location.href = "/";
    } catch (error) {
      toast.error("Failed to log out. Please try again.", { id: toastId });
    }
  };

  const userData = user?.data?.user;
  const role = userData?.role?.toUpperCase();

  return (
    <section
      className={cn(
        "sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60",
        className,
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        <nav className="hidden h-16 items-center justify-between lg:flex">
          <div className="flex items-center gap-8">
            <Link
              href={logo.url}
              className="flex items-center gap-2 group transition-opacity hover:opacity-90 cursor-pointer"
            >
              <div className="flex size-9 items-center justify-center rounded-xl bg-[#FFC222] text-black shadow-sm">
                <UtensilsCrossed className="size-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                {logo.title}
              </span>
            </Link>

            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList className="gap-2">
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {role !== "PROVIDER" && role !== "ADMIN" && <CartSheet />}

            <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-1"></div>

            <Button
              asChild
              size="icon"
              variant="ghost"
              className="rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              <ModeToggle />
            </Button>

            {userData ? (
              <div className="ml-2">
                <ProfileDropdown user={userData} />
              </div>
            ) : (
              <div className="flex items-center gap-2 ml-2">
                <Button
                  asChild
                  variant="ghost"
                  className="font-medium hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full px-5 cursor-pointer"
                >
                  <Link href={auth.login.url}>{auth.login.title}</Link>
                </Button>
                <Button
                  asChild
                  className="bg-[#FFC222] text-black hover:bg-[#e5ae1e] font-bold rounded-full px-6 shadow-sm transition-transform active:scale-95 cursor-pointer"
                >
                  <Link href={auth.signup.url}>{auth.signup.title}</Link>
                </Button>
              </div>
            )}
          </div>
        </nav>

        <div className="flex h-16 items-center justify-between lg:hidden">
          <Link
            href={logo.url}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="flex size-8 items-center justify-center rounded-lg bg-[#FFC222] text-black shadow-sm">
              <UtensilsCrossed className="size-4" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              {logo.title}
            </span>
          </Link>

          <div className="flex items-center gap-1">
            {role !== "PROVIDER" && role !== "ADMIN" && <CartSheet />}

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  <Menu className="size-6 text-slate-700 dark:text-slate-300" />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-[300px] sm:w-[400px] p-0 flex flex-col bg-white dark:bg-slate-950 border-l border-slate-200 dark:border-slate-800"
              >
                <SheetHeader className="p-6 border-b border-slate-100 dark:border-slate-800/50 text-left">
                  <SheetTitle>
                    <Link
                      href={logo.url}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <div className="flex size-8 items-center justify-center rounded-lg bg-[#FFC222] text-black shadow-sm">
                        <UtensilsCrossed className="size-4" />
                      </div>
                      <span className="font-bold text-lg text-slate-900 dark:text-white">
                        {logo.title}
                      </span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto p-6">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-800/50 p-6 bg-slate-50 dark:bg-slate-900/20 mt-auto">
                  {userData ? (
                    <div className="flex flex-col gap-5">
                      <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <Avatar className="h-10 w-10 border border-slate-100 dark:border-slate-700">
                          <AvatarImage
                            src={userData.image || ""}
                            alt={userData.name}
                          />
                          <AvatarFallback className="bg-[#FFC222] text-black font-bold">
                            {userData.name?.substring(0, 2).toUpperCase() ||
                              "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                              {userData.name}
                            </p>
                            {role === "PROVIDER" && (
                              <span className="bg-[#FFC222]/20 text-[#e5ae1e] text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0">
                                PRO
                              </span>
                            )}
                            {role === "ADMIN" && (
                              <span className="bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0">
                                ADMIN
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 truncate">
                            {userData.email}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3 mt-2">
                        {role === "PROVIDER" && (
                          <>
                            <Link
                              href="/dashboard"
                              className="flex items-center gap-3 mobile-nav-link cursor-pointer"
                            >
                              <LayoutDashboard className="size-4 text-[#FFC222]" />
                              Dashboard
                            </Link>
                            <Link
                              href="/incomingOrders"
                              className="flex items-center gap-3 mobile-nav-link cursor-pointer"
                            >
                              <ClipboardList className="size-4 text-[#FFC222]" />
                              Incoming Orders
                            </Link>
                          </>
                        )}
                        {role === "ADMIN" && (
                          <>
                            <Link
                              href="/dashboard"
                              className="flex items-center gap-3 mobile-nav-link cursor-pointer"
                            >
                              <ShieldCheck className="size-4 text-[#FFC222]" />
                              Admin Dashboard
                            </Link>
                          </>
                        )}
                        {role !== "PROVIDER" && role !== "ADMIN" && (
                          <>
                            <Link
                              href="/profile"
                              className="flex items-center gap-3 mobile-nav-link cursor-pointer"
                            >
                              <User className="size-4 text-[#FFC222]" />
                              Manage Profile
                            </Link>
                            <Link
                              href="/orders"
                              className="flex items-center gap-3 mobile-nav-link cursor-pointer"
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
                        className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 dark:border-red-900/30 dark:hover:bg-red-950/30 rounded-xl cursor-pointer mt-2"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <Button
                        asChild
                        variant="outline"
                        className="w-full rounded-xl border-slate-200 dark:border-slate-800 cursor-pointer"
                      >
                        <Link href={auth.login.url}>{auth.login.title}</Link>
                      </Button>
                      <Button
                        asChild
                        className="w-full bg-[#FFC222] text-black hover:bg-[#e5ae1e] font-bold rounded-xl shadow-sm cursor-pointer"
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

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger className="bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 focus:bg-slate-100 dark:focus:bg-slate-800 data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800 rounded-full px-4 font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer">
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-white dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 shadow-xl">
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
        <Link
          href={item.url}
          className={cn(
            navigationMenuTriggerStyle(),
            "bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 focus:bg-slate-100 dark:focus:bg-slate-800 rounded-full px-4 font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer",
          )}
        >
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
        <AccordionTrigger className="text-base font-semibold text-slate-800 dark:text-slate-200 hover:text-[#FFC222] hover:no-underline transition-colors py-2 cursor-pointer">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-1 flex flex-col gap-1 pl-4 border-l-2 border-slate-100 dark:border-slate-800 ml-2">
          {item.items.map((subItem) => (
            <Link
              key={subItem.title}
              href={subItem.url}
              className="flex items-center gap-3 rounded-lg p-3 text-sm font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
            >
              {subItem.icon && (
                <span className="text-[#FFC222]">{subItem.icon}</span>
              )}
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
      className="block py-2 text-base font-semibold text-slate-800 dark:text-slate-200 hover:text-[#FFC222] transition-colors cursor-pointer"
    >
      {item.title}
    </Link>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <Link
      href={item.url}
      className="flex select-none gap-4 rounded-xl p-4 leading-none no-underline transition-all outline-none hover:bg-slate-50 dark:hover:bg-slate-900 hover:shadow-sm focus:bg-slate-50 dark:focus:bg-slate-900 group cursor-pointer"
    >
      {item.icon && (
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#FFC222]/10 text-[#e5ae1e] group-hover:bg-[#FFC222] group-hover:text-black transition-colors">
          {item.icon}
        </div>
      )}
      <div className="space-y-1.5">
        <div className="text-sm font-bold leading-none text-slate-900 dark:text-white group-hover:text-[#e5ae1e] transition-colors">
          {item.title}
        </div>
        {item.description && (
          <p className="text-xs leading-snug text-slate-500 dark:text-slate-400 line-clamp-2">
            {item.description}
          </p>
        )}
      </div>
    </Link>
  );
};

export { Navbar };
