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
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (Object.keys(req.body).length !== 0 && !checkShareKeys(req.body)) {
    return res.status(400).json({ message: "All fields are required" });
  }
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
            kid.expirationDate = req.body.expirationDate;
            kid.expirationTime = req.body.expirationTime;
            kids.push(kid);

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
                    expirationDate: req.body.expirationDate,
                    expirationTime: req.body.expirationTime,
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
                              .json({ message: "Now sharing kid profile" });
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

shareRouter.delete("/:kidId/:receiverusername", (req, res) => {
  Kid.findOne({ _id: req.params.kidId }, (error, kid) => {
    if (error) {
      return res.status(500).json({ message: error });
    }

    if (!kid) {
      return res.status(404).json({ message: "Kid not found" });
    } else {
      const shares = kid.shares;
      const newShares = shares.filter((share) => {
        return share !== req.params.receiverusername;
      });

      Kid.findOneAndUpdate(
        { _id: req.params.kidId },
        { shares: newShares },
        (error, oldKid) => {
          if (error) {
            return res.status(500).json({ message: error });
          }

          if (!oldKid) {
            return res.status(404).json({ message: "Kid not found" });
          } else {
            Parent.findOne(
              { username: req.params.receiverusername },
              (error, parent) => {
                if (error) {
                  return res.status(500).json({ message: error });
                }

                if (!parent) {
                  return res.status(404).json({ message: "Parent not found" });
                } else {
                  const receivedKids = parent.receivedKids;
                  const newReceivedKids = receivedKids.filter((kid) => {
                    return kid._id.toString() !== req.params.kidId;
                  });

                  Parent.findOneAndUpdate(
                    { username: req.params.receiverusername },
                    { receivedKids: newReceivedKids },
                    (error, oldParent) => {
                      if (error) {
                        return res.status(500).json({ message: error });
                      }

                      if (!oldParent) {
                        return res
                          .status(404)
                          .json({ message: "Parent not found" });
                      } else {
                        Share.findOneAndDelete(
                          {
                            kidID: req.params.kidId,
                            otherParentUserName: req.params.receiverusername,
                          },
                          (error, share) => {
                            if (error) {
                              return res.status(500).json({ message: error });
                            }

                            if (!share) {
                              return res
                                .status(404)
                                .json({ message: "Share not found" });
                            } else {
                              return res
                                .status(200)
                                .json({ message: "Successfully ended share" });
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
        }
      );
    }
  });
});

function checkShareKeys(requiredObj) {
  return (
    requiredObj.reason &&
    requiredObj.otherParentUserName &&
    requiredObj.expirationTime &&
    requiredObj.expirationDate
  );
}

module.exports = shareRouter;
