const express = require("express");
const router = express.Router();

// Model
const Task = require("../models/Task");

router.post("/task/create", async (req, res) => {
  const {
    title,
    creator,
    assignedTo,
    targetDate,
    priority,
    estimatedTime,
    done,
  } = req.fields;

  try {
    const newTask = new Task({
      title,
      creator,
      assignedTo,
      targetDate,
      priority,
      estimatedTime,
      done,
    });
    await newTask.save();

    res.json({ message: "Task created", task: { newTask } });
  } catch (error) {
    console.log(error);
  }
});

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.post("/task/update", async (req, res) => {
  const { id, title, assignedTo, targetDate, priority, estimatedTime, done } =
    req.fields;

  try {
    const task = await Task.findById(id);
    task.title = title;
    task.assignedTo = assignedTo;
    task.targetDate = targetDate;
    task.priority = priority;
    task.estimatedTime = estimatedTime;
    task.done = done;

    await task.save();

    res.json(task);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.fields._id);
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

router.post("/task/delete", deleteTask);

module.exports = router;
