const router = require("express").Router();
const mongoose = require("mongoose");
const Group = require("../models/group");
const userData = require("../models/userData");
const read = require("../models/readunread");


// joined_read={groups?.joined_read[0]?.read?.find(o=>o.group_id === group._id)}
// 									total_real={groups?.total_real?.find(o=>o._id === group._id)}

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

                // const allChat = await Group.find({_id: req.body.groupid},"group_chat");

                const update_msg = {
                    group_id:mongoose.Types.ObjectId(savedGroup._id),
                    msg_read:savedGroup.group_chat.length
                }

                // WHEN MEMBER ADDED TO GROUP CALLED THIS FUNCTION TO ADD OBJECT FOR READ MSG
                await read.find({'user_id':{ $in: req.body.group_owner}}).where('read.group_id').ne(savedGroup._id)
                .updateMany({user_id:{ $in: req.body.group_owner}},
                    {
                        $push:{
                            "read":update_msg
                        }
                    }
                );

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

router.post("/getallnoti", async(req, res)=>{
    const allchatread = await read.find({"user_id":req.body.userid});
        // console.log(allchatread);

        const totalunread = await Group.find({},"group_chat")
        .then(async (res)=>{ 
            return await Promise.all(res.map(async (el)=>{
                const obj = await allchatread[0].read.find(o => o.group_id.toString().replace(/ObjectId\("(.*)"\)/, "$1") === el._id.toString().replace(/ObjectId\("(.*)"\)/, "$1"));
                console.log(obj);
                return {
                    "group_id":el._id,
                    "newarray":el.group_chat.filter( x => !obj?.totalchat?.includes(x)).length
                }
                // newchatobj.newarray =
                // await el.group_chat.filter( x => !obj.totalchat.includes(x)).length

                // console.log(newchatobj,"118");

                // return newchatobj;

            }))}
        )

        res.send({
            totalunread
        })
})

// [.] GET all public groups
router.post("/publicgroups", async(req, res) => {
    try{
        const allpublic = await Group.find({group_status: 'public'}, "_id group_name group_description group_tags group_image members group_owner");
        // const allpublic_ids = await Group.aggregate([
        //         {
        //           "$project": {
        //             "totalrealChat": {
        //               "$size": "$group_chat"
        //             }
        //           }
        //         }
        //       ]);
        

        // const ok = await read.find({user_id:req.body.userid},"read.group_id read.msg_read")

        const allchatread = await read.find({"user_id":req.body.userid});
        // console.log(allchatread);

        const totalunread = await Group.find({},"group_chat")
        .then(async (res)=>{ 
            return await Promise.all(res.map(async (el)=>{
                const obj = await allchatread[0].read.find(o => o.group_id.toString().replace(/ObjectId\("(.*)"\)/, "$1") === el._id.toString().replace(/ObjectId\("(.*)"\)/, "$1"));
                console.log(obj);
                return {
                    "group_id":el._id,
                    "newarray":el.group_chat.filter( x => !obj?.totalchat?.includes(x)).length
                }
                // newchatobj.newarray =
                // await el.group_chat.filter( x => !obj.totalchat.includes(x)).length

                // console.log(newchatobj,"118");

                // return newchatobj;

            }))}
        )
        console.log(totalunread,"plpl");

        res.send({
            allpublic,
            totalunread
        });
    }
    catch(err){
        console.log(err,'/n',"error occured in publicgroups");
    }
})


// [.] GET all joined groups
router.post("/joined", async(req, res) => {
    try{
        const joinedgroups = await userData.find({_id: req.body.userid}, "group_joined").populate('group_joined',{_id:1})
        .then(res1 => res1[0].group_joined.map((element) => {
            return element._id;
        }))
        // .then(res2 => {
        //     return Group.find({"_id":{$in:{res2}}},"group_chat")
        // });
        // let arrId = [];
        // joinedgroups[0].group_joined.map((element) => {
        //   arrId.push(element._id);
        // });
        // console.log(arrId);
        res.send(joinedgroups);
    }
    catch(err){
        console.log(err);
    }
})

router.post("/singlejoin", async(req, res)=>{
    await userData.find({'_id':{ $in: req.body.id}}).where('group_joined').ne(req.body.groupid)
        .updateMany({_id:{ $in: req.body.id}},
            {
                $push:{
                    group_joined: mongoose.Types.ObjectId(req.body.groupid)
                }
            }
        );

        await Group.find({_id: req.body.groupid}).update({
            $push:{
                members: req.body.id
            }
        });

        const totalupdate = await Group.find({_id:req.body.groupid},"group_chat");
        
        const update_msg = {
            group_id:mongoose.Types.ObjectId(req.body.groupid),
            totalchat:totalupdate[0].group_chat
        }
        await read.find({'user_id':{ $in: req.body.id}}).where('read.group_id').ne(req.body.groupid)
        .updateOne({"user_id":{ $in: req.body.id}},
            {
                $push:{
                    "read":update_msg
                }
            }
        )
    
        res.send({
            "status":true,
            "msg":"Added!"
        })
})


// [.] POST join public group
router.post("/addmember", async(req, res) => {
    try{
        // CHECK COMMAND -=-=-=-=-=-=-=-=-=-
        // let alreadyjoined = await group.find({members: req.body.id});
        // console.log(alreadyjoined);


        // POST add to member in group (worked)
        await Group.find({_id: req.body.groupid}).update({
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

        // Remove that user from group which is not included in add member array
        await read.find({},"user_id").where('read').where({'group_id':req.body.groupid})
        .then( res1 => res1.map(function(item){
            return item.user_id.toString().replace(/ObjectId\("(.*)"\)/, "$1");
        }))// returns user having group_id
        .then(res2 => res2.filter((item)=>{
            console.log(!req.body.userData.includes(item));
            return !req.body.userData.includes(item);
        })) // returns user not selected by owner while updating members of group
        .then(res3 => {
            return read.find({'user_id':{ $in: res3}}).where({'read.group_id':req.body.groupid})
            .updateMany({user_id:{ $in: res3}},
                {
                    "$pull": {
                        "read":{
                            group_id:mongoose.Types.ObjectId(req.body.groupid)
                        }
                    }
                },
                { safe: true, multi:true }
            );
        });

        // NO. OF TOTAL MSG WHILE ADDING MEMBER TO GROUP
        // const allChat = await Group.find({_id: req.body.groupid},"group_chat");

        // const update_msg = {
        //     group_id:mongoose.Types.ObjectId(req.body.groupid),
        //     msg_read:allChat[0].group_chat.length
        // }

        // // WHEN MEMBER ADDED TO GROUP CALLED THIS FUNCTION TO ADD OBJECT FOR READ MSG
        // await read.find({'user_id':{ $in: req.body.userData}}).where('read.group_id').ne(req.body.groupid)
        // .updateMany({user_id:{ $in: req.body.userData}},
            // {
            //     $push:{
            //         "read":update_msg
            //     }
            // }
        // );

        const totalupdate = await Group.find({_id:req.body.groupid},"group_chat");
        
        const update_msg = {
            group_id:mongoose.Types.ObjectId(req.body.groupid),
            totalchat:totalupdate[0].group_chat
        }
        await read.find({'user_id':{ $in: req.body.userData}}).where('read.group_id').ne(req.body.groupid)
        .updateOne({"user_id":{ $in: req.body.userData}},
            {
                $push:{
                    "read":update_msg
                }
            }
        )

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

router.post("/readmsg", async(req,res) =>{

    // .updateMany({user_id:{ $in: res3}},{'read.group_id':req.body.groupid},
    //                 {$pull:{
    //                     'read.$[outer].group_id': mongoose.Types.ObjectId(req.body.groupid)
    //                 }},
    //                 { 
    //                     "arrayFilters": [{ "outer.group_id": req.body.groupid }]
    //                 }
    //         );

    // currentMentorRead: 
    //         [{type: String}],

    try{

        // post request on each chat

        // const allChat = await Group.find({_id: req.body.groupid},"group_chat");

        
        // await read.updateOne({"user_id":req.body.userid,"read.group_id":req.body.groupid},
        // {$set : {"read.$.msg_read" : allChat[0].group_chat.length}})


// ----------------------------------------------------------------------------------------------------------------------
        // const allchatread = await read.find({"user_id":req.body.userid});
        // // console.log(allchatread);

        // const totalevent = await Group.find({_id:{$in:req.body.groupid}},"group_chat")
        // .then((res)=>{
        //     return res.map((el)=>{
        //         // const obj = allchatread[0].read.find(o => o.group_id.toString().replace(/ObjectId\("(.*)"\)/, "$1") == el._id.toString().replace(/ObjectId\("(.*)"\)/, "$1"));
        //         // return obj;
        //         const newchatobj = {
        //             "group_id":el._id,
        //             "newarray":[]
        //         }
        //         newchatobj.newarray =
        //         el.group_chat.filter(x => {
        //             const obj = allchatread[0].read.find(o => o.group_id.toString().replace(/ObjectId\("(.*)"\)/, "$1") == el._id.toString().replace(/ObjectId\("(.*)"\)/, "$1"));
        //             return !obj.totalchat.includes(x);
        //         })

        //         console.log(newchatobj);

        //         return newchatobj;

        //     })
        // })
        // console.log(totalevent);

        const allchatread = await read.find({"user_id":req.body.userid});
        
        const totalevent = await Group.find({_id:req.body.groupid},"group_chat")
        .then((res)=>{
            return Promise.all(res.map((el)=>{

                return el.group_chat.filter(x => {
                    const obj = allchatread[0].read.find(o => o.group_id.toString().replace(/ObjectId\("(.*)"\)/, "$1") === el._id.toString().replace(/ObjectId\("(.*)"\)/, "$1"));
                    return !obj?.totalchat?.includes(x);
                })

            }))
        })
        console.log(totalevent[0].length);

        const totalupdate = await Group.find({_id:req.body.groupid},"group_chat");
        
        if(totalevent[0].length>0){
            await read.updateOne({"user_id":req.body.userid,"read.group_id":req.body.groupid},
                {
                    $set : {"read.$.totalchat" : totalupdate[0].group_chat}
                }
            )
        }

        res.send({
            "allRead":true,
            "ok":totalevent,
            "ok2":allchatread
        });
}
    catch(err){
        console.log(err);
    }
});

router.get("/alreadyread", async (req,res) => {

    const allChat = await Group.find({_id: req.body.groupid},"group_chat");

    const ok = await read.find({user_id:req.body.userid})
    .where({"read.group_id":req.body.groupid})
    // .select({ read: {$elemMatch: {group_id: req.body.groupid}}});
    // const ok = await read.find({'user_id':{ $in: req.body.userid}}).where({'read.group_id':req.body.groupid})
    // console.log(ok[0].read[0].msg_read);
    console.log(ok)
    res.send({
        "tillmsg":ok[0].read[0].msg_read,
        "livemsg":allChat[0].group_chat.length,
        "unreadmsg":allChat[0].group_chat.length-ok[0].read[0].msg_read,
        ok
    })
})


// [.] Invite request to both group model and user model
router.patch("/invite", async(req, res) => {
    try{

        await Group.find({_id: req.body.groupid}).update({
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

        await Group.find({_id: req.body.groupid}).update({
            $push:{
                members: req.body.id
            }
        });


        // GROUP INVITE DELETED

        await Group.find({_id: req.body.groupid}).update({
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