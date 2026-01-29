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

const getAllProvider: RequestHandler = async (req, res, next) => {
  try {
    const result = await providerProfileServices.getAllProvider();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getProviderById: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await providerProfileServices.getProviderById(id as string);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const providerProfileController = {
  createProfile,
  getAllProvider,
  getProviderById,
};
