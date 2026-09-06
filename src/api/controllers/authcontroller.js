import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { getUserByUsername } from "../models/usermodel.js";

async function login(req, res, next) {
  const user = await getUserByUsername(req.body.username);

  if (!user) {
    const err = new Error("Invalid username or password.");
    err.status = 401;
    next(err);
    return;
  }

  const passwordMatches = bcrypt.compareSync(req.body.password, user.password);
  if (!passwordMatches) {
    const err = new Error("Invalid username or password.");
    err.status = 401;
    next(err);
    return;
  }

  const userInfo = {
    user_id: user.user_id,
    name: user.name,
    username: user.username,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(userInfo, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });

  res.json({ user: userInfo, token: token });
}

function whoAmI(req, res, next) {
  if (!res.locals.user) {
    const err = new Error("Not authenticated.");
    err.status = 401;
    next(err);
    return;
  }
  res.json({ message: "token ok", user: res.locals.user });
}

export { login, whoAmI };
