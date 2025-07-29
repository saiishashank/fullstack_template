const express=require('express');
const router=express.Router();
const {getusers} = require('../controller/usercontroller');
const {protect,authorise}= require('../controller/authcontroller');
router.get('/getusers',protect,authorise("admin"),getusers);

module.exports=router;