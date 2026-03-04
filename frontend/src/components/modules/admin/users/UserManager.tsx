"use client";

import { useState } from "react";
import {
  Search,
  ShieldAlert,
  CheckCircle2,
  Ban,
  User,
  UtensilsCrossed,
  ShieldCheck,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { updateUserStatus } from "@/services/admin.service";

export interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  image?: string;
}

export function UserManager({ initialUsers }: { initialUsers: UserData[] }) {
  const [users, setUsers] = useState<UserData[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole =
      roleFilter === "ALL" || user.role?.toUpperCase() === roleFilter;

    return matchesSearch && matchesRole;
  });

  const handleToggleStatus = (user: UserData) => {
    const newIsActiveState = !user.isActive;
    const actionText = user.isActive ? "Suspend" : "Activate";

    toast(
      `Are you sure you want to ${actionText.toLowerCase()} ${user.name}?`,
      {
        description: user.isActive
          ? "They will no longer be able to log in or use the platform."
          : "They will regain full access to the platform.",
        duration: 5000,
        cancel: {
          label: "Cancel",
          onClick: () => toast.dismiss(),
        },
        action: {
          label: actionText,
          onClick: async () => {
            setLoadingId(user.id);
            const toastId = toast.loading(
              `Updating status for ${user.name}...`,
            );

            try {
              const response = await updateUserStatus(
                user.id,
                newIsActiveState,
              );

              if (response.error) {
                toast.error(response.error.message, { id: toastId });
                return;
              }

              setUsers((prev) =>
                prev.map((u) =>
                  u.id === user.id ? { ...u, isActive: newIsActiveState } : u,
                ),
              );

              toast.success(
                `User successfully ${newIsActiveState ? "activated" : "suspended"}`,
                {
                  id: toastId,
                },
              );
            } catch (error) {
              toast.error("Failed to update status", { id: toastId });
            } finally {
              setLoadingId(null);
            }
          },
        },
      },
    );
  };

  const getRoleIcon = (role: string) => {
    switch (role?.toUpperCase()) {
      case "ADMIN":
        return <ShieldCheck className="w-4 h-4 text-red-500" />;
      case "PROVIDER":
        return <UtensilsCrossed className="w-4 h-4 text-orange-500" />;
      default:
        return <User className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-slate-50 dark:bg-slate-950/50"
          />
        </div>

        <div className="w-full sm:w-48">
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="bg-slate-50 dark:bg-slate-950/50">
              <SelectValue placeholder="Filter by Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Roles</SelectItem>
              <SelectItem value="CUSTOMER">Customers</SelectItem>
              <SelectItem value="PROVIDER">Providers</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-6 py-4 font-semibold">User</th>
                <th className="px-6 py-4 font-semibold">Role</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    <ShieldAlert className="w-8 h-8 mx-auto mb-3 text-slate-300" />
                    No users found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border border-slate-200 dark:border-slate-700">
                          <AvatarImage src={user.image || ""} alt={user.name} />
                          <AvatarFallback className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold">
                            {user.name?.substring(0, 2).toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">
                            {user.name}
                          </p>
                          <p className="text-xs text-slate-500">{user.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getRoleIcon(user.role)}
                        <span className="font-medium text-slate-700 dark:text-slate-300">
                          {user.role?.toUpperCase()}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <Badge
                        variant="outline"
                        className={
                          user.isActive
                            ? "bg-green-100 text-green-700 border-green-200"
                            : "bg-red-100 text-red-700 border-red-200"
                        }
                      >
                        {user.isActive ? (
                          <CheckCircle2 className="w-3 h-3 mr-1 inline-block" />
                        ) : (
                          <Ban className="w-3 h-3 mr-1 inline-block" />
                        )}
                        {user.isActive ? "Active" : "Suspended"}
                      </Badge>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={
                          loadingId === user.id ||
                          user.role?.toUpperCase() === "ADMIN"
                        }
                        onClick={() => handleToggleStatus(user)}
                        className={
                          user.isActive
                            ? "text-red-600 hover:text-red-700 hover:bg-red-50 border-slate-200"
                            : "text-green-600 hover:text-green-700 hover:bg-green-50 border-slate-200"
                        }
                      >
                        {user.isActive ? "Suspend" : "Activate"}
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
