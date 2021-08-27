const express=require('express');
const app=express();
const topic=express.Router();
topic.use(express.json());
const knex=require('../database/db')

const {topicAdd,getTopic,removeTopic}=require('../controller/topic-controller')

topic.post('/topicAdd',topicAdd)
topic.get('/getTopic/:class_id',getTopic);
topic.delete('/removeTopic/:topic_id',removeTopic)

module.exports=topic;