const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const router = express.Router();

router.post("/register", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      email: req.body.email,
      password: hash,
    });
    console.log(user);
    user
      .save()
      .then((result) => {
        // console.log(result);
        res.status(201).json({
          message: "User created!",
          result: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  });
});

router.post("/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then((user) => {
      console.log(user.email);
      if (!user) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      fetchedUser = user;
      console.log(fetchedUser);
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      console.log(result);
      if (!result) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );
      console.log(token);
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(401).json({
        message: "Auth failed",
      });
    });
});


router.get("/", (req, res, next) => {
  User.find()
    .then((users) => {
    if (users) {
      res.status(200).json({users: users});
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  });
});


module.exports = router;
