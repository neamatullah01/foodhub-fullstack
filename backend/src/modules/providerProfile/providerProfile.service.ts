import { Meal, OrderStatus } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { AddMealInput, ProfileInputData } from "./providerProfile.types";

const createProfile = async (data: ProfileInputData, userId: string) => {
  const existProfile = await prisma.providerProfile.findUnique({
    where: {
      userId,
    },
  });

  if (existProfile) {
    throw new Error("Provider profile already exists");
  }
  return await prisma.providerProfile.create({
    data: {
      ...data,
      userId,
    },
  });
};

const getAllProvider = async ({
  search,
  page,
  skip,
  limit,
  sortBy,
  sortOrder,
  rating: minRating,
}: {
  search: string | undefined;
  page: number;
  skip: number;
  limit: number;
  sortBy: string;
  sortOrder: string;
  rating?: number | undefined;
}) => {
  const where: any = {
    isApproved: true,
  };

  if (search && typeof search === "string") {
    where.restaurantName = {
      contains: search,
      mode: "insensitive",
    };
  }

  const providers = await prisma.providerProfile.findMany({
    where,
    include: {
      user: {
        select: {
          name: true,
          email: true,
          image: true,
          phone: true,
        },
      },
      _count: {
        select: {
          meals: true,
        },
      },
      meals: {
        include: {
          reviews: true,
        },
      },
    },
    ...(sortBy !== "rating" && {
      orderBy: {
        [sortBy]: sortOrder,
      } as any,
    }),
  });

  let providersWithRating = providers.map((provider) => {
    let totalRating = 0;
    let totalReviews = 0;

    const meals = (provider as any).meals || [];
    meals.forEach((meal: any) => {
      const reviews = meal.reviews || [];
      reviews.forEach((review: any) => {
        totalRating += review.rating;
        totalReviews += 1;
      });
    });

    const rating =
      totalReviews > 0 ? Number((totalRating / totalReviews).toFixed(1)) : 0;

    return {
      ...provider,
      rating,
      totalReviews,
    };
  });

  if (minRating !== undefined) {
    providersWithRating = providersWithRating.filter(
      (p) => p.rating >= minRating
    );
  }

  if (sortBy === "rating") {
    providersWithRating.sort((a, b) =>
      sortOrder === "desc" ? b.rating - a.rating : a.rating - b.rating
    );
  }

  const total = providersWithRating.length;
  const paginatedData = providersWithRating.slice(skip, skip + limit);

  return {
    data: paginatedData,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getProviderById = async (id: string) => {
  const provider = await prisma.providerProfile.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          image: true,
          phone: true,
        },
      },
      _count: {
        select: {
          meals: true,
        },
      },
      meals: {
        include: {
          reviews: true,
        },
      },
    },
  });

  if (!provider) {
    throw new Error("Provider not found");
  }

  let totalRating = 0;
  let totalReviews = 0;

  provider.meals.forEach((meal) => {
    meal.reviews.forEach((review) => {
      totalRating += review.rating;
      totalReviews += 1;
    });
  });

  const rating =
    totalReviews > 0 ? Number((totalRating / totalReviews).toFixed(1)) : 0;

  return {
    ...provider,
    rating,
    totalReviews,
  };
};

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

const updateMeal = async (
  mealId: string,
  data: Partial<Meal>,
  userId: string,
) => {
  const mealData = await prisma.meal.findUniqueOrThrow({
    where: {
      id: mealId,
    },
    select: {
      id: true,
      providerId: true,
    },
  });
  const providerData = await prisma.providerProfile.findUniqueOrThrow({
    where: {
      userId,
    },
    select: {
      id: true,
      userId: true,
    },
  });

  if (mealData.providerId !== providerData.id) {
    throw new Error("You are not the provider of this meal!");
  }

  return await prisma.meal.update({
    where: {
      id: mealData.id,
    },
    data,
  });
};

const removeMeal = async (mealId: string, userId: string) => {
  const mealData = await prisma.meal.findUniqueOrThrow({
    where: {
      id: mealId,
    },
    select: {
      id: true,
      providerId: true,
    },
  });
  const providerData = await prisma.providerProfile.findUniqueOrThrow({
    where: {
      userId,
    },
    select: {
      id: true,
      userId: true,
    },
  });

  if (mealData.providerId !== providerData.id) {
    throw new Error("You are not the provider of this meal!");
  }

  return await prisma.meal.delete({
    where: {
      id: mealData.id,
    },
  });
};

const getIncomingOrders = async (userId: string) => {
  const providerData = await prisma.providerProfile.findUniqueOrThrow({
    where: {
      userId,
    },
    select: {
      id: true,
      userId: true,
    },
  });
  return await prisma.order.findMany({
    where: {
      providerId: providerData.id,
    },
    include: {
      orderItems: {
        include: { meal: true },
      },
      user: {
        select: { name: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

const updateOrderStatus = async (
  orderId: string,
  userId: string,
  status: OrderStatus,
) => {
  const providerData = await prisma.providerProfile.findUniqueOrThrow({
    where: {
      userId,
    },
    select: {
      id: true,
      userId: true,
    },
  });
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
  });

  if (!order || providerData.id !== order.providerId) {
    throw new Error("Unauthorized");
  }

  return await prisma.order.update({
    where: {
      id: order.id,
    },
    data: { status },
  });
};

export const providerProfileServices = {
  createProfile,
  getAllProvider,
  getProviderById,
  addMeal,
  updateMeal,
  removeMeal,
  getIncomingOrders,
  updateOrderStatus,
};
