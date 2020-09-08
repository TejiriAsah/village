const express = require("express");
const postRouter = express.Router();
const Parent = require("../models/Parent");
const Post = require("../models/Post");

//make a post
postRouter.post("/post/:username", (req, res) => {
  Parent.findOne({ username: req.params.username }, (error, parent) => {
    if (error) {
      return res.status(500).json({ message: error });
    }
    if (!parent) {
      return res.status(404).json({ message: "profile not found" });
    } else {
      const newPost = new Post({
        username: req.params.username,
        message: req.body.message,
      });
      newPost.save((error) => {
        if (error) {
          return res.status(500).send(error);
        } else {
          return res.status(200).json({ message: "posted to timeline!" });
        }
      });
    }
  });
});

// Action = User logs in and goes to timeline page => GET - Posts
// “/posts/:parentusername”
// Return all posts of only the usernames in the branches list of the parents
//get posts
postRouter.get("/:username", (req, res) => {
  Post.find({ username: req.params.username }, (error, posts) => {
    if (error) {
      return res.status(500).json({ message: error });
    }
    if (!posts) {
      return res.status(404).json({ message: "profile not found" });
    } else {
      return res.status(200).json(posts);
    }
  });
});

//user likes a post
// Action = User likes a post => POST - Posts
// “/post/like/:postID”
// Add to likes array of posts database

postRouter.post("/post/like/:postId", (req, res) => {
  Post.findOne({ _id: req.params.postId }, (error, post) => {
    if (error) {
      return res.status(500).json({ message: error });
    }
    if (!post) {
      return res.status(404).json({ message: "post not found" });
    } else {
      let currLikes = post.likes;
      Post.findOneAndUpdate(
        { _id: req.params.postId },
        { likes: currLikes + 1 },
        (error, oldPost) => {
          if (error) {
            return res.status(500).json({ message: error });
          }
          if (!oldPost) {
            return res.status(404).json({ message: "profile not found" });
          } else {
            return res.status(200).json({ message: "successfully liked post" });
          }
        }
      );
    }
  });
});

//user comments on a post
// Action = User comments on a post => POST - Post
// “/post/comment/:postID”
// Add to comment array of posts database

postRouter.post("/post/comment/:postId", (req, res) => {
  Post.findOne({ _id: req.params.postId }, (error, post) => {
    if (error) {
      return res.status(500).json({ message: error });
    }
    if (!post) {
      return res.status(404).json({ message: "post not found" });
    } else {
      let currComments = post.comments;
      Post.findOneAndUpdate(
        { _id: req.params.postId },
        { comments: currComments + 1 },
        (error, oldPost) => {
          if (error) {
            return res.status(500).json({ message: error });
          }
          if (!oldPost) {
            return res.status(404).json({ message: "post not found" });
          } else {
            return res
              .status(200)
              .json({ message: "successfully commented on a post" });
          }
        }
      );
    }
  });
});

//user clicks on a particular post
// Action = User clicks on particular post => GET - Post
// “/post/:postID”
// Return post with that ID

postRouter.get("/post/:postId", (req, res) => {
  Post.findOne({ _id: req.params.postId }, (error, post) => {
    if (error) {
      return res.status(500).json({ message: error });
    }
    if (!post) {
      return res.status(404).json({ message: "post with that ID not found" });
    } else {
      return res.status(200).json(post);
    }
  });
});

module.exports = postRouter;
