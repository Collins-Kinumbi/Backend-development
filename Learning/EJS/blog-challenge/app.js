//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const _ = require("lodash");
const mongoose = require("mongoose");

const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Connecting to mongodb
const url = "mongodb://localhost:27017/blogPostsDB";
mongoose.connect(url);

// Create posts schema
const postsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please ensure you entered an Item."],
  },
  content: {
    type: String,
    required: [true, "Please ensure you entered an Item."],
  },
});

// Model for posts
const Post = mongoose.model("Post", postsSchema);

//Save one post
async function save(item) {
  try {
    await item.save();
    console.log("Item saved successfully!");
  } catch (err) {
    console.log(err);
  }
}

// Home page
app.get("/", (req, res) => {
  async function find() {
    try {
      const posts = await Post.find();
      res.render("home", {
        homeContent: homeStartingContent,
        postItems: posts.reverse(),
      });
    } catch (err) {
      console.log(err);
    }
  }
  find();
});
////////////////////////////////////////////////////

// About page
app.get("/about", (req, res) => {
  res.render("about", { aboutContent: aboutContent });
});
////////////////////////////////////////////////////

// Contact page
app.get("/contact", (req, res) => {
  res.render("contact", { contactContent: contactContent });
});
////////////////////////////////////////////////////

// Compose page
app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {
  // console.log(req.body.postTitle);
  // console.log(req.body.postBody);

  const { postTitle, postContent } = req.body;

  const post = new Post({
    title: postTitle,
    content: postContent,
  });

  save(post);

  res.redirect("/");
});
////////////////////////////////////////////////////

// Dynamic routes
app.get("/posts/:postId", (req, res) => {
  // console.log(req.params);
  const requestedPostId = req.params.postId;

  async function findOne(obj) {
    try {
      const foundPost = await Post.findOne(obj);
      // console.log("match found");
      res.render("post", {
        title: foundPost.title,
        content: foundPost.content,
      });
    } catch (err) {
      console.log(err);
    }
  }
  findOne({ _id: requestedPostId });
});

////////////////////////////////////////////////////

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
