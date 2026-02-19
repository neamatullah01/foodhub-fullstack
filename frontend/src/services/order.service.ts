/* eslint-disable @typescript-eslint/no-explicit-any */

import { env } from "@/env";
import { cookies } from "next/headers";

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
