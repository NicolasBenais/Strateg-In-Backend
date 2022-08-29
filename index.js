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

// User
const userRoutes = require("./routes/user");
app.use(userRoutes);

// Users
const usersRoutes = require("./routes/users");
app.use(usersRoutes);

app.all("*", (req, res) => {
  res.status(400).json("Page introuvable");
});

app.listen(process.env.PORT, () => {
  console.log("Serveur started");
});
