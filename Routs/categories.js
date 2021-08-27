const express=require('express');
const knex = require('../database/db');
const app=express()
const routs=express.Router()
routs.use(express.json());
const {addcategories,getcategories}=require('../controller/categories-controller')

routs.post('/postcategories',addcategories)
routs.get('/categories/:topic_id',getcategories)

module.exports=routs;