import { prisma } from "../../lib/prisma";

const getMyProfile = async (userId: string) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      createdAt: true,
    },
  });
};

const updateMyProfile = async (
  userId: string,
  data: { name: string; image: string },
) => {
  const allowedData = {
    name: data?.name,
    image: data?.image,
  };

  return await prisma.user.update({
    where: { id: userId },
    data: allowedData,
  });
};

export const userService = {
  getMyProfile,
  updateMyProfile,
};
