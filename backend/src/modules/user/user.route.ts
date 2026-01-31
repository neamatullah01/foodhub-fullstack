import { Router } from "express";
import { userController } from "./user.controller";
import verifyAuth, { Role } from "../../middlewares/verifyAuth";

const router = Router();

router.get("/profile", verifyAuth(Role.PROVIDER), userController.getMyProfile); //!customer
router.patch(
  "/update-profile",
  verifyAuth(Role.PROVIDER),
  userController.updateMyProfile,
); //!customer

export const userRouter = router;
