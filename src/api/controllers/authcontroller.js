import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { getUserByUsername } from "../models/usermodel.js";

async function login(req, res) {
  const user = await getUserByUsername(req.body.username);

  if (!user) {
    res.sendStatus(401);
    return;
  }

  const passwordMatches = bcrypt.compareSync(req.body.password, user.password);
  if (!passwordMatches) {
    res.sendStatus(401);
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

function whoAmI(req, res) {
  if (res.locals.user) {
    res.json({ message: "token ok", user: res.locals.user });
  } else {
    res.sendStatus(401);
  }
}

export { login, whoAmI };
