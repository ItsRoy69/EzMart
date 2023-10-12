const express = require("express");
const { createDeals, fetchDeals } = require("../controllers/deal.controller");
const router = express.Router();

// Route for creating a Deal
router.post("/create-deal", createDeals);
router.get("/deal", fetchDeals);
module.exports = router;
