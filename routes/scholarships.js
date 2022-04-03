const router = require("express").Router();
const Scholar = require("../models/scholarships");
router.post("/", async (req, res) => {
    try {
        
      const newPost=new Scholar(req.body);
      const savedPost = await newPost.save();
      res.send({status:true,message:"Succesfully"});
    } catch (err) {
      console.log(err);
    }
  });

  router.get("/", async (req, res) => {
    try {
      const posts=await Scholar.find().sort({createdAt:-1});
     
      res.send(posts);
    } catch (err) {
      console.log(err);
    }
  });

router.delete("/", async(req,res)=>{
  console.log(req.body.id);
  try {
    Scholar.findByIdAndDelete({_id:req.body.id},(err)=>{
      if(err){
        res.send({status:false,error:err});
      }else{
        res.send({status:true,message:"Scholarship deleted sucessfully"});
      }
    });
    
  } catch (err) {
    console.log(err);
  }
})
module.exports = router;