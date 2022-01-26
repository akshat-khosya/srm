const mongoose = require('mongoose');

const OppoSchema = new mongoose.Schema({
    title:{
        type:String,
    },
    field:{
        type:String,
    },
    email:{
        type:String    
    },
    companyicon:{
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