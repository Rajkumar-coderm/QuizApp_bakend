const bcrypt=require('bcrypt');
const {generateAccessToken,authenticateToken}=require('../auth/admin_jwt')
const knex=require('../database/db');

exports.signup=(req,res)=>{
    if (req.body.name === undefined || req.body.email === undefined || req.body.password === undefined){
        console.log({"suggetion": "please fill all contents!"});
        res.send({"suggetion": "please fill all contents!"})
    }else{
        knex.select('*').from('admin').where({"email": req.body.email}).then((data) =>{
            if (data.length<1){
                const salt = 10;
                const password=bcrypt.hashSync(req.body.password,salt)
                knex('admin').insert({
                    name:req.body.name,
                    email:req.body.email,
                    password:password
                })
                .then((result) =>{
                    knex.select('*').
                    from('admin')
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
        knex.select("*").from("admin").where({ email: req.body.email })
            .then((data1) => {
                console.log(data1[0].password);

                if (data1.length > 0) {
                    let password=bcrypt.compare(req.body.password, data1[0].password, (er, result) => {
                    // console.log(password);
                        if (er) {
                            console.log(er);
                        }
                        if (result===true){
                            const token=generateAccessToken({email:req.body.email})
                            console.log(token);
                            res.cookie("token1",token)
                            res.json({message:"login successfully.."})
                        }else{
                            res.send('login failed')
                        }
                       
                    })

                } 
                else{
                    console.log("yes");
                    }
         }).catch((er) => console.log(er));
    }
};

