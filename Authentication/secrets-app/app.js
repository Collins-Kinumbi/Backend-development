//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");

const app = express();
const port = 3000;

app.set("view engine", "ejs");

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
///////////////////////////////////////////////

// connect to database
const url = "mongodb://localhost:27017/userDB";

mongoose.connect(url);

// User schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please ensure you entered an email."],
  },
  password: {
    type: String,
    required: [true, "Please ensure you entered a password."],
  },
});

// Secret string
const secret = "FireAndBlood.";
// plugin
userSchema.plugin(encrypt, { secret: secret, encryptedFields: ["password"] });

// User model
const User = new mongoose.model("User", userSchema);

///////////////////////////////////////////////

// Routes
// Home page
app.get("/", (req, res) => {
  res.render("home");
});

// Login page
app.get("/login", (req, res) => res.render("login"));

app.post("/login", (req, res) => {
  // console.log(req.body);
  // Distructuring data from login form
  const { userEmail, password } = req.body;

  // Query user db for user and render secrets page if credentials match
  async function find(obj) {
    try {
      const foundUser = await User.findOne(obj);
      if (foundUser) {
        console.log(foundUser);
        if (foundUser.password === password) {
          res.render("secrets");
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  find({ email: userEmail });
});

// Register page
app.get("/register", (req, res) => res.render("register"));

app.post("/register", (req, res) => {
  // console.log(req.body);
  // Distructuring data from register form
  const { userEmail, password } = req.body;

  // Creating new user
  const newUser = new User({
    email: userEmail,
    password: password,
  });

  // console.log(newUser);

  // Save user to db
  async function save(user) {
    try {
      await user.save();
      // render secrets page
      res.render("secrets");
    } catch (err) {
      console.log(err);
    }
  }
  save(newUser);
});

///////////////////////////////////////////////

app.listen(port, () => {
  console.log("Server running on port: " + port);
});
