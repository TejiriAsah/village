const express = require("express");
const parentRouter = express.Router();
const brcypt = require("bcryptjs");
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
  if (
    req.body.password.length === 0 ||
    req.body.confirmNewPassword.length === 0
  ) {
    return res.status(400).json({ message: "New password is invalid" });
  }
  if (req.body.password === req.body.confirmNewPassword) {
    Parent.findOne({ username: req.params.username }, (error, parent) => {
      brcypt.compare(req.body.oldPassword, parent.password, (err, response) => {
        if (response) {
          brcypt.genSalt(10, (err, salt) => {
            brcypt.hash(req.body.password, salt, (err, hash) => {
              Parent.findOneAndUpdate(
                { username: req.params.username },
                { password: hash },
                (error, oldParent) => {
                  if (error) {
                    return res.status(500).json({ message: error });
                  }
                  if (!oldParent) {
                    return res
                      .status(404)
                      .json({ message: "Profile not found" });
                  } else {
                    return res.status(200).json(oldParent);
                  }
                }
              );
            });
          });
        } else {
          return res.status(400).json({ message: "Password is incorrect" });
        }
      });
    });
  } else {
    return res.status(400).json({ message: "Password doesn't match" });
  }
});

//search bar route
// Action = User searches in the search village search bar => GET - Parents database
// “/profiles”
// Return tops 3 matches based on username

//use mongoose findone and update
//get all received kids from sharing
parentRouter.get("/sharedkids/:username", (req, res) => {
  Parent.findOne({ username: req.params.username }, (error, parent) => {
    if (error) {
      return res.status(500).json({ message: error });
    }

    if (!parent) {
      return res.status(404).json({ message: "parent not found" });
    } else {
      const kids = parent.receivedKids;
      return res.status(200).json(kids);
    }
  });
});

module.exports = parentRouter;
