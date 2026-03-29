const mongoose = require("mongoose");
const Trip = mongoose.model("trips");

const travel = async (req, res) => {
  try {
    const trips = await Trip.find().lean().exec();

    res.render("travel", {
      title: "Travlr Getaways",
      trips,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const apiTrips = async (req, res) => {
  try {
    const trips = await Trip.find().exec();
    res.status(200).json(trips);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  travel,
  apiTrips,
};
