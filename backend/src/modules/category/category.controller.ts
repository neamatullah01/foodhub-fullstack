import { RequestHandler } from "express";
import { categoryServices } from "./category.service";

const createCategory: RequestHandler = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Category name required" });
    }
    const result = await categoryServices.createCategory(name);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
const getAllCategory: RequestHandler = async (req, res, next) => {
  try {
    const result = await categoryServices.getAllCategory();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteCategory: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await categoryServices.deleteCategory(id as string);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const categoryController = {
  createCategory,
  getAllCategory,
  deleteCategory,
};
