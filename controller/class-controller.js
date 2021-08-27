const bcrypt=require('bcrypt');
const {generateAccessToken,authenticateToken}=require('../auth/admin_jwt')
const knex=require('../database/db');

exports.addClass=authenticateToken,(req,res)=>{
    console.log(req.data.email);
    knex('class').insert({
        name:req.body.name,
        image:req.body.image,
        description:req.body.description,
        color:req.body.color,
        status:req.body.status
    }).then((data)=>{
        res.status(200).json({message:'successfully add class...'})
    }).catch((err)=>{
        res.status(404).json({message:"not found.."})
    })
};

exports.getclasslist=(req,res)=>{
    knex.select('*').from('class').orderBy('class_id','desc').then((data)=>{
        res.status(200).send(data)
    }).catch((err)=>{
        res.status(404).send(err.message)
    })
}


exports.removeClass=(req,res)=>{
    knex('class').where('class_id',req.params.class_id).del().then((data)=>{
        res.status(200).json({
            message:"successfully remove class..."
        })
    }).catch((err)=>{
        res.status(404).json({
            "error":err.message
        })
    })
};




