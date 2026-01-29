import { prisma } from "../../lib/prisma";

const createCategory = async (name: string) => {
  return await prisma.category.create({
    data: { name },
  });
};

export const categoryServices = {
  createCategory,
};
