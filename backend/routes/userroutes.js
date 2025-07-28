const express=require('express');
const router=express.Router();
const {getuser} = require('../controller/usercontroller');
router.get('/api/user',getuser);

module.exports=router;