const express = require("express");
const shareRouter = express.Router();
const Parent = require("../models/Parent");
const Share = require("../models/Share");
const Kid = require("../models/Kid");

//share a child card
// Action = User clicks on share button from kid’s card => POST - Kid’s array of the parent you’re sharing with + Shares database
// “/kids/share/::shareeusername/:kidID”
// Body: (reason, datefrom, datato, timefrom, timeto)
// Get the sharee’s profile from database using the username
// Add kid’s id to their array of kids
// Add body to shares database
// redirecting back to kid’s page

shareRouter.post("/:username/:receiverusername/:kidId", (req, res) => {
  Kid.findOne({ _id: req.params.kidId }, (error, kid) => {
    if (error) {
      return res.status(500).json({ message: error });
    }
    if (!kid) {
      return res.status(404).json({ message: "kid not found" });
    } else {
      Parent.findOne(
        { username: req.body.receiverusername },
        (error, parent) => {
          if (error) {
            return res.status(500).json({ message: error });
          }
          if (!parent) {
            return res.status(404).json({ message: "profile not found" });
          } else {
            const kids = parent.receivedKids;
            console.log("your kids:", kids);
            kids.push(kid);
            console.log("your new kids", kids);

            Parent.findOneAndUpdate(
              { username: req.body.receiverusername },
              {
                receivedKids: kids,
              },
              (error, oldParent) => {
                if (error) {
                  return res.status(500).json({ message: error });
                }
                if (!oldParent) {
                  return res.status(404).json({ message: "profile not found" });
                } else {
                  const newShare = new Share({
                    kidID: req.params.kidId,
                    reason: req.body.reason,
                    parentUserName: req.params.username,
                    otherParentUserName: req.body.receiverusername,
                    duration: req.body.duration,
                  });
                  newShare.save((error) => {
                    if (error) {
                      return res.status(500).send(error);
                    } else {
                      const shares = kid.shares;
                      shares.push(req.body.receiverusername);
                      Kid.findOneAndUpdate(
                        { _id: req.params.kidId },
                        { shares: shares },
                        (error, oldKid) => {
                          if (error) {
                            return res.status(500).json({ message: error });
                          }
                          if (!oldKid) {
                            return res
                              .status(404)
                              .json({ message: "kid not found" });
                          } else {
                            return res
                              .status(200)
                              .json({ message: "now sharing kid profile" });
                          }
                        }
                      );
                    }
                  });
                }
              }
            );
          }
        }
      );
    }
  });
});

shareRouter.get("/:kidId", (req, res) => {
  Share.find({ kidID: req.params.kidId }, (error, usernames) => {
    if (error) {
      return res.status(500).json({ message: error });
    }
    if (!usernames) {
      return res.status(200).json({ message: "Not sharing with anyone" });
    } else {
      return res.status(200).json(usernames);
    }
  });
});

//end share at date of expiration
// Action = Share duration expires => DELETE - Shares database and Sharee’s kid’s array
// “/kids/share/:kidID/:sharesID”
// Delete share from shares database
// Delete kid from sharee’s kid’s array
// Automatically on expiration

//maybe a check to see if expiration date has reached

// shareRouter.delete("/:kidId")

module.exports = shareRouter;
