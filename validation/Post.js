//const { default: validator } = require("validator");

const Validator =require('validator');
const isEmpty =require('is-empty');


const ValidatePostInput =(data)=>{
    let errors={}

    let {title,author, content,date}= data;

    title = !isEmpty(title)?title:"";
    author= !isEmpty(author) ? author:"";
    content=!isEmpty(content) ? content:"";
    //date =!isEmpty ? date:"";

    //validate title

    if (Validator.isEmpty(title)){
        errors.title="Enter a title for your blog post"
    }

    //Validate author
    if (Validator.isEmpty(author)){
        errors.author="Provide Author of the post"
    }

    //Validate Content
    if (Validator.isEmpty(content)){
        errors.content="Provide a blog content"
    }

    //Validate
    if(validator.isEmpty(date)){
        errors.content="Select Date"
    }

    return{
        errrors, isValid:isEmpty(errors)
    };


}

module.exports = ValidatePostInput;