const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    phone:{
        type:String,
        
        unique:true,
        
    
    },
    email:{
        type:String ,
        
        unique:true,
        
    
    },
    name:{
        type:String,
       
    },
    fname:{
        type:String,
       
    },
    dob:{
        type:String,
       
    },
    gender:{
        type:String,
       
    },
    mname:{
        type:String,
       
    },
    currently:{
        type:String,
       
    },
    work:{
        type:String,
       
    },
    batch:{
        type:String,
       
    },
    course:{
        type:String,
       
    },
    bio:{
        type:String,
       
    },
    photo:{
        type:String,
        unique:true
    },

    verifcation:{
        type:Boolean,
        required:true,
        default:false
    },
    following:[{type:String}]

},{timestamps:true});

module.exports=mongoose.model("User",UserSchema);