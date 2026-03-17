/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChefHat, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

import { createProviderProfile } from "@/services/provider.service";

export default function SetupProfilePageRapper() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    restaurantName: "",
    description: "",
    address: "",
    phone: "",
    imageUrl: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const toastId = toast.loading("Setting up your restaurant...");

    try {
      const response = await createProviderProfile(formData);

      if (response.error) {
        throw new Error(response.error.message);
      }

      toast.success("Profile created! Welcome to FoodHub.", { id: toastId });

      router.refresh();
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Failed to create profile", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

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

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label>
              Restaurant Name <span className="text-red-500">*</span>
            </Label>
            <Input
              required
              placeholder="e.g. Burger House"
              value={formData.restaurantName}
              onChange={(e) =>
                setFormData({ ...formData, restaurantName: e.target.value })
              }
              className="bg-slate-50 dark:bg-slate-950/50"
            />
          </div>

          <div className="space-y-2">
            <Label>
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              required
              placeholder="The best handcrafted burgers in town..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="bg-slate-50 dark:bg-slate-950/50"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label>
                Phone Number <span className="text-red-500">*</span>
              </Label>
              <Input
                required
                placeholder="+8801712345678"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="bg-slate-50 dark:bg-slate-950/50"
              />
            </div>
            <div className="space-y-2">
              <Label>
                Cover Image URL <span className="text-red-500">*</span>
              </Label>
              <Input
                required
                placeholder="https://..."
                value={formData.imageUrl}
                onChange={(e) =>
                  setFormData({ ...formData, imageUrl: e.target.value })
                }
                className="bg-slate-50 dark:bg-slate-950/50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>
              Full Address <span className="text-red-500">*</span>
            </Label>
            <Input
              required
              placeholder="123 Flavor Street, Foodie City"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="bg-slate-50 dark:bg-slate-950/50"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#FFC222] hover:bg-[#ffcd44] text-black font-bold h-12 text-lg mt-4 transition-transform active:scale-[0.98]"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              "Save & Go to Dashboard"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
