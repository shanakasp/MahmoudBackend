const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();
const mongoSanitize = require("express-mongo-sanitize");
// const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");

const express = require("express");

const cors = require("cors");

const blogRoute = require("./routes/blogRoute");

//express app
const app = express();
//middleware
app.use(cors());

// To remove data using these defaults:
app.use(mongoSanitize());
// Middleware
app.use(bodyParser.json());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

/*blog route*/
app.use("/api/blogs", blogRoute);

app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve static files from the uploads folder

//Listen Port
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Listening on port: ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
    res.status(500).json({
      status: "error",
      message: "Failed to connect to the database",
      error: error.message,
    });
  });
