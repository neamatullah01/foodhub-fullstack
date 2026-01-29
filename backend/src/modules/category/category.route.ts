import { Router } from "express";
import { categoryController } from "./category.controller";

const router = Router();

router.post("/", categoryController.createCategory); //!Add admin middleware here

export const categoryRouter = router;
