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
  title: {
    type: String,
    required: true,
    minlength: 3,
  },
  content: {
    type: String,
    required: true,
  },
});

// Articles model
const Article = mongoose.model("Artcle", articlesSchema);

/////////////////////////////////////////////

app
  .route("/articles")
  // GET all articles
  .get(async (req, res) => {
    try {
      const foundArticles = await Article.find();
      // console.log(foundArticles);
      res.send(foundArticles);
    } catch (err) {
      // console.log(err);
      res.status(!200).send("An error occured while fetching articles");
    }
  })
  // POST a new article
  .post(async (req, res) => {
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
      res.status(!200).send("An error occured while adding article");
    }
  })
  // DELETE all articles
  .delete(async (req, res) => {
    try {
      await Article.deleteMany();
      res.send("Successfully deleted all articles");
    } catch (err) {
      // console.log(err);
      res.status(!200).send("An error occured while deleting articles");
    }
  });

app.listen(port, () => {
  console.log("Server running on port:" + port);
});
