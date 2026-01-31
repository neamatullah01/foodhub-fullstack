import { Router } from "express";
import verifyAuth, { Role } from "../../middlewares/verifyAuth";
import { adminController } from "./admin.controller";

const router = Router();

router.get("/users", verifyAuth(Role.ADMIN), adminController.getAllUsers);

router.get("/orders", verifyAuth(Role.ADMIN), adminController.getAllOrders);

router.patch(
  "/users/:id",
  verifyAuth(Role.ADMIN),
  adminController.updateUserStatus,
);

export const adminRouter = router;
