import { prisma } from "../../lib/prisma";

const getAllMeal = async ({
  search,
  page,
  skip,
  limit,
  sortBy,
  sortOrder,
  categoryId,
}: {
  search: string | undefined;
  page: number;
  skip: number;
  limit: number;
  sortBy: string;
  sortOrder: string;
  categoryId: string | undefined;
}) => {
  const where: any = {};

  if (categoryId) {
    where.categoryId = categoryId;
  }

  if (search && typeof search === "string") {
    const meal = await prisma.meal.findMany({
      where: {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
    });

    if (meal) {
      where.id = { in: meal.map((m) => m.id) };
    }
  }
  const allMeal = await prisma.meal.findMany({
    skip,
    take: limit,
    where,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: {
      provider: true,
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

const getMealById = async (id: string) => {
  return await prisma.meal.findUniqueOrThrow({
    where: {
      id,
    },
  });
};

export const mealService = {
  getAllMeal,
  getMealById,
};
