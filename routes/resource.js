const router = require("express").Router();
const newcount = require("../models/newcount");
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

router.post("/readresource",async(req,res)=>{
  const totalevent = await Resource.find({},"_id")
  .then(res1 => 
    res1.map(function(el){
      return el._id.toString().replace(/ObjectId\("(.*)"\)/, "$1");
    })
  );
  // console.log(totalevent);
  const new_event = await newcount.find({"user_id":req.body.userid},"currentResource");
  const difference = totalevent.filter(x => !new_event[0].currentResource.includes(x));

  if(difference.length > 0){
    await newcount.updateOne({"user_id":req.body.userid},{
      $set:{
        currentResource: totalevent
      }
    })
  }

  res.send({
    "status":true
  })

})

module.exports = router;