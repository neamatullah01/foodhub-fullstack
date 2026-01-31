import { RequestHandler } from "express";
import { adminService } from "./admin.service";

const getAllUsers: RequestHandler = async (req, res, next) => {
  try {
    const result = await adminService.getAllUsers();
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};
const updateUserStatus: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;
    const result = await adminService.updateUserStatus(id as string, isActive);
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

const getAllOrders: RequestHandler = async (req, res, next) => {
  try {
    const result = await adminService.getAllOrders();
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

export const adminController = {
  getAllUsers,
  updateUserStatus,
  getAllOrders,
};
