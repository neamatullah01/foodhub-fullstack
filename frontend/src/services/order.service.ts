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
      next: { tags: ["orders"] },
    });

    if (!res.ok) throw new Error("Failed to fetch orders");

    return await res.json();
  } catch (error) {
    console.error(error);
    return { data: [] };
  }
}
