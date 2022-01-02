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
      const posts=await Post.find()
     
      res.send(posts);
    } catch (err) {
      console.log(err);
    }
  });


module.exports = router;