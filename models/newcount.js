const mongoose = require("mongoose");

const NewCountSchema = new mongoose.Schema(
    {
        user_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UserData'
        },
        currentMentorRead: 
            [{type: String}],
        currentResource:
            [{type: String}],
        currentOpportunity:
            [{type: String}],
        currentScholarship:
            [{type: String}],
        currentEvent:
            [{type: String}]
    }
)

module.exports = mongoose.model("NewCountSchema", NewCountSchema);