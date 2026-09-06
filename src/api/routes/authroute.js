import express from "express";
import { login, whoAmI } from "../controllers/authcontroller.js";
import { checkToken } from "../../middlewares/authentication.js";

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.get("/me", checkToken, whoAmI);

export default authRouter;
