import "dotenv/config";
import express from "express";
import router from "./routes/workouts.js";
import bodyParser from "body-parser";

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

////Route handlers
app.use("/api/workouts", router);

/////////////////////////////////////////////

// Listen for requests
app.listen(port, () => {
  console.log("Server running on port: " + port);
});
