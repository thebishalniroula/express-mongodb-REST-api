const express = require("express");
const Posts = require("../../models/Post");
const postRouter = express.Router();
postRouter.use(express.json());

//POST new post to db
postRouter.post("/", (req, res) => {
  const post = new Posts(req.body);

  post
    .save()
    .then((item) => {
      console.log("saved to db successfully" + item);
    })
    .catch((err) => {
      console.log("COuldnt save to db" + err);
    });
  res.status(200).json(post);
});

//GET post with given id from db
postRouter.get("/:id", async (req, res) => {
  try {
    const [post] = await Posts.find({ _id: req.params.id });
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "requested resource was not found" });
    }
  } catch (error) {
    res.status(404).json(error);
  }
});

//GET all posts from db
postRouter.get("/", async (req, res) => {
  try {
    const posts = await Posts.find();
    if (posts) {
      res.status(200).json(posts);
    } else {
      res.status(404).json({ message: "Not found " });
    }
  } catch (error) {
    res.status(404).json(error);
  }
});

//Edit existing post in db with given id
postRouter.put("/:id", async (req, res) => {
  const [post] = await Posts.find({ _id: req.params.id });
  if (!post) {
    res.status(404).json({ message: "No such data found on server" });
    return;
  }

  if (req.body.title) {
    post.title = req.body.title;
  }
  if (req.body.description) {
    post.body = req.body.description;
  }
  post
    .save()
    .then(() => {
      console.log("Updated to db");
      res.status(200).send(post);
    })
    .catch((err) => {
      console.log("Could not save to db " + err);
      res.status(500).json({ message: "could not complete the request" });
    });
});

//DELETE post with given id from db
postRouter.delete("/:id", (req, res) => {
  Posts.deleteOne({ _id: req.params.id }, (err, doc) => {
    if (err) {
      res.status(404).send(err);
    } else {
      console.log("deleted successfully");
      res.status(202).send(doc);
    }
  });
});

module.exports = postRouter;
