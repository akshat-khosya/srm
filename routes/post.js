const router = require("express").Router();
const Post = require("../models/post");
router.post("/", async (req, res) => {
    try {
        
      const newPost=new Post(req.body);
      const savedPost = await newPost.save();
      res.send("Succesfully");
    } catch (err) {
      console.log(err);
    }
  });

  router.get("/", async (req, res) => {
    try {
      const posts=await Post.find().sort({createdAt:-1});
     
      res.send(posts);
    } catch (err) {
      console.log(err);
    }
  });

router.delete("/", async(req,res)=>{
  console.log(req.body.id);
  try {
    Post.findByIdAndDelete({_id:req.body.id},(err)=>{
      if(err){
        res.send({status:false,error:err});
      }else{
        res.send({status:true,message:"Post deleted sucessfully"});
      }
    });
    
  } catch (err) {
    console.log(err);
  }
})
module.exports = router;