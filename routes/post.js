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
      let sendData=[];
      posts.forEach((element)=>{
        sendData=[...sendData,element._id]
      });
      
      res.send(sendData);
    } catch (err) {
      console.log(err);
    }
  });
router.post("/singlepost",async(req,res)=>{
 
  try {
    const post=await Post.findById(req.body.id);
    console.log(post);
    res.send(post);
  } catch (err) {
    console.log(err);
  }
})
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

router.patch("/like", async(req,res)=>{
   Post.updateOne({_id:req.body.id},
    {
      $addToSet:{likes:req.body.userEmail}

    },
    (err,result)=>{
      if(err){
        console.log(err);
        res.send({status:false});
      }else{
        console.log(result);
        res.send({status:true});
      }
    }
    )
});

router.patch("/unlike", async(req,res)=>{
   Post.updateOne(
    {
      _id:req.body.id
    },
    {
      $pull:{likes:req.body.userEmail}
    },
    (err,result)=>{
      if(err){
        console.log(err);
        res.send({status:false});
      }else{
        console.log(result);
        res.send({status:true});
      }
    }
  )
});
router.patch("/comments", async(req,res)=>{
  console.log(req.body.userComment);
  Post.updateOne({_id:req.body.id},
   {
     $push:{comments:req.body.userComment}

   },
   (err,result)=>{
     if(err){
       console.log(err);
       res.send({status:false});
     }else{
       console.log(result);
       res.send({status:true,res:result});
     }
   }
   )
});
router.patch("/uncomments", async(req,res)=>{
  
  Post.updateOne(
   {
     _id:req.body.id
   },
   {
     $pull:{comments:req.body.userComment}
   },
   (err,result)=>{
     if(err){
       console.log(err);
       res.send({status:false});
     }else{
       console.log(result);
       res.send({status:true});
     }
   }
 )
});
module.exports = router;
