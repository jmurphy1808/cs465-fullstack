const fs = require("fs");
const path = require("path");

const tripsPath = path.join(__dirname, "..", "data", "trips.json");
const trips = JSON.parse(fs.readFileSync(tripsPath, "utf8"));

const travel = (req, res) => {
  res.render("travel", {
    title: "Travlr Getaways",
    trips,
  });
};

module.exports = {
  travel,
};
