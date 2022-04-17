const router = require("express").Router();
const Group = require("../models/group");
const userData = require("../models/userData");

router.post("/creategrouppp", async (req, res) => {
    try{
        
        const groupInfo = Group({
            group_name: req.body.group_name,
            group_image: req.body.group_image,
            group_owner: req.body.group_owner,
            members: req.body.members
        });
        await groupInfo.save(async (err, savedGroup) => {
            if(err){
                res.json({status: false, message: err.keyValue})
            }   else{
                console.log(savedGroup);

                await userData.find({_id: req.body._id.toString()}).update({
                    $push:{
                        groupOwns: savedGroup._id.toString()
                    }
                })

                res.send({
                    status: true,
                    msg: "Group created"
                });
            }
        })
        console.log(groupInfo);
        // const groupp = await group. groupchat
    }
    catch(err){
        console.log(err);
    }
});

router.get("/:id", async(req, res) =>{
    try{
        // res.send(req.params.id);
        const allChat = await Group.find({_id: req.params.id}).populate('group_chat').sort({createdAt:-1}).exec();

        console.log(allChat);
        res.send(allChat);
    }
    catch(err){
        console.log(err);
    }
});

router.post("/:id/inviterequest/:memberID", async(req,res) => {
    try{

        let ownExists = await userData.find({'_id':req.body.ownerID}).find({'groupOwns':{$in: req.params.id}}).exec();
        console.log(ownExists);
        res.send("ok");
        // await Group.find({id:req.params.id}).update({
        //     $push:{
        //         invites:req.params.memberID
        //     }
        // });
    }
    catch(err){}
})

module.exports = router;