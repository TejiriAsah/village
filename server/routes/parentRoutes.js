const express = require("express");
const parentRouter = express.Router();
const Parent = require("../models/Parent");

//get parent profile route
parentRouter.get("/:username", (req, res) => {
  Parent.findOne({ username: req.params.username }, (error, parent) => {
    if (error) {
      return res.status(500).json({ message: error });
    }
    if (!parent) {
      return res.status(404).json({ message: "profile not found" });
    } else {
      return res.status(200).json(parent);
    }
  });
});

//change profile password
parentRouter.put("/change-password/:username", (req, res) => {
  Parent.findOneAndUpdate(
    { username: req.params.username },
    { password: req.body.password },
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
});

//search bar route
// Action = User searches in the search village search bar => GET - Parents database
// “/profiles”
// Return tops 3 matches based on username

//use mongoose findone and update

module.exports = parentRouter;
