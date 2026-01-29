import { prisma } from "../../lib/prisma";

const createCategory = async (name: string) => {
  return await prisma.category.create({
    data: { name },
  });
};
const getAllCategory = async () => {
  return await prisma.category.findMany();
};

const deleteCategory = async (id: string) => {
  const categoryData = await prisma.category.findUnique({
    where: {
      id,
    },
  });
  if (!categoryData) {
    throw new Error("Your provided input is invalid!");
  }

  return await prisma.category.delete({
    where: {
      id: categoryData.id,
    },
  });
};

export const categoryServices = {
  createCategory,
  getAllCategory,
  deleteCategory,
};
