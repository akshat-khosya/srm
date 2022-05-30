const router = require("express").Router();
const group = require("../models/group");
const Group = require("../models/group");
const userData = require("../models/userData");

// CREATE GROUP -=-=-=-=-=-=-=-==--==-=-=--=-=-=--=--=-
router.post("/creategroup", async (req, res) => {
    try{
        
        const groupInfo = Group({
            group_name: req.body.group_name,
            group_description: req.body.group_description,
            group_tags: req.body.group_tags,
            group_image: req.body.group_image,
            group_owner: req.body.group_owner,
            members: req.body.members
        });

        await groupInfo.save(async (err, savedGroup) => {
            if(err){
                res.json({status: false, message: err.keyValue})
            }   else{
                console.log(savedGroup);

                // [.] group own command added to add owns in user db.
                // [.] groups owner id to push to owns and joined
                await userData.find({_id: req.body._id}).update({
                    $push:{
                        groupOwns: savedGroup._id,
                        group_joined: savedGroup._id
                    }
                })

                // [.] pushes group joined to user added initially to the group
                req.body.members.map(async(memberid)=>{
                    await userData.find({_id:memberid}).update({
                        $push:{
                            group_joined: savedGroup._id
                        }
                    });
                });

                res.send({
                    status: true,
                    msg: "Group created"
                });
            }
        });
        

        console.log(groupInfo);
        // const groupp = await group. groupchat
    }
    catch(err){
        console.log(err);
    }
});


// [.] GET all public groups
router.get("/publicgroups", async(req, res) => {
    try{
        const allpublic = await Group.find({group_status: 'public'}, "_id group_name group_description group_tags group_image");
        res.send(allpublic);
    }
    catch(err){
        console.log(err,'/n',"error occured in publicgroups");
    }
})


// [.] GET all joined groups
router.get("/joined", async(req, res) => {
    try{
        const joinedgroups = await userData.find({_id: req.body.id}).populate('group_joined',{_id:1, group_name:1, group_description:1, group_tags:1, group_image:1});
        res.send(joinedgroups);
    }
    catch(err){
        console.log(err);
    }
})


// [.] POST join public group
router.post("/addmember", async(req, res) => {
    try{
        // CHECK COMMAND -=-=-=-=-=-=-=-=-=-
        // let alreadyjoined = await group.find({members: req.body.id});
        // POST add to member in group
        await group.find({_id: req.body.groupid}).update({
            $push:{
                members: req.body.id
            }
        });
        // POST add to joined group
        await userData.find({_id: req.body.id}).update({
            $push:{
                group_joined: req.body.groupid
            }
        })

        res.send({
            status: true,
            msg: "User added"
        });
    }
    catch(err){
        console.log(err);
    }
});


// [.] Invite request to both group model and user model
router.patch("/invite", async(req, res) => {
    try{

        await group.find({_id: req.body.groupid}).update({
            $push:{
                invites: req.body.id
            }
        });

        await userData.find({_id: req.body.id}).update({
            $push:{
                invite_requests: req.body.groupid
            }
        });

        res.send({
            status: true,
            msg: "Invite Sent!"
        })
    }
    catch(err){
        console.log(err);
    }
});


// [.] Accept request
router.patch("/acceptinvite", async (req, res) => {
    try{

        // console.log(typeof(req.body.groupid));
        // let ok = await group.find({_id: req.body.groupid}, "invites");
        // console.log(typeof(ok[0].invites), ok[0].invites);

        // GROUP JOINNED

        await userData.find({_id: req.body.id}).update({
            $push:{
                group_joined: req.body.groupid
            }
        });

        await group.find({_id: req.body.groupid}).update({
            $push:{
                members: req.body.id
            }
        });


        // GROUP INVITE DELETED

        await group.find({_id: req.body.groupid}).update({
            $pull:{
                invites: req.body.id
            }
        });

        await userData.find({_id: req.body.id}).update({
            $pull:{
                invite_requests: req.body.groupid
            }
        });

        res.send({
            status: true,
            msg: "Invitatuion accepted"
        })

    }
    catch(err){
        console.log(err);
    }
});


// ADD member to group
// router.post("addmember", async(req, res) => {
//     try{
//         await Group.find({_id: req.body.groupid}).update({
//             $push:{
//                 members: req.body.id
//             }
//         });
//     }
//     catch(err){
//         console.log(err);
//     }
// });


module.exports = router;


// /:groupid/inviterequest/:id"

// GET ALL CHAT POST AFTER OPENING

// router.get("/:id", async(req, res) =>{
//     try{
//         // res.send(req.params.id);
//         const allChat = await Group.find({_id: req.params.id}).populate('group_chat').sort({createdAt:-1}).exec();

//         console.log(allChat);
//         res.send(allChat);
//     }
//     catch(err){
//         console.log(err);
//     }
// });



// let ownExists = await userData.find({'_id':req.body.ownerID}).find({'groupOwns':{$in: req.params.id}}).exec();
        // console.log(ownExists);
        // res.send("ok");
        // await Group.find({id:req.params.id}).update({
        //     $push:{
        //         invites:req.params.memberID
        //     }
        // });