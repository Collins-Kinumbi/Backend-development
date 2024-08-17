import express from "express";

const app = express();
const port = 3000;

//// Middleware
function bodyParser(req, res, next) {
  if ((req.method = "POST")) {
    req.on("data", (data) => {
      // console.log(data.toString("utf8"));
      const parsed = data.toString("utf8").split("&");
      const formData = {};
      for (let pair of parsed) {
        const [key, value] = pair.split("=");
        formData[key] = value;
      }
      // console.log(formData);
      req.body = formData;
      next();
    });
  } else {
    next();
  }
}

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

app.post("/", bodyParser, (req, res) => {
  console.log(req.body);
  res.send("Account created!");
});

/////////////////////////////////////////////

app.listen(port, () => {
  console.log("Server running on port: " + port);
});
