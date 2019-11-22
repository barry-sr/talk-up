const router = require("express").Router();
const Post = require("../model/Post");
const verify = require("../auth/verifyToken");

router.get("/posts", async (req, res) => {
  Post.find((error, value) => {
    if (error) return res.status(401).json("No post");
    res.status(200).json(value);
  });
});

router.post("/posts", verify, async (req, res) => {
  const data = req.body.post;
  const username = req.decoded.data;

  //store post in DB
  const post = new Post({
    username: username,
    post: data
  });

  post.save((error, savedPost) => {
    if (error) {
      console.log("Storing data error", error);
      return res.status(400).json(error);
    }
    res.status(201).json(savedPost);
  });
});

module.exports = router;
