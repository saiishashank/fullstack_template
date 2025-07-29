const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../database");
const secret_key = "SAI@SECRET_KEY";

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
const login = async (req, res) => {
  const { username, password } = req.body;
  const query = "select * from users where username=?";
  const result = await db.query(query, [username]);
  try {
    if (result.length == 0) {
      return res.status(400).send("user not found");
    }
    const user = result[0];
    const password_match = await bcrypt.compare(password, user.password);
    if (!password_match) {
      return res.status(400).send("invalid password");
    }
    const payload = {
      username: user.username,
      id: user.id,
    };
    const token = jwt.sign(payload, secret_key, {
      expiresIn: "1h",
    });
    res.status(200).send({
      msg: "successfully logged in",
      token: token,
    });
  } catch (err) {
    console.log("login error", err);
    res.send("server error");
  }
};


module.exports = { register, login };
