import { Router } from "express";
import ExpressAdapter from "src/adapters/ExpressAdapter";
import ServicesController from "src/controller/ServicesController";

const router = Router();
router.post("/", ExpressAdapter.create(ServicesController.add));
router.get("/", ExpressAdapter.create(ServicesController.getAll));
router.delete("/:id", ExpressAdapter.create(ServicesController.delete));

export default router;
