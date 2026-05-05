import { RequestHandler } from "express";
import { adminService } from "./admin.service";
import paginationSortingHelper from "../../helpers/paginationSortingHelpers";

const getAllUsers: RequestHandler = async (req, res, next) => {
  try {
    const { search, role } = req.query as { search?: string; role?: string };
    const { page, skip, limit, sortBy, sortOrder } = paginationSortingHelper(req.query);
    const result = await adminService.getAllUsers({
      search,
      role,
      page,
      skip,
      limit,
      sortBy,
      sortOrder,
    });
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
    const { search, status } = req.query as { search?: string; status?: string };
    const { page, skip, limit, sortBy, sortOrder } = paginationSortingHelper(req.query);
    const result = await adminService.getAllOrders({
      search,
      status,
      page,
      skip,
      limit,
      sortBy,
      sortOrder,
    });
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

const getDashboardStats: RequestHandler = async (req, res, next) => {
  try {
    const result = await adminService.getDashboardStats();
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

export const adminController = {
  getAllUsers,
  updateUserStatus,
  getAllOrders,
  getDashboardStats,
};
