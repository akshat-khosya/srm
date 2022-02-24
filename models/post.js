const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
   
    email:{
        type:String ,
        required:true
    
    },
    media:{
        type:String,
        
    },
    desc:{
        type:String
    },
    author:{
        type:String
    },
    likes:[String],
    comments:[Object]

},{timestamps:true});

module.exports=mongoose.model("Post",PostSchema);