const express = require("express");

const { check, body } = require("express-validator");
const User = require("../models/user");

const userController = require("../controllers/user");

const router = express.Router();

router.post(
  "/register",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject(
              "E-mail exists already, please pick a different one."
            );
          }
        });
      })
      .normalizeEmail(),
    body(
      "password",
      "Password should have letters and numbers, with a minimum length of 4 charcaters."
    )
      .isLength({ min: 4 })
      .isAlphanumeric()
      .trim(),
  ],
  userController.register
);

router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email address.")
      .normalizeEmail(),
    body("password", "Password has to be valid.")
      .isLength({ min: 4 })
      .isAlphanumeric()
      .trim(),
  ],
  userController.login
);

module.exports = router;
