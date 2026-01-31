import { Router } from "express";
import { orderController } from "./order.controller";
import verifyAuth, { Role } from "../../middlewares/verifyAuth";

const router = Router();

router.get("/", verifyAuth(Role.PROVIDER), orderController.getCustomerOrders); //!here role will be customer
router.post("/", verifyAuth(Role.PROVIDER), orderController.placeOrder); //!here role will be customer

export const orderRouter = router;
