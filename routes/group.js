const router = require("express").Router();
const mongoose = require("mongoose");
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
            members: req.body.group_owner
        });
        console.log(req.body,"09");
        await groupInfo.save(async (err, savedGroup) => {
            if(err){
                res.json({status: false, message: err.keyValue})
            }   else{
                console.log(savedGroup);
                console.log("in back else");
                // [.] group own command added to add owns in user db.
                // [.] groups owner id to push to owns and joined
                await userData.find({_id: req.body.group_owner}).updateOne({
                    $addToSet:{
                        groupOwns: savedGroup._id,
                        group_joined: savedGroup._id
                    }
                });

                // [.] pushes group joined to user added initially to the group
                // req.body.members.map(async(memberid)=>{
                //     await userData.find({_id:memberid}).update({
                //         $push:{
                //             group_joined: savedGroup._id
                //         }
                //     });
                // });

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
router.post("/joined", async(req, res) => {
    try{
        const joinedgroups = await userData.find({_id: req.body.id}, "group_joined").populate('group_joined',{_id:1});
        let arrId = [];
        joinedgroups[0].group_joined.map((element) => {
          arrId.push(element._id);
        });
        console.log(arrId);
        res.send(arrId);
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
        // console.log(alreadyjoined);


        // POST add to member in group (worked)
        await group.find({_id: req.body.groupid}).update({
            $set:{
                members: req.body.userData
            }
        });

        
        // Removes groupID from group_joined where req userData user id not present
        const ok = await userData.find({},"_id").where({group_joined:req.body.groupid})
        .then( res1 => res1.map(function(item){
            return item._id.toString().replace(/ObjectId\("(.*)"\)/, "$1");
        }))
        .then(res2 => res2.filter((item)=>{
            return !req.body.userData.includes(item);
        }))
        .then(res3 => {
            return userData.find({'_id':{ $in: res3}}).where({'group_joined':req.body.groupid})
            .updateMany({_id:{ $in: res3}},
                {
                    $pull:{
                        group_joined: mongoose.Types.ObjectId(req.body.groupid)
                    }
                }
            );
        });

        // const exist = await userData.find({'_id':{ $in: req.body.userData}}).where('group_joined').ne(req.body.groupid)
        // .updateMany({_id:{ $in: req.body.userData}},
        //     {
        //         $pull:{
        //             group_joined: mongoose.Types.ObjectId(req.body.groupid)
        //         }
        //     }
        // );


        // Update only id have not already joined
        const exist = await userData.find({'_id':{ $in: req.body.userData}}).where('group_joined').ne(req.body.groupid)
        .updateMany({_id:{ $in: req.body.userData}},
            {
                $push:{
                    group_joined: mongoose.Types.ObjectId(req.body.groupid)
                }
            }
        );

        // this fuckin query doesnt make sense as we have to pass whole data
        

    //     const exist = await userData.find({'_id':{ $in: req.body.userData},
    //         'groupid': {$in: req.body.groupid} 

    // });
        // console.log(exist,"106");   
        
        // POST add to joined group (worked)
        console.log(typeof(req.body.userData))
        // await userData.updateMany({_id:{ $in: req.body.userData}},
        //     {
        //         $set:{
        //             group_joined: mongoose.Types.ObjectId(req.body.groupid)
        //         }
        //     }
        // );

        res.send({
            status: true,
            ok,
            exist,
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