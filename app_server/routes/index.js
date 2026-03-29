const express = require("express");
const router = express.Router();
const ctrlTravlr = require("../controllers/travlrControllers");

router.get("/travel", ctrlTravlr.travel);
router.get("/api/trips", ctrlTravlr.apiTrips);

module.exports = router;
