const express = require("express");
const router = express.Router();

// Model
const User = require("../models/User");

router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    const newUsers = [];

    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const newUser = {
        _id: user._id,
        email: user.email,
      };
      newUsers.push(newUser);
    }

    res.json(newUsers);
  } catch (error) {
    res.status(400).json(error.message);
  }
});
module.exports = router;
