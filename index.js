require("dotenv").config();
const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(formidable());

mongoose.connect(process.env.MONGODB_URI);

// Register
const registerRoutes = require("./routes/register");
app.use(registerRoutes);

// Login
const loginRoutes = require("./routes/login");
app.use(loginRoutes);

// Users
const userRoutes = require("./routes/users");
app.use(userRoutes);

app.all("*", (req, res) => {
  res.status(400).json("Page introuvable");
});

app.listen(process.env.PORT, () => {
  console.log("Serveur started");
});
