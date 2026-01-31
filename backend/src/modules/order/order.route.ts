import { Router } from "express";
import { orderController } from "./order.controller";
import verifyAuth, { Role } from "../../middlewares/verifyAuth";

const router = Router();

router.get("/", verifyAuth(Role.CUSTOMER), orderController.getCustomerOrders);

router.get(
  "/:orderId",
  verifyAuth(Role.CUSTOMER),
  orderController.cancelOrderByCustomer,
);

router.post("/", verifyAuth(Role.CUSTOMER), orderController.placeOrder);

export const orderRouter = router;
