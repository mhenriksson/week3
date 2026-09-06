import {
  getCats,
  getOneCat,
  getCatsByOwner,
  addNewCat,
} from "../models/catmodel.js";

async function catList(req, res) {
  const cats = await getCats();
  res.json(cats);
}

async function catById(req, res) {
  const cat = await getOneCat(req.params.id);
  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
}

async function catsByUser(req, res) {
  const cats = await getCatsByOwner(req.params.id);
  res.json(cats);
}

async function catAdd(req, res) {
  console.log("form fields:", req.body);
  console.log("uploaded file:", req.file);

  const uploadedFilename = req.file ? req.file.filename : null;
  const newCat = await addNewCat(req.body, uploadedFilename);
  if (!newCat) {
    res.sendStatus(400);
    return;
  }
  res.status(201).json({ message: "New cat added.", cat: newCat });
}

async function catUpdate(req, res) {
  const cat = await getOneCat(req.params.id);
  if (!cat) {
    res.sendStatus(404);
    return;
  }
  const isOwner = cat.owner == res.locals.user.user_id;
  const isAdmin = res.locals.user.role === "admin";
  if (!isOwner && !isAdmin) {
    res.sendStatus(403);
    return;
  }
  res.json({ message: "Cat item updated." });
}

async function catDelete(req, res) {
  const cat = await getOneCat(req.params.id);
  if (!cat) {
    res.sendStatus(404);
    return;
  }
  const isOwner = cat.owner == res.locals.user.user_id;
  const isAdmin = res.locals.user.role === "admin";
  if (!isOwner && !isAdmin) {
    res.sendStatus(403);
    return;
  }
  res.json({ message: "Cat item deleted." });
}

export { catList, catById, catsByUser, catAdd, catUpdate, catDelete };
