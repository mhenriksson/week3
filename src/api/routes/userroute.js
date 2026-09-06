import express from "express";
import { body } from "express-validator";
import { checkToken } from "../../middlewares/authentication.js";
import { checkValidation } from "../../middlewares/errorhandlers.js";
import {
  listUsers,
  getUser,
  registerUser,
  editUser,
  removeUser,
} from "../controllers/usercontroller.js";

const userRouter = express.Router();

userRouter.get("/", listUsers);
userRouter.post(
  "/",
  body("username").trim().isLength({ min: 3, max: 20 }).isAlphanumeric(),
  body("email").trim().isEmail(),
  body("password").trim().isLength({ min: 8 }),
  checkValidation,
  registerUser,
);
userRouter.get("/:id", getUser);
userRouter.put("/:id", checkToken, editUser);
userRouter.delete("/:id", checkToken, removeUser);

export default userRouter;
