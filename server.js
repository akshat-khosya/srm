const express = require("express");
const cors = require("cors");

const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const multer = require("multer");
const path = require("path");
const authRoute = require("./routes/authUser");
const post = require("./routes/post");

dotenv.config();
app.use(express.json());
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "/images")));
mongoose.connect(
	process.env.MONGO_URL,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	function (err) {
		if (err) {
			console.log(err);
		} else {
			console.log("Connected");
		}
	}
);
//   mongoose.connect('mongodb://localhost:27017/srm',{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
//   () => {
//     console.log('Connected to MongoDB');
//   });
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "images");
	},
	filename: (req, file, cb) => {
		cb(null, req.body.name);
	},
});
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
	res.status(200).json("File has been uploaded");
});
app.use("/api/auth/", authRoute);
app.use("/api/post/", post);
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "build")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "build", "index.html"));
	});
}
const PORT = 4000 || process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server started at port ${PORT}`);
});
