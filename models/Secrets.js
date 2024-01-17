const mongoose = require("mongoose");

const secretSchema = new mongoose.Schema({
    user_id : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    image:{
        type:String,
        default:null,

    },
    secret:{
        type:String,
        required:true
    }
},{timestamps:true});


module.exports =  mongoose.model("Secrets",secretSchema);