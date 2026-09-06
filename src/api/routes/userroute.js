import express from "express";
import { checkToken } from "../../middlewares/authentication.js";
import {
  listUsers,
  getUser,
  registerUser,
  editUser,
  removeUser,
} from "../controllers/usercontroller.js";

const userRouter = express.Router();

userRouter.get("/", listUsers);
userRouter.post("/", registerUser);
userRouter.get("/:id", getUser);
userRouter.put("/:id", checkToken, editUser);
userRouter.delete("/:id", checkToken, removeUser);

export default userRouter;
