const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../database");
const login = (req, res) => {
  res.send("login ");
};

const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const query = "INSERT INTO users (username,password) VALUES (?,?)";
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const result = await db.query(query, [username, hash]);
    const payload = {
      id: result.insertId,
      username: username,
    };
    const secret_key = "SAI@SECRET_KEY";
    const token = jwt.sign(payload, secret_key, {
      expiresIn: "1h",
    });
    res.status(201).send({
      msg: "successfully registered",
      token: token,
    });
  } catch (err) {
    console.log("register error:", err);
    res.status(500).send("server error");
  }
};
module.exports = { register, login };
