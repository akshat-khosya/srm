const router = require("express").Router();
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

module.exports = router;