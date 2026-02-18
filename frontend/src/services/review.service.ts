/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { env } from "@/env";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

export async function addReview(payload: {
  providerId: string;
  orderId: string;
  rating: number;
  comment: string;
}) {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${env.API_URL}/api/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to submit review");
    }

    revalidateTag("orders");
    return await res.json();
  } catch (error: any) {
    throw new Error(error.message);
  }
}
