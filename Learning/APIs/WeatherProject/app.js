const https = require("https");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const port = 3000;

const key = "cefd41f83846e9199cc0e883e8615026";

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  // console.log(req);
  res.sendFile(__dirname + "/index.html");

  // res.send("Hello there");
});

app.post("/", (req, res) => {
  // console.log(req.body);
  const { cityName } = req.body;

  const query = cityName;

  const units = "metric";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${key}&units=${units}`;

  https.get(url, (response) => {
    console.log("Status code: " + response.statusCode);

    response.on("data", (data) => {
      // console.log(data);

      const weatherData = JSON.parse(data);
      // console.log(weatherData);

      const { temp } = weatherData.main;
      const { description } = weatherData.weather[0];
      const { icon } = weatherData.weather[0];

      // console.log(temp);
      // console.log(description);

      const iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;

      res.write(`<p>The weather is currently ${description}</p>`);

      res.write(
        `<h1>The temperature in ${cityName} is ${temp} degrees celcius</h1>`
      );
      res.write(`<img src=${iconURL} />`);

      res.send();
    });
  });
});

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
