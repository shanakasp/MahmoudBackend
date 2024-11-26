const express = require("express");

const {
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
  getBlogById,
} = require("../controllers/blogController");
const photoUpload = require("../middleware/photoUpload"); // Ensure this matches the export name

const router = express.Router();

// Blog Routes

// Create a new blog post, with image upload
router.post("/create", photoUpload.single("blogImage"), createBlog);

// Get the list of all blog posts
router.get("/list", getAllBlogs);

// Get a specific blog post by its ID
router.get("/list/:id", getBlogById);

// Update a specific blog post by its ID, with optional image upload
router.put("/:id", photoUpload.single("blogImage"), updateBlog);

// Delete a specific blog post by its ID
router.delete("/list/delete/:id", deleteBlog);

module.exports = router;
