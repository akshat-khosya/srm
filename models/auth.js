const mongoose = require('mongoose');

const AuthSchema = new mongoose.Schema({
    phone:{
        type:String,
        index:true, 
        
        sparse:true
    
    },
    email:{
        type:String ,
        index:true, 
        
        sparse:true
    
    },
    password:{
        type:String,
        required:true
    },
    verifcation:{
        type:Boolean,
        required:true,
        default:false
    }

},{timestamps:true});

module.exports=mongoose.model("Auth",AuthSchema);