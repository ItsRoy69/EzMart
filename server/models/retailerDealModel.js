const mongoose = require("mongoose");

const retailerDealSchema = new mongoose.Schema({
  title: {
    type: String
  },
  product: {
    type: String
  },
  quantity: {
    type: Number
  },
  deal: {
    type: Number, // Adjust the type based on your needs
    required: true,
  },
});

const RetailerDeal = mongoose.model("RetailerDeal", retailerDealSchema);

module.exports = RetailerDeal;