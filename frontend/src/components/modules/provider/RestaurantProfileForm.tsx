"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { updateProviderProfile } from "@/services/provider.service";
import {
  Store,
  Phone,
  MapPin,
  Loader2,
  Edit2,
  Save,
  X,
  FileText,
  Image as ImageIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

const providerProfileSchema = z.object({
  restaurantName: z.string().min(2, "Restaurant Name must be at least 2 characters"),
  phone: z.string().optional(),
  address: z.string().optional(),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
});

export function RestaurantProfileForm({ provider }: { provider: any }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm({
    defaultValues: {
      restaurantName: provider?.restaurantName || "",
      phone: provider?.phone || "",
      address: provider?.address || "",
      description: provider?.description || "",
      imageUrl: provider?.imageUrl || "",
    },
    onSubmit: async ({ value, formApi }) => {
      const result = providerProfileSchema.safeParse(value);

      if (!result.success) {
        result.error.issues.forEach((issue) => {
          const fieldName = issue.path[0] as "restaurantName" | "phone" | "address" | "description" | "imageUrl";
          formApi.setFieldMeta(fieldName, (prev) => ({
            ...prev,
            errorMap: { onChange: issue.message },
          }));
        });
        toast.error("Please fix the validation errors.");
        return;
      }

      const toastId = toast.loading("Updating provider profile...");

      try {
        const response = await updateProviderProfile(value);
        if (response.error) {
          throw new Error(response.error.message);
        }
        toast.success("Profile updated successfully!", { id: toastId });
        setIsEditing(false);
        router.refresh();
      } catch (error: any) {
        toast.error(error.message || "Failed to update profile", { id: toastId });
      }
    },
  });

  const handleCancel = () => {
    form.reset();
    setIsEditing(false);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="bg-slate-50 dark:bg-slate-950/50 p-8 border-b border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center gap-4">
        <Avatar className="h-24 w-24 border-4 border-white dark:border-slate-900 shadow-md">
          <AvatarImage src={provider?.imageUrl || ""} alt={provider?.restaurantName} />
          <AvatarFallback className="text-2xl bg-[#FFC222] text-black font-bold">
            {provider?.restaurantName?.substring(0, 2).toUpperCase() || "R"}
          </AvatarFallback>
        </Avatar>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {provider?.restaurantName}
          </h2>
          <p className="text-slate-500">Provider Profile</p>
        </div>
      </div>

      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Store className="w-5 h-5 text-[#FFC222]" />
            Restaurant Details
          </h3>

          {!isEditing ? (
            <Button
              onClick={() => setIsEditing(true)}
              variant="outline"
              size="sm"
            >
              <Edit2 className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <Button
              onClick={handleCancel}
              variant="ghost"
              size="sm"
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    Restaurant Name
                  </Label>
                  <div className="relative">
                    <Store className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      disabled={!isEditing}
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
                      className={`pl-9 ${isEditing ? (field.state.meta.errorMap["onChange"] ? "border-destructive ring-1 ring-destructive" : "border-[#FFC222] ring-1 ring-[#FFC222]") : "bg-transparent border-slate-200"}`}
                    />
                  </div>
                  {field.state.meta.errorMap["onChange"] && (
                    <p className="text-sm font-medium text-destructive">
                      {field.state.meta.errorMap["onChange"]}
                    </p>
                  )}
                </div>
              )}
            />

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
                    Contact Number
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      disabled={!isEditing}
                      name={field.name}
                      value={field.state.value}
                      placeholder="+8801..."
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
                      className={`pl-9 ${isEditing ? (field.state.meta.errorMap["onChange"] ? "border-destructive ring-1 ring-destructive" : "border-[#FFC222] ring-1 ring-[#FFC222]") : "bg-transparent border-slate-200"}`}
                    />
                  </div>
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
                  Restaurant Description
                </Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Textarea
                    disabled={!isEditing}
                    name={field.name}
                    value={field.state.value}
                    placeholder="Tell your customers about your restaurant..."
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
                    className={`pl-9 min-h-[100px] resize-none ${isEditing ? (field.state.meta.errorMap["onChange"] ? "border-destructive ring-1 ring-destructive" : "border-[#FFC222] ring-1 ring-[#FFC222]") : "bg-transparent border-slate-200"}`}
                  />
                </div>
                {field.state.meta.errorMap["onChange"] && (
                  <p className="text-sm font-medium text-destructive">
                    {field.state.meta.errorMap["onChange"]}
                  </p>
                )}
              </div>
            )}
          />

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
                  Restaurant Address
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Textarea
                    disabled={!isEditing}
                    name={field.name}
                    value={field.state.value}
                    placeholder="Enter your restaurant address..."
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
                    className={`pl-9 min-h-[80px] resize-none ${isEditing ? (field.state.meta.errorMap["onChange"] ? "border-destructive ring-1 ring-destructive" : "border-[#FFC222] ring-1 ring-[#FFC222]") : "bg-transparent border-slate-200"}`}
                  />
                </div>
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
                  Cover Image URL
                </Label>
                <div className="relative">
                  <ImageIcon className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    disabled={!isEditing}
                    name={field.name}
                    value={field.state.value}
                    placeholder="https://..."
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
                    className={`pl-9 ${isEditing ? (field.state.meta.errorMap["onChange"] ? "border-destructive ring-1 ring-destructive" : "border-[#FFC222] ring-1 ring-[#FFC222]") : "bg-transparent border-slate-200"}`}
                  />
                </div>
                {field.state.meta.errorMap["onChange"] && (
                  <p className="text-sm font-medium text-destructive">
                    {field.state.meta.errorMap["onChange"]}
                  </p>
                )}
              </div>
            )}
          />

          {isEditing && (
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#FFC222] text-black hover:bg-[#e5ae1e] font-bold min-w-[140px]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" /> Save Changes
                      </>
                    )}
                  </Button>
                )}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
