const express = require("express");
const branchRouter = express.Router();
const Parent = require("../models/Parent");

branchRouter.get("/:username", (req, res) => {
  Parent.findOne({ username: req.params.username }, (error, parent) => {
    if (error) {
      return res.status(500).json({ message: error });
    }
    if (!parent) {
      return res.status(404).json({ message: "profile not found" });
    } else {
      const branches = parent.branches;
      return res.status(200).json(branches);
    }
  });
});

module.exports = branchRouter;
