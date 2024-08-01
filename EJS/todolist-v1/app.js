const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  // res.send("Hello there");
  const today = new Date();
  const currentDay = today.getDay();

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = "";

  if (currentDay === 6 || currentDay === 0) {
    day = dayNames[currentDay];
    // res.render("list", { kindOfDay: day });
  } else {
    day = dayNames[currentDay];
    // res.render("list", { kindOfDay: day });
  }

  res.render("list", { kindOfDay: day });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
