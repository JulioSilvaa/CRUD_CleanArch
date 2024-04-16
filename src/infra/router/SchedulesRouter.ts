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
router.get("/:id", AuthMiddleware.auth, ExpressAdapter.create(SchedulesController.find));
router.get("/", AuthMiddleware.auth, ExpressAdapter.create(SchedulesController.getAll));
router.delete("/:id", AuthMiddleware.auth, ExpressAdapter.create(SchedulesController.delete));
router.patch("/:id", AuthMiddleware.auth, ExpressAdapter.create(SchedulesController.update))


export default router;
