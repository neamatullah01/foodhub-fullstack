import { prisma } from "../../lib/prisma";

const getAllUsers = async (options: {
  search?: string | undefined;
  role?: string | undefined;
  page: number;
  skip: number;
  limit: number;
  sortBy: string;
  sortOrder: string;
}) => {
  const { search, role, page, skip, limit, sortBy, sortOrder } = options;

  const where: any = {
    role: {
      in: role ? [role as any] : ["CUSTOMER", "PROVIDER"],
    },
  };

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
    ];
  }

  const users = await prisma.user.findMany({
    where,
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
    orderBy: { [sortBy]: sortOrder },
    skip,
    take: limit,
  });

  const total = await prisma.user.count({ where });

  return {
    data: users,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const updateUserStatus = async (userId: string, isActive: boolean) => {
  return await prisma.user.update({
    where: { id: userId },
    data: { isActive },
  });
};

const getAllOrders = async (options: {
  search?: string | undefined;
  status?: string | undefined;
  page: number;
  skip: number;
  limit: number;
  sortBy: string;
  sortOrder: string;
}) => {
  const { search, status, page, skip, limit, sortBy, sortOrder } = options;

  const where: any = {};

  if (status) {
    where.status = status;
  }

  if (search) {
    where.OR = [
      { id: { contains: search, mode: "insensitive" } },
      { user: { name: { contains: search, mode: "insensitive" } } },
      { provider: { restaurantName: { contains: search, mode: "insensitive" } } },
    ];
  }

  const orders = await prisma.order.findMany({
    where,
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
    orderBy: { [sortBy]: sortOrder },
    skip,
    take: limit,
  });

  const total = await prisma.order.count({ where });

  return {
    data: orders,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getDashboardStats = async () => {
  const [totalUsers, totalProviders, totalOrders, revenueAgg] = await Promise.all([
    prisma.user.count({ where: { role: "CUSTOMER" } }),
    prisma.providerProfile.count(),
    prisma.order.count(),
    prisma.order.aggregate({
      _sum: { totalPrice: true },
      where: { status: { not: "CANCELLED" } },
    }),
  ]);

  const totalRevenue = revenueAgg._sum.totalPrice || 0;

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const recentOrdersData = await prisma.order.findMany({
    where: {
      createdAt: {
        gte: thirtyDaysAgo,
      },
    },
    select: {
      createdAt: true,
      totalPrice: true,
      status: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const chartDataMap: Record<string, { date: string; ordersCount: number; revenue: number }> = {};
  recentOrdersData.forEach((order) => {
    const dateStr = order.createdAt.toISOString().split("T")[0] as string;
    if (!chartDataMap[dateStr]) {
      chartDataMap[dateStr] = { date: dateStr, ordersCount: 0, revenue: 0 };
    }
    chartDataMap[dateStr].ordersCount += 1;
    if (order.status !== "CANCELLED") {
      chartDataMap[dateStr].revenue += order.totalPrice;
    }
  });

  const chartData = Object.values(chartDataMap);

  const recentOrders = await prisma.order.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { name: true, email: true } },
      provider: { select: { restaurantName: true } },
    },
  });

  return {
    overview: {
      totalUsers,
      totalProviders,
      totalOrders,
      totalRevenue,
    },
    chartData,
    recentOrders,
  };
};

export const adminService = {
  getAllUsers,
  updateUserStatus,
  getAllOrders,
  getDashboardStats,
};
