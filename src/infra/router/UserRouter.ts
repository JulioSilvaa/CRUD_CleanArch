import { Router } from "express";
import ExpressAdapter from "src/adapters/ExpressAdapter";
import UserController from "src/controller/userController";



const router = Router();

router.get("/", ExpressAdapter.create(UserController.getUsers));
router.post("/", ExpressAdapter.create(UserController.add))




export default router;