let notes = [];
let nextId = 1;

// GET all notes
const getAllNotes = (req, res) => {
  res.status(200).json(notes);
};

// GET single note
const getNoteById = (req, res) => {
  const id = Number(req.params.id);

  const note = notes.find((note) => note.id === id);

  if (!note) {
    return res.status(404).json({
      message: "Note not found",
    });
  }

  res.status(200).json(note);
};

// POST create note
const createNote = (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      message: "Title and content are required",
    });
  }

  const newNote = {
    id: nextId++,
    title,
    content,
  };

  notes.push(newNote);

  res.status(201).json({
    message: "Note created successfully",
    note: newNote,
  });
};

// PUT update note
const updateNote = (req, res) => {
  const id = Number(req.params.id);

  const note = notes.find((note) => note.id === id);

  if (!note) {
    return res.status(404).json({
      message: "Note not found",
    });
  }

  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      message: "Title and content are required",
    });
  }

  note.title = title;
  note.content = content;

  res.status(200).json({
    message: "Note updated successfully",
    note,
  });
};

// DELETE note
const deleteNote = (req, res) => {
  const id = Number(req.params.id);

  const noteIndex = notes.findIndex((note) => note.id === id);

  if (noteIndex === -1) {
    return res.status(404).json({
      message: "Note not found",
    });
  }

  const deletedNote = notes.splice(noteIndex, 1);

  res.status(200).json({
    message: "Note deleted successfully",
    note: deletedNote[0],
  });
};

module.exports = {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
};