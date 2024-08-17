import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

//// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

/////////////////////////////////////////////

//// Route Handlers
// Home page
app.get("/", (req, res) => {
  res.send(`
    <div>
     <form method = "POST">
       <input name="email" placeholder="email" />

       <input type="password" name="password" placeholder="password" />

       <input type="password"  name="passwordConfirmation" placeholder="password confirmation" />

       <button>Sign up</button>
     </form>
    </div>
    `);
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.send("Account created!");
});

/////////////////////////////////////////////

app.listen(port, () => {
  console.log("Server running on port: " + port);
});
