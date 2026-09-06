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

async function catById(req, res, next) {
  const cat = await getOneCat(req.params.id);
  if (!cat) {
    const err = new Error("Cat not found.");
    err.status = 404;
    next(err);
    return;
  }
  res.json(cat);
}

async function catsByUser(req, res) {
  const cats = await getCatsByOwner(req.params.id);
  res.json(cats);
}

async function catAdd(req, res, next) {
  console.log("form fields:", req.body);
  console.log("uploaded file:", req.file);

  const uploadedFilename = req.file ? req.file.filename : null;
  const newCat = await addNewCat(req.body, uploadedFilename);
  if (!newCat) {
    const err = new Error("Could not add cat.");
    err.status = 400;
    next(err);
    return;
  }
  res.status(201).json({ message: "New cat added.", cat: newCat });
}

async function catUpdate(req, res, next) {
  const cat = await getOneCat(req.params.id);
  if (!cat) {
    const err = new Error("Cat not found.");
    err.status = 404;
    next(err);
    return;
  }
  const isOwner = cat.owner == res.locals.user.user_id;
  const isAdmin = res.locals.user.role === "admin";
  if (!isOwner && !isAdmin) {
    const err = new Error("Not allowed to update this cat.");
    err.status = 403;
    next(err);
    return;
  }
  res.json({ message: "Cat item updated." });
}

async function catDelete(req, res, next) {
  const cat = await getOneCat(req.params.id);
  if (!cat) {
    const err = new Error("Cat not found.");
    err.status = 404;
    next(err);
    return;
  }
  const isOwner = cat.owner == res.locals.user.user_id;
  const isAdmin = res.locals.user.role === "admin";
  if (!isOwner && !isAdmin) {
    const err = new Error("Not allowed to delete this cat.");
    err.status = 403;
    next(err);
    return;
  }
  res.json({ message: "Cat item deleted." });
}

export { catList, catById, catsByUser, catAdd, catUpdate, catDelete };
