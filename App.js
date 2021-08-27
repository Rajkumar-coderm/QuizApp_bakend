const knex = require("./database/db");
const express=require('express');
const app=express()
app.use(express.json());

app.use('/users',require('./Routs/users'))
app.use('/question',require('./Routs/qestons'))
app.use('/admin/quiz',require('./Routs/admin'))
app.use('/categories',require('./Routs/categories'))
app.use('/topics',require('./Routs/topic'))
app.use('/class',require('./Routs/class'))

app.listen(2022,()=>{
    console.log('server start');
});

