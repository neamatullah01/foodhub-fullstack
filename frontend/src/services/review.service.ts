/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { env } from "@/env";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function addReview(payload: {
  providerId: string;
  orderId: string;
  mealId: string;
  rating: number;
  comment: string;
}) {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${env.API_URL}/api/reviews/${payload.mealId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify({
        rating: payload.rating,
        comment: payload.comment,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      throw new Error(errorData?.message || "Failed to submit review");
    }

    const data = await res.json();
    revalidatePath("/orders");

    return { data, error: null };
  } catch (error: any) {
    console.error("Review Error:", error);
    throw new Error(
      error.message || "Something went wrong while submitting the review.",
    );
  }
}
