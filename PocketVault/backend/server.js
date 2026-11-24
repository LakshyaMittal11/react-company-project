const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const db = require("./config/db");
const{sql} = require("drizzle-orm");
//import routes
const itemRoutes = require("./routes/itemRoutes");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.json({
    message: "PocketVault API is running"
  });
});
// Database Connection Test
app.get("/db-test", async (req, res) => {
  try {
    await db.execute(sql`SELECT 1`);
    res.json({
      message: "Database connected successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Database connection failed"
    });
  }
});
// item Routes
app.use("/api/items", itemRoutes);
// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});