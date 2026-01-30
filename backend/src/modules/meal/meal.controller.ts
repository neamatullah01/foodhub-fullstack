import { Request, Response, NextFunction } from "express";
import { mealService } from "./meal.service";
import { GetAllMealQuery } from "./meal.types";
import paginationSortingHelper from "../../helpers/paginationSortingHelpers";

const addMeal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const result = await mealService.addMeal(userId as string, req.body);
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
};
const getAllMeal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { search }: GetAllMealQuery = req.query;
    const { page, limit, sortBy, sortOrder } = paginationSortingHelper(
      req.query,
    );

    const result = await mealService.getAllMeal({
      search,
      page,
      limit,
      sortBy,
      sortOrder,
    });
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

export const mealController = {
  addMeal,
  getAllMeal,
};
