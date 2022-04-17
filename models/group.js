const mongoose = require('mongoose');
const userData = require('./userData');
const groupSchema = new mongoose.Schema({
    group_name:{
        type: String,
    },

    group_image:{
        type: String,
    },

    group_owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:userData,
    },

    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserData'
    }],

    group_chat:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'groupchat'
    }],

    invites:[{
        type: String,
    }]
},
    {
        timestamps:true
    }
);

module.exports = new mongoose.model("Group",groupSchema);