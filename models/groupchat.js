const mongoose = require('mongoose');
const groupChatSchema = new mongoose.Schema({
    groupID:{
        type: mongoose.Schema.Types.ObjectId,
    },
    content:{
        type: String,
    },
    // file:[{
    //     type:String,
    //     unique: true
    // }],
    links:[{
        type:String
    }]
},
    {
        timestamps: true
    }
);

module.exports = new mongoose.model("groupchat", groupChatSchema);
