"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Facebook,
  Instagram,
  Twitter,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

export function Footer() {
  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Browse Menu", href: "/meals" },
    { label: "Cafes & Restaurants", href: "/providers" },
    { label: "Sign Up", href: "/register" },
  ];

  const socialLinks = [
    { Icon: Facebook, href: "https://facebook.com" },
    { Icon: Instagram, href: "https://instagram.com" },
    { Icon: Twitter, href: "https://twitter.com" },
  ];

  return (
    <footer className="bg-slate-50 dark:bg-slate-950 pt-16 pb-8 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="text-[#e63e3e]">Food</span>
                <span>Hub</span>
              </h2>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Delicious meals delivered to your doorstep. We connect you with
              the best local chefs and restaurants for fresh, homemade food.
            </p>

            <div className="flex gap-4 pt-2">
              {socialLinks.map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center shadow-sm hover:bg-[#FFC222] hover:text-black transition-all duration-300 text-slate-600 dark:text-slate-300"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-[#e63e3e] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-6">
              Contact Us
            </h3>
            <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[#FFC222] shrink-0" />
                <span>123 Foodie Lane, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[#FFC222] shrink-0" />
                <a href="tel:+8801712345678" className="hover:text-[#e63e3e] transition-colors">
                  +880 1712 345 678
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[#FFC222] shrink-0" />
                <a href="mailto:support@foodhub.com" className="hover:text-[#e63e3e] transition-colors">
                  support@foodhub.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-6">
              Stay Updated
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
              Subscribe to get special offers and seasonal menu updates.
            </p>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
              <Input
                placeholder="Enter your email"
                className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-full px-4 flex-1"
              />
              <Button className="rounded-full bg-[#FFC222] hover:bg-[#e5ae1e] text-black font-bold">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <Separator className="bg-slate-200 dark:bg-slate-800 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500 dark:text-slate-400 text-center md:text-left">
          <p>© {new Date().getFullYear()} FoodHub. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <Link
              href="/privacy"
              className="hover:text-slate-900 dark:hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-slate-900 dark:hover:text-white"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
