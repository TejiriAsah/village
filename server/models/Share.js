let mongoose = require("mongoose");

let ShareSchema = new mongoose.Schema({
  kidID: { type: String, required: true },
  reason: { type: String, required: true },
  parentUserName: { type: String, required: true },
  otherParentUserName: { type: String, required: true },
  duration: { type: String, required: true },
});

let Share = mongoose.model("shares", ShareSchema);
module.exports = Share;
