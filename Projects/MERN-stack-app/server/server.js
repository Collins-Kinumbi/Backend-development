import "dotenv/config";
import express from "express";

const app = express();
const port = process.env.PORT;
/////////////////////////////////////////////

// Middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

/////////////////////////////////////////////

////Route handlers
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the app" });
});

/////////////////////////////////////////////

// Listen for requests
app.listen(port, () => {
  console.log("Server running on port: " + port);
});
