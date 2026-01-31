import { Router } from "express";
import { mealController } from "./meal.controller";

const router = Router();

router.get("/", mealController.getAllMeal);

router.get("/:id", mealController.getMealById);

export const mealRouter = router;
