const express = require("express");
const app = express();
const { PORT, MONGOURL } = require("./config");
const mongoose = require("mongoose");
const { Book } = require("./Models/bookModel");
const booksRoute=require('../backend/Routes/booksRoute');
const cors=require('cors');

app.use(express.json());
app.use("/book",booksRoute);

// first way to handle CORS policy=>Allow all origins with default
app.use(cors());
// second way to handle CORS policy=>Allow custom origins
// app.use(cors(
//   {
//     origin:"http://localhost:3000",
//     methods:['GET','POST','PUT','DELETE'],
//     allowHeaders:['Content-Type']
//   }
// ));

app.get("/", (req, res) => {
  // console.log(req);
  return res.status(201).send("Getting on this URl");
});

mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`Listening at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
