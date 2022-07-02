const mongoose = require("mongoose");

const GroupInfoSchema = new mongoose.Schema(
    {
      group_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserData'
      },
      totalchat:[
        {
          type:String
        }
      ],
      msg_read: {
        type: Number
      }
    }
)

const Read = new mongoose.Schema(
    {
        user_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Group'
        },
        read: [GroupInfoSchema]
    }
);

module.exports = mongoose.model("Read", Read);