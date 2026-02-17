import { env } from "@/env";

const API_URL = env.API_URL;

export const providerService = {
  getAllProviders: async function (limit: number = 10) {
    try {
      const res = await fetch(`${API_URL}/api/providers?limit=${limit}`, {
        cache: "no-store",
      });
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

  getProviderById: async function (id: string) {
    try {
      const res = await fetch(`${API_URL}/api/providers/${id}`, {
        cache: "no-store",
      });
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
