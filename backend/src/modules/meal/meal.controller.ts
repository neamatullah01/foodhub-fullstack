import { Request, Response, NextFunction } from "express";
import { mealService } from "./meal.service";
import { GetAllMealQuery } from "./meal.types";
import paginationSortingHelper from "../../helpers/paginationSortingHelpers";

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

const getMealById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await mealService.getMealById(id as string);
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

export const mealController = {
  getAllMeal,
  getMealById,
};
