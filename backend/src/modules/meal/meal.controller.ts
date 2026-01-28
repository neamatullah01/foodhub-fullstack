import { Request, Response, NextFunction } from "express";
import { mealService } from "./meal.service";

const addMeal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await mealService.addMeal(req.body);
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
};

export const mealController = {
  addMeal,
};
