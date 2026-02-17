"use client";

import { Menu, UtensilsCrossed, Search } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client"; // 1. Import Auth Client
import { useRouter } from "next/navigation";

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
import { ModeToggle } from "./ModeToggle";
import { CartSheet } from "../modules/cart/CartSheet";
import { toast } from "sonner";

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
    // ...
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
    try {
      const toastId = toast.loading("Signing out...");
      await authClient.signOut();
      toast.success("Logged out successfully", { id: toastId });
      router.refresh();
    } catch (error) {
      toast.error("Failed to log out. Please try again.", { id: toastId });
    }
  };

  return (
    <section
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className,
      )}
    >
      <div className="container mx-auto px-4">
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

          {/* 4. Desktop Auth Buttons Logic */}
          <div className="flex gap-2">
            <CartSheet />
            <Button asChild size="sm">
              <ModeToggle />
            </Button>

            {user.data ? (
              // If User Exists: Logout + Disabled Signup
              <>
                <Button size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              // If No User: Login + Signup
              <>
                <Button asChild variant="ghost" size="sm">
                  <Link href={auth.login.url}>{auth.login.title}</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href={auth.signup.url}>{auth.signup.title}</Link>
                </Button>
              </>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="flex h-16 items-center justify-between lg:hidden">
          <Link href={logo.url} className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <UtensilsCrossed className="size-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              {logo.title}
            </span>
          </Link>

          <Sheet>
            <div className="flex gap-2">
              <CartSheet></CartSheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="size-7" />
                </Button>
              </SheetTrigger>
            </div>

            <SheetContent side="right" className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle>
                  <Link href={logo.url} className="flex items-center gap-2">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <UtensilsCrossed className="size-5" />
                    </div>
                    <span className="font-bold">{logo.title}</span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 p-4">
                <Accordion
                  type="single"
                  collapsible
                  className="flex w-full flex-col gap-4"
                >
                  {menu.map((item) => renderMobileMenuItem(item))}
                </Accordion>

                {/* 5. Mobile Auth Buttons Logic */}
                <div className="flex flex-col gap-3 border-t pt-6">
                  {user.data ? (
                    <>
                      <Button onClick={handleLogout}>Logout</Button>
                    </>
                  ) : (
                    <>
                      <Button asChild variant="outline">
                        <Link href={auth.login.url}>{auth.login.title}</Link>
                      </Button>
                      <Button asChild>
                        <Link href={auth.signup.url}>{auth.signup.title}</Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </section>
  );
};

// ... (Keep the rest of your renderMenuItem and helper functions exactly as they were)
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
