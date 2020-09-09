const express = require("express");
const requestRouter = express.Router();
const Parent = require("../models/Parent");

//send a friend request
// Action = User clicks on extend branch button from search results => POST - Parents
// “/requests/add/:parentsusername/:branchusername”
// Add parents username to request list of branch username

requestRouter.post("/add/:username/:receiverusername", (req, res) => {
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

      Parent.findOne(
        { username: req.params.receiverusername },
        (error, parent2) => {
          if (error) {
            return res.status(500).json({ message: error });
          }
          if (!parent2) {
            return res.status(404).json({ message: "profile not found" });
          } else {
            const requests = parent2.requests;
            requests.push(newRequest);
            Parent.findOneAndUpdate(
              { username: req.params.receiverusername },
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
        }
      );
    }
  });
});

//accept a friend request
// Action = User clicks on accept request button => POST - Parents
// “/requests/accept/:fromusername/:tousername”
// Get toparent’s profile, remove branch from the requests list and add branch to branches list
// Get fromparent’s profile, add to branches list

requestRouter.post("/accept/:username/:tousername", (req, res) => {
  Parent.findOne({ username: req.params.tousername }, (error, parent) => {
    if (error) {
      return res.status(500).json({ message: error });
    }
    if (!parent) {
      return res.status(404).json({ message: "profile not found" });
    } else {
      const requests = parent.requests;
      const newRequests = requests.filter((request) => {
        return request.username !== req.params.username;
      });
      console.log("new request", newRequests);
      const acceptedRequest = requests.filter((request) => {
        return request.username === req.params.username;
      });
      console.log("accepted request", acceptedRequest);
      const branches = parent.branches;
      const newBranch = {
        name: acceptedRequest[0].name,
        username: acceptedRequest[0].username,
      };
      branches.push(newBranch);
      console.log("branches", branches);
      Parent.findOneAndUpdate(
        { username: req.params.tousername },
        {
          requests: newRequests,
          branches: branches,
        },
        (error, oldParent) => {
          if (error) {
            return res.status(404).json({ message: "profile not found" });
          }
          if (!oldParent) {
            return res.status(404).json({ message: "profile not found" });
          } else {
            Parent.findOne(
              { username: req.params.username },
              (error, parent2) => {
                if (error) {
                  return res.status(500).json({ message: error });
                }
                if (!parent2) {
                  return res.status(404).json({ message: "profile not found" });
                } else {
                  const branch = {
                    name: parent.name,
                    username: parent.username,
                  };
                  const parent2Branches = parent2.branches;
                  parent2Branches.push(branch);
                  Parent.findOneAndUpdate(
                    { username: req.params.username },
                    { branches: parent2Branches },
                    (error, oldParent2) => {
                      if (error) {
                        return res
                          .status(404)
                          .json({ message: "profile not found" });
                      }
                      if (!oldParent2) {
                        return res
                          .status(404)
                          .json({ message: "profile not found" });
                      } else {
                        return res.status(200).json(oldParent2);
                      }
                    }
                  );
                }
              }
            );
          }
        }
      );
    }
  });
});

//cancel a friend request
// Action = User clicks on cancel request button => PATCH - Parents
// “/request/cancel/:fromusername/:tousername/”
// Get toUsername from Parent’s profile and delete “fromusername” from requests list
// Redirect to requests page

requestRouter.patch("/cancel/:username/:tousername", (req, res) => {
  Parent.findOne({ username: req.params.tousername }, (error, parent) => {
    if (error) {
      return res.status(500).json({ message: error });
    }
    if (!parent) {
      return res.status(404).json({ message: "profile not found" });
    } else {
      const requests = parent.requests;
      const newRequests = requests.filter((request) => {
        return request.username !== req.params.tousername;
      });
      Parent.findOneAndUpdate(
        { username: req.params.username },
        { requests: newRequests },
        (error, oldParent) => {
          if (error) {
            return res.status(404).json({ message: "profile not found" });
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

//GET list of requests
// Action = User clicks on requests button => GET - Parents
// “/requests/:parentsusername”
// Return the list of requests

requestRouter.get("/:username", (req, res) => {
  Parent.findOne({ username: req.params.username }, (error, parent) => {
    if (error) {
      return res.status(500).json({ message: error });
    }
    if (!parent) {
      return res.status(404).json({ message: "profile not found" });
    } else {
      const requests = parent.requests;
      return res.status(200).json(requests);
    }
  });
});

module.exports = requestRouter;
