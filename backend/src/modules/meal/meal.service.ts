import { prisma } from "../../lib/prisma";

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
