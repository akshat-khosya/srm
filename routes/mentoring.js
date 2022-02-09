const router = require("express").Router();
const Mentoring = require("../models/mentoring");
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


module.exports = router;