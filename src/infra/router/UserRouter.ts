import { Router } from "express";
import ExpressAdapter from "src/adapters/ExpressAdapter";
import UserController from "src/controller/UserController";




const router = Router();

router.get("/search", ExpressAdapter.create(UserController.search));
router.get("/:id", ExpressAdapter.create(UserController.findUserById));
router.delete("/:id", ExpressAdapter.create(UserController.delete));
router.patch("/:id", ExpressAdapter.create(UserController.update));
router.get("/", ExpressAdapter.create(UserController.getUsers));
router.post("/", ExpressAdapter.create(UserController.add));




export default router;