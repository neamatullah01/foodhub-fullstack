/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { env } from "@/env";
import { cookies } from "next/headers";

export async function createOrder(orderPayload: {
  providerId: string;
  address: string;
  paymentMethod: string;
  items: { mealId: string; quantity: number }[];
}) {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${env.API_URL}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(orderPayload),
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      throw new Error(errorData?.message || "Failed to place order");
    }

    const data = await res.json();
    return { data: data, error: null };
  } catch (error: any) {
    console.error("Order Service Error:", error);
    return {
      data: null,
      error: { message: error.message || "Something went wrong" },
    };
  }
}

export async function getMyOrders() {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${env.API_URL}/api/orders`, {
      method: "GET",
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch orders");
    }

    const data = await res.json();
    return { data, error: null };
  } catch (error: any) {
    console.error("Fetch Orders Error:", error);
    return { data: [], error: error.message };
  }
}
