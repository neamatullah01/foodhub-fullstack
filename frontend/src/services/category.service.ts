import { env } from "@/env";

const API_URL = env.API_URL;

export const categoryService = {
  getCategories: async function () {
    try {
      const res = await fetch(`${API_URL}/categories`);
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
