import { RequestHandler } from "express";
import { providerProfileServices } from "./providerProfile.service";

const createProfile: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body;
    const userId = req.user?.id;
    const result = await providerProfileServices.createProfile(
      data,
      userId as string,
    );
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const providerProfileController = {
  createProfile,
};
