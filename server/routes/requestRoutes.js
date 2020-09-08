const express = require("express");
const requestRouter = express.Router();
const Parent = require("../models/Parent");

//send a friend request
// Action = User clicks on extend branch button from search results => POST - Parents
// “/requests/add/:parentsusername/:branchusername”
// Add parents username to request list of branch username

requestRouter.post("/add/:username/:branchusername", (req, res) => {
  Parent.findOne({ username: req.params.username }, (error, parent) => {
    if (error) {
      return res.status(500).json({ message: error });
    }
    if (!parent) {
      return res.status(404).json({ message: "profile not found" });
    } else {
      const newRequest = {
        name: req.body.name,
        username: req.body.username,
      };
      const requests = parent.requests;
      requests.push(newRequest);
      Parent.findOneAndUpdate(
        { username: req.params.username },
        { requests: requests },
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
});

module.exports = requestRouter;
