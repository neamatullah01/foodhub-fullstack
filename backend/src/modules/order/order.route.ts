import { Router } from "express";
import { orderController } from "./order.controller";
import verifyAuth, { Role } from "../../middlewares/verifyAuth";

const router = Router();

router.post("/", verifyAuth(Role.PROVIDER), orderController.placeOrder); //!here role will be customer

export const orderRouter = router;
