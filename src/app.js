import express from "express";
import api from "./api/index.js";
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello world!");
});
app.use("/api/v1", api);
app.use("/public", express.static("public"));
export default app;
