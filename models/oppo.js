const mongoose = require('mongoose');

const OppoSchema = new mongoose.Schema({
    field:{
        type:String,
    },
    email:{
        type:String    
    },
    department:{
        type:String
    },
    link:{
        type:String
    },
   content:{
        type:String
    },
    pdf:{
        type:String
    },
    author:{
        type:String
    }


},{timestamps:true});

module.exports=mongoose.model("Oppo",OppoSchema);