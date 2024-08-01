const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

const port = 3000;

const items = ["buy food", "cook food", "eat food"];
const workItems = [];

app.use(bodyParser.urlencoded({ extended: true }));

// Serving up static files
app.use(express.static("public"));

app.set("view engine", "ejs");

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
