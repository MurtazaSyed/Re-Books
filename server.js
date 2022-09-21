const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser=require('body-parser');
//const authRoute = require("./routes/userauth");
const userRoute = require("./routes/users");
const bookRoute = require("./routes/books");
//const categoryRoute = require("./routes/categories");
var passport = require('passport');
//var authenticate = require('./authenticate');
const multer = require("multer");
const path = require("path");

dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

app.use(function(req, res, next) {

  res.header("Access-Control-Allow-Origin", "*");

  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  next();

});

// Bodyparser Middleware
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGOURL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  })
  .then(console.log("Connection Established with MongoDB"))
  .catch((err) => console.log(err));

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

app.get("/", (req, res) => {
    res.status(200).json("BookMANIA API IS RUNNING");
  });


  app.use(passport.initialize());
  
//app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/books", bookRoute);
//app.use("/api/categories", categoryRoute);

app.listen("8000", () => {
  console.log("API is Running at 8000");
});