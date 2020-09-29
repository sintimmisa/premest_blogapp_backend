const express =require('express');
const userRouter =express.Router();
const bcrpt =require('bcryptjs');
const jwt = require('jasonwebton');
const User=require('../models/User');
const SECRET =process.env.SECRET;
const validateSignupInput =require('../validation/SignUp');
const validateLoginInput =require("../validation/Login");


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


module.exports=userRouter;