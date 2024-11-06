const express = require("express");
const { connectDB, getCollection } = require("./config/db");
const reviewRoutes = require("./routes/reviewRoutes");
const dotenv = require("dotenv");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
connectDB()
  .then(() => {
    app.use("/", reviewRoutes);

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
