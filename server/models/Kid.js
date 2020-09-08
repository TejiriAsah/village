let mongoose = require("mongoose");

let KidSchema = new mongoose.Schema({
  parentId: { type: String, required: true },
  name: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  allergies: { type: Array, required: false },
  dietaryRestrictions: { type: Array, required: false },
  medications: { type: Array, required: false },
  activities: { type: Array, required: false },
  additionalNotes: { type: String, required: false },
});

let Kid = mongoose.model("kids", KidSchema);
module.exports = Kid;
