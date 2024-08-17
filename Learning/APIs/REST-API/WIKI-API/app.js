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

/////////////////////////////////////////////

// GET all articles
app.get("/articles", async (req, res) => {
  try {
    const foundArticles = await Article.find({});
    // console.log(foundArticles);
    res.send(foundArticles);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

// POST an article
app.post("/articles", async (req, res) => {
  const { title, content } = req.body;
  // console.log(title, content);
  const newArticle = new Article({
    title: title,
    content: content,
  });
  try {
    await newArticle.save();
    res.send("Successfully added a new article");
  } catch (err) {
    // console.log(err);
    res.send(err);
  }
});

app.listen(port, () => {
  console.log("Server running on port:" + port);
});
