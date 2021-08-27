const express=require('express');
const app=express();
const admin=express.Router();
admin.use(express.json());
const knex=require('../database/db')

const{signup,login}=require('../controller/admin-controller')
admin.post("/login",login);
admin.post("/signup",signup);




module.exports=admin;