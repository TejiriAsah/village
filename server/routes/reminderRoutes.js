const express = require("express");
const reminderRouter = express.Router();
const Parent = require("../models/Parent");
const Reminder = require("../models/Reminder");
const activityRouter = require("./activityRoutes");

//add a reminder route

reminderRouter.post("/add-reminder/:username", (req, res) => {
  Parent.findOne({ username: req.params.username }, (error, parent) => {
    if (error) {
      return res.status(500).json({ message: error });
    }
    if (!parent) {
      return res.status(404).json({ message: " profile not found" });
    } else {
      const newReminder = new Reminder({
        parentUsername: parent.username,
        message: req.body.message,
        date: req.body.date,
      });
      newReminder.save((error) => {
        if (error) {
          return res.status(500).send(error);
        } else {
          const reminderId = newReminder._id;
          const reminders = parent.reminders;
          reminders.push(reminderId);
          Parent.findOneAndUpdate(
            { username: req.params.username },
            { reminders: reminders },
            (error, oldParent) => {
              if (error) {
                return res.status(500).json({ message: error });
              }
              if (!oldParent) {
                return res.status(404).json({ message: "profile not found" });
              } else {
                return res.status(200).json(oldParent);
              }
            }
          );
        }
      });
    }
  });
});

//get reminders

reminderRouter.get("/:username", (req, res) => {
  Reminder.find({ parentUsername: req.params.username }, (error, reminders) => {
    if (error) {
      return res.status(500).json({ message: error });
    }
    if (!reminders) {
      return res.status(404).json({ message: "reminders not found" });
    } else {
      return res.status(200).json(reminders);
    }
  });
});

//delete reminder
// Action = User clicks on delete reminder button => DELETE - Reminders db & reminder array of parent
// “reminders/:parentusername/:reminderid
// Delete reminder from parent’s reminder array
// Delete from reminders database

reminderRouter.delete("/:username/:reminderId", (req, res) => {
  Reminder.findOneAndDelete(
    { _id: req.params.reminderId },
    (error, deletedReminder) => {
      if (error) {
        return res.status(500).json({ message: error });
      }
      if (!deletedReminder) {
        return res.status(400).json({ message: "delete unsuccessful" });
      } else {
        Parent.findOne({ username: req.params.username }, (error, parent) => {
          if (error) {
            return res.status(500).json({ message: error });
          }
          if (!parent) {
            return res.status(404).json({ message: "profile not found" });
          } else {
            const reminders = parent.reminders;
            const newReminders = reminders.filter(
              (reminderId) => reminderId !== req.params.reminderId
            );

            Parent.findOneAndUpdate(
              { username: req.params.username },
              { reminders: newReminders },
              (error, oldParent) => {
                if (error) {
                  return res.status(404).json({ message: "profile not found" });
                }
                if (!oldParent) {
                  return res.status(404).json({ message: "profile not found" });
                } else {
                  return res.status(200).json({ message: "reminder deleted!" });
                }
              }
            );
          }
        });
      }
    }
  );
});

module.exports = reminderRouter;
