//sign up/log in routes
const express = require("express");
const indexRouter = express.Router();
const Parent = require("../models/Parent");

//sign-up

indexRouter.post("/sign-up", (req, res) => {
  Parent.findOne({ username: req.body.username }, (error, parent) => {
    if (parent) {
      return res.status(400).json({
        message: "Account with username already exists, please try again",
      });
    } else {
      const newParent = new Parent({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
      newParent.save((error) => {
        if (error) {
          return res.status(500).send("error");
        } else {
          return res.status(200).send("success");
        }
      });
    }
  });
});

//login

indexRouter.post("/login", (req, res) => {
  Parent.findOne({ username: req.body.username }, (error, parent) => {
    if (error) {
      return res.status(500).json({ message: error });
    }
    if (!parent) {
      return res
        .status(404)
        .json({ message: "cannot find account with that username" });
    } else {
      if (parent.password === req.body.password) {
        return res.status(200).json({ message: "login successful" });
      } else {
        return res.status(400).json({ message: "invalid password" });
      }
    }
  });
});

module.exports = indexRouter;
