const db = require("../database");
const bcrypt = require("bcrypt");
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
    const { username, password, role } = req.body;
    const id = req.params.id;
    const query = "update users set username=?, password=?, role=? where id=?";
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const result = await db.query(query, [username, hash, role, id]);
    res.send({
      msg: "user updated successfully",
      user: result,
    });
  } catch (err) {
    console.log("user not found", err);
    res.send("user not found");
  }
};

const deleteuser= async(req,res)=>{
   const id=req.params.id;
   const query="delete from users where id=?";
   const result=await db.query(query,[id]);
   res.send({
    msg:"user deleted successfully",
   });
}
module.exports = { getusers, getuserbyid, updateuser, deleteuser };
