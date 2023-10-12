const RetailerPost = require("../mongodb_models/retailerPostModel");

const createPost = async (req, res) => {
  try {
    // Get post data from the request body
    const { title, product, quantity } = req.body;

    // Create a new RetailerPost document
    const newPost = new RetailerPost({
      title,
      product,
      quantity,
      // You might also need to associate the post with the retailer who created it
      // retailerId: req.user._id, // Assuming you have user authentication implemented
    });

    // Save the new post to the database
    await newPost.save();

    res.status(201).json({ message: "Retailer post created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while creating the post" });
  }
};

const fetchPosts = async (req, res) => {
  try {
    // Fetch all retailer posts from the database
    const posts = await RetailerPost.find();

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching posts" });
  }
};



module.exports = { createPost, fetchPosts };
