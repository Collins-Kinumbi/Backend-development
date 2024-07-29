// ES6 syntax
/////////////////////////////////////////////////////////

import express from "express";

const app = express();

const port = 3000;

app.get("/", (req, res) => {
  // console.log(req);
  res.send("<h1>Hello</h1>");
});

app.get("/contact", (req, res) => {
  res.send("<h1>Contact page</h1>");
});

app.get("/about", (req, res) => {
  res.send(
    "<h2>Hello this is Collins Kinumbi, a self taught fullstack webdeveloper</h2>"
  );
});

app.get("/hobbies", (req, res) => {
  res.send(`<ul>
    <li> Coding </li>
    <li>Reading manga</li>
    </ul>`);
});

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});

///////////////////////////////////////////////////////

//Common js syntax
/////////////////////////////////////////////////////////
// const express = require("express");

// const app = express();

// const port = 3000;

// app.get("/", (req, res) => {
//   // console.log(req);
//   res.send("<h1>Hello there</h1>");
// });

// app.get("/contact", (req, res) => {
//   // console.log(req);
//   res.send("<h1>Contact me @webdev.gmail.com</h1>");
// });

// app.listen(port, () => {
//   console.log("Server started on port: " + port);
// });
/////////////////////////////////////////////////////////
