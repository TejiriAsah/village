//sign up/log in routes
const express = require("express");
const indexRouter = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Parent = require("../models/Parent");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

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
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newParent.password, salt, (error, hash) => {
          newParent.password = hash;
          newParent.save((error) => {
            if (error) {
              console.log("the error", error);
              return res.status(500).send("error", error);
            } else {
              Parent.findOne(
                { username: newParent.username },
                (error, user) => {
                  const payload = {
                    id: user._id,
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    branches: user.branches.length,
                  };
                  jwt.sign(
                    payload,
                    process.env.secretOrKey,
                    {
                      expiresIn: "6h",
                    },
                    (error, token) => {
                      return res.status(200).json({
                        message: "sign up successful",
                        success: true,
                        token: "Bearer" + token,
                      });
                    }
                  );
                }
              );
            }
          });
        });
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
      bcrypt.compare(req.body.password, parent.password, (err, response) => {
        if (response) {
          const payload = {
            id: parent._id,
            name: parent.name,
            username: parent.username,
            email: parent.email,
            branches: parent.branches.length,
          };
          jwt.sign(
            payload,
            process.env.secretOrKey,
            {
              expiresIn: "6h",
            },
            (error, token) => {
              return res.status(200).json({
                message: "login successful",
                success: true,
                token: "Bearer" + token,
              });
            }
          );
        } else {
          return res.status(400).json({ message: "invalid password" });
        }
      });
    }
  });
});

module.exports = indexRouter;
