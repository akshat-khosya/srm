const router = require("express").Router();
const Event = require("../models/event");
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


module.exports = router;