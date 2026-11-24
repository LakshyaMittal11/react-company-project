const db = require("../config/db");
const { items } = require("../db/schema");
const { eq } = require("drizzle-orm");

// Create Item (POST)
const createItem = async (req, res) => {
  try {
    const { title, url, category, notes } = req.body;

    if (!title || !category) {
      return res.status(400).json({
        message: "Title and category are required"
      });
    }

    const newItem = await db
      .insert(items)
      .values({
        title,
        url,
        category,
        notes
      })
      .returning();

    res.status(201).json({
      message: "Item created successfully",
      data: newItem[0]
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create item"
    });
  }
};

// Get Items (GET)
const getItems = async (req, res) => {
  try {
    const { category } = req.query;

    let allItems;

    if (category) {
      allItems = await db
        .select()
        .from(items)
        .where(eq(items.category, category));
    } else {
      allItems = await db
        .select()
        .from(items);
    }

    res.status(200).json(allItems);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch items"
    });
  }
};
// Update Item (PATCH)
const updateItem = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const { isFavorite, isArchived } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        message: "Invalid item ID"
      });
    }

    const updateData = {};

    if (typeof isFavorite === "boolean") {
      updateData.isFavorite = isFavorite;
    }

    if (typeof isArchived === "boolean") {
      updateData.isArchived = isArchived;
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        message: "Provide a valid field to update"
      });
    }

    const updatedItem = await db
      .update(items)
      .set(updateData)
      .where(eq(items.id, id))
      .returning();

    if (updatedItem.length === 0) {
      return res.status(404).json({
        message: "Item not found"
      });
    }

    res.status(200).json({
      message: "Item updated successfully",
      data: updatedItem[0]
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update item"
    });
  }
};
// Delete Item (DELETE)
const deleteItem = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        message: "Invalid item ID"
      });
    }

    const deletedItem = await db
      .delete(items)
      .where(eq(items.id, id))
      .returning();

    if (deletedItem.length === 0) {
      return res.status(404).json({
        message: "Item not found"
      });
    }

    res.status(200).json({
      message: "Item deleted successfully"
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete item"
    });
  }
};
module.exports = {
    updateItem,
  deleteItem,
  createItem,
  getItems
};