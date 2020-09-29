const express =require('express');
const userRouter =express.Router();

const bcrpt =require('bcryptjs');
const jwt = require('jasonwebton');
const User=require('../../models/User');
const SECRET =process.env.SECRET;

const validateSignupInput =require('../../validation/SignUp');
const validateLoginInput =require("../../validation/Login");


//1. Create SigUp Route
userRouter.post('/signup',(req,res)=>{
    const {errors,isValid} =validateSignupInput(req.body);
    const {username,email,password}=req.body;
/*  Validate user input, if invalid return appropriate error msg
    else search Db for the user with same credentials, if user exist return approprate msg
    otherwise create a newuser, hash the password and store in DB*/
    if(!isValid){
        return res.status(400).json(errors);
    }

    User.findOne({$or:[{email},{username}]}).then(user=>{
        if(user){
            if(user.email===email)
            return res.status(400).json({email:"Emaill Already exist"});
            else{
                return res.status(400).json({username:"Username Already exist"});
            }
           
            } else{
                //create new user
                const newUser = new User({username,email,password});
                //hash password and storre in DB
                bcrpt.genSalt(10,(err,salt)=>{
                    bcrpt.hash(newUser.password,salt,(err,hash)=>{
                        if(err) throw err;
                        newUser.password=hash;
                        newUser
                        .save()
                        .then(user=>res.json(user)).
                        catch(err=>console.log({error:"Error Creating a new user"})
                        );
                    });
                    
                });
        }
    });

})

//2. Login Routes
    userRouter.post('/login',(req,res)=>{
        const{errors,isValid}=validateLoginInput(req.body);
        const{username,password} =req.body;

        /*Validate login input. If not valid reture error status
          if valid but user not found, return error
          if found  use bcrypt to compare password and return apprioprate msg */

        if(!isValid){
            return res.status(400).json(errors);
        }

        User.findOne({username}).then(user=>{
            if(!user){
                return res.status(404).json({username:"Username not found"});
            }

            bcrpt.compare(password,user.password).then(isMatch=>{
                if(isMatch){
                    const payload={
                        id:user.id,
                        username:user.username
                    };
                    jwt.sign(payload,SECRET,{expiresIn:3600},(err,token)=>{
                        if(err){
                            console.log(err)
                        }return res.json(
                            {
                                success:true,
                                token:"Bearer"+token
                            }
                        );
                    });
                } else{
                    return res.status(400).json({password:"Password incorrect"})
                }
            })
        })
    })


module.exports=userRouter;