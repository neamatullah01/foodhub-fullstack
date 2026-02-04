import { env } from "@/env";

const API_URL = env.API_URL;

export const mealService = {
  getAllMeal: async function (limit: number = 10) {
    try {
      const res = await fetch(`${API_URL}/meals?limit=${limit}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch meals");
      }

      const data = await res.json();
      return { data: data, error: null };
    } catch (error) {
      console.error(error);
      return {
        data: null,
        error: {
          message: "Something went wrong",
        },
      };
    }
  },
};
