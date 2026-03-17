import { Router } from "express";
import { reviewController } from "./review.controller";
import verifyAuth, { Role } from "../../middlewares/verifyAuth";

const router = Router();

router.get("/:mealId", verifyAuth(Role.CUSTOMER), reviewController.getReview);
router.post("/:mealId", verifyAuth(Role.CUSTOMER), reviewController.addReview);

export const reviewRouter = router;
