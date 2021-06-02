// Posts: like (array),comments(array),actual message,username of poster

let mongoose = require("mongoose");

let PostSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  message: { type: String, required: true },
  likes: { type: Number, default: 0, required: false },
  comments: {
    type: [
      {
        name: String,
        username: String,
        comment: String,
        date: String,
        time: String,
      },
    ],
    required: false,
  },
  date: { type: String, required: true },
  time: { type: String, required: true },
});

let Post = mongoose.model("posts", PostSchema);
module.exports = Post;
