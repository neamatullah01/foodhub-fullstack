import { Router } from "express";
import { providerProfileController } from "./providerProfile.controller";
import verifyAuth, { Role } from "../../middlewares/verifyAuth";

const router = Router();

router.get("/", providerProfileController.getAllProvider);

router.get(
  "/orders",
  verifyAuth(Role.PROVIDER),
  providerProfileController.getIncomingOrders,
);

router.get("/:id", providerProfileController.getProviderById);

router.post(
  "/",
  verifyAuth(Role.PROVIDER),
  providerProfileController.createProfile,
);

router.post(
  "/meals",
  verifyAuth(Role.PROVIDER),
  providerProfileController.addMeal,
);

router.patch(
  "/meals/:id",
  verifyAuth(Role.PROVIDER),
  providerProfileController.updateMeal,
);

router.delete(
  "/meals/:id",
  verifyAuth(Role.PROVIDER),
  providerProfileController.removeMeal,
);

router.patch(
  "/orders/:orderId",
  verifyAuth(Role.PROVIDER),
  providerProfileController.updateOrderStatus,
);

export const providerProfileRouter = router;
