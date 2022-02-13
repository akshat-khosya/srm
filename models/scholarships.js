const mongoose = require('mongoose');

const ScholarSchema = new mongoose.Schema({
   
    email:{
        type:String ,
        required:true
    
    },
    title:{
        type:String,
        required:true
    },
    type:{
        type:String
    },
    content:{
        type:String
    },
    file:{
        type:String,
        
    },
    openDate:{
        type:String
    },
    closeDate:{
        type:String
    },
    amount:{
        type:Number
    }

},{timestamps:true});

module.exports=mongoose.model("Scholar",ScholarSchema);