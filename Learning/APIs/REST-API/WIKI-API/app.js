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

// Requests targeting all articles

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

///////////////////////////////////////////

// Requests targeting specific articles
app
  .route("/article/:articleTitle")
  // GET specific article
  .get(async (req, res) => {
    // console.log(req.params);
    const { articleTitle } = req.params;
    try {
      const foundArticle = await Article.findOne({ title: articleTitle });
      if (foundArticle) {
        res.send(foundArticle);
      } else {
        res.send("No articles matching that title was found!");
      }
    } catch (err) {
      res.status(!200).send("An error occured while fetching article");
    }
  })
  // PUT specific article
  .put(async (req, res) => {
    const { articleTitle } = req.params;
    const { title, content } = req.body;
    try {
      await Article.updateOne(
        {
          title: articleTitle,
        },
        { title: title, content: content },
        { overwriteDiscriminatorKey: true }
      );
    } catch (err) {
      res.status(!200).send("An error occured while updating the article");
    }
  });

/////////////////////////////////////////////

app.listen(port, () => {
  console.log("Server running on port:" + port);
});
