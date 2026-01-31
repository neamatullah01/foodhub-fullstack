import { Meal } from "../../generated/prisma/client";
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

const getAllProvider = async () => {
  return await prisma.providerProfile.findMany({
    where: {
      isApproved: true,
    },
  });
};

const getProviderById = async (id: string) => {
  return await prisma.providerProfile.findUnique({
    where: {
      id,
    },
  });
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
      status: "PENDING",
    },
    include: {
      orderItems: {
        include: { meal: true },
      },
      user: {
        select: { name: true },
      },
    },
    orderBy: { createdAt: "asc" },
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
};
