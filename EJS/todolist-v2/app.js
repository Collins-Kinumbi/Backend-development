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

//Save one item
async function save(item) {
  try {
    await item.save();
    console.log("Item saved successfully!");
  } catch (err) {
    console.log(err);
  }
}

// Delete item
async function deleteItem(obj) {
  try {
    await Item.deleteOne(obj);
    console.log("Item deleted successfully!");
  } catch (err) {
    console.log(err);
  }
}

////////////////////////////////////////////////

// Home route
app.get("/", (req, res) => {
  // res.send("Hello there");

  const day = date();

  // Find and log all items
  async function find() {
    try {
      const items = await Item.find();

      if (items.length === 0) {
        insertMany(defaultItems);
        // console.log(items);
        res.redirect("/");
      } else {
        res.render("list", { listTitle: day, newListItems: items });
      }
    } catch (err) {
      console.log(err);
    }
  }

  find();
});

app.post("/", (req, res) => {
  // console.log(req.body);

  // if (list === "Work") {
  //   workItems.push(newItem);
  //   res.redirect("/work");
  // } else {
  //   items.push(newItem);
  //   res.redirect("/");
  // }

  const { newItem, list } = req.body;

  const item = new Item({
    name: newItem,
  });

  save(item);

  res.redirect("/");
});

app.post("/delete", (req, res) => {
  // console.log(req.body);

  const { checkbox: checkedItemId } = req.body;
  // console.log(checkedItemId);

  deleteItem({ _id: checkedItemId });

  res.redirect("/");
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
