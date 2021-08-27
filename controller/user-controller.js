const bcrypt=require('bcrypt');
const {generateAccessToken,authenticateToken}=require('../auth/user_jwt')
const knex=require('../database/db')

exports.signup=(req,res)=>{
    if (req.body.name === undefined || req.body.email === undefined || req.body.password === undefined){
        console.log({"suggetion": "please fill all contents!"});
        res.send({"suggetion": "please fill all contents!"})
    }else{
        knex.select('*').from('users').where({"email": req.body.email}).then((data) =>{
            if (data.length<1){
                const salt = genSaltSync(10);
                const password=hashSync(req.body.password,salt)
                knex('users').insert({name:req.body.name,
                    email:req.body.email,
                    password:password,
                    image:req.body.image
                })
                .then((result) =>{
                    knex.select('*').
                    from('users')
                    .where('email', req.body.email)
                    .then((data) =>{
                        console.log({"success": "signup successfully..."})
                        res.send({"success": "signup successfully..."});
                    }).catch((err) =>{
                        console.log(err);
                    })
                }).catch((err) =>{
                    console.log(err);
                })
            }else{
                console.log({"exist": "this user alredy exists.."});
                res.send({"exist": "this user alredy exists.."})
            }
        }).catch((err) =>{
            console.log(err);
        })
    }
};

exports.login=(req,res)=>{
    if (req.body.email==undefined || req.body.password==undefined){
        res.send({message:"user name or password undefind"})
    }else {
        knex.select("*").from("users").where({ email: req.body.email })
            .then((data) => {
                if (data.length > 0) {
                    let password = bcrypt.compare(req.body.password,data[0].password, (er, password) => {
                        if (er) {
                            console.log(er);
                        }
                        console.log(password);
                        if (password===true){
                            const token=generateAccessToken({email:req.body.email})
                            console.log(token);
                            res.cookie("token",token)
                            res.json({message:"login successfully.."})
                        }else{
                            res.send('login failed')
                        }
                    })
                }
         }).catch((er) => console.log(er));
    }
};

exports.subscription=(req,res)=>{
    if(req.body.status===undefined){
        res.send({message:"please pay and submit..."})
    }else{
        knex.select("*").from('users').then((data)=>{
            knex('subscription').insert({
                user_id:data[0].id,
                transaction:req.body.transaction,
                status:req.body.status,
                start_time:new Date("2021-08-24"),
                end_time:new Date("2022-08-24")
            }).then((result)=>{
                res.send(result)
            }).catch((err)=>{
                res.send(err.message)
            })
        }).catch((err)=>{
            res.send({message:"user not found"})
        })
    }
};

exports.subscriptionDetail=(req,res)=>{
    knex.select("*")
    .from('subscription')
    .orderBy('subscription_id','desc')
    .then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send(err.message)
    })
};

exports.userupdate=authenticateToken,(req,res)=>{
    console.log(req.data);
    knex.select('*').from('users').where('email',req.data.email).then((data)=>{
        knex('users').where('id',data[0].id).update({
            name:req.body.name,
            email:req.body.email,
            password:hash(req.body.password,10)
        }).then((data)=>{
            res.send(data)
        }).catch((err)=>{
            res.send(err.message)
        })
    }).catch((err)=>{
        res.send({"error":err.message})
    })
};