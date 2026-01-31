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
  //!pagination will be added
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

const addMeal: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const result = await providerProfileServices.addMeal(
      userId as string,
      req.body,
    );
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
};

const updateMeal: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    const result = await providerProfileServices.updateMeal(
      id as string,
      req.body,
      userId as string,
    );
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

const removeMeal: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    const result = await providerProfileServices.removeMeal(
      id as string,
      userId as string,
    );
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

const getIncomingOrders: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const result = await providerProfileServices.getIncomingOrders(
      userId as string,
    );
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

export const providerProfileController = {
  createProfile,
  getAllProvider,
  getProviderById,
  addMeal,
  updateMeal,
  removeMeal,
  getIncomingOrders,
};
