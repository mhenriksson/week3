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

async function getUser(req, res) {
  const user = await getUserById(req.params.id);
  if (!user) {
    res.sendStatus(404);
    return;
  }
  res.json(user);
}

async function registerUser(req, res) {
  const newUser = await createUser(req.body);
  if (!newUser) {
    res.sendStatus(400);
    return;
  }
  res.status(201).json({ message: "New user added.", user: newUser });
}

function editUser(req, res) {
  res.json({ message: "User item updated." });
}

async function removeUser(req, res) {
  const deleted = await deleteUserById(req.params.id);
  if (!deleted) {
    res.sendStatus(404);
    return;
  }
  res.json({ message: "User item deleted." });
}

export { listUsers, getUser, registerUser, editUser, removeUser };
