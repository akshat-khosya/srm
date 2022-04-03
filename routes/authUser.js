const router = require("express").Router();
const Auth = require("../models/auth");
const User = require("../models/user");
const UserData = require("../models/userData");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
// Login with mail
router.post("/email", async (req, res) => {
  try {
    console.log(req.body);
    const user = await Auth.findOne({ email: req.body.email });
    console.log(user);
    if (user) {
      const vaSlidate = await bcrypt.compare(req.body.password, user.password);
      console.log(validate);
      if (validate) {
        const token = jwt.sign(user._id.toString(), process.env.JWT_SECRET);
        res.send({
          status: "true",
          messgae: "Succesfully Login",
          ...user._doc,
          token: token,
        });
      } else {
        res.send({ status: "false", messgae: "Incorrect Credintials" });
      }
    } else {
      const salt = await bcrypt.genSalt(10);

      const hasedPass = await bcrypt.hash(req.body.password, salt);

      const newUser = new Auth({
        email: req.body.email,
        password: hasedPass,
      });

      const regUser = await newUser.save();
      console.log(regUser.email);
      const token = jwt.sign(regUser._id.toString(), process.env.JWT_SECRET);
      console.log({ status: true, ...regUser._doc, token: token });
      res.send({ status: true, ...regUser._doc, token: token });
    }
  } catch (err) {
    console.log(err);
  }
});
// Login with Institue
router.post("/phone", async (req, res) => {
  try {
    console.log(req.body);
    const user = await Auth.findOne({ phone: req.body.phone });
    console.log(user);
    if (user) {
      const validate = await bcrypt.compare(req.body.password, user.password);
      if (validate) {
        const token = jwt.sign(user._id.toString(), process.env.JWT_SECRET);
        res.send({
          status: "true",
          messgae: "Succesfully Login",
          ...user._doc,
          token: token,
        });
      } else {
        res.send({ status: "false", messgae: "Incorrect Credintials" });
      }
    } else {
      const salt = await bcrypt.genSalt(10);
      const hasedPass = await bcrypt.hash(req.body.password, salt);
      const newUser = new Auth({
        phone: req.body.phone,
        password: hasedPass,
      });

      const regUser = await newUser.save();
      const token = jwt.sign(regUser._id.toString(), process.env.JWT_SECRET);
      console.log({ status: true, ...regUser._doc });
      res.send({ status: true, ...regUser._doc, token: token });
    }
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
      console.log(user);
      UserData.findOne({ email: user }, (err, foundUser) => {
        if (err) {
          console.log(err);
        } else {
          if (foundUser.verifcation === true) {
            console.log(foundUser.verifcation);
            User.findOne({email:foundUser.email},(err,foundEmail)=>{
              if(!err){
                
              res.json({ auth: true, user: foundEmail });
              }else{
                console.log(err);
              }
            })
          } else {
            const { password, ...others } = foundUser._doc;

            console.log(others._id.toString());
            res.json({ auth: true, user: others });
          }
        }
      });
    }
  });
});

router.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    if (req.body.auth === "email") {
      console.log(req.body.auth);
      try {
        const check = await Auth.findOne({ phone: req.body.phone });
        console.log(check);
        if (check) {
          res.send("Your Number is already taken");
        } else {
          Auth.findOneAndUpdate(
            { email: req.body.email },
            { phone: req.body.phone, verifcation: true },
            (err) => {
              console.log(err);
            }
          );
          console.log("verify");
          const newUser = new User(req.body);
          const regUser = await newUser.save();
          console.log(regUser);
          res.send("Register");
        }
      } catch (err) {
        res.send(err);
      }
    } else {
      console.log(req.body.auth);
      try {
        const check = await Auth.findOne({ email: req.body.email });
        console.log(check);
        if (check) {
          res.send("Your Email is already taken");
        } else {
          Auth.findOneAndUpdate(
            { phone: req.body.phone },
            { email: req.body.email, verifcation: true },
            (err) => {
              console.log(err);
            }
          );
          console.log("verify");
          const newUser = new User(req.body);
          const regUser = await newUser.save();
          console.log(regUser);
          res.send("Register");
        }
      } catch (err) {
        res.send(err);
      }
    }
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
