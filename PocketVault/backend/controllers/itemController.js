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

    const {
      title,
      url,
      category,
      notes,
      isFavorite,
      isArchived
    } = req.body;


    // Validate ID
    if (!Number.isInteger(id) || id <= 0) {

      return res.status(400).json({
        message: "Invalid item ID"
      });

    }


    const updateData = {};


    // Update Title
    if (title !== undefined) {

      if (
        typeof title !== "string" ||
        !title.trim() ||
        title.trim().length > 255
      ) {

        return res.status(400).json({
          message: "Title must contain 1 to 255 characters"
        });

      }

      updateData.title = title.trim();

    }


    // Update URL
    if (url !== undefined) {

      if (typeof url !== "string") {
        return res.status(400).json({
          message: "Invalid URL"
        });
      }

      updateData.url = url.trim();

    }


    // Update Category
    if (category !== undefined) {

      const validCategories = [
        "Read Later",
        "Work",
        "Personal",
        "Idea"
      ];

      if (!validCategories.includes(category)) {

        return res.status(400).json({
          message: "Invalid category"
        });

      }

      updateData.category = category;

    }


    // Update Notes
    if (notes !== undefined) {

      if (typeof notes !== "string") {
        return res.status(400).json({
          message: "Invalid notes"
        });
      }

      updateData.notes = notes.trim();

    }


    // Update Favorite
    if (isFavorite !== undefined) {

      if (typeof isFavorite !== "boolean") {
        return res.status(400).json({
          message: "Invalid favorite value"
        });
      }

      updateData.isFavorite = isFavorite;

    }


    // Update Archive
    if (isArchived !== undefined) {

      if (typeof isArchived !== "boolean") {
        return res.status(400).json({
          message: "Invalid archive value"
        });
      }

      updateData.isArchived = isArchived;

    }


    // Check Update Fields
    if (Object.keys(updateData).length === 0) {

      return res.status(400).json({
        message: "Provide a valid field to update"
      });

    }


    // Update Database
    const updatedItem = await db
      .update(items)
      .set(updateData)
      .where(eq(items.id, id))
      .returning();


    // Check Item Exists
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

    console.error("Update Error:", error);

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
  createItem,
  getItems,
  updateItem,
  deleteItem
};