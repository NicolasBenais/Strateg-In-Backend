const express = require("express");
const router = express.Router();

// Model
const User = require("../models/User");

router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
