import { Request, Response, NextFunction } from "express";
import { mealService } from "./meal.service";
import { GetAllMealQuery } from "./meal.types";
import paginationSortingHelper from "../../helpers/paginationSortingHelpers";

const getAllMeal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { search, categoryId }: GetAllMealQuery = req.query;
    const { page, limit, skip, sortBy, sortOrder } = paginationSortingHelper(
      req.query,
    );

    const result = await mealService.getAllMeal({
      search,
      page,
      limit,
      skip,
      sortBy,
      sortOrder,
      categoryId,
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
