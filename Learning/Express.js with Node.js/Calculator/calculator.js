/////////////////////////////////////////////////////////
// ES6 syntax
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const app = express();

const port = 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  // res.send(`<h1>Hello world</h1>`);
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  // console.log(req.body);
  const num1 = Number(req.body.num1);
  const num2 = Number(req.body.num2);

  if (isNaN(num1) || isNaN(num2)) {
    res.send(`Please enter valid numbers`);
    return;
  }

  res.send(`Thanks for posting that, the result is ${num1 + num2}`);
});

// BMI Calculator challenge
app.get("/bmicalculator", (req, res) => {
  res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/bmicalculator", (req, res) => {
  console.log(req.body);

  const weight = parseFloat(req.body.weight);
  const height = parseFloat(req.body.height);

  if (isNaN(weight) || isNaN(height)) {
    res.send(`Please enter valid numbers`);
    return;
  }

  const bmi = weight / (height * height);

  res.send(`Thank you for your input, your BMI is ${bmi.toFixed(2)}`);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

/////////////////////////////////////////////////////////

//Common js syntax
///////////////////////////////////////////////////////
// const express = require("express");
// const bodyParser = require("body-parser");

// const app = express();

// const port = 3001;

// app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//   // console.log(req);
//   // res.send("<h1>Hello world</h1>");
//   // console.log(__dirname);
//   res.sendFile(__dirname + "/index.html");
// });

// app.post("/", (req, res) => {
//   console.log(req.body);

//   const num1 = Number(req.body.num1);
//   const num2 = Number(req.body.num2);

//   if (isNaN(num1) || isNaN(num2)) {
//     res.send(`Please enter valid numbers`);
//     return;
//   }

//   res.send(`Thanks for posting that, the result is ${num1 + num2}`);
// });

// //BMI calculator challenge
// app.get("/bmicalculator", (req, res) => {
//   res.sendFile(__dirname + "/bmiCalculator.html");
// });

// app.post("/bmicalculator", (req, res) => {
//   console.log(req.body);

//   const weight = parseFloat(req.body.weight);
//   const height = parseFloat(req.body.height);

//   if (isNaN(weight) || isNaN(height)) {
//     res.send(`Please enter valid numbers`);
//     return;
//   }

// const bmi = weight / (height * height);

//   res.send(`Thank you for your input, your BMI is ${bmi.toFixed(2)}`);

// });

// app.listen(port, () => {
//   console.log("Server started on port: " + port);
// });
/////////////////////////////////////////////////////////
