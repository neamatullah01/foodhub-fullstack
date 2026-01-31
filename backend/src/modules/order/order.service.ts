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

const getCustomerOrders = async (userId: string) => {
  return await prisma.order.findMany({
    where: {
      userId,
    },
    include: {
      orderItems: {
        include: {
          meal: true,
        },
      },
      provider: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const cancelOrderByCustomer = async (orderId: string, userId: string) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
  });

  if (!order || order.userId !== userId) {
    throw new Error("Unauthorized");
  }

  if (order.status !== "PENDING") {
    throw new Error("Order can no longer be cancelled");
  }

  return await prisma.order.update({
    where: { id: orderId },
    data: { status: "CANCELLED" },
  });
};

export const orderServices = {
  placeOrder,
  getCustomerOrders,
  cancelOrderByCustomer,
};
