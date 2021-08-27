const express=require('express');
const app=express.Router()
app.use(express.json())

const{addqestion,getQueston,saveresponse,resetresponse,likequestion,result,lastquestion,deleteQuestion,index}=require('../controller/question-controller')

app.post('/addqestion',addqestion);
app.get('/',index);
app.get('/getQueston',getQueston)
app.post('/saveresponse/:question_id',saveresponse);
app.delete('/resetresponse',resetresponse);
app.post('/likequestion/:question_id',likequestion);
app.get('/result',result);
app.get('/lastquestion',lastquestion)
app.delete('/deleteQuestion/:question_id',deleteQuestion)


module.exports=app;