"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; // Run: npx shadcn@latest add label
import { ArrowLeft, Github, Mail } from "lucide-react";

// You might need to install separator if you haven't: npx shadcn@latest add separator
import { Separator } from "@/components/ui/separator";

export default function LoginForm() {
  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
      {/* --- Left Side: Visual (Hidden on mobile) --- */}
      <div className="hidden bg-muted lg:block relative h-full w-full overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 h-full w-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1987&auto=format&fit=crop')",
          }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Branding Text over Image */}
        <div className="absolute top-10 left-10 z-20 flex items-center gap-2 text-white">
          <div className="h-8 w-8 rounded-full bg-[#FFC222]" />
          <span className="text-xl font-bold">FoodHub</span>
        </div>

        <div className="absolute bottom-10 left-10 z-20 text-white max-w-md">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;This library has saved me countless hours of work and
              helped me deliver stunning designs to my clients faster than ever
              before.&rdquo;
            </p>
            <footer className="text-sm font-medium opacity-80">
              — Sofia Davis, Food Blogger
            </footer>
          </blockquote>
        </div>
      </div>

      {/* --- Right Side: Form --- */}
      <div className="flex items-center justify-center py-12 px-4 sm:px-8 bg-white dark:bg-slate-950">
        {/* Back Button (Mobile only) */}
        <Link
          href="/"
          className="absolute top-4 left-4 md:top-8 md:left-8 flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>

        <div className="mx-auto grid w-full max-w-[400px] gap-6">
          {/* Header */}
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Welcome back
            </h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>

          {/* Form Fields */}
          <div className="grid gap-4">
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
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline text-[#FFC222]"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                className="bg-slate-50 dark:bg-slate-900"
              />
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full bg-[#FFC222] hover:bg-[#ffcd44] text-black font-bold"
            >
              Login
            </Button>

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
          </div>

          {/* Sign Up Link */}
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="underline font-bold text-[#FFC222]"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
