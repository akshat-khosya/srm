const router = require("express").Router();
const Resource = require("../models/resource");
router.post("/", async (req, res) => {
    try {
        
      const newPost=new Resource(req.body);
      const savedPost = await newPost.save();
      res.send({status:true,message:"Succesfully"});
    } catch (err) {
      console.log(err);
    }
  });

  router.get("/", async (req, res) => {
    try {
      const posts=await Resource.find().sort({createdAt:-1});
     
      res.send(posts);
    } catch (err) {
      console.log(err);
    }
  });

router.delete("/", async(req,res)=>{
  console.log(req.body.id);
  try {
    Resource.findByIdAndDelete({_id:req.body.id},(err)=>{
      if(err){
        res.send({status:false,error:err});
      }else{
        res.send({status:true,message:"Resource deleted sucessfully"});
      }
    });
    
  } catch (err) {
    console.log(err);
  }
})
module.exports = router;