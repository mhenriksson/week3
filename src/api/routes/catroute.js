import express from "express";
import multer from "multer";
import { body } from "express-validator";
import { createThumbnail } from "../../middlewares/upload.js";
import { checkToken } from "../../middlewares/authentication.js";
import { checkValidation } from "../../middlewares/errorhandlers.js";
import {
  catList,
  catById,
  catsByUser,
  catAdd,
  catUpdate,
  catDelete,
} from "../controllers/catcontroller.js";
const upload = multer({ dest: "uploads/" });
const catRouter = express.Router();

catRouter.get("/", catList);
catRouter.post(
  "/",
  upload.single("cat"),
  body("cat_name").trim().isLength({ min: 3, max: 50 }),
  body("weight").trim().isFloat({ min: 0 }),
  body("owner").trim().isInt(),
  checkValidation,
  createThumbnail,
  catAdd,
);
catRouter.get("/user/:id", catsByUser);
catRouter.get("/:id", catById);
catRouter.put("/:id", checkToken, catUpdate);
catRouter.delete("/:id", checkToken, catDelete);

export default catRouter;
