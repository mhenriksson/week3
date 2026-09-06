import express from "express";
import multer from "multer";
import { createThumbnail } from "../../middlewares/upload.js";
import { checkToken } from "../../middlewares/authentication.js";
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
catRouter.post("/", upload.single("cat"), createThumbnail, catAdd);
catRouter.get("/user/:id", catsByUser);
catRouter.get("/:id", catById);
catRouter.put("/:id", checkToken, catUpdate);
catRouter.delete("/:id", checkToken, catDelete);

export default catRouter;
