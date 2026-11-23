const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const prisma = require("./config/prisma");
const notesRoutes = require("./routes/notesRoutes");
const productRoutes = require("./routes/productRoutes");



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

// Connect Prisma to Neon PostgreSQL and start server
const startServer = async () => {
  try {
    // Connect Prisma to Neon
    await prisma.$connect();

    // Test database connection
    await prisma.$queryRaw`SELECT 1`;

    console.log("Prisma connected to Neon successfully!");

    // Start Express server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Prisma connection failed:", error.message);
    process.exit(1);
  }
};

startServer();