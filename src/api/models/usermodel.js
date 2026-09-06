import promisePool from "../../utils/database.js";

async function getAllUsers() {
  const [rows] = await promisePool.query("SELECT * FROM users");
  return rows;
}

async function getUserById(id) {
  const [rows] = await promisePool.execute(
    "SELECT * FROM users WHERE user_id = ?",
    [id],
  );
  if (rows.length === 0) {
    return null;
  }
  return rows[0];
}

async function createUser(userData) {
  const sql =
    "INSERT INTO users (name, username, email, role, password) VALUES (?, ?, ?, ?, ?)";
  const params = [
    userData.name,
    userData.username,
    userData.email,
    userData.role,
    userData.password,
  ];
  const [result] = await promisePool.execute(sql, params);
  if (result.affectedRows === 0) {
    return null;
  }
  return {
    user_id: result.insertId,
    name: userData.name,
    username: userData.username,
    email: userData.email,
    role: userData.role,
  };
}

async function deleteUserById(id) {
  const [result] = await promisePool.execute(
    "DELETE FROM users WHERE user_id = ?",
    [id],
  );
  if (result.affectedRows === 0) {
    return false;
  }
  return true;
}

export { getAllUsers, getUserById, createUser, deleteUserById };
