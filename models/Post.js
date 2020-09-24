//import mongoose
const mongoose=require('mongoose');

//Setup Post Schema
const postSchema = new mongoose.Schema({
    id:{
        type:Number,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    creation_date:{
        type:Date
    }
});

module.exports =Post =mongoose.model("post",postSchema);