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

const getAllMeal = async ({
  search,
  page,
  limit,
  sortBy,
  sortOrder,
}: {
  search: string | undefined;
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: string;
}) => {
  const where: any = {};

  if (search && typeof search === "string") {
    const category = await prisma.category.findFirst({
      where: {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
    });

    if (category) {
      where.categoryId = category.id;
    }
  }
  const allMeal = await prisma.meal.findMany({
    where,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.meal.count({
    where,
  });
  return {
    data: allMeal,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const mealService = {
  addMeal,
  getAllMeal,
};
