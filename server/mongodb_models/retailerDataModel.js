const mongoose = require("mongoose");

const retailerDataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  retailerId: {
    type: String,
    required: true,
    unique: true,
  },
  walletAddress: {
    type: String,
    required: true,
  },
  role: {
    type: String, // Assuming the role is stored as a string
    required: true,
    enum: ["distributor", "retailer"], // List of possible roles
  },
});

const RetailerData = mongoose.model("RetailerData", retailerDataSchema);

module.exports = RetailerData;
