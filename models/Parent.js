let mongoose = require("mongoose");

let ParentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  branches: {
    type: [
      {
        name: String,
        username: String,
      },
    ],
    required: false,
  },
  kids: { type: Array, required: false },
  receivedKids: { type: Array, required: false },
  requests: {
    type: [
      {
        name: String,
        username: String,
      },
    ],
    required: false,
  },
});

let Parent = mongoose.model("parents", ParentSchema);
module.exports = Parent;
