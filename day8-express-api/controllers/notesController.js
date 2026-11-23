const prisma = require("../config/prisma");

// GET all notes
const getAllNotes = async (req, res) => {
  try {
    const notes = await prisma.note.findMany({
      orderBy: { id: "asc" }
    });

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({
      message: "Database error",
      error: error.message
    });
  }
};

// GET single note
const getNoteById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const note = await prisma.note.findUnique({
      where: { id }
    });

    if (!note) {
      return res.status(404).json({
        message: "Note not found"
      });
    }

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({
      message: "Database error",
      error: error.message
    });
  }
};

// POST create note
const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required"
      });
    }

    const note = await prisma.note.create({
      data: { title, content }
    });

    res.status(201).json({
      message: "Note created successfully",
      note
    });
  } catch (error) {
    res.status(500).json({
      message: "Database error",
      error: error.message
    });
  }
};

// PUT update note
const updateNote = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required"
      });
    }

    const result = await prisma.note.updateMany({
      where: { id },
      data: { title, content }
    });

    if (result.count === 0) {
      return res.status(404).json({
        message: "Note not found"
      });
    }

    const note = await prisma.note.findUnique({
      where: { id }
    });

    res.status(200).json({
      message: "Note updated successfully",
      note
    });
  } catch (error) {
    res.status(500).json({
      message: "Database error",
      error: error.message
    });
  }
};

// DELETE note
const deleteNote = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const note = await prisma.note.findUnique({
      where: { id }
    });

    if (!note) {
      return res.status(404).json({
        message: "Note not found"
      });
    }

    await prisma.note.delete({
      where: { id }
    });

    res.status(200).json({
      message: "Note deleted successfully",
      note
    });
  } catch (error) {
    res.status(500).json({
      message: "Database error",
      error: error.message
    });
  }
};

module.exports = {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote
};