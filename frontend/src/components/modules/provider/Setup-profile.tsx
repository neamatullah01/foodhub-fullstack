/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import { ChefHat, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";

import { createProviderProfile } from "@/services/provider.service";

const setupProfileSchema = z.object({
  restaurantName: z.string().min(2, "Restaurant Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  phone: z.string().min(6, "Valid phone number required"),
  imageUrl: z.string().url("Valid image URL required"),
});

export default function SetupProfilePageRapper() {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      restaurantName: "",
      description: "",
      address: "",
      phone: "",
      imageUrl: "",
    },
    onSubmit: async ({ value, formApi }) => {
      const result = setupProfileSchema.safeParse(value);

      if (!result.success) {
        result.error.issues.forEach((issue) => {
          const fieldName = issue.path[0] as "restaurantName" | "description" | "address" | "phone" | "imageUrl";
          formApi.setFieldMeta(fieldName, (prev) => ({
            ...prev,
            errorMap: { onChange: issue.message },
          }));
        });
        toast.error("Please fix the validation errors.");
        return;
      }

      const toastId = toast.loading("Setting up your restaurant...");

      try {
        const response = await createProviderProfile(value);

        if (response.error) {
          throw new Error(response.error.message);
        }

        toast.success("Profile created! Welcome to FoodHub.", { id: toastId });

        router.refresh();
        router.push("/dashboard");
      } catch (error: any) {
        toast.error(error.message || "Failed to create profile", { id: toastId });
      }
    },
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-[#FFC222]/20 rounded-2xl flex items-center justify-center mb-4">
            <ChefHat className="w-8 h-8 text-[#e5ae1e]" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Complete Your Profile
          </h1>
          <p className="text-slate-500 mt-2">
            Set up your restaurant details so customers can find you.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-5"
        >
          <form.Field
            name="restaurantName"
            children={(field) => (
              <div className="space-y-2">
                <Label
                  className={
                    field.state.meta.errorMap["onChange"]
                      ? "text-destructive"
                      : ""
                  }
                >
                  Restaurant Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                    if (field.state.meta.errorMap["onChange"]) {
                      form.setFieldMeta("restaurantName", (prev) => ({
                        ...prev,
                        errorMap: { onChange: undefined },
                      }));
                    }
                  }}
                  placeholder="e.g. Burger House"
                  className={`bg-slate-50 dark:bg-slate-950/50 ${field.state.meta.errorMap["onChange"] ? "border-destructive ring-1 ring-destructive" : ""}`}
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
            name="description"
            children={(field) => (
              <div className="space-y-2">
                <Label
                  className={
                    field.state.meta.errorMap["onChange"]
                      ? "text-destructive"
                      : ""
                  }
                >
                  Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                    if (field.state.meta.errorMap["onChange"]) {
                      form.setFieldMeta("description", (prev) => ({
                        ...prev,
                        errorMap: { onChange: undefined },
                      }));
                    }
                  }}
                  placeholder="The best handcrafted burgers in town..."
                  className={`bg-slate-50 dark:bg-slate-950/50 ${field.state.meta.errorMap["onChange"] ? "border-destructive ring-1 ring-destructive" : ""}`}
                />
                {field.state.meta.errorMap["onChange"] && (
                  <p className="text-sm font-medium text-destructive">
                    {field.state.meta.errorMap["onChange"]}
                  </p>
                )}
              </div>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <form.Field
              name="phone"
              children={(field) => (
                <div className="space-y-2">
                  <Label
                    className={
                      field.state.meta.errorMap["onChange"]
                        ? "text-destructive"
                        : ""
                    }
                  >
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                      if (field.state.meta.errorMap["onChange"]) {
                        form.setFieldMeta("phone", (prev) => ({
                          ...prev,
                          errorMap: { onChange: undefined },
                        }));
                      }
                    }}
                    placeholder="+8801712345678"
                    className={`bg-slate-50 dark:bg-slate-950/50 ${field.state.meta.errorMap["onChange"] ? "border-destructive ring-1 ring-destructive" : ""}`}
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
              name="imageUrl"
              children={(field) => (
                <div className="space-y-2">
                  <Label
                    className={
                      field.state.meta.errorMap["onChange"]
                        ? "text-destructive"
                        : ""
                    }
                  >
                    Cover Image URL <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                      if (field.state.meta.errorMap["onChange"]) {
                        form.setFieldMeta("imageUrl", (prev) => ({
                          ...prev,
                          errorMap: { onChange: undefined },
                        }));
                      }
                    }}
                    placeholder="https://..."
                    className={`bg-slate-50 dark:bg-slate-950/50 ${field.state.meta.errorMap["onChange"] ? "border-destructive ring-1 ring-destructive" : ""}`}
                  />
                  {field.state.meta.errorMap["onChange"] && (
                    <p className="text-sm font-medium text-destructive">
                      {field.state.meta.errorMap["onChange"]}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          <form.Field
            name="address"
            children={(field) => (
              <div className="space-y-2">
                <Label
                  className={
                    field.state.meta.errorMap["onChange"]
                      ? "text-destructive"
                      : ""
                  }
                >
                  Full Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                    if (field.state.meta.errorMap["onChange"]) {
                      form.setFieldMeta("address", (prev) => ({
                        ...prev,
                        errorMap: { onChange: undefined },
                      }));
                    }
                  }}
                  placeholder="123 Flavor Street, Foodie City"
                  className={`bg-slate-50 dark:bg-slate-950/50 ${field.state.meta.errorMap["onChange"] ? "border-destructive ring-1 ring-destructive" : ""}`}
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
                className="w-full bg-[#FFC222] hover:bg-[#e5ae1e] text-black font-bold h-12 text-lg mt-4 transition-transform active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Saving...
                  </>
                ) : (
                  "Save & Go to Dashboard"
                )}
              </Button>
            )}
          />
        </form>
      </div>
    </div>
  );
}
