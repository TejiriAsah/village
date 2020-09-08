let mongoose = require("mongoose");

let ReminderSchema = new mongoose.Schema({
  parentUsername: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, required: true },
});

let Reminder = mongoose.model("reminders", ReminderSchema);
module.exports = Reminder;
