import { prisma } from "../../lib/prisma";
import { AddMealInput } from "./meal.types";

const addMeal = async (data: AddMealInput) => {
  return await prisma.meal.create({
    data,
  });
};

export const mealService = {
  addMeal,
};
