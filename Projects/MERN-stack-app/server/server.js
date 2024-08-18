import "dotenv/config";
import express from "express";
import router from "./routes/workouts.js";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();
const port = process.env.PORT;
/////////////////////////////////////////////

// Middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
/////////////////////////////////////////////

//// Connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // Listening for requests
    app.listen(port, () => {
      console.log("connected to db and server running on port: " + port);
    });
  })
  .catch((err) => {
    console.log(err);
  });

/////////////////////////////////////////////
////Route handlers
app.use("/api/workouts", router);
