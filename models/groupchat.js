const mongoose = require('mongoose');
const group = require('./group');
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
    links:[{
        type:String
    }]
},
    {
        timestamps: true
    }
);

module.exports = new mongoose.model("groupchat", groupChatSchema);
