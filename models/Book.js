const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      required: false,
    },
    imageUrl: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: false
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