const mongoose = require("mongoose");

const retailerPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  product: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  // You might want to include additional fields like retailerId and createdAt
});

const RetailerPost = mongoose.model("RetailerPost", retailerPostSchema);

module.exports = RetailerPost;
