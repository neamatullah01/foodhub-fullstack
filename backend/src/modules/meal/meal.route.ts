import { Router } from "express";
import { mealController } from "./meal.controller";
import verifyAuth, { Role } from "../../middlewares/verifyAuth";

const router = Router();

router.get("/", mealController.getAllMeal);

export const mealRouter = router;
