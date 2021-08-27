const knex = require("../database/db");
const express=require('express');
const app=express.Router();
const {addClass,getclasslist,removeClass}=require('../controller/class-controller')

app.delete('/removeClass/:class_id',removeClass)
app.post('/addClass',addClass)
app.get('/getclasslist',getclasslist)


module.exports=app;