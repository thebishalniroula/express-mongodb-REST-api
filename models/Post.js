const mongoose = require("mongoose");
const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  descreption: String,
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Posts = mongoose.model("Posts", postSchema);
module.exports = Posts;
