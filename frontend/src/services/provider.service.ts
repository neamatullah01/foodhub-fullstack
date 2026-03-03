/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
import { env } from "@/env";
import { AddMeal } from "@/types/meal.types";

const API_URL = env.API_URL;

export async function getAllProviders(limit: number = 10) {
  try {
    const res = await fetch(`${API_URL}/api/providers?limit=${limit}`, {
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

    const res = await fetch(`${API_URL}/api/orders/${orderId}/status`, {
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
