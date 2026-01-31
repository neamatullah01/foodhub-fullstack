import { Router } from "express";
import { userController } from "./user.controller";
import verifyAuth, { Role } from "../../middlewares/verifyAuth";

const router = Router();

router.get("/profile", verifyAuth(Role.CUSTOMER), userController.getMyProfile);
router.patch(
  "/update-profile",
  verifyAuth(Role.CUSTOMER),
  userController.updateMyProfile,
);

export const userRouter = router;
