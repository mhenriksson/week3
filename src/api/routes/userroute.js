import express from "express";
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
userRouter.put("/:id", editUser);
userRouter.delete("/:id", removeUser);

export default userRouter;
