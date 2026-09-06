import { getCats, getOneCat, addNewCat } from "../models/catmodel.js";

function catList(req, res) {
  res.json(getCats());
}

function catById(req, res) {
  const cat = getOneCat(req.params.id);
  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
}

function catAdd(req, res) {
  const newCat = addNewCat(req.body);
  res.status(201).json({ message: "New cat added.", cat: newCat });
}

function catUpdate(req, res) {
  res.json({ message: "Cat item updated." });
}

function catDelete(req, res) {
  res.json({ message: "Cat item deleted." });
}

export { catList, catById, catAdd, catUpdate, catDelete };
