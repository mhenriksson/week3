import promisePool from "../../utils/database.js";

async function getCats() {
  const sql =
    "SELECT cats.*, users.name AS owner_name FROM cats JOIN users ON cats.owner = users.user_id";
  const [rows] = await promisePool.query(sql);
  return rows;
}

async function getOneCat(id) {
  const sql =
    "SELECT cats.*, users.name AS owner_name FROM cats JOIN users ON cats.owner = users.user_id WHERE cats.cat_id = ?";
  const [rows] = await promisePool.execute(sql, [id]);
  if (rows.length === 0) {
    return null;
  }
  return rows[0];
}

async function getCatsByOwner(ownerId) {
  const sql = "SELECT * FROM cats WHERE owner = ?";
  const [rows] = await promisePool.execute(sql, [ownerId]);
  return rows;
}

async function addNewCat(data, filename) {
  const sql =
    "INSERT INTO cats (cat_name, weight, owner, birthdate, filename) VALUES (?, ?, ?, ?, ?)";
  const params = [
    data.cat_name,
    data.weight,
    data.owner,
    data.birthdate,
    filename,
  ];
  const [result] = await promisePool.execute(sql, params);
  if (result.affectedRows === 0) {
    return null;
  }
  return {
    cat_id: result.insertId,
    cat_name: data.cat_name,
    weight: data.weight,
    owner: data.owner,
    birthdate: data.birthdate,
    filename: filename,
  };
}

export { getCats, getOneCat, getCatsByOwner, addNewCat };
