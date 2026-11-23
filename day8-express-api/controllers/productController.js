
const fs = require("fs");
const path = require("path");
const prisma = require("../config/prisma");

// Delete uploaded image
const deleteImage = (image) => {
  if (!image) return;

  const filename = path.basename(image);
  const imagePath = path.join(__dirname, "..", "uploads", filename);

  fs.unlink(imagePath, (err) => {
    if (err && err.code !== "ENOENT") {
      console.error("Image deletion failed:", err.message);
    }
  });
};

// GET all products
const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { id: "asc" }
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: "Database error",
      error: error.message
    });
  }
};

// GET single product
const getProductById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
      return res.status(400).json({
        message: "Invalid product ID"
      });
    }

    const product = await prisma.product.findUnique({
      where: { id }
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: "Database error",
      error: error.message
    });
  }
};

// POST create product
const createProduct = async (req, res) => {
  try {
    const { name, description, price, rating, category } = req.body;

    if (
      !name ||
      !description ||
      price === undefined ||
      rating === undefined ||
      !category ||
      !Number.isFinite(Number(price)) ||
      !Number.isFinite(Number(rating))
    ) {
      if (req.file) deleteImage(req.file.filename);

      return res.status(400).json({
        message: "Valid product details are required"
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Product image is required"
      });
    }

    const image = `/uploads/${req.file.filename}`;

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: Number(price),
        rating: Number(rating),
        category,
        image
      }
    });

    res.status(201).json({
      message: "Product created successfully",
      product
    });

  } catch (error) {
    if (req.file) deleteImage(req.file.filename);

    res.status(500).json({
      message: "Database error",
      error: error.message
    });
  }
};

// PUT update product
const updateProduct = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
      if (req.file) deleteImage(req.file.filename);

      return res.status(400).json({
        message: "Invalid product ID"
      });
    }

    const existingProduct = await prisma.product.findUnique({
      where: { id }
    });

    if (!existingProduct) {
      if (req.file) deleteImage(req.file.filename);

      return res.status(404).json({
        message: "Product not found"
      });
    }

    const { name, description, price, rating, category } = req.body;

    const newName = name ?? existingProduct.name;
    const newDescription = description ?? existingProduct.description;
    const newPrice = price ?? existingProduct.price;
    const newRating = rating ?? existingProduct.rating;
    const newCategory = category ?? existingProduct.category;

    if (
      !newName ||
      !newDescription ||
      !newCategory ||
      !Number.isFinite(Number(newPrice)) ||
      !Number.isFinite(Number(newRating))
    ) {
      if (req.file) deleteImage(req.file.filename);

      return res.status(400).json({
        message: "Valid product details are required"
      });
    }

    const newImage = req.file
      ? `/uploads/${req.file.filename}`
      : existingProduct.image;

    const product = await prisma.product.update({
      where: { id },
      data: {
        name: newName,
        description: newDescription,
        price: Number(newPrice),
        rating: Number(newRating),
        category: newCategory,
        image: newImage
      }
    });

    // Delete old image after successful update
    if (req.file && existingProduct.image) {
      deleteImage(existingProduct.image);
    }

    res.status(200).json({
      message: "Product updated successfully",
      product
    });

  } catch (error) {
    if (req.file) deleteImage(req.file.filename);

    res.status(500).json({
      message: "Database error",
      error: error.message
    });
  }
};

// DELETE product
const deleteProduct = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
      return res.status(400).json({
        message: "Invalid product ID"
      });
    }

    const product = await prisma.product.findUnique({
      where: { id }
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    const deletedProduct = await prisma.product.delete({
      where: { id }
    });

    if (deletedProduct.image) {
      deleteImage(deletedProduct.image);
    }

    res.status(200).json({
      message: "Product deleted successfully",
      product: deletedProduct
    });

  } catch (error) {
    res.status(500).json({
      message: "Database error",
      error: error.message
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
