"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Github, Mail, ChefHat, User } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function RegisterForm() {
  // State to track role (default to customer)
  const [role, setRole] = useState("customer");

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
      {/* --- Left Side: Visual (Image) --- */}
      <div className="hidden bg-muted lg:block relative h-full w-full overflow-hidden">
        {/* Background Image - Different from Login to differentiate */}
        <div
          className="absolute inset-0 h-full w-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-black/50" />

        {/* Branding */}
        <div className="absolute top-10 left-10 z-20 flex items-center gap-2 text-white">
          <div className="h-8 w-8 rounded-full bg-[#FFC222]" />
          <span className="text-xl font-bold">FoodHub</span>
        </div>

        {/* Dynamic Quote based on Role */}
        <div className="absolute bottom-10 left-10 z-20 text-white max-w-md">
          <blockquote className="space-y-2">
            <p className="text-lg">
              {role === "customer"
                ? "“Ordering from FoodHub has completely changed my busy weeknight dinners. Fast, fresh, and delicious!”"
                : "“Joining FoodHub as a provider helped me grow my catering business by 200% in just three months.”"}
            </p>
            <footer className="text-sm font-medium opacity-80">
              {role === "customer"
                ? "— Sarah J., Happy Customer"
                : "— Chef Antonio, Pizza Master"}
            </footer>
          </blockquote>
        </div>
      </div>

      {/* --- Right Side: Form --- */}
      <div className="flex items-center justify-center py-12 px-4 sm:px-8 bg-white dark:bg-slate-950">
        {/* Back Button */}
        <Link
          href="/"
          className="absolute top-4 left-4 md:top-8 md:left-8 flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>

        <div className="mx-auto grid w-full max-w-[400px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Create an account
            </h1>
            <p className="text-balance text-muted-foreground">
              Join thousands of foodies and chefs today
            </p>
          </div>

          {/* --- Role Selection Tabs --- */}
          <Tabs
            defaultValue="customer"
            onValueChange={(val) => setRole(val)}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="customer">
                <User className="mr-2 h-4 w-4" /> Customer
              </TabsTrigger>
              <TabsTrigger value="provider">
                <ChefHat className="mr-2 h-4 w-4" /> Provider
              </TabsTrigger>
            </TabsList>

            {/* Common Form Content (Labels change based on role) */}
            <div className="grid gap-4">
              {/* Name Field (Changes label based on role) */}
              <div className="grid gap-2">
                <Label htmlFor="name">
                  {role === "customer"
                    ? "Full Name"
                    : "Restaurant / Business Name"}
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder={
                    role === "customer" ? "John Doe" : "Burger King's Kitchen"
                  }
                  required
                  className="bg-slate-50 dark:bg-slate-900"
                />
              </div>

              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="bg-slate-50 dark:bg-slate-900"
                />
              </div>

              {/* Password */}
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  className="bg-slate-50 dark:bg-slate-900"
                />
              </div>

              {/* Register Button */}
              <Button
                type="submit"
                className="w-full bg-[#FFC222] hover:bg-[#ffcd44] text-black font-bold"
              >
                Register as {role === "customer" ? "Customer" : "Provider"}
              </Button>
            </div>
          </Tabs>

          {/* Social Login Separator */}
          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-slate-950 px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="w-full">
              <Mail className="mr-2 h-4 w-4" /> Google
            </Button>
            <Button variant="outline" className="w-full">
              <Github className="mr-2 h-4 w-4" /> GitHub
            </Button>
          </div>

          {/* Login Link */}
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline font-bold text-[#FFC222]">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
