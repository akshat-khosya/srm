const mongoose = require('mongoose');
const group = require('./group');
require('./userData')
const groupChatSchema = new mongoose.Schema({
    groupID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'group'
    },
    content:{
        type: String,
    },
    file: {
        type: String,
    },  
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserData',
    },
    links:[{
        type:String
    }]
},
    {
        timestamps: true
    }
);

module.exports = new mongoose.model("groupchat", groupChatSchema);
