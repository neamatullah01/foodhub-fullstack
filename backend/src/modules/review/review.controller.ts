import { RequestHandler } from "express";
import { reviewService } from "./review.service";

const addReview: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const { mealId } = req.params;
    const result = await reviewService.addReview(
      userId as string,
      mealId as string,
      req.body,
    );
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
};

const getReview: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const { mealId } = req.params;
    const result = await reviewService.getReview(
      userId as string,
      mealId as string,
    );
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

export const reviewController = {
  addReview,
  getReview,
};
