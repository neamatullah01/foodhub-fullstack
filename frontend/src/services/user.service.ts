/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { env } from "@/env";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const AUTH_URL = env.AUTH_URL;
const API_URL = env.API_URL;

export async function getSession() {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${AUTH_URL}/get-session`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });
    const session = await res.json();
    return { data: session, error: null };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      error: {
        message: "Something went wrong",
      },
    };
  }
}

export async function logout() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("token");
  } catch (error) {
    console.error("Failed to logout:", error);
  }
}

export async function updateProfile(formData: {
  name: string;
  phone: string;
  address: string;
}) {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/api/users/update-profile`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to update profile");
    }

    revalidatePath("/profile");
    return await res.json();
  } catch (error: any) {
    throw new Error(error.message || "Failed to update profile");
  }
}
