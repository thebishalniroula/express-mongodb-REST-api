const express = require("express");
const mongoose = require("mongoose");
const app = express();
const pathRouter = require("./routers/paths/posts");
require("dotenv").config();

//connect to db
mongoose
  .connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true })
  .then(() => {
    console.log("Successfully connected to db");
  })
  .catch((err) => {
    console.log("An error occured while connecting to db" + err);
  });

app.use("/posts", pathRouter);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(3000, () => {
  console.log("Listening on port 3000...");
});
