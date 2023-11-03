const mongoose = require("mongoose");

const userDataSchema = new mongoose.Schema({
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
  authorisedId: {
    type: String,
    required: true,
    unique: true,
  },
  walletAddress: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["distributor", "retailer"],
  },
});

const userData = mongoose.model("UserData", userDataSchema);

module.exports = userData;