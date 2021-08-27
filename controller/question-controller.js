const bcrypt=require('bcrypt');
const {generateAccessToken,authenticateToken}=require('../auth/user_jwt')
const knex=require('../database/db')

exports.addqestion=authenticateToken,(req,res)=>{
    knex('question').insert({
        question:req.body.question,
        Option_A:req.body.Option_A,
        Option_B:req.body.Option_B,
        Option_C:req.body.Option_C,
        Option_D:req.body.Option_D,
        topic_id:req.body.topic_id,
        image:req.body.image,
        description:req.body.description,
        answer:req.body.answer,
        time:new Date()
    }).then((data)=>{
        res.json({message:"qestion post succesfully..."})
    }).catch((err)=>{
        res.json({"error":err.message})
    })
}


exports.getQueston=(req,res)=>{
    knex.select('question','Option_A','Option_B','Option_C','Option_D','description','image','time')
    .from('question')
    .then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send(err.message)
    })
}

exports.saveresponse=authenticateToken,(req,res)=>{
    const question_id=req.params.question_id
    console.log(question_id);
    knex.select("*").from('question')
    .where('question_id',req.params.question_id)
    .then((data)=>{
        if(req.body.answer===data[0].answer){
            knex.select('*').from('users').where('email',req.data.email).then((data1)=>{
                knex('response').insert({
                        user_id:data1[0].id,
                        question_id:question_id,
                        topic_id:1,
                        response:"right",
                        answerstatus:true,
                        time:new Date()
                    }).then((data)=>{
                        res.json({message:"user response succesfully submit.."})
                    }).catch((err)=>{
                        res.send(err.message)
                    })
                }).catch((err)=>{
                    res.send(err.message)
                })
        }else if(req.body.answer==="dontKnow"){
            knex.select('*').from('users').where('email',req.data.email).then((data1)=>{
                knex('response').insert({
                        user_id:data1[0].id,
                        question_id:question_id,
                        topic_id:1,
                        response:"dontKnow",
                        answerstatus:false,
                        time:new Date()
                    }).then((data)=>{
                        res.json({message:"user response succesfully submit.."})
                    }).catch((err)=>{
                        res.send(err.message)
                    })
                }).catch((err)=>{
                    res.send(err.message)
                })
        }else{
            knex.select('*').from('users').where('email',req.data.email).then((data1)=>{
                knex('response').insert({
                        user_id:data1[0].id,
                        question_id:question_id,
                        topic_id:1,
                        response:false,
                        answerstatus:"answered",
                        time:new Date()
                    }).then((data)=>{
                        res.json({message:"user answer is wrong...."})
                    }).catch((err)=>{
                        res.send(err.message)
                    })
                }).catch((err)=>{
                    res.send(err.message)
                })
        }
    }).catch((err)=>{
        res.send(err.message)
    })
}


exports.resetresponse=authenticateToken,(req,res)=>{
    knex.select('*').from('users').where('email',req.data.email).then((data)=>{
        knex('response').where('user_id',data[0].id).del().then((data1)=>{
            res.json({message:"response reset successfully.."})
        }).catch((err)=>{
            res.json({message:"data not found..."})
        })
    }).catch((err)=>{
        res.send(err.message)
    })
}


exports.likequestion=authenticateToken,(req,res)=>{
    const question_id=req.params.question_id
    if(req.body.like===true){
        knex.select('*').from('question_like').where('question_id',question_id).then((data)=>{
            if(data.length<1){
                knex.select('*').from('users').where('email',req.data.email).then((data)=>{
                    knex('question_like').insert({
                        user_id:data[0].id,
                        question_id:question_id,
                        topic_id:question_id,
                        like:req.body.like,
                        time:new Date()
                    }).join('question',function(){
                        this.on('question_like.question_id','question.question_id')
                    }).where('question.question_id',question_id)
                    .then((data)=>{
                        knex.select('answer').from('question').where('question_id',question_id).then((result)=>{
                            res.send(result)
                        }).catch((err)=>{
                            res.send(err.message)
                        })
                    }).catch((err)=>{
                        res.send(err.message)
                    })
                }).catch((err)=>{
                    res.send(err.message)
                })
            }else{
                res.send({message:"already like this post"})
            }
        })

    }else{
        knex.select('*').from('users').where('email',req.data.email).then((data)=>{
            knex('question_like').insert({
                user_id:data[0].id,
                question_id:question_id,
                topic_id:question_id,
                like:req.body.like,
                time:new Date()
            }).join('question',function(){
                this.on('question_like.question_id','question.question_id')
            }).where('question.question_id',question_id)
            .then((data)=>{
                knex.select('answer').from('question').where('question_id',question_id).then((result)=>{
                    res.send(result)
                }).catch((err)=>{
                    res.send(err.message)
                })
            }).catch((err)=>{
                res.send(err.message)
            })
        }).catch((err)=>{
            res.send(err.message)
        })
    }
}


exports.result=(req,res)=>{
    let right=0;
    let dontKnow=0;
    let answered=0
    knex.select('*').from('response').then((data)=>{
        for (let i=0;i<data.length;i++){
            // console.log(data[i].response);
            if(data[i].response==="right"){
                right++;
            }else if(data[i].response==="dontKnow"){
                dontKnow++;
            }else if(data[i].response==="answered"){
                answered++;
            }
        }
    let obj={
        "attemptQuestion":data.length,
        "Right":right,
        "dontKnow":dontKnow,
        "wrong":answered
    }
    res.send(obj)
    console.log(obj);
    }).catch((err)=>{
        res.send(err.message)
    })
}


exports.lastquestion=(req,res)=>{
    knex.select('question','Option_A','Option_B','Option_C','Option_D')
    .from('question')
    .orderBy('question')
    .limit(1).then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send(err.message)
    })
}


exports.deleteQuestion=(req,res)=>{
    knex('question').where('question_id',req.params.question_id).del().then((data)=>{
        res.status(200).json({
            message:"questondelete successfully..."
        })
    }).catch((err)=>{
        res.status(404).json({
            message:"question not found..."
        })
    })
};



exports.index=(req,res)=>{
    res.send('hello ')
}