import {
  getAllUsers,
  getUserById,
  createUser,
  deleteUserById,
} from "../models/usermodel.js";

async function listUsers(req, res) {
  const users = await getAllUsers();
  res.json(users);
}

async function getUser(req, res, next) {
  const user = await getUserById(req.params.id);
  if (!user) {
    const err = new Error("User not found.");
    err.status = 404;
    next(err);
    return;
  }
  res.json(user);
}

async function registerUser(req, res, next) {
  const newUser = await createUser(req.body);
  if (!newUser) {
    const err = new Error("Could not create user.");
    err.status = 400;
    next(err);
    return;
  }
  res.status(201).json({ message: "New user added.", user: newUser });
}

function editUser(req, res, next) {
  const isSelf = req.params.id == res.locals.user.user_id;
  const isAdmin = res.locals.user.role === "admin";
  if (!isSelf && !isAdmin) {
    const err = new Error("Not allowed to update this user.");
    err.status = 403;
    next(err);
    return;
  }
  res.json({ message: "User item updated." });
}

async function removeUser(req, res, next) {
  const isSelf = req.params.id == res.locals.user.user_id;
  const isAdmin = res.locals.user.role === "admin";
  if (!isSelf && !isAdmin) {
    const err = new Error("Not allowed to delete this user.");
    err.status = 403;
    next(err);
    return;
  }
  const deleted = await deleteUserById(req.params.id);
  if (!deleted) {
    const err = new Error("User not found.");
    err.status = 404;
    next(err);
    return;
  }
  res.json({ message: "User item deleted." });
}

export { listUsers, getUser, registerUser, editUser, removeUser };
