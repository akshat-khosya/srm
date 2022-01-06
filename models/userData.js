const mongoose = require("mongoose");

const UserDataSchema = new mongoose.Schema(
  {
    name: {
        type:String,
        required:true
    },
    email: {
        type: String,
        required:true,
        unique:true
      },
    phone: {
      type: Number,
      required:true,
      unique:true

      
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    pyear:{
        type:String,
        required:true,
    },
    password: {
      type: String,
      required: true,
    },
    verifcation: {
      type: Boolean,
      required: true,
      default: false,
    },
    batch:{
        type:String,

    },
    bio:{
        type:String,

    },
    currentoriginaztion:{
        type:String,

    },
    desgination:{
        type:String,

    },
    dob:{
        type:String,

    },
    fname:{
        type:String
    } ,
    gender:{
        type:String,

    }, 
    mname:{
        type:String,

    },
    program:{
        type:String,

    },
    photo:{
        type:String
    }
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserData", UserDataSchema);
