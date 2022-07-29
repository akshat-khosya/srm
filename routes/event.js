const router = require("express").Router();
const Event = require("../models/event");
const newcount = require("../models/newcount");
router.post("/", async (req, res) => {
   try {
       const newEvent=new Event(req.body);
       const savedEvent=await newEvent.save();
       res.send({status:true,message:"Event added Sucessfully"});
   } catch (err) {
       console.log(err);
   }
  });
  router.patch("/", async (req, res) => {
      const {id,...others}=req.body;
     
    try {
        Event.updateOne(
            {_id: req.body.id},
            {$set:others},
            
            function(err){
                if(!err){
                    res.send({status:true,message:"Event updated Sucessfully"});
                }
                else{
                    console.log(err);
                    res.send(err);
                }
            }
        );
    } catch (err) {
        console.log(err);
    }
   });

  router.get("/", async (req, res) => {
    try {
      const events=await Event.find().sort({createdAt:-1});
     
      res.send(events);
    } catch (err) {
      console.log(err);
    }
  });
  router.delete("/", async(req,res)=>{
    console.log(req.body.id);
    try {
      Event.findByIdAndDelete({_id:req.body.id},(err)=>{
        if(err){
          res.send({status:false,error:err});
        }else{
          res.send({status:true,message:"Event deleted sucessfully"});
        }
      });
      
    } catch (err) {
      console.log(err);
    }
  })

  router.post("/readevent",async(req,res)=>{
    const totalevent = await Event.find({},"_id")
    .then(res1 => 
      res1.map(function(el){
        return el._id.toString().replace(/ObjectId\("(.*)"\)/, "$1");
      })
    );
    // console.log(totalevent);
    const new_event = await newcount.find({"user_id":req.body.userid},"currentEvent");
    const difference = totalevent.filter(x => !new_event[0].currentEvent.includes(x));

    if(difference.length > 0){
      await newcount.updateOne({"user_id":req.body.userid},{
        $set:{
          currentEvent: totalevent
        }
      })
    }

    res.send({
      "status":true
    })

  })

module.exports = router;