// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api", (req, res) => {
  const date = new Date();
  // empty date parameter
  return res.status(200).json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// Custom routes
app.get("/api/:given_data", (req, res) => {
  const { given_data } = req.params;
  let date = new Date(given_data);

  // check if given date is in string as it is string first convert it to number to check if it is unix type date
  if (date.toString() === "Invalid Date") {
    date = new Date(parseInt(given_data));
  }
  // if the date is still Invalid then send error
  if (date.toString() === "Invalid Date") {
    return res.status(400).json({
      error: "Invalid Date",
    });
  }
  return res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

const PORT = 3000 || process.env.PORT;

// listen for requests :)
var listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
