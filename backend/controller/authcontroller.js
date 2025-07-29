const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../database");
const secret_key = "SAI@SECRET_KEY";

const register = async (req, res) => {
  const { username, password, role = "user" } = req.body;
  try {
    const query = "INSERT INTO users (username,password,role) VALUES (?,?,?)";
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const result = await db.query(query, [username, hash, role]);
    const payload = {
      id: result.insertId,
      username: username,
      role: role,
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
      role: user.role,
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

const protect = (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, secret_key);
      req.user = decoded;
      next();
    } catch (err) {
      console.log("invalid token", err);
      res.send("invalid token");
    }
  }
  if (!token) {
    res.send("not authorized, no token provided");
  }
};

const authorise = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      console.log(req.user.role);
      return res.send(" not authorised");
    }
    next();
  };
};

module.exports = { register, login, protect, authorise };
