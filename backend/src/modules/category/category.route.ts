import { Router } from "express";
import { categoryController } from "./category.controller";
import verifyAuth, { Role } from "../../middlewares/verifyAuth";

const router = Router();

router.get("/", categoryController.getAllCategory);

router.post("/", verifyAuth(Role.ADMIN), categoryController.createCategory);

router.patch("/:id", verifyAuth(Role.ADMIN), categoryController.updateCategory);

router.delete(
  "/:id",
  verifyAuth(Role.ADMIN),
  categoryController.deleteCategory,
);

export const categoryRouter = router;
