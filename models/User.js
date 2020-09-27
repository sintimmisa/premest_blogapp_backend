const mongoose = require('mongoose');


//Create User Schema

const UserSchema = new mongoose.Schema({

    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    pasword:{
        type:String,
        required:true
    }
});

exports.module = User =mongoose.model('user',UserSchema);// export while assigning to User

