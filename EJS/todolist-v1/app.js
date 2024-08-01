const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const port = 3000;

let items = ["buy food", "cook food", "eat food"];
let workItems = [];

app.use(bodyParser.urlencoded({ extended: true }));

// Serving up static files
app.use(express.static("public"));

app.set("view engine", "ejs");

// Home route
app.get("/", (req, res) => {
  // res.send("Hello there");
  const today = new Date();

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  let day = today.toLocaleString("en-US", options);

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
