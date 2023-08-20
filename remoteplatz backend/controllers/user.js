const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const { validationResult } = require("express-validator");

exports.register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errorMessage: errors.array()[0].msg,
    });
  }
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const user = new User({
      email: req.body.email,
      password: hashedPassword,
    });

    const result = await user.save();

    res.status(201).json({
      message: "User created!",
      result: result,
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422, {
      errorMessage: errors.array()[0].msg,
    });
  }
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(422).json({
        errorMessage: "Invalid email or password.",
      });
    }

    const doMatch = await bcrypt.compare(req.body.password, user.password);
    if (doMatch) {
      const token = jwt.sign(
        { email: user.email, userId: user._id },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: user._id,
      });
    }
    return res.status(422).json({
      errorMessage: "Invalid email or password.",
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};
