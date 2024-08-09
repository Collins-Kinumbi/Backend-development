//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.set("view engine", "ejs");

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
///////////////////////////////////////////////

// Routes
// Home page
app.get("/", (req, res) => {
  res.render("home");
});

// Login page
app.get("/login", (req, res) => res.render("login"));

// Register page
app.get("/register", (req, res) => res.render("register"));

///////////////////////////////////////////////

app.listen(port, () => {
  console.log("Server running on port: " + port);
});
