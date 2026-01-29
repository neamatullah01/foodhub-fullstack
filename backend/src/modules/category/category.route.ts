import { Router } from "express";
import { categoryController } from "./category.controller";

const router = Router();

router.get("/", categoryController.getAllCategory);

router.post("/", categoryController.createCategory); //!Add admin middleware here

router.delete("/:id", categoryController.deleteCategory); //!Add admin middleware here

export const categoryRouter = router;
