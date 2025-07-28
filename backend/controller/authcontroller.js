const jwt=require('jsonwebtoken');
const bycrypt=require('bycrypt');
const db=require('../server');
module.exports.login=(req,res)=>{
   res.send('login ');
};

const regisrer=(req,res)=>{
    const {username,password}=req.body;
     const query='INSERT INTO USERS (username,passsword) VALUES (?,?)';
     db.
}


