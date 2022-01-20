const router = require("express").Router();
const Event = require("../models/event");
router.post("/", async (req, res) => {
   try {
       const newEvent=new Event(req.body);
       const savedEvent=await newEvent.save();
       res.send("Event added Sucessfully");
   } catch (err) {
       console.log(err);
   }
  });

  router.get("/", async (req, res) => {
    try {
      const events=await Event.find()
     
      res.send(events);
    } catch (err) {
      console.log(err);
    }
  });


module.exports = router;