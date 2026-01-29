import { Request, Response, NextFunction } from "express";
import { mealService } from "./meal.service";

const addMeal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const result = await mealService.addMeal(userId as string, req.body);
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
};

export const mealController = {
  addMeal,
};
