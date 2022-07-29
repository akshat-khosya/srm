const router = require("express").Router();
const Mentoring = require("../models/mentoring");
const newcount = require("../models/newcount");
router.post("/", async (req, res) => {
  
   try {
      
       const newEvent=new Mentoring(req.body);
       const savedEvent=await newEvent.save();
       res.send({status:true,message:"Form added Sucessfully"});
   } catch (err) {
       console.log(err);
   }
  });
  router.patch("/", async (req, res) => {
      const {id,...others}=req.body;
     
    try {
        Mentoring.updateOne(
            {_id: req.body.id},
            {$set:others},
            
            function(err){
                if(!err){
                    res.send({status:true,message:"Form updated Sucessfully"});
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
      const events=await Mentoring.find({}).sort({createdAt:-1});
      console.log(events);
     
      res.send(events);
    } catch (err) {
      console.log(err);
    }
  });
  router.delete("/", async(req,res)=>{
    console.log(req.body.id);
    try {
      Mentoring.findByIdAndDelete({_id:req.body.id},(err)=>{
        if(err){
          res.send({status:false,error:err});
        }else{
          res.send({status:true,message:"Deleted sucessfully"});
        }
      });
      
    } catch (err) {
      console.log(err);
    }
  })

  


  router.post("/readmentoring",async(req,res)=>{
    const totalevent = await Mentoring.find({},"_id")
    .then(res1 => 
      res1.map(function(el){
        return el._id.toString().replace(/ObjectId\("(.*)"\)/, "$1");
      })
    );
    // console.log(totalevent);
    const new_event = await newcount.find({"user_id":req.body.userid},"currentMentorRead");
    const difference = totalevent.filter(x => !new_event[0].currentMentorRead.includes(x));

    if(difference.length > 0){
      await newcount.updateOne({"user_id":req.body.userid},{
        $set:{
          currentMentorRead: totalevent
        }
      })
    }

    res.send({
      "status":true
    })

  })

module.exports = router;