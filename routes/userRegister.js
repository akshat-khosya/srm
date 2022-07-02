const router = require("express").Router();
const UserData = require("../models/userData");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const userData = require("../models/userData");
const read = require("../models/readunread");
const newcount = require("../models/newcount");

// Get all users
router.get("/allusers", async (req, res) => {
  try{
    let all_users = await userData.find({},"_id name username photo group_joined");
    res.send(all_users);
  }
  catch(err){
    console.log(err);
  }
});

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
      await newUser.save(async (err, savedUser) => {
        if (err) {
          res.json({ status: false, message: "err", err: err.keyValue });
        } else {
          console.log(savedUser);
          const { password, ...others } = await savedUser._doc;
          console.log(others);
          const token = jwt.sign(savedUser.email, process.env.JWT_SECRET);
          const readinfo = await read({
            user_id: savedUser._id,
            read:[]
          })

          const readnotification = await newcount({
            user_id: savedUser._id
          })

          await readinfo.save();
          await readnotification.save();
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
    const user = await UserData.findOne(
      
      { $or: [{ email: req.body.auth }, { username: req.body.auth }] }
    );
    if (user) {
      const validate = await bcrypt.compare(req.body.password, user.password);
      if (validate) {
        if (user.verifcation === true) {
          if (user.verifyStatus === true) {
            const token = jwt.sign(user.email, process.env.JWT_SECRET);
            const { password, ...others } = user._doc;
            res.send({
              status: true,
              message: "Succesfully Login",
              user: others,
              token: token,
            });
          } else {
            res.send({
              status: false,
              message: "Wait for verifaction by admin",
            });
          }
        } else {
          const token = jwt.sign(user.email, process.env.JWT_SECRET);
          const { password, ...others } = user._doc;
          res.send({
            status: true,
            message: "Succesfully Login",
            user: others,
            token: token,
          });
        }
      } else {
        res.send({ status: false, message: "Incorrect Credintials" });
      }
    }
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

    await UserData.updateOne(
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
            console.log(founduser);
            console.log("100");
            // if (founduser.verifcation === true) {
            //   if (founduser.verifyStatus === true) {
            //     console.log("verified");
            //     const { password, ...others } = founduser._doc;
            //     res.json({ auth: true, user: others });
            //   } else {
            //     console.log("not verifiedd")
            //     res.json({
            //       status: false,
            //       message: "Wait for verifaction by admin",
            //     });
            //   }
            // } else {
            //   const { password, ...others } = founduser._doc;
            //   res.json({ auth: true, user: others });
            // }
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
        res.send({ password: req.body.password, status: true });
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
        res.send({ status: false });
      } else {
        console.log(result);
        res.send({ status: true });
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
        res.send({ status: false });
      } else {
        console.log(result);
        res.send({ status: true });
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
      if (element.email !== req.body.email) {
        sendData = [
          ...sendData,
          {
            name: element.name,
            username: element.username,
            email: element.email,
            role: element.desgination,
            connected: User.following.includes(element.email),
          },
        ];
        console.log(sendData);
      }
    });

    res.status(200).json(sendData);
  } catch (err) {
    res.status(500).json({ message: "error" });
  }
});
router.get("/count", async (req, res) => {
  const count = await UserData.find({}).count();
  console.log(count);
  res.send({ count: count });
});

router.post("/search", async (req, res) => {
  const User = await UserData.findOne({ email: req.body.email });
  let search = await UserData.find({
    $or: [
      { name: { $regex: new RegExp("^" + req.body.text + ".*", "i") } },
      { username: { $regex: new RegExp("^" + req.body.text + ".*", "i") } },
    ],
  }).exec();
  let sendData = [];
  if (search.length === 0) {
    res.send({ status: false });
  } else {
    search.forEach((element) => {
      if (element.email !== req.body.email) {
        sendData = [
          ...sendData,
          {
            name: element.name,
            username: element.username,
            email: element.email,
            role: element.desgination,
            connected: User.following.includes(element.email),
          },
        ];
      }
    });
    res.send({ status: true, array: sendData });
  }
});
router.get("/userstatus", async(req,res)=>{
	try {
		const users=await UserData.find({}).sort({ name: 1 });
		let allUser=[];
		users.forEach((element)=>{
			if(element.email==="admin@srm.com"){

			}else{
				allUser=[...allUser, {
					email:element.email,
					name:element.name,
					status:element.verifyStatus
				}];
			}
		})
		res.send({users:allUser});
	} catch (err) {
		console.log(err);
	}
})
router.post("/verifystatus",async(req,res)=>{
	try {
		console.log(req.body);
		await userData.findOneAndUpdate({email:req.body.email},{verifyStatus:req.body.status});
		res.send({status: true})
	} catch (err) {
		console.log(err);
	}
});
router.post("/adminprofile",async(req,res)=>{
	try {
		const result=await userData.findOne({email:req.body.email});
		res.send({status: true, profile:result})
	} catch (err) {
		console.log(err);
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
