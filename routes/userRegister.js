const router = require("express").Router();
const UserData = require("../models/userData");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
router.post("/newregister", async (req, res) => {
  try {
    const user = await UserData.findOne({ email: req.body.email });
    if (user) {
      res.json({ status: false, message: "You are already registered" });
    } else {
      const salt = await bcrypt.genSalt(10);

      const hasedPass = await bcrypt.hash(req.body.password, salt);
      const newUser = new UserData({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        username: req.body.username,
        password: hasedPass,
      
        verifcation: false,
      });
      await newUser.save((err, savedUser) => {
        if (err) {
          res.json({ status: false, message: "err", err: err.keyValue });
        } else {
          console.log(savedUser);
          const { password, ...others } = savedUser._doc;
          console.log(others);
          const token = jwt.sign(savedUser.email, process.env.JWT_SECRET);
          res.json({
            status: true,
            message: "registred",
            user: others,
            token: token,
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await UserData.findOne({ email: req.body.auth });
    if (user) {
      const validate = await bcrypt.compare(req.body.password, user.password);
      if (validate) {
        const token = jwt.sign(user.email, process.env.JWT_SECRET);
        const { password, ...others } = user._doc;
        res.send({
          status: true,
          messgae: "Succesfully Login",
          user: others,
          token: token,
        });
      } else {
        res.send({ status: false, message: "Incorrect Credintials" });
      }
    }
  } catch (err) {
    console.log(err);
  }

  function isNum(val) {
    return !isNaN(val);
  }
  if (isNum(req.body.auth)) {
    try {
      const user = await UserData.findOne({ phone: req.body.auth });
      if (user) {
        const validate = await bcrypt.compare(req.body.password, user.password);
        if (validate) {
          const token = jwt.sign(user.email, process.env.JWT_SECRET);
          const { password, ...others } = user._doc;
          res.send({
            status: true,
            messgae: "Succesfully Login",
            user: others,
            token: token,
          });
        } else {
          res.send({ status: false, message: "Incorrect Credintials" });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
  try {
    const user = await UserData.findOne({ username: req.body.auth });
    if (user) {
      const validate = await bcrypt.compare(req.body.password, user.password);
      if (validate) {
        const token = jwt.sign(user.email, process.env.JWT_SECRET);
        const { password, ...others } = user._doc;
        res.send({
          status: "true",
          messgae: "Succesfully Login",
          user: others,
          token: token,
        });
      } else {
        res.send({ status: false, message: "Incorrect Credintials" });
      }
    }
    res.send({ status: false, message: "Not Registered" });
  } catch (err) {
    console.log(err);
  }
});
router.patch("/newregister", async (req, res) => {
  try {
    const { email, ...rest } = req.body;
    await UserData.findOneAndUpdate(
      { email: email },
      {
        verifcation: true,
        $set: req.body,
      },
      (err, foundUser) => {
        if (err) {
          console.log(err);
        } else {
          if (foundUser) {
            const { password, ...others } = foundUser._doc;
            res.send({ status: true, message: "verified", user: others });
          } else {
            res.send({ satus: false, message: "something went go" });
          }
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
});
router.patch("/profile", async (req, res) => {
  try {
    const { email, ...rest } = req.body;
   
    await UserData.findOneAndUpdate(
      { email: email },
      {
        $set: rest,
      },
      (err, foundUser) => {
        if (err) {
          console.log(err);
          res.json({ status: false, message: "err", err: err.keyValue });
        } else {
          if (foundUser) {
           
            res.send({ status: true, message: "verified", user: req.body });
          } else {
            res.json({ status: false, message: "err", err: err.keyValue });
          }
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
});
router.get("/verifytoken", (req, res) => {
  console.log(req.headers.token);
  jwt.verify(req.headers.token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log(err);
    } else {
        if(user){
            UserData.findOne({email:user},(err,founduser)=>{
                if(err){
                    console.log(err);
                }else{
                    const {password,...others}=founduser._doc;
                    res.json({ auth: true, user: others });
                }
            })
        }
      
    }
  });
});
module.exports = router;
