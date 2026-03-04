import { CategoryManager } from "@/components/modules/admin/categories/CategoryManager";
import { Layers } from "lucide-react";
import { getAllCategories } from "@/services/category.service";

export default async function AdminCategoriesPage() {
  const response = await getAllCategories();
  const initialCategories = response.data?.data || response.data || [];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
          <div className="bg-[#FFC222]/20 p-2 rounded-xl text-[#e5ae1e]">
            <Layers className="w-7 h-7" />
          </div>
          Manage Categories
        </h1>
        <p className="text-slate-500 mt-2 text-lg">
          Add, edit, or remove categories that providers use to group their
          meals.
        </p>
      </div>

      <CategoryManager initialCategories={initialCategories} />
    </div>
  );
}
