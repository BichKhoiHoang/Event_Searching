const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("views"));

app.set("view engine", "ejs");

const apiKey = "7yKfDEzaVU3HbSP4lSojvsK7E3GQA4eR";

const s3 = require("./s3.js");

// Define routes
app.get("/", async function (req, res, next) {
  const count = await s3.incrementVisitCount();

  res.render("index", { count });
});

app.post("/search", (req, res) => {
  const location = req.body.location;
  const apiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=7yKfDEzaVU3HbSP4lSojvsK7E3GQA4eR&keyword=${location}`;

  request(apiUrl, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const data = JSON.parse(body);
      const events = data._embedded ? data._embedded.events : [];

      res.render("results", { events });
    } else {
      res.send("Error fetching events");
    }
  });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
