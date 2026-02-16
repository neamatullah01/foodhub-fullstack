import { env } from "@/env";

const API_URL = env.API_URL;

// Define an interface for the expected query parameters
interface MealQuery {
  limit?: number;
  search?: string;
  categoryId?: string;
  sortBy?: string;
  sortOrder?: string;
}

export const mealService = {
  // Update the function to accept our query object, defaulting to limit: 10
  getAllMeal: async function (query: MealQuery = { limit: 10 }) {
    try {
      // 1. Safely build the query string
      const params = new URLSearchParams();

      // Loop through the query object and add valid values
      Object.entries(query).forEach(([key, value]) => {
        // Only append if the value exists and is not an empty string
        if (value !== undefined && value !== null && value !== "") {
          params.append(key, String(value));
        }
      });

      // 2. Construct the final URL
      const queryString = params.toString();
      const fetchUrl = `${API_URL}/api/meals${queryString ? `?${queryString}` : ""}`;

      // 3. Fetch the data
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
