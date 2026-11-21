const express = require("express");

const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// GET all products
router.get("/", getAllProducts);

// GET single product
router.get("/:id", getProductById);

// POST product with image
router.post("/", upload.single("image"), createProduct);

// PUT update product with optional image
router.put("/:id", upload.single("image"), updateProduct);

// DELETE product
router.delete("/:id", deleteProduct);

module.exports = router;