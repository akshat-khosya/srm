const router = require("express").Router();
const newcount = require("../models/newcount");
const Oppo = require("../models/oppo");
router.post("/", async (req, res) => {
   try {
       const newEvent=new Oppo(req.body);
       const savedEvent=await newEvent.save();
       res.send({status:true,message:"OPPO added Sucessfully"});
   } catch (err) {
       console.log(err);
   }
  });
  router.patch("/", async (req, res) => {
      const {id,...others}=req.body;
     
    try {
        Oppo.updateOne(
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
      const events=await Oppo.find({}).sort({createdAt:-1});
     
      res.send(events);
    } catch (err) {
      console.log(err);
    }
  });
  router.delete("/", async(req,res)=>{
    console.log(req.body.id);
    try {
      Oppo.findByIdAndDelete({_id:req.body.id},(err)=>{
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

  router.post("/readopportunity",async(req,res)=>{
    const totalevent = await Oppo.find({},"_id")
    .then(res1 => 
      res1.map(function(el){
        return el._id.toString().replace(/ObjectId\("(.*)"\)/, "$1");
      })
    );
    // console.log(totalevent);
    const new_event = await newcount.find({"user_id":req.body.userid},"currentOpportunity");
    const difference = totalevent.filter(x => !new_event[0].currentOpportunity.includes(x));

    if(difference.length > 0){
      await newcount.updateOne({"user_id":req.body.userid},{
        $set:{
          currentOpportunity: totalevent
        }
      })
    }

    res.send({
      "status":true
    })

  })

module.exports = router;