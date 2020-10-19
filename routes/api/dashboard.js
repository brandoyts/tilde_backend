const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth");
const dashboardController = require("../../controllers/dashboardController");

router.post("/add-guest", auth, dashboardController.addGuest);
router.get("/overview-data", auth, dashboardController.getOverviewData);

module.exports = router;
