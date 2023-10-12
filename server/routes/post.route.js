const express = require("express");
const { createPost, fetchPosts } = require("../controllers/post.controller");
const router = express.Router();

// Route for creating a post
router.post("/create-post", createPost);

// Route for fetching all posts
router.get("/", fetchPosts);

module.exports = router;
