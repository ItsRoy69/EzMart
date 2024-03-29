const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  quality: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: Buffer,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const userPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  products: [productSchema], // Define an array of product items
  // You might want to include additional fields like retailerId and createdAt
});

const UserPost = mongoose.model("UserPost", userPostSchema);

module.exports = UserPost;
