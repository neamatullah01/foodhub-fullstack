import { Router } from "express";
import { providerProfileController } from "./providerProfile.controller";
import verifyAuth, { Role } from "../../middlewares/verifyAuth";

const router = Router();

router.post(
  "/",
  verifyAuth(Role.PROVIDER),
  providerProfileController.createProfile,
);

export const providerProfileRouter = router;
