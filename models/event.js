const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title:{
        type:String,
    },
    email:{
        type:String    
    },
    date:{
        type:String
    },
    time:{
        type:String
    },
    category1:{
        type:String
    },
    category2:{
        type:String
    },
    desc:{
        type:String
    },
    photo:{
        type:String
    },
    author:{
        type:String
    }


},{timestamps:true});

module.exports=mongoose.model("Event",EventSchema);