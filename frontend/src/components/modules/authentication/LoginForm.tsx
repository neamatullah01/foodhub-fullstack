/* eslint-disable react/no-children-prop */
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { authClient, CustomUser } from "@/lib/auth-client";
import { toast } from "sonner";
import * as z from "zod";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Loader2,
  ShieldCheck,
  Store,
  User,
  Chrome,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useSearchParams } from "next/navigation";

const loginSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

const DEMO_CREDENTIALS = [
  {
    label: "Customer",
    email: "customer@gmail.com",
    password: "customer1234",
    icon: <User className="w-4 h-4" />,
    color:
      "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/40 text-blue-700 dark:text-blue-300",
    badge: "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300",
  },
  {
    label: "Provider",
    email: "provider@gmail.com",
    password: "provider1234",
    icon: <Store className="w-4 h-4" />,
    color:
      "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900/40 text-amber-700 dark:text-amber-300",
    badge: "bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300",
  },
  {
    label: "Admin",
    email: "admin@gmail.com",
    password: "admin1234",
    icon: <ShieldCheck className="w-4 h-4" />,
    color:
      "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-700 dark:text-red-300",
    badge: "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300",
  },
];

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [demoLoading, setDemoLoading] = useState<string | null>(null);
  const [googleLoading, setGoogleLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value, formApi }) => {
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
      const toastId = toast.loading("Signing in...");

      try {
        const { data, error } = await authClient.signIn.email({
          email: value.email,
          password: value.password,
        });

        if (error) {
          toast.error(error.message || "Invalid email or password", {
            id: toastId,
          });
          return;
        }

        const user = data?.user as CustomUser | undefined;
        const userRole = user?.role?.toUpperCase();

        toast.success("Welcome back!", { id: toastId });

        if (userRole === "ADMIN") {
          router.push("/dashboard");
        } else if (userRole === "PROVIDER") {
          router.push("/dashboard");
        } else {
          window.location.href = "/";
        }
      } catch (err) {
        toast.error("Something went wrong. Please try again.", { id: toastId });
      }
    },
  });

  const handleDemoLogin = async (
    email: string,
    password: string,
    label: string,
  ) => {
    setDemoLoading(label);
    const toastId = toast.loading(`Signing in as ${label}...`);
    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });
      if (error) {
        toast.error(error.message || "Demo login failed", { id: toastId });
        return;
      }
      const user = data?.user as CustomUser | undefined;
      const userRole = user?.role?.toUpperCase();
      toast.success(`Welcome! Logged in as ${label}`, { id: toastId });
      if (userRole === "ADMIN" || userRole === "PROVIDER") {
        router.push("/dashboard");
      } else {
        window.location.href = "/";
      }
    } catch {
      toast.error("Demo login failed. Please try again.", { id: toastId });
    } finally {
      setDemoLoading(null);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch {
      toast.error("Google login failed. Please try again.");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
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

      <div className="flex items-center justify-center py-12 px-4 sm:px-8 bg-white dark:bg-slate-950 overflow-y-auto">
        <Link
          href="/"
          className="absolute top-4 left-4 md:top-8 md:left-8 flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>

        <div className="mx-auto grid w-full max-w-[400px] gap-6 py-8">
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

            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#FFC222] hover:bg-[#e5ae1e] text-black font-bold"
                >
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Login
                </Button>
              )}
            />
          </form>

          {/* Demo Credentials */}
          <div className="grid gap-3">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-center">
              Quick Demo Login
            </p>
            <div className="grid grid-cols-3 gap-2">
              {DEMO_CREDENTIALS.map((cred) => (
                <button
                  key={cred.label}
                  type="button"
                  disabled={demoLoading === cred.label}
                  onClick={() =>
                    handleDemoLogin(cred.email, cred.password, cred.label)
                  }
                  className={`relative flex flex-col items-center gap-1.5 p-3 rounded-xl border text-xs font-semibold transition-all duration-200 cursor-pointer active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed ${cred.color}`}
                >
                  {demoLoading === cred.label ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    cred.icon
                  )}
                  <span>{cred.label}</span>
                </button>
              ))}
            </div>
            <p className="text-[11px] text-center text-slate-400 dark:text-slate-500">
              One click to log in with demo accounts
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-slate-950 px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full gap-3 h-11 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 font-semibold cursor-pointer"
            type="button"
            onClick={handleGoogleLogin}
            disabled={googleLoading}
          >
            {googleLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
            )}
            Continue with Google
          </Button>

          <div className="mt-2 text-center text-sm">
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
