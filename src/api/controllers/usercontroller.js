import { getAllUsers, getUserById, createUser } from "../models/usermodel.js";

const listUsers = (req, res) => {
  res.json(getAllUsers());
};

const getUser = (req, res) => {
  const user = getUserById(req.params.id);
  if (!user) {
    res.sendStatus(404);
    return;
  }
  res.json(user);
};

const registerUser = (req, res) => {
  const newUser = createUser(req.body);
  res.status(201).json({ message: "New user added.", user: newUser });
};

const editUser = (req, res) => {
  res.json({ message: "User item updated." });
};

const removeUser = (req, res) => {
  res.json({ message: "User item deleted." });
};

export { listUsers, getUser, registerUser, editUser, removeUser };
