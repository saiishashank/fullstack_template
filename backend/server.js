const express = require('express');
const app=express();
const mysql2= require('mysql2');
const authroutes = require('./routes/authroutes');
const userroutes=require('./routes/userroutes');
const cors = require('cors');
app.use(express.json());
app.use(cors());

module.exports.db=mysql2.createConnection({
    host:'localhost',
    user:'root',
    password:'Shashank@2004',
    port:3306,
    database:'mydb',
});
 db.connect((err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log('connected to db');
    }
 });
app.use('/api/auth',authroutes);
app.use('/api/user',userroutes);

app.listen(5000,()=>{
    console.log('server running on port 5000');
});
