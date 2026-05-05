import { UserManager } from "@/components/modules/admin/users/UserManager";
import { Users } from "lucide-react";
import { getAllUsers } from "@/services/admin.service";

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;

  const query = {
    page: resolvedSearchParams.page || 1,
    limit: resolvedSearchParams.limit || 10,
    search: resolvedSearchParams.search || "",
    role: resolvedSearchParams.role || "",
  };

  const response = await getAllUsers(query);
  // Based on the updated backend response, data should be in response.data.data
  const initialUsers = response.data?.data || response.data || [];
  const pagination = response.data?.pagination || {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
          <div className="bg-[#FFC222]/20 p-2 rounded-xl text-[#e5ae1e]">
            <Users className="w-7 h-7" />
          </div>
          Manage Users
        </h1>
        <p className="text-slate-500 mt-2 text-lg">
          View all registered customers and providers, and manage their account
          access.
        </p>
      </div>

      <UserManager initialUsers={initialUsers} pagination={pagination} />
    </div>
  );
}
