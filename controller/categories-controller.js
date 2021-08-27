const knex=require('../database/db');


exports.addcategories=(req,res)=>{
    knex('categories').insert({
        name:req.body.name,
        topic_id:1,
        description:req.body.description,
        time:new Date()
    }).then((data)=>{
        res.status(200).json({
            message:"catogery added succesfully.."
        })
    }).catch((err)=>{
        res.status(404).json({
            message:"not found..."
        })
    })
};

exports.getcategories=(req,res)=>{
    knex.select('*').from('categories')
    .where('topic_id',req.params.topic_id)
    .then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send(err)
    })
}