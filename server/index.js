const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const colors = require("colors");
const connectDB = require("./mongodb_config");

const authRoute = require("./routes/authroute");
const postRoute = require("./routes/postroute");

const port = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use("/auth", authRoute);
app.use("/posts", postRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong" });
});

// Start the server
connectDB()
  .then(() => {
    app.listen(port, () =>
      console.log(`Server started on port ${port}`.green)
    );
  })
  .catch((error) => {
    console.error("Error connecting to the database:".red, error);
  });
