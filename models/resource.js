const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
   
    email:{
        type:String ,
        required:true
    
    },
    title:{
        type:String,
        required:true
    },
    content:{
        type:String
    },
    file:{
        type:String,
        
    },
    fileType:{
        
    },
    fileTitle:{
        type:String
    },
    date:{
        type:String
    },
    link:{
        type:String
    }

},{timestamps:true});

module.exports=mongoose.model("Resource",ResourceSchema);