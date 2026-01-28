import { prisma } from "../../lib/prisma";
import { ProfileInputData } from "./providerProfile.types";

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

export const providerProfileServices = {
  createProfile,
  getAllProvider,
};
