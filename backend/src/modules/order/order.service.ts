import { prisma } from "../../lib/prisma";
import { PlaceOrderInput } from "./order.types";

const placeOrder = async (userId: string, data: PlaceOrderInput) => {
  const { providerId, items, address, paymentMethod } = data;

  const mealIds = items.map((i) => i.mealId);

  const meals = await prisma.meal.findMany({
    where: {
      id: { in: mealIds },
      providerId,
      isAvailable: true,
    },
  });

  if (meals.length !== items.length) {
    throw new Error("Invalid or unavailable meals");
  }

  let totalPrice = 0;
  items.forEach((item) => {
    const meal = meals.find((m) => m.id === item.mealId);
    if (!meal) {
      throw new Error("Meal not found!");
    }
    totalPrice += meal.price * item.quantity;
  });

  return await prisma.$transaction(async (tx) => {
    const order = await tx.order.create({
      data: {
        userId,
        providerId,
        totalPrice,
        address,
        paymentMethod,
      },
    });

    const orderItems = items.map((item) => {
      const meal = meals.find((m) => m.id === item.mealId);
      if (!meal) {
        throw new Error("Meal not found!");
      }
      return {
        orderId: order.id,
        mealId: meal.id,
        quantity: item.quantity,
        price: meal.price,
      };
    });

    await tx.orderItem.createMany({ data: orderItems });
    return order;
  });
};

export const orderServices = {
  placeOrder,
};
