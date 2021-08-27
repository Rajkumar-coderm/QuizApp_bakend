const express=require('express');
const knex = require("../database/db");
const routs=express.Router();
routs.use(express.json())
const {login,signup,subscription,subscriptionDetail,userupdate}=require('../controller/user-controller')

routs.post('/login',login)
routs.post('/signup',signup)
routs.put('/userupdate',userupdate)
routs.post('/subscription',subscription)
routs.get('/subscriptionDetail',subscriptionDetail)



module.exports=routs;

