// Posts: like (array),comments(array),actual message,username of poster

let mongoose = require("mongoose");

let PostSchema = new mongoose.Schema({
  username: { type: String, required: true },
  message: { type: String, required: true },
  likes: { type: Number, default: 0, required: false },
  comments: { type: Array, required: false },
});

let Post = mongoose.model("posts", PostSchema);
module.exports = Post;
