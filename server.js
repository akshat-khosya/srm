const express = require('express');
const cors = require("cors");

const dotenv=require('dotenv');
const mongoose=require('mongoose');
const app=express();
const multer= require('multer');
const path = require('path');
const authRoute= require("./routes/authUser");
const post=require("./routes/post")
const register= require("./routes/userRegister")
const event=require("./routes/event");
dotenv.config();
app.use(express.json());
app.use(cors({origin:"*"}))
app.use("/images",express.static(path.join(__dirname,"/images")));
mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true, useUnifiedTopology: true }, function(err) {
    if (err){console.log(err)}else{
        console.log("Connected");
    }
});
//   mongoose.connect('mongodb://localhost:27017/srm',{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
//   () => {
//     console.log('Connected to MongoDB');
//   });
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"images");
    },filename:(req,file,cb)=>{
        cb(null,req.body.name);
    }
});
const upload= multer({storage:storage});
app.post("/api/upload", upload.single("file"),(req,res)=>{
    res.status(200).json("File has been uploaded");
});
    app.use("/api/auth/",authRoute);
    app.use("/api/post/",post);
    app.use("/api/",register);
    app.use("/api/event/",event);
// app.use("/api/users",userRoute);
// app.use("/api/posts",postRoute);
// app.use("/api/categories",categoryRoute);
app.use(express.static(path.join(__dirname, "build")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT || "4000",()=>{
    console.log("Server started at port 4000");
})