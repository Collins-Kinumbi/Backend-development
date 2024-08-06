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

// Model for items
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

// List Schema for the dynamic route
const listSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please ensure you entered an Item."],
  },
  items: [itemsSchema],
});

// Model for list
const List = mongoose.model("List", listSchema);

////////////////////////////////////////////////
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
// Default list name
const day = date();

// Home route
app.get("/", (req, res) => {
  // res.send("Hello there");

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

// Dynamic routing
app.get("/:listName", (req, res) => {
  // console.log(req.params);

  const listName = req.params.listName;

  async function findOne(obj) {
    try {
      const foundList = await List.findOne(obj);
      if (foundList) {
        // console.log("Found one!");

        //Show existing list
        res.render("list", {
          listTitle: foundList.name,
          newListItems: foundList.items,
        });
      } else {
        // console.log("Not found!");

        // Create new list
        const list = new List({
          name: listName,
          items: defaultItems,
        });

        save(list);

        res.redirect(`/${listName}`);
      }
    } catch (err) {
      console.log(err);
    }
  }

  findOne({ name: listName });
});

////////////////////////////////////////////////

app.post("/", (req, res) => {
  // console.log(req.body);

  const { newItem, list: listName } = req.body;

  const item = new Item({
    name: newItem,
  });

  if (listName === day) {
    save(item);
    res.redirect("/");
  } else {
    async function findOne(obj) {
      try {
        const foundList = await List.findOne(obj);
        if (foundList) {
          foundList.items.push(item);
          save(foundList);
          res.redirect(`/${listName}`);
        }
      } catch (err) {
        console.log(err);
      }
    }
    findOne({ name: listName });
  }
});

////////////////////////////////////////////////

// delete
app.post("/delete", async (req, res) => {
  // console.log(req.body);

  const { checkbox: checkedItemId, listName } = req.body;
  // console.log(checkedItemId);

  if (listName === day) {
    await deleteItem({ _id: checkedItemId });
    res.redirect("/");
  } else {
    try {
      await List.findOneAndUpdate(
        { name: listName },
        { $pull: { items: { _id: checkedItemId } } }
      );
      res.redirect(`/${listName}`);
    } catch (err) {
      console.log("Error:", err);
      res.redirect(`/${listName}`);
    }
  }
});

////////////////////////////////////////////////////

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
