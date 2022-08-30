const mongoose = require("mongoose");

const Task = mongoose.model("Task", {
  title: String,
  creator: String,
  assignedTo: String,
  targetDate: String,
  priority: Boolean,
  estimatedTime: String,
  done: Boolean,
});

module.exports = Task;
