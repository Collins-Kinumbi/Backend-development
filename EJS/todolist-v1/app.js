const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const port = 3000;

let items = ["buy food", "cook food", "eat food"];

app.use(bodyParser.urlencoded({ extended: true }));

// Serving up static files
app.use(express.static("public"));

app.set("view engine", "ejs");

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

  res.render("list", { kindOfDay: day, newListItems: items });
});

app.post("/", (req, res) => {
  // console.log(req.body);
  const { newItem } = req.body;

  items.push(newItem);

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
