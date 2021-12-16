const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const postRoute = require("./routes/posts");
const commentRoute = require("./routes/comment");
const postsHoiDap = require("./routes/postsHoiDap");

const router = express.Router();
const path = require("path");
var cors = require('cors')

dotenv.config();

const db = require("./config/db");

// Connect to DB
db.connect();


app.use("/images", express.static(path.join(__dirname, "public/images")));

//middleware
app.use(cors())
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    console.log("req.file.originalname",req.file);
    return res.status(200).json({ url: `http://localhost:8800/images/${req.file.originalname}` });
    
  } catch (error) {
    console.error(error);
  }
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/posts", postRoute);
app.use("/api/postsHoiDap", postsHoiDap);
app.use("/api/comment", commentRoute);
app.use(express.static('public'))

app.listen(8800, () => {
  console.log("Backend server is running!");
});
