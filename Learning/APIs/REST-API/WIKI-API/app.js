import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.set("view engine", "ejs");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
////////////////////////////////////////////

//// Database
// Connect to DB
const url = "mongodb://localhost:27017/wikiDB";
mongoose.connect(url);

// Articles Schema
const articlesSchema = new mongoose.Schema({
  title: String,
  content: String,
});

// Articles model
const Article = mongoose.model("Artcle", articlesSchema);

app.listen(port, () => {
  console.log("Server running on port:" + port);
});
