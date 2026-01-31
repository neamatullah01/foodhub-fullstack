import { Router } from "express";
import { reviewController } from "./review.controller";
import verifyAuth, { Role } from "../../middlewares/verifyAuth";

const router = Router();

router.post("/:mealId", verifyAuth(Role.PROVIDER), reviewController.addReview);

export const reviewRouter = router;
