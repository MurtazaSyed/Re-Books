const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: true,
    },
    author: {
        type: String,
        required: true,
      },
    pages: {
        type: Number,
        required: false,
      },
    price: {
        type: Number,
        required: true,
      }
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", BookSchema);