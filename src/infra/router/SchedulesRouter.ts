import { Router } from "express";
import ExpressAdapter from "src/adapters/ExpressAdapter";
import SchedulesController from "src/controller/SchedulesController";
import AuthMiddleware from "src/middlewares/AuthMiddleware";

const router = Router();
router.post(
  "/",
  AuthMiddleware.auth,
  ExpressAdapter.create(SchedulesController.save)
);

export default router;
