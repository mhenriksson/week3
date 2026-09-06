import express from "express";
const app = express();
const port = 3000;
app.get("/", (req, res) => {
  res.send("Hello world!");
});
app.get("/api/v1/cats", (req, res) => {
  const cat = {
    cat_id: 1,
    name: "Kissa1",
    birthdate: "1999-05-14",
    weight: 4.5,
    owner: "Mikko",
    image: "https://loremflickr.com/320/240/cat",
  };
  res.json(cat);
});
app.use("/public", express.static("public"));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
