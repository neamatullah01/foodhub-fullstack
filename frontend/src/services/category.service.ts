/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
import { env } from "@/env";

const API_URL = env.API_URL;

export async function getAllCategories() {
  try {
    const res = await fetch(`${API_URL}/api/categories`, {
      cache: "no-store",
    });
    const data = await res.json();
    return { data: data, error: null };
  } catch (error: any) {
    return { data: null, error: { message: "Failed to fetch categories" } };
  }
}

export async function createCategory(name: string) {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/api/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify({ name }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      throw new Error(errorData?.message || "Failed to create category");
    }

    const data = await res.json();
    return { data: data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: { message: error.message || "Something went wrong" },
    };
  }
}

export async function updateCategory(id: string, name: string) {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/api/categories/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify({ name }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      throw new Error(errorData?.message || "Failed to update category");
    }

    const data = await res.json();
    return { data: data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: { message: error.message || "Something went wrong" },
    };
  }
}

export async function deleteCategory(id: string) {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/api/categories/${id}`, {
      method: "DELETE",
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      throw new Error(errorData?.message || "Failed to delete category");
    }

    const data = await res.json();
    return { data: data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: { message: error.message || "Something went wrong" },
    };
  }
}
