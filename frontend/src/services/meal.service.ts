import { env } from "@/env";

const API_URL = env.API_URL;

interface MealQuery {
  limit?: number;
  search?: string;
  categoryId?: string;
  sortBy?: string;
  sortOrder?: string;
}

export const mealService = {
  getAllMeal: async function (query: MealQuery = { limit: 10 }) {
    try {
      const params = new URLSearchParams();

      Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          params.append(key, String(value));
        }
      });

      const queryString = params.toString();
      const fetchUrl = `${API_URL}/api/meals${queryString ? `?${queryString}` : ""}`;

      const res = await fetch(fetchUrl, {
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
