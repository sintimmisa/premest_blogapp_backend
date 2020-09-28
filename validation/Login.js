//import dependencies
const Validator  =require('validator');
const isEmpty =require('is-empty');


const loginValidation=(data)=>{
    //Declare error var
    let errors={};

    //Destructure and Assign email,password to data
    let { username,email,password} =data;

    //Convert empty field to empty strings: validator works with strings
    // if data(usrname,email,password) isnotempty set data to empty string
    username=!isEmpty(username)? username:"";
    email =!isEmpty(email)? email:"";
    password=!isEmpty(password)? password:"";


    //Validate username: if field is empty return a error msg
    if (Validator.isEmpty(username)){
        errors.username="Username is required";
    }


    //Validate email
    // if email is empty return errror msg
    //esle is emaill is not an email reture error

    if (Validator.isEmpty(email)){
        errors.email="Email is required";
    }else if (Validator.isEmail(email)){
        errors.email="Email is invalid"
    }

    //Validate pasword
    // if password is empty return error
    //if less that 6 charaters return error
    if (Validator.isEmpty(password)){
        errors.password="Password is required"
    } else if (!Validator.isLength(password,{min:6,max:30})){
        errors.password="Password word must be at least 6 charaters";

    }

    return{
        errors, isValid:isEmpty(errors)
    };
};


module.exports = loginValidation;