/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Image as ImageIcon,
  CheckCircle2,
  XCircle,
  UtensilsCrossed,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Image from "next/image";
import { addMeals, deleteMeal, updateMeal } from "@/services/provider.service";

export interface Meal {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string | null;
  isAvailable: boolean;
  categoryId: string;
}

export interface Category {
  id: string;
  name: string;
}

export function MenuManager({
  providerData,
  categories = [],
}: {
  providerData: any;
  categories: Category[];
}) {
  const [meals, setMeals] = useState<Meal[]>(providerData?.meals || []);
  const [searchQuery, setSearchQuery] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMeal, setEditingMeal] = useState<Meal | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    categoryId: "",
    isAvailable: true,
  });

  const filteredMeals = meals.filter((meal) =>
    meal.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleOpenAdd = () => {
    setEditingMeal(null);
    setFormData({
      name: "",
      description: "",
      price: "",
      imageUrl: "",
      categoryId: "",
      isAvailable: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (meal: Meal) => {
    setEditingMeal(meal);
    setFormData({
      name: meal.name,
      description: meal.description,
      price: meal.price.toString(),
      imageUrl: meal.imageUrl || "",
      categoryId: meal.categoryId || "",
      isAvailable: meal.isAvailable,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    toast("Delete this meal?", {
      description: "Are you sure? This action cannot be undone.",
      duration: 8000,
      cancel: {
        label: "Cancel",
        onClick: () => toast.dismiss(),
      },
      action: {
        label: "Delete",
        onClick: async () => {
          const toastId = toast.loading("Deleting meal...");
          try {
            const response = await deleteMeal(id);

            if (response.error) {
              toast.error(response.error.message || "Failed to delete meal", {
                id: toastId,
              });
              return;
            }

            setMeals(meals.filter((m) => m.id !== id));
            toast.success("Meal deleted successfully", { id: toastId });
          } catch (error) {
            toast.error("Something went wrong", { id: toastId });
          }
        },
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.categoryId) {
      toast.error("Please select a category.");
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        imageUrl: formData.imageUrl || null,
        categoryId: formData.categoryId,
        isAvailable: formData.isAvailable,
      };

      if (editingMeal) {
        const response = await updateMeal(editingMeal.id, payload);

        if (response.error) {
          toast.error(response.error.message);
          setIsLoading(false);
          return;
        }

        setMeals(
          meals.map((m) =>
            m.id === editingMeal.id ? { ...m, ...payload } : m,
          ),
        );
        toast.success("Meal updated successfully!");
      } else {
        const response = await addMeals(payload);

        if (response.error) {
          toast.error(
            response.error.message || "Failed to add meal to the database.",
          );
          setIsLoading(false);
          return;
        }

        const newlyCreatedMeal = response.data;

        const safeNewMeal = {
          ...payload,
          id: newlyCreatedMeal?.id || Math.random().toString(),
        };

        setMeals([safeNewMeal, ...meals]);
        toast.success("New meal added successfully!");
      }

      setIsModalOpen(false);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getCategoryName = (id: string) => {
    return categories.find((c) => c.id === id)?.name || "Uncategorized";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            placeholder="Search your meals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-slate-50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 rounded-xl"
          />
        </div>
        <Button
          onClick={handleOpenAdd}
          className="w-full sm:w-auto bg-[#FFC222] text-black hover:bg-[#e5ae1e] font-bold rounded-xl shadow-sm"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Meal
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredMeals.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <UtensilsCrossed className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
              No meals found
            </h3>
            <p className="text-slate-500">
              {searchQuery
                ? "Try a different search term."
                : "Add a new meal to get started."}
            </p>
          </div>
        ) : (
          filteredMeals.map((meal) => (
            <div
              key={meal.id}
              className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-5 w-full sm:w-auto">
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center relative">
                  {meal.imageUrl ? (
                    <Image
                      src={meal.imageUrl}
                      alt={meal.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <ImageIcon className="w-8 h-8 text-slate-400" />
                  )}
                </div>

                <div className="flex flex-col">
                  <h4 className="font-bold text-lg text-slate-900 dark:text-white line-clamp-1">
                    {meal.name}
                  </h4>
                  <span className="text-xs font-semibold text-slate-400 mb-1">
                    {getCategoryName(meal.categoryId)}
                  </span>
                  <p className="text-sm text-slate-500 line-clamp-1 mb-2 max-w-md">
                    {meal.description}
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-[#e11d48]">
                      ৳{meal.price.toFixed(2)}
                    </span>
                    <span
                      className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-md ${
                        meal.isAvailable
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {meal.isAvailable ? (
                        <CheckCircle2 className="w-3 h-3" />
                      ) : (
                        <XCircle className="w-3 h-3" />
                      )}
                      {meal.isAvailable ? "Available" : "Unavailable"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t sm:border-t-0 border-slate-100 dark:border-slate-800 pt-4 sm:pt-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenEdit(meal)}
                  className="hover:text-[#FFC222] hover:border-[#FFC222]"
                >
                  <Edit className="w-4 h-4 mr-2" /> Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(meal.id)}
                  className="text-red-500 hover:text-red-600 hover:bg-red-50 border-slate-200 dark:border-slate-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-xl rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {editingMeal ? "Edit Meal" : "Add New Meal"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-5 mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2 sm:col-span-2">
                <Label>
                  Meal Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g. Beef Tehari"
                  className="bg-slate-50 dark:bg-slate-950/50"
                />
              </div>

              <div className="space-y-2">
                <Label>
                  Price (৳) <span className="text-red-500">*</span>
                </Label>
                <Input
                  required
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  placeholder="0.00"
                  className="bg-slate-50 dark:bg-slate-950/50"
                />
              </div>

              <div className="space-y-2">
                <Label>
                  Category <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.categoryId}
                  onValueChange={(value) =>
                    setFormData({ ...formData, categoryId: value })
                  }
                >
                  <SelectTrigger className="bg-slate-50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.length === 0 ? (
                      <SelectItem value="none" disabled>
                        No categories found
                      </SelectItem>
                    ) : (
                      categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label>Image URL</Label>
                <Input
                  value={formData.imageUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, imageUrl: e.target.value })
                  }
                  placeholder="https://..."
                  className="bg-slate-50 dark:bg-slate-950/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>
                Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                required
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Briefly describe the ingredients and taste..."
                className="resize-none h-24 bg-slate-50 dark:bg-slate-950/50"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50">
              <div>
                <Label className="text-base">Available for Order</Label>
                <p className="text-xs text-slate-500">
                  Turn this off if you are out of ingredients.
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    isAvailable: !formData.isAvailable,
                  })
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                  formData.isAvailable
                    ? "bg-[#FFC222]"
                    : "bg-slate-300 dark:bg-slate-700"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    formData.isAvailable ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-[#FFC222] text-black hover:bg-[#e5ae1e] font-bold min-w-[120px]"
              >
                {isLoading
                  ? "Saving..."
                  : editingMeal
                    ? "Update Meal"
                    : "Add Meal"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
