import express from "express";
import catRouter from "./routes/catroute.js";
import userRouter from "./routes/userroute.js";
const router = express.Router();
router.use("/cats", catRouter);
router.use("/users", userRouter);

export default router;
