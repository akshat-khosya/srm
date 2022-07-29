const router = require("express").Router();
const Event = require("../models/event");
const Mentoring = require("../models/mentoring");
const Oppo = require("../models/oppo");
const Resource = require("../models/resource");
const Scholar = require("../models/scholarships");
const newcount = require("../models/newcount");

    // GET TOTAL EVENT IN DB
    router.post("/getnoticount", async (req, res)=>{
        // const totalevent = await Event.count();
        const totaleventNoti = await Event.find({},"_id")
        .then(res1 => 
        // console.log(res1);
        res1.map(function(el){
            return el._id.toString().replace(/ObjectId\("(.*)"\)/, "$1");
        })
        );
        // console.log(totaleventNoti);
        const usereventread = await newcount.find({"user_id":req.body.userid},"currentEvent");
        const differenceevent = totaleventNoti.filter(x => !usereventread[0]?.currentEvent?.includes(x));
        console.log(usereventread);
        console.log(differenceevent);


        // Mentor ------------------------
        const totalmentorNoti = await Mentoring.find({},"_id")
        .then(res1 => 
        // console.log(res1);
        res1.map(function(el){
            return el._id.toString().replace(/ObjectId\("(.*)"\)/, "$1");
        })
        );
        // console.log(totalmentorNoti);
        const newmentornoti = await newcount.find({"user_id":req.body.userid},"currentMentorRead");
        const differencementor = totalmentorNoti.filter(x => !newmentornoti[0]?.currentMentorRead?.includes(x));


        // Opportunities-----------------------------
        // const totalevent = await Event.count();
        const totalopportunity = await Oppo.find({},"_id")
        .then(res1 => 
        // console.log(res1);
        res1.map(function(el){
            return el._id.toString().replace(/ObjectId\("(.*)"\)/, "$1");
        })
        );
        // console.log(totalopportunity);
        const new_opportunity = await newcount.find({"user_id":req.body.userid},"currentOpportunity");
        const differenceopportunity = totalopportunity.filter(x => !new_opportunity[0]?.currentOpportunity?.includes(x));
        console.log(new_opportunity);
        console.log(differenceopportunity);

        // Resource -----------------------
        const totalresource = await Resource.find({},"_id")
        .then(res1 => 
        // console.log(res1);
        res1.map(function(el){
            return el._id.toString().replace(/ObjectId\("(.*)"\)/, "$1");
        })
        );
        // console.log(totalresource);
        const new_resource = await newcount.find({"user_id":req.body.userid},"currentResource");
        const differenceresource = totalresource.filter(x => !new_resource[0]?.currentResource?.includes(x));
        console.log(new_resource);
        console.log(differenceresource);

        // scholarships--------------------
        const totalscholarship = await Scholar.find({},"_id")
        .then(res1 => 
        // console.log(res1);
        res1.map(function(el){
            return el._id.toString().replace(/ObjectId\("(.*)"\)/, "$1");
        })
        );
        // console.log(totalscholarship);
        const new_scholarship = await newcount.find({"user_id":req.body.userid},"currentScholarship");
        const differencescholarship = totalscholarship.filter(x => !new_scholarship[0]?.currentScholarship?.includes(x));
        console.log(new_scholarship);
        console.log(differencescholarship);

        res.send({
            "differenceevent":differenceevent.length,
            "differencementor":differencementor.length,
            "differenceopportunity":differenceopportunity.length,
            "differenceresource":differenceresource.length,
            "differencescholarship":differencescholarship.length
        })
    });

    module.exports = router;