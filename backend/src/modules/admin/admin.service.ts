import { prisma } from "../../lib/prisma";

const getAllUsers = async () => {
  return await prisma.user.findMany({
    where: {
      role: {
        in: ["CUSTOMER", "PROVIDER"],
      },
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
      providerProfile: {
        select: {
          restaurantName: true,
          isApproved: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

const updateUserStatus = async (userId: string, isActive: boolean) => {
  return await prisma.user.update({
    where: { id: userId },
    data: { isActive },
  });
};

const getAllOrders = async () => {
  return await prisma.order.findMany({
    include: {
      user: {
        select: { name: true, email: true },
      },
      provider: {
        select: { restaurantName: true },
      },
      orderItems: {
        include: {
          meal: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

export const adminService = {
  getAllUsers,
  updateUserStatus,
  getAllOrders,
};
