import express from "express";
import {
  catList,
  catById,
  catAdd,
  catUpdate,
  catDelete,
} from "../controllers/catcontroller.js";

const catRouter = express.Router();

catRouter.get("/", catList);
catRouter.post("/", catAdd);
catRouter.get("/:id", catById);
catRouter.put("/:id", catUpdate);
catRouter.delete("/:id", catDelete);

export default catRouter;
