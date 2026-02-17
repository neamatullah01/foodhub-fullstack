/* eslint-disable react/no-children-prop */
"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ChefHat, User, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [role, setRole] = useState("CUSTOMER");

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: async ({ value, formApi }) => {
      const result = formSchema.safeParse(value);

      if (!result.success) {
        result.error.issues.forEach((issue) => {
          const fieldName = issue.path[0] as "name" | "email" | "password";
          formApi.setFieldMeta(fieldName, (prev) => ({
            ...prev,
            errorMap: { onChange: issue.message },
          }));
        });
        toast.error("Please fix the errors below.");
        return;
      }

      const toastId = toast.loading("Creating account...");

      try {
        const { data, error } = await authClient.signUp.email({
          email: value.email,
          password: value.password,
          name: value.name,
          role: role === "PROVIDER" ? "PROVIDER" : "CUSTOMER",
          callbackURL: callbackUrl,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any);

        if (error) {
          toast.error(error.message || "Registration failed", { id: toastId });
          return;
        }

        toast.success("Account created successfully!", { id: toastId });
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
              "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute top-10 left-10 z-20 flex items-center gap-2 text-white">
          <div className="h-8 w-8 rounded-full bg-[#FFC222]" />
          <span className="text-xl font-bold">FoodHub</span>
        </div>

        <div className="absolute bottom-10 left-10 z-20 text-white max-w-md">
          <blockquote className="space-y-2">
            <p className="text-lg">
              {role === "CUSTOMER"
                ? "“Ordering from FoodHub has completely changed my busy weeknight dinners. Fast, fresh, and delicious!”"
                : "“Joining FoodHub as a provider helped me grow my catering business by 200% in just three months.”"}
            </p>
            <footer className="text-sm font-medium opacity-80">
              {role === "CUSTOMER"
                ? "— Sarah J., Happy Customer"
                : "— Chef Antonio, Pizza Master"}
            </footer>
          </blockquote>
        </div>
      </div>
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
              Create an account
            </h1>
            <p className="text-balance text-muted-foreground">
              Join thousands of foodies and chefs today
            </p>
          </div>

          <Tabs
            defaultValue="CUSTOMER"
            onValueChange={(val) => setRole(val)}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="CUSTOMER">
                <User className="mr-2 h-4 w-4" /> Customer
              </TabsTrigger>
              <TabsTrigger value="PROVIDER">
                <ChefHat className="mr-2 h-4 w-4" /> Provider
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="grid gap-4"
          >
            <form.Field
              name="name"
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
                    {role === "CUSTOMER" ? "Full Name" : "Provider Name"}
                  </Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                      if (field.state.meta.errorMap["onChange"]) {
                        form.setFieldMeta("name", (prev) => ({
                          ...prev,
                          errorMap: { onChange: undefined },
                        }));
                      }
                    }}
                    placeholder={"Enter your full name"}
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
                  className="w-full bg-[#FFC222] hover:bg-[#ffcd44] text-black font-bold mt-2"
                >
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Register as {role === "CUSTOMER" ? "Customer" : "Provider"}
                </Button>
              )}
            />
          </form>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-slate-950 px-2 text-muted-foreground">
                Or
              </span>
            </div>
          </div>

          <div className="text-center text-sm">
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
