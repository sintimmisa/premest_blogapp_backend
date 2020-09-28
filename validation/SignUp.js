const isEmpty = require("is-empty");
const { default: validator } = require("validator");






const ValidateSigupInput =(data)=>{

    let errors={}

    let {username, email, password}=data;

    username= isEmpty(username)? username:"";
    email= isEmpty(email)? email:"";
    password= isEmpty(password)? password:"";


    if (Validator.isEmpty(username)){

        errors.username="Username required"
    }

     if (Validator.isEmpty(email)){
         errors.email="Email Required"

     }else if(!Validator.isEmail(email)){
         errors.email="Email is invalid"
     }

     if (Validator.isEmpty(password)){
         errors.password="Password required"
     } else if(Validator.isLenght(password,{min:6,max:30})){
         errors.password="Email must be at least 6 characters"
     }
     return{
         errors, isValid:isEmpty(errors)
     };

}

module.exports=ValidateSigupInput;