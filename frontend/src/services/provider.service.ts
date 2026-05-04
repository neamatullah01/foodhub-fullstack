/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
import { env } from "@/env";
import { AddMeal } from "@/types/meal.types";

const API_URL = env.API_URL;

export interface CreateProviderPayload {
  restaurantName: string;
  description: string;
  address: string;
  phone: string;
  imageUrl: string;
}

export async function createProviderProfile(payload: CreateProviderPayload) {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/api/providers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      throw new Error(
        errorData?.message || "Failed to create provider profile.",
      );
    }

    const data = await res.json();
    return { data: data, error: null };
  } catch (error: any) {
    console.error("CREATE PROVIDER ERROR:", error);
    return {
      data: null,
      error: { message: error.message || "Something went wrong while saving." },
    };
  }
}

interface ProviderQuery {
  limit?: number;
  page?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: string;
  rating?: number;
}

export async function getAllProviders(query: ProviderQuery | number = { limit: 10 }) {
  try {
    const queryObj = typeof query === 'number' ? { limit: query } : query;
    const params = new URLSearchParams();

    Object.entries(queryObj).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, String(value));
      }
    });

    const queryString = params.toString();
    const fetchUrl = `${API_URL}/api/providers${queryString ? `?${queryString}` : ""}`;

    const res = await fetch(fetchUrl, {
      cache: "no-store",
    });
    const data = await res.json();
    return { data: data, error: null };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      error: { message: "Something went wrong" },
    };
  }
}

export async function getProviderById(id: string) {
  try {
    const res = await fetch(`${API_URL}/api/providers/${id}`, {
      cache: "no-store",
    });
    const data = await res.json();
    return { data: data, error: null };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      error: { message: "Something went wrong" },
    };
  }
}

export async function addMeals(meals: AddMeal) {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/api/providers/meals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(meals),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      throw new Error(errorData?.message || "Failed to add meal");
    }

    const data = await res.json();
    return { data: data, error: null };
  } catch (error: any) {
    console.error(error);
    return {
      data: null,
      error: { message: error.message || "Something went wrong" },
    };
  }
}

export async function updateMeal(id: string, mealPayload: Partial<AddMeal>) {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/api/providers/meals/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(mealPayload),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      throw new Error(errorData?.message || "Failed to update meal");
    }

    const data = await res.json();
    return { data: data, error: null };
  } catch (error: any) {
    console.error("UPDATE MEAL ERROR:", error);
    return {
      data: null,
      error: { message: error.message || "Something went wrong" },
    };
  }
}

export async function deleteMeal(id: string) {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/api/providers/meals/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      throw new Error(errorData?.message || "Failed to delete meal");
    }

    const data = await res.json();
    return { data: data, error: null };
  } catch (error: any) {
    console.error("DELETE MEAL ERROR:", error);
    return {
      data: null,
      error: { message: error.message || "Something went wrong" },
    };
  }
}

export async function getProviderOrders() {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/api/providers/orders`, {
      cache: "no-store",
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    const data = await res.json();
    return { data: data, error: null };
  } catch (error: any) {
    console.error("FETCH ORDERS ERROR:", error);
    return {
      data: null,
      error: { message: "Failed to fetch orders" },
    };
  }
}

export async function updateOrderStatus(orderId: string, status: string) {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/api/providers/orders/${orderId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify({ status }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      throw new Error(errorData?.message || "Failed to update order status");
    }

    const data = await res.json();
    return { data: data, error: null };
  } catch (error: any) {
    console.error("UPDATE STATUS ERROR:", error);
    return {
      data: null,
      error: { message: error.message || "Something went wrong" },
    };
  }
}
