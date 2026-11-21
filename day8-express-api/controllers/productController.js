const fs = require("fs");
const path = require("path");

let products = [];
let nextId = 1;

// GET all products
const getAllProducts = (req, res) => {
  res.status(200).json(products);
};

// GET single product
const getProductById = (req, res) => {
  const id = Number(req.params.id);

  const product = products.find((product) => product.id === id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  res.status(200).json(product);
};

// POST create product
const createProduct = (req, res) => {
  const { name, description, price, rating, category } = req.body;

  if (!name || !description || price === undefined || !rating || !category) {
    return res.status(400).json({
      message: "All product details are required",
    });
  }

  if (!req.file) {
    return res.status(400).json({
      message: "Product image is required",
    });
  }

  const newProduct = {
    id: nextId++,
    name,
    description,
    price: Number(price),
    rating: Number(rating),
    category,
    image: `/uploads/${req.file.filename}`,
  };

  products.push(newProduct);

  res.status(201).json({
    message: "Product created successfully",
    product: newProduct,
  });
};

// PUT update product
const updateProduct = (req, res) => {
  const id = Number(req.params.id);

  const product = products.find((product) => product.id === id);

  if (!product) {
    // If an image was uploaded for a nonexistent product,
    // remove that unused file.
    if (req.file) {
      fs.unlink(
        path.join(__dirname, "..", "uploads", req.file.filename),
        () => {}
      );
    }

    return res.status(404).json({
      message: "Product not found",
    });
  }

  const { name, description, price, rating, category } = req.body;

  if (name !== undefined) product.name = name;
  if (description !== undefined) product.description = description;
  if (price !== undefined) product.price = Number(price);
  if (rating !== undefined) product.rating = Number(rating);
  if (category !== undefined) product.category = category;

  // Update image if new image uploaded
  if (req.file) {
    const oldImage = product.image;

    product.image = `/uploads/${req.file.filename}`;

    // Delete previous image
    if (oldImage) {
      const oldImagePath = path.join(
        __dirname,
        "..",
        oldImage.replace(/^\//, "")
      );

      fs.unlink(oldImagePath, () => {});
    }
  }

  res.status(200).json({
    message: "Product updated successfully",
    product,
  });
};

// DELETE product
const deleteProduct = (req, res) => {
  const id = Number(req.params.id);

  const productIndex = products.findIndex(
    (product) => product.id === id
  );

  if (productIndex === -1) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  const deletedProduct = products.splice(productIndex, 1)[0];

  // Delete image from uploads folder
  if (deletedProduct.image) {
    const imagePath = path.join(
      __dirname,
      "..",
      deletedProduct.image.replace(/^\//, "")
    );

    fs.unlink(imagePath, () => {});
  }

  res.status(200).json({
    message: "Product deleted successfully",
    product: deletedProduct,
  });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};