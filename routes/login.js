const express = require("express");
const router = express.Router();
const encBase64 = require("crypto-js/enc-base64");
const SHA256 = require("crypto-js/sha256");

const User = require("../models/User");

router.post("/login", async (req, res) => {
  const { email, password } = req.fields;

  try {
    // If ther is no email or no password fields
    if (!email || !password) {
      res
        .status(400)
        .json({ message: "Please enter a valid email and password" });
    } else {
      const user = await User.findOne({ email: email });

      if (user) {
        const hash = SHA256(password + user.salt).toString(encBase64);

        if (user.hash === hash) {
          res.status(200).json({
            message: "User logged in successfully",
            token: user.token,
            _id: user._id,
          });
        } else {
          res.status(400).json({ message: "Invalid email or password" });
        }
      } else {
        res.status(400).json({ message: "Invalid email or password" });
      }
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
