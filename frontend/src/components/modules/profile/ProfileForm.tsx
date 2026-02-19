/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { updateProfile } from "@/services/user.service";
import {
  User,
  Phone,
  MapPin,
  Mail,
  Loader2,
  Edit2,
  Save,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";

export function ProfileForm({ user }: { user: any }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updateProfile(formData);
      toast.success("Profile updated successfully!");
      setIsEditing(false);
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      phone: user?.phone || "",
      address: user?.address || "",
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="bg-slate-50 dark:bg-slate-950/50 p-8 border-b border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center gap-4">
        <Avatar className="h-24 w-24 border-4 border-white dark:border-slate-900 shadow-md">
          <AvatarImage src={user?.image || ""} alt={user?.name} />
          <AvatarFallback className="text-2xl bg-[#FFC222] text-black font-bold">
            {user?.name?.substring(0, 2).toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {user?.name}
          </h2>
          <p className="text-slate-500">{user?.role || "Customer"}</p>
        </div>
      </div>

      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <User className="w-5 h-5 text-[#FFC222]" />
            Personal Details
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

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-slate-500">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  value={user?.email}
                  disabled
                  className="pl-9 bg-slate-50 dark:bg-slate-950/50 text-slate-500 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  disabled={!isEditing}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className={`pl-9 ${isEditing ? "border-[#FFC222] ring-1 ring-[#FFC222]" : "bg-transparent border-slate-200"}`}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  disabled={!isEditing}
                  value={formData.phone}
                  placeholder="+8801..."
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className={`pl-9 ${isEditing ? "border-[#FFC222] ring-1 ring-[#FFC222]" : "bg-transparent border-slate-200"}`}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Delivery Address</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Textarea
                disabled={!isEditing}
                value={formData.address}
                placeholder="Enter your address..."
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className={`pl-9 min-h-[100px] resize-none ${isEditing ? "border-[#FFC222] ring-1 ring-[#FFC222]" : "bg-transparent border-slate-200"}`}
              />
            </div>
          </div>

          {isEditing && (
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-[#FFC222] text-black hover:bg-[#e5ae1e] font-bold min-w-[140px]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" /> Save Changes
                  </>
                )}
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
