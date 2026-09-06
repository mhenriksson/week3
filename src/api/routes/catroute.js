import express from "express";
import multer from "multer";
import { createThumbnail } from "../../middlewares/upload.js";
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
catRouter.put("/:id", catUpdate);
catRouter.delete("/:id", catDelete);

export default catRouter;
