/* eslint-disable react/no-children-prop */
"use client";

import Link from "next/link";
import { useForm } from "@tanstack/react-form";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Github, Mail, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

// 1. Define Zod Schema for Login
const loginSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export default function LoginPage() {
  // 2. Setup Form
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value, formApi }) => {
      // --- A. Manual Validation ---
      const result = loginSchema.safeParse(value);

      if (!result.success) {
        result.error.issues.forEach((issue) => {
          const fieldName = issue.path[0] as "email" | "password";
          formApi.setFieldMeta(fieldName, (prev) => ({
            ...prev,
            errorMap: { onChange: issue.message },
          }));
        });
        toast.error("Please check your credentials.");
        return;
      }

      // --- B. Submit to Backend ---
      const toastId = toast.loading("Signing in...");

      try {
        const { data, error } = await authClient.signIn.email({
          email: value.email,
          password: value.password,
          callbackURL: "/", // Redirect to home on success
        });

        if (error) {
          toast.error(error.message || "Invalid email or password", {
            id: toastId,
          });
          return;
        }

        toast.success("Welcome back!", { id: toastId });
      } catch (err) {
        toast.error("Something went wrong. Please try again.", { id: toastId });
      }
    },
  });

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
      {/* --- Left Side: Visual --- */}
      <div className="hidden bg-muted lg:block relative h-full w-full overflow-hidden">
        <div
          className="absolute inset-0 h-full w-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1987&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
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
        <Link
          href="/"
          className="absolute top-4 left-4 md:top-8 md:left-8 flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>

        <div className="mx-auto grid w-full max-w-[400px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Welcome back
            </h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="grid gap-4"
          >
            {/* EMAIL FIELD */}
            <form.Field
              name="email"
              children={(field) => (
                <div className="grid gap-2">
                  <Label
                    htmlFor={field.name}
                    className={
                      field.state.meta.errorMap["onChange"]
                        ? "text-destructive"
                        : ""
                    }
                  >
                    Email
                  </Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                      if (field.state.meta.errorMap["onChange"]) {
                        form.setFieldMeta("email", (prev) => ({
                          ...prev,
                          errorMap: { onChange: undefined },
                        }));
                      }
                    }}
                    placeholder="m@example.com"
                    className="bg-slate-50 dark:bg-slate-900"
                  />
                  {field.state.meta.errorMap["onChange"] && (
                    <p className="text-sm font-medium text-destructive">
                      {field.state.meta.errorMap["onChange"]}
                    </p>
                  )}
                </div>
              )}
            />

            {/* PASSWORD FIELD */}
            <form.Field
              name="password"
              children={(field) => (
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label
                      htmlFor={field.name}
                      className={
                        field.state.meta.errorMap["onChange"]
                          ? "text-destructive"
                          : ""
                      }
                    >
                      Password
                    </Label>
                    <Link
                      href="/forgot-password"
                      className="ml-auto inline-block text-sm underline text-[#FFC222]"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="password"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                      if (field.state.meta.errorMap["onChange"]) {
                        form.setFieldMeta("password", (prev) => ({
                          ...prev,
                          errorMap: { onChange: undefined },
                        }));
                      }
                    }}
                    className="bg-slate-50 dark:bg-slate-900"
                  />
                  {field.state.meta.errorMap["onChange"] && (
                    <p className="text-sm font-medium text-destructive">
                      {field.state.meta.errorMap["onChange"]}
                    </p>
                  )}
                </div>
              )}
            />

            {/* SUBMIT BUTTON */}
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#FFC222] hover:bg-[#ffcd44] text-black font-bold"
                >
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Login
                </Button>
              )}
            />
          </form>

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

          {/* Social Buttons (UI Only for now) */}
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="w-full" type="button">
              <Mail className="mr-2 h-4 w-4" /> Google
            </Button>
            <Button variant="outline" className="w-full" type="button">
              <Github className="mr-2 h-4 w-4" /> GitHub
            </Button>
          </div>

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
