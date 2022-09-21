const router = require("express").Router();
const User = require("../models/User");
const Book = require("../models/Book");

//CREATE Book
router.post("/", async (req, res) => {
  const newBook = new Book(req.body);
  try {
    const savedBook = await newBook.save();
    res.status(200).json(savedBook);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE Book
router.put("/:id", async (req, res) => {
  try {
    const Book = await Book.findById(req.params.id);
    if (Book.username === req.body.username) {
      try {
        const updatedBook = await Book.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedBook);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your Book!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE Book
router.delete("/:id", async (req, res) => {
  try {
    const Book = await Book.findById(req.params.id);
    if (Book.username === req.body.username) {
      try {
        await Book.delete();
        res.status(200).json("Book has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your Book!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Book
router.get("/:id", async (req, res) => {
  try {
    const Book = await Book.findById(req.params.id);
    res.status(200).json(Book);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL BookS
router.get("/", async (req, res) => {
  const username = req.query.user;
  //const catName = req.query.cat;
  console.log('inside GetBooks Route');
  try {
    let Books;
    if (username) {
      Books = await Book.find({ username });
    } else {
      Books = await Book.find();
    }
    res.status(200).json(Books);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;