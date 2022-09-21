const mongoose = require("mongoose");
var passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    }
    ,
    admin:   {
      type: Boolean,
      default: false
  }
  },
  
  { timestamps: true }
);
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);