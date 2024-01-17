const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    fName:{
        type:String,
        required:true,
        trim:true
    },
    lName:{
        type:String,
        required:true,
        trime:true
    },
    uniqueUserName:{
        type:String,
        trim:true,
    
    },
    email:{
        type:String,
        trim:true,
        required:true
    },
    profilePic:{
        type:String,
        default:`https://api.dicebear.com/5.x/initials/svg?seed=${this.fName}${this.lName}`
    },
    secrets:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Secrets"
        },
    ],
    reset_token:{
        type:String
    },
    reset_token_expiry:{
        type:Date
    },
    password:{
        type:String,
        required:true,

    }

});

module.exports = mongoose.model("User",userSchema);