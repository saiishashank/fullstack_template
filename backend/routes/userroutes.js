const express = require("express");
const router = express.Router();
const {
  getusers,
  getuserbyid,
  updateuser,
} = require("../controller/usercontroller");
const { protect, authorise } = require("../controller/authcontroller");
router.get("/getusers", protect, authorise("admin", "user"), getusers);
router.get("/getuser/:id", protect, authorise("admin", "user"), getuserbyid);
router.patch("/updateuser/:id", protect, authorise("admin", "user"), updateuser);

module.exports = router;
