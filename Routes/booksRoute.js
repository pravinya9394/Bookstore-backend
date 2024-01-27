const express=require('express');
const router=express.Router();
const Book=require('../Models/bookModel.js')

  router.post("/", async (req, res) => {
    try {
      if (!req.body.title || !req.body.author || !req.body.publishYear) {
        return res
          .status(400)
          .send({ message: "Pass all the values title,author and publishYear" });
      }
      const newBook = {
        title: req.body.title,
        author: req.body.author,
        publishYear: req.body.publishYear,
      };
      const book = await Book.create(newBook);
  
      return res.status(201).send(book);
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: err.message });
    }
  });
  
  router.get("/", async (req, res) => {
    try {
      const book = await Book.find({});
      return res.status(201).send({
        count: book.length,
        bookObj: book,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: err.message });
    }
  });
  
  router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const book = await Book.findById(id);
      return res.status(201).send({
        book,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: err.message });
    }
  });
  
  router.put("/:id", async (req, res) => {
    try {
      if (!req.body.title || !req.body.author || !req.body.publishYear) {
        return res
          .status(400)
          .send({ message: "Pass all the values title,author and publishYear" });
      }
      const { id } = req.params;
  
      const result = await Book.findByIdAndUpdate(id, req.body);
      // const updatedBook=Book.save(result);
      if (!result) {
        return res.status(400).send({ message: "Book not found" });
      }
      return res.status(201).send({ message: "Book updated successfully" });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: err.message });
    }
  });
  
  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      const result = await Book.findByIdAndDelete(id, req.body);
      // const updatedBook=Book.save(result);
      if (!result) {
        return res.status(400).send({ message: "Book not found" });
      }
      return res.status(201).send({ message: "Book deleted successfully" });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: err.message });
    }
  });
module.exports = router;