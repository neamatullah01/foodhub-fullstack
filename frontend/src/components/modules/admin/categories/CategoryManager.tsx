/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Search, Edit, Trash2, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/services/category.service";

export interface Category {
  id: string;
  name: string;
}

export function CategoryManager({
  initialCategories,
}: {
  initialCategories: Category[];
}) {
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [searchQuery, setSearchQuery] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setCategories(initialCategories);
  }, [initialCategories]);

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setName("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (category: Category) => {
    setEditingCategory(category);
    setName(category.name);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("Category name is required");

    setIsLoading(true);

    try {
      if (editingCategory) {
        const response = await updateCategory(editingCategory.id, name);
        if (response.error) throw new Error(response.error.message);

        toast.success("Category updated successfully!");
      } else {
        const response = await createCategory(name);
        if (response.error) throw new Error(response.error.message);

        toast.success("Category added successfully!");
      }

      setIsModalOpen(false);
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (id: string, name: string) => {
    toast(`Delete "${name}"?`, {
      description: "This action cannot be undone.",
      cancel: { label: "Cancel", onClick: () => toast.dismiss() },
      action: {
        label: "Delete",
        onClick: async () => {
          const toastId = toast.loading("Deleting category...");
          try {
            const response = await deleteCategory(id);
            if (response.error) throw new Error(response.error.message);

            toast.success("Category deleted", { id: toastId });
            router.refresh();
          } catch (error: any) {
            toast.error(error.message || "Failed to delete category", {
              id: toastId,
            });
          }
        },
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-slate-50 dark:bg-slate-950/50"
          />
        </div>
        <Button
          onClick={handleOpenAdd}
          className="w-full sm:w-auto bg-[#FFC222] text-black hover:bg-[#e5ae1e] font-bold rounded-xl shadow-sm"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Category
        </Button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 uppercase bg-slate-50 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="px-6 py-4 font-semibold">Category Name</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
            {filteredCategories.length === 0 ? (
              <tr>
                <td
                  colSpan={2}
                  className="px-6 py-12 text-center text-slate-500"
                >
                  <Layers className="w-8 h-8 mx-auto mb-3 text-slate-300" />
                  No categories found.
                </td>
              </tr>
            ) : (
              filteredCategories.map((category) => (
                <tr
                  key={category.id}
                  className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white text-base">
                    {category.name}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenEdit(category)}
                        className="hover:text-[#FFC222] hover:border-[#FFC222]"
                      >
                        <Edit className="w-4 h-4 mr-2" /> Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(category.id, category.name)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 border-slate-200 dark:border-slate-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {editingCategory ? "Edit Category" : "Add New Category"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-5 mt-4">
            <div className="space-y-2">
              <Label>
                Category Name <span className="text-red-500">*</span>
              </Label>
              <Input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Desserts, Beverages, Main Course"
                className="bg-slate-50 dark:bg-slate-950/50"
              />
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
                  : editingCategory
                    ? "Update"
                    : "Add Category"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
