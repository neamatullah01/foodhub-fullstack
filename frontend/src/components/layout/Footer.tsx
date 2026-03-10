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
  return (
    <footer className="bg-slate-50 dark:bg-slate-950 pt-16 pb-8 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-[#e63e3e]">Food</span>
              <span>Hub</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Delicious meals delivered to your doorstep. We connect you with
              the best local chefs and restaurants for fresh, homemade food.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 pt-2">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <div
                  key={i}
                  className="h-10 w-10 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center shadow-sm hover:bg-[#FFC222] hover:text-black cursor-pointer transition-all duration-300 text-slate-600 dark:text-slate-300"
                >
                  <Icon className="h-5 w-5" />
                </div>
              ))}
            </div>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
              {["Home", "Browse Menu", "Our Chefs", "Become a Provider"].map(
                (link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="hover:text-[#e63e3e] transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* 3. Contact Info */}
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
                <span>+880 1712 345 678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[#FFC222] shrink-0" />
                <span>support@foodhub.com</span>
              </li>
            </ul>
          </div>

          {/* 4. Newsletter */}
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-6">
              Stay Updated
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
              Subscribe to get special offers and seasonal menu updates.
            </p>
            <div className="flex flex-col gap-3">
              <Input
                placeholder="Enter your email"
                className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-full px-4"
              />
              <Button className="rounded-full bg-[#FFC222] hover:bg-[#ffcd44] text-black font-bold">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <Separator className="bg-slate-200 dark:bg-slate-800 mb-8" />

        {/* --- Bottom Section: Copyright --- */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
          <p>© 2026 FoodHub. All rights reserved.</p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="hover:text-slate-900 dark:hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
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
