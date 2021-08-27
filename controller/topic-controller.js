const knex=require('../database/db');

exports.topicAdd=(req,res)=>{
    knex.select('*').from('class').then((data)=>{
        knex('topics').insert({
            name:req.body.name,
            image:req.body.image,
            class_id:data[0].class_id,
            description:req.body.description,
            time:new Date()
        }).then((data)=>{description
            res.status(200).json({
                message:"topic add successfully.."
            })
        }).catch((err)=>{
            res.status(404).send(err.message)
        })
    }).catch((err)=>{
        res.status(404).send(err.message)
    })
}

exports.getTopic=(req,res)=>{
    knex.select('*').from('topics')
    .where('class_id',req.params.class_id)
    .then((data)=>{
        res.status(200).send(data)
    }).catch((err)=>{
        res.status(404).json({
            "error":err.message
        })
    })
}



exports.removeTopic=(req,res)=>{
    knex('topics').where('topic_id',req.params.topic_id).del().then((data)=>{
        res.status(200).json({
            message:"remove topic successfully..."
        })
    }).catch((err)=>{
        res.status(404).json({
            "error":err.message
        })
    })
}