let mongoose = require("mongoose");

let ActivitySchema = new mongoose.Schema({
  kidID: { type: String, required: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  time: { type: String, required: true },
  dontForget: { type: Array, required: false },
});

let Activity = mongoose.model("activities", ActivitySchema);
module.exports = Activity;
