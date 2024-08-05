const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");

const app = express();

const port = 3000;

// const items = ["buy food", "cook food", "eat food"];
// const workItems = [];

app.use(bodyParser.urlencoded({ extended: true }));

// Serving up static files
app.use(express.static("public"));

app.set("view engine", "ejs");
////////////////////////////////////////////////

// Connecting to mongodb
const url = "mongodb://localhost:27017/todolistDB";
mongoose.connect(url);

// items Schema
const itemsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please ensure you entered an Item."],
  },
});

// Model
const Item = mongoose.model("Item", itemsSchema);

// Creating mongoose document(s)
const item1 = new Item({
  name: "Get gaming pc parts",
});

const item2 = new Item({
  name: "Assemble gaming pc parts",
});

const item3 = new Item({
  name: "Turn it on and start gaming!",
});

const defaultItems = [item1, item2, item3];

//Insert into Items collection
async function insertMany(arr) {
  try {
    await Item.insertMany(arr);
    console.log("Items saved successfully");
  } catch (err) {
    console.log(err);
  }
}

insertMany(defaultItems);

////////////////////////////////////////////////

// Home route
app.get("/", (req, res) => {
  // res.send("Hello there");

  const day = date();

  res.render("list", { listTitle: day, newListItems: items });
});

app.post("/", (req, res) => {
  // console.log(req.body);

  const { newItem } = req.body;

  if (req.body.list === "Work") {
    workItems.push(newItem);
    res.redirect("/work");
  } else {
    items.push(newItem);
    res.redirect("/");
  }
});
////////////////////////////////////////////////////

// Work route
app.get("/work", (req, res) => {
  res.render("list", { listTitle: "Work list", newListItems: workItems });
});

////////////////////////////////////////////////////

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
