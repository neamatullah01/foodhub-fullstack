import { prisma } from "../../lib/prisma";
import { ReviewInput } from "./review.types";

const addReview = async (userId: string, mealId: string, data: ReviewInput) => {
  const orderItem = await prisma.orderItem.findFirst({
    where: {
      mealId,
      order: {
        userId,
        status: "DELIVERED",
      },
    },
  });

  if (!orderItem) {
    throw new Error("You can only review meals you have received");
  }

  return await prisma.review.create({
    data: {
      ...data,
      userId,
      mealId,
    },
  });
};
const getReview = async (userId: string, mealId: string) => {
  return await prisma.review.findUnique({
    where: {
      userId_mealId: {
        userId,
        mealId,
      },
    },
  });
};

export const reviewService = {
  addReview,
  getReview,
};
