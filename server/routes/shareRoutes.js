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
        { username: req.params.receiverusername },
        (error, parent) => {
          if (error) {
            return res.status(500).json({ message: error });
          }
          if (!parent) {
            return res.status(404).json({ message: "profile not found" });
          } else {
            const kids = parent.kids;
            console.log("your kids:", kids);
            kids.push(req.params.kidId);
            console.log("your new kids", kids);

            Parent.findOneAndUpdate(
              { username: req.params.receiverusername },
              {
                kids: kids,
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
                    otherParentUserName: req.params.receiverusername,
                    duration: req.body.duration,
                  });
                  newShare.save((error) => {
                    if (error) {
                      return res.status(500).send(error);
                    } else {
                      return res
                        .status(200)
                        .json({ message: "now sharing kid profile" });
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

//end share at date of expiration
// Action = Share duration expires => DELETE - Shares database and Sharee’s kid’s array
// “/kids/share/:kidID/:sharesID”
// Delete share from shares database
// Delete kid from sharee’s kid’s array
// Automatically on expiration

module.exports = shareRouter;
