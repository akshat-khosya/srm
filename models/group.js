const mongoose = require('mongoose');
require('./userData');
require('./groupchat');

const groupSchema = new mongoose.Schema({
    group_name:{
        type: String,
    },

    group_description:{
        type: String,
    },
    group_tags:{
        type: [String],
    },
    group_image:{
        type: String,
    },
    group_status:{
        type: String,
        default: 'public'
    },
    group_owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserData',
    },

    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userData'
    }],

    group_chat:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'groupchat'
    }],

    invites:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userData'
    }]
},
    {
        timestamps:true
    }
);

module.exports = new mongoose.model("Group",groupSchema);