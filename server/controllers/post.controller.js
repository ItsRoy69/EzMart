const UserPost = require("../models/userPostModel");

const createPost = async (req, res) => {
    try {
        // Get post data from the request body
        const { title, products } = req.body;

        // Check if "products" is an array
        if (Array.isArray(products)) {
            // Create a new UserPost document
            const newUserPost = new UserPost({
                title,
                products: products.map((product) => ({
                    name: product.name,
                    quantity: product.quantity,
                    image: product.image,
                    type: product.type,
                    description: product.description,
                    quality: product.quality,
                    price: product.price,
                })),
                // You might also need to associate the post with the user who created it
                // userId: req.user._id, // Assuming you have user authentication implemented
            });

            // Save the new post to the database
            await newUserPost.save();

            res.status(201).json({ message: "User post created successfully" });
        } else {
            res.status(400).json({ error: "Invalid 'products' data format" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while creating the post" });
    }
};


const fetchPosts = async (req, res) => {
    try {
        // Fetch all user posts from the database
        const posts = await UserPost.find();

        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching posts" });
    }
};

module.exports = { createPost, fetchPosts };
