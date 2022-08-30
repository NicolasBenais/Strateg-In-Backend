const express = require("express");
const router = express.Router();
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

// Model
const User = require("../models/User");

router.get("/user/:userId", async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.userId });
    res.json({
      userId: user._id,
      name: user.name,
      surname: user.surname,
      email: user.email,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.post("/user/update", async (req, res) => {
  const { userId, name, surname, password } = req.fields;

  try {
    const user = await User.findById(userId);
    user.name = name;
    user.surname = surname;

    if (password) {
      const newSalt = uid2(64);
      const newHash = SHA256(password + newSalt).toString(encBase64);
      user.hash = newHash;
      user.salt = newSalt;
    }

    await user.save();
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
});

router.post("/user/delete", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.fields._id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(400).json(error.message);
  }
});
module.exports = router;
