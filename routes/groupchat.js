const router = require("express").Router();
const GroupChat = require("../models/groupchat");
const Group = require("../models/group");


router.post("/chatpost",async (req,res) => {
    try{
        const chatpost =  GroupChat({
            groupID: req.body.groupID,
            content: req.body.content,
            file: req.body.file,
            links: req.body.links,
        });

        let pk;
        
        await chatpost.save(async (err, savedpost) => {
            if(err){
                res.json({status: false, message:"chatpost not delivered"});
                console.log(err);
            }
            else{
                // console.log(savedpost._id);
                pk = savedpost._id.toString();
                await Group.update({
                    _id:req.body.groupID
                },
                {
                    $addToSet: {
                        group_chat: savedpost._id.toString()
                    }
                })
                    console.log(pk);
                
                
                    
                res.send({
                    status: "true",
                    msg: "Chat post added"
                });
                
                
                // let ok = groups.find({group_image: "img1234"}).exec();
                // console.log(ok);groupchat
                // Groups.find({_id: `${req.body.groupID}`}).update(
                //     {
                //         $push: {group_chat: savedpost._id},
                //     }
                // );
                // Groups.save({group_chat: `${savedpost._id}`});
                
                // res.send(savedpost);
            }
        });
        
        // let kkk = await Group.update({
        //     _id:req.body.groupID
        // },
        // {
        //     $addToSet: {
        //         group_chat: pk
        //     }
        // })
        //     console.log(pk);
        //     res.send(kkk);
        

    }
    catch(err){
        console.log(err);
    }
})


router.get("/chatget", async(req, res) => {
    try{
        let ok = await Group.find({_id: "6256936c2e7e68d0e2601a44"});
// console.log(ok)
                  res.send(ok);
    }
    catch(err){
        console.log(err);
    }
})

module.exports = router;