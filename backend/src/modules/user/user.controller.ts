import { RequestHandler } from "express";
import { userService } from "./user.service";

const getMyProfile: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const result = await userService.getMyProfile(userId as string);
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};
const updateMyProfile: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const result = await userService.updateMyProfile(
      userId as string,
      req.body,
    );
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

export const userController = {
  getMyProfile,
  updateMyProfile,
};
