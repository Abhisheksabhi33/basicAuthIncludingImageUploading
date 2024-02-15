const express = require("express")
const app = express()
const userRoutes = require("./userRoutes")

// const jwt = require("jsonwebtoken");

app.get("/logout", (req, res) => {
  return res.clearCookie("access_token").send("access token cleared");
});

app.get("/hii", (req, res) => {
  res.json({ message: "server running..." });
});

// Use the user routes defined in userRoutes.js
app.use(userRoutes);


module.exports = app