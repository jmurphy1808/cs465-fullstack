const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

const dbURI = "mongodb://127.0.0.1:27017/travlr";
const tripsPath = path.join(__dirname, "app_server", "data", "trips.json");

mongoose.connect(dbURI);

require("./app_server/models/travlr");

const Trip = mongoose.model("trips");
const trips = JSON.parse(fs.readFileSync(tripsPath, "utf8"));

mongoose.connection.on("connected", async () => {
  try {
    await Trip.deleteMany({});
    await Trip.insertMany(trips);
    console.log("Trips collection successfully seeded.");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    mongoose.connection.close();
  }
});

mongoose.connection.on("error", (err) => {
  console.error("Database connection error:", err);
});
