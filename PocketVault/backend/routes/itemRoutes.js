const express = require("express");

const {
  createItem,
  getItems,
  updateItem,
    deleteItem
} = require("../controllers/itemController");

const router = express.Router();
// Create Item 
router.post("/", createItem);
//read Items
router.get("/", getItems);
// Update Item
router.patch("/:id", updateItem);
// Delete Item
router.delete("/:id", deleteItem);

module.exports = router;