const router = require("express").Router();
const UserData = require("../models/userData");
const bcrypt = require("bcrypt");
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
      if (user) {
        UserData.findOne({ email: user }, (err, founduser) => {
          if (err) {
            console.log(err);
          } else {
            const { password, ...others } = founduser._doc;
            res.json({ auth: true, user: others });
          }
        });
      }
    }
  });
});
router.post("/reset", async (req, res) => {
  const email = req.body.email;
  const salt = await bcrypt.genSalt(10);

  const hasedPass = await bcrypt.hash(req.body.password, salt);
  UserData.findOneAndUpdate(
    { email: email },
    { password: hasedPass },
    (err, foundUser) => {
      if (err) {
        console.log(err);
      } else {
        res.send(foundUser);
      }
    }
  );
});
router.patch("/connection", (req, res) => {
  // UserData.findOneAndUpdate(
  //   { email: req.body.email },
  //   {
  //     $push: { following: req.body.userEmail },
  //   },
  //   (err, result) => {
  //     if (result) {
  //       console.log(result);
  //       res.send({ satus: true, message: "connection added succesfully" });
  //     } else {
  //       console.log(err);
  //     }
  //   }
  // );
  console.log(req.body);
  UserData.updateOne(
    { email: req.body.email },
    { $addToSet: { following: req.body.userEmail } },
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log(result);
        res.send(result);
      }
    }
  );
});
router.post("/connection", async (req, res) => {
  const email = req.body.email;
  let connectionDetails = [];
  let userData = [];
  const addConnection = async (array) => {
    let data2 = [];
    for (const element of array) {
      const User = await UserData.findOne({ email: element });

      data2 = [
        ...data2,
        {
          email: User.email,
          name: User.name,
          username: User.username,
          role: User.desgination,
        },
      ];
    }
    // await array.forEach(async(element) => {
    //   const User = await UserData.findOne({ email: element });

    //   data2=[...data2,{
    //     name: User.name,
    //     username: User.username,
    //     role: User.desgination,
    //   }];

    // });
    console.log(data2);

    return data2;
  };
  try {
    const foundUser = await UserData.findOne({ email });
    console.log(foundUser);
    connectionDetails = [...foundUser.following];
    console.log(connectionDetails);

    userData = await addConnection(connectionDetails);
    if (userData) {
      res.send({
        status: true,
        message: "connection",
        array: userData,
      });
    } else {
      res.send({
        status: false,
        message: "err",
      });
    }
  } catch (err) {
    console.log(err);
    res.send({
      status: false,
      message: err,
    });
  }
});
router.patch("/unfollow", (req, res) => {
  UserData.updateOne(
    { email: req.body.email },
    { $pull: { following: req.body.userEmail } },
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log(result);
        res.send(result);
      }
    }
  );
});
router.post("/allUser", async (req, res) => {
  const page = +req.body.page;
  const pageSize = +req.body.pageSize;
  let sendData = [];
  try {
    const User = await UserData.findOne({ email: req.body.email });
    const allUser = await UserData.find({})
      .sort({ name: 1 })
      .skip(page * pageSize - pageSize)
      .limit(pageSize);
    allUser.forEach((element) => {
      if(element.email!==req.body.email)
      {sendData = [
        ...sendData,
        {
          name: element.name,
          email: element.email,
          role: element.designtion,
          connected: User.following.includes(element.email),
        },
      ];}
    });

    res.status(200).json(sendData);
  } catch (err) {
    res.status(500).json({message:"error"});
  }
});
module.exports = router;
// foundUser.following.forEach(async(element) => {
//   console.log(element);
//   await UserData.findOne({ email: element }, (error, User) => {
//     if (User) {

//       connectionDetails.push({
//         Name: User.name,
//         Username: User.username,
//         Role: User.desgination,
//       });
//       console.log(connectionDetails);
//     } else {
//       console.log(error);
//     }
//   });
// });
