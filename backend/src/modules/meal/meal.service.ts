import { prisma } from "../../lib/prisma";
import { AddMealInput } from "./meal.types";

const addMeal = async (userId: string, data: AddMealInput) => {
  const provider = await prisma.providerProfile.findUnique({
    where: { userId },
  });

  if (!provider) {
    throw new Error("Provider profile not found!");
  }

  if (!provider.isApproved) {
    throw new Error("Provider not approved!");
  }

  return await prisma.meal.create({
    data: {
      ...data,
      providerId: provider.id,
    },
  });
};

export const mealService = {
  addMeal,
};
