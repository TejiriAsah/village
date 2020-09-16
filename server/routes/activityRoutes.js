const express = require("express");
const activityRouter = express.Router();
const Kid = require("../models/Kid");
const Activity = require("../models/Activity");

//add an activity
activityRouter.post("/add-activity/:kidId", (req, res) => {
  Kid.findOne({ _id: req.params.kidId }, (error, kid) => {
    if (error) {
      return res.status(500).json({ message: error });
    }
    if (!kid) {
      return res.status(404).json({ message: "kid profile not found" });
    } else {
      const newActivity = new Activity({
        kidID: kid._id,
        name: req.body.name,
        location: req.body.location,
        time: req.body.time,
        dontForget: req.body.dontForget,
      });
      newActivity.save((error) => {
        if (error) {
          return res.status(500).send(error);
        } else {
          const activityId = newActivity._id;
          const activities = kid.activities;
          activities.push(activityId);
          Kid.findOneAndUpdate(
            { _id: req.params.kidId },
            { activities: activities },
            (error, oldKid) => {
              if (error) {
                return res.status(404).json({ message: "profile not found" });
              }
              if (!oldKid) {
                return res.status(404).json({ message: "profile not found" });
              } else {
                return res.status(200).json(oldKid);
              }
            }
          );
        }
      });
    }
  });
});

//edit activity

activityRouter.put("/edit-activity/:activityId", (req, res) => {
  Activity.findOneAndUpdate(
    { _id: req.params.activityId },
    {
      name: req.body.name,
      location: req.body.location,
      time: req.body.time,
      dontForget: req.body.dontForget,
    },
    (error, oldActivity) => {
      if (error) {
        return res.status(500).json({ message: error });
      }
      if (!oldActivity) {
        return res.status(404).json({ message: "activity not found" });
      } else {
        return res.status(200).json(oldActivity);
      }
    }
  );
});

//get activities for one child

activityRouter.get("/:kidId", (req, res) => {
  Activity.find({ kidID: req.params.kidId }, (error, activities) => {
    if (error) {
      return res.status(500).json({ message: error });
    }
    if (!activities) {
      return res.status(404).json({ message: "activity not found" });
    } else {
      return res.status(200).json(activities);
    }
  });
});

//get activity
activityRouter.get("/activity/:kidId", (req, res) => {
  Activity.findOne({ kidID: req.params.kidId }, (error, activity) => {
    if (error) {
      return res.status(500).json({ message: error });
    }
    if (!activity) {
      return res.status(404).json({ message: "activity not found" });
    } else {
      console.log("activity", activity);
      return res.status(200).json(activity);
    }
  });
});

module.exports = activityRouter;
