const mongoose = require('mongoose');

const MentoringSchema = new mongoose.Schema({
    interests:{
        type:Array,
    },
    email:{
        type:String    
    },
    current:{
        type:String
    },
    mode:{
        type:String
    },
    frequency:{
        type:String
    },
    name:{
        type:String
    }


},{timestamps:true});

module.exports=mongoose.model("Mentoring",MentoringSchema);