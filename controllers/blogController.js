const mongoose = require("mongoose");
// const fileUpload = require("express-fileupload");
const fs = require("fs");
const Blog = require("../models/blogModel");
const expressAsyncHandler = require("express-async-handler");

// Create a new blog - working
const createBlog = expressAsyncHandler(async (req, res) => {
  console.log("Incoming file: ", req.file);
  try {
    const blog = new Blog({
      title: req.body.title,
      blogImage: req.file ? `../uploads/${req.file.filename}` : null, // Save relative path
      summary: req.body.summary,
      description: req.body.description,
      author: req.body.author,
      facebookLink: req.body.facebookLink,
      linkedInLink: req.body.linkedInLink,
      githubLink: req.body.githubLink,
    });
    await blog.save();
    res.status(200).json(blog);
    console.log(blog);
  } catch (error) {
    console.error("Error in file upload or saving blog:", error); // Log any errors
    res.status(500).json({
      message: error.message || "Unable to save blog post with image!",
    });
  }
});

//New added 10/28/2024

// const uploadsDir = path.join(__dirname, "../uploads");
// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir);
// }
// uploadPath = path.join(uploadsDir, blogImage.name);

// const createBlog = expressAsyncHandler(async (req, res) => {
//   console.log("Incoming file: ", req.file);

//   const { title, summary, description } = req.body; // Extract title, summary, and description from the request body
//   let blogImage;
//   let uploadPath;

//   if (!req.files || Object.keys(req.files).length === 0) {
//     return res.status(400).send("No files were uploaded.");
//   }

//   blogImage = req.files.blogImage;
//   // uploadPath = __dirname + `../uploads/${blogImage.filename}`;
//   uploadPath = __dirname + "/../uploads/" + blogImage.name;

//   // "../uploads/" + blogImage.name;

//   // Use the mv() method to place the file somewhere on your server
//   blogImage.mv(uploadPath, async function (err) {
//     if (err) return res.status(500).send(err);

//     // Here, add logic to save title, summary, description, and file path (uploadPath) to a database if needed
//     const newBlog = {
//       title,
//       summary,
//       description,
//       imagePath: uploadPath, // Store the path of the uploaded image
//     };

//     // Assuming you save `newBlog` in a database
//     try {
//       await blogImage.mv(uploadPath);
//       const newBlog = {
//         title,
//         summary,
//         description,
//         imagePath: uploadPath,
//       };
//       const savedBlog = await Blog.create(newBlog);
//       res.status(201).json(savedBlog);
//     } catch (err) {
//       console.error("Error details:", err);
//       res.status(500).send("Error saving blog data: " + err.message);
//     }
//   });
// });

// Read all blogs
const getAllBlogs = expressAsyncHandler(async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Read a single blog by ID
const getBlogById = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ error: `There is no such blog with this id:! ${id}` });
  }
  const blog = await Blog.findById(id);
  if (!blog) {
    return res.status(404).json({ error: "There is no such blog!" });
  }
  res.status(200).json(blog);
});

// Update a blog by ID
const updateBlog = expressAsyncHandler(async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // Update fields
    blog.title = req.body.title || blog.title;
    blog.summary = req.body.summary || blog.summary;
    blog.description = req.body.description || blog.description;

    if (req.file) {
      // Delete old image
      if (blog.blogImage) {
        fs.unlinkSync(blog.blogImage);
      }
      blog.blogImage = req.file.path; // Update image path
    }

    await blog.save();
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a blog by ID
const deleteBlog = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ error: `There is no such blog with this id:! ${id}` });
  }

  const blog = await Blog.findOneAndDelete({ _id: id });

  if (!blog) {
    return res.status(400).json({ error: "No such blog!" });
  }
  res.status(200).json({
    message: `Blog with an id of - [ ${id} ] - has been deleted!`,
  });
});

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
