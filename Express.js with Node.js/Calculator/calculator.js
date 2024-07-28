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

  res.send(`Thanks for posting that, the result is ${num1 + num2}`);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
