const express = require("express");
const router = express.Router();

// Model
const User = require("../models/User");

router.get("/user/:token", async (req, res) => {
  try {
    const user = await User.findOne({ token: req.params.token });
    res.json({ userId: user._id, name: user.name, email: user.email });
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.post("/user/update", async (req, res) => {
  try {
    const user = await User.findById(req.fields.userId);
    user.name = req.fields.name;
    await user.save();
    res.json(user);
  } catch (error) {
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
