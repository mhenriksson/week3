import express from "express";
import catRouter from "./routes/catroute.js";
import userRouter from "./routes/userroute.js";
import authRouter from "./routes/authroute.js";

const router = express.Router();

router.use("/cats", catRouter);
router.use("/users", userRouter);
router.use("/auth", authRouter);

export default router;
