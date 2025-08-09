const db = require("../database");
const bcrypt = require("bcrypt");
const secret_key = "SAI@SECRET_KEY";
const jwt = require("jsonwebtoken");
const getusers = async (req, res) => {
  try {
    const query = "select * from users";
    const result = await db.query(query);
    return res.send(result);
  } catch (err) {
    console.log(err);
    res.send("error fetching users");
  }
};
const getuserbyid = async (req, res) => {
  try {
    const id = req.params.id;
    const query = "select * from users where id=?";
    const result = await db.query(query, [id]);
    res.send(result);
  } catch (err) {
    console.log("user not found", err);
    res.send("user not found");
  }
};

const updateuser = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const id = req.params.id;
    const query = "update users set email=?, password=?, role=? where id=?";
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const result = await db.query(query, [email, hash, role, id]);
    res.send({
      msg: "user updated successfully",
      user: result,
    });
  } catch (err) {
    console.log("user not found", err);
    res.send("user not found");
  }
};

const deleteuser = async (req, res) => {
  const id = req.params.id;
  const query = "delete from users where id=?";
  const result = await db.query(query, [id]);
  res.send({
    msg: "user deleted successfully",
  });
};
const getme = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, secret_key);
    const user = await db.query("select * from users where id=?", [decoded.id]);
    res.send(user);
  } catch (err) {
    console.log("error fetching user data", err);
  }
};
module.exports = { getusers, getuserbyid, updateuser, deleteuser, getme };
