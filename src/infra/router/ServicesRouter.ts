import { Router } from "express";
import ExpressAdapter from "src/adapters/ExpressAdapter";
import ServicesController from "src/controller/ServicesController";
import AuthMiddleware from "src/middlewares/AuthMiddleware";

const router = Router();
router.post(
  "/",
  AuthMiddleware.auth,
  ExpressAdapter.create(ServicesController.add)
);
router.get("/", ExpressAdapter.create(ServicesController.getAll));
router.delete("/:id", ExpressAdapter.create(ServicesController.delete));

export default router;
