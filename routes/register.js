const express = require("express");
const router = express.Router();
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

const User = require("../models/User");

router.post("/register", async (req, res) => {
  const { email, password } = req.fields;

  try {
    // If there is no email or no password fields
    if (!email || !password) {
      res
        .status(400)
        .json({ message: "Please enter a valid email and password" });
    } else {
      const user = await User.findOne({ email: email });

      //   If the user is already registered
      if (user) {
        res.status(400).json({ message: "User already exist" });
      } else {
        const salt = uid2(64);
        const hash = SHA256(password + salt).toString(encBase64);
        const token = uid2(64);

        const newUser = new User({
          email,
          salt,
          hash,
          token,
        });
        await newUser.save();

        res.json({ message: "Account created" });
      }
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
