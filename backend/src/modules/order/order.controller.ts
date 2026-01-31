import { RequestHandler } from "express";
import { orderServices } from "./order.service";
import { PlaceOrderInput } from "./order.types";

const placeOrder: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const data: PlaceOrderInput = req.body;
    const result = await orderServices.placeOrder(userId as string, data);
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
};
const getCustomerOrders: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const result = await orderServices.getCustomerOrders(userId as string);
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

export const orderController = {
  placeOrder,
  getCustomerOrders,
};
