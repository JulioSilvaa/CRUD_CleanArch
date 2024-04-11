import { Router } from "express";
import ExpressAdapter from "src/adapters/ExpressAdapter";
import UserController from "src/controller/userController";



const router = Router();

router.get("/:id", ExpressAdapter.create(UserController.findUserById));
router.get("/", ExpressAdapter.create(UserController.getUsers));
router.post("/", ExpressAdapter.create(UserController.add))
router.delete("/:id", ExpressAdapter.create(UserController.delete))




export default router;