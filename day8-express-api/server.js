const express = require("express");
const dotenv = require("dotenv");

const notesRoutes = require("./routes/notesRoutes");
const productRoutes = require("./routes/productRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Uploaded images serve करना
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/notes", notesRoutes);
app.use("/api/products", productRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("Day 8 Express API is running!");
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});