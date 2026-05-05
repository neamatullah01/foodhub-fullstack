/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
import { env } from "@/env";

const API_URL = env.API_URL;

export async function getAllUsers(query?: any) {
  try {
    const cookieStore = await cookies();
    
    const params = new URLSearchParams();
    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          params.append(key, String(value));
        }
      });
    }
    const queryString = params.toString();
    const fetchUrl = `${API_URL}/api/admin/users${queryString ? `?${queryString}` : ""}`;

    const res = await fetch(fetchUrl, {
      cache: "no-store",
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    const data = await res.json();
    return { data: data, error: null };
  } catch (error: any) {
    console.error("FETCH USERS ERROR:", error);
    return {
      data: null,
      error: { message: "Failed to fetch users" },
    };
  }
}

export async function updateUserStatus(userId: string, newStatus: boolean) {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/api/admin/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify({ isActive: newStatus }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      throw new Error(errorData?.message || "Failed to update user status");
    }

    const data = await res.json();
    return { data: data, error: null };
  } catch (error: any) {
    console.error("UPDATE USER STATUS ERROR:", error);
    return {
      data: null,
      error: { message: error.message || "Something went wrong" },
    };
  }
}

export async function getAllPlatformOrders(query?: any) {
  try {
    const cookieStore = await cookies();
    
    const params = new URLSearchParams();
    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          params.append(key, String(value));
        }
      });
    }
    const queryString = params.toString();
    const fetchUrl = `${API_URL}/api/admin/orders${queryString ? `?${queryString}` : ""}`;

    const res = await fetch(fetchUrl, {
      cache: "no-store",
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch platform orders");
    }

    const data = await res.json();
    return { data: data, error: null };
  } catch (error: any) {
    console.error("FETCH ALL ORDERS ERROR:", error);
    return {
      data: null,
      error: { message: error.message || "Failed to fetch orders" },
    };
  }
}

export async function getAdminDashboardStats() {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/api/admin/dashboard`, {
      cache: "no-store",
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch admin dashboard stats");
    }

    const data = await res.json();
    return { data: data, error: null };
  } catch (error: any) {
    console.error("FETCH ADMIN DASHBOARD STATS ERROR:", error);
    return {
      data: null,
      error: { message: error.message || "Failed to fetch dashboard stats" },
    };
  }
}
