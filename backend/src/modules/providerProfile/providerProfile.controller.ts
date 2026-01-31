import { RequestHandler } from "express";
import { providerProfileServices } from "./providerProfile.service";
import paginationSortingHelper from "../../helpers/paginationSortingHelpers";

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
    const { search }: { search?: string } = req.query;
    const { page, skip, limit } = paginationSortingHelper(req.query);
    const result = await providerProfileServices.getAllProvider({
      search,
      page,
      skip,
      limit,
    });
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

const updateOrderStatus: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const { orderId } = req.params;
    const { status } = req.body;
    const result = await providerProfileServices.updateOrderStatus(
      orderId as string,
      userId as string,
      status,
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
  updateOrderStatus,
};
