import express from "express";
import multer from "multer";
import {
  catList,
  catById,
  catAdd,
  catUpdate,
  catDelete,
} from "../controllers/catcontroller.js";
const upload = multer({ dest: "uploads/" });
const catRouter = express.Router();

catRouter.get("/", catList);
catRouter.post("/", upload.single("cat"), catAdd);
catRouter.get("/:id", catById);
catRouter.put("/:id", catUpdate);
catRouter.delete("/:id", catDelete);

export default catRouter;
