const router = require("express").Router();
const GroupChat = require("../models/groupchat");
const group = require("../models/group");

// CREATE post chat

router.post("/chatpost",async (req,res) => {
    try{
        const chatpost =  GroupChat({
            groupID: req.body.groupid,
            content: req.body.content,
            links: req.body.links,
            file: req.body.filename,
            sender: req.body.userid
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

                // pushing object id of the chat to specified group

                await group.update({
                    _id:req.body.groupid
                },
                {
                    $addToSet: {
                        group_chat: savedpost._id.toString()
                    }
                })
                    console.log(pk);
                
                
                    
                res.send({
                    status: true,
                    msg: "Chat post added"
                });

            }
        });
                

    }
    catch(err){
        console.log(err);
    }
})


// GET Chat Post to opened group

router.post("/chatget", async(req, res) => {
    try{
        // let ok = await Group.find({_id: "6256936c2e7e68d0e2601a44"});
        const allChat = await group.find({_id: req.body.id},"group_name group_image group_tags group_owner group_description group_chat members")
        .populate({
            path:     'group_chat',			
            populate: { path:  'sender',
                    model: 'UserData',
                    select: '_id name email'
            }
          })
          .populate({
            path:     'group_owner',			
            model:'UserData',
            select:'_id name'
          })
        .sort({"createdAt":-1});

        console.log(allChat);
        res.send(allChat);
    }
    catch(err){
        console.log(err);
    }
})

// chat delete
router.post("/chatdelete", async (req,res)=>{
    await GroupChat.deleteOne({"_id":req.body.id});
    await group.updateOne({"_id":req.body.groupid},
    
        {
            $pull:{
                "group_chat":req.body.id
            }
        }

    )
    res.send({
        "isdelete":true
    })
})

module.exports = router;