const express = require("express");
const kidRouter = express.Router();
const Parent = require("../models/Parent");
const Kid = require("../models/Kid");

//add a child route

kidRouter.post("/:username", (req, res) => {
  Parent.findOne({ username: req.params.username }, (error, parent) => {
    if (error) {
      return res.status(500).json({ message: error });
    }
    if (!parent) {
      return res.status(404).json({ message: "profile not found" });
    } else {
      const newKid = new Kid({
        parentId: parent._id,
        name: req.body.name,
        dateOfBirth: req.body.dateOfBirth,
        allergies: req.body.allergies,
        dietaryRestrictions: req.body.dietaryRestrictions,
        medications: req.body.medications,
        activities: req.body.activities,
        additionalNotes: req.body.additionalNotes,
      });
      newKid.save((error) => {
        if (error) {
          return res.status(500).send(error);
        } else {
          const kidId = newKid._id;
          const kids = parent.kids;
          kids.push(kidId);
          Parent.findOneAndUpdate(
            { username: req.params.username },
            { kids: kids },
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

//get kids

kidRouter.get("/:parentId", (req, res) => {
  Kid.find({ parentId: req.params.parentId }, (error, kids) => {
    if (error) {
      return res.status(500).json({ message: error });
    }
    if (!kids) {
      return res.status(404).json({ message: "kids not found" });
    } else {
      return res.status(200).json(kids);
    }
  });
});

//get KID

kidRouter.get("/child/:kidId", (req, res) => {
  console.log("hello", req.params.kidId);
  Kid.findOne({ _id: req.params.kidId }, (error, kid) => {
    if (error) {
      return res.status(500).json({ message: error });
    }
    if (!kid) {
      return res.status(404).json({ message: "kid not found" });
    } else {
      return res.status(200).json(kid);
    }
  });
});

//edit child
// /kids/edit/:username

kidRouter.put("/edit/:kidId", (req, res) => {
  Kid.findOneAndUpdate(
    { _id: req.params.kidId },
    {
      name: req.body.name,
      dateOfBirth: req.body.dateOfBirth,
      allergies: req.body.allergies,
      dietaryRestrictions: req.body.dietaryRestrictions,
      medications: req.body.medications,
      activities: req.body.allergies,
      additionalNotes: req.body.additionalNotes,
    },
    (error, oldKid) => {
      if (error) {
        return res.status(500).json({ message: error });
      }
      if (!oldKid) {
        return res.status(404).json({ message: "kid not found" });
      } else {
        return res.status(200).json(oldKid);
      }
    }
  );
});

//remove child
// Action = User clicks on remove child button => DELETE - Kid’s database, parent’s kid’s array
// “/kids/:parentusername/:kidsID
// Delete from kid’s database
// Delete from kid’s array in parent’s database
// Redirecting to kid’s profile

kidRouter.delete("/:username/:kidId", (req, res) => {
  const KidId = req.params.kidId;
  const Username = req.params.username;
  Kid.findOneAndDelete({ _id: req.params.kidId }, (error, deletedKid) => {
    if (error) {
      return res.status(500).json({ message: error });
    }
    if (!deletedKid) {
      return res.status(400).json({ message: "delete unsuccessful" });
    } else {
      Parent.findOne({ username: req.params.username }, (error, parent) => {
        if (error) {
          return res.status(500).json({ message: error });
        }

        if (!parent) {
          return res.status(404).json({ message: "profile not found" });
        } else {
          const kids = parent.kids;
          const newKids = kids.filter((kidId) => {
            return kidId._id.toString() !== req.params.kidId;
          });
          Parent.findOneAndUpdate(
            { username: Username },
            { kids: newKids },
            (error, oldParent) => {
              if (error) {
                return res.status(404).json({ message: "profile not found" });
              }
              if (!oldParent) {
                return res.status(404).json({ message: "profile not found" });
              } else {
                return res.status(200).json({ message: "child deleted!" });
              }
            }
          );
        }
      });
    }
  });
});

module.exports = kidRouter;
