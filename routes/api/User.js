const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../../models/User");
const key = require("../../config/keys").secret;
/**
 * @route POST api/users/register
 * @desc Register user
 * @access public
 */

router.post("/register", (req, res) => {
  let { name, username, email, password, confirm_password } = req.body;
  if (password != confirm_password) {
    return res.status(400).json({
      msg: "Password do not match",
    });
  } else {
    //check unique username
    User.findOne({
      username: username,
    }).then((user) => {
      if (user) {
        return res.status(400).json({
          msg: "Username is already taken",
        });
      }
    });
    //check unique email
    User.findOne({
      email: email,
    }).then((user) => {
      if (user) {
        return res.status(400).json({
          msg: "Email is already registered. Did you forgot your password",
        });
      }
    });

    //the data valid
    let newUser = new User({
      name,
      username,
      email,
      password,
    });
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) {
          throw err;
        }
        newUser.password = hash;
        newUser.save().then((user) => {
          return res.status(200).json({
            success: true,
            msg: "User is now register",
          });
        });
      });
    });
  }
});
/**
 * @route POST api/users/login
 * @desc Login user
 * @access public
 */

router.post("/login", (req, res) => {
  User.findOne({ username: req.body.username }).then((user) => {
    if (!user) {
      return res.status(404).json({
        msg: "User is not found",
        success: false,
      });
    }
    bcrypt.compare(req.body.password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          _id: user._id,
          username: user.username,
          name: user.name,
          email: user.email,
        };
        jwt.sign(
          payload,
          key,
          {
            expiresIn: 86400,
          },
          (err, token) => {
            return res.status(200).json({
              success: true,
              token: `Bearer ${token}`,
              msg: "Logging successfully",
              user: user
            })
          }
        );
      } else {
        return res.status(404).json({
          msg: "Incorrect password",
          success: false,
        });
      }
    });
  });
});

/**
 * @route GET api/users/profile
 * @desc User profile
 * @access private
 */

router.get("/profile",passport.authenticate('jwt',{session: false}), (req, res) => {
  return res.status(200).json({
     user :req.user
})
})


module.exports = router;
